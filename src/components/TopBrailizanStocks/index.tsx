import { ArrowLeft, ArrowRight } from "phosphor-react";
import { TopVolumes } from "./components/TopVolumes";
import { TopBrazilianStocksButtons, TopBrazilianStocksContainer, TopBrazilianStocksHeader, TopBrazilianStocksTitle } from "./styles";
import { TopStocksAnalyzed } from "./components/TopStocksAnalyzed";
import { useState } from "react";

export function TopBrazilianStocks() {
  const [changeComponent, setChangeComponent] = useState(true);

  return (
    <TopBrazilianStocksContainer>
      <TopBrazilianStocksHeader>
        <TopBrazilianStocksTitle>🇧🇷 Top 8 - Volume em 24h</TopBrazilianStocksTitle>
        <TopBrazilianStocksButtons>
          <button onClick={() => setChangeComponent(!changeComponent)}>
            <ArrowLeft size={24}/>
          </button>
          <button onClick={() => setChangeComponent(!changeComponent)}>
            <ArrowRight size={24}/>
          </button>
        </TopBrazilianStocksButtons>
      </TopBrazilianStocksHeader>
      {changeComponent ? <TopVolumes /> : <TopStocksAnalyzed />}
    </TopBrazilianStocksContainer>
  )
}
