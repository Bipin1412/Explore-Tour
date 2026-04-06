import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import {
  explorersMountainRunContent,
  MountainRunCategory,
  RegistrationCategory,
  TimelineStep
} from "@/data/explorers-mountain-run-content";

export default function ExplorersMountainRunPage() {
  const content = explorersMountainRunContent;

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.32),transparent_28%),linear-gradient(180deg,#101d12_0%,#152617_44%,#223727_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative mx-auto grid min-h-[88vh] w-full max-w-[1400px] gap-8 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <p className="section-tag text-[#efcfac]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[0.94] text-[#fff8ef] sm:text-6xl xl:text-7xl">
              {content.title}
            </h1>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-[#e2e8db] sm:text-2xl">
              {content.tagline}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#cfd8ce] sm:text-base">{content.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#cfd8ce] sm:text-base">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#run-categories" className="hero-cta-primary">
                View Categories
              </Link>
              <Link href="#mountain-run-register" className="hero-cta-secondary">
                Register Interest
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
            <div className="relative min-h-[350px] overflow-hidden rounded-[2.3rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <Image
                src={content.heroImage}
                alt="Explorers Mountain Run hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,12,0.08),rgba(10,18,12,0.76))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-[#f7efe5] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Trail Event Identity</p>
                <p className="mt-3 font-display text-3xl leading-tight">{content.statement}</p>
                <p className="mt-3 text-sm leading-7 text-[#d9e1d3]">{content.upcomingEvent}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: Fort routes, forest tracks, and mountain energy beyond the city
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[2rem] border border-white/10 bg-[#203727] p-6 text-[#f3ecdf] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#efcfac]">Perfect For</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {content.perfectFor.map((item) => (
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
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a5c35]">Stay Options</p>
                <div className="mt-4 space-y-3">
                  {content.stayOptions.map((item) => (
                    <p key={item} className="text-sm leading-7 text-[#445043]">
                      {item}
                    </p>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.03fr_0.97fr]">
          <article className="editorial-panel">
            <p className="section-tag">Main Page Overview</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Unlike a city marathon, this is a mountain-led outdoor challenge with heritage and nature built in.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">
              Explorers Mountain Run is a unique outdoor trail event designed for explorers of all ages. It takes participants through fort trails, forest paths, mountain routes, and heritage landscapes while blending fitness, confidence, adventure, and nature exploration into one professionally managed experience.
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">
              Whether someone is running their first trail or pushing endurance limits on longer categories, the event is built to help them discover strength, outdoor awareness, and the thrill of movement in real terrain.
            </p>
          </article>

          <article className="overflow-hidden rounded-[2rem] border border-[#dcc8bb] bg-[#fbf4ed] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-64">
              <Image
                src={content.supportImage}
                alt="Explorers Mountain Run support"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,15,0.08),rgba(20,18,15,0.72))]" />
              <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f4dbcf]">
                Micro Caption: Professionally marked trail movement with a strong adventure atmosphere
              </p>
            </div>
            <div className="p-7">
              <p className="section-tag text-[#8a5c35]">Why It Is Unique</p>
              <p className="mt-4 text-sm leading-8 text-[#495449]">{content.vision}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.uniqueBullets.map((item) => (
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

      <section id="run-categories" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Age Categories</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Designed for every explorer, from first-timers to senior outdoor runners.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#596157] sm:text-base">
            Each age category is matched to a safer distance band and trail style, so the event feels inclusive without losing its outdoor edge.
          </p>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          {content.categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <article className="relative overflow-hidden rounded-[2.2rem] border border-[#d7ccbd] shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <div className="relative h-full min-h-[340px]">
              <Image
                src={content.heritageImage}
                alt="Explorers Mountain Run heritage trails"
                fill
                sizes="(max-width: 1280px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.06),rgba(9,19,12,0.8))]" />
              <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/10 bg-black/25 p-5 text-[#f4ede3] backdrop-blur">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#efcfac]">Who Can Participate</p>
                <div className="mt-4 grid gap-3">
                  {content.participantBullets.map((item) => (
                    <p key={item} className="text-sm leading-7 text-[#d7dfd3]">
                      {item}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc7]">
                  Micro Caption: Trail culture that welcomes different ages and intent levels
                </p>
              </div>
            </div>
          </article>

          <div className="space-y-5">
            <div>
              <p className="section-tag">Benefits Of The Event</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
                Fitness, confidence, education, and community all move together here.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BenefitCard title="Physical Benefits" items={content.benefits.physical} />
              <BenefitCard title="Mental Benefits" items={content.benefits.mental} />
              <BenefitCard title="Educational Benefits" items={content.benefits.educational} />
              <BenefitCard title="Community Benefits" items={content.benefits.community} />
            </div>

            <article className="rounded-[2rem] border border-[#d5cab9] bg-[#fff8ef] p-6 shadow-[0_18px_60px_rgba(19,24,17,0.07)]">
              <p className="section-tag">Event Highlights</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#d7c3ae] bg-[#f7efe4] px-4 py-2 text-sm font-semibold text-[#5c442a]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-2">
          <article className="overflow-hidden rounded-[2.2rem] border border-[#d8cfbf] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
            <div className="border-b border-[#e2d8c8] px-6 py-6 sm:px-8">
              <p className="section-tag">One Day Mountain Run</p>
              <h2 className="mt-4 font-display text-4xl text-[#162214]">Best for local participants.</h2>
              <p className="mt-4 text-sm leading-7 text-[#545b50]">{content.oneDayIntro}</p>
            </div>
            <Timeline steps={content.oneDaySchedule} />
          </article>

          <article className="overflow-hidden rounded-[2.2rem] border border-[#d7c8b2] bg-[#f3e6d5] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
            <div className="border-b border-[#dcccb7] px-6 py-6 sm:px-8">
              <p className="section-tag text-[#8a5c35]">1 Night / 2 Days Adventure Run</p>
              <h2 className="mt-4 font-display text-4xl text-[#162214]">A fuller trail culture experience.</h2>
              <p className="mt-4 text-sm leading-7 text-[#545047]">{content.overnightIntro}</p>
            </div>
            <Timeline steps={content.overnightSchedule} warm />
          </article>
        </div>
      </section>

      <section id="mountain-run-register" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <article className="space-y-6 rounded-[2.2rem] border border-[#d8cebd] bg-[#213127] p-8 text-[#f6efe4] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <div>
              <p className="section-tag text-[#e7d2ad]">Registration Page</p>
              <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
                Step into the trails. Challenge yourself. Become an explorer.
              </h2>
              <p className="mt-5 text-sm leading-8 text-[#dae1d8] sm:text-base">
                Join the most exciting outdoor trail running experience near Pune. Limited participants are allowed in each category to protect safety and preserve a premium outdoor experience.
              </p>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e7d2ad]">Event Details</p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-[#d6dfd6]">
                {content.registrationDetails.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e7d2ad]">Event Highlights</p>
              <div className="mt-4 grid gap-3">
                {content.registrationHighlights.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[#d6dfd6]">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e7d2ad]">What You Get</p>
              <div className="mt-4 grid gap-3">
                {content.whatYouGet.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[#d6dfd6]">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#e7d2ad]">Safety And Support</p>
              <div className="mt-4 grid gap-3">
                {content.safetySupport.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[#d6dfd6]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-6 shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
              <p className="section-tag">Choose Your Category</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {content.registrationCategories.map((item) => (
                  <RegistrationCard key={item.title} item={item} />
                ))}
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-[#ddd1bf] bg-[#fff7ee] p-4 text-sm leading-7 text-[#5a5448]">
                {content.slotNote}
              </div>
            </article>

            <UniversalEnquiryForm
              variant="mountain-run"
              title="Explorers Mountain Run registration form"
              description="Share the runner details, selected category, and emergency contact so the team can guide the next registration step."
              contextTitle="Explorers Mountain Run"
              contextLabel="Selected Event"
            />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="overflow-hidden rounded-[2.4rem] border border-[#d8cfbf] bg-[#fff8ef] p-8 text-[#162214] shadow-[0_28px_80px_rgba(18,29,20,0.08)]">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="section-tag text-[#8a5c35]">Closing Note</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">
                Register now and run the trails with Explorers.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4f584d] sm:text-base">
                {content.closing}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="#mountain-run-register" className="hero-cta-primary">
                Open Registration
              </Link>
              <Link href="/contact-us" className="hero-cta-secondary">
                Contact The Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CategoryCard({ category }: { category: MountainRunCategory }) {
  return (
    <article className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e7] p-6 shadow-[0_18px_60px_rgba(19,24,17,0.07)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="section-tag">{category.trailType}</p>
          <h3 className="mt-4 font-display text-3xl text-[#162214]">{category.title}</h3>
        </div>
        <span className="rounded-full bg-[#efe3d4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b5738]">
          {category.distance}
        </span>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Snapshot label="Age" value={category.age} />
        <Snapshot label="Trail Distance" value={category.distance} />
      </div>
      <p className="mt-5 text-sm leading-8 text-[#545b50]">{category.description}</p>
    </article>
  );
}

function BenefitCard({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="rounded-[1.8rem] border border-[#d5cab8] bg-[#f8f1e7] p-5 shadow-[0_18px_50px_rgba(19,24,17,0.06)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{title}</p>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="text-sm leading-7 text-[#555c51]">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

function Timeline({ steps, warm }: { steps: TimelineStep[]; warm?: boolean }) {
  return (
    <div className="grid gap-4 p-5 sm:p-6">
      {steps.map((step) => (
        <div
          key={`${step.time}-${step.title}`}
          className={`rounded-[1.8rem] border p-5 shadow-[0_10px_30px_rgba(19,24,17,0.04)] ${
            warm ? "border-[#decfbb] bg-[#fbf3e7]" : "border-[#dfd4c4] bg-white/80"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{step.time}</p>
          <h3 className="mt-2 font-display text-3xl leading-tight text-[#162214]">{step.title}</h3>
          <p className="mt-4 text-sm leading-7 text-[#4f584d]">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

function RegistrationCard({ item }: { item: RegistrationCategory }) {
  return (
    <article className="rounded-[1.7rem] border border-[#dfd4c4] bg-white/75 p-5 shadow-[0_10px_30px_rgba(19,24,17,0.04)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">Registration Category</p>
      <h3 className="mt-3 font-display text-2xl text-[#162214]">{item.title}</h3>
      <div className="mt-4 grid gap-3">
        <Snapshot label="Age" value={item.age} />
        <Snapshot label="Distance" value={item.distance} />
        <Snapshot label="Registration Fee" value={`INR ${item.fee}`} />
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
