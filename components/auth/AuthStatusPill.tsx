"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

export default function AuthStatusPill() {
  const pathname = usePathname();
  const { user, isReady, isAuthenticated, logout } = useAuth();

  if (pathname === "/login") {
    return null;
  }

  const nextPath = pathname || "/";
  const initials =
    user?.fullName
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") ?? "EG";

  return (
    <div className="fixed right-4 top-4 z-30 w-[calc(100%-2rem)] max-w-sm rounded-[28px] border border-white/25 bg-[#0f2538]/80 p-3 text-white shadow-[0_24px_80px_rgba(7,15,26,0.35)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c58d38] via-[#f3c97b] to-[#90d2c4] font-display text-sm text-[#102637]">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#9dc3d1]">Explorer Access</p>
          {isReady && isAuthenticated && user ? (
            <>
              <p className="truncate font-semibold text-[#f6efe2]">{user.fullName}</p>
              <p className="truncate text-xs text-[#c5d8df]">
                {user.provider === "GOOGLE" ? "Google Sign-In" : "Email Login"}
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#f6efe2]">Login required to book a trip</p>
              <p className="text-xs text-[#c5d8df]">Sign in or create your account before checkout.</p>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        {isReady && isAuthenticated ? (
          <button
            type="button"
            onClick={logout}
            className="w-full rounded-2xl border border-white/15 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/14"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              href={`/login?next=${encodeURIComponent(nextPath)}`}
              className="flex-1 rounded-2xl border border-white/15 bg-white/8 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/14"
            >
              Login
            </Link>
            <Link
              href={`/login?mode=signup&next=${encodeURIComponent(nextPath)}`}
              className="flex-1 rounded-2xl bg-[#d79b43] px-4 py-2.5 text-center text-sm font-semibold text-[#102637] transition hover:brightness-110"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
