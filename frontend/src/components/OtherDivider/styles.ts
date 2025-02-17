import styled from "styled-components";

export const DividerContainer = styled.div`
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