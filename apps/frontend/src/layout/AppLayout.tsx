import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useRequireOnboarding } from '@/hooks/useRequireOnboarding';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar';

export function AppLayout() {
  const { loading: authLoading } = useRequireAuth();
  const { loading: onboardingLoading } = useRequireOnboarding();

  if (authLoading || onboardingLoading) return <div>Loading...</div>;

  return (
    <div className="h-fit min-h-screen overflow-hidden min-w-screen flex flex-row">
      <div className="w-1/6 relative">
        <Sidebar />
      </div>
      <main className="h-fit min-h-screen overflow-y-auto w-5/6 flex py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
}
