import { ButtonContainer } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

export function Button({children, ...rest}: ButtonProps){
  return <ButtonContainer {...rest}>{children}</ButtonContainer>
}