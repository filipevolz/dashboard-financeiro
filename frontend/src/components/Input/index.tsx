import type { UseFormRegisterReturn } from "react-hook-form";
import { InputContainer } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  label?: string;
  htmlFor?: string;
  register?: UseFormRegisterReturn;
}

export function Input({label, htmlFor, register, ...rest}: InputProps){
  return (
    <InputContainer>
      <label htmlFor={htmlFor}>{label}</label>
      <input {...register} {...rest}/>
    </InputContainer>
  )
}