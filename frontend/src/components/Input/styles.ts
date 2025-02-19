import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: bold;
  }

  input {
    padding: 1rem;
    border-radius: 5px;
    border: none;
    background-color: ${(props) => props.theme["gray-600"]};
    color: ${(props) => props.theme["gray-300"]};
    font-size: 1rem;
    appearance: none;
  }
  
  span {
    color: ${(props) => props.theme["red-500"]};
  }
`