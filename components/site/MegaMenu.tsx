import Link from "next/link";
import { NavigationGroup } from "@/data/navigation";

interface MegaMenuProps {
  groups: NavigationGroup[];
}

export default function MegaMenu({ groups }: MegaMenuProps) {
  return (
    <div className="absolute left-0 top-[calc(100%+0.9rem)] w-[min(920px,80vw)] overflow-hidden rounded-[2rem] border border-white/10 bg-[#102114]/96 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-[1.5rem] border border-white/6 bg-white/[0.03] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c6b599]">
              {group.title}
            </p>
            <div className="mt-4 space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-2xl px-3 py-2 transition hover:bg-white/[0.04]"
                >
                  <span className="block font-medium text-[#f7f0e8]">{link.label}</span>
                  {link.description ? (
                    <span className="mt-1 block text-sm text-[#aab3a2]">{link.description}</span>
                  ) : null}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
