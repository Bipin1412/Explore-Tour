import Image from "next/image";
import Link from "next/link";
import AtlasSection from "@/components/sections/AtlasSection";
import FeaturedProgramsGrid from "@/components/sections/FeaturedProgramsGrid";
import HeroPanorama from "@/components/sections/HeroPanorama";
import QuickLinksSection from "@/components/sections/QuickLinksSection";
import SocialEmbeds from "@/components/sections/SocialEmbeds";
import StatsBar from "@/components/sections/StatsBar";
import TestimonialsTabs from "@/components/sections/TestimonialsTabs";
import UpcomingHighlightsCarousel from "@/components/sections/UpcomingHighlightsCarousel";
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

const upcomingHighlights = [
  ...featuredTrips,
  ...trips.filter((trip) => !featuredTrips.some((featuredTrip) => featuredTrip.slug === trip.slug))
].slice(0, 5);

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
    title: "Explorers Mountain Run",
    subtitle: "Quarterly outdoor trail event",
    image: trips[3]?.heroImage ?? trips[0].heroImage,
    caption: "Run the trails, discover your strength",
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
    <main className="pb-20">
      <HeroPanorama slides={allHeroSlides} />
      <WhyExplorers />
      <StatsBar />

      <section className="section-shell pt-8">
        <div className="overflow-hidden rounded-[2.8rem] bg-white shadow-[0_26px_70px_rgba(61,102,121,0.08)] ring-1 ring-[#d7e7ef]">
          <div className="grid gap-0 lg:grid-cols-3">
            {primaryAccessLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-6 transition hover:bg-[#f8fcfd] lg:p-8 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-[#dbeaf1]"
              >
                <p className="section-tag">Easy Access</p>
                <h2 className="mt-4 font-display text-3xl text-[#0b1215]">{item.title}</h2>
                <p className="mt-3 max-w-sm text-sm leading-7 text-[#4f6670]">{item.description}</p>
                <p className="mt-5 text-sm font-semibold text-[#11639b] transition group-hover:text-[#2f7eb5]">
                  Open now
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AtlasSection />
      <FeaturedProgramsGrid programs={featuredPrograms} />

      <section className="section-shell">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Upcoming Treks</p>
            <h2 className="mt-4 font-display text-4xl text-[#0b1215] sm:text-5xl">
              Browse the trek board directly from the home page.
            </h2>
          </div>
          <Link
            href="/trips"
            className="inline-flex items-center rounded-full bg-[#11639b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2f7eb5]"
          >
            View All Trek Listings
          </Link>
        </div>

        <div className="hidden overflow-hidden rounded-[2.8rem] bg-white shadow-[0_24px_70px_rgba(61,102,121,0.08)] ring-1 ring-[#d7e7ef] lg:block">
          <table className="w-full border-collapse">
            <thead className="bg-[#0f3550] text-left text-xs uppercase tracking-[0.18em] text-[#eaf7fc]">
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
                <tr key={trip.slug} className="border-t border-[#e1eef3] text-sm text-[#334952]">
                  <td className="px-5 py-4">{getBatchWindow(trip)}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/tours/${trip.slug}`}
                      className="font-semibold text-[#11639b] transition hover:text-[#2f7eb5]"
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
              className="rounded-[2rem] bg-white p-5 shadow-[0_20px_60px_rgba(61,102,121,0.08)] ring-1 ring-[#d7e7ef]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[#11639b]">{getBatchWindow(trip)}</p>
              <h3 className="mt-3 font-display text-3xl text-[#0b1215]">{trip.name}</h3>
              <p className="mt-2 text-sm text-[#4f6670]">
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
            <h2 className="mt-4 font-display text-4xl text-[#0b1215] sm:text-5xl">
              Signature departures currently shaping the season.
            </h2>
          </div>
          <Link
            href="/trips"
            className="text-sm font-semibold text-[#11639b] transition hover:text-[#2f7eb5]"
          >
            Explore all detailed trek pages
          </Link>
        </div>

        <UpcomingHighlightsCarousel
          items={upcomingHighlights.map((trip) => ({
            title: trip.name,
            image: trip.heroImage,
            href: `/tours/${trip.slug}`
          }))}
        />
      </section>

      <TestimonialsTabs />
      <SocialEmbeds />
      <QuickLinksSection links={footerQuickLinks} />
    </main>
  );
}
