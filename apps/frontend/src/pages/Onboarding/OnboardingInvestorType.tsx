import { Briefcase, Building, User } from 'lucide-react';
import { OnboardingState, useOnboardingState } from './OnboardingState'; // Assuming OnboardingState is in the same directory
import { useNavigate } from 'react-router';
import AuthLayout from '@/components/AuthLayout';

export default function OnboardingInvestorType() {
  const navigate = useNavigate();
  const investorTypes = [
    {
      name: 'Institutional Investor',

      value: 'institutional' as OnboardingState['investorType'],
      icon: Building,
    },
    {
      name: 'Accredited Investor',

      value: 'individual' as OnboardingState['investorType'],
      icon: User,
    },
    {
      name: 'Financial Advisor',

      value: 'intermediary' as OnboardingState['investorType'],
      icon: Briefcase,
    },
  ];
  const [, setOnboardingState] = useOnboardingState();

  const staticImageUrl = "https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg";

  return (
    <AuthLayout imageUrl={staticImageUrl} altText="Abstract city scape">
      <div className="flex flex-col items-center justify-center h-full p-8">
        {/* Removed logo img tag, assuming AuthLayout or another parent handles branding if needed */}
        <div className="flex flex-col gap-4 w-96">
          <h1 className="text-2xl font-medium text-white text-center mb-6">
            What type of investor are you?
          </h1>
          <div className="grid grid-rows-3 gap-3 mb-12">
            {investorTypes.map((item) => {
              return (
                <div
                  key={item.value}
                  className={`bg-blue-3 hover:bg-blue-4 transition-all rounded-md text-blue-12 
                  p-4 cursor-pointer flex flex-col items-center gap-2 justify-between text-center`}
                  onClick={() => {
                    setOnboardingState((prev) => ({
                      ...prev,
                      investorType: item.value,
                    }));
                    navigate('/onboarding/form');
                  }}
                >
                  <item.icon size={28} className="mb-2" /> {/* Increased icon size and added margin */}
                  <p className="font-medium text-sm text-white">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
