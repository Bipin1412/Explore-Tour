"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { consumeAuthRedirect, useAuth } from "@/components/auth/AuthProvider";
import { fetchCurrentUser, getAuthApiBaseUrl } from "@/lib/auth/api";

export default function GoogleAuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setSession } = useAuth();
  const [message, setMessage] = useState("Completing your Google login...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.replace("/login?error=google_auth_failed");
      return;
    }

    let cancelled = false;

    const completeLogin = async () => {
      const user = await fetchCurrentUser(token, getAuthApiBaseUrl());

      if (cancelled) {
        return;
      }

      if (!user) {
        router.replace("/login?error=google_auth_failed");
        return;
      }

      setSession({ token, user });
      setMessage("Redirecting to your booking flow...");
      router.replace(consumeAuthRedirect() ?? "/");
    };

    void completeLogin();

    return () => {
      cancelled = true;
    };
  }, [router, searchParams, setSession]);

  return (
    <main className="flex min-h-screen items-center justify-center px-4 text-white">
      <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-[#0f2538]/82 p-8 text-center shadow-[0_24px_80px_rgba(7,15,26,0.35)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-[#9dc3d1]">Google Authentication</p>
        <h1 className="mt-3 font-display text-3xl text-[#fff3df]">Signing you in</h1>
        <p className="mt-3 text-sm text-[#d4e3e8]">{message}</p>
      </div>
    </main>
  );
}
