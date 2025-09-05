import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function useRequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Development mode: bypass authentication
  const isDevelopment = import.meta.env.DEV;

  useEffect(() => {
    if (!isDevelopment && !loading && !user) {
      navigate('/signup', { replace: true });
    }
  }, [user, loading, navigate, isDevelopment]);

  return { user, loading: false }; // Set loading to false for development
}
