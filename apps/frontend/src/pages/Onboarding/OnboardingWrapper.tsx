import { Outlet } from 'react-router';
import { OnboardingProvider } from '@/pages/Onboarding/OnboardingState';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import LoadingScreen from '@/ui/LoadingScreen';

export default function OnboardingWrapper() {
  const { loading: authLoading } = useRequireAuth();
  if (authLoading) return <LoadingScreen message="Authenticating..." />;

  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
