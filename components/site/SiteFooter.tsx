import Link from "next/link";
import {
  footerCompanyLinkHrefs,
  footerCompanyLinks,
  footerProgramHrefs,
  footerPrograms,
  footerQuickLinkHrefs,
  footerQuickLinks
} from "@/data/navigation";
import { paymentInfo } from "@/data/payment-info";

export default function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-white/10 bg-[#0b160f] text-[#f2e9dc]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d37a31]/50 to-transparent" />
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div>
            <p className="font-display text-3xl uppercase tracking-[0.16em] text-white">Explorers</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-[#b7baaf]">
              Premium outdoor journeys, camps, trainings, and community-led adventures across Sahyadri, the Himalaya, wildlife circuits, and international escapes.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/8 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#c6b599]">Support Desk</p>
            <p className="mt-3 font-semibold text-white">{paymentInfo.phoneNumber}</p>
            <p className="mt-1 text-sm text-[#b7baaf]">WhatsApp: {paymentInfo.whatsappNumber}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[#d37a31]">
              2 Lakh+ Happy Members | 4.6 Star Community Trust
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c6b599]">Quick Links</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {footerQuickLinks.map((link) => (
              <Link
                key={link}
                href={footerQuickLinkHrefs[link] ?? "/#quick-links"}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-[#efe5d9] transition hover:border-[#d37a31]/60 hover:text-white"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c6b599]">Programs</p>
          <div className="mt-5 space-y-3">
            {footerPrograms.map((program) => (
              <Link
                key={program}
                href={footerProgramHrefs[program] ?? "/#featured-programs"}
                className="block text-sm text-[#efe5d9] transition hover:text-[#f3b06c]"
              >
                {program}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#c6b599]">Company</p>
          <div className="mt-5 space-y-3">
            {footerCompanyLinks.map((item) => (
              <Link
                key={item}
                href={footerCompanyLinkHrefs[item] ?? "/#footer"}
                className="block text-sm text-[#efe5d9] transition hover:text-[#f3b06c]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-5 text-sm text-[#9ea293] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Adventure | Travel | Training</p>
          <p>Google | TripAdvisor | Facebook community-led trust and reviews</p>
        </div>
      </div>
    </footer>
  );
}
