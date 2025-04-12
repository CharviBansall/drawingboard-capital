import App from "@/App";
import { Route, Routes } from "react-router";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  );
}
