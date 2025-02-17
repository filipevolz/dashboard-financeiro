import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLogin, LoginButtonGoogle } from "./styles";
import { OtherDivider } from "../../components/OtherDivider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const loginFormSchema = z.object({
  email: z.string().email("Email Inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleLogin(data: LoginFormData) {
    setErrorMessage(null); // Resetando mensagens de erro antes de enviar
    setSuccessMessage(null); // Resetando mensagens de sucesso

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erro ao fazer login");
      } else {
        login();
        navigate('/dashboard')
      }
    } catch (error) {
      setErrorMessage("Erro ao se comunicar com o servidor");
    }
  }

  return (
    <>  
      <FormLogin onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email"
          type="email"
          placeholder="Digite seu email"
          register={register("email")}
        />
        {errors.email && <span>{errors.email.message}</span>}

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          register={register("password")}
        />
        {errors.password && <span>{errors.password.message}</span>}

        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

        <Button type="submit">Login</Button>
        <a href="">Esqueceu a senha?</a>
        
        <OtherDivider />
        
        <LoginButtonGoogle type="button">
          Login com Google
        </LoginButtonGoogle>

        <span style={{ textAlign: 'center' }}>
          Novo na NextFinance? <a href="/register">Cadastre-se</a>
        </span>
      </FormLogin>
    </>
  );
}
