import { z } from "zod";
import { Input } from "../../components/Input";
import { FormRegisterContainer, RegisterButtonGoogle } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../components/Button";
import { OtherDivider } from "../../components/OtherDivider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const registerFormShema = z
  .object({
    email: z.string().email("Email Inválido"),
    password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"],
  });

type RegisterFormType = z.infer<typeof registerFormShema>

export function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormShema),
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Função para lidar com o envio do formulário
  async function handleRegister(data: RegisterFormType) {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://localhost:8000/register", {
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
        setErrorMessage(errorData.message || "Erro ao registrar");
      } else {
        navigate('/login')
      }
    } catch (error) {
      setErrorMessage("Erro ao se comunicar com o servidor");
    }
  }

  return (
    <>
      <FormRegisterContainer onSubmit={handleSubmit(handleRegister)}>
        <Input
          type="email"
          label="Email"
          htmlFor="email"
          register={register("email")}
          placeholder="email@gmail.com"
        />
        {errors.email && <span>{errors.email.message}</span>}
        
        <Input
          type="password"
          label="Senha"
          htmlFor="password"
          register={register("password")}
          placeholder="*******"
        />
        {errors.password && <span>{errors.password.message}</span>}
        
        <Input
          type="password"
          label="Confirmar Senha"
          htmlFor="confirmPassword"
          register={register("confirmPassword")}
          placeholder="*******"
        />
        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
        
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
        
        <Button type="submit">Cadastrar</Button>
        
        <OtherDivider />
        
        <RegisterButtonGoogle type="button">
          Cadastre-se com Google
        </RegisterButtonGoogle>
        
        <span style={{ textAlign: "center" }}>
          Já possui cadastro na NextFinance? <a href="/login">Login</a>
        </span>
      </FormRegisterContainer>
    </>
  );
}
