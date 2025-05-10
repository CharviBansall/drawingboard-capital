import { Outlet } from 'react-router';
import { OnboardingProvider } from './OnboardingState';

export default function OnboardingWrapper() {
  return (
    <OnboardingProvider>
      <Outlet />
    </OnboardingProvider>
  );
}
