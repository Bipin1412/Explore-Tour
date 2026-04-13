import Link from "next/link";
import { footerQuickLinkHrefs } from "@/data/navigation";

interface QuickLinksSectionProps {
  links: string[];
}

export default function QuickLinksSection({ links }: QuickLinksSectionProps) {
  return (
    <section id="quick-links" className="section-shell">
      <div className="rounded-[2.8rem] bg-[linear-gradient(135deg,#4a3424_0%,#c46d2c_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(97,68,39,0.22)] sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag text-[#f5ddc5]">Quick Links</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Browse the major program families in one jump.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-8 text-[#f4e3d2] sm:text-base">
            A footer-adjacent launchpad for seasonal treks, special communities, fitness, tours,
            and camps.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link}
              href={footerQuickLinkHrefs[link] ?? "/#featured-programs"}
              className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/18"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
