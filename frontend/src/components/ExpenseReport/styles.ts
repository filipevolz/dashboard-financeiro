import styled from "styled-components";

export const ExpenseReportContainer = styled.div`
  background-color: ${(props) => props.theme['gray-700']};
  border-radius: 8px;
  padding: 1rem;
`

export const ExpenseReportHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`

export const ExpenseReportTitle = styled.h2`

`

export const ExpenseReportAddBtn = styled.button`
  border: none;
  background: ${(props) => props.theme['green-300']};
  color: ${(props) => props.theme['white']};
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  gap: 0.5rem;

  border-radius: 5px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover{
    background: ${(props) => props.theme['green-700']};
    color: ${(props) => props.theme['gray-100']};
  }
`

export const ExpenseReportList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const ExpenseReportItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    margin-left: auto;
  }
`



export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  width: 400px;
  background-color: ${(props) => props.theme["gray-900"]};

  select {
    padding: 1rem;
    background-color: ${(props) => props.theme["gray-600"]};
    color: ${(props) => props.theme["gray-300"]};
    border-radius: 5px;
    border: none;
    font-size: 1rem;
    margin-bottom: 1rem;

    appearance: none;
  }

  span {
    color: ${(props) => props.theme["red-500"]};
    font-size: 1rem;
  }
`;

export const ButtonCloseForm = styled.button`
  background: ${(props) => props.theme["gray-900"]};
  border: none;
  color: ${(props) => props.theme["gray-100"]};

  &:hover {
    transform: scale(1.1);
  }
`