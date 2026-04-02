import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetailPage } from "@/components/page/PhaseThreeTemplates";
import { jungleSafariDestinations } from "@/data/phase3-content";

interface JungleSafariDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return jungleSafariDestinations.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: JungleSafariDetailPageProps): Metadata {
  const item = jungleSafariDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | Explorers Group`,
    description: item.description
  };
}

export default function JungleSafariDetailPage({ params }: JungleSafariDetailPageProps) {
  const item = jungleSafariDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    notFound();
  }

  return (
    <EditorialDetailPage
      {...item}
      relatedCards={jungleSafariDestinations
        .filter((entry) => entry.slug !== item.slug)
        .slice(0, 4)
        .map((entry) => ({
          title: entry.title,
          description: entry.description,
          href: `/jungle-safari/${entry.slug}`,
          image: entry.image,
          caption: entry.caption,
          meta: entry.eyebrow
        }))}
    />
  );
}
