import Image from "next/image";
import Link from "next/link";
import TripLoginModal from "@/components/auth/TripLoginModal";
import DynamicQRPayment from "@/components/booking/DynamicQRPayment";
import ItineraryAccordion from "@/components/trips/ItineraryAccordion";
import TripFaqAccordion from "@/components/trips/TripFaqAccordion";
import {
  getAboutDestination,
  getBatchWindow,
  getCancellationPolicy,
  getMapEmbedUrl,
  getPhotoCaption,
  getRulesAndRegulations,
  getSuggestedEventDate,
  getWhatToBring
} from "@/lib/program-content";
import { Trip } from "@/types/trip";

interface TripDetailsTemplateProps {
  trip: Trip;
  relatedTrips: Trip[];
}

export default function TripDetailsTemplate({ trip, relatedTrips }: TripDetailsTemplateProps) {
  const inclusions =
    trip.inclusions ?? [
      "Trip lead and on-ground coordination",
      "Stay and meals as per itinerary",
      "Local permits and access support"
    ];
  const exclusions =
    trip.exclusions ?? [
      "Personal expenses and optional activities",
      "Transport outside itinerary scope",
      "Anything not listed in inclusions"
    ];
  const faqs =
    trip.faqs ?? [
      {
        question: "How do I reserve this trip?",
        answer:
          "Use the booking form on this page, then continue to the payment screen with QR, GPay, and bank details."
      },
      {
        question: "Do you provide support on trek days?",
        answer: "Yes. Every trip includes a lead coordinator and guided support team."
      }
    ];

  const aboutDestination = getAboutDestination(trip);
  const whatToBring = getWhatToBring(trip);
  const cancellationPolicy = getCancellationPolicy(trip);
  const rulesAndRegulations = getRulesAndRegulations(trip);
  const mapEmbedUrl = getMapEmbedUrl(trip);
  const suggestedEventDate = getSuggestedEventDate(trip);
  const batchWindow = getBatchWindow(trip);

  return (
    <div className="pb-16">
      <TripLoginModal tripName={trip.name} />

      <section className="relative isolate min-h-[82vh] overflow-hidden">
        <Image src={trip.heroImage} alt={trip.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,19,12,0.28),rgba(9,19,12,0.68)_55%,rgba(9,17,11,0.92))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.22),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[82vh] w-full max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-4xl">
              <p className="section-tag text-[#efcfac]">{trip.region} Program</p>
              <h1 className="mt-4 font-display text-5xl leading-[0.95] text-[#fff7ee] sm:text-6xl lg:text-7xl">
                {trip.name}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-[#d8ddcf] sm:text-base">
                {trip.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#f1eadf]">
                <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">{trip.destination}</span>
                <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">{trip.durationDays} Days</span>
                <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">{trip.difficulty}</span>
                <span className="rounded-full border border-white/18 bg-white/8 px-4 py-2">{batchWindow}</span>
              </div>
              <div className="mt-6 inline-flex rounded-full bg-black/25 px-4 py-2 text-sm text-[#f4eadc] backdrop-blur">
                Micro Caption: {getPhotoCaption(trip, 0)}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/12 bg-[rgba(10,27,17,0.72)] p-5 text-[#f3ecdf] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">Quick Facts</p>
              <div className="mt-4 grid gap-3">
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#c9cfc1]">Cost Per Head</p>
                  <p className="mt-2 font-display text-3xl text-white">INR {trip.price.toLocaleString()}</p>
                </div>
                <div className="rounded-[1.3rem] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#c9cfc1]">Suggested Event Date</p>
                  <p className="mt-2 text-sm text-[#f2ede5]">{suggestedEventDate}</p>
                </div>
                <Link
                  href="#booking-form"
                  className="inline-flex items-center justify-center rounded-full bg-[#d37a31] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#e38940]"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="space-y-8">
            <article className="editorial-panel">
              <p className="section-tag">About Destination</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Why this route stands out</h2>
              <p className="mt-5 text-sm leading-8 text-[#51594d] sm:text-base">{aboutDestination}</p>
            </article>

            <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <article className="editorial-panel">
                <p className="section-tag">Highlights</p>
                <h2 className="mt-4 font-display text-4xl text-[#112315]">Signature moments</h2>
                <ul className="mt-5 space-y-3">
                  {trip.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-[2rem] border border-[#d8cfbf] bg-[#f7efe4] p-6 shadow-[0_24px_70px_rgba(28,34,24,0.08)]">
                <p className="section-tag">Video</p>
                <h2 className="mt-4 font-display text-3xl text-[#112315]">Watch the destination</h2>
                <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-[#d9cfbf] bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full"
                    src={trip.heroVideo}
                  />
                </div>
              </article>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
              <article className="editorial-panel">
                <p className="section-tag">Google Maps</p>
                <h2 className="mt-4 font-display text-4xl text-[#112315]">Find the destination</h2>
                <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-[#d8cfbf]">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="320"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${trip.name} map`}
                  />
                </div>
              </article>

              <article className="editorial-panel">
                <p className="section-tag">Planning Notes</p>
                <h2 className="mt-4 font-display text-4xl text-[#112315]">Before you join</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-[#525a4e] sm:text-base">
                  <p>
                    <span className="font-semibold text-[#162214]">Batch Window:</span> {batchWindow}
                  </p>
                  <p>
                    <span className="font-semibold text-[#162214]">Best Months:</span>{" "}
                    {trip.bestMonths.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold text-[#162214]">Difficulty:</span> {trip.difficulty}
                  </p>
                  <p>
                    <span className="font-semibold text-[#162214]">Ideal For:</span> explorers looking for a structured {trip.category.toLowerCase()} experience with coordinated logistics and clear trail guidance.
                  </p>
                </div>
              </article>
            </div>

            <article className="editorial-panel">
              <p className="section-tag">Itinerary</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Day-by-day flow</h2>
              <div className="mt-5">
                <ItineraryAccordion days={trip.itinerary} />
              </div>
            </article>

            <div className="grid gap-8 xl:grid-cols-2">
              <article className="editorial-panel">
                <p className="section-tag">Includes</p>
                <h2 className="mt-4 font-display text-4xl text-[#112315]">What’s covered</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                  {inclusions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="editorial-panel">
                <p className="section-tag">Excludes</p>
                <h2 className="mt-4 font-display text-4xl text-[#112315]">Things to plan separately</h2>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                  {exclusions.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#7a8b73]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="grid gap-8 xl:grid-cols-3">
              <article className="editorial-panel">
                <p className="section-tag">What to Bring</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                  {whatToBring.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="editorial-panel">
                <p className="section-tag">Cancellation Policy</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                  {cancellationPolicy.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="editorial-panel">
                <p className="section-tag">Rules & Regulations</p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#525a4e] sm:text-base">
                  {rulesAndRegulations.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#d37a31]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>

            <article className="editorial-panel">
              <p className="section-tag">Gallery</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Micro-captioned trail moments</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {trip.gallery.map((image, index) => (
                  <div
                    key={image}
                    className={`group relative overflow-hidden rounded-[1.75rem] border border-[#d9cfbf] ${
                      index === 0 ? "h-80 sm:col-span-2" : "h-64"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${trip.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes={index === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <p className="absolute bottom-4 left-4 right-4 rounded-full bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.16em] text-[#f3e4d1] backdrop-blur">
                      {getPhotoCaption(trip, index)}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="editorial-panel">
              <p className="section-tag">FAQ</p>
              <h2 className="mt-4 font-display text-4xl text-[#112315]">Common questions</h2>
              <div className="mt-5">
                <TripFaqAccordion faqs={faqs} />
              </div>
            </article>

            <article className="editorial-panel">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="section-tag">Similar Upcoming Treks</p>
                  <h2 className="mt-4 font-display text-4xl text-[#112315]">You may also like</h2>
                </div>
                <Link href="/trips" className="text-sm font-semibold text-[#8a5c35] transition hover:text-[#d37a31]">
                  View all trek listings
                </Link>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {relatedTrips.map((relatedTrip) => (
                  <Link
                    key={relatedTrip.slug}
                    href={`/tours/${relatedTrip.slug}`}
                    className="group overflow-hidden rounded-[1.7rem] border border-[#d9cfbf] bg-[#f8f1e7] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(28,34,24,0.12)]"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={relatedTrip.heroImage}
                        alt={relatedTrip.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <p className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f2dcc2]">
                        {getBatchWindow(relatedTrip)}
                      </p>
                    </div>
                    <div className="space-y-2 p-4">
                      <h3 className="font-display text-2xl text-[#162214]">{relatedTrip.name}</h3>
                      <p className="text-sm text-[#545a50]">{relatedTrip.durationDays} Days | {relatedTrip.difficulty}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </article>
          </div>

          <aside id="booking-form" className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-[2rem] border border-[#d8cfbf] bg-[#f8f1e6] p-5 shadow-[0_24px_60px_rgba(29,34,26,0.08)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[#8a5c35]">Departure Snapshot</p>
              <div className="mt-4 grid gap-3 text-sm text-[#51594d]">
                <div className="rounded-[1.2rem] border border-[#e2d8c7] bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8a5c35]">Destination</p>
                  <p className="mt-2 font-semibold text-[#162214]">{trip.destination}</p>
                </div>
                <div className="rounded-[1.2rem] border border-[#e2d8c7] bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8a5c35]">Batch Window</p>
                  <p className="mt-2 font-semibold text-[#162214]">{batchWindow}</p>
                </div>
                <div className="rounded-[1.2rem] border border-[#e2d8c7] bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-[#8a5c35]">Cost Per Head</p>
                  <p className="mt-2 font-semibold text-[#162214]">INR {trip.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <DynamicQRPayment
              tripId={trip.id}
              tripName={trip.name}
              tripPrice={trip.price}
              suggestedEventDate={suggestedEventDate}
            />
          </aside>
        </div>
      </section>
    </div>
  );
}
