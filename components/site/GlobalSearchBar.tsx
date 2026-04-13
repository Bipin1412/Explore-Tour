"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { trips } from "@/lib/data/trips";

interface GlobalSearchBarProps {
  compact?: boolean;
}

export default function GlobalSearchBar({ compact = false }: GlobalSearchBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isHome = pathname === "/";

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return [];
    }

    return trips
      .filter((trip) =>
        [trip.name, trip.region, trip.destination, trip.category].some((entry) =>
          entry.toLowerCase().includes(value)
        )
      )
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (results[0]) {
      setIsOpen(false);
      router.push(`/tours/${results[0].slug}`);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={submitSearch} className="relative">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by trek name, region, or location"
          className={`w-full rounded-full px-5 py-3 text-sm outline-none ring-0 transition ${
            compact ? "sm:min-w-[220px]" : ""
          } ${
            isHome
              ? "border border-[#d2e5ee] bg-white text-[#334952] placeholder:text-[#7e97a3] focus:border-[#80b6d4]"
              : "border border-white/15 bg-[rgba(245,241,231,0.12)] text-[#f6f0e6] placeholder:text-[#c9c0b5] focus:border-[#f0b36d]/65 focus:bg-[rgba(245,241,231,0.18)]"
          }`}
        />
        <button
          type="submit"
          className={`absolute right-1.5 top-1.5 inline-flex h-9 items-center justify-center rounded-full px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition ${
            isHome ? "bg-[#11639b] hover:bg-[#2f7eb5]" : "bg-[#d37a31] hover:bg-[#eb8d41]"
          }`}
        >
          Go
        </button>
      </form>

      {isOpen && results.length > 0 ? (
        <div
          className={`absolute left-0 right-0 top-[calc(100%+0.65rem)] z-50 max-w-full overflow-hidden rounded-3xl p-2 shadow-[0_28px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl ${
            isHome
              ? "border border-[#d8e8ef] bg-white/96"
              : "border border-white/10 bg-[#102114]/95"
          }`}
        >
          {results.map((trip) => (
            <Link
              key={trip.slug}
              href={`/tours/${trip.slug}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition ${
                isHome ? "text-[#334952] hover:bg-[#f3f9fc]" : "text-[#ecdfcf] hover:bg-white/5"
              }`}
            >
              <span>
                <span className={`block font-semibold ${isHome ? "text-[#0b1215]" : "text-white"}`}>
                  {trip.name}
                </span>
                <span className={`block text-xs ${isHome ? "text-[#6f8792]" : "text-[#a9b49e]"}`}>
                  {trip.region} | {trip.destination}
                </span>
              </span>
              <span className={`text-[11px] uppercase tracking-[0.16em] ${isHome ? "text-[#11639b]" : "text-[#d37a31]"}`}>
                Open
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
