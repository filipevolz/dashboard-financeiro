import styled from "styled-components";
import { Button } from "../../components/Button";

export const FormRegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 2rem 2rem 2rem;
  margin-top: -20px;
  gap: 1rem;
`

export const RegisterButtonGoogle = styled(Button)`
  background-color: ${(props) => props.theme["white"]};
  color: ${(props) => props.theme["gray-800"]};

  &:hover {
    background-color: ${(props) => props.theme["gray-300"]};
  }
`