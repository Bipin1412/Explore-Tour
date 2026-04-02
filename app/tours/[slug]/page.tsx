import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripDetailsTemplate from "@/components/trips/TripDetailsTemplate";
import { getAllTrips, getTripBySlug } from "@/lib/trip-store";

interface TourPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const trip = await getTripBySlug(params.slug);
  if (!trip) {
    return {
      title: "Tour Not Found | Explorers Group"
    };
  }

  return {
    title: `${trip.name} | Explorers Group`,
    description: trip.summary
  };
}

export async function generateStaticParams() {
  const trips = await getAllTrips();
  return trips.map((trip) => ({ slug: trip.slug }));
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const trip = await getTripBySlug(params.slug);
  if (!trip) {
    notFound();
  }

  const allTrips = await getAllTrips();
  const relatedTrips = allTrips
    .filter((candidate) => candidate.slug !== trip.slug)
    .filter((candidate) => candidate.category === trip.category || candidate.region === trip.region)
    .slice(0, 3);

  return <TripDetailsTemplate trip={trip} relatedTrips={relatedTrips} />;
}
