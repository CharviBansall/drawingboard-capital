import { Navigate, Route, Routes } from 'react-router';
import { Layout } from '@/layout/Layout';
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
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import AuthCallback from '../pages/AuthCallback';
import Onboarding from '../pages/Onboarding';
import OnboardingConfirmation from '../pages/OnboardingConfirmation';
import OtpPage from '@/pages/OTP';

export function AppRouter() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route
        path="/onboarding-confirmation"
        element={<OnboardingConfirmation />}
      />
      <Route path="/otp" element={<OtpPage />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/capital-calls" element={<CapitalCalls />} />
        <Route path="/funds" element={<Funds />} />
        <Route path="/funds/:slug" element={<Fund />} />
        <Route path="/secondaries" element={<Secondaries />} />
        <Route path="/co-investments" element={<CoInvestments />} />
        <Route path="/private-credit" element={<PrivateCredit />} />
        <Route path="/market-insights" element={<MarketInsights />} />
        <Route path="/fund-reports" element={<FundReports />} />
        <Route path="/manager-profiles" element={<ManagerProfiles />} />
      </Route>
    </Routes>
  );
}
