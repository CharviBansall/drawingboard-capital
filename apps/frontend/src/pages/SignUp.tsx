import { useNavigate } from 'react-router';
import { useState } from 'react';
import Input from '@/components/Input';
import supabase from '@/lib/supabase';
import Confirmation from '@/components/Confirmation';
import Button from '@/components/Button';
import AuthLayout from '@/layout/AuthLayout';

export default function SignUpPage() {
  const staticImageUrl =
    'https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets/office-images/dave-goudreau-Fa7Zv28vxa4-unsplash.jpg';
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function SignUp() {
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
        shouldCreateUser: true,
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
          <h1 className="text-2xl font-medium text-white text-center">
            Sign up
          </h1>
          <p className="text-slate-400 text-center">
            DrawingBoard Capital is currently in early access. Sign up to be one
            of the first to try it out and help us shape the future.
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
          <Confirmation
            id="terms"
            label={
              <span className="text-slate-400">
                I agree to the{' '}
                <a href="#" className="text-white hover:underline">
                  DrawingBoard Terms and Conditions.
                </a>
              </span>
            }
            checked={termsChecked}
            onCheckedChange={setTermsChecked}
            required
          />
          <Confirmation
            id="demo"
            label={
              <span className="text-slate-400">
                I acknowledge that this is a demonstration environment. All data
                presented is fictitious and should not be construed as
                investment advice, an offer, or a solicitation to buy or sell
                any security.
              </span>
            }
            checked={demoChecked}
            onCheckedChange={setDemoChecked}
            required
          />

          <Button
            isLoading={isLoading}
            disabled={!email || !termsChecked || !demoChecked || isLoading}
            onClick={SignUp}
          >
            Continue
          </Button>
          <div className="flex flex-row gap-2 items-center justify-center mt-4">
            <p className="text-slate-400">Already have an account?</p>
            <a
              href="/signin"
              className={`text-white hover:underline transition-all`}
            >
              Sign in instead.
            </a>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
