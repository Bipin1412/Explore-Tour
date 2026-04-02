import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { teamExplorersPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Team Explorers | Explorers Group",
  description: "Meet the leaders, coordinators, and outdoor culture behind Explorers Group."
};

export default function TeamExplorersPage() {
  return <EditorialLandingPage {...teamExplorersPage} />;
}
