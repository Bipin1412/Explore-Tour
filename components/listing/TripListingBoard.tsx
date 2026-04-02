"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBatchWindow } from "@/lib/program-content";
import { Trip } from "@/types/trip";

interface TripListingBoardProps {
  trips: Trip[];
  initialFilters?: {
    category?: string;
    season?: string;
    region?: string;
    difficulty?: string;
    month?: string;
    q?: string;
  };
}

const seasonMonthMap: Record<string, string[]> = {
  Winter: ["November", "December", "January", "February"],
  Summer: ["March", "April", "May", "June"],
  Rainy: ["June", "July", "August", "September"]
};

function matchesSeason(trip: Trip, season: string) {
  const months = seasonMonthMap[season];
  if (!months) {
    return true;
  }

  return trip.bestMonths.some((month) => months.includes(month));
}

export default function TripListingBoard({ trips, initialFilters }: TripListingBoardProps) {
  const [query, setQuery] = useState(initialFilters?.q ?? "");
  const [category, setCategory] = useState(initialFilters?.category ?? "All");
  const [season, setSeason] = useState(initialFilters?.season ?? "All");
  const [region, setRegion] = useState(initialFilters?.region ?? "All");
  const [difficulty, setDifficulty] = useState(initialFilters?.difficulty ?? "All");
  const [month, setMonth] = useState(initialFilters?.month ?? "All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(trips.map((trip) => trip.category)))],
    [trips]
  );
  const regions = useMemo(
    () => ["All", ...Array.from(new Set(trips.map((trip) => trip.region)))],
    [trips]
  );
  const difficulties = useMemo(
    () => ["All", ...Array.from(new Set(trips.map((trip) => trip.difficulty)))],
    [trips]
  );
  const months = useMemo(
    () => ["All", ...Array.from(new Set(trips.flatMap((trip) => trip.bestMonths)))],
    [trips]
  );

  const filteredTrips = useMemo(() => {
    const search = query.trim().toLowerCase();

    return trips.filter((trip) => {
      const categoryMatch = category === "All" || trip.category === category;
      const seasonMatch = season === "All" || matchesSeason(trip, season);
      const regionMatch = region === "All" || trip.region === region;
      const difficultyMatch = difficulty === "All" || trip.difficulty === difficulty;
      const monthMatch = month === "All" || trip.bestMonths.includes(month);
      const queryMatch = search
        ? [trip.name, trip.destination, trip.summary, trip.category, trip.region]
            .join(" ")
            .toLowerCase()
            .includes(search)
        : true;

      return categoryMatch && seasonMatch && regionMatch && difficultyMatch && monthMatch && queryMatch;
    });
  }, [trips, query, category, season, region, difficulty, month]);

  const resetFilters = () => {
    setQuery("");
    setCategory("All");
    setSeason("All");
    setRegion("All");
    setDifficulty("All");
    setMonth("All");
  };

  return (
    <>
      <section className="section-shell pt-0">
        <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-5 shadow-[0_24px_70px_rgba(30,36,27,0.08)] sm:p-6">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr] xl:items-end">
            <div>
              <p className="section-tag">Browse Smartly</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Filter by season, region, month, and difficulty</h2>
              <p className="mt-3 max-w-3xl text-sm leading-8 text-[#555b4f] sm:text-base">
                Use these controls to quickly jump from a general trek board to the exact kind of departure you want, without typing routes manually.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[#ddd3c4] bg-white/70 p-4 text-sm text-[#2a392b]">
              <p className="font-semibold">{filteredTrips.length} matching departures</p>
              <p className="mt-2 text-[#5b6157]">Showing current results across treks, expeditions, and curated tours.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <label className="space-y-2 xl:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Kedarkantha, Sahyadri, Lonavala..."
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
            </label>

            <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />
            <FilterSelect label="Season" value={season} onChange={setSeason} options={["All", "Winter", "Summer", "Rainy"]} />
            <FilterSelect label="Region" value={region} onChange={setRegion} options={regions} />
            <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={difficulties} />
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
            <FilterSelect label="Best Month" value={month} onChange={setMonth} options={months} />
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full border border-[#d0c2ac] px-4 py-3 text-sm font-semibold text-[#162214] transition hover:border-[#d37a31] hover:text-[#d37a31] md:mt-0 md:self-end"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.slice(1, 6).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === item
                    ? "bg-[#d37a31] text-white"
                    : "border border-[#d0c4b0] bg-white/70 text-[#304031] hover:border-[#d37a31]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="hidden overflow-hidden rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] shadow-[0_24px_70px_rgba(30,36,27,0.08)] lg:block">
          <table className="w-full border-collapse">
            <thead className="bg-[#182a1a] text-left text-xs uppercase tracking-[0.18em] text-[#efe5d8]">
              <tr>
                <th className="px-5 py-4">Sr.No</th>
                <th className="px-5 py-4">Date / Batch Window</th>
                <th className="px-5 py-4">Trek Name</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Difficulty Level</th>
                <th className="px-5 py-4">Cost Per Head</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip, index) => (
                <tr key={trip.slug} className="border-t border-[#e1d7c8] text-sm text-[#334234]">
                  <td className="px-5 py-4">{index + 1}</td>
                  <td className="px-5 py-4">{getBatchWindow(trip)}</td>
                  <td className="px-5 py-4">
                    <Link href={`/tours/${trip.slug}`} className="font-semibold text-[#8a5c35] transition hover:text-[#d37a31]">
                      {trip.name}
                    </Link>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#7a8378]">{trip.category}</p>
                  </td>
                  <td className="px-5 py-4">{trip.durationDays} Days</td>
                  <td className="px-5 py-4">{trip.difficulty}</td>
                  <td className="px-5 py-4">INR {trip.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {filteredTrips.map((trip) => (
            <Link
              key={trip.slug}
              href={`/tours/${trip.slug}`}
              className="overflow-hidden rounded-[1.8rem] border border-[#d9cfbf] bg-[#f8f1e6] shadow-[0_20px_60px_rgba(30,36,27,0.08)]"
            >
              <div className="relative h-56">
                <Image src={trip.heroImage} alt={trip.name} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f2dcc2]">
                  {getBatchWindow(trip)}
                </p>
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">{trip.category}</p>
                <h3 className="font-display text-3xl text-[#162214]">{trip.name}</h3>
                <p className="text-sm text-[#53594f]">
                  {trip.durationDays} Days | {trip.difficulty} | INR {trip.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredTrips.length === 0 ? (
          <div className="mt-6 rounded-[1.8rem] border border-dashed border-[#d0c5b4] bg-[#f8f1e6] p-8 text-center">
            <p className="font-display text-3xl text-[#162214]">No departures match these filters</p>
            <p className="mt-3 text-sm leading-7 text-[#5d6258]">
              Try resetting the filters or broadening the search to see more trek and tour options.
            </p>
          </div>
        ) : null}
      </section>
    </>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <label className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
