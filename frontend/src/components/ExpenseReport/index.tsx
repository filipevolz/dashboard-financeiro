import { useState } from "react";
import { ExpenseReportAddBtn, ExpenseReportContainer, ExpenseReportHeader, ExpenseReportItem, ExpenseReportList, ExpenseReportTitle, ModalContainer, Form, ButtonCloseForm } from "./styles";
import { iconMap, ExpenseType } from "../../@types/iconTypes";
import { Plus, X } from "phosphor-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Input } from "../Input";
import { Button } from "../Button";

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
  const { register, handleSubmit, formState: {errors}, reset } = useForm<CreateExpenseReportFormData>({
    resolver: zodResolver(createExpenseReportFormSchema),
  })
  

  const [expense, setExpense] = useState<ExpenseReportProps[]>([]);

  function handleCreateExpenseReport(data: CreateExpenseReportFormData) {
    const newExpense: ExpenseReportProps = {
      id: expense.length + 1,
      name: data.name,
      value: data.value,
      type: data.type as ExpenseType,
    };
  
    setExpense(prevExpenses => [...prevExpenses, newExpense]);
    reset();
    setIsModalOpen(false);
  }  

  function handleCloseForm() {
    reset();
    setIsModalOpen(false);
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
            </ExpenseReportItem>
          );
        })}
      </ExpenseReportList>

      {isModalOpen && (
        <ModalContainer>
          <Form onSubmit={handleSubmit(handleCreateExpenseReport)} style={{position: 'relative'}}>
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
            <Button type="submit">Registrar gasto</Button>
          </Form>
        </ModalContainer>
      )}
    </ExpenseReportContainer>
  );
}
