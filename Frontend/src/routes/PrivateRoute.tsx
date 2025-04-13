// src/components/routing/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/store/AuthContext";

export function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!user) return <Navigate to="/signup" replace />;

  return <Outlet />;
}
