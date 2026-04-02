"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trips } from "@/lib/data/trips";

interface GlobalSearchBarProps {
  compact?: boolean;
}

export default function GlobalSearchBar({ compact = false }: GlobalSearchBarProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
          className={`w-full rounded-full border border-white/15 bg-[rgba(245,241,231,0.12)] px-5 py-3 text-sm text-[#f6f0e6] outline-none ring-0 placeholder:text-[#c9c0b5] transition focus:border-[#f0b36d]/65 focus:bg-[rgba(245,241,231,0.18)] ${
            compact ? "sm:min-w-[220px]" : ""
          }`}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 inline-flex h-9 items-center justify-center rounded-full bg-[#d37a31] px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#eb8d41]"
        >
          Go
        </button>
      </form>

      {isOpen && results.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.65rem)] z-50 max-w-full overflow-hidden rounded-3xl border border-white/10 bg-[#102114]/95 p-2 shadow-[0_28px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl">
          {results.map((trip) => (
            <Link
              key={trip.slug}
              href={`/tours/${trip.slug}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm text-[#ecdfcf] transition hover:bg-white/5"
            >
              <span>
                <span className="block font-semibold text-white">{trip.name}</span>
                <span className="block text-xs text-[#a9b49e]">
                  {trip.region} | {trip.destination}
                </span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#d37a31]">
                Open
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
