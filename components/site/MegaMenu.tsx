import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationGroup } from "@/data/navigation";

interface MegaMenuProps {
  groups: NavigationGroup[];
}

export default function MegaMenu({ groups }: MegaMenuProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div
      className={`absolute left-0 top-[calc(100%+0.9rem)] w-[min(920px,80vw)] overflow-hidden rounded-[2rem] p-5 shadow-[0_32px_90px_rgba(0,0,0,0.18)] backdrop-blur-xl ${
        isHome
          ? "border border-[#e4d2bc] bg-white/96"
          : "border border-white/10 bg-[#102114]/96"
      }`}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <div
            key={group.title}
            className={`rounded-[1.5rem] p-4 ${
              isHome
                ? "bg-[#fbf2e4] ring-1 ring-[#ead9c4]"
                : "border border-white/6 bg-white/[0.03]"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                isHome ? "text-[#c46d2c]" : "text-[#c6b599]"
              }`}
            >
              {group.title}
            </p>
            <div className="mt-4 space-y-3">
              {group.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block rounded-2xl px-3 py-2 transition ${
                    isHome ? "hover:bg-white" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span className={`block font-medium ${isHome ? "text-[#2c2218]" : "text-[#f7f0e8]"}`}>
                    {link.label}
                  </span>
                  {link.description ? (
                    <span className={`mt-1 block text-sm ${isHome ? "text-[#6e5a43]" : "text-[#aab3a2]"}`}>
                      {link.description}
                    </span>
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
