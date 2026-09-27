import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./icons/register-core";
import { ThemeProvider } from "./providers";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/600.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
