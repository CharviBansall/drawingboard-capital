import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import supabase from '@/lib/supabase';
import Button from '@/ui/Button/Button';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

const signUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});
type SignUpForm = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate('/home');
    }
  }, [session]);

  async function signUpWithMagicLink(data: SignUpForm) {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: responseData, error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/callback`,
      },
    });
    if (error) {
      console.error('Error signing up:', error.message);
    } else if (responseData) {
      navigate(`/otp?email=${encodeURIComponent(data.email)}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signUpWithMagicLink)}
      className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-2"
    >
      <input
        type="email"
        className="border rounded-md p-2"
        placeholder="Email"
        {...register('email')}
        disabled={isSubmitting}
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}
      <Button type="submit" disabled={isSubmitting}>
        Sign up with magic link
      </Button>
      <span>
        Already have an account?{' '}
        <Link to="/signin">
          <span className="text-blue-600">Sign in</span>
        </Link>{' '}
      </span>
    </form>
  );
}
