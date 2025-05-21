import { useEffect, useState, useRef, useMemo } from 'react';
import supabase from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Tables } from '@/types/types-supabase';

// Define the shape of the joined query result

// Cache to store profiles by user ID
const profileCache = new Map<string, Tables<'profiles'>>();

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [loading, setLoading] = useState(true);
  const fetchingRef = useRef(false);

  // Memoize user ID to prevent unnecessary effect triggers
  const userId = useMemo(() => user?.id, [user?.id]);

  useEffect(() => {
    // Skip if we're already fetching
    if (fetchingRef.current) return;

    if (!userId) {
      setProfile(null);
      setLoading(false);
      return;
    }

    // Check if we have a cached profile for this user
    const cachedProfile = profileCache.get(userId);
    if (cachedProfile) {
      console.log('Using cached profile');
      setProfile(cachedProfile);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      // Set fetching flag to prevent duplicate requests
      fetchingRef.current = true;

      const { data, error } = await supabase
        .from('profiles')
        .select('*, company:company_id(company_name)')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        setProfile(null);
      } else {
        // Cache the profile
        if (data) {
          profileCache.set(userId, data);
        }
        setProfile(data);
      }

      setLoading(false);
      fetchingRef.current = false;
    };

    fetchProfile();

    // Cleanup function
    return () => {
      fetchingRef.current = false;
    };
  }, [userId]);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(() => ({ profile, loading }), [profile, loading]);
}
