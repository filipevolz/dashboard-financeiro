import { ExpenseReport } from "../../components/ExpenseReport";
import { TopBrazilianStocks } from "../../components/TopBrailizanStocks";
import { TopCryptos } from "../../components/TopCryptos";
import { TopUSStocks } from "../../components/TopUnitedStatesStocks";
import { HomeContainer } from "./styles";

export function Home(){
  return(
    <HomeContainer>
      <ExpenseReport />
      <TopBrazilianStocks />
      <TopUSStocks />
      <TopCryptos />
    </HomeContainer>
  )
}