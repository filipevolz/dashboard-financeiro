import styled from "styled-components";

export const AccountContainer = styled.div`
  display: flex;
  flex-direction:  column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme["gray-700"]};
  
  img {
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
    align-self: center;
  }
`

export const AccountFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  h2 {
    font-size: 3rem;
  }
`

export const AccountFormInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
`

export const AccountFormBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button:nth-child(2) {
    background-color: ${(props) => props.theme["red-500"]};
    color: ${(props) => props.theme["gray-100"]};

    &:hover {
      background-color: ${(props) => props.theme["red-700"]};
    }
  }
`