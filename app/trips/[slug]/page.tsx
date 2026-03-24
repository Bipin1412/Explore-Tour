import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TripDetailsTemplate from "@/components/trips/TripDetailsTemplate";
import { getFeaturedTrips, getTripBySlug } from "@/lib/trip-store";

interface FeaturedTripPageProps {
  params: {
    slug: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: FeaturedTripPageProps): Promise<Metadata> {
  const trip = await getTripBySlug(params.slug);
  if (!trip || !trip.featured) {
    return {
      title: "Trip Not Found | Explorers Group"
    };
  }

  return {
    title: `${trip.name} | Explorers Group`,
    description: trip.summary
  };
}

export async function generateStaticParams() {
  const featuredTrips = await getFeaturedTrips();
  return featuredTrips.map((trip) => ({ slug: trip.slug }));
}

export default async function FeaturedTripPage({ params }: FeaturedTripPageProps) {
  const trip = await getTripBySlug(params.slug);
  if (!trip || !trip.featured) {
    notFound();
  }

  return <TripDetailsTemplate trip={trip} />;
}
