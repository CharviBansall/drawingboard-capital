import { Enums } from '@/types/types-supabase';
import { createContext, useContext, useState } from 'react';

export type OnboardingState = {
  profileType?: Enums<'profile_type_enum'>;
};

type OnboardingContextType = [
  OnboardingState,
  React.Dispatch<React.SetStateAction<OnboardingState>>,
];

export const OnboardingContext = createContext<
  OnboardingContextType | undefined
>(undefined);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const value = useState<OnboardingState>({});
  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingState() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within the OnboardingProvider');
  }
  return context;
}
