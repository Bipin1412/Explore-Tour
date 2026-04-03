"use client";

import { useMemo } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import { buildPaymentQrValue, paymentInfo } from "@/data/payment-info";

const inquiryFields = [
  "Program Type",
  "Preferred Destination",
  "Departure Month",
  "Group Size",
  "Budget Range",
  "Special Requirement"
];

const inquiryTopics = [
  "Upcoming Treks and batch schedules",
  "International tours and family holidays",
  "Corporate outings and school travel",
  "Payment help, booking support, and custom requests"
];

export default function ContactExperience() {
  const qrValue = useMemo(() => buildPaymentQrValue(), []);

  return (
    <main className="pb-16">
      <section className="relative isolate min-h-[72vh] overflow-hidden bg-[#162917]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(84,120,87,0.20),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[72vh] w-full max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="section-tag text-[#efcfac]">Contact Us</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#fff7ee] sm:text-6xl lg:text-7xl">
              Reach the support desk, plan a departure, or sort out payments quickly.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#d8ddcf] sm:text-base">
              This page is built as a proper planning surface, not just a footer afterthought. Use it to contact the team, understand what to share, and access payment and support details in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/trips" className="hero-cta-primary">
                Browse Treks
              </Link>
              <Link href="/international-tours" className="hero-cta-secondary">
                International Tours
              </Link>
              <Link href="/corporate-outings" className="hero-cta-secondary">
                Corporate Outings
              </Link>
            </div>

            <div className="mt-6 inline-flex rounded-full bg-black/25 px-4 py-2 text-sm text-[#f4eadc] backdrop-blur">
              Micro Caption: Support-led planning for treks, tours, schools, teams, and payments.
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Phone" value={paymentInfo.phoneNumber} />
          <StatCard label="WhatsApp" value={paymentInfo.whatsappNumber} />
          <StatCard label="Base" value="Pune" />
          <StatCard label="Response Style" value="Fast Routing" />
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <article className="editorial-panel">
            <p className="section-tag">Contact Form Preview</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              A clearer enquiry structure for users who don’t know where to start.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#545b50] sm:text-base">
              This is currently a UI-first contact experience. It gives the user a clear idea of the details the team needs, and it can be connected to a live backend form later without changing the layout.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {inquiryFields.map((field) => (
                <div key={field} className="rounded-[1.5rem] border border-[#ddd1bf] bg-white/75 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">{field}</p>
                  <div className="mt-3 rounded-[1rem] border border-[#e7dccb] bg-[#f7efe4] px-4 py-3 text-sm text-[#687060]">
                    Enter {field.toLowerCase()}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-[#d8cfbf] bg-[#f3e8db] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">What To Share For Faster Help</p>
              <ul className="mt-4 space-y-3">
                {inquiryTopics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm leading-7 text-[#545b50] sm:text-base">
                    <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <UniversalEnquiryForm
            variant="contact"
            title="Contact enquiry form"
            description="Use this to send a real enquiry for treks, tours, payments, schools, custom travel, or anything else you want the team to help with."
          />

          <div className="space-y-8">
            <article className="editorial-panel">
              <p className="section-tag">Map & Location</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Pune support base</h2>
              <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-[#d8cfbf]">
                <iframe
                  src="https://www.google.com/maps?q=Pune&z=11&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Explorers Group Pune map"
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-[#545b50]">
                This can later be switched to the exact client office, base point, or meeting-location embed once the final details are shared.
              </p>
            </article>

            <article className="overflow-hidden rounded-[2rem] border border-[#d8cfbf] bg-[#162917] p-6 text-[#f2eadf] shadow-[0_24px_70px_rgba(18,29,20,0.24)]">
              <p className="section-tag text-[#d6b188]">Payment & Support</p>
              <div className="mt-5 grid gap-5 md:grid-cols-[220px_minmax(0,1fr)] md:items-start">
                <div className="rounded-[1.5rem] bg-[#fff7ee] p-4">
                  <QRCodeSVG value={qrValue} size={180} includeMargin />
                </div>
                <div className="space-y-3">
                  <InfoLine label="UPI ID" value={paymentInfo.upiId} />
                  <InfoLine label="Bank" value={paymentInfo.bankName} />
                  <InfoLine label="Account Name" value={paymentInfo.accountName} />
                  <InfoLine label="Account No" value={paymentInfo.accountNumber} />
                  <InfoLine label="IFSC" value={paymentInfo.ifsc} />
                  <InfoLine label="WhatsApp" value={paymentInfo.whatsappNumber} />
                </div>
              </div>
              <div className="mt-5 rounded-[1.3rem] border border-[#d37a31]/25 bg-[#d37a31]/10 p-4 text-sm leading-7 text-[#f4e4d1]">
                {paymentInfo.note}
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.7rem] border border-[#d8cfbf] bg-[#f7efe4] p-5 shadow-[0_20px_60px_rgba(29,34,26,0.08)]">
      <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">{label}</p>
      <p className="mt-3 font-display text-3xl text-[#162214]">{value}</p>
    </div>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1rem] bg-white/[0.05] px-3 py-2">
      <p className="text-xs uppercase tracking-[0.16em] text-[#d7b58f]">{label}</p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
