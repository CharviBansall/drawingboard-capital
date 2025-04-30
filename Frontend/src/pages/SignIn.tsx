import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/lib/supabase";
import Button from "@/ui/Button/Button";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
type SignInForm = z.infer<typeof signInSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
  });
  const navigate = useNavigate();
  const { session } = useAuth();

  useEffect(() => {
    if (session) {
      navigate("/home");
    }
  }, [session]);

  async function signInWithEmail(data: SignInForm) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      navigate("/home");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(signInWithEmail)}
      className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-2"
    >
      <input
        type="email"
        className="border rounded-md p-2"
        placeholder="Email"
        {...register("email")}
        disabled={isSubmitting}
      />
      {errors.email && (
        <span className="text-red-500 text-xs">{errors.email.message}</span>
      )}
      <input
        type="password"
        className="border rounded-md p-2"
        placeholder="Password"
        {...register("password")}
        disabled={isSubmitting}
      />
      {errors.password && (
        <span className="text-red-500 text-xs">{errors.password.message}</span>
      )}
      <Button type="submit" disabled={isSubmitting}>
        Sign In
      </Button>
      Don't have an account?{" "}
      <Link to="/signup">
        <span className="text-blue-600">Sign up</span>
      </Link>
    </form>
  );
}
