import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { himalayanTreksPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Himalayan Treks | Explorers Group",
  description: "Explore summit, pass, scenic, and altitude-led Himalayan departures from Explorers Group."
};

export default function HimalayanTreksPage() {
  return <EditorialLandingPage {...himalayanTreksPage} />;
}
