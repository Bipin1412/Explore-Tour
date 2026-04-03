import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import {
  ladyExplorersContent,
  LadyExplorerFeature,
  LadyExplorerRhythm
} from "@/data/lady-explorers-content";

export default function LadyExplorersPage() {
  const content = ladyExplorersContent;

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,115,85,0.26),transparent_28%),linear-gradient(180deg,#2d1a17_0%,#472726_38%,#6a3b34_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[1400px] gap-8 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.06fr_0.94fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <p className="section-tag text-[#f1c8b4]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-[#fff7f2] sm:text-6xl xl:text-7xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-[#f4d6c7] sm:text-2xl">{content.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#e5d4cd] sm:text-base">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#lady-rhythm" className="hero-cta-primary">
                Explore The Rhythm
              </Link>
              <Link href="#lady-enquiry" className="hero-cta-secondary">
                Become A Member
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-[1.7rem] border border-white/10 bg-white/10 p-4 text-[#f7ece6] backdrop-blur"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#f1c8b4]">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl leading-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-[2.3rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <Image
                src={content.heroImage}
                alt="Lady Explorers hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,12,10,0.08),rgba(21,12,10,0.76))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-[#fff2ea] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f1c8b4]">Movement Of Women Empowerment</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  A women-first adventure space where freedom, safety, and self-growth belong together.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#eedfd7]">{content.statement}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f3d7ca]">
                  Micro Caption: Women rising above routine and fear together
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[2rem] border border-white/10 bg-[#5c342f] p-6 text-[#f9ece5] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f1c8b4]">What You Deserve</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {content.deserves.map((item) => (
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
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#9c6654]">Why Lady Explorers</p>
                <p className="mt-3 font-display text-3xl leading-tight text-[#2c1a17]">
                  Freedom, courage, and your own time are not optional.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <article className="editorial-panel">
            <p className="section-tag">Why This Exists</p>
            <h2 className="mt-4 font-display text-4xl text-[#2c1a17] sm:text-5xl">
              In routine life, women get lost behind responsibilities. This page gives that space back.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#564b45] sm:text-base">{content.whyNow}</p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#564b45] sm:text-base">
              Whether someone is a housewife, a working professional, or a student, the deeper idea remains the
              same: adventure becomes a path to self-respect, confidence, and inner expansion.
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#dcc8bb] bg-[#fbf4ed] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-64">
              <Image
                src={content.supportImage}
                alt="Lady Explorers support and safety"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,18,16,0.08),rgba(31,18,16,0.72))]" />
              <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4dbcf]">
                Micro Caption: A trusted support system on every journey
              </p>
            </div>
            <div className="p-7">
              <p className="section-tag text-[#9c6654]">Safety | Quality | Satisfaction</p>
              <p className="mt-5 font-display text-3xl leading-tight text-[#2d1c18]">
                Certified guidance, thoughtful planning, and a caring team so women can enjoy fearlessly.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">What You Gain</p>
            <h2 className="mt-4 font-display text-4xl text-[#2c1a17] sm:text-5xl">
              Adventure becomes self-growth when it is done regularly and safely.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#5f5651] sm:text-base">
            These are not only trip outcomes. They are personal shifts that carry back into everyday life with more
            clarity, calm, strength, and confidence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.journeyFeatures.map((feature) => (
            <LadyFeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
          <article className="rounded-[2.4rem] border border-[#d8c4b7] bg-[#f7ece5] p-7 shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <p className="section-tag text-[#9c6654]">Stri Shakti In Action</p>
            <h2 className="mt-4 font-display text-4xl text-[#2c1a17] sm:text-5xl">
              When a woman steps into the wild, she explores her own power.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.powerPoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[#decbbd] bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(19,24,17,0.04)]"
                >
                  <p className="font-display text-2xl text-[#38211c]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="overflow-hidden rounded-[2.4rem] border border-[#d8c4b7] bg-[#fff8f2] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="border-b border-[#eadbcc] p-7">
              <p className="section-tag text-[#9c6654]">The Deeper Feeling</p>
              <h2 className="mt-4 font-display text-4xl text-[#2c1a17]">What adventure teaches beyond the route.</h2>
            </div>
            <div className="space-y-4 p-7">
              {content.rediscoveryBullets.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-[#e7d8cb] bg-[#fbf4ed] p-5 shadow-[0_10px_30px_rgba(19,24,17,0.03)]"
                >
                  <p className="text-sm leading-7 text-[#564b45]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="lady-rhythm" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Adventure Rhythm</p>
            <h2 className="mt-4 font-display text-4xl text-[#2c1a17] sm:text-5xl">
              Monthly, quarterly, and yearly moments that transform routine into growth.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#5f5651] sm:text-base">
            You said this section could be shown differently from Junior Explorers, so I used a stronger horizontal
            editorial design instead of a chart. It keeps the idea clear even before exact trek names and dates arrive.
          </p>
        </div>

        <div className="space-y-5">
          {content.adventureRhythm.map((item) => (
            <LadyRhythmCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="overflow-hidden rounded-[2.6rem] border border-[#d8c4b7] bg-[#f4e2da] p-7 text-[#2c1a17] shadow-[0_30px_90px_rgba(19,24,17,0.08)] sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="section-tag text-[#9c6654]">Start Changing Now</p>
              <h2 className="mt-4 font-display text-4xl text-[#2d1c18] sm:text-5xl">
                Your freedom, your strength, and your adventure start today.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#5c4c46] sm:text-base">{content.startNow}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.safetyItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-[#dcc8bb] bg-[#fff8f2] p-5 shadow-[0_10px_30px_rgba(19,24,17,0.05)]"
                  >
                    <p className="text-sm leading-7 text-[#40322d]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <article className="rounded-[2rem] border border-[#5c342f] bg-[#5c342f] p-6 text-[#fff1e9] shadow-[0_18px_60px_rgba(19,24,17,0.18)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#f1c8b4]">Become A Member</p>
                <h3 className="mt-4 font-display text-4xl text-white">Benefits of membership</h3>
                <div className="mt-5 grid gap-3">
                  {content.membershipBenefits.map((item) => (
                    <div key={item.title} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                      <p className="font-display text-2xl text-white">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-[#f0ddd4]">{item.description}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[#d8c4b7] bg-[#fff8f2] p-6 text-[#2c1a17]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#9c6654]">Lady Explorers Spirit</p>
                <p className="mt-4 font-display text-3xl leading-tight">
                  Explore more. Become more.
                </p>
                <p className="mt-4 text-sm leading-7 text-[#5c4c46]">
                  This community is designed to help women move from hesitation to confidence, from routine to renewal,
                  and from fear to strength through shared outdoor experience.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="lady-enquiry" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <article className="rounded-[2.2rem] border border-[#d8c4b7] bg-[#2f1b19] p-8 text-[#f7ebe5] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <p className="section-tag text-[#f1c8b4]">Next Step</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Ready to take your first step?
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#ead9d1] sm:text-base">
              Use this form to ask about the next Lady Explorers departure, membership path, women-first batch timing,
              or the kind of adventure rhythm that would fit you best.
            </p>
            <div className="mt-8 space-y-3 text-sm leading-7 text-[#e4d3cc]">
              <p>Best for women who want safety, growth, and a supportive adventure crowd.</p>
              <p>Exact month-wise trek lists can be added later without changing this page design.</p>
            </div>
          </article>

          <UniversalEnquiryForm
            variant="specialty"
            title="Lady Explorers enquiry form"
            description="Share your city, age group, and preferred month so the team can guide you to the right Lady Explorers batch."
            contextTitle="Lady Explorers"
            contextLabel="Selected Program"
          />
        </div>
      </section>
    </main>
  );
}

function LadyFeatureCard({ feature }: { feature: LadyExplorerFeature }) {
  return (
    <article className="editorial-panel">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5c342f] text-sm font-semibold uppercase tracking-[0.16em] text-[#f6ddd2]">
        Rise
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[#2c1a17]">{feature.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#5a4f4a]">{feature.description}</p>
    </article>
  );
}

function LadyRhythmCard({ item }: { item: LadyExplorerRhythm }) {
  return (
    <article className="overflow-hidden rounded-[2.3rem] border border-[#d8c4b7] bg-[#fff8f2] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
      <div className="grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[280px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1280px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(23,11,10,0.1),rgba(23,11,10,0.7))]" />
          <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4dbcf]">
            {item.caption}
          </p>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="section-tag text-[#9c6654]">Adventure Rhythm</p>
            <span className="rounded-full bg-[#f2dfd5] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7d4e42]">
              {item.cadence}
            </span>
          </div>
          <h3 className="mt-5 font-display text-4xl leading-tight text-[#2d1c18]">{item.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#5b504b] sm:text-base">{item.description}</p>
          <p className="mt-5 text-sm leading-7 text-[#5b504b]">
            Exact departures can plug into this card layout later with destination names, dates, and photos without
            needing to redesign the section.
          </p>
        </div>
      </div>
    </article>
  );
}
