import Link from "next/link";

export default function AtlasSection() {
  return (
    <section id="atlas" className="section-shell">
      <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,#142617_0%,#20331f_45%,#2a3d21_100%)] px-6 py-10 text-[#f7efe5] shadow-[0_35px_90px_rgba(10,15,10,0.18)] sm:px-8 lg:px-10">
        <p className="section-tag text-[#d7b58f]">ATLAS</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">
              Adventure Training Leaders Academy for Sahyadri
            </h2>
            <p className="mt-4 text-base text-[#d5d9d0]">Train * Lead * Inspire</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#b7c0b4] sm:text-base">
              A flagship learning track for aspiring outdoor leaders, coordinators, and facilitators. Designed for people who want to move from participant to responsible, inspiring, and capable field leadership.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">Academy Focus</p>
            <p className="mt-3 text-sm leading-7 text-[#d5d9d0]">
              Wilderness mindset, route operations, participant care, communication, and the confidence to lead responsibly in the Sahyadri.
            </p>
            <Link href="/#featured-programs" className="mt-5 inline-flex rounded-full bg-[#d37a31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e38b44]">
              View ATLAS Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
