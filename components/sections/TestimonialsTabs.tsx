"use client";

import { useState } from "react";
import { reviewCategories } from "@/data/reviews";

export default function TestimonialsTabs() {
  const [activeId, setActiveId] = useState(reviewCategories[0]?.id ?? "parents");
  const activeCategory = reviewCategories.find((category) => category.id === activeId) ?? reviewCategories[0];

  return (
    <section id="community" className="section-shell">
      <div className="rounded-[2.8rem] bg-[linear-gradient(180deg,#fbf4e8_0%,#f3e7d9_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(97,68,39,0.08)] ring-1 ring-[#e4d2bc] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl text-[#2c2218] sm:text-5xl">
              What our community says about the Explorers experience.
            </h2>
          </div>
          <a
            href="https://www.google.com/search?q=explorers+group+reviews"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[#c46d2c] transition hover:text-[#8e5324]"
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
                  ? "bg-[#c46d2c] text-white"
                  : "bg-white text-[#4d3726] ring-1 ring-[#e0d1bc] hover:bg-[#fbf1e4]"
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
              className="rounded-[2rem] bg-white p-6 shadow-[0_20px_45px_rgba(97,68,39,0.08)] ring-1 ring-[#e4d2bc]"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#c46d2c]">{item.source}</p>
                <span className="rounded-full bg-[#f6ebdf] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#4d3726]">
                  {item.format}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-[#4d3726]">{item.text}</p>
              <p className="mt-5 text-sm font-semibold text-[#2c2218]">{item.author}</p>
              <p className="text-sm text-[#6e5a43]">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
