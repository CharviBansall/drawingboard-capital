import { ArrowLeft } from '@phosphor-icons/react';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import { useLocation, useNavigate } from 'react-router';
import supabase from '@/lib/supabase';
import { useState, useEffect } from 'react';
import AuthLayout from '@/layout/AuthLayout';

export default function OtpPage() {
  const staticImageUrl =
    'https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg';
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get('email');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0); // Countdown timer in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  async function verifyOTP(token: string) {
    if (!email) return;
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    if (error) {
      setError(error.message);
    } else {
      console.log(data);
      navigate('/home');
    }
  }

  // Effect to handle countdown timer
  useEffect(() => {
    let timer: number | undefined;

    if (countdown > 0) {
      setIsResendDisabled(true);
      timer = window.setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  async function resendOTP() {
    if (!email || isResendDisabled) return;

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: responseData, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else if (responseData) {
      // Start the countdown timer (120 seconds = 2 minutes)
      setCountdown(120);
      navigate(`/otp?email=${encodeURIComponent(email)}`);
    }
  }

  const OTPField = () => (
    <OneTimePasswordField.Root
      autoFocus
      autoSubmit
      onAutoSubmit={(e) => verifyOTP(e)}
      className="flex my-4"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <OneTimePasswordField.Input
          key={i}
          className={`aspect-square focus:border-slate-500 focus:outline-none focus:border border-slate-700 w-full text-white text-lg text-center ${
            i === 0
              ? 'rounded-l-md border-l border-r border-y'
              : i === 5
                ? 'rounded-r-md border-r border-l border-y'
                : 'border-l border-r border-y'
          }`}
        />
      ))}
      <OneTimePasswordField.HiddenInput />
    </OneTimePasswordField.Root>
  );

  return (
    <AuthLayout imageUrl={staticImageUrl}>
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="flex flex-col w-96">
          <button
            onClick={() => navigate('/signup')} // Or perhaps back to signin? Consider UX.
            className="w-fit mb-4 cursor-pointer text-slate-400 hover:text-white transition-all flex items-center flex-row gap-2 self-start"
          >
            <ArrowLeft />
            Back
          </button>
          <h1 className="text-2xl font-medium text-white text-center mb-2">
            Email verification
          </h1>
          <p className="text-slate-400 text-center">
            Enter the verification code or click on the link we sent to {email}.
          </p>
          <p className="text-red-400 mt-4 text-center">{error || ''}</p>
          <OTPField />
          <button
            onClick={resendOTP}
            disabled={isResendDisabled}
            className={`w-fit mb-4 flex items-center flex-row gap-2 self-center ${
              isResendDisabled
                ? 'text-slate-600 cursor-not-allowed'
                : 'cursor-pointer text-slate-400 hover:text-white transition-all'
            }`}
          >
            {isResendDisabled
              ? `Code sent. You can request a new code in ${formatDuration(countdown)}.`
              : 'Resend code'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
