import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div></div>
  </StrictMode>
);
