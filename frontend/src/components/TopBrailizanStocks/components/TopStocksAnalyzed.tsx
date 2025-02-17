import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { TopBrazilianStocksItem, TopBrazilianStocksList } from '../styles';

interface StockData {
  ticker: string; // Papel
  price: number; // Cotação
  priceToEarningsRatio: number; // P/L (Price to Earnings Ratio)
  priceToBookRatio: number; // P/VP (Price to Book Ratio)
  dividendYield: number; // Div.Rendimento (Dividend Yield)
  roe: number; // Return on Equity
  liquidityTwoMonths: number; // Liq.2meses (Liquidity in 2 months)
  netWorth: number; // Patrim. Líq (Net Worth)
  debtToEquity: number; // Dív.Brut/ Patrim. (Debt to Equity Ratio)
  revenueGrowthFiveYears: number; // Cresc. Rec.5a (5 Years Revenue Growth)
}

export function TopStocksAnalyzed() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);

  useEffect(() => {
    fetch('/acoes.xlsx')
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json: StockData[] = XLSX.utils.sheet_to_json(sheet);
        setStocks(json);
      })
      .catch((error) => console.error('Erro ao carregar o arquivo Excel:', error));
  }, []);

  useEffect(() => {
    const filtered = stocks.filter((stock) => {
      return (
        stock.priceToEarningsRatio >= 3 && stock.priceToEarningsRatio <= 10 &&
        stock.priceToBookRatio >= 0.5 && stock.priceToBookRatio <= 2 &&
        stock.dividendYield > 0.07 && stock.dividendYield < 0.14 &&
        stock.roe > 0.15 && stock.roe < 0.30 &&
        stock.liquidityTwoMonths > 1000000 &&
        stock.revenueGrowthFiveYears > 0.01
      );
    });
    setFilteredStocks(filtered);
  }, [stocks])

  return (
    <>
      <TopBrazilianStocksList>
        {filteredStocks.map((stock, index) => {
          return (
            <TopBrazilianStocksItem key={index}>
              <h4>{stock.ticker}</h4>
              <p>Cotação: {stock.price}</p>
              <p>P/L: {stock.priceToEarningsRatio}</p>
              <p>P/VP: {stock.priceToBookRatio}</p>
              <p>Div. Rendimento: {Math.round(stock.dividendYield * 100)}%</p>
              <p>ROE: {Math.round(stock.roe * 100)}%</p>
              <p>Liq.2meses: {stock.liquidityTwoMonths.toLocaleString()}</p>
              <p>Cresc. Rec.5a: {Math.round(stock.revenueGrowthFiveYears * 100)}%</p>
            </TopBrazilianStocksItem>
          )
        })}
      </TopBrazilianStocksList>
    </>
  );
}
