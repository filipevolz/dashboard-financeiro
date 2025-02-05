import styled from "styled-components";

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme["gray-700"]};
  border-radius: 25px;
  overflow: hidden;
  width: 100%;
  max-width: 350px;
  padding: 0.5rem 1rem;
`;

export const Input = styled.input`
  flex: 1;
  padding-left: 0.5rem;
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme["gray-100"]};

  &::placeholder {
    color: ${(props) => props.theme["gray-400"]};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const SearchButton = styled.button`
  background-color: ${(props) => props.theme["gray-700"]};
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 20px 20px 0;

  svg {
    color: ${(props) => props.theme.white};
  }
`;
