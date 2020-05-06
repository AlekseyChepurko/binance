import React from "react";
import "./App.css";
import { ThemeProvider } from "@devexperts/react-kit/dist/utils/withTheme";
import { MarketTableFeature } from "./features/MarketTable/MarketTable.feature";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Binance</p>
        <ThemeProvider theme={{}}>
          <MarketTableFeature />
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
