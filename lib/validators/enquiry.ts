import { z } from "zod";
import { phoneField } from "@/lib/validators/booking";
import { EnquiryVariant } from "@/types/enquiry";

const shortText = (label: string) => z.string().min(2, `${label} is required`).max(120, `${label} is too long`);
const compactText = (label: string) => z.string().min(1, `${label} is required`).max(60, `${label} is too long`);
const optionalLongText = z.string().max(1000, "Message is too long").optional();

const contactSchema = z.object({
  fullName: shortText("Full name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  inquiryType: shortText("Inquiry type"),
  destination: shortText("Destination or program"),
  travelMonth: shortText("Travel month"),
  groupSize: compactText("Group size"),
  message: optionalLongText
});

const corporateSchema = z.object({
  contactPerson: shortText("Contact person"),
  companyName: shortText("Company name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  teamSize: compactText("Team size"),
  outingType: shortText("Outing type"),
  preferredLocation: shortText("Preferred location"),
  travelMonth: shortText("Travel month"),
  budgetRange: shortText("Budget range"),
  message: optionalLongText
});

const internationalSchema = z.object({
  fullName: shortText("Full name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  purpose: shortText("Purpose"),
  location: shortText("Location"),
  hotelType: shortText("Hotel type"),
  adults: compactText("Adults"),
  kidsCount: compactText("Kids count"),
  kidsAges: z.string().max(120, "Kids ages is too long").optional(),
  departureDate: shortText("Departure date"),
  arrivalDate: shortText("Arrival date"),
  mealPlan: shortText("Meal plan"),
  transportMode: shortText("Transport mode"),
  specialRequirement: optionalLongText
});

const specialtySchema = z.object({
  fullName: shortText("Full name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  preferredProgram: shortText("Program"),
  city: shortText("City"),
  ageGroup: shortText("Age group"),
  preferredMonth: shortText("Preferred month"),
  message: optionalLongText
});

const campingSchema = z.object({
  fullName: shortText("Full name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  destination: shortText("Destination"),
  groupSize: compactText("Group size"),
  stayType: shortText("Stay type"),
  travelMonth: shortText("Travel month"),
  message: optionalLongText
});

const safariSchema = z.object({
  fullName: shortText("Full name"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  destination: shortText("Destination"),
  groupSize: compactText("Group size"),
  preferredZone: shortText("Preferred zone"),
  travelMonth: shortText("Travel month"),
  message: optionalLongText
});

export const enquirySchemaMap = {
  contact: contactSchema,
  corporate: corporateSchema,
  international: internationalSchema,
  specialty: specialtySchema,
  camping: campingSchema,
  safari: safariSchema
} satisfies Record<EnquiryVariant, z.ZodTypeAny>;

export function getEnquirySchema(variant: EnquiryVariant) {
  return enquirySchemaMap[variant];
}
