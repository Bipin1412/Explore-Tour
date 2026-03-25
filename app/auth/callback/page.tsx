import { Suspense } from "react";
import GoogleAuthCallbackClient from "@/components/auth/GoogleAuthCallbackClient";

export default function GoogleAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-4 text-white">
          <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-[#0f2538]/82 p-8 text-center shadow-[0_24px_80px_rgba(7,15,26,0.35)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.24em] text-[#9dc3d1]">Google Authentication</p>
            <h1 className="mt-3 font-display text-3xl text-[#fff3df]">Signing you in</h1>
            <p className="mt-3 text-sm text-[#d4e3e8]">Completing your Google login...</p>
          </div>
        </main>
      }
    >
      <GoogleAuthCallbackClient />
    </Suspense>
  );
}
