import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import {
  juniorExplorersContent,
  JuniorExplorerBenefit,
  JuniorExplorerLearningCard,
  JuniorExplorerMoment,
  JuniorExplorerScheduleItem
} from "@/data/junior-explorers-content";

const scheduleFallback = {
  date: "To be announced",
  difficulty: "To be announced",
  endurance: "To be announced",
  cost: "Contact for details"
};

export default function JuniorExplorersPage() {
  const content = juniorExplorersContent;

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.32),transparent_28%),linear-gradient(180deg,#0f1f12_0%,#132915_44%,#1f371d_100%)]" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[1400px] gap-8 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <p className="section-tag text-[#efcfac]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-[#fff8ef] sm:text-6xl xl:text-7xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#dde5d7]">{content.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#cfd8c8] sm:text-base">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#junior-calendar" className="hero-cta-primary">
                View Adventure Calendar
              </Link>
              <Link href="#junior-enquiry" className="hero-cta-secondary">
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
            <div className="relative min-h-[330px] overflow-hidden rounded-[2.2rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <Image
                src={content.heroImage}
                alt="Junior Explorers adventure trail"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,18,10,0.08),rgba(8,18,10,0.74))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-[#f7efe5] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#efcfac]">Program Vision</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  Safe adventure that returns every month, not just once a season.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d9e1d3]">{content.statement}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: Guided confidence-building in the outdoors
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-[2rem] border border-white/10 bg-[#213d22] p-6 text-[#f3ecdf] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Why This Matters</p>
                <p className="mt-3 text-sm leading-8 text-[#d7dfd3]">{content.note}</p>
              </article>
              <article className="rounded-[2rem] border border-[#d8c7b3] bg-[#f6ede1] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a5c35]">Parent Lens</p>
                <p className="mt-3 font-display text-3xl leading-tight text-[#162214]">
                  Trust, structure, and supervised growth.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <article className="editorial-panel">
            <p className="section-tag">The Concept</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Monthly adventure creates stronger children than seasonal exposure alone.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4b564c] sm:text-base">{content.intro}</p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4b564c] sm:text-base">
              At Explorers, the goal is not only trekking. It is helping children experience forts, history,
              nature, teamwork, simplicity, and responsibility on a regular basis so those lessons become part
              of who they are.
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#d7ccbd] bg-[#f7efe4] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-64">
              <Image
                src={content.supportImage}
                alt="Junior Explorers group outdoors"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,35,21,0.1),rgba(17,35,21,0.72))]" />
              <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
                Micro Caption: Learning courage on trail
              </p>
            </div>
            <div className="p-7">
              <p className="section-tag">Core Statement</p>
              <p className="mt-5 font-display text-3xl leading-tight text-[#162214]">{content.statement}</p>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Why Monthly Adventure Matters</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Growth that parents can actually see over time.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#566055] sm:text-base">
            Repetition creates confidence. A monthly rhythm gives children room to practice courage, discipline,
            teamwork, and self-awareness instead of experiencing adventure as a one-time event.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.benefits.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-[#d7ccbd] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-full min-h-[340px]">
              <Image
                src={content.learningImage}
                alt="Junior Explorers practical learning"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.06),rgba(9,19,12,0.8))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/10 bg-black/25 p-5 text-[#f4ede3] backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#efcfac]">Beyond Books</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  Real-world learning begins outside the classroom.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d7dfd3]">
                  This program helps children experience geography, heritage, village life, and responsibility in a
                  way that no textbook can fully recreate.
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: Learning the mountain by walking it
                </p>
              </div>
            </div>
          </article>

          <div className="space-y-5">
            <div>
              <p className="section-tag">Beyond Books</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
                Children do not just hear about these things. They live them.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.learningCards.map((card) => (
                <LearningCard key={card.title} card={card} />
              ))}
            </div>
            <article className="rounded-[2rem] border border-[#d5cab9] bg-[#fff8ef] p-6 shadow-[0_18px_60px_rgba(19,24,17,0.07)]">
              <p className="section-tag">Guiding Thought</p>
              <p className="mt-5 font-display text-3xl leading-tight text-[#162214]">{content.quote}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Field Moments</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              The page now shows what the program actually feels like on the ground.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#566055] sm:text-base">
            These moments from the kids camp archive make the Junior Explorers page feel more true to the experience: trekking, ropes, rappelling, tent life, night sky, and shared camp culture.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {content.fieldMoments.map((moment) => (
            <MomentCard key={moment.title} moment={moment} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="overflow-hidden rounded-[2.6rem] border border-[#d7c8b2] bg-[#f3e6d5] p-7 text-[#162214] shadow-[0_30px_90px_rgba(16,27,17,0.12)] sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-tag text-[#8a5c35]">100% Safety Commitment</p>
              <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
                Parents&apos; trust is the first responsibility, not an afterthought.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#334033] sm:text-base">
                Junior Explorers is built around supervision, trained leadership, communication discipline, and
                child-friendly guidance so that confidence-building always happens inside a structured environment.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.safetyItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-[#dbc9b2] bg-[#fbf5ec] p-5 shadow-[0_10px_30px_rgba(19,24,17,0.05)]"
                  >
                    <p className="text-sm leading-7 text-[#223022]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <article className="rounded-[2rem] border border-[#173018] bg-[#173018] p-6 text-[#f5eee3] shadow-[0_18px_60px_rgba(19,24,17,0.18)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Our Mission</p>
                <div className="mt-5 grid gap-3">
                  {content.missionItems.map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                      <p className="font-display text-2xl text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[#d7c3ae] bg-[#f5e6d4] p-6 text-[#162214]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a5c35]">For Parents</p>
                <p className="mt-4 font-display text-3xl leading-tight">
                  Give your child a monthly habit of confidence, courage, and character.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.parentGifts.map((gift) => (
                    <span
                      key={gift}
                      className="rounded-full border border-[#d0b594] bg-white/70 px-4 py-2 text-sm font-semibold text-[#5e3d21]"
                    >
                      {gift}
                    </span>
                  ))}
                </div>
                <p className="mt-5 text-sm leading-7 text-[#445042]">{content.parentMessage}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.96fr_1.04fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-[#d7ccbd] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-full min-h-[380px]">
              <Image
                src={content.summerCampSpotlight.heroImage}
                alt="Junior Explorers summer camp spotlight"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.08),rgba(9,19,12,0.82))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/10 bg-black/25 p-5 text-[#f4ede3] backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#efcfac]">Summer Camp Spotlight</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  {content.summerCampSpotlight.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#d7dfd3]">
                  {content.summerCampSpotlight.description}
                </p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: {content.summerCampSpotlight.heroCaption}
                </p>
              </div>
            </div>
          </article>

          <div className="space-y-5">
            <div>
              <p className="section-tag">Seasonal Camp Visuals</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
                Manali camp imagery now gives the summer section a bigger adventure horizon.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {content.summerCampSpotlight.cards.map((card) => (
                <SummerCampCard key={card.title} card={card} />
              ))}
            </div>
            <article className="rounded-[2rem] border border-[#d5cab9] bg-[#fff8ef] p-6 shadow-[0_18px_60px_rgba(19,24,17,0.07)]">
              <p className="section-tag">Why This Matters</p>
              <p className="mt-5 text-sm leading-8 text-[#535b50]">
                The summer-camp section can now grow naturally into a future dedicated seasonal camp page without needing another redesign. The visual language already supports that next step.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="junior-calendar" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Adventure Calendar</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              One-day treks, parent camps, and seasonal adventure camps.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#566055] sm:text-base">{content.scheduleNote}</p>
        </div>

        <div className="space-y-6">
          <ScheduleBoard
            title="One Day Treks"
            subtitle="All one-day treks are decided according to season."
            items={content.oneDayTreks}
          />
          <ScheduleBoard
            title="One Night Two Days Camping With Parents"
            subtitle="Parent-child camp formats designed for bonding, nature exposure, and guided outdoor comfort."
            items={content.campingTrips}
          />

          <div className="grid gap-6 xl:grid-cols-2">
            <ScheduleBoard
              title="Winter Adventure Camp"
              subtitle="Short-format winter camp option for colder seasonal movement."
              items={content.winterCamps}
              compact
            />
            <ScheduleBoard
              title="Summer Adventure Camp"
              subtitle="Adventure camps for children who should spend summer with movement, nature, and discipline."
              items={content.summerCamps}
              compact
            />
          </div>
        </div>
      </section>

      <section id="junior-enquiry" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
          <article className="rounded-[2.2rem] border border-[#d8cfbf] bg-[#162917] p-8 text-[#f2eadf] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <p className="section-tag text-[#efcfac]">Next Step</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Ask about the next Junior Explorers batch.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#d4ddd0] sm:text-base">
              Use this enquiry form to ask about age fit, monthly rhythm, upcoming departures, seasonal camps, and
              how Junior Explorers differs from the general trek board.
            </p>
            <div className="mt-8 space-y-3 text-sm leading-7 text-[#d4ddd0]">
              <p>Use the form for regular batches, one-day treks, summer camps, or family camping plans.</p>
              <p>
                Missing schedule values such as cost or exact dates can be finalized later without changing the page
                design.
              </p>
            </div>
          </article>

          <UniversalEnquiryForm
            variant="specialty"
            title="Junior Explorers enquiry form"
            description="Share your city, age group, and preferred month so the team can guide you to the right Junior Explorers batch."
            contextTitle="Junior Explorers"
            contextLabel="Selected Program"
          />
        </div>
      </section>
    </main>
  );
}

function BenefitCard({ benefit }: { benefit: JuniorExplorerBenefit }) {
  return (
    <article className="editorial-panel">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#173018] text-sm font-semibold uppercase tracking-[0.16em] text-[#f2dcc2]">
        Grow
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[#162214]">{benefit.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#555c51]">{benefit.description}</p>
    </article>
  );
}

function LearningCard({ card }: { card: JuniorExplorerLearningCard }) {
  return (
    <article className="rounded-[1.7rem] border border-[#d5cab8] bg-[#f8f1e7] p-5 shadow-[0_18px_50px_rgba(19,24,17,0.06)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">Field Lesson</p>
      <h3 className="mt-3 font-display text-2xl text-[#162214]">{card.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#555c51]">{card.description}</p>
    </article>
  );
}

function MomentCard({ moment }: { moment: JuniorExplorerMoment }) {
  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-[#d6cdbe] bg-[#f8f1e7] shadow-[0_20px_60px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(31,38,26,0.14)]">
      <div className="relative h-72 overflow-hidden">
        <Image
          src={moment.image}
          alt={moment.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 20vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
          {moment.caption}
        </p>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="font-display text-2xl text-[#162617]">{moment.title}</h3>
        <p className="text-sm leading-7 text-[#5b5e54]">{moment.description}</p>
      </div>
    </article>
  );
}

function SummerCampCard({
  card
}: {
  card: {
    title: string;
    description: string;
    image: string;
    caption: string;
  };
}) {
  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-[#d6cdbe] bg-[#f8f1e7] shadow-[0_20px_60px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(31,38,26,0.14)]">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
          {card.caption}
        </p>
      </div>
      <div className="space-y-3 p-5">
        <h3 className="font-display text-2xl text-[#162617]">{card.title}</h3>
        <p className="text-sm leading-7 text-[#5b5e54]">{card.description}</p>
      </div>
    </article>
  );
}

function ScheduleBoard({
  title,
  subtitle,
  items,
  compact
}: {
  title: string;
  subtitle: string;
  items: JuniorExplorerScheduleItem[];
  compact?: boolean;
}) {
  if (compact) {
    return (
      <article className="overflow-hidden rounded-[2.2rem] border border-[#d8cfbf] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
        <div className="border-b border-[#e2d8c8] px-6 py-6 sm:px-8">
          <p className="section-tag">{title}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#545b50]">{subtitle}</p>
        </div>

        <div className="grid gap-4 p-5 sm:p-6">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="rounded-[1.8rem] border border-[#dfd4c4] bg-white/80 p-5 shadow-[0_14px_40px_rgba(19,24,17,0.05)]"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{item.month}</p>
                  <h3 className="mt-2 font-display text-3xl leading-tight text-[#162214]">{item.name}</h3>
                </div>
                <span className="inline-flex w-fit rounded-full bg-[#f1e6d7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6a4a2c]">
                  {item.date ?? scheduleFallback.date}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Snapshot label="Difficulty" value={item.difficulty ?? scheduleFallback.difficulty} />
                <Snapshot label="Endurance" value={item.endurance ?? scheduleFallback.endurance} />
                <Snapshot label="Cost" value={item.cost ?? scheduleFallback.cost} />
              </div>
            </div>
          ))}
        </div>
      </article>
    );
  }

  return (
    <article className="overflow-hidden rounded-[2.2rem] border border-[#d8cfbf] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
      <div className="border-b border-[#e2d8c8] px-6 py-6 sm:px-8">
        <p className="section-tag">{title}</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#545b50]">{subtitle}</p>
      </div>

      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#e7ddce] bg-[#f2e9dc] text-left text-xs uppercase tracking-[0.18em] text-[#7a5a3d]">
              <th className="px-6 py-4 font-semibold">Month</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Program</th>
              <th className="px-6 py-4 font-semibold">Difficulty</th>
              <th className="px-6 py-4 font-semibold">Endurance</th>
              <th className="px-6 py-4 font-semibold">Cost</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={`${item.name}-${index}`} className="border-b border-[#eee4d6] align-top last:border-b-0">
                <td className="px-6 py-5 text-sm font-semibold text-[#213022]">{item.month}</td>
                <td className="px-6 py-5 text-sm text-[#4f584d]">{item.date ?? scheduleFallback.date}</td>
                <td className="px-6 py-5">
                  <div className="max-w-xl">
                    <p className="font-semibold text-[#162214]">{item.name}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-sm text-[#4f584d]">
                  {item.difficulty ?? scheduleFallback.difficulty}
                </td>
                <td className="px-6 py-5 text-sm text-[#4f584d]">
                  {item.endurance ?? scheduleFallback.endurance}
                </td>
                <td className="px-6 py-5 text-sm text-[#4f584d]">{item.cost ?? scheduleFallback.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 p-5 md:hidden">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="rounded-[1.6rem] border border-[#e0d4c3] bg-white/70 p-4 shadow-[0_10px_30px_rgba(19,24,17,0.04)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{item.month}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-[#162214]">{item.name}</h3>
              </div>
              <span className="rounded-full bg-[#f1e6d7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6a4a2c]">
                {item.date ?? "Schedule"}
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <Snapshot label="Difficulty" value={item.difficulty ?? scheduleFallback.difficulty} />
              <Snapshot label="Endurance" value={item.endurance ?? scheduleFallback.endurance} />
              <Snapshot label="Cost" value={item.cost ?? scheduleFallback.cost} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

function Snapshot({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.1rem] border border-[#e1d6c6] bg-[#fbf5ec] p-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#8a5c35]">{label}</p>
      <p className="mt-2 text-sm font-medium leading-6 text-[#263526]">{value}</p>
    </div>
  );
}
