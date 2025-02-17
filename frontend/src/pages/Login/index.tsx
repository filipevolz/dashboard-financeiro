import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormLogin, LoginButtonGoogle } from "./styles";
import { OtherDivider } from "../../components/OtherDivider";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext"; // Certifique-se de importar corretamente

const loginFormSchema = z.object({
  email: z.string().email("Email Inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login } = useContext(AuthContext)!;

  async function handleLogin(data: LoginFormData) {
    try {
      const response = await axios.post("http://localhost:8000/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        login(response.data.token);
        localStorage.setItem('jwtToken', response.data.token); 
        navigate("/dashboard");
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage("Falha ao efetuar login");
      console.error(error);
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

        <Button type="submit">Login</Button>
        <a href="">Esqueceu a senha?</a>

        <OtherDivider />

        <LoginButtonGoogle type="button">Login com Google</LoginButtonGoogle>

        <span style={{ textAlign: "center" }}>
          Novo na NextFinance? <a href="/register">Cadastre-se</a>
        </span>
      </FormLogin>
    </>
  );
}
