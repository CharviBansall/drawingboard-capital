import { useNavigate } from 'react-router';
import { useOnboardingState } from './OnboardingState';
import { useEffect } from 'react';
import OnboardingFormInstitution from './OnboardingFormInstitution';
import OnboardingFormIndividual from './OnboardingFormIndividual';
import OnboardingFormIntermediary from './OnboardingFormIntermediary';

export default function OnboardingForm() {
  const [onboardingState, _setOnboardingState] = useOnboardingState();
  const navigate = useNavigate();
  useEffect(() => {
    if (!onboardingState.investorType) {
      navigate('/onboarding');
    }
  }, [onboardingState.investorType]);

  let FormComponent = null;
  if (onboardingState.investorType === 'institutional') {
    FormComponent = <OnboardingFormInstitution />;
  } else if (onboardingState.investorType === 'individual') {
    FormComponent = <OnboardingFormIndividual />;
  } else if (onboardingState.investorType === 'intermediary') {
    FormComponent = <OnboardingFormIntermediary />;
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-row ">
      <div className="w-1/2 bg-blue-12 flex relative text-white flex-col items-center justify-center">
        <img
          src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets/svg/WhiteLogoNoWordmark.svg"
          className="h-16 aspect-auto absolute top-12 left-12"
        />
        {FormComponent}
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="https://picsum.photos/2000"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
