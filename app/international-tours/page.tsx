import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { internationalToursHubPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "International Tours | Explorers Group",
  description: "Browse curated international travel pages including Nepal, Sri Lanka, Thailand, Bali, Maldives, and more."
};

export default function InternationalToursPage() {
  return <EditorialLandingPage {...internationalToursHubPage} />;
}
