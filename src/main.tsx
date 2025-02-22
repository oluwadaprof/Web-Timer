import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { TempoDevtools } from "tempo-devtools";
import App from "@/App";
import "@/index.css";

if (import.meta.env.VITE_TEMPO) {
  TempoDevtools.init();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
