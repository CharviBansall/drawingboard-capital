import { Building, User } from 'lucide-react';
import { OnboardingState, useOnboardingState } from './OnboardingState';
import { useNavigate } from 'react-router';
import AuthLayout from '@/layout/AuthLayout';

export default function OnboardingInvestorType() {
  const navigate = useNavigate();
  const investorTypes = [
    {
      name: 'Investor',

      value: 'investor' as OnboardingState['profileType'],
      icon: User,
    },
    {
      name: 'Fund Manager',

      value: 'fund_manager' as OnboardingState['profileType'],
      icon: Building,
    },
  ];
  const [_onboardingState, setOnboardingState] = useOnboardingState();

  const staticImageUrl =
    'https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg';

  return (
    <AuthLayout imageUrl={staticImageUrl}>
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="flex flex-col gap-4 w-96">
          <h1 className="text-2xl font-medium text-white text-center">
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
                      profileType: item.value,
                    }));
                    navigate('/onboarding/form');
                  }}
                >
                  <item.icon size={28} className="mb-2" />
                  <p className="font-medium text-sm text-blue-12">
                    {item.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
