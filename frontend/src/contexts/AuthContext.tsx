import { createContext, useState, type ReactNode } from "react";

interface AuthContextType {
  signed: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signed, setSigned] = useState<boolean>(() => {
    // Verifica se já existe um token salvo no localStorage
    const token = localStorage.getItem("jwtToken");
    return !!token; // Converte para boolean (true se houver token, false se não)
  });

  // Função para logar e salvar o token
  const login = (token: string) => {
    localStorage.setItem("jwtToken", token);
    setSigned(true);
  };

  // Função para deslogar
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setSigned(false);
  };

  return (
    <AuthContext.Provider value={{ signed, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
