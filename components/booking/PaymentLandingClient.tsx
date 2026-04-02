"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { paymentInfo } from "@/data/payment-info";

interface PaymentLandingClientProps {
  bookingId: string;
  tripName: string;
  amount: number;
  paymentRef: string;
  upiIntent: string;
  initialPaymentStatus: "PENDING" | "CONFIRMED";
  initialReceiptNumber: string | null;
}

interface BookingStatusResponse {
  success: boolean;
  paymentStatus?: "PENDING" | "CONFIRMED";
  receiptNumber?: string | null;
  error?: string;
}

interface SubmitProofResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export default function PaymentLandingClient({
  bookingId,
  tripName,
  amount,
  paymentRef,
  upiIntent,
  initialPaymentStatus,
  initialReceiptNumber
}: PaymentLandingClientProps) {
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "CONFIRMED">(initialPaymentStatus);
  const [receiptNumber, setReceiptNumber] = useState<string | null>(initialReceiptNumber);
  const [paymentUtr, setPaymentUtr] = useState("");
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const submitPaymentProof = async () => {
    setMessage("");
    if (paymentUtr.trim().length < 6) {
      setMessage("Enter a valid UPI transaction reference (UTR).");
      return;
    }

    setIsSubmittingProof(true);
    try {
      const response = await fetch("/api/bookings/proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bookingId,
          paymentUtr: paymentUtr.trim()
        })
      });

      const result = (await response.json()) as SubmitProofResponse;
      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to submit payment reference.");
      }

      setProofSubmitted(true);
      setMessage(
        result.message ??
          "Payment reference submitted. We will verify payment and unlock your receipt."
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit payment reference.");
    } finally {
      setIsSubmittingProof(false);
    }
  };

  const checkStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "GET",
        cache: "no-store"
      });
      const result = (await response.json()) as BookingStatusResponse;
      if (!response.ok || !result.success) {
        throw new Error(result.error ?? "Unable to fetch booking status.");
      }

      const status = result.paymentStatus ?? "PENDING";
      setPaymentStatus(status);
      setReceiptNumber(result.receiptNumber ?? null);

      if (status === "CONFIRMED") {
        setMessage("Payment confirmed. Receipt is ready to download.");
      } else if (proofSubmitted) {
        setMessage("Payment is still under verification. Please check again shortly.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to fetch booking status.");
    } finally {
      setIsCheckingStatus(false);
    }
  };

  useEffect(() => {
    if (!proofSubmitted || paymentStatus === "CONFIRMED") {
      return;
    }

    const interval = window.setInterval(() => {
      void checkStatus();
    }, 12000);

    return () => window.clearInterval(interval);
  }, [proofSubmitted, paymentStatus]);

  const downloadReceipt = () => {
    window.open(`/api/bookings/${bookingId}/receipt`, "_blank", "noopener,noreferrer");
  };

  const copyValue = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      window.setTimeout(() => setCopiedField((current) => (current === label ? null : current)), 1800);
    } catch {
      setMessage(`Unable to copy ${label.toLowerCase()} automatically. Please copy it manually.`);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <section className="overflow-hidden rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
        <div className="border-b border-[#e1d6c6] bg-[#162917] px-6 py-6 text-[#f2eadf]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">Payment Checkout</p>
              <h1 className="mt-3 font-display text-4xl text-white">{tripName}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#d4ddd0]">
                Complete the transfer using QR, UPI, or bank details below, then submit the transaction reference so the team can verify and release your receipt.
              </p>
            </div>
            <div
              className={`w-fit rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                paymentStatus === "CONFIRMED"
                  ? "bg-emerald-500/20 text-emerald-100"
                  : "bg-[#d37a31]/20 text-[#f0d2b3]"
              }`}
            >
              {paymentStatus === "CONFIRMED" ? "Payment Confirmed" : "Awaiting Verification"}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div className="rounded-[1.6rem] border border-[#ddd2c1] bg-white/75 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">Amount to Pay</p>
              <p className="mt-2 font-display text-4xl text-[#2f2418]">INR {amount.toLocaleString()}</p>
              <div className="mt-4 grid gap-3 text-sm text-[#65533f]">
                <InfoRow label="Booking ID" value={bookingId} />
                <InfoRow label="Payment Ref" value={paymentRef} />
              </div>
            </div>

            <div className="space-y-3 rounded-[1.6rem] border border-[#ddd2c1] bg-white/75 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">How it works</p>
              <StepItem title="1. Complete payment" description="Use the QR code, UPI ID, or bank details shown here." />
              <StepItem title="2. Share UTR / reference" description="Paste the transaction reference after payment so verification can begin." />
              <StepItem title="3. Check status" description="Refresh status from this page until the booking is confirmed and your receipt is unlocked." />
            </div>

            <div className="space-y-3 rounded-[1.6rem] border border-[#ddd2c1] bg-[#f3e8db] p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">UPI ID</p>
                  <p className="mt-1 break-all text-sm font-semibold text-[#2f2418]">{paymentInfo.upiId}</p>
                </div>
                <ActionPill
                  label={copiedField === "UPI ID" ? "Copied" : "Copy"}
                  onClick={() => void copyValue(paymentInfo.upiId, "UPI ID")}
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">Payee</p>
                  <p className="mt-1 text-sm font-semibold text-[#2f2418]">{paymentInfo.payeeName}</p>
                </div>
                <ActionPill
                  label={copiedField === "Payment Ref" ? "Copied" : "Copy Ref"}
                  onClick={() => void copyValue(paymentRef, "Payment Ref")}
                />
              </div>
              <p className="text-sm leading-7 text-[#675543]">{paymentInfo.note}</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.8rem] border border-[#d8cfbf] bg-white p-5 shadow-[0_18px_45px_rgba(29,34,26,0.08)]">
              <div className="flex items-center justify-center rounded-[1.5rem] border border-[#ece1d1] bg-[#fffaf3] p-4">
                <QRCodeSVG value={upiIntent} size={220} includeMargin />
              </div>
              <p className="mt-4 text-center text-sm leading-7 text-[#65533f]">
                Scan in any UPI app and make the payment for this booking. Keep the transaction reference ready for the next step.
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#d8cfbf] bg-[#f3e8db] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8f7659]">Bank Transfer Details</p>
              <div className="mt-4 grid gap-3 text-sm text-[#564634]">
                <InfoRow label="Bank" value={paymentInfo.bankName} />
                <InfoRow label="Account Name" value={paymentInfo.accountName} />
                <InfoRow label="Account Number" value={paymentInfo.accountNumber} />
                <InfoRow label="IFSC" value={paymentInfo.ifsc} />
                <InfoRow label="Branch" value={paymentInfo.branch} />
                <InfoRow label="WhatsApp" value={paymentInfo.whatsappNumber} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        {paymentStatus !== "CONFIRMED" ? (
          <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-6 shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
            <p className="text-xs uppercase tracking-[0.18em] text-[#8f7659]">Verification</p>
            <h2 className="mt-3 font-display text-4xl text-[#2f2418]">Submit your payment proof</h2>
            <p className="mt-3 text-sm leading-7 text-[#675543]">
              Once the transfer is complete, enter the UTR or transaction reference below. This helps the team identify your payment faster.
            </p>

            <label className="mt-5 block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8f7659]">
                UPI UTR / Transaction Reference
              </span>
              <input
                value={paymentUtr}
                onChange={(event) => setPaymentUtr(event.target.value)}
                placeholder="Example: 412345678901"
                className="w-full rounded-[1.2rem] border border-[#d7c6aa] bg-white px-4 py-3 text-sm text-[#4e3c2b] outline-none focus:border-[#7b5a3b]"
              />
            </label>

            <div className="mt-5 grid gap-3">
              <button
                type="button"
                onClick={submitPaymentProof}
                disabled={isSubmittingProof}
                className="w-full rounded-full bg-[#d37a31] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmittingProof ? "Submitting..." : "Submit Payment Reference"}
              </button>

              <button
                type="button"
                onClick={() => void checkStatus()}
                disabled={isCheckingStatus}
                className="w-full rounded-full border border-[#7b5a3b] bg-white px-4 py-3 text-sm font-semibold text-[#7b5a3b] transition hover:bg-[#f4ede2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingStatus ? "Checking..." : "Check Payment Status"}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-emerald-300/50 bg-emerald-50 p-6 shadow-[0_24px_70px_rgba(16,88,48,0.10)]">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">Receipt Ready</p>
            <h2 className="mt-3 font-display text-4xl text-emerald-900">Payment confirmed</h2>
            <p className="mt-3 text-sm leading-7 text-emerald-800">
              Your booking has been verified successfully. You can now download the receipt for your records.
            </p>
            {receiptNumber ? (
              <div className="mt-5 rounded-[1.4rem] border border-emerald-200 bg-white/75 p-4 text-sm text-emerald-900">
                <p className="text-xs uppercase tracking-[0.16em] text-emerald-700">Receipt Number</p>
                <p className="mt-2 font-semibold">{receiptNumber}</p>
              </div>
            ) : null}
            <button
              type="button"
              onClick={downloadReceipt}
              className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#1f3023] transition hover:bg-slate-100"
            >
              Download Receipt PDF
            </button>
          </div>
        )}

        <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#162917] p-6 text-[#f1eadf] shadow-[0_24px_70px_rgba(29,34,26,0.18)]">
          <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">Support Desk</p>
          <h3 className="mt-3 font-display text-3xl text-white">Need help with the transfer?</h3>
          <p className="mt-3 text-sm leading-7 text-[#d4ddd0]">
            If the payment app shows a delay or you paid by bank transfer, share your booking ID and payment reference with the support team on WhatsApp.
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            <InfoRow label="Phone" value={paymentInfo.phoneNumber} inverse />
            <InfoRow label="WhatsApp" value={paymentInfo.whatsappNumber} inverse />
            <InfoRow label="Booking Ref" value={paymentRef} inverse />
          </div>
        </div>

        {message ? (
          <div
            className={`rounded-[1.6rem] border p-4 text-sm leading-7 ${
              paymentStatus === "CONFIRMED"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-[#dfc6b1] bg-[#fff6ee] text-[#7a3d2f]"
            }`}
          >
            {message}
          </div>
        ) : null}
      </section>
    </div>
  );
}

function InfoRow({
  label,
  value,
  inverse
}: {
  label: string;
  value: string;
  inverse?: boolean;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 rounded-[1rem] px-3 py-2 ${inverse ? "bg-white/[0.05]" : "bg-white/55"}`}>
      <span className={`text-xs uppercase tracking-[0.16em] ${inverse ? "text-[#d7b58f]" : "text-[#8f7659]"}`}>
        {label}
      </span>
      <span className={`text-right font-medium ${inverse ? "text-[#f4ede2]" : "text-[#2f2418]"}`}>{value}</span>
    </div>
  );
}

function StepItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[1rem] border border-[#eadcc8] bg-[#fffaf2] p-4">
      <p className="text-sm font-semibold text-[#2f2418]">{title}</p>
      <p className="mt-1 text-sm leading-7 text-[#675543]">{description}</p>
    </div>
  );
}

function ActionPill({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[#d1b38f] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8a5c35] transition hover:border-[#d37a31] hover:text-[#d37a31]"
    >
      {label}
    </button>
  );
}
