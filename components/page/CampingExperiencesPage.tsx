import Image from "next/image";
import Link from "next/link";
import UniversalEnquiryForm from "@/components/forms/UniversalEnquiryForm";
import {
  campingExperiencesContent,
  CampingItineraryStep,
  CampingLocationCard
} from "@/data/camping-experiences-content";

export default function CampingExperiencesPage() {
  const content = campingExperiencesContent;

  return (
    <main className="pb-16">
      <section className="relative isolate min-h-[76vh] overflow-hidden">
        <Image
          src={content.heroImage}
          alt="Camping experiences with Explorers Group"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.28),rgba(9,19,12,0.68)_55%,rgba(9,17,11,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.24),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[76vh] w-full max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="max-w-5xl">
            <p className="section-tag text-[#efcfac]">{content.eyebrow}</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#fff7ee] sm:text-6xl lg:text-7xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#d8ddcf] sm:text-base">{content.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#camping-locations" className="hero-cta-primary">
                Browse Camping Locations
              </Link>
              <Link href="#camping-enquiry" className="hero-cta-secondary">
                Send Camping Enquiry
              </Link>
            </div>
            <div className="mt-6 inline-flex rounded-full bg-black/25 px-4 py-2 text-sm text-[#f4eadc] backdrop-blur">
              Micro Caption: {content.caption}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.stats.map((stat) => (
            <div
              key={`${stat.label}-${stat.value}`}
              className="rounded-[1.7rem] border border-[#d8cfbf] bg-[#f7efe4] p-5 shadow-[0_20px_60px_rgba(29,34,26,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[#8a5c35]">{stat.label}</p>
              <p className="mt-3 font-display text-4xl text-[#162214]">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
          <article className="editorial-panel">
            <p className="section-tag">Camping Experiences with Explorers Group</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Affordable, nature-based camping for people who want simplicity, not resort luxury.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">{content.intro}</p>
            <p className="mt-5 max-w-3xl text-sm leading-8 text-[#4e574e] sm:text-base">
              Explorers builds power-packed weekend camping experiences near Pune and Mumbai for true nature lovers. The format is simple: sturdy tents, open skies, local food, campfire warmth, and landscapes that reconnect people with the outdoors.
            </p>
          </article>

          <article className="rounded-[2rem] border border-[#d8c3b6] bg-[#f7ece5] p-7 shadow-[0_24px_70px_rgba(19,24,17,0.08)]">
            <p className="section-tag text-[#8a5c35]">Core Experience</p>
            <div className="mt-5 grid gap-3">
              {content.corePoints.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.3rem] border border-[#e2d4c3] bg-white/75 px-4 py-3"
                >
                  <p className="text-sm leading-7 text-[#445043]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.94fr_1.06fr]">
          <article className="rounded-[2.2rem] border border-[#213127] bg-[#213127] p-7 text-[#f6efe4] shadow-[0_24px_70px_rgba(19,24,17,0.18)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#e7d2ad]">Why Camp With Explorers</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Comfort meets adventure, but the wilderness still leads the experience.
            </h2>
            <div className="mt-6 grid gap-3">
              {content.differentiators.map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/10 bg-white/[0.06] p-4">
                  <p className="text-sm leading-7 text-[#d7dfd3]">{item}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e7] p-7 shadow-[0_24px_70px_rgba(19,24,17,0.08)]">
            <p className="section-tag">Location-Based Activities</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              Add movement, water, music, or just stillness depending on the campsite.
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.activities.map((item) => (
                <div
                  key={item}
                  className="rounded-[1.6rem] border border-[#e2d6c7] bg-white/70 p-5 shadow-[0_10px_30px_rgba(19,24,17,0.04)]"
                >
                  <p className="text-sm leading-7 text-[#4f584d]">{item}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="camping-locations" className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Camping Locations</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Weekend and weekday camping options across lakes, beaches, forts, hills, and forests.
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-8 text-[#566055] sm:text-base">
            Every location below can work as a direct enquiry lead now, and the destination pages already open in the same detailed editorial style as the trek routes.
          </p>
        </div>

        <div className="hidden overflow-hidden rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] shadow-[0_24px_70px_rgba(30,36,27,0.08)] xl:block">
          <table className="w-full border-collapse">
            <thead className="bg-[#182a1a] text-left text-xs uppercase tracking-[0.18em] text-[#efe5d8]">
              <tr>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Distance</th>
                <th className="px-5 py-4">Camping Type</th>
                <th className="px-5 py-4">Tentative Range</th>
              </tr>
            </thead>
            <tbody>
              {content.locations.map((location) => (
                <tr key={location.slug} className="border-t border-[#e1d7c8] align-top text-sm text-[#334234]">
                  <td className="px-5 py-4">
                    <Link
                      href={`/camping/${location.slug}`}
                      className="font-semibold text-[#8a5c35] transition hover:text-[#d37a31]"
                    >
                      {location.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4">{location.distance}</td>
                  <td className="px-5 py-4">
                    <div className="max-w-md space-y-1.5">
                      {location.campingTypes.map((item) => (
                        <p key={item}>{item}</p>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">{location.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 xl:hidden">
          {content.locations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Featured Campsites</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Click a location to open the detailed page in the same route-family style as the trek pages.
            </h2>
          </div>
          <Link
            href="#camping-enquiry"
            className="text-sm font-semibold text-[#8a5c35] transition hover:text-[#d37a31]"
          >
            Need a custom camping plan?
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.locations.map((location) => (
            <LocationCard key={`grid-${location.slug}`} location={location} detailed />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <article className="overflow-hidden rounded-[2.2rem] border border-[#d8cfbf] bg-[#f8f1e7] shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
            <div className="border-b border-[#e2d8c8] px-6 py-6 sm:px-8">
              <p className="section-tag">Camping General Itinerary</p>
              <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
                A shared rhythm from welcome drink to checkout.
              </h2>
            </div>
            <div className="grid gap-4 p-5 sm:p-6">
              {content.itinerary.map((step) => (
                <ItineraryCard key={`${step.time}-${step.title}`} step={step} />
              ))}
            </div>
          </article>

          <article className="rounded-[2.2rem] border border-[#d7c8b2] bg-[#f3e6d5] p-8 shadow-[0_24px_70px_rgba(29,34,26,0.08)]">
            <p className="section-tag text-[#8a5c35]">Experience Note</p>
            <h2 className="mt-4 font-display text-4xl text-[#162214] sm:text-5xl">
              If the wild excites you, this experience is made for you.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#4f584d] sm:text-base">
              This is not a luxury resort stay. It is a real camping product for people who want open skies, sturdy tents, local food, bonfire moments, scenic mornings, and the feeling of sleeping close to nature.
            </p>
            <p className="mt-5 text-sm leading-8 text-[#4f584d] sm:text-base">
              Camping can be fully customized as per requirement, and weekday departures can be organized to avoid crowds and weekend rush. Transport, trekking add-ons, and adventure activities can also be layered in depending on the location.
            </p>
            <div className="mt-6 rounded-[1.6rem] border border-[#dbc9b3] bg-[#fbf4ea] p-5 text-sm leading-7 text-[#5a5448]">
              {content.timingNote}
            </div>
          </article>
        </div>
      </section>

      <section id="camping-enquiry" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2.2rem] border border-[#d8cfbf] bg-[#162917] p-8 text-[#f2eadf] shadow-[0_28px_80px_rgba(18,29,20,0.2)]">
            <p className="section-tag text-[#efcfac]">Camping Enquiry</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              Ask for campsite options, weekday slots, tents, villas, or a custom group format.
            </h2>
            <p className="mt-5 text-sm leading-8 text-[#d4ddd0] sm:text-base">
              Use this form if you want to plan a group camping trip, compare stay styles, add activities, or arrange hotel and homestay options based on requirement and availability.
            </p>
            <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-5 text-sm leading-7 text-[#d4ddd0]">
              Mention your preferred location, group size, and whether you want a raw camping vibe or a more comfort-led overnight format.
            </div>
          </article>

          <UniversalEnquiryForm
            variant="camping"
            title="Camping enquiry form"
            description="Share your group size, travel month, and preferred stay style so the team can guide you to the right campsite or custom camping plan."
            contextTitle="Camping Experiences"
            contextLabel="Selected Experience"
          />
        </div>
      </section>
    </main>
  );
}

function LocationCard({
  location,
  detailed
}: {
  location: CampingLocationCard;
  detailed?: boolean;
}) {
  return (
    <Link
      href={`/camping/${location.slug}`}
      className="rounded-[1.9rem] border border-[#d6cdbe] bg-[#f8f1e7] p-5 shadow-[0_18px_50px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(31,38,26,0.14)]"
    >
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{location.distance}</p>
      <h3 className="mt-3 font-display text-3xl text-[#162214]">{location.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#555c51]">{location.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {location.campingTypes.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[#dccfbf] bg-white/70 px-3 py-1 text-xs font-semibold text-[#6b5032]"
          >
            {item}
          </span>
        ))}
      </div>
      {location.note ? <p className="mt-4 text-sm leading-7 text-[#7a5d3b]">{location.note}</p> : null}
      <p className="mt-4 text-sm font-semibold text-[#162214]">{location.price}</p>
      {detailed ? <p className="mt-4 text-sm font-semibold text-[#8a5c35]">Open location page</p> : null}
    </Link>
  );
}

function ItineraryCard({ step }: { step: CampingItineraryStep }) {
  return (
    <article className="rounded-[1.8rem] border border-[#dfd4c4] bg-white/80 p-5 shadow-[0_10px_30px_rgba(19,24,17,0.04)]">
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8a5c35]">{step.time}</p>
      <h3 className="mt-2 font-display text-3xl leading-tight text-[#162214]">{step.title}</h3>
      <p className="mt-4 text-sm leading-7 text-[#4f584d]">{step.description}</p>
    </article>
  );
}
