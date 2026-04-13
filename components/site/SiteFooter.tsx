"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  footerCompanyLinkHrefs,
  footerCompanyLinks,
  footerProgramHrefs,
  footerPrograms,
  footerQuickLinkHrefs,
  footerQuickLinks
} from "@/data/navigation";
import { paymentInfo } from "@/data/payment-info";
import BrandLogo from "@/components/site/BrandLogo";

export default function SiteFooter() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer
      id="footer"
      className={`relative overflow-hidden border-t ${
        isHome
          ? "border-[#e4d2bc] bg-[#f7efe2] text-[#4d3726]"
          : "border-[#d6e7ef] bg-[#f3fafc] text-[#334952]"
      }`}
    >
      <div className={`absolute right-[-8rem] top-[-8rem] h-[18rem] w-[18rem] rounded-full blur-3xl ${
        isHome ? "bg-[#f0dcc1]" : "bg-[#d8edf7]"
      }`} />
      <div className="mx-auto grid w-full max-w-[1400px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_1fr_1fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div>
            <BrandLogo size="footer" />
            <p className={`mt-2 max-w-md text-sm leading-7 ${isHome ? "text-[#6e5a43]" : "text-[#5e7680]"}`}>
              Premium outdoor journeys, camps, trainings, and community-led adventures across
              Sahyadri, the Himalaya, wildlife circuits, and international escapes.
            </p>
          </div>

          <div className={`rounded-[1.75rem] bg-white p-5 shadow-[0_18px_45px_rgba(97,68,39,0.08)] ring-1 ${
            isHome ? "ring-[#e4d2bc]" : "ring-[#d7e7ef]"
          }`}>
            <p className={`text-xs uppercase tracking-[0.2em] ${isHome ? "text-[#c46d2c]" : "text-[#11639b]"}`}>Support Desk</p>
            <p className={`mt-3 font-semibold ${isHome ? "text-[#2c2218]" : "text-[#0b1215]"}`}>{paymentInfo.phoneNumber}</p>
            <p className={`mt-1 text-sm ${isHome ? "text-[#6e5a43]" : "text-[#5e7680]"}`}>WhatsApp: {paymentInfo.whatsappNumber}</p>
            <p className={`mt-4 text-xs uppercase tracking-[0.18em] ${isHome ? "text-[#c46d2c]" : "text-[#11639b]"}`}>
              2 Lakh+ Happy Members | 4.6 Star Community Trust
            </p>
          </div>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-[0.22em] ${isHome ? "text-[#c46d2c]" : "text-[#11639b]"}`}>Quick Links</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {footerQuickLinks.map((link) => (
              <Link
                key={link}
                href={footerQuickLinkHrefs[link] ?? "/#quick-links"}
                className={`rounded-full bg-white px-3 py-1.5 text-sm transition ${
                  isHome
                    ? "text-[#4d3726] ring-1 ring-[#e4d2bc] hover:bg-[#fbf1e4]"
                    : "text-[#334952] ring-1 ring-[#d7e7ef] hover:bg-[#eaf6fb]"
                }`}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-[0.22em] ${isHome ? "text-[#c46d2c]" : "text-[#11639b]"}`}>Programs</p>
          <div className="mt-5 space-y-3">
            {footerPrograms.map((program) => (
              <Link
                key={program}
                href={footerProgramHrefs[program] ?? "/#featured-programs"}
                className={`block text-sm transition ${isHome ? "text-[#4d3726] hover:text-[#c46d2c]" : "text-[#334952] hover:text-[#11639b]"}`}
              >
                {program}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className={`text-xs uppercase tracking-[0.22em] ${isHome ? "text-[#c46d2c]" : "text-[#11639b]"}`}>Company</p>
          <div className="mt-5 space-y-3">
            {footerCompanyLinks.map((item) => (
              <Link
                key={item}
                href={footerCompanyLinkHrefs[item] ?? "/#footer"}
                className={`block text-sm transition ${isHome ? "text-[#4d3726] hover:text-[#c46d2c]" : "text-[#334952] hover:text-[#11639b]"}`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={`border-t ${isHome ? "border-[#e4d2bc]" : "border-[#d7e7ef]"}`}>
        <div className={`mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-5 text-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 ${
          isHome ? "text-[#7f694f]" : "text-[#6a848f]"
        }`}>
          <p>Adventure | Travel | Training</p>
          <p>Google | TripAdvisor | Facebook community-led trust and reviews</p>
        </div>
      </div>
    </footer>
  );
}
