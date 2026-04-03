import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import {
  silverTrailsContent,
  SilverTrailFeature,
  SilverTrailProgram
} from "@/data/silver-trails-content";

export default function SilverTrailsPage() {
  const content = silverTrailsContent;

  return (
    <main className="pb-16">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(187,146,92,0.26),transparent_28%),linear-gradient(180deg,#18231d_0%,#24352c_40%,#385144_100%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid min-h-[86vh] w-full max-w-[1400px] gap-8 px-4 pb-14 pt-28 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:px-8">
          <div className="flex flex-col justify-end">
            <p className="section-tag text-[#e7d2ad]">{content.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-[#f9f4ed] sm:text-6xl xl:text-7xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-[#dce3db] sm:text-2xl">{content.subtitle}</p>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-[#d0d9cf] sm:text-base">{content.intro}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#silver-programs" className="hero-cta-primary">
                Explore Programs
              </Link>
              <Link href="#silver-enquiry" className="hero-cta-secondary">
                Join Silver Trails
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={`${stat.label}-${stat.value}`}
                  className="rounded-[1.7rem] border border-white/10 bg-white/10 p-4 text-[#f8f1e6] backdrop-blur"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">{stat.label}</p>
                  <p className="mt-2 font-display text-3xl leading-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end gap-5">
            <div className="relative min-h-[340px] overflow-hidden rounded-[2.3rem] border border-white/10 shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <Image
                src={content.heroImage}
                alt="Silver Trails hero"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,17,14,0.08),rgba(12,17,14,0.76))]" />
              <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5 text-[#f8f1e7] backdrop-blur-md">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">Comfort-First Adventure</p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  A mature adventure community where safety, pacing, and meaningful company come first.
                </p>
                <p className="mt-3 text-sm leading-7 text-[#dde3db]">{content.statement}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#e9dcc6]">
                  Micro Caption: Freedom and confidence after responsibilities
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-[1.08fr_0.92fr]">
              <article className="rounded-[2rem] border border-white/10 bg-[#3b5447] p-6 text-[#f8f1e6] shadow-[0_20px_70px_rgba(0,0,0,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">Our Vision</p>
                <p className="mt-3 text-sm leading-8 text-[#dde4dc]">{content.vision}</p>
              </article>
              <article className="rounded-[2rem] border border-[#d8cbb6] bg-[#f7efe4] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.12)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8f6a43]">Our Mission</p>
                <p className="mt-3 font-display text-3xl leading-tight text-[#162214]">
                  Adventure redefined for the silver generation.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
          <article className="editorial-panel">
            <p className="section-tag">About Silver Trails</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Adventure has no age, but the way we design it should respect this stage of life.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">{content.about}</p>
            <div className="mt-7 grid gap-3">
              {content.missionItems.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.4rem] border border-[#dcd2c1] bg-white/75 px-5 py-4 shadow-[0_10px_30px_rgba(19,24,17,0.04)]"
                >
                  <p className="font-medium text-[#243025]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2.2rem] border border-[#d8cebd] bg-[#f8f1e7] p-7 shadow-[0_30px_90px_rgba(19,24,17,0.08)]">
            <p className="section-tag">Who Is This For?</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214]">A community built for mature adults who still want adventure.</h2>
            <div className="mt-6 grid gap-3">
              {content.idealFor.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-[#e0d6c6] bg-[#fbf5ec] p-4 shadow-[0_10px_30px_rgba(19,24,17,0.03)]"
                >
                  <p className="text-sm leading-7 text-[#4d564d]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Why Choose Silver Trails</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Safety, comfort, pacing, and like-minded company are the heart of the experience.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#596157] sm:text-base">
            The point is not to prove speed. The point is to make adventure possible, enjoyable, and sustainable for
            adults who want to explore this chapter of life with more confidence.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.chooseFeatures.map((feature) => (
            <SilverFeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </section>

      <section id="silver-programs" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Program Types</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Curated routes for stamina, comfort, reflection, and meaningful movement.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#596157] sm:text-base">
            You mentioned the page can use either a chart or horizontal designs. Since you shared premium program
            types but not actual dated departures yet, I’ve used premium horizontal tracks with imagery. We can slot
            real batches into these later without redesigning the section.
          </p>
        </div>

        <div className="space-y-5">
          {content.programs.map((program) => (
            <SilverProgramCard key={program.title} program={program} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="overflow-hidden rounded-[2.6rem] border border-[#d9cfbf] bg-[#f2eadf] p-7 text-[#162214] shadow-[0_30px_90px_rgba(16,27,17,0.08)] sm:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="section-tag text-[#8f6a43]">Safety Model For Mature Trekkers</p>
              <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
                We prioritize safety over summit.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#495249] sm:text-base">
                Silver Trails is designed to reduce hesitation, not increase risk. The model is structured to create
                confidence through preparation, slower pacing, and cleaner support.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {content.safetyModel.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.5rem] border border-[#ddd2c1] bg-[#fbf5ec] p-5 shadow-[0_10px_30px_rgba(19,24,17,0.05)]"
                  >
                    <p className="text-sm leading-7 text-[#233123]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <article className="rounded-[2rem] border border-[#213127] bg-[#213127] p-6 text-[#f6efe4] shadow-[0_18px_60px_rgba(19,24,17,0.18)]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">Our Philosophy</p>
                <div className="mt-5 grid gap-3">
                  {content.philosophyBullets.map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                      <p className="font-display text-2xl text-white">{item}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-[2rem] border border-[#d8cebd] bg-[#fff8ef] p-6 text-[#162214]">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#8f6a43]">Why Silver Trails Is Different</p>
                <div className="mt-5 grid gap-3">
                  {content.differentiators.map((item) => (
                    <div key={item} className="rounded-[1.3rem] border border-[#e3d8c8] bg-white/70 px-4 py-3">
                      <p className="text-sm leading-7 text-[#445043]">{item}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Frequently Asked Questions</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Honest answers for people deciding whether now is the right time.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-8 text-[#596157] sm:text-base">
            These are the exact worries many 40+ and 50+ adults bring with them. The page answers them clearly because
            reassurance matters just as much as inspiration here.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {content.faqs.map((faq) => (
            <article
              key={faq.question}
              className="rounded-[2rem] border border-[#d8cebd] bg-[#f8f1e7] p-6 shadow-[0_18px_60px_rgba(19,24,17,0.06)]"
            >
              <p className="font-display text-3xl leading-tight text-[#162214]">{faq.question}</p>
              <p className="mt-4 text-sm leading-8 text-[#50584e]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="silver-enquiry" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
          <article className="rounded-[2.2rem] border border-[#d8cebd] bg-[#213127] p-8 text-[#f6efe4] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <p className="section-tag text-[#e7d2ad]">It’s Your Time</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Explore. Reconnect. Reclaim your adventure.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#dae1d8] sm:text-base">{content.closing}</p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#e7d2ad]">{content.ctaLine}</p>
              <p className="mt-3 text-sm leading-7 text-[#d3ddd2]">
                Use this form to ask about beginner-friendly batches, couple-friendly routes, retreat programs, or the
                safest Silver Trails option to start with.
              </p>
            </div>
          </article>

          <UniversalEnquiryForm
            variant="specialty"
            title="Silver Trails enquiry form"
            description="Share your city, age group, and preferred month so the team can guide you to the right Silver Trails program."
            contextTitle="Silver Trails"
            contextLabel="Selected Program"
          />
        </div>
      </section>
    </main>
  );
}

function SilverFeatureCard({ feature }: { feature: SilverTrailFeature }) {
  return (
    <article className="editorial-panel">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#203127] text-sm font-semibold uppercase tracking-[0.16em] text-[#e7d2ad]">
        Calm
      </div>
      <h3 className="mt-5 font-display text-3xl leading-tight text-[#162214]">{feature.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#566055]">{feature.description}</p>
    </article>
  );
}

function SilverProgramCard({ program }: { program: SilverTrailProgram }) {
  return (
    <article className="overflow-hidden rounded-[2.3rem] border border-[#d8cebd] bg-[#fff8ef] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
      <div className="grid gap-0 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="relative min-h-[280px]">
          <Image
            src={program.image}
            alt={program.title}
            fill
            sizes="(max-width: 1280px) 100vw, 40vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,23,18,0.08),rgba(16,23,18,0.72))]" />
          <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f1dfc0]">
            {program.caption}
          </p>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <p className="section-tag text-[#8f6a43]">Program Track</p>
            <span className="rounded-full bg-[#efe4d2] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#73573b]">
              {program.fit}
            </span>
          </div>
          <h3 className="mt-5 font-display text-4xl leading-tight text-[#162214]">{program.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-[#555f55] sm:text-base">{program.description}</p>
          <p className="mt-5 text-sm leading-7 text-[#555f55]">
            Exact departures, dates, and destination-specific visuals can be layered onto this format later without
            redesigning the overall experience.
          </p>
        </div>
      </div>
    </article>
  );
}
