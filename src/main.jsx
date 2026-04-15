import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import TurnstileGate from "./components/TurnstileGate";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TurnstileGate>
        <App />
      </TurnstileGate>
    </BrowserRouter>
  </React.StrictMode>
);