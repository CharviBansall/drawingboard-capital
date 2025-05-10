import { useEffect, useState, useCallback, useRef } from 'react';
import supabase from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/lib/types-supabase';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

type ProfileWithCompany = Tables<'profiles'> & {
  company: Pick<Tables<'companies'>, 'company_name'> | null;
};

type UseProfileResult = {
  profile: ProfileWithCompany | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useProfile(): UseProfileResult {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileWithCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error }: PostgrestSingleResponse<ProfileWithCompany> =
        await supabase
          .from('profiles')
          .select('*, company:company_id(company_name)')
          .eq('id', user.id)
          .single();

      if (abortRef.current) return;

      if (error) {
        setError(error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }
    } catch (err: any) {
      if (!abortRef.current) setError(err.message ?? 'Unknown error');
    } finally {
      if (!abortRef.current) setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    abortRef.current = false;
    fetchProfile();
    return () => {
      abortRef.current = true;
    };
  }, [fetchProfile]);

  return { profile, loading, error, refetch: fetchProfile };
}
