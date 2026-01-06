import React from "react";
import { createRoot } from "react-dom/client"; // React 18 style
import App from "./App";
import "./index.css";

import { HelmetProvider } from "react-helmet-async";

// 1️⃣ Root element ko select karo
const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

// 2️⃣ Render karo App ko HelmetProvider ke andar
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
