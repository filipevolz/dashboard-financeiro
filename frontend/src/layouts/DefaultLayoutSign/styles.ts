import styled from "styled-components";

export const LayoutContainerSign = styled.div`
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