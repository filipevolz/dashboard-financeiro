import { Outlet } from "react-router-dom";
import { LayoutContainerSign, FormLoginContainer, PresentationContainer } from "./styles";
import logo from '../../assets/7b30e8e4543f4447b1c470ab25e232cc-free__4_-removebg-preview.png';

export function DefaultLayoutSign(){
  return(
    <LayoutContainerSign>
      <FormLoginContainer >
        <img src={logo} />
        <Outlet />
      </FormLoginContainer>
      <PresentationContainer>
        <h1>Simplifique sua Gestão Financeira e Investimentos</h1>
        <h3>Controle suas finanças de forma fácil e segura com a NextFinance. Tenha total controle sobre seus recebimentos.</h3>
      </PresentationContainer>
    </LayoutContainerSign>
  )
}