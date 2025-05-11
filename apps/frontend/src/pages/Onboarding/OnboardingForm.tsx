import { useNavigate } from 'react-router';
import { useOnboardingState } from './OnboardingState';
import { useEffect } from 'react';
// Supabase and useState are no longer needed
import OnboardingFormInstitution from './OnboardingFormInstitution';
import OnboardingFormIndividual from './OnboardingFormIndividual';
import OnboardingFormIntermediary from './OnboardingFormIntermediary';
import AuthLayout from '../../components/AuthLayout';

export default function OnboardingForm() {
  const [onboardingState, _setOnboardingState] = useOnboardingState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!onboardingState.investorType) {
      navigate('/onboarding');
    }
  }, [onboardingState.investorType, navigate]);

  let FormComponent = null;
  if (onboardingState.investorType === 'institutional') {
    FormComponent = <OnboardingFormInstitution />;
  } else if (onboardingState.investorType === 'individual') {
    FormComponent = <OnboardingFormIndividual />;
  } else if (onboardingState.investorType === 'intermediary') {
    FormComponent = <OnboardingFormIntermediary />;
  }

  const staticImageUrl = "https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg";

  return (
    <AuthLayout imageUrl={staticImageUrl} altText="Office background image">
      {FormComponent}
    </AuthLayout>
  );
}
