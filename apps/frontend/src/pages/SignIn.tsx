import { useNavigate } from 'react-router';
import { useState } from 'react';
import Input from '@/components/Input';
import supabase from '@/lib/supabase';
import Button from '@/components/Button';

export default function SignInPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function SignIn() {
    if (!email) {
      setError('Email is required');
      return;
    }
    setIsLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: responseData, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
        shouldCreateUser: false,
      },
    });
    if (error) {
      setError(error.message);
    } else if (responseData) {
      return navigate(`/otp?email=${encodeURIComponent(email)}`);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-row ">
      <div className="w-1/2 bg-blue-12 flex relative text-white flex-col items-center justify-center">
        <img
          src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets/svg/WhiteLogoNoWordmark.svg"
          className="h-16 aspect-auto absolute top-12 left-12"
        />
        <div className="flex flex-col gap-4 w-96">
          <h1 className="text-2xl font-medium">Sign in</h1>
          <p className="text-slate-400">
            Welcome back to DrawingBoard Capital.
          </p>
          {error && <p className="text-red-400">{error || ''}</p>}
          <Input
            props={{
              label: 'Email',
              type: 'email',
              placeholder: 'warren@example.com',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              autoFocus: true,
            }}
          />
          <Button
  isLoading={isLoading}
  disabled={!email || isLoading}
  onClick={SignIn}
>
  Continue
</Button>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-slate-400">Don't have an account?</p>
            <a
              href="/signup"
              className={`text-white hover:underline transition-all`}
            >
              Sign up instead.
            </a>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <img
          src="https://picsum.photos/2000"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
