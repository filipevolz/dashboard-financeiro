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
  phone: z.string().max(14),
  email: z.string().email().nonempty("Email é obrigatório!"),
  cpf: z.string().max(14),
  cnpj: z.string().max(18),
  cep: z.string().max(9).nonempty("CEP é obrigatório"),
  state: z.string(),
  city: z.string()
})

type AccountFormData = z.infer<typeof accountFormSchema>

export function Account(){
  const { register, handleSubmit, formState: {errors}, watch, setValue } = useForm<AccountFormData>({
    resolver: zodResolver(accountFormSchema)
  });
  const token = localStorage.getItem("jwtToken");
  const [user, setUser] = useState<AccountFormData>();
  const [sucessMessage, setSucessMessage] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>();

  async function getUser(){
    if(token){
      const response = await axios.get("http://localhost:8000/user/", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data as AccountFormData;
      setUser(data);
      if (response.data) {
        setValue("name", data.name);
        setValue("phone", data.phone);
        setValue("email", data.email);
        setValue("cpf", data.cpf);
        setValue("cnpj", data.cnpj);
        setValue("cep", data.cep);
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

  async function handleUpdateUser(){
    setErrorMessage(null);
    setSucessMessage(null);
    try {
      if(token){
        await axios.put(`http://localhost:8000/user/`, watch(), {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setSucessMessage("Dados atualizados com sucesso!");
    } catch (e) {
      console.error("Erro ao atualizar dados:", e);
      setErrorMessage("Erro ao atualizar dados");
    }
  }

  const cep = watch("cep");

  async function getAddress(cep: string) {
    const zipCode = cep.replace("-", "")
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
    getAddress(cep)
  }, [cep])

  return(
    <AccountContainer>
      <img src="https://github.com/filipevolz.png" alt="" />
      <AccountFormContainer onSubmit={handleSubmit(!user ? handleCreateUser : handleUpdateUser)}>
        <h2>Meus dados</h2>
        <AccountFormInputs>
          <Input
            htmlFor="name"
            label="Nome completo"
            placeholder="Nome"
            register={register("name")}
            error={errors.name}
          />
          <Input
            label="Celular"
            htmlFor="phone"
            placeholder="(DDD) 99999-9999"
            mask="(99)99999-9999"
            register={register("phone")}
            error={errors.phone}
          />
          <Input
            label="Email"
            htmlFor="email"
            placeholder="email@gmail.com"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label="CPF"
            htmlFor="cpf"
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            register={register("cpf")}
            error={errors.cpf}
          />
          {errors.cpf && <span>{errors.cpf.message}</span>}
          <Input
            label="CNPJ"
            htmlFor="cnpj"
            mask="99.999.999/9999-99"
            placeholder="00.000.000/0000-00"
            register={register("cnpj")}
            error={errors.cnpj}
          />
          <Input
            label="CEP"
            htmlFor="cep"
            placeholder="Exemplo: 88058240"
            mask="99999-999"
            register={register("cep")}
            error={errors.cep}
          />
          <Input
            label="Estado"
            htmlFor="state"
            placeholder="Exemplo: SC"
            register={register("state")}
            error={errors.state}
          />
          <Input
            label="Cidade"
            htmlFor="city"
            placeholder="Exemplo: Florianópolis"
            register={register("city")}
            error={errors.city}
          />
        </AccountFormInputs>
        <AccountFormBtns>
          <Button type="submit">
            Salvar Alterações
          </Button>
          <Button>
            Excluir Conta
          </Button>
          {sucessMessage ? <span style={{fontWeight: 600, color: '#00B37E'}}>{sucessMessage}</span> : <span style={{color: '#AB222E'}}>{errorMessage}</span>}
        </AccountFormBtns>
      </AccountFormContainer>
    </AccountContainer>
  )
}