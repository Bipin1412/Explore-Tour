import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { upcomingToursPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Upcoming Tours | Explorers Group",
  description: "Explore domestic and international tour-style journeys from Explorers Group."
};

export default function UpcomingToursPage() {
  return <EditorialLandingPage {...upcomingToursPage} />;
}
