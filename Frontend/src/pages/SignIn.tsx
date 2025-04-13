import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { useState } from "react";
import { Link } from "react-router";
import supabase from "@/lib/supabase";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function emailSignIn() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      return;
    }
    // Redirect to home page after successful login
    window.location.href = "/";
  }

  async function linkedInSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
    });

    if (error) {
      console.log(error);
      return;
    }
  }

  return (
    <div className="fixed inset-0 overflow-hidden flex">
      {/* Left half with form */}

      <div className="w-1/2 h-full overflow-hidden flex flex-col items-center justify-center p-8">
        <InteractiveGridPattern
          className="w-full h-full scale-110"
          width={60}
          height={60}
          squares={[50, 50]}
          squaresClassName="hover:bg-gray-100 skew-3"
        />
        <div className="flex z-10 flex-col gap-1">
          <img
            src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets//Main%20dark.svg"
            className="h-2/5 aspect-auto"
          />
          <span className="text-muted-foreground tracking-wide text-2xl font-light">
            Welcome back! Sign in to continue.
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            emailSignIn();
          }}
          className="flex flex-col z-10 overflow-hidden bg-gray-50 gap-4 p-8 rounded-md shadow-md h-fit w-2/3 border items-center justify-center"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              className="bg-white"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="flex flex-row items-center gap-1 w-full">
              <Input
                className="bg-white"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Toggle
                pressed={showPassword}
                onPressedChange={setShowPassword}
                aria-label="Toggle password visibility"
                variant={"outline"}
                className="bg-white"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Toggle>
            </div>
          </div>
          <Button type="submit" className="w-full" variant={"default"}>
            Sign In
          </Button>
          <div className="w-full flex gap-3 flex-row items-center justify-center">
            <Separator />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>
          <Button
            className="w-full"
            variant={"outline"}
            onClick={linkedInSignIn}
          >
            <SiLinkedin />
            Continue with LinkedIn
          </Button>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
      {/* Right half with image */}
      <div className="w-1/2 grayscale h-full">
        <img
          src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets//sid-saxena-tsXADt9ldio-unsplash.jpg"
          alt="Drawingboard Capital"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
