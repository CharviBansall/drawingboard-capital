import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Tables } from "@/lib/types-supabase";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<"profiles"> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
