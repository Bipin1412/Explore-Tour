import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { corporateOutingsPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Corporate Outings | Explorers Group",
  description: "Adventure-led team outings, offsites, and custom corporate experiences from Explorers Group."
};

export default function CorporateOutingsPage() {
  return <EditorialLandingPage {...corporateOutingsPage} />;
}
