import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme["gray-100"]};
  font-weight: bold;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme["green-700"]};
  }
`