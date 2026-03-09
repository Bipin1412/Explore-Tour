"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function TripLoginModal({
  tripName
}: {
  tripName: string;
}) {
  const pathname = usePathname();
  const { isReady, isAuthenticated } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setDismissed(false);
  }, [pathname]);

  if (!isReady || isAuthenticated || dismissed) {
    return null;
  }

  const nextPath = pathname || "/";

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#08131d]/62 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-xl overflow-hidden rounded-[34px] border border-white/15 bg-[#0d2030]/94 text-white shadow-[0_30px_120px_rgba(4,10,18,0.5)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(146,210,193,0.24),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(215,155,67,0.24),_transparent_34%),linear-gradient(180deg,_rgba(12,28,41,0.96),_rgba(8,18,29,0.98))]" />

        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white transition hover:bg-white/10"
            aria-label="Close login popup"
          >
            x
          </button>

          <p className="text-xs uppercase tracking-[0.28em] text-[#9dc3d1]">Trek Login Popup</p>
          <h2 className="mt-4 max-w-lg font-display text-4xl leading-tight text-[#fff3df]">
            Login before booking this trek.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#d5e1e7]">
            You opened <span className="font-semibold text-[#fff3df]">{tripName}</span>. This popup
            appears on trek pages so the user can sign in first and then continue to booking.
          </p>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#9dc3d1]">Account Options</p>
            <p className="mt-3 text-sm leading-6 text-[#d5e1e7]">
              Use Google authentication or create an account with name, email, phone number,
              password, and confirm password.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/login?next=${encodeURIComponent(nextPath)}`}
              className="rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/12"
            >
              Login
            </Link>
            <Link
              href={`/login?mode=signup&next=${encodeURIComponent(nextPath)}`}
              className="rounded-2xl bg-[#d79b43] px-5 py-3 text-center text-sm font-semibold text-[#102637] transition hover:brightness-110"
            >
              Sign Up
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="mt-4 w-full rounded-2xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-[#c7d8df] transition hover:bg-white/6"
          >
            Continue Browsing This Trek
          </button>
        </div>
      </div>
    </div>
  );
}
