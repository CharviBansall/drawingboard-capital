import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProfile } from '@/hooks/useProfile';

export function useRequireOnboarding() {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  // Development mode: bypass onboarding
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (!isDevelopment) {
      if (!loading && profile && profile.eligibility === 'not_submitted') {
        navigate('/onboarding', { replace: true });
      } else if (profile?.eligibility === 'pending_approval') {
        navigate('/onboarding-confirmation', { replace: true });
      } else if (profile?.eligibility === 'denied') {
        navigate('/denied', { replace: true });
      } else return;
    }
  }, [profile, loading, navigate, isDevelopment]);

  return { profile, loading: false }; // Set loading to false for development
}
