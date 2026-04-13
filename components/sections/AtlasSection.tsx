import Link from "next/link";

export default function AtlasSection() {
  return (
    <section id="atlas" className="section-shell">
      <div className="overflow-hidden rounded-[2.8rem] bg-[linear-gradient(135deg,#4a3424_0%,#c46d2c_100%)] px-6 py-10 text-white shadow-[0_30px_80px_rgba(97,68,39,0.22)] sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <p className="section-tag text-[#f5ddc5]">ATLAS</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">
              Adventure Training Leaders Academy for Sahyadri
            </h2>
            <p className="mt-4 text-base text-[#f7e7d8]">Train * Lead * Inspire</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#f4e3d2] sm:text-base">
              A flagship learning track for aspiring outdoor leaders, coordinators, and
              facilitators. Designed for people who want to move from participant to responsible,
              inspiring, and capable field leadership.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white/12 p-5 ring-1 ring-white/20 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-[#f5ddc5]">Academy Focus</p>
            <p className="mt-3 text-sm leading-7 text-[#fff6ef]">
              Wilderness mindset, route operations, participant care, communication, and the
              confidence to lead responsibly in the Sahyadri.
            </p>
            <Link
              href="/#featured-programs"
              className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#c46d2c] transition hover:bg-[#fff2e4]"
            >
              View ATLAS Programs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
