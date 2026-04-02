import type { Metadata } from "next";
import ContactExperience from "@/components/page/ContactExperience";

export const metadata: Metadata = {
  title: "Contact Us | Explorers Group",
  description: "Contact Explorers Group for treks, tours, camps, corporate outings, and booking support."
};

export default function ContactUsPage() {
  return <ContactExperience />;
}
