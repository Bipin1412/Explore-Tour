import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialDetailPage } from "@/components/page/PhaseThreeTemplates";
import { specialtyPrograms } from "@/data/phase3-content";

interface ProgramDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return specialtyPrograms.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: ProgramDetailPageProps): Metadata {
  const item = specialtyPrograms.find((entry) => entry.slug === params.slug);
  if (!item) {
    return {};
  }

  return {
    title: `${item.title} | Explorers Group`,
    description: item.description
  };
}

export default function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const item = specialtyPrograms.find((entry) => entry.slug === params.slug);
  if (!item) {
    notFound();
  }

  return (
    <EditorialDetailPage
      {...item}
      relatedCards={specialtyPrograms
        .filter((entry) => entry.slug !== item.slug)
        .slice(0, 4)
        .map((entry) => ({
          title: entry.title,
          description: entry.description,
          href: `/programs/${entry.slug}`,
          image: entry.image,
          caption: entry.caption,
          meta: entry.eyebrow
        }))}
    />
  );
}
