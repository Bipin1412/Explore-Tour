"use client";

import { useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { buildPaymentQrValue, paymentInfo } from "@/data/payment-info";

export default function FloatingPaymentButton() {
  const [isOpen, setIsOpen] = useState(false);
  const qrValue = useMemo(() => buildPaymentQrValue(), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-4 z-40 inline-flex items-center gap-3 rounded-full bg-[#d37a31] px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(211,122,49,0.34)] transition hover:translate-y-[-1px] hover:bg-[#e38b44] sm:bottom-6 sm:right-6"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/12 text-base">
          ₹
        </span>
        <span className="text-left">
          <span className="block text-[11px] uppercase tracking-[0.18em] text-[#fee8d4]">Payments</span>
          <span className="block">GPay | QR | Bank</span>
        </span>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.55)] p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f2013] text-[#f4ece2] shadow-[0_35px_100px_rgba(0,0,0,0.55)]">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white"
              aria-label="Close payment details"
            >
              ×
            </button>

            <div className="grid gap-6 p-6 md:grid-cols-[320px_minmax(0,1fr)] md:p-8">
              <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.04] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-[#c8b496]">Scan to Pay</p>
                <div className="mt-5 flex justify-center rounded-[1.5rem] bg-[#f8f0e6] p-5">
                  <QRCodeSVG value={qrValue} size={220} includeMargin />
                </div>
                <p className="mt-4 text-sm leading-7 text-[#c7cbc1]">
                  Scan using Google Pay, PhonePe, Paytm, or any UPI app. Keep this panel accessible from every page.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#c8b496]">Payment Desk</p>
                  <h3 className="mt-2 font-display text-3xl text-white">GPay, UPI, and Bank Transfer</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#b3b8ac]">
                    A global payment utility for treks, tours, camps, and custom enquiries. Bank and UPI values are currently placeholder content until client details are confirmed.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#d37a31]">UPI</p>
                    <p className="mt-3 text-lg font-semibold text-white">{paymentInfo.upiId}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">GPay Number: {paymentInfo.phoneNumber}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">WhatsApp: {paymentInfo.whatsappNumber}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-[#d37a31]">Bank Details</p>
                    <p className="mt-3 text-sm text-[#c7cbc1]">Bank: {paymentInfo.bankName}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">A/C Name: {paymentInfo.accountName}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">A/C No: {paymentInfo.accountNumber}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">IFSC: {paymentInfo.ifsc}</p>
                    <p className="mt-2 text-sm text-[#c7cbc1]">Branch: {paymentInfo.branch}</p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[#d37a31]/25 bg-[#d37a31]/10 p-4 text-sm text-[#f5e5d6]">
                  {paymentInfo.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
