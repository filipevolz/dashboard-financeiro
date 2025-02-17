import axios from "axios";
import { useEffect, useState } from "react";
import { TopCryptoContainer, TopCryptoItem, TopCryptoList, TopCryptoTitle } from "./styles";

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  total_volume: number;
}

export function TopCryptos() {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`,
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 8,
              page: 1,
            },
          }
        );

        setCryptos(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <TopCryptoContainer>
      <TopCryptoTitle>🔥 Top 8 Criptos - Capitalização em 24h</TopCryptoTitle>
      <TopCryptoList>
        {cryptos.map((crypto, index) => (
          <TopCryptoItem key={index}>
            <img src={crypto.image} alt={crypto.symbol} width={24} />
            <h4>{crypto.name}</h4>
            <p>
              {crypto.total_volume.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </TopCryptoItem>
        ))}
      </TopCryptoList>
    </TopCryptoContainer>
  );
}
