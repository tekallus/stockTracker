import { useState, useEffect } from "react";
import "./styles.css";

import stockData from "./data/stockData";
import Stock from "./components/Stock";

export default function App() {
  const [currentData, setCurrentData] = useState(stockData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      function add(a, b) {
        return a + b;
      }

      function subtract(a, b) {
        return a - b;
      }

      function getOperation() {
        return Math.random() * 1 > 0.5 ? add : subtract;
      }

      function getNewNumber() {
        return Math.random() * 20;
      }

      function updatePrice(currentPrice) {
        const operation = getOperation();
        const newPrice = getNewNumber();
        return operation(+currentPrice, newPrice);
      }

      setCurrentData((prevData) =>
        prevData.map((stock) => {
          const updatedCurrentPrice = updatePrice(stock.currentPrice)
            .toFixed(2)
            .toString();
          const updatedPrevClosingPrice = stock.prevClosingPrice
            .toFixed(2)
            .toString();

          return {
            ...stock,
            currentPrice: updatedCurrentPrice,
            prevClosingPrice: updatedPrevClosingPrice
          };
        })
      );
    }, 4000);

    // setInterval'in temizlenmesi
    return () => clearInterval(intervalId);
  }, []);

  const stockElements = currentData.map((stock) => (
    <Stock
      key={stock.stockName}
      stockName={stock.stockName}
      currentPrice={stock.currentPrice.toString()}
      prevClosingPrice={stock.prevClosingPrice.toString()}
      logo={stock.logo}
    />
  ));

  return (
    <div>
      <header>
        <img className="app-logo" src="./images/app-logo.svg" alt="App Logo" />
        <h1>
          <span>Stok Takip</span>
        </h1>
      </header>
      <div className="wrapper">{stockElements}</div>
    </div>
  );
}
