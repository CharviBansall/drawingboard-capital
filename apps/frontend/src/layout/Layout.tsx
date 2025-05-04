import { Outlet } from 'react-router';

import Sidebar from './Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router';

export function Layout() {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  if (!user || !session) {
    console.log('not logged in');
    navigate('/signin');
  } else
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
