"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactItem, navigationItems } from "@/data/navigation";
import { paymentInfo } from "@/data/payment-info";
import BrandLogo from "@/components/site/BrandLogo";
import GlobalSearchBar from "@/components/site/GlobalSearchBar";
import MegaMenu from "@/components/site/MegaMenu";
import MobileNav from "@/components/site/MobileNav";

export default function SiteHeader() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  const activeGroups = useMemo(
    () => navigationItems.find((item) => item.label === activeMenu)?.groups ?? [],
    [activeMenu]
  );

  return (
    <header
      className={`sticky top-0 z-50 overflow-visible backdrop-blur-2xl transition ${
        isHome
          ? "border-b border-[#cfe3ee]/70 bg-[rgba(247,252,254,0.82)]"
          : "border-b border-white/10 bg-[rgba(10,23,14,0.82)]"
      }`}
    >
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
                className={`inline-flex whitespace-nowrap items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] font-medium transition 2xl:gap-2 2xl:px-3 2xl:text-sm ${
                  isHome
                    ? "text-[#334952] hover:bg-[#e8f3f8]"
                    : "text-[#efe5d9] hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
                {item.groups?.length ? (
                  <span
                    className={`text-[10px] uppercase tracking-[0.2em] ${
                      isHome ? "text-[#11639b]" : "text-[#d89b5a]"
                    }`}
                  >
                    +
                  </span>
                ) : null}
              </Link>
            </div>
          ))}

          {activeGroups.length > 0 ? <MegaMenu groups={activeGroups} /> : null}
        </nav>

        <div className="hidden min-w-fit items-center gap-3 2xl:flex">
          <a
            href={`https://wa.me/${paymentInfo.whatsappNumber.replace(/[^\d]/g, "")}`}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isHome
                ? "border border-[#c7dde8] text-[#334952] hover:bg-[#e8f3f8]"
                : "border border-[#d37a31]/50 text-[#f7f0e8] hover:bg-[#d37a31]/10"
            }`}
          >
            <span aria-hidden>Call</span>
            <span>{paymentInfo.phoneNumber}</span>
          </a>
          <Link
            href={contactItem.href}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
              isHome
                ? "bg-[#11639b] hover:bg-[#2f7eb5]"
                : "bg-[#d37a31] hover:bg-[#e08a45]"
            }`}
          >
            <span>{contactItem.label}</span>
            <span aria-hidden>Open</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full 2xl:hidden ${
            isHome
              ? "border border-[#cfe3ee] bg-white/80 text-[#334952]"
              : "border border-white/10 bg-white/[0.04] text-[#f4ece2]"
          }`}
          aria-label="Open navigation"
        >
          {mobileOpen ? "X" : "="}
        </button>
      </div>

      {mobileOpen ? (
        <div
          className={`px-4 pb-5 pt-4 2xl:hidden ${
            isHome
              ? "border-t border-[#cfe3ee] bg-[rgba(247,252,254,0.96)]"
              : "border-t border-white/10 bg-[rgba(10,23,14,0.96)]"
          }`}
        >
          <div className="mb-4">
            <GlobalSearchBar />
          </div>
          <MobileNav onNavigate={() => setMobileOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
