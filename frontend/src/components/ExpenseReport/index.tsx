import { useEffect, useState } from "react";
import { ExpenseReportAddBtn, ExpenseReportContainer, ExpenseReportHeader, ExpenseReportItem, ExpenseReportList, ExpenseReportTitle, ModalContainer, Form, ButtonCloseForm, UpdateBtn, RemoveBtn } from "./styles";
import { iconMap, ExpenseType } from "../../@types/iconTypes";
import { Pencil, Plus, Trash, X } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Input } from "../Input";
import { Button } from "../Button";
import axios from 'axios';

const createExpenseReportFormSchema = z.object({
  name: z.string()
  .nonempty("O nome é obrigatório")
  .transform(name => {
    return name.toLocaleUpperCase()
  }),

  value: z.string()
  .nonempty("O valor é obrigatório")
  .transform(value => Number(value))
  .refine(value => !isNaN(value) && value > 0, {
    message: "O valor deve ser um número positivo",
  }),

  type: z.nativeEnum(ExpenseType, {
    errorMap: () => ({message: "Escolha um tipo válido", }),
  }),
})

type CreateExpenseReportFormData = z.infer<typeof createExpenseReportFormSchema>

interface ExpenseReportProps {
  id: number;
  name: string;
  value: number;
  type: ExpenseType;
}

export function ExpenseReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState<ExpenseReportProps | null>(null);
  const { register, handleSubmit, formState: {errors}, reset } = useForm<CreateExpenseReportFormData>({
    resolver: zodResolver(createExpenseReportFormSchema),
  })
  const [expense, setExpense] = useState<ExpenseReportProps[]>([]);
  const token = localStorage.getItem("jwtToken");

  async function getExpenseReport(){
    try {
      const response = await axios.get("http://localhost:8000/expenses", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setExpense(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  }

  useEffect(() => {
    getExpenseReport()
  }, [])

  async function handleCreateExpenseReport(expenseData: CreateExpenseReportFormData) {
    try {
      if (!token) {
        console.error("Token não encontrado");
        return;
      }
  
      const response = await axios.post(
        "http://localhost:8000/expenses",
        expenseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Incluindo o token no cabeçalho
          },
        }
      );
  
      if (response.status === 201) {
        setExpense([...expense, response.data]);
        handleCloseForm();
      }
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
    }
  }

  // Função para abrir o modal e preencher os dados da despesa
  async function handleUpdateExpense(expenseId: number) {
    const expenseToEdit = expense.find(exp => exp.id === expenseId);
    if (expenseToEdit) {
      setExpenseToEdit(expenseToEdit); // Define a despesa a ser editada
      setIsModalOpen(true); // Abre o modal
      reset({
        name: expenseToEdit.name,
        value: expenseToEdit.value,
        type: expenseToEdit.type,
      });
    }
  }

  // Função para enviar as atualizações
  async function handleUpdateExpenseReport(expenseData: CreateExpenseReportFormData) {
    try {
      if (!token || !expenseToEdit) {
        console.error("Token não encontrado ou despesa não definida");
        return;
      }

      const response = await axios.put(
        `http://localhost:8000/expenses/${expenseToEdit.id}`,
        expenseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedExpense = response.data;
        setExpense(expense.map(exp => (exp.id === updatedExpense.id ? updatedExpense : exp))); // Atualiza a despesa na lista
        handleCloseForm();
        getExpenseReport();
      }
    } catch (error) {
      console.error("Erro ao atualizar despesa:", error);
    }
  }

  async function handleRemoveExpense(expenseId: number) {
    if (!token) {
      console.error("Token não encontrado ou despesa não definida");
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/expenses/${expenseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getExpenseReport();
    } catch (error) {
      console.error("Erro ao remover despesa:", error);
    }
  }
  

  function handleCloseForm() {
    reset();
    setIsModalOpen(false);
    setExpenseToEdit(null);
  }

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
              <UpdateBtn onClick={() => handleUpdateExpense(id)}>
                <Pencil size={20}/>
              </UpdateBtn>     
              <RemoveBtn onClick={() => handleRemoveExpense(id)}>
                <Trash size={20}/>  
              </RemoveBtn>
            </ExpenseReportItem>
          );
        })}
      </ExpenseReportList>

      {isModalOpen && (
        <ModalContainer>
          <Form onSubmit={handleSubmit(expenseToEdit ? handleUpdateExpenseReport : handleCreateExpenseReport)} style={{position: 'relative'}}>
            <ButtonCloseForm onClick={() => handleCloseForm()} style={{position: 'absolute', top: '1rem', right: '1rem', display: 'flex'}}>
              <X size={20}/>
            </ButtonCloseForm>
              <Input
                label="Com o que foi gasto?"
                htmlFor="name"
                type="text"
                register={register("name")}
                placeholder="Exemplo: Shopping"
              />
              {errors.name && <span>{errors.name.message}</span>}
              <Input
                label="Qual o valor?"
                htmlFor="value"
                type="number"
                register={register("value")}
                placeholder="Exemplo: R$ 100,00"
              />
              {errors.value && <span>{errors.value.message}</span>}
              <label htmlFor="type">Qual o tipo?</label>
              <select {...register("type")}>
                <option>Selecione o tipo</option>
                <option value="card">Cartão</option>
                <option value="food">Alimentação</option>
                <option value="health">Saúde</option>
                <option value="transport">Transporte</option>
                <option value="rent">Aluguel</option>
                <option value="shopping">Compras</option>
                <option value="leisure">Lazer</option>
              </select>
              {errors.type && <span>{errors.type.message}</span>}
            <Button type="submit">{expenseToEdit ? "Atualizar gasto" : "Registrar gasto"}</Button>
          </Form>
        </ModalContainer>
      )}
    </ExpenseReportContainer>
  );
}
