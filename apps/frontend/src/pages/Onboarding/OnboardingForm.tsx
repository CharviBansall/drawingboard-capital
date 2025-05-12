import { useNavigate } from 'react-router';
import { useOnboardingState } from './OnboardingState';
import { useEffect } from 'react';
import OnboardingFormInstitution from './OnboardingFormInstitution';
import OnboardingFormIndividual from './OnboardingFormIndividual';
import OnboardingFormIntermediary from './OnboardingFormIntermediary';
import AuthLayout from '../../layout/AuthLayout';

export default function OnboardingForm() {
  const [onboardingState, _setOnboardingState] = useOnboardingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!onboardingState.profileType) {
      navigate('/onboarding');
    }
  }, [onboardingState.profileType, navigate]);

  let FormComponent = null;
  if (onboardingState.profileType === 'investor') {
    FormComponent = <OnboardingFormInstitution />;
  } else if (onboardingState.profileType === 'fund_manager') {
    FormComponent = <OnboardingFormIndividual />;
  } else if (onboardingState.profileType === 'admin') {
    FormComponent = <OnboardingFormIntermediary />;
  }

  const staticImageUrl =
    'https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg';

  return <AuthLayout imageUrl={staticImageUrl}>{FormComponent}</AuthLayout>;
}
