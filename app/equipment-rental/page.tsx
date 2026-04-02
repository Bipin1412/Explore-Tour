import type { Metadata } from "next";
import { EditorialLandingPage } from "@/components/page/PhaseThreeTemplates";
import { equipmentRentalPage } from "@/data/phase3-content";

export const metadata: Metadata = {
  title: "Equipment Rental | Explorers Group",
  description: "Explore trekking and camping gear rental categories and enquiry guidance."
};

export default function EquipmentRentalPage() {
  return <EditorialLandingPage {...equipmentRentalPage} />;
}
