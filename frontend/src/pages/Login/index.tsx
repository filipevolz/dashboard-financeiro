import { z } from "zod";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonGoogle, Divider, FormLogin, FormLoginContainer, LoginContainer, PresentationContainer } from "./styles";
import logo from '../../assets/7b30e8e4543f4447b1c470ab25e232cc-free__4_-removebg-preview.png'

const loginFormSchema = z.object({
  email: z.string().email("Email Inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres")
})

type LoginFormData = z.infer<typeof loginFormSchema>

export function Login(){
  const { register, handleSubmit, formState: {errors} } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  })

  function handleLogin(data: LoginFormData){
    console.log(data)
  }

  return (
    <LoginContainer>
      <FormLoginContainer>
        <img src={logo} />
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
          <Button type="submit">Login</Button>
          <a href="">Esqueceu a senha?</a>
          <Divider>
            <div></div>
            <span>OU</span>
            <div></div>
          </Divider>
          <ButtonGoogle type="button">
            Login com Google
          </ButtonGoogle>
          <span style={{textAlign: 'center'}}>Novo na NextFinance? <a href="/signup">Cadastre-se</a></span>
        </FormLogin>
      </FormLoginContainer>
      <PresentationContainer>
        <h1>Simplifique sua Gestão Financeira e Investimentos</h1>
        <h3>Controle suas finanças de forma fácil e segura com a NextFinance. Tenha total controle sobre seus recebimentos.</h3>
      </PresentationContainer>
    </LoginContainer>
  )
}