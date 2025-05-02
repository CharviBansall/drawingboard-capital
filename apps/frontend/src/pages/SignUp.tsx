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
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
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

  async function signUpWithEmail(data: SignUpForm) {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      navigate('/home');
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signUpWithEmail)}
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
      <input
        type="password"
        className="border rounded-md p-2"
        placeholder="Password"
        {...register('password')}
        disabled={isSubmitting}
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}
      <Button type="submit" disabled={isSubmitting}>
        Signup
      </Button>
      <span>
        Already have an account?{' '}
        <Link to="/signin">
          {' '}
          <span className="text-blue-600">Sign in</span>
        </Link>{' '}
      </span>
    </form>
  );
}
