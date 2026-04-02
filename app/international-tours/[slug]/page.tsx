import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetailPage } from "@/components/page/PhaseThreeTemplates";
import { internationalDestinations } from "@/data/phase3-content";

interface InternationalDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return internationalDestinations.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: InternationalDetailPageProps): Metadata {
  const item = internationalDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    return {};
  }

  return {
    title: `${item.title} Tours | Explorers Group`,
    description: item.description
  };
}

export default function InternationalDetailPage({ params }: InternationalDetailPageProps) {
  const item = internationalDestinations.find((entry) => entry.slug === params.slug);
  if (!item) {
    notFound();
  }

  return (
    <EditorialDetailPage
      {...item}
      relatedCards={internationalDestinations
        .filter((entry) => entry.slug !== item.slug)
        .slice(0, 4)
        .map((entry) => ({
          title: entry.title,
          description: entry.description,
          href: `/international-tours/${entry.slug}`,
          image: entry.image,
          caption: entry.caption,
          meta: entry.eyebrow
        }))}
    />
  );
}
