import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import supabase from '@/lib/supabase';

export default function AuthCallback() {
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    const handleMagicLink = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          // In some cases the session may not be immediately available
          const { data: refreshed, error: refreshError } =
            await supabase.auth.refreshSession();
          if (refreshError || !refreshed.session)
            throw refreshError || new Error('No session');

          // fallback success
        }

        // User is authenticated; redirect to dashboard or app home
        navigate('/home');
      } catch (err) {
        console.error('Magic link handling failed:', err);
        setStatus('error');
      }
    };

    handleMagicLink();
  }, [navigate]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-medium">Signing you in…</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-red-600 text-lg font-semibold mb-2">
          Authentication Failed
        </div>
        <p className="text-gray-600">
          The login link may have expired or been used already.
        </p>
      </div>
    </div>
  );
}
