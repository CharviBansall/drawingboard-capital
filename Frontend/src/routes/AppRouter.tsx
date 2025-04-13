import Funds from "@/pages/Funds";
import { Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { SignUp } from "@/pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { SignIn } from "@/pages/SignIn";
import { AuthCallback } from "@/pages/AuthCallback";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Funds />} />
        </Route>
      </Route>
    </Routes>
  );
}
