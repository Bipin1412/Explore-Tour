"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { bookingSchema } from "@/lib/validators/booking";

type FormErrors = Partial<Record<"phone" | "travelers" | "departureMonth" | "notes", string>>;

interface DynamicQRPaymentProps {
  tripId: string;
  tripName: string;
  tripPrice: number;
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

export default function DynamicQRPayment({ tripId, tripName, tripPrice }: DynamicQRPaymentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isReady, isAuthenticated, token, user, logout } = useAuth();

  const [form, setForm] = useState({
    phone: "",
    travelers: "1",
    departureMonth: departureMonths[new Date().getMonth()] ?? "January",
    notes: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isProceeding, setIsProceeding] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    if (user?.phoneNumber) {
      setForm((prev) => ({
        ...prev,
        phone: prev.phone || user.phoneNumber || ""
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
      travelers: Number(form.travelers),
      departureMonth: form.departureMonth,
      notes: form.notes.trim() || undefined
    });

    if (parsed.success) {
      setErrors({});
      return parsed.data;
    }

    const fieldErrors = parsed.error.flatten().fieldErrors;
    setErrors({
      phone: fieldErrors.phone?.[0],
      travelers: fieldErrors.travelers?.[0],
      departureMonth: fieldErrors.departureMonth?.[0],
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
      <div className="glass-panel space-y-4 rounded-2xl p-4 md:p-5">
        <p className="text-sm text-brand-fog/80">Checking your login session...</p>
      </div>
    );
  }

  if (!isAuthenticated || !user || !token) {
    return (
      <div className="glass-panel space-y-5 rounded-2xl p-4 md:p-5">
        <div>
          <h3 className="font-display text-2xl text-white">Login Required</h3>
          <p className="mt-1 text-sm text-brand-fog/80">
            Booking is compulsory only after user login. Sign in with Google or use your email and
            password account.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/20 p-3">
          <p className="text-sm text-brand-fog/75">{tripName}</p>
          <p className="font-display text-2xl text-brand-mint">INR {tripPrice.toLocaleString()}</p>
        </div>

        <div className="space-y-2 rounded-2xl border border-dashed border-white/15 bg-white/5 p-4">
          <p className="text-sm text-white">You cannot continue to payment until you are logged in.</p>
          <p className="text-xs text-brand-fog/75">
            Your account can be created with name, email, phone number, password, and confirm
            password, or you can use Google authentication.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href={`/login?next=${encodeURIComponent(nextPath)}`}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Login First
          </Link>
          <Link
            href={`/login?mode=signup&next=${encodeURIComponent(nextPath)}`}
            className="rounded-xl bg-brand-amber px-4 py-3 text-center text-sm font-semibold text-brand-ink transition hover:brightness-110"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel space-y-5 rounded-2xl p-4 md:p-5">
      <div>
        <h3 className="font-display text-2xl text-white">Reserve This Trip</h3>
        <p className="mt-1 text-sm text-brand-fog/80">
          Logged-in users can continue to payment. Your account details are used for the booking.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3">
        <p className="text-sm text-brand-fog/75">{tripName}</p>
        <p className="font-display text-2xl text-brand-mint">INR {totalAmount.toLocaleString()}</p>
      </div>

      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4 text-sm text-white">
        <p className="font-semibold text-emerald-100">{user.fullName}</p>
        <p className="mt-1 text-brand-fog/80">{user.email}</p>
        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-emerald-200/80">
          {user.provider === "GOOGLE" ? "Google verified user" : "Email account user"}
        </p>
      </div>

      <form onSubmit={proceedToPayment} className="space-y-3">
        <div>
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Phone number for this booking"
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
          />
          {errors.phone ? <p className="mt-1 text-xs text-rose-300">{errors.phone}</p> : null}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="space-y-1">
            <span className="text-xs text-brand-fog/75">Travelers</span>
            <input
              value={form.travelers}
              onChange={(event) => updateField("travelers", event.target.value)}
              type="number"
              min={1}
              max={12}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
            />
            {errors.travelers ? <p className="text-xs text-rose-300">{errors.travelers}</p> : null}
          </label>

          <label className="space-y-1">
            <span className="text-xs text-brand-fog/75">Departure Month</span>
            <select
              value={form.departureMonth}
              onChange={(event) => updateField("departureMonth", event.target.value)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
            >
              {departureMonths.map((month) => (
                <option key={month} value={month} className="bg-brand-ink">
                  {month}
                </option>
              ))}
            </select>
            {errors.departureMonth ? (
              <p className="text-xs text-rose-300">{errors.departureMonth}</p>
            ) : null}
          </label>
        </div>

        <textarea
          value={form.notes}
          onChange={(event) => updateField("notes", event.target.value)}
          placeholder="Notes (optional)"
          rows={3}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-brand-mint"
        />

        <button
          type="submit"
          disabled={isProceeding}
          className="w-full rounded-xl bg-brand-amber px-3 py-2.5 text-sm font-semibold text-brand-ink transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isProceeding ? "Proceeding..." : "Proceed to Payment"}
        </button>
      </form>

      {serverMessage ? <p className="text-sm text-rose-300">{serverMessage}</p> : null}
    </div>
  );
}
