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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  background: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 300px;

  label {
    margin-bottom: 10px;
  }

  input, select {
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    margin-top: 15px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }
`;
