import styled from "styled-components";
import { Button } from "../../components/Button";

export const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  gap: 2rem;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme["gray-900"]};
  padding: 10rem;
`

export const FormLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  background-color: ${(props) => props.theme["gray-800"]};
  border-radius: 8px;
`

export const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem 2rem 2rem;
  margin-top: -20px;
  gap: 1rem;

  a {
    color: ${(props) => props.theme["green-300"]};
    text-decoration: none;
    transition: 0.3s ease-in-out;
    margin-top: -10px;

    &:hover {
      color: ${(props) => props.theme["green-500"]};
    }
  }
`

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  
  font-size: 14px;
  color: ${(props) => props.theme["gray-400"]};
  font-weight: 400;
  text-transform: uppercase;
  
  div {
    flex-grow: 1;
    height: 2px;
    background-color: ${(props) => props.theme["gray-400"]};
    justify-content: center;
  }
`

export const ButtonGoogle = styled(Button)`
  background-color: ${(props) => props.theme["white"]};
  color: ${(props) => props.theme["gray-800"]};

  &:hover {
    background-color: ${(props) => props.theme["gray-300"]};
  }
`

export const PresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 4rem;

  h1 {
    font-size: 3rem;
    color: ${(props) => props.theme["green-300"]};
  }

  h3 {
    font-size: 1.5rem;
    color: ${(props) => props.theme["gray-300"]};
    line-height: 1.5;
  }
`