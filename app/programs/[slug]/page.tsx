import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExplorersMountainRunPage from "@/components/page/ExplorersMountainRunPage";
import JuniorExplorersPage from "@/components/page/JuniorExplorersPage";
import LadyExplorersPage from "@/components/page/LadyExplorersPage";
import ExplorersOnWheelsPage from "@/components/page/ExplorersOnWheelsPage";
import SilverTrailsPage from "@/components/page/SilverTrailsPage";
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

  if (item.slug === "junior-explorers") {
    return <JuniorExplorersPage />;
  }

  if (item.slug === "lady-explorers") {
    return <LadyExplorersPage />;
  }

  if (item.slug === "silver-trails") {
    return <SilverTrailsPage />;
  }

  if (item.slug === "explorers-on-wheels") {
    return <ExplorersOnWheelsPage />;
  }

  if (item.slug === "explorers-mountain-rush") {
    return <ExplorersMountainRunPage />;
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
