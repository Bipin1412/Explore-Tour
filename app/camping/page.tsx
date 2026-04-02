import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { campingHubPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Camping | Explorers Group",
  description: "Browse camping destinations including Pawna, Panshet, Mulshi, Malvan, Revdanda, and Madheghat."
};

export default function CampingPage() {
  return <EditorialLandingPage {...campingHubPage} />;
}
