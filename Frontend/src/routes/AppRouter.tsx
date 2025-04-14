import Funds from "@/pages/Funds";
import { Navigate, Route, Routes } from "react-router";
import { Layout } from "@/components/layout/Layout";
import { SignUp } from "@/pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { SignIn } from "@/pages/SignIn";
import { AuthCallback } from "@/pages/AuthCallback";
import Onboarding from "@/pages/Onboarding";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route element={<PrivateRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Funds />} />
          <Route path="/funds" element={<Funds />} />
        </Route>
      </Route>
    </Routes>
  );
}
