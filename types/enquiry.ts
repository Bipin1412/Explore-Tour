export type EnquiryVariant =
  | "contact"
  | "corporate"
  | "international"
  | "specialty"
  | "camping"
  | "safari"
  | "mountain-run";

export interface BaseEnquiryRecord {
  id: string;
  variant: EnquiryVariant;
  createdAt: string;
  updatedAt: string;
}

export interface ContactEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  destination: string;
  travelMonth: string;
  groupSize: string;
  message?: string;
}

export interface CorporateEnquiryInput {
  contactPerson: string;
  companyName: string;
  email: string;
  phone: string;
  teamSize: string;
  outingType: string;
  preferredLocation: string;
  travelMonth: string;
  budgetRange: string;
  message?: string;
}

export interface InternationalEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  purpose: string;
  location: string;
  hotelType: string;
  adults: string;
  kidsCount: string;
  kidsAges?: string;
  departureDate: string;
  arrivalDate: string;
  mealPlan: string;
  transportMode: string;
  specialRequirement?: string;
}

export interface SpecialtyEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  preferredProgram: string;
  city: string;
  ageGroup: string;
  preferredMonth: string;
  message?: string;
}

export interface CampingEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  groupSize: string;
  stayType: string;
  travelMonth: string;
  message?: string;
}

export interface SafariEnquiryInput {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  groupSize: string;
  preferredZone: string;
  travelMonth: string;
  message?: string;
}

export interface MountainRunEnquiryInput {
  fullName: string;
  age: string;
  gender: string;
  city: string;
  phone: string;
  email: string;
  emergencyContact: string;
  selectedDistanceCategory: string;
  medicalConditions?: string;
}

export type EnquiryInputMap = {
  contact: ContactEnquiryInput;
  corporate: CorporateEnquiryInput;
  international: InternationalEnquiryInput;
  specialty: SpecialtyEnquiryInput;
  camping: CampingEnquiryInput;
  safari: SafariEnquiryInput;
  "mountain-run": MountainRunEnquiryInput;
};

export interface AppEnquiryRecord extends BaseEnquiryRecord {
  payload: {
    [K in EnquiryVariant]: {
      variant: K;
      data: EnquiryInputMap[K];
    };
  }[EnquiryVariant];
}
