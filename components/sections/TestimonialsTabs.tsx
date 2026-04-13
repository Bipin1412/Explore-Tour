"use client";

import { useState } from "react";
import { reviewCategories } from "@/data/reviews";

export default function TestimonialsTabs() {
  const [activeId, setActiveId] = useState(reviewCategories[0]?.id ?? "parents");
  const activeCategory = reviewCategories.find((category) => category.id === activeId) ?? reviewCategories[0];

  return (
    <section id="community" className="section-shell">
      <div className="rounded-[2.8rem] bg-[linear-gradient(180deg,#eef8fb_0%,#e0f0f7_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(61,102,121,0.08)] ring-1 ring-[#d5e6ef] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl text-[#0b1215] sm:text-5xl">
              What our community says about the Explorers experience.
            </h2>
          </div>
          <a
            href="https://www.google.com/search?q=explorers+group+reviews"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[#11639b] transition hover:text-[#2e7eb6]"
          >
            View full Google Review page
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {reviewCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveId(category.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category.id === activeId
                  ? "bg-[#11639b] text-white"
                  : "bg-white text-[#334952] ring-1 ring-[#cfe2ec] hover:bg-[#f7fbfd]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {activeCategory.items.map((item) => (
            <article
              key={`${activeCategory.id}-${item.author}-${item.source}`}
              className="rounded-[2rem] bg-white p-6 shadow-[0_20px_45px_rgba(61,102,121,0.08)] ring-1 ring-[#d7e7ef]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#11639b]">{item.source}</p>
                <span className="rounded-full bg-[#edf7fb] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#334952]">
                  {item.format}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-[#334952]">{item.text}</p>
              <p className="mt-5 text-sm font-semibold text-[#0b1215]">{item.author}</p>
              <p className="text-sm text-[#4f6670]">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
