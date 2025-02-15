import styled from "styled-components";

export const TopBrazilianStocksContainer = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
  padding: 1rem;
`

export const TopBrazilianStocksHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`

export const TopBrazilianStocksTitle = styled.h2`
  text-align: center;
`

export const TopBrazilianStocksButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  
  button {
    display: flex;
    border: none;
    background-color: ${(props) => props.theme["gray-700"]};
    color: ${(props) => props.theme["gray-100"]};

    &:hover {
      transform: scale(1.1);
    }
  }
`

export const TopBrazilianStocksList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  max-height: 310px;
  overflow-y: auto;
  padding: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme['gray-500']};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme['gray-400']};
    cursor: pointer;
  }
`

export const TopBrazilianStocksItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;

  p {
    margin-left: auto;
  }
`