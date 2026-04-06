import type { Metadata } from "next";
import CampingExperiencesPage from "@/components/page/CampingExperiencesPage";

export const metadata: Metadata = {
  title: "Camping | Explorers Group",
  description:
    "Premium camping page for Pawna, Vasota, Bhandardara, Panshet, beach camps, fort camps, and custom outdoor stays across Maharashtra."
};

export default function CampingPage() {
  return <CampingExperiencesPage />;
}
