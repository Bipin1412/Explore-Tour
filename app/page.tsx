import Image from "next/image";
import Link from "next/link";
import AtlasSection from "@/components/sections/AtlasSection";
import FeaturedProgramsGrid from "@/components/sections/FeaturedProgramsGrid";
import HeroPanorama from "@/components/sections/HeroPanorama";
import QuickLinksSection from "@/components/sections/QuickLinksSection";
import SocialEmbeds from "@/components/sections/SocialEmbeds";
import StatsBar from "@/components/sections/StatsBar";
import TestimonialsTabs from "@/components/sections/TestimonialsTabs";
import WhyExplorers from "@/components/sections/WhyExplorers";
import { footerQuickLinks, primaryAccessLinks } from "@/data/navigation";
import { getBatchWindow } from "@/lib/program-content";
import { featuredTrips, trips } from "@/lib/data/trips";

const heroSlides = featuredTrips.slice(0, 4).map((trip) => ({
  image: trip.heroImage,
  caption: `${trip.name} | ${trip.destination}`
}));

const fallbackHeroSlide = trips[0]
  ? {
      image: trips[0].heroImage,
      caption: `${trips[0].name} | ${trips[0].destination}`
    }
  : null;

const allHeroSlides =
  heroSlides.length === 4 && fallbackHeroSlide ? [...heroSlides, fallbackHeroSlide] : heroSlides;

const featuredPrograms = [
  {
    title: "Weekend Treks",
    subtitle: "Summer / Monsoon / Winter",
    image: trips[1]?.heroImage ?? trips[0].heroImage,
    caption: "Weekend ridge trails",
    href: "/trips?category=Weekend%20Treks"
  },
  {
    title: "Camping",
    subtitle: "Lake, beach, and forest nights",
    image: trips[7]?.heroImage ?? trips[0].heroImage,
    caption: "Campfire by the water",
    href: "/camping"
  },
  {
    title: "Jungle Safari",
    subtitle: "Wildlife circuits and naturalists",
    image: trips[8]?.heroImage ?? trips[0].heroImage,
    caption: "Wildlife dawn drives",
    href: "/jungle-safari"
  },
  {
    title: "Himalayan Explorers",
    subtitle: "Flagship mountain departures",
    image: trips[3]?.heroImage ?? trips[0].heroImage,
    caption: "High-altitude mornings",
    href: "/himalayan-treks"
  },
  {
    title: "Junior Explorers",
    subtitle: "8 to 14 years",
    image: trips[0]?.heroImage,
    caption: "Young explorers in the wild",
    href: "/programs/junior-explorers"
  },
  {
    title: "Lady Explorers",
    subtitle: "Women special departures",
    image: trips[2]?.heroImage ?? trips[0].heroImage,
    caption: "Women-led outdoor energy",
    href: "/programs/lady-explorers"
  },
  {
    title: "Explorers on Wheels",
    subtitle: "Road and trail combinations",
    image: trips[6]?.heroImage ?? trips[0].heroImage,
    caption: "Road journeys with scenery",
    href: "/programs/explorers-on-wheels"
  },
  {
    title: "Silver Trails",
    subtitle: "40 plus special",
    image: trips[4]?.heroImage ?? trips[0].heroImage,
    caption: "Calm, scenic pacing",
    href: "/programs/silver-trails"
  },
  {
    title: "Explorers Fitness Academy",
    subtitle: "Conditioning and endurance",
    image: trips[5]?.heroImage ?? trips[0].heroImage,
    caption: "Morning fitness culture",
    href: "/programs/explorers-fitness-club"
  },
  {
    title: "Explorers Mountain Rush",
    subtitle: "Performance-focused adventures",
    image: trips[3]?.heroImage ?? trips[0].heroImage,
    caption: "Fast mountain objectives",
    href: "/programs/explorers-mountain-rush"
  },
  {
    title: "India and International Tours",
    subtitle: "Domestic and global journeys",
    image: trips[9]?.heroImage ?? trips[0].heroImage,
    caption: "Beyond the usual circuit",
    href: "/upcoming-tours"
  },
  {
    title: "Corporate Tours",
    subtitle: "Adventure for teams",
    image: trips[10]?.heroImage ?? trips[0].heroImage,
    caption: "Teams out of the boardroom",
    href: "/corporate-outings"
  }
];

export default function HomePage() {
  return (
    <main className="pb-16">
      <HeroPanorama slides={allHeroSlides} />
      <WhyExplorers />
      <StatsBar />

      <section className="section-shell pt-0">
        <div className="grid gap-4 lg:grid-cols-3">
          {primaryAccessLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[1.8rem] border border-[#d9cfbf] bg-[#f7efe4] p-5 shadow-[0_24px_70px_rgba(31,38,26,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(31,38,26,0.12)]"
            >
              <p className="section-tag">Easy Access</p>
              <h2 className="mt-4 font-display text-3xl text-[#112315]">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#565c51]">{item.description}</p>
              <p className="mt-4 text-sm font-semibold text-[#8a5c35]">Open now</p>
            </Link>
          ))}
        </div>
      </section>

      <AtlasSection />
      <FeaturedProgramsGrid programs={featuredPrograms} />

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Upcoming Treks</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Browse the trek board directly from the home page.
            </h2>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center rounded-full bg-[#d37a31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940]"
          >
            View All Trek Listings
          </Link>
        </div>

        <div className="hidden overflow-hidden rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] shadow-[0_24px_70px_rgba(30,36,27,0.08)] lg:block">
          <table className="w-full border-collapse">
            <thead className="bg-[#182a1a] text-left text-xs uppercase tracking-[0.18em] text-[#efe5d8]">
              <tr>
                <th className="px-5 py-4">Date / Batch Window</th>
                <th className="px-5 py-4">Trek Name</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Difficulty</th>
                <th className="px-5 py-4">Cost</th>
              </tr>
            </thead>
            <tbody>
              {trips.slice(0, 5).map((trip) => (
                <tr key={trip.slug} className="border-t border-[#e1d7c8] text-sm text-[#334234]">
                  <td className="px-5 py-4">{getBatchWindow(trip)}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/tours/${trip.slug}`}
                      className="font-semibold text-[#8a5c35] transition hover:text-[#d37a31]"
                    >
                      {trip.name}
                    </Link>
                  </td>
                  <td className="px-5 py-4">{trip.durationDays} Days</td>
                  <td className="px-5 py-4">{trip.difficulty}</td>
                  <td className="px-5 py-4">INR {trip.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 lg:hidden">
          {trips.slice(0, 4).map((trip) => (
            <Link
              key={trip.slug}
              href={`/tours/${trip.slug}`}
              className="rounded-[1.8rem] border border-[#d9cfbf] bg-[#f8f1e6] p-5 shadow-[0_20px_60px_rgba(30,36,27,0.08)]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">{getBatchWindow(trip)}</p>
              <h3 className="mt-3 font-display text-3xl text-[#162214]">{trip.name}</h3>
              <p className="mt-2 text-sm text-[#53594f]">
                {trip.durationDays} Days | {trip.difficulty} | INR {trip.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Upcoming Highlights</p>
            <h2 className="mt-4 font-display text-4xl text-[#112315] sm:text-5xl">
              Signature departures currently shaping the season.
            </h2>
          </div>
          <Link
            href="/trips"
            className="text-sm font-semibold text-[#8a5c35] transition hover:text-[#d37a31]"
          >
            Explore all detailed trek pages
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredTrips.map((trip) => (
            <Link
              key={trip.slug}
              href={`/tours/${trip.slug}`}
              className="group overflow-hidden rounded-[2rem] border border-[#d7cebf] bg-[#f7efe4] shadow-[0_24px_70px_rgba(31,38,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(31,38,26,0.14)]"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={trip.heroImage}
                  alt={trip.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="mb-3 w-fit rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#f2dcc2]">
                    {trip.destination}
                  </p>
                  <h3 className="font-display text-3xl text-white">{trip.name}</h3>
                </div>
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm leading-7 text-[#53584d]">{trip.summary}</p>
                <div className="flex items-center justify-between text-sm font-semibold text-[#223224]">
                  <span>{trip.durationDays} Days</span>
                  <span>{trip.difficulty}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TestimonialsTabs />
      <SocialEmbeds />
      <QuickLinksSection links={footerQuickLinks} />
    </main>
  );
}
