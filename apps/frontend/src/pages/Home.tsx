import { useProfile } from '@/hooks/useProfile';
import PageTitle from '@/components/PageTitle';

export default function Home() {
  const { profile } = useProfile();

  return (
    <div className="w-full h-full">
      {/* Welcome Header */}
      <PageTitle title={`Welcome, ${profile?.first_name}.`} />
      {/* Main Section */}
    </div>
  );
}
