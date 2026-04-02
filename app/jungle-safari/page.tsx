import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { jungleSafariHubPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Jungle Safari | Explorers Group",
  description: "Browse Tadoba, Pench, Kanha, and Bandhavgad wildlife routes with Explorers Group."
};

export default function JungleSafariPage() {
  return <EditorialLandingPage {...jungleSafariHubPage} />;
}
