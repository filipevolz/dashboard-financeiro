package main

import (
    "encoding/json"
    "database/sql"
    "fmt"
    "log"
    "net/http"
    "os"
    "time"

    _ "github.com/lib/pq"
    "github.com/gorilla/mux"
    "github.com/joho/godotenv"
    "github.com/rs/cors"
    "golang.org/x/crypto/bcrypt"
    "github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func generateJWT(email string) (string, error) {
    claims := jwt.MapClaims{
        "email": email,
        "exp":   time.Now().Add(time.Hour * 24).Unix(), // Expira em 24 horas
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(jwtSecret)
}

type RegisterRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type LoginRequest struct {
    Email    string `json:"email"`
    Password string `json:"password"`
}

type Expense struct {
    ID     int     `json:"id"`
    Name   string  `json:"name"`
    Value  float64 `json:"value"`
    Type   string  `json:"type"`
    UserID int     `json:"user_id"`
}

// Função que extrai o user_id do token
func getUserIDFromToken(r *http.Request) (string, error) {
    tokenString := r.Header.Get("Authorization")
    if tokenString == "" {
        return "", fmt.Errorf("token ausente")
    }

    if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
        tokenString = tokenString[7:]
    }

    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        return jwtSecret, nil
    })

    if err != nil || !token.Valid {
        return "", fmt.Errorf("token inválido")
    }

    claims, ok := token.Claims.(jwt.MapClaims)
    if !ok {
        return "", fmt.Errorf("token inválido")
    }

    userID, ok := claims["email"].(string)
    if !ok {
        return "", fmt.Errorf("user_id não encontrado no token")
    }

    return userID, nil
}

func registerHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var request RegisterRequest
        if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
            http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
            return
        }

        var exists bool
        err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", request.Email).Scan(&exists)
        if err != nil {
            http.Error(w, "Erro ao verificar email", http.StatusInternalServerError)
            return
        }
        if exists {
            http.Error(w, "Email já cadastrado", http.StatusConflict)
            return
        }

        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
        if err != nil {
            http.Error(w, "Erro ao gerar hash da senha", http.StatusInternalServerError)
            return
        }

        _, err = db.Exec("INSERT INTO users (email, password) VALUES ($1, $2)", request.Email, string(hashedPassword))
        if err != nil {
            http.Error(w, "Erro ao registrar usuário", http.StatusInternalServerError)
            return
        }

        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(map[string]string{"message": "Usuário registrado com sucesso"})
    }
}

func loginHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        var request LoginRequest
        if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
            http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
            return
        }

        var storedPassword string
        err := db.QueryRow("SELECT password FROM users WHERE email=$1", request.Email).Scan(&storedPassword)
        if err != nil {
            http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
            return
        }

        if err := bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(request.Password)); err != nil {
            http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
            return
        }

        token, err := generateJWT(request.Email)
        if err != nil {
            http.Error(w, "Erro ao gerar token", http.StatusInternalServerError)
            return
        }

        json.NewEncoder(w).Encode(map[string]string{"token": token})
    }
}

func getExpensesHandles(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        email, err := getUserIDFromToken(r)
        if err != nil {
            http.Error(w, "Token inválido", http.StatusUnauthorized)
            return
        }

        var userID int
        err = db.QueryRow("SELECT id FROM users WHERE email=$1", email).Scan(&userID)
        if err != nil {
            http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
            return
        }

        rows, err := db.Query("SELECT id, name, value, type FROM expenses WHERE user_id=$1", userID)
        if err != nil {
            http.Error(w, "Erro ao buscar despesas", http.StatusInternalServerError)
            return
        }
        defer rows.Close()

        var expenses []Expense
        for rows.Next() {
            var expense Expense
            if err := rows.Scan(&expense.ID, &expense.Name, &expense.Value, &expense.Type); err != nil {
                http.Error(w, "Erro ao processar despesas", http.StatusInternalServerError)
                return
            }
            expenses = append(expenses, expense)
        }

        json.NewEncoder(w).Encode(expenses)
    }
}

func createExpenseHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        email, err := getUserIDFromToken(r)
        if err != nil {
            http.Error(w, "Token inválido", http.StatusUnauthorized)
            return
        }

        var userID int
        err = db.QueryRow("SELECT id FROM users WHERE email=$1", email).Scan(&userID)
        if err != nil {
            http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
            return
        }

        var expense Expense
        if err := json.NewDecoder(r.Body).Decode(&expense); err != nil {
            http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
            return
        }

        // Inserir despesa no banco
        err = db.QueryRow("INSERT INTO expenses (name, value, type, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
            expense.Name, expense.Value, expense.Type, userID).Scan(&expense.ID)
        if err != nil {
            http.Error(w, "Erro ao criar despesa", http.StatusInternalServerError)
            return
        }

        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(expense)
    }
}

// Função para atualizar uma despesa
func updateExpenseHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Obter o ID da despesa da URL
        vars := mux.Vars(r)
        expenseID := vars["id"]

        // Validar token e obter o user_id
        email, err := getUserIDFromToken(r)
        if err != nil {
            http.Error(w, "Token inválido", http.StatusUnauthorized)
            return
        }

        var userID int
        err = db.QueryRow("SELECT id FROM users WHERE email=$1", email).Scan(&userID)
        if err != nil {
            http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
            return
        }

        // Verificar se a despesa existe para o usuário
        var existingExpense Expense
        err = db.QueryRow("SELECT id, name, value, type FROM expenses WHERE id=$1 AND user_id=$2", expenseID, userID).Scan(&existingExpense.ID, &existingExpense.Name, &existingExpense.Value, &existingExpense.Type)
        if err != nil {
            http.Error(w, "Despesa não encontrada", http.StatusNotFound)
            return
        }

        // Decodificar o corpo da requisição para obter os dados atualizados
        var expense Expense
        if err := json.NewDecoder(r.Body).Decode(&expense); err != nil {
            http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
            return
        }

        // Atualizar a despesa no banco de dados
        _, err = db.Exec("UPDATE expenses SET name=$1, value=$2, type=$3 WHERE id=$4 AND user_id=$5",
            expense.Name, expense.Value, expense.Type, expenseID, userID)
        if err != nil {
            http.Error(w, "Erro ao atualizar a despesa", http.StatusInternalServerError)
            return
        }

        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(expense)
    }
}

func deleteExpenseHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Obter o ID da despesa da URL
        vars := mux.Vars(r)
        expenseID := vars["id"]

        // Validar token e obter o user_id
        email, err := getUserIDFromToken(r)
        if err != nil {
            http.Error(w, "Token inválido", http.StatusUnauthorized)
            return
        }

        var userID int
        err = db.QueryRow("SELECT id FROM users WHERE email=$1", email).Scan(&userID)
        if err != nil {
            http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
            return
        }

        // Verificar se a despesa existe para o usuário
        var existingExpense Expense
        err = db.QueryRow("SELECT id, name, value, type FROM expenses WHERE id=$1 AND user_id=$2", expenseID, userID).Scan(&existingExpense.ID, &existingExpense.Name, &existingExpense.Value, &existingExpense.Type)
        if err != nil {
            http.Error(w, "Despesa não encontrada", http.StatusNotFound)
            return
        }

        // Excluir a despesa do banco de dados
        _, err = db.Exec("DELETE FROM expenses WHERE id=$1 AND user_id=$2", expenseID, userID)
        if err != nil {
            http.Error(w, "Erro ao excluir a despesa", http.StatusInternalServerError)
            return
        }

        w.WriteHeader(http.StatusNoContent)
    }
}


func authenticateMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        tokenString := r.Header.Get("Authorization")
        if tokenString == "" {
            http.Error(w, "Token ausente", http.StatusUnauthorized)
            return
        }

        if len(tokenString) > 7 && tokenString[:7] == "Bearer " {
            tokenString = tokenString[7:]
        }

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return jwtSecret, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Token inválido", http.StatusUnauthorized)
            return
        }

        next.ServeHTTP(w, r)
    })
}

func protectedHandler(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]string{"message": "Bem-vindo à rota protegida!"})
}

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Erro ao carregar .env")
    }

    if os.Getenv("JWT_SECRET") == "" || os.Getenv("DATABASE_URL") == "" {
        log.Fatal("Variáveis de ambiente não configuradas corretamente")
    }

    connStr := os.Getenv("DATABASE_URL")
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    r := mux.NewRouter()
    r.HandleFunc("/register", registerHandler(db)).Methods("POST")
    r.HandleFunc("/login", loginHandler(db)).Methods("POST")

    r.HandleFunc("/expenses", getExpensesHandles(db)).Methods("GET")
    r.HandleFunc("/expenses", createExpenseHandler(db)).Methods("POST")
    r.HandleFunc("/expenses/{id}", updateExpenseHandler(db)).Methods("PUT")
    r.HandleFunc("/expenses/{id}", deleteExpenseHandler(db)).Methods("DELETE")
    

    r.Handle("/protected", authenticateMiddleware(http.HandlerFunc(protectedHandler))).Methods("GET")

    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    handler := c.Handler(r)
    log.Println("Servidor rodando na porta 8000")
    http.ListenAndServe(":8000", handler)
}
