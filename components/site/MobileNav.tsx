"use client";

import { useState } from "react";
import Link from "next/link";
import { contactItem, navigationItems } from "@/data/navigation";

interface MobileNavProps {
  onNavigate?: () => void;
}

export default function MobileNav({ onNavigate }: MobileNavProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {navigationItems.map((item) => {
        const hasGroups = Boolean(item.groups?.length);
        const isExpanded = expanded === item.label;

        return (
          <div key={item.label} className="overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between px-4 py-3">
              <Link href={item.href} onClick={onNavigate} className="font-medium text-[#f4ece2]">
                {item.label}
              </Link>
              {hasGroups ? (
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : item.label)}
                  className="text-xs uppercase tracking-[0.16em] text-[#d8a163]"
                >
                  {isExpanded ? "Hide" : "Open"}
                </button>
              ) : null}
            </div>

            {hasGroups && isExpanded ? (
              <div className="border-t border-white/8 px-4 py-3">
                {item.groups?.map((group) => (
                  <div key={group.title} className="mb-4 last:mb-0">
                    <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#bcae95]">
                      {group.title}
                    </p>
                    <div className="space-y-2">
                      {group.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={onNavigate}
                          className="block rounded-xl px-2 py-2 text-sm text-[#f4ece2] transition hover:bg-white/[0.04]"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}

      <Link
        href={contactItem.href}
        onClick={onNavigate}
        className="flex items-center justify-center gap-2 rounded-full bg-[#d37a31] px-4 py-3 text-sm font-semibold text-white"
      >
        <span>Contact Us</span>
        <span aria-hidden>↗</span>
      </Link>
    </div>
  );
}
