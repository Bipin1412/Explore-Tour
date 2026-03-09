"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { rememberAuthRedirect, useAuth } from "@/components/auth/AuthProvider";
import { getAuthApiBaseUrl, getGoogleAuthUrl } from "@/lib/auth/api";
import { AuthResponse } from "@/types/auth";

type AuthMode = "login" | "signup";

const backendErrorMap: Record<string, string> = {
  google_auth_failed: "Google login could not be completed. Please try again.",
  google_email_missing: "Google account did not return an email address."
};

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as { message?: string; error?: string };
    return data.message ?? data.error ?? "Request failed.";
  } catch {
    return "Request failed.";
  }
}

export default function AuthScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isReady, isAuthenticated, setSession } = useAuth();

  const nextPath = searchParams.get("next") || "/";
  const authError = searchParams.get("error");
  const [mode, setMode] = useState<AuthMode>(searchParams.get("mode") === "signup" ? "signup" : "login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(backendErrorMap[authError ?? ""] ?? "");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: ""
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setMode(searchParams.get("mode") === "signup" ? "signup" : "login");
    setMessage(backendErrorMap[searchParams.get("error") ?? ""] ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace(nextPath);
    }
  }, [isAuthenticated, isReady, nextPath, router]);

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${getAuthApiBaseUrl()}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginForm)
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const auth = (await response.json()) as AuthResponse;
      setSession(auth);
      router.replace(nextPath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (signupForm.password !== signupForm.confirmPassword) {
      setMessage("Password and confirm password must match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${getAuthApiBaseUrl()}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupForm)
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      const auth = (await response.json()) as AuthResponse;
      setSession(auth);
      router.replace(nextPath);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startGoogleLogin = () => {
    rememberAuthRedirect(nextPath);
    window.location.href = getGoogleAuthUrl();
  };

  return (
    <main className="min-h-screen px-4 py-8 text-white sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-[36px] border border-white/15 bg-[#091724]/70 shadow-[0_24px_100px_rgba(5,12,22,0.45)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(146,210,193,0.32),_transparent_34%),radial-gradient(circle_at_80%_24%,_rgba(215,155,67,0.35),_transparent_28%),linear-gradient(160deg,_rgba(7,19,31,0.9),_rgba(13,39,52,0.9))]" />
          <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-[#d79b43]/18 blur-3xl" />
          <div className="absolute right-6 top-16 h-64 w-64 rounded-full bg-[#9ed0c4]/12 blur-3xl" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#9dc3d1]">Explorer Tours</p>
              <h1 className="mt-6 max-w-xl font-display text-5xl leading-[1.02] text-[#fff3df] sm:text-6xl">
                Secure access before your next mountain departure.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-[#d4e3e8]">
                Users must login before booking a trip. Sign in with Google or use your email and
                password account to unlock checkout.
              </p>
            </div>

            <div className="grid gap-4 pt-8 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#9dc3d1]">Signup Fields</p>
                <p className="mt-3 text-lg font-semibold text-[#fff3df]">
                  Name, email, phone number, password, and confirm password.
                </p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/6 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#9dc3d1]">Booking Rule</p>
                <p className="mt-3 text-lg font-semibold text-[#fff3df]">
                  The booking form stays locked until the user is authenticated.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(180deg,_rgba(250,244,233,0.98),_rgba(241,233,219,0.98))] p-6 text-[#1f2831] sm:p-10">
          <div className="mx-auto max-w-lg">
            <div className="flex gap-2 rounded-full bg-[#e5d7c4] p-1">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                  mode === "login" ? "bg-[#102637] text-white" : "text-[#5f5245]"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                  mode === "signup" ? "bg-[#102637] text-white" : "text-[#5f5245]"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="mt-6 rounded-[32px] border border-[#d2c0ab] bg-white p-6 shadow-[0_24px_80px_rgba(66,42,18,0.08)] sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-[#8d6f4d]">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-[#1e2931]">
                    {mode === "login" ? "Login to continue booking" : "Start with your traveller profile"}
                  </h2>
                </div>
                <Link href="/" className="text-sm font-semibold text-[#7f623f] underline-offset-4 hover:underline">
                  Back Home
                </Link>
              </div>

              <button
                type="button"
                onClick={startGoogleLogin}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl border border-[#d9c7b2] bg-[#fbf4ea] px-4 py-3 text-sm font-semibold text-[#1f2831] transition hover:bg-[#f5eadb]"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#eadfce]" />
                <span className="text-xs uppercase tracking-[0.24em] text-[#9c8466]">or</span>
                <div className="h-px flex-1 bg-[#eadfce]" />
              </div>

              {mode === "login" ? (
                <form className="space-y-4" onSubmit={submitLogin}>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-[#63503e]">Email address</span>
                    <input
                      value={loginForm.email}
                      onChange={(event) =>
                        setLoginForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-[#dccbb6] bg-[#fffaf3] px-4 py-3 text-sm text-[#1f2831] outline-none transition focus:border-[#b58444]"
                    />
                  </label>

                  <PasswordField
                    label="Password"
                    value={loginForm.password}
                    onChange={(value) => setLoginForm((prev) => ({ ...prev, password: value }))}
                    visible={showLoginPassword}
                    onToggleVisibility={() => setShowLoginPassword((prev) => !prev)}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-[#102637] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#18374b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={submitSignup}>
                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-[#63503e]">Full name</span>
                    <input
                      value={signupForm.fullName}
                      onChange={(event) =>
                        setSignupForm((prev) => ({ ...prev, fullName: event.target.value }))
                      }
                      placeholder="Your full name"
                      className="w-full rounded-2xl border border-[#dccbb6] bg-[#fffaf3] px-4 py-3 text-sm text-[#1f2831] outline-none transition focus:border-[#b58444]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-[#63503e]">Email address</span>
                    <input
                      value={signupForm.email}
                      onChange={(event) =>
                        setSignupForm((prev) => ({ ...prev, email: event.target.value }))
                      }
                      type="email"
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-[#dccbb6] bg-[#fffaf3] px-4 py-3 text-sm text-[#1f2831] outline-none transition focus:border-[#b58444]"
                    />
                  </label>

                  <label className="block space-y-1.5">
                    <span className="text-sm font-medium text-[#63503e]">Phone number</span>
                    <input
                      value={signupForm.phoneNumber}
                      onChange={(event) =>
                        setSignupForm((prev) => ({ ...prev, phoneNumber: event.target.value }))
                      }
                      placeholder="9876543210"
                      className="w-full rounded-2xl border border-[#dccbb6] bg-[#fffaf3] px-4 py-3 text-sm text-[#1f2831] outline-none transition focus:border-[#b58444]"
                    />
                  </label>

                  <PasswordField
                    label="Password"
                    value={signupForm.password}
                    onChange={(value) => setSignupForm((prev) => ({ ...prev, password: value }))}
                    visible={showSignupPassword}
                    onToggleVisibility={() => setShowSignupPassword((prev) => !prev)}
                  />

                  <PasswordField
                    label="Confirm password"
                    value={signupForm.confirmPassword}
                    onChange={(value) =>
                      setSignupForm((prev) => ({ ...prev, confirmPassword: value }))
                    }
                    visible={showConfirmPassword}
                    onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl bg-[#102637] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#18374b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up and Login"}
                  </button>
                </form>
              )}

              {message ? <p className="mt-4 text-sm font-medium text-[#a3432c]">{message}</p> : null}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  visible,
  onToggleVisibility
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggleVisibility: () => void;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-[#63503e]">{label}</span>
      <div className="relative">
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={visible ? "text" : "password"}
          className="w-full rounded-2xl border border-[#dccbb6] bg-[#fffaf3] px-4 py-3 pr-14 text-sm text-[#1f2831] outline-none transition focus:border-[#b58444]"
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-semibold text-[#7a6040] transition hover:bg-[#f2e5d4]"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.8 12.23c0-.71-.06-1.24-.19-1.8H12v3.4h5.64c-.11.84-.73 2.1-2.11 2.95l-.02.11 3.07 2.38.21.02c1.94-1.79 3.01-4.42 3.01-7.06Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.76 0 5.07-.91 6.76-2.47l-3.22-2.5c-.86.6-2.01 1.02-3.54 1.02-2.7 0-4.98-1.79-5.79-4.27l-.1.01-3.19 2.48-.03.09A10.2 10.2 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.21 13.78A6.11 6.11 0 0 1 5.87 12c0-.61.12-1.2.32-1.78l-.01-.12-3.23-2.52-.11.05A10 10 0 0 0 2 12c0 1.6.39 3.11 1.08 4.43l3.13-2.65Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.95c1.93 0 3.23.83 3.97 1.53l2.9-2.83C17.06 2.95 14.76 2 12 2a10.2 10.2 0 0 0-9.11 5.57l3.35 2.59C7.05 7.74 9.32 5.95 12 5.95Z"
      />
    </svg>
  );
}
