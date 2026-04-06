"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { contactItem, navigationItems } from "@/data/navigation";
import { paymentInfo } from "@/data/payment-info";
import BrandLogo from "@/components/site/BrandLogo";
import GlobalSearchBar from "@/components/site/GlobalSearchBar";
import MegaMenu from "@/components/site/MegaMenu";
import MobileNav from "@/components/site/MobileNav";

export default function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeGroups = useMemo(
    () => navigationItems.find((item) => item.label === activeMenu)?.groups ?? [],
    [activeMenu]
  );

  return (
    <header className="sticky top-0 z-50 overflow-visible border-b border-white/10 bg-[rgba(10,23,14,0.82)] backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 overflow-visible px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1 2xl:flex-none">
          <BrandLogo />
        </div>

        <div className="hidden 2xl:block 2xl:flex-1">
          <GlobalSearchBar compact />
        </div>

        <nav
          className="relative ml-auto hidden min-w-0 items-center gap-0.5 2xl:flex"
          onMouseLeave={() => setActiveMenu(null)}
        >
          {navigationItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setActiveMenu(item.groups?.length ? item.label : null)}
            >
              <Link
                href={item.href}
                className="inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] font-medium text-[#efe5d9] transition hover:bg-white/[0.05] 2xl:gap-2 2xl:px-3 2xl:text-sm"
              >
                {item.label}
                {item.groups?.length ? (
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#d89b5a]">+</span>
                ) : null}
              </Link>
            </div>
          ))}

          {activeGroups.length > 0 ? <MegaMenu groups={activeGroups} /> : null}
        </nav>

        <div className="hidden min-w-fit items-center gap-3 2xl:flex">
          <a
            href={`https://wa.me/${paymentInfo.whatsappNumber.replace(/[^\d]/g, "")}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#d37a31]/50 px-4 py-2 text-sm font-semibold text-[#f7f0e8] transition hover:bg-[#d37a31]/10"
          >
            <span aria-hidden>☎</span>
            <span>{paymentInfo.phoneNumber}</span>
          </a>
          <Link
            href={contactItem.href}
            className="inline-flex items-center gap-2 rounded-full bg-[#d37a31] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#e08a45]"
          >
            <span>{contactItem.label}</span>
            <span aria-hidden>↗</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#f4ece2] 2xl:hidden"
          aria-label="Open navigation"
        >
          {mobileOpen ? "×" : "≡"}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-white/10 bg-[rgba(10,23,14,0.96)] px-4 pb-5 pt-4 2xl:hidden">
          <div className="mb-4">
            <GlobalSearchBar />
          </div>
          <MobileNav onNavigate={() => setMobileOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
