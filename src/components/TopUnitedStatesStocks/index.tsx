import axios from "axios";
import { useEffect, useState } from "react";
import { usStocksSymbols } from "./stockList";
import { TopUSStocksContainer, TopUSStocksItem, TopUSStocksList, TopUSStocksTitle} from "./styles";

interface Stock {
  symbol: string;
  longName: string;
  logourl: string;
  regularMarketPrice: string;
  regularMarketVolume: number;
}

export function TopUSStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = usStocksSymbols.map(symbol =>
          axios.get(`https://brapi.dev/api/quote/${symbol}?token=aVnbfwEk6K2DyT9iokWxTo`)
        );

        const responses = await Promise.all(requests);

        const data = responses.map<Stock>(response => ({
          symbol: response.data.results[0].symbol,
          longName: response.data.results[0].longName,
          logourl: response.data.results[0].logourl,
          regularMarketPrice: response.data.results[0].regularMarketPrice,
          regularMarketVolume: response.data.results[0].regularMarketVolume,
        }));

        const sortedData = data.sort((a, b) => b.regularMarketVolume - a.regularMarketVolume);

        setStocks(sortedData.slice(0, 8));
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TopUSStocksContainer>
      <TopUSStocksTitle>🇺🇸 Top 8 - Volume em 24h</TopUSStocksTitle>
      <TopUSStocksList>
        {stocks.map((stock, index) => (
          <TopUSStocksItem key={index}>
            <img src={stock.logourl} alt={stock.symbol} width={24} />
            <h4>{stock.longName}</h4>
            <p>
              {stock.regularMarketVolume.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </TopUSStocksItem>
        ))}
      </TopUSStocksList>
    </TopUSStocksContainer>
  );
}
