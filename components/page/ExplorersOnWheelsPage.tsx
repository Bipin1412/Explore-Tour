import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import { explorersOnWheelsContent } from "@/data/explorers-on-wheels-content";

export default function ExplorersOnWheelsPage() {
  const content = explorersOnWheelsContent;

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.28),transparent_28%),linear-gradient(180deg,#111d14_0%,#17271b_40%,#243629_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[1400px] gap-8 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <p className="section-tag text-[#efcfac]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.94] text-[#fff8ef] sm:text-6xl xl:text-7xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-[#dfe5db] sm:text-2xl">{content.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#cfd8ce] sm:text-base">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#wheel-tracks" className="hero-cta-primary">
                Explore The Formats
              </Link>
              <Link href="#wheels-enquiry" className="hero-cta-secondary">
                Send Enquiry
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-[1.7rem] border border-white/10 bg-white/8 p-4 text-[#f4ede3] backdrop-blur"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl leading-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-[2.3rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <Image
                src={content.heroImage}
                alt="Explorers on Wheels hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,12,0.08),rgba(10,18,12,0.76))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-[#f7efe5] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Signature Concept</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  The road is not just how you get there. It becomes the experience itself.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d9e1d3]">{content.statement}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: Scenic movement, road discipline, and adventure-led arrival
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[2rem] border border-white/10 bg-[#223c28] p-6 text-[#f3ecdf] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Stay Style</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {content.stayOptions.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold text-[#fff2ea]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[#d8c3b6] bg-[#f7ece5] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a5c35]">Flexible Duration</p>
                <p className="mt-3 font-display text-3xl leading-tight text-[#162214]">
                  From one-day rides to multi-day expeditions.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className="editorial-panel">
            <p className="section-tag">The Journey Concept</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              This is for people who want the movement, the road, and the story in between.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">
              Explorers on Wheels is built around self-driven or road-led experiences that feel rugged, social, and real.
              Some will want throttle and discipline. Some will want endurance and rhythm. Some will want comfort on wheels without the responsibility of driving.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">
              The page is intentionally designed as a premium signature concept so each route style can grow later into real schedules, route calendars, and destination-led departures.
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#dcc8bb] bg-[#fbf4ed] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-64">
              <Image
                src={content.supportImage}
                alt="Explorers on Wheels support"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.08),rgba(20,18,15,0.72))]" />
              <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4dbcf]">
                Micro Caption: Support, pacing, and logistics stay with the group
              </p>
            </div>
            <div className="p-7">
              <p className="section-tag text-[#8a5c35]">What Makes It Special</p>
              <div className="mt-5 grid gap-3">
                {content.specials.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.3rem] border border-[#e3d8c8] bg-white/70 px-4 py-3"
                  >
                    <p className="text-sm leading-7 text-[#445043]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="wheel-tracks" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Three Road Formats</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Bike, cycle, and caravan journeys built for very different explorer profiles.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#596157] sm:text-base">
            Each format keeps the signature spirit of Explorers on Wheels, but the eligibility, discipline, and traveler experience are shaped around the way people actually move.
          </p>
        </div>

        <div className="space-y-6">
          <TrackCard
            title={content.bike.title}
            description={content.bike.description}
            sections={[
              { title: "Basic Eligibility", items: content.bike.eligibility },
              { title: "Mandatory Safety", items: content.bike.mandatory },
              { title: "Vehicle Requirements", items: content.bike.vehicle },
              { title: "Recommended", items: content.bike.recommended },
              { title: "Not Allowed", items: content.bike.notAllowed }
            ]}
            accent="forest"
          />

          <TrackCard
            title={content.cycle.title}
            description={content.cycle.description}
            sections={[
              { title: "Basic Eligibility", items: content.cycle.eligibility },
              { title: "Mandatory Safety", items: content.cycle.mandatory },
              { title: "Cycle Requirements", items: content.cycle.vehicle },
              { title: "Recommended", items: content.cycle.recommended },
              { title: "Not Allowed", items: content.cycle.notAllowed }
            ]}
            accent="sand"
          />

          <TrackCard
            title={content.caravan.title}
            description={content.caravan.description}
            image={content.caravanImage}
            sections={[
              { title: "Basic Eligibility", items: content.caravan.eligibility },
              { title: "What You Experience", items: content.caravan.experience },
              { title: "Travel Discipline", items: content.caravan.discipline },
              { title: "Not Allowed", items: content.caravan.notAllowed },
              { title: "Ideal For", items: content.caravan.idealFor }
            ]}
            extraIntro={content.caravan.intro}
            accent="warm"
          />
        </div>

        <div className="mt-6 rounded-[1.8rem] border border-[#d6c8b0] bg-[#fff6eb] p-5 text-sm leading-8 text-[#5d4c3d] shadow-[0_18px_60px_rgba(19,24,17,0.06)]">
          {content.disciplineNote}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.98fr_1.02fr]">
          <article className="rounded-[2.4rem] border border-[#d8cbb6] bg-[#f7efe4] p-7 shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <p className="section-tag">Safety First</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Every expedition is supported like a serious field movement, not a casual outing.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.safety.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[#e0d6c6] bg-[#fbf5ec] p-4 shadow-[0_10px_30px_rgba(19,24,17,0.03)]"
                >
                  <p className="text-sm leading-7 text-[#4d564d]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-[#213127] bg-[#213127] p-6 text-[#f6efe4] shadow-[0_18px_60px_rgba(19,24,17,0.18)]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">Leadership Opportunity</p>
              <h3 className="mt-4 font-display text-4xl text-white">Grow from participant to ride leader.</h3>
              <div className="mt-5 grid gap-3">
                {content.leadership.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-display text-2xl text-white">{item}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[#d8cebd] bg-[#fff8ef] p-6 text-[#162214]">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8f6a43]">Closing Thought</p>
              <p className="mt-4 font-display text-3xl leading-tight">
                Ready for a rugged experience?
              </p>
              <p className="mt-4 text-sm leading-8 text-[#50584e]">{content.closing}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="wheels-enquiry" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
          <article className="rounded-[2.2rem] border border-[#d8cebd] bg-[#213127] p-8 text-[#f6efe4] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <p className="section-tag text-[#e7d2ad]">Join The Movement</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Ask about the next Explorers on Wheels experience.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#dae1d8] sm:text-base">
              Use this form to ask about bike rides, cycling expeditions, caravan road trips, eligibility, monthly themes, or how this concept fits your travel style.
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm leading-7 text-[#d3ddd2]">
                The route calendar, exact destinations, and monthly themes can be added later without changing this premium page structure.
              </p>
            </div>
          </article>

          <UniversalEnquiryForm
            variant="specialty"
            title="Explorers on Wheels enquiry form"
            description="Share your city, age group, and preferred month so the team can guide you to the right bike, cycle, or caravan experience."
            contextTitle="Explorers on Wheels"
            contextLabel="Selected Program"
          />
        </div>
      </section>
    </main>
  );
}

function TrackCard({
  title,
  description,
  sections,
  accent,
  image,
  extraIntro
}: {
  title: string;
  description: string;
  sections: Array<{ title: string; items: string[] }>;
  accent: "forest" | "sand" | "warm";
  image?: string;
  extraIntro?: string;
}) {
  const accentClasses =
    accent === "forest"
      ? "border-[#d8cfbf] bg-[#f8f1e7]"
      : accent === "sand"
        ? "border-[#dccab6] bg-[#fbf4eb]"
        : "border-[#d7c2b1] bg-[#fff7ef]";

  return (
    <article className={`overflow-hidden rounded-[2.3rem] border shadow-[0_24px_70px_rgba(29,34,26,0.08)] ${accentClasses}`}>
      <div className={`grid gap-0 ${image ? "xl:grid-cols-[0.9fr_1.1fr]" : ""}`}>
        {image ? (
          <div className="relative min-h-[320px]">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 1280px) 100vw, 38vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,12,0.1),rgba(10,18,12,0.72))]" />
            <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
              Micro Caption: Comfortable overland travel without the fatigue of driving
            </p>
          </div>
        ) : null}

        <div className="p-7 sm:p-8">
          <p className="section-tag">{title}</p>
          <h3 className="mt-4 font-display text-4xl text-[#162214]">{title}</h3>
          <p className="mt-4 text-sm leading-8 text-[#555f55] sm:text-base">{description}</p>
          {extraIntro ? <p className="mt-4 text-sm leading-8 text-[#555f55] sm:text-base">{extraIntro}</p> : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[1.7rem] border border-[#ddd3c4] bg-white/70 p-5 shadow-[0_10px_30px_rgba(19,24,17,0.04)]"
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{section.title}</p>
                <ul className="mt-4 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 text-[#4e574e]">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
