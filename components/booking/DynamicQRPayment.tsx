"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { paymentInfo } from "@/data/payment-info";
import { bookingSchema } from "@/lib/validators/booking";

type FormErrors = Partial<
  Record<
    | "phone"
    | "eventDate"
    | "gender"
    | "bloodGroup"
    | "age"
    | "whatsappNumber"
    | "travelers"
    | "departureMonth"
    | "paymentId"
    | "notes",
    string
  >
>;

interface DynamicQRPaymentProps {
  tripId: string;
  tripName: string;
  tripPrice: number;
  suggestedEventDate: string;
}

interface StartPaymentResponse {
  success: boolean;
  bookingId?: string;
  error?: string;
}

const departureMonths = [
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

const genders = ["Male", "Female", "Other"] as const;

export default function DynamicQRPayment({
  tripId,
  tripName,
  tripPrice,
  suggestedEventDate
}: DynamicQRPaymentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isReady, isAuthenticated, token, user, logout } = useAuth();

  const [form, setForm] = useState({
    phone: "",
    eventDate: suggestedEventDate,
    gender: "Male",
    bloodGroup: "",
    age: "18",
    whatsappNumber: "",
    travelers: "1",
    departureMonth: departureMonths[new Date().getMonth()] ?? "January",
    paymentId: "",
    notes: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProceeding, setIsProceeding] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      eventDate: suggestedEventDate
    }));
  }, [suggestedEventDate]);

  useEffect(() => {
    if (user?.phoneNumber) {
      setForm((prev) => ({
        ...prev,
        phone: prev.phone || user.phoneNumber || "",
        whatsappNumber: prev.whatsappNumber || user.phoneNumber || ""
      }));
    }
  }, [user]);

  const totalAmount = useMemo(() => tripPrice * Number(form.travelers || 1), [tripPrice, form.travelers]);
  const nextPath = pathname || "/";

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateBookingDetails = () => {
    if (!user) {
      return null;
    }

    const parsed = bookingSchema.safeParse({
      tripId,
      tripName,
      tripPrice: totalAmount,
      fullName: user.fullName.trim(),
      email: user.email.trim(),
      phone: form.phone.trim() || user.phoneNumber || "",
      eventDate: form.eventDate,
      gender: form.gender,
      bloodGroup: form.bloodGroup.trim(),
      age: Number(form.age),
      whatsappNumber: form.whatsappNumber.trim() || form.phone.trim() || user.phoneNumber || "",
      travelers: Number(form.travelers),
      departureMonth: form.departureMonth,
      paymentId: form.paymentId.trim(),
      notes: form.notes.trim() || undefined
    });

    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }

    const fieldErrors = parsed.error.flatten().fieldErrors;
    setErrors({
      phone: fieldErrors.phone?.[0],
      eventDate: fieldErrors.eventDate?.[0],
      gender: fieldErrors.gender?.[0],
      bloodGroup: fieldErrors.bloodGroup?.[0],
      age: fieldErrors.age?.[0],
      whatsappNumber: fieldErrors.whatsappNumber?.[0],
      travelers: fieldErrors.travelers?.[0],
      departureMonth: fieldErrors.departureMonth?.[0],
      paymentId: fieldErrors.paymentId?.[0],
      notes: fieldErrors.notes?.[0]
    });

    return null;
  };

  const proceedToPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerMessage("");

    if (!token) {
      router.push(`/login?next=${encodeURIComponent(nextPath)}`);
      return;
    }

    const payload = validateBookingDetails();
    if (!payload) {
      return;
    }

    setIsProceeding(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as StartPaymentResponse;

      if (response.status === 401) {
        logout();
        router.push(`/login?next=${encodeURIComponent(nextPath)}`);
        return;
      }

      if (!response.ok || !result.success || !result.bookingId) {
        throw new Error(result.error ?? "Unable to initiate payment.");
      }

      router.push(`/payment/${result.bookingId}`);
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Unable to initiate payment.");
      setIsProceeding(false);
    }
  };

  if (!isReady) {
    return (
      <div className="rounded-[2rem] border border-[#d6cbb9] bg-[#f8f1e6] p-5 shadow-[0_24px_60px_rgba(29,34,26,0.08)]">
        <p className="text-sm text-[#576052]">Checking your login session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user || !token) {
    return (
      <div className="space-y-5 rounded-[2rem] border border-[#d6cbb9] bg-[#f8f1e6] p-5 shadow-[0_24px_60px_rgba(29,34,26,0.08)]">
        <div className="rounded-[1.5rem] border border-[#e1d6c6] bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Booking Required</p>
          <h3 className="mt-3 font-display text-3xl text-[#162214]">Login before booking this departure</h3>
          <p className="mt-3 text-sm leading-7 text-[#596154]">
            The enriched booking form uses your authenticated account details and then takes you to the payment page with GPay, QR, and bank details.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-[#ddd1bf] bg-white/70 p-4">
            <p className="text-sm text-[#6a6f64]">{tripName}</p>
            <p className="mt-2 font-display text-3xl text-[#162214]">INR {tripPrice.toLocaleString()}</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#586054]">
              <p>Sign in once and your name, email, and phone details are prefilled automatically.</p>
              <p>After saving the booking details, you move directly to the checkout page to scan the QR or use bank transfer.</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#d8cfbf] bg-[#162917] p-4 text-[#f2eadf]">
            <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">What you will see next</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#d4ddd0]">
              <p>1. Review your booking details</p>
              <p>2. Open the payment screen with QR, UPI ID, and bank details</p>
              <p>3. Submit the payment reference and check receipt status</p>
            </div>
            <div className="mt-4 rounded-[1.2rem] border border-white/10 bg-white/[0.05] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#d7b58f]">Support</p>
              <p className="mt-2 text-sm text-white">{paymentInfo.phoneNumber}</p>
              <p className="mt-1 text-sm text-[#d7ddd0]">{paymentInfo.whatsappNumber}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`/login?next=${encodeURIComponent(nextPath)}`}
            className="rounded-full border border-[#d0c2ac] px-4 py-3 text-center text-sm font-semibold text-[#162214] transition hover:border-[#d37a31] hover:text-[#d37a31]"
          >
            Login First
          </Link>
          <Link
            href={`/login?mode=signup&next=${encodeURIComponent(nextPath)}`}
            className="rounded-full bg-[#d37a31] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#e38940]"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] border border-[#d6cbb9] bg-[#f8f1e6] p-5 shadow-[0_24px_60px_rgba(29,34,26,0.08)]">
      <div className="rounded-[1.6rem] border border-[#e1d6c6] bg-white/70 p-5">
        <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Book Now</p>
        <h3 className="mt-2 font-display text-3xl text-[#162214]">Reserve this event</h3>
        <p className="mt-2 text-sm leading-7 text-[#596154]">
          The enriched booking form uses your authenticated account details and then takes you to the payment page with GPay, QR, and bank details.
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[1.6rem] border border-[#d8cfbf] bg-[#172a19] p-5 text-[#f3ece0]">
          <p className="text-xs uppercase tracking-[0.18em] text-[#d6b188]">Logged In Explorer</p>
          <p className="mt-2 text-lg font-semibold text-white">{user.fullName}</p>
          <p className="mt-1 text-sm text-[#d7ddd0]">{user.email}</p>
          <p className="mt-1 text-sm text-[#d7ddd0]">{user.phoneNumber ?? "Phone not set in account"}</p>
        </div>

        <div className="rounded-[1.6rem] border border-[#ddd1bf] bg-white/70 p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Next Step Preview</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[#5b6156]">
            <p>Fill the booking details below and continue to a dedicated payment page.</p>
            <p>There you can scan the QR, use the UPI ID, or pay by bank transfer.</p>
            <p>After payment, submit the transaction reference to unlock receipt verification.</p>
          </div>
          <div className="mt-4 rounded-[1.2rem] border border-[#eadfce] bg-[#f4eadf] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Suggested Event Date</p>
            <p className="mt-2 text-sm font-semibold text-[#162214]">{form.eventDate}</p>
          </div>
        </div>
      </div>

      <form onSubmit={proceedToPayment} className="mt-5 space-y-4">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.3rem] border border-[#ddd1bf] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Flow</p>
              <p className="mt-2 text-sm font-semibold text-[#162214]">Details to Payment to Receipt</p>
            </div>
            <div className="rounded-[1.3rem] border border-[#ddd1bf] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Payment Modes</p>
              <p className="mt-2 text-sm font-semibold text-[#162214]">QR | GPay | Bank Transfer</p>
            </div>
            <div className="rounded-[1.3rem] border border-[#ddd1bf] bg-white/70 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Support</p>
              <p className="mt-2 text-sm font-semibold text-[#162214]">{paymentInfo.whatsappNumber}</p>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-[#ddd1bf] bg-white/70 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Traveller Details</p>
            <div className="mt-4 grid gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Name of Event
              </span>
              <input
                value={tripName}
                readOnly
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-[#f4ecdf] px-4 py-3 text-sm text-[#304031] outline-none"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Date of Event
              </span>
              <input
                value={form.eventDate}
                onChange={(event) => updateField("eventDate", event.target.value)}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.eventDate ? <p className="text-xs text-rose-600">{errors.eventDate}</p> : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Name
              </span>
              <input
                value={user.fullName}
                readOnly
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-[#f4ecdf] px-4 py-3 text-sm text-[#304031] outline-none"
              />
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Email ID
              </span>
              <input
                value={user.email}
                readOnly
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-[#f4ecdf] px-4 py-3 text-sm text-[#304031] outline-none"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Gender
              </span>
              <select
                value={form.gender}
                onChange={(event) => updateField("gender", event.target.value)}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              >
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Blood Group
              </span>
              <input
                value={form.bloodGroup}
                onChange={(event) => updateField("bloodGroup", event.target.value)}
                placeholder="B+, O-, AB+"
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.bloodGroup ? <p className="text-xs text-rose-600">{errors.bloodGroup}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Age
              </span>
              <input
                value={form.age}
                onChange={(event) => updateField("age", event.target.value)}
                type="number"
                min={5}
                max={90}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.age ? <p className="text-xs text-rose-600">{errors.age}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Participants
              </span>
              <input
                value={form.travelers}
                onChange={(event) => updateField("travelers", event.target.value)}
                type="number"
                min={1}
                max={12}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.travelers ? <p className="text-xs text-rose-600">{errors.travelers}</p> : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Mobile No
              </span>
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.phone ? <p className="text-xs text-rose-600">{errors.phone}</p> : null}
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                WhatsApp No
              </span>
              <input
                value={form.whatsappNumber}
                onChange={(event) => updateField("whatsappNumber", event.target.value)}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.whatsappNumber ? (
                <p className="text-xs text-rose-600">{errors.whatsappNumber}</p>
              ) : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Departure Month
              </span>
              <select
                value={form.departureMonth}
                onChange={(event) => updateField("departureMonth", event.target.value)}
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              >
                {departureMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.departureMonth ? (
                <p className="text-xs text-rose-600">{errors.departureMonth}</p>
              ) : null}
            </label>

            <label className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
                Payment Details
              </span>
              <input
                value={form.paymentId}
                onChange={(event) => updateField("paymentId", event.target.value)}
                placeholder="Payment ID / reference"
                className="w-full rounded-[1.2rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
              />
              {errors.paymentId ? <p className="text-xs text-rose-600">{errors.paymentId}</p> : null}
            </label>
          </div>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#75573a]">
              Additional Note
            </span>
            <textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
              placeholder="Special request, pickup note, health note, or anything else"
              className="w-full rounded-[1.4rem] border border-[#d7ccba] bg-white px-4 py-3 text-sm text-[#304031] outline-none focus:border-[#d37a31]"
            />
          </label>
            </div>
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-[#d7ccba] bg-[#f1e7d9] p-5">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">Estimated Amount</p>
              <p className="mt-2 font-display text-3xl text-[#162214]">INR {totalAmount.toLocaleString()}</p>
              <p className="mt-3 text-sm leading-7 text-[#5f685b]">
                After you continue, the checkout page will show QR, UPI, bank details, and payment-status tracking for this exact booking.
              </p>
            </div>
            <button
              type="submit"
              disabled={isProceeding}
              className="rounded-full bg-[#d37a31] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProceeding ? "Preparing Checkout..." : "Continue To Payment"}
            </button>
          </div>
        </div>
      </form>

      {serverMessage ? <p className="mt-4 text-sm text-rose-600">{serverMessage}</p> : null}
    </div>
  );
}
