import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { Eye, EyeOff } from "lucide-react";
import { SiLinkedin } from "react-icons/si";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import supabase from "@/lib/supabase";
import validator from "validator";
import { BlurFade } from "@/components/magicui/blur-fade";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    email: string | undefined;
    password: string | undefined;
  }>({
    email: undefined,
    password: undefined,
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!email) return;

      if (
        !validator.isEmail(email, {
          allow_underscores: true,
        })
      ) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    }, 300); // debounce time in ms

    return () => clearTimeout(debounce);
  }, [email]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (!password) {
        setErrors((prev) => ({ ...prev, password: undefined }));
        return;
      }

      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setErrors((prev) => ({
          ...prev,
          password:
            "Password must be 8+ characters with uppercase, lowercase, number, and special character",
        }));
      } else {
        setErrors((prev) => ({ ...prev, password: undefined }));
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [password]);

  async function emailSignUp() {
    if (errors.email !== undefined || errors.password !== undefined) {
      return;
    }
    console.log("signup");
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.log(error);
        return;
      }
    } catch (error: any) {
      console.error("Unexpected error during signup:", error.message);
    }
  }

  async function linkedInSignUp() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "linkedin_oidc",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
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
          squaresClassName="hover:fill-[#031a2d] skew-3"
        />
        <div className="flex z-10 pt-12 flex-col gap-1">
          <img
            src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/brand-assets//Main%20dark.svg"
            className="h-2/5 aspect-auto"
          />
          <span className=" tracking-tight text-2xl text-muted-foreground font-light">
            Your bridge to the Indian Alternatives Market
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent reload
            emailSignUp();
          }}
          className="flex flex-col z-10 overflow-hidden bg-gray-50 gap-4 p-8 rounded-md shadow-md h-fit w-2/3 border items-center justify-center"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              className={`bg-white ${errors.email ? "border-red-500" : ""}`}
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete="email"
            />{" "}
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <div className="flex flex-row items-center gap-1 w-full">
              <Input
                className={`bg-white ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="new-password"
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
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <Button type="submit" className="w-full" variant={"default"}>
            Join the Platform
          </Button>
          <div className="w-full flex gap-3 flex-row items-center justify-center">
            <Separator />
            <span className="text-muted-foreground text-sm">OR</span>
            <Separator />
          </div>
          <Button
            onClick={linkedInSignUp}
            className="w-full"
            variant={"outline"}
          >
            <SiLinkedin />
            Continue with LinkedIn
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-primary hover:underline font-medium"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
      {/* Right half with video */}
      <div className="relative w-1/2 grayscale h-full">
        <div className=" w-full h-full p-1 bg-black overflow-hidden">
          <BlurFade
            className="h-full w-full p-1 overflow-hidden"
            delay={0.25}
            inView
          >
            <video
              src="https://dszguymnctetiaycvfaq.supabase.co/storage/v1/object/public/mvp-assets//8361011-hd_1920_1080_24fps.mp4"
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              muted
              loop
            />
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
