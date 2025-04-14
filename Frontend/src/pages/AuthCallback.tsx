import { useEffect } from "react";
import { useNavigate } from "react-router";
import supabase from "@/lib/supabase";

/**
 * Handle authentication callback from Supabase.
 *
 * This page is navigated to after the user is redirected from Supabase's
 * authentication flow. It fetches the user's profile and checks if they have
 * completed onboarding. If not, it navigates them to the onboarding page. If
 * they have completed onboarding, it navigates them to the home page.
 */
export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleRedirect() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("onboarded")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Failed to fetch profile:", error.message);
        return;
      }
      console.log(profile);
      if (!profile.onboarded) {
        navigate("/onboarding");
      } else {
        navigate("/");
      }
    }

    handleRedirect();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <span className="text-lg font-semibold">Logging you in...</span>
    </div>
  );
}
