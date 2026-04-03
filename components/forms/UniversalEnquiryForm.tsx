"use client";

import { useMemo, useState } from "react";
import { EnquiryVariant } from "@/types/enquiry";

type InputState = Record<string, string>;
type ErrorState = Record<string, string | undefined>;

interface EnquiryFormProps {
  variant: EnquiryVariant;
  title: string;
  description: string;
  contextTitle?: string;
  contextLabel?: string;
}

interface FieldDefinition {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  type?: "text" | "email" | "tel" | "date" | "textarea" | "select";
  options?: string[];
  readOnly?: boolean;
}

interface EnquiryResponse {
  success: boolean;
  enquiryId?: string;
  error?: string;
  details?: {
    fieldErrors?: Record<string, string[]>;
  };
}

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const variantMeta: Record<
  EnquiryVariant,
  {
    intro: string;
    submitLabel: string;
    fields: (contextTitle?: string) => FieldDefinition[];
  }
> = {
  contact: {
    intro: "Use this form to reach the team for general planning, scheduling, payment, and custom route questions.",
    submitLabel: "Send Contact Enquiry",
    fields: () => [
      field("fullName", "Full Name", "Your name"),
      field("email", "Email ID", "you@example.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      selectField("inquiryType", "Inquiry Type", ["Treks", "Tours", "Corporate", "School", "Payments", "Custom Package"]),
      field("destination", "Destination / Program", "Rajmachi, Nepal, Pawna, ATLAS"),
      selectField("travelMonth", "Preferred Month", monthOptions),
      field("groupSize", "Group Size", "2, 5, 30"),
      field("message", "Additional Note", "Tell us what you need help with", "textarea")
    ]
  },
  corporate: {
    intro: "Share your team size, outing intent, and preferred location so the team can shape the right offsite format.",
    submitLabel: "Send Corporate Enquiry",
    fields: () => [
      field("contactPerson", "Contact Person", "Your name"),
      field("companyName", "Company Name", "Your company"),
      field("email", "Work Email", "team@company.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      field("teamSize", "Team Size", "20, 60, 120"),
      selectField("outingType", "Outing Type", ["One Day Trek", "Adventure Offsite", "Team Building", "Leadership Retreat", "Custom Mix"]),
      field("preferredLocation", "Preferred Location", "Pawna, Mulshi, Sahyadri, Wildlife"),
      selectField("travelMonth", "Preferred Month", monthOptions),
      selectField("budgetRange", "Budget Range", ["Below 2,000 per head", "2,000 to 4,000", "4,000 to 7,000", "7,000+", "Need guidance"]),
      field("message", "Additional Note", "Goals, expectations, or internal constraints", "textarea")
    ]
  },
  international: {
    intro: "This form captures the planning inputs needed for destination-led travel, especially for couples, family, and friend groups.",
    submitLabel: "Send Tour Enquiry",
    fields: () => [
      field("fullName", "Full Name", "Your name"),
      field("email", "Email ID", "you@example.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      selectField("purpose", "Purpose", ["Honeymoon", "Family", "Friends", "Educational", "Other"]),
      field("location", "Location", "Nepal, Bali, Dubai"),
      selectField("hotelType", "Type of Hotel", ["Budget", "Comfort", "Premium", "Luxury"]),
      field("adults", "No of Adults", "2"),
      field("kidsCount", "No of Kids", "0"),
      field("kidsAges", "Kids Ages", "Optional"),
      field("departureDate", "Date of Departure", "", "date"),
      field("arrivalDate", "Date of Arrival", "", "date"),
      selectField("mealPlan", "Meal Plan", ["CP", "MAP", "AP", "Need guidance"]),
      selectField("transportMode", "Mode of Transport", ["Air", "Bus", "Train", "Mixed"]),
      field("specialRequirement", "Special Requirement", "Anything special we should plan for", "textarea")
    ]
  },
  specialty: {
    intro: "Use this form to ask about the next batch, the right audience fit, or how the program works before you join.",
    submitLabel: "Send Program Enquiry",
    fields: (contextTitle) => [
      field("fullName", "Full Name", "Your name"),
      field("email", "Email ID", "you@example.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      field("preferredProgram", "Program", "Selected program", "text", true, contextTitle ?? "Selected program"),
      field("city", "City", "Pune, Mumbai, Nashik"),
      field("ageGroup", "Age Group", "14-18, 25-35, 40+"),
      selectField("preferredMonth", "Preferred Month", monthOptions),
      field("message", "Additional Note", "Fitness level, intent, or questions", "textarea")
    ]
  },
  camping: {
    intro: "Share your group size and preferred stay style, and the team can guide you on the best package format.",
    submitLabel: "Send Camping Enquiry",
    fields: (contextTitle) => [
      field("fullName", "Full Name", "Your name"),
      field("email", "Email ID", "you@example.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      field("destination", "Destination", "Selected destination", "text", true, contextTitle ?? "Selected destination"),
      field("groupSize", "Group Size", "2, 5, 30"),
      selectField("stayType", "Stay Type", ["Lakeside", "Beachside", "Forest", "Premium Camp", "Need guidance"]),
      selectField("travelMonth", "Preferred Month", monthOptions),
      field("message", "Additional Note", "Tell us the type of experience you want", "textarea")
    ]
  },
  safari: {
    intro: "This form helps the team understand the wildlife route, zone preference, and traveler type before confirming the best safari circuit.",
    submitLabel: "Send Safari Enquiry",
    fields: (contextTitle) => [
      field("fullName", "Full Name", "Your name"),
      field("email", "Email ID", "you@example.com", "email"),
      field("phone", "Mobile No", "+91 98765 43210", "tel"),
      field("destination", "Destination", "Selected destination", "text", true, contextTitle ?? "Selected destination"),
      field("groupSize", "Group Size", "2, 4, 12"),
      field("preferredZone", "Preferred Zone / Focus", "Tiger sighting, family safari, photography"),
      selectField("travelMonth", "Preferred Month", monthOptions),
      field("message", "Additional Note", "Tell us the kind of wildlife trip you want", "textarea")
    ]
  }
};

function field(
  name: string,
  label: string,
  placeholder: string,
  type: FieldDefinition["type"] = "text",
  readOnly = false,
  defaultValue?: string
): FieldDefinition {
  return {
    name,
    label,
    placeholder,
    type,
    readOnly,
    defaultValue
  };
}

function selectField(name: string, label: string, options: string[]): FieldDefinition {
  return {
    name,
    label,
    type: "select",
    options
  };
}

export default function UniversalEnquiryForm({
  variant,
  title,
  description,
  contextTitle,
  contextLabel
}: EnquiryFormProps) {
  const config = variantMeta[variant];
  const fields = useMemo(() => config.fields(contextTitle), [config, contextTitle]);
  const initialState = useMemo(() => buildInitialState(fields), [fields]);
  const [form, setForm] = useState<InputState>(initialState);
  const [errors, setErrors] = useState<ErrorState>({});
  const [serverMessage, setServerMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  const updateField = (name: string, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage("");
    setSuccessId(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          variant,
          data: form
        })
      });

      const result = (await response.json()) as EnquiryResponse;
      if (!response.ok || !result.success || !result.enquiryId) {
        const fieldErrors = result.details?.fieldErrors ?? {};
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, messages]) => [key, messages?.[0]])
          )
        );
        throw new Error(result.error ?? "Unable to submit enquiry.");
      }

      setSuccessId(result.enquiryId);
      setForm(buildInitialState(fields));
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Unable to submit enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-6 shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
      <p className="section-tag">Enquiry Form</p>
      <h3 className="mt-4 font-display text-4xl text-[#162214]">{title}</h3>
      <p className="mt-3 max-w-3xl text-sm leading-8 text-[#555b50] sm:text-base">{description}</p>
      <p className="mt-3 text-sm leading-7 text-[#6a6f64]">{config.intro}</p>

      {contextTitle ? (
        <div className="mt-5 rounded-[1.4rem] border border-[#ddd1bf] bg-white/75 p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">{contextLabel ?? "Selected Context"}</p>
          <p className="mt-2 font-semibold text-[#162214]">{contextTitle}</p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((item) => (
            <label
              key={item.name}
              className={`space-y-2 ${item.type === "textarea" ? "md:col-span-2" : ""}`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                {item.label}
              </span>
              {renderField(item, form[item.name] ?? "", updateField)}
              {errors[item.name] ? <p className="text-xs text-rose-600">{errors[item.name]}</p> : null}
            </label>
          ))}
        </div>

        <div className="rounded-[1.6rem] border border-[#d7ccba] bg-[#f1e7d9] p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Submission Flow</p>
              <p className="mt-2 text-sm leading-7 text-[#5f685b]">
                This sends a real enquiry into the app pipeline now. It can later be connected to the client’s final destination data, CRM flow, or admin view without changing the page layout.
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#d37a31] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : config.submitLabel}
            </button>
          </div>
        </div>
      </form>

      {successId ? (
        <div className="mt-4 rounded-[1.4rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Enquiry submitted successfully. Reference ID: {successId}
        </div>
      ) : null}

      {serverMessage ? (
        <div className="mt-4 rounded-[1.4rem] border border-[#dfc6b1] bg-[#fff6ee] p-4 text-sm text-[#7a3d2f]">
          {serverMessage}
        </div>
      ) : null}
    </div>
  );
}

function buildInitialState(fields: FieldDefinition[]) {
  return Object.fromEntries(
    fields.map((item) => [
      item.name,
      item.type === "select" ? item.options?.[0] ?? "" : item.defaultValue ?? ""
    ])
  );
}

function renderField(
  field: FieldDefinition,
  value: string,
  onChange: (name: string, value: string) => void
) {
  const baseClassName =
    "w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]";

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        rows={5}
        readOnly={field.readOnly}
        placeholder={field.placeholder}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`${baseClassName} min-h-[140px]`}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={baseClassName}
      >
        {field.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      type={field.type ?? "text"}
      value={value}
      readOnly={field.readOnly}
      placeholder={field.placeholder}
      onChange={(event) => onChange(field.name, event.target.value)}
      className={`${baseClassName} ${field.readOnly ? "bg-[#f4ecdf]" : ""}`}
    />
  );
}
