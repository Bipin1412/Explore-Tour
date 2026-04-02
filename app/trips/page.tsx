import { getAllTrips } from "@/lib/trip-store";
import TripListingBoard from "@/components/listing/TripListingBoard";

export const metadata = {
  title: "Upcoming Trek Listings | Explorers Group",
  description: "Browse the upcoming trek and tour listing board with schedule windows, difficulty, and pricing."
};

export const dynamic = "force-dynamic";

interface FeaturedTripsIndexPageProps {
  searchParams?: {
    category?: string | string[];
    season?: string | string[];
    region?: string | string[];
    difficulty?: string | string[];
    month?: string | string[];
    q?: string | string[];
  };
}

function getSingleValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FeaturedTripsIndexPage({ searchParams }: FeaturedTripsIndexPageProps) {
  const trips = await getAllTrips();
  const initialFilters = {
    category: getSingleValue(searchParams?.category),
    season: getSingleValue(searchParams?.season),
    region: getSingleValue(searchParams?.region),
    difficulty: getSingleValue(searchParams?.difficulty),
    month: getSingleValue(searchParams?.month),
    q: getSingleValue(searchParams?.q)
  };

  return (
    <main className="pb-16">
      <section className="section-shell">
        <div className="rounded-[2.3rem] border border-[#d9cfbf] bg-[#f7efe4] p-6 shadow-[0_24px_70px_rgba(30,36,27,0.08)] sm:p-8">
          <p className="section-tag">Trek and Tour Listing</p>
          <h1 className="mt-4 font-display text-5xl text-[#112315] sm:text-6xl">
            Upcoming trek windows and signature departures.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#555b4f] sm:text-base">
            This listing page now reads like an event board: schedule windows, difficulty, duration, and cost per head, with each trek name opening the detailed destination page.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-[#ddd3c4] bg-white/70 p-4 text-sm font-semibold text-[#1b2b1b]">
              {trips.length} live programs across treks, expeditions, and tours
            </div>
            <div className="rounded-[1.5rem] border border-[#ddd3c4] bg-white/70 p-4 text-sm font-semibold text-[#1b2b1b]">
              Batch windows shown from current destination seasonality
            </div>
            <div className="rounded-[1.5rem] border border-[#ddd3c4] bg-white/70 p-4 text-sm font-semibold text-[#1b2b1b]">
              Click any trek name to open the full detail and booking page
            </div>
          </div>
        </div>
      </section>

      <TripListingBoard trips={trips} initialFilters={initialFilters} />
    </main>
  );
}
