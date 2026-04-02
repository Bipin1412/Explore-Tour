"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroSlide {
  image: string;
  caption: string;
}

interface HeroPanoramaProps {
  slides: HeroSlide[];
}

export default function HeroPanorama({ slides }: HeroPanoramaProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,11,0.38),rgba(9,18,12,0.74)_55%,rgba(9,17,11,0.94))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.26),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(83,118,82,0.32),transparent_34%)]" />

      <div className="relative mx-auto flex min-h-[92vh] w-full max-w-[1400px] flex-col justify-end px-4 pb-12 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="section-tag text-[#f0d5bc]">Panoramic Sahyadri Escapes</p>
          <h1 className="mt-4 max-w-4xl break-words font-display text-5xl leading-[0.95] text-[#fff8ef] sm:text-6xl lg:text-8xl">
            EXPLORERS
            <span className="mt-2 block text-[0.38em] uppercase tracking-[0.18em] text-[#dfb687] sm:tracking-[0.38em]">
              Since 2001 | The Name of Excellence
            </span>
          </h1>
          <p className="mt-5 text-base text-[#f4e9da] sm:text-lg">Adventure * Travel * Training</p>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-[#c9cec0] sm:text-base">
            Premium outdoor experiences crafted like an editorial story: panoramic departures, rich community energy, and precise on-ground execution across treks, tours, camps, and training programs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/trips?category=Weekend%20Treks" className="hero-cta-primary">
              View Upcoming Treks
            </Link>
            <Link href="/trips" className="hero-cta-secondary">
              Browse All Events
            </Link>
            <Link href="/trips?q=junior" className="hero-cta-secondary">
              Children Programs
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="rounded-[1.75rem] border border-white/10 bg-black/15 px-5 py-4 backdrop-blur">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#d8bb97]">Micro Caption</p>
            <p className="mt-2 text-sm text-[#f1ede6]">{slides[activeSlide]?.caption}</p>
          </div>

          <div className="flex gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition ${
                  index === activeSlide ? "w-14 bg-[#d37a31]" : "w-7 bg-white/35"
                }`}
                aria-label={`View hero slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
