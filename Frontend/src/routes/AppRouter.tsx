import Funds from "@/pages/Funds";
import { Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Funds />} />
      </Route>
    </Routes>
  );
}
