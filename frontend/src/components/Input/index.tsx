import type { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { InputContainer } from "./styles";
import InputMask from "react-input-mask";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  register?: UseFormRegisterReturn;
  mask?: string;
  error?: FieldError;
}

export function Input({ label, htmlFor, register, mask, error, ...rest }: InputProps) {
  return (
    <InputContainer>
      <label htmlFor={htmlFor}>{label}</label>
      {mask ? (
        <InputMask mask={mask} {...register} {...rest}>
          {(inputProps) => <input {...inputProps} />}
        </InputMask>
      ) : (
        <input {...register} {...rest} />
      )}
      {error && <span>{error.message}</span>}
    </InputContainer>
  );
}
