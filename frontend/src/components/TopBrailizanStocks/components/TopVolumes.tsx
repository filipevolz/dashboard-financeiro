import { useEffect, useState } from "react";
import { TopBrazilianStocksItem, TopBrazilianStocksList } from "../styles";
import { stocksSymbols } from "../stockList";
import axios from "axios";

interface StockVolume {
  symbol: string;
  longName: string;
  logourl: string;
  regularMarketPrice: string;
  regularMarketVolume: number;
}

export function TopVolumes(){
  const [stocks, setStocks] = useState<StockVolume[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const requests = stocksSymbols.map(symbol =>
  //         axios.get(`https://brapi.dev/api/quote/${symbol}?token=aVnbfwEk6K2DyT9iokWxTo`)
  //       );

  //       // Espera todas as requisições serem concluídas
  //       const responses = await Promise.all(requests);

  //       // Extrair dados da resposta e setar no estado
  //       const data = responses.map(response => ({
  //         symbol: response.data.results[0].symbol,
  //         longName: response.data.results[0].longName,
  //         logourl: response.data.results[0].logourl,
  //         regularMarketPrice: response.data.results[0].regularMarketPrice,
  //         regularMarketVolume: response.data.results[0].regularMarketVolume, // Volume de mercado
  //       }));

  //       // Ordenar os dados pelo volume de compras (decrescente)
  //       const sortedData = data.sort((a, b) => b.regularMarketVolume - a.regularMarketVolume);

  //       setStocks(sortedData.slice(0, 8));
  //     } catch (error) {
  //       console.error("Erro ao buscar dados:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return(
    <>
      <TopBrazilianStocksList>
        {stocks.map((stock, index) => {
          return (
            <TopBrazilianStocksItem key={index}>
              <img src={stock.logourl} alt={stock.symbol} width={24} />
              <h4>{stock.longName}</h4>
              <p>{stock.regularMarketVolume.toLocaleString("pt-BR", {style: "currency", currency: "BRL",})}</p>
            </TopBrazilianStocksItem>
          )
        })}
      </TopBrazilianStocksList>
    </>
  )
}