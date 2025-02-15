import { useState } from "react";
import { ExpenseReportAddBtn, ExpenseReportContainer, ExpenseReportHeader, ExpenseReportItem, ExpenseReportList, ExpenseReportTitle, ModalContainer, Form } from "./styles";
import { iconMap, ExpenseType } from "../../@types/iconTypes";
import { Plus, X } from "phosphor-react";
import { v4 as uuidv4 } from 'uuid';

const uniqueId = uuidv4();


interface ExpenseReportProps {
  id: number;
  name: string;
  value: number;
  type: ExpenseType;
}

export function ExpenseReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState<ExpenseReportProps>({ id: Number(uniqueId), name: "", value: 0, type: "card" });
  
  const [expense, setExpense] = useState<ExpenseReportProps[]>([]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpense([...expense, newExpense]);
    setNewExpense({ id: Number(uniqueId), name: "", value: 0, type: "card" });
    setIsModalOpen(false);
  };

  return (
    <ExpenseReportContainer>
      <ExpenseReportHeader>
        <ExpenseReportTitle>Relatório de Gastos</ExpenseReportTitle>
        <ExpenseReportAddBtn onClick={() => setIsModalOpen(true)}>
          <Plus size={20} weight="bold"/>
          Novo gasto
        </ExpenseReportAddBtn>
      </ExpenseReportHeader>
      <ExpenseReportList>
        {expense.map(({ id, name, value, type }) => {
          const IconComponent = iconMap[type];
          return (
            <ExpenseReportItem key={id}>
              <IconComponent size={24} />
              <p>{name}</p>
              <span>R${value},00</span>
            </ExpenseReportItem>
          );
        })}
      </ExpenseReportList>

      {isModalOpen && (
        <ModalContainer>
          <Form onSubmit={handleSubmit} style={{backgroundColor: "#000"}}>
            <button onClick={() => setIsModalOpen(false)}>
              <X />
            </button>
            <label>
              Nome do gasto:
              <input 
                type="text" 
                name="name" 
                value={newExpense.name} 
                onChange={(e) => setNewExpense(
                  {...newExpense, name: e.target.value}
                )} 
                required 
              />
            </label>
            <label>
              Valor:
              <input 
                type="number" 
                name="value" 
                value={newExpense.value} 
                onChange={(e) => setNewExpense(
                  {...newExpense, value: Number(e.target.value)}
                )} 
                required 
              />
            </label>
            <label>
              Tipo:
              <select 
                name="type" 
                value={newExpense.type} 
                onChange={(e) => setNewExpense(
                  {...newExpense, type: e.target.value as ExpenseType}
                )}
              >
                <option value="card">Cartão</option>
                <option value="food">Alimentação</option>
                <option value="health">Saúde</option>
                <option value="transport">Transporte</option>
                <option value="rent">Aluguel</option>
                <option value="shopping">Compras</option>
                <option value="leisure">Lazer</option>
              </select>
            </label>
            <button type="submit">Adicionar</button>
          </Form>
        </ModalContainer>
      )}
    </ExpenseReportContainer>
  );
}
