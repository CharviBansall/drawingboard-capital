import { useNavigate } from 'react-router';
import { useState } from 'react';
import Input from '@/components/Input';
import supabase from '@/lib/supabase';
import Button from '@/components/Button';
import AuthLayout from '@/layout/AuthLayout';

export default function SignInPage() {
  const staticImageUrl =
    'https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg';
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
    <AuthLayout imageUrl={staticImageUrl}>
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="flex flex-col gap-4 w-96">
          <h1 className="text-2xl font-medium text-white text-center mb-6">
            Sign in
          </h1>
          <p className="text-slate-400 text-center">
            Welcome back to DrawingBoard Capital.
          </p>
          {error && (
            <p className="text-red-400 mt-2 text-center">{error || ''}</p>
          )}
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
          <div className="flex flex-row gap-2 items-center justify-center mt-4">
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
    </AuthLayout>
  );
}
