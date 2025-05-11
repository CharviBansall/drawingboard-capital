import { Outlet } from 'react-router';
import { OnboardingProvider } from './OnboardingState';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function OnboardingWrapper() {
  const { loading: authLoading } = useRequireAuth();
  if (authLoading) return <div>Loading...</div>;

  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
