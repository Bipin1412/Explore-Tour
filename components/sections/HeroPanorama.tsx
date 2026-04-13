"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlide {
  image: string;
  caption: string;
}

interface HeroPanoramaProps {
  slides: HeroSlide[];
}

const cardStyles = [
  "pointer-events-none left-[2%] top-[24%] z-10 hidden h-[13rem] w-[22%] scale-[0.82] opacity-35 blur-[1px] lg:block",
  "pointer-events-none left-[12%] top-[13%] z-20 hidden h-[20rem] w-[30%] scale-[0.92] opacity-70 lg:block",
  "left-1/2 top-0 z-30 h-[25rem] w-[62%] -translate-x-1/2 shadow-[0_35px_100px_rgba(20,66,92,0.22)] sm:h-[31rem] lg:h-[36rem] lg:w-[38%]",
  "pointer-events-none right-[12%] top-[14%] z-20 hidden h-[20rem] w-[30%] scale-[0.92] opacity-70 lg:block",
  "pointer-events-none right-[2%] top-[25%] z-10 hidden h-[13rem] w-[22%] scale-[0.82] opacity-35 blur-[1px] lg:block"
] as const;

function modulo(value: number, length: number) {
  return ((value % length) + length) % length;
}

export default function HeroPanorama({ slides }: HeroPanoramaProps) {
  const safeSlides = slides.length > 0 ? slides : [{ image: "", caption: "Explorers Group" }];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (safeSlides.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((previous) => modulo(previous + 1, safeSlides.length));
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, [safeSlides.length]);

  const visibleSlides = [-2, -1, 0, 1, 2].map((offset) => {
    const slideIndex = modulo(activeSlide + offset, safeSlides.length);
    return {
      offset,
      slide: safeSlides[slideIndex],
      index: slideIndex
    };
  });

  return (
    <section className="relative overflow-hidden pb-12 pt-8">
      <div className="absolute left-[-9rem] top-[-7rem] h-[24rem] w-[24rem] rounded-full bg-[#cde6f2] blur-3xl" />
      <div className="absolute right-[-6rem] top-[6rem] h-[20rem] w-[20rem] rounded-full bg-[#dff2fa] blur-3xl" />

      <div className="section-shell pt-0">
        <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <div className="relative z-10">
            <p className="section-tag">Adventure Travel Agency</p>
            <h1 className="mt-6 max-w-[12ch] font-display text-5xl leading-[0.98] text-[#0b1215] sm:text-6xl lg:text-7xl">
              Explorers Group for journeys that feel alive.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#4f6670] sm:text-lg">
              Premium outdoor experiences crafted like an editorial story: panoramic departures,
              rich community energy, and precise on-ground execution across treks, tours, camps,
              and training programs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/trips?category=Weekend%20Treks" className="hero-cta-primary">
                View Upcoming Treks
              </Link>
              <Link
                href="/trips"
                className="inline-flex items-center justify-center rounded-full border border-[#bfd8e4] bg-white px-6 py-3 text-sm font-semibold text-[#334952] shadow-[0_14px_34px_rgba(38,83,107,0.08)] transition hover:-translate-y-0.5"
              >
                Browse All Events
              </Link>
            </div>

            <div className="mt-10 rounded-[2rem] bg-white/90 p-4 shadow-[0_24px_60px_rgba(61,102,121,0.12)] ring-1 ring-[#d6e7ef] backdrop-blur-sm sm:p-5">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.4rem] bg-[#f7fbfd] px-4 py-4 text-sm leading-7 text-[#4f6670]">
                  Trusted by families, trekkers, schools, and corporates since 2001.
                </div>
                <div className="rounded-[1.4rem] bg-[#f7fbfd] px-4 py-4 text-sm leading-7 text-[#4f6670]">
                  Signature treks, tours, camps, and training programs in one brand.
                </div>
                <div className="rounded-[1.4rem] bg-[#f7fbfd] px-4 py-4 text-sm leading-7 text-[#4f6670]">
                  Field execution focused on safety, energy, and memorable experiences.
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[28rem] sm:min-h-[34rem] lg:min-h-[39rem]">
            {visibleSlides.map(({ slide, index }, styleIndex) => (
              <button
                key={`${slide.image}-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`absolute overflow-hidden rounded-[2.2rem] bg-white p-3 transition-all duration-700 ${cardStyles[styleIndex]}`}
                aria-label={`View hero slide ${index + 1}`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.8rem]">
                  {slide.image ? (
                    <Image
                      src={slide.image}
                      alt={slide.caption}
                      fill
                      priority={styleIndex === 2}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,21,0.06),rgba(11,18,21,0.18)_44%,rgba(11,18,21,0.58)_100%)]" />
                  {styleIndex === 2 ? (
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <p className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white backdrop-blur-sm">
                        Current Escape
                      </p>
                      <p className="mt-4 max-w-sm text-xl font-semibold leading-8 text-white">
                        {slide.caption}
                      </p>
                      <div className="mt-5 flex items-center gap-3">
                        <Link
                          href="/trips"
                          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f3550]"
                        >
                          View All
                        </Link>
                        <span className="text-sm text-[#d8ecf6]">
                          {String(index + 1).padStart(2, "0")} / {String(safeSlides.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </button>
            ))}

            <div className="absolute bottom-0 left-0 z-40 flex items-center gap-3 sm:left-[6%]">
              <button
                type="button"
                onClick={() => setActiveSlide((previous) => modulo(previous - 1, safeSlides.length))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#334952] shadow-[0_16px_40px_rgba(61,102,121,0.12)] ring-1 ring-[#d7e7ef] transition hover:-translate-y-0.5"
                aria-label="Previous slide"
              >
                {"<"}
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((previous) => modulo(previous + 1, safeSlides.length))}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0f3550] text-white shadow-[0_16px_40px_rgba(17,99,155,0.22)] transition hover:-translate-y-0.5"
                aria-label="Next slide"
              >
                {">"}
              </button>
            </div>

            <div className="absolute bottom-0 right-0 z-40 rounded-[1.9rem] bg-[#0f3550] px-5 py-4 text-white shadow-[0_26px_60px_rgba(17,99,155,0.32)] sm:right-[4%]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#b7dcf0]">Community Trust</p>
              <p className="mt-2 text-2xl font-semibold">4.6 Star</p>
              <p className="mt-1 max-w-[13rem] text-sm leading-6 text-[#d7ebf5]">
                Google, TripAdvisor, and Facebook reviews.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {safeSlides.map((slide, index) => (
            <button
              key={slide.caption}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeSlide ? "w-12 bg-[#11639b]" : "w-6 bg-[#c2dce8]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
