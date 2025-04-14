// src/components/routing/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function PrivateRoute() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
}
