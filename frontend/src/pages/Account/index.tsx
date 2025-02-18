import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AccountContainer, AccountFormContainer, AccountFormInputs, AccountFormBtns } from "./styles";
import { z } from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import axios from 'axios';


const accountFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  phone: z.string().max(15),
  email: z.string().email().nonempty("Email é obrigatório!"),
  cpf: z.string().max(11),
  cnpj: z.string().max(14),
  zipCode: z.string().min(8).max(8),
  state: z.string(),
  city: z.string()
})

type AccountFormData = z.infer<typeof accountFormSchema>

export function Account(){
  const { register, handleSubmit, formState: {errors}, watch, setValue } = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema)
  });
  const token = localStorage.getItem("jwtToken");

  async function getUser(){
    if(token){
      const response = await axios.get("http://localhost:8000/user/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data as AccountFormData;
      if (response.data) {
        setValue("name", data.name);
        setValue("phone", data.phone);
        setValue("email", data.email);
        setValue("cpf", data.cpf);
        setValue("cnpj", data.cnpj);
        setValue("zipCode", data.zipCode);
        setValue("state", data.state);
        setValue("city", data.city);
      }
    } else {
      console.log("Token não encontrado");
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  async function handleCreateUser(data: AccountFormData){
    try {
      if(token){
        await axios.post("http://localhost:8000/user/", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        console.log("Token não encontrado");
      }
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  }
  
  const zipCode = watch("zipCode");

  async function getAddress(zipCode: string) {
    if (zipCode.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);
        const data = await response.json();

        if (!data.erro) {
          setValue("state", data.uf);
          setValue("city", data.localidade);
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    }
  }

  useEffect(() => {
    getAddress(zipCode)
  }, [zipCode]);
  
  return(
    <AccountContainer>
      <img src="https://github.com/filipevolz.png" alt="" />
      <AccountFormContainer onSubmit={handleSubmit(handleCreateUser)}>
        <h2>Meus dados</h2>
        <AccountFormInputs>
          <Input
            htmlFor="name"
            label="Nome completo"
            placeholder="Nome"
            register={register("name")}
          />
          {errors.name && <span>{errors.name.message}</span>}
          <Input
            label="Celular"
            htmlFor="phone"
            placeholder="(DDD) 99999-9999"
            register={register("phone")}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
          <Input
            label="Email"
            htmlFor="email"
            placeholder="email@gmail.com"
            register={register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
          <Input
            label="CPF"
            htmlFor="cpf"
            placeholder="000.000.000-00"
            register={register("cpf")}
          />
          {errors.cpf && <span>{errors.cpf.message}</span>}
          <Input
            label="CNPJ"
            htmlFor="cnpj"
            placeholder="00.000.000/0000-00"
            register={register("cnpj")}
          />
          {errors.cnpj && <span>{errors.cnpj.message}</span>}
          <Input
            label="CEP"
            htmlFor="zipCode"
            placeholder="00000-000"
            register={register("zipCode")}
          />
          {errors.zipCode && <span>{errors.zipCode.message}</span>}
          <Input
            label="Estado"
            htmlFor="state"
            placeholder="Exemplo: Santa Catarina"
            register={register("state")}
          />
          {errors.state && <span>{errors.state.message}</span>}
          <Input
            label="Cidade"
            htmlFor="city"
            placeholder="Exemplo: Florianópolis"
            register={register("city")}
          />
          {errors.city && <span>{errors.city.message}</span>}
        </AccountFormInputs>
        <AccountFormBtns>
          <Button type="submit">
            Salvar Alterações
          </Button>
          <Button>
            Excluir Conta
          </Button>
        </AccountFormBtns>
      </AccountFormContainer>
    </AccountContainer>
  )
}