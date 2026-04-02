"use client";

import { useEffect, useState } from "react";

const storageKey = "explorers-social-popup-dismissed";

export default function FollowSocialPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(storageKey);
    if (!dismissed) {
      const timer = window.setTimeout(() => setIsOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    window.localStorage.setItem(storageKey, "true");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(0,0,0,0.35)] p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-[#102114]/96 p-6 text-[#f7f0e8] shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.22em] text-[#d6a063]">Stay Connected</p>
        <h3 className="mt-3 font-display text-3xl text-white">Follow us on Instagram and Facebook</h3>
        <p className="mt-3 text-sm leading-7 text-[#b5baaf]">
          Join the Explorers community for trek drops, camp announcements, reels, stories, and trail updates from our latest departures.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-center font-semibold text-white transition hover:border-[#d37a31]/60"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-center font-semibold text-white transition hover:border-[#d37a31]/60"
          >
            Facebook
          </a>
        </div>

        <button
          type="button"
          onClick={closePopup}
          className="mt-5 w-full rounded-full bg-[#d37a31] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e38b44]"
        >
          Continue to Website
        </button>
      </div>
    </div>
  );
}
