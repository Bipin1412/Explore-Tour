import Link from "next/link";
import { footerQuickLinkHrefs } from "@/data/navigation";

interface QuickLinksSectionProps {
  links: string[];
}

export default function QuickLinksSection({ links }: QuickLinksSectionProps) {
  return (
    <section id="quick-links" className="section-shell">
      <div className="rounded-[2.3rem] border border-[#d8cfbf] bg-[#f6efe5] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Quick Links</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Browse the major program families in one jump.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-[#4e564b] sm:text-base">
            A footer-adjacent launchpad for seasonal treks, special communities, fitness, tours, and camps.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link}
              href={footerQuickLinkHrefs[link] ?? "/#featured-programs"}
              className="rounded-full border border-[#c7bca8] bg-white/70 px-4 py-2 text-sm font-semibold text-[#223224] transition hover:border-[#d37a31] hover:text-[#d37a31]"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
