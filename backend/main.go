package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/gorilla/mux"
	"encoding/json"
	"golang.org/x/crypto/bcrypt"
	"github.com/rs/cors" // Para CORS
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	connStr := os.Getenv("DATABASE_URL")
	conn, err := pgx.Connect(context.Background(), connStr)
	if err != nil {
		panic(err)
	}
	defer conn.Close(context.Background())

	// Criando a tabela de usuários se não existir
	_, err = conn.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			email TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL
		);
	`)
	if err != nil {
		panic(err)
	}

	// Configurando o roteador
	r := mux.NewRouter()
	r.HandleFunc("/register", registerHandler(conn)).Methods("POST")
	r.HandleFunc("/login", loginHandler(conn)).Methods("POST")

	// Configurando o middleware CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5174"}, // Permitindo o frontend
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Iniciando o servidor com CORS
	handler := c.Handler(r)
	log.Println("Servidor rodando na porta 8000")
	http.ListenAndServe(":8000", handler)
}

// Função de registro de usuário
func registerHandler(conn *pgx.Conn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request RegisterRequest
		// Decodificando o corpo da requisição
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
			return
		}

		// Verificando se o email já existe
		var exists bool
		err = conn.QueryRow(context.Background(), "SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", request.Email).Scan(&exists)
		if err != nil {
			http.Error(w, "Erro ao verificar email", http.StatusInternalServerError)
			return
		}
		if exists {
			http.Error(w, "Email já cadastrado", http.StatusConflict)
			return
		}

		// Hashing a senha antes de armazená-la
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Erro ao hash a senha", http.StatusInternalServerError)
			return
		}

		// Inserindo o novo usuário no banco de dados
		_, err = conn.Exec(context.Background(), "INSERT INTO users (email, password) VALUES ($1, $2)", request.Email, hashedPassword)
		if err != nil {
			http.Error(w, "Erro ao cadastrar o usuário", http.StatusInternalServerError)
			return
		}

		// Respondendo que o cadastro foi bem-sucedido
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Cadastro realizado com sucesso"})
	}
}

// Função de login de usuário
func loginHandler(conn *pgx.Conn) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var request LoginRequest
		// Decodificando o corpo da requisição
		err := json.NewDecoder(r.Body).Decode(&request)
		if err != nil {
			http.Error(w, "Erro ao decodificar os dados", http.StatusBadRequest)
			return
		}

		// Buscando o usuário no banco de dados
		var storedPassword string
		err = conn.QueryRow(context.Background(), "SELECT password FROM users WHERE email=$1", request.Email).Scan(&storedPassword)
		if err != nil {
			if err == pgx.ErrNoRows {
				http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
			} else {
				http.Error(w, "Erro ao buscar usuário", http.StatusInternalServerError)
			}
			return
		}

		// Comparando a senha fornecida com o hash armazenado
		err = bcrypt.CompareHashAndPassword([]byte(storedPassword), []byte(request.Password))
		if err != nil {
			http.Error(w, "Email ou senha inválidos", http.StatusUnauthorized)
			return
		}

		// Se as credenciais forem válidas, retornamos sucesso
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{"message": "Login realizado com sucesso"})
	}
}
