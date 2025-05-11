import { Navigate, Route, Routes } from 'react-router';
import { AppLayout } from '@/layout/AppLayout';
import Home from '@/pages/Home';
import Portfolio from '../pages/Portfolio';
import CapitalCalls from '../pages/CapitalCalls';
import Funds from '../pages/Funds';
import Fund from '../pages/Fund';
import Secondaries from '../pages/Secondaries';
import CoInvestments from '../pages/CoInvestments';
import PrivateCredit from '../pages/PrivateCredit';
import MarketInsights from '../pages/MarketInsights';
import FundReports from '../pages/FundReports';
import ManagerProfiles from '../pages/ManagerProfiles';

const componentMap = {
  Home,
  Portfolio,
  CapitalCalls,
  Funds,
  Fund,
  Secondaries,
  CoInvestments,
  PrivateCredit,
  MarketInsights,
  FundReports,
  ManagerProfiles,
};
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import AuthCallback from '../pages/AuthCallback';
import OtpPage from '@/pages/OTP';
import { internalRoutes } from './internalRoutes';
import React from 'react';
import OnboardingWrapper from '@/pages/Onboarding/OnboardingWrapper';
import OnboardingInvestorType from '@/pages/Onboarding/OnboardingInvestorType';
import OnboardingForm from '@/pages/Onboarding/OnboardingForm';

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/otp" element={<OtpPage />} />
      {/* Onboarding Routes */}
      <Route path="onboarding" element={<OnboardingWrapper />}>
        <Route index element={<OnboardingInvestorType />} />
        <Route path="form" element={<OnboardingForm />} />
      </Route>
      {/* Private routes */}
      <Route element={<AppLayout />}>
        {internalRoutes.flatMap((section) =>
          section.items.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={React.createElement(
                componentMap[item.element as keyof typeof componentMap],
              )}
            />
          )),
        )}
      </Route>
    </Routes>
  );
}
