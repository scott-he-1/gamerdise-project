import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GamerdiseProvider } from "./providers/GamerdiseProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GamerdiseProvider>
      <App />
    </GamerdiseProvider>
  </React.StrictMode>
);
