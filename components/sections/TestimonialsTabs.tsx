"use client";

import { useState } from "react";
import { reviewCategories } from "@/data/reviews";

export default function TestimonialsTabs() {
  const [activeId, setActiveId] = useState(reviewCategories[0]?.id ?? "parents");
  const activeCategory = reviewCategories.find((category) => category.id === activeId) ?? reviewCategories[0];

  return (
    <section id="community" className="section-shell">
      <div className="rounded-[2.4rem] border border-white/10 bg-[#12281a] px-6 py-10 text-[#f4ecdf] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="section-tag text-[#d7b58f]">Testimonials</p>
            <h2 className="mt-4 font-display text-4xl text-white sm:text-5xl">
              What our community says about the Explorers experience.
            </h2>
          </div>
          <a
            href="https://www.google.com/search?q=explorers+group+reviews"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-[#f3b06c] transition hover:text-[#ffd0a4]"
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
                  ? "bg-[#d37a31] text-white"
                  : "border border-white/10 bg-white/[0.03] text-[#d7ddd0] hover:bg-white/[0.06]"
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
              className="rounded-[1.8rem] border border-white/8 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[#d7b58f]">{item.source}</p>
                <span className="rounded-full bg-white/[0.08] px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[#f0e3d2]">
                  {item.format}
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-[#eef1e7]">{item.text}</p>
              <p className="mt-5 text-sm font-semibold text-white">{item.author}</p>
              <p className="text-sm text-[#b3baa9]">{item.location}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
