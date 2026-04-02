import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetailPage } from "@/components/page/PhaseThreeTemplates";
import { campingDestinations } from "@/data/phase3-content";

interface CampingDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return campingDestinations.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: CampingDetailPageProps): Metadata {
  const item = campingDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | Explorers Group`,
    description: item.description
  };
}

export default function CampingDetailPage({ params }: CampingDetailPageProps) {
  const item = campingDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    notFound();
  }

  return (
    <EditorialDetailPage
      {...item}
      relatedCards={campingDestinations
        .filter((entry) => entry.slug !== item.slug)
        .slice(0, 4)
        .map((entry) => ({
          title: entry.title,
          description: entry.description,
          href: `/camping/${entry.slug}`,
          image: entry.image,
          caption: entry.caption,
          meta: entry.eyebrow
        }))}
    />
  );
}
