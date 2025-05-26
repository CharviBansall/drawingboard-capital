import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRequireOnboarding } from '@/hooks/useRequireOnboarding';
import { Outlet } from 'react-router';
import Sidebar from '@/layout/Sidebar';
import LoadingScreen from '@/ui/LoadingScreen';

export function AppLayout() {
  const { loading: authLoading } = useRequireAuth();
  const { loading: onboardingLoading } = useRequireOnboarding();

  if (authLoading || onboardingLoading)
    return <LoadingScreen message="Authenticating..." />;

  return (
    <div className="h-fit min-h-screen overflow-hidden min-w-screen flex flex-row">
      <div className="w-1/6 relative">
        <Sidebar />
      </div>
      <main className="h-fit min-h-screen overflow-y-auto w-5/6 flex p-8">
        <Outlet />
      </main>
    </div>
  );
}
