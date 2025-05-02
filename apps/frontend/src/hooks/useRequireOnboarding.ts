import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useProfile } from "@/hooks/useProfile";

export function useRequireOnboarding() {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile && profile.eligibility === "not_submitted") {
      navigate("/onboarding", { replace: true });
    } else if (profile?.eligibility === "pending_approval") {
      navigate("/onboarding-confirmation", { replace: true });
    }
  }, [profile, loading, navigate]);

  return { profile, loading };
}
