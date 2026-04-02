import Image from "next/image";
import Link from "next/link";

interface FeaturedProgram {
  title: string;
  subtitle: string;
  image: string;
  caption: string;
  href?: string;
}

interface FeaturedProgramsGridProps {
  programs: FeaturedProgram[];
}

export default function FeaturedProgramsGrid({ programs }: FeaturedProgramsGridProps) {
  return (
    <section id="featured-programs" className="section-shell">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="section-tag">Featured Programs</p>
          <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
            Programs shaped for every explorer profile.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-8 text-[#54594d] sm:text-base">
          Weekend escapes, camps, wildlife circuits, women-focused communities, mountain conditioning, and curated domestic or international journeys.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <Link
            key={program.title}
            href={program.href ?? "/#featured-programs"}
            className="group relative overflow-hidden rounded-[2rem] border border-[#d6cdbe] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(31,38,26,0.14)]"
          >
            <div className="relative h-72 overflow-hidden">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="w-fit rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2] backdrop-blur">
                  {program.caption}
                </p>
              </div>
            </div>

            <div className="space-y-3 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8b6a48]">{program.subtitle}</p>
              <h3 className="font-display text-3xl text-[#162617]">{program.title}</h3>
              <p className="text-sm text-[#5b5e54]">
                Explore departures, themed batches, and curated journeys built for this program family.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
