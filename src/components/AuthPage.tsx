import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Check, PawPrint, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FloatingPaws } from "@/components/FloatingPaws";
import { AchievementBadges } from "@/components/AchievementBadges";
import dogMascot from "@/assets/dog-mascot.png";

type Tab = "signup" | "login";

export function AuthPage() {
  const [tab, setTab] = useState<Tab>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    setEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background overflow-hidden">
      <FloatingPaws />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center px-6 pt-10 pb-8">
        {/* Logo & Mascot */}
        <div className="flex flex-col items-center mb-2">
          <div className="relative mb-2">
            <img
              src={dogMascot}
              alt="Happy dog mascot"
              className="h-28 w-28 object-contain drop-shadow-md"
            />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <PawPrint className="text-primary" size={24} />
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-display">
              PawSchool
            </h1>
          </div>
        </div>

        {/* Headline */}
        {tab === "signup" ? (
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Start Your Dog's Training Journey 🐕
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              In 30 days, you'll see real progress
            </p>
          </div>
        ) : (
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-foreground">
              Welcome back! 👋
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Today is a great day to train! 🎯
            </p>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex w-full rounded-2xl bg-muted p-1 mb-6">
          <button
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              tab === "signup"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
          <button
            className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all duration-200 ${
              tab === "login"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => setTab("login")}
          >
            Log In
          </button>
        </div>

        {/* Step indicator for signup */}
        {tab === "signup" && (
          <div className="flex items-center gap-2 mb-5 self-start">
            <div className="flex items-center gap-1">
              <div className="h-2 w-8 rounded-full bg-primary" />
              <div className="h-2 w-8 rounded-full bg-muted" />
              <div className="h-2 w-8 rounded-full bg-muted" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground">Step 1 of 3</span>
          </div>
        )}

        {/* Form */}
        <div className="w-full space-y-3">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="email"
              placeholder="Email address"
              className="pl-11 pr-10"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailValid && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Check className="text-primary" size={16} />
              </div>
            )}
          </div>
          {tab === "signup" && emailValid && (
            <p className="text-xs font-semibold text-primary pl-1">Great choice! ✓</p>
          )}

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-11 pr-12"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Login extras */}
          {tab === "login" && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded accent-primary h-4 w-4" />
                Remember me
              </label>
              <button className="text-xs font-semibold text-trust hover:underline">
                Forgot Password?
              </button>
            </div>
          )}

          {/* CTA */}
          <Button size="lg" className="w-full animate-pulse-glow text-base mt-2">
            {tab === "signup" ? "Get Started" : "Continue"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Google */}
          <Button variant="google" size="lg" className="w-full">
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Achievements (signup only) */}
        {tab === "signup" && (
          <div className="mt-8 w-full">
            <p className="text-xs font-semibold text-muted-foreground text-center mb-3">
              🔒 Upcoming achievements
            </p>
            <AchievementBadges />
          </div>
        )}

        {/* Streak hint (login only) */}
        {tab === "login" && (
          <div className="mt-8 flex items-center gap-2 rounded-2xl bg-secondary/60 px-4 py-3 w-full">
            <span className="text-2xl">🔥</span>
            <span className="text-sm font-semibold text-secondary-foreground">
              1 day streak! Keep it going →
            </span>
          </div>
        )}

        {/* Social Proof */}
        <div className="mt-8 flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted"
              >
                <Users size={12} className="text-muted-foreground" />
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-bold text-foreground">50,000+</span> dog trainers already joined
          </p>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[11px] text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <button className="underline hover:text-foreground">Terms</button> &{" "}
          <button className="underline hover:text-foreground">Privacy Policy</button>
        </p>
      </div>
    </div>
  );
}
