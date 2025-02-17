import { useLocation } from "react-router-dom";
import { Avatar } from "../Avatar";
import { Notifications } from "../Notifications";
import { SearchInput } from "../SearchInput";
import { HeaderContainer, TitlePage } from "./styles";

export function Header(){
  const location = useLocation();

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/insight": "Insight",
    "/transaction": "Transaction",
    "/account": "Account",
    "/settings": "Settings",
  };

  const title = titles[location.pathname] || "Página Não Encontrada";
  
  return(
    <HeaderContainer>
      <TitlePage>{title}</TitlePage>

      <div style={{display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center'}}>
        <Notifications />
        <SearchInput />
        <Avatar />
      </div>
    </HeaderContainer>
  )
}