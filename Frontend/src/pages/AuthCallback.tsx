import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/"); // or wherever you want to send them after login
      }
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="text-lg font-semibold">Logging you in...</span>
    </div>
  );
}
