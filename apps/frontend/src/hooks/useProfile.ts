import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { Tables } from "@/lib/types-supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

// Define the shape of the joined query result
type ProfileWithCompany = Tables<"profiles"> & {
  company: Pick<Tables<"companies">, "company_name"> | null;
};

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileWithCompany | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      const { data, error }: PostgrestSingleResponse<ProfileWithCompany> =
        await supabase
          .from("profiles")
          .select("*, company:company_id(company_name)")
          .eq("id", user.id)
          .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
}
