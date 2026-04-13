"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

interface FeaturedProgram {
  title: string;
  subtitle: string;
  image: string;
  caption: string;
  href?: string;
}

interface FeaturedProgramsGridProps {
  programs: FeaturedProgram[];
}

function modulo(value: number, length: number) {
  return ((value % length) + length) % length;
}

export default function FeaturedProgramsGrid({ programs }: FeaturedProgramsGridProps) {
  const dragStartXRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCenterHovered, setIsCenterHovered] = useState(false);

  const visiblePrograms = useMemo(() => {
    if (programs.length === 0) {
      return [];
    }

    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = modulo(activeIndex + offset, programs.length);
      return {
        index,
        offset,
        program: programs[index]
      };
    });
  }, [activeIndex, programs]);

  if (programs.length === 0) {
    return null;
  }

  const shiftCards = (direction: "left" | "right") => {
    setActiveIndex((previous) =>
      direction === "left" ? modulo(previous + 1, programs.length) : modulo(previous - 1, programs.length)
    );
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    dragStartXRef.current = event.clientX;
    setIsDragging(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;

    if (deltaX <= -70) {
      shiftCards("left");
      dragStartXRef.current = event.clientX;
    }

    if (deltaX >= 70) {
      shiftCards("right");
      dragStartXRef.current = event.clientX;
    }
  };

  const handleMouseUp = () => {
    dragStartXRef.current = null;
    setIsDragging(false);
  };

  const getCardStyle = (offset: number) => {
    if (offset === 0) {
      return {
        transform: "translate(-50%, -50%) translateX(0px) rotate(0deg) scale(1.05)",
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30
      };
    }

    if (offset === -1) {
      return {
        transform: "translate(-50%, -50%) translateX(-250px) rotate(-8deg) scale(0.9)",
        opacity: 0.7,
        filter: "blur(2px)",
        zIndex: 20
      };
    }

    if (offset === 1) {
      return {
        transform: "translate(-50%, -50%) translateX(250px) rotate(8deg) scale(0.9)",
        opacity: 0.7,
        filter: "blur(2px)",
        zIndex: 20
      };
    }

    if (offset === -2) {
      return {
        transform: "translate(-50%, -50%) translateX(-430px) rotate(-14deg) scale(0.8)",
        opacity: 0.4,
        filter: "blur(4px)",
        zIndex: 10
      };
    }

    return {
      transform: "translate(-50%, -50%) translateX(430px) rotate(14deg) scale(0.8)",
      opacity: 0.4,
      filter: "blur(4px)",
      zIndex: 10
    };
  };

  return (
    <section id="featured-programs" className="section-shell">
      <div className="mb-10 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-[28rem]">
          <p className="section-tag">Featured Programs</p>
          <h2 className="mt-4 max-w-[10ch] font-display text-4xl leading-[0.92] text-[#0b1215] sm:text-5xl lg:text-[3.6rem]">
            Programs shaped for every explorer profile.
          </h2>
        </div>
        <p className="max-w-[34rem] pt-2 text-sm leading-8 text-[#617983] sm:text-base">
          Weekend escapes, camps, wildlife circuits, women-focused communities, mountain
          conditioning, and curated domestic or international journeys.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_top_center,rgba(201,224,237,0.28),transparent_52%)] px-2 py-6 sm:px-4 sm:py-8">
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative mx-auto h-[31rem] max-w-[78rem] select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          } sm:h-[33rem]`}
        >
          {visiblePrograms.map(({ index, offset, program }) => {
            const isCenter = offset === 0;

            return (
              <div
                key={`${program.title}-${index}`}
                style={getCardStyle(offset)}
                className="featured-fan-card absolute left-1/2 top-1/2 h-[420px] w-[300px] rounded-[28px]"
                onMouseEnter={() => {
                  if (isCenter) {
                    setIsCenterHovered(true);
                  }
                }}
                onMouseLeave={() => setIsCenterHovered(false)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#dce8ef] shadow-[0_24px_60px_rgba(33,58,72,0.18)]">
                  <img src={program.image} alt={program.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,18,0.04)_22%,rgba(6,14,18,0.18)_42%,rgba(6,14,18,0.88)_78%,rgba(6,14,18,0.96)_100%)]" />

                  {isCenter ? (
                    <>
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="rounded-[1.8rem] bg-black/18 p-5 backdrop-blur-[2px]">
                          <div className="flex flex-col gap-4">
                            <div className="max-w-[13rem]">
                              <p className="font-display text-[3rem] font-semibold leading-[0.92] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]">
                                {program.title}
                              </p>
                              <p className="mt-3 text-base text-white/90">{program.subtitle}</p>
                            </div>

                            <div className="flex justify-end">
                              <Link
                                href={program.href ?? "/#featured-programs"}
                                className="inline-flex shrink-0 items-center rounded-full bg-white/22 px-5 py-3 text-base font-medium text-white shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-md"
                              >
                                View All →
                              </Link>
                            </div>
                          </div>

                          <p className="mt-4 text-sm leading-6 text-white/72">{program.caption}</p>
                        </div>
                      </div>

                      {isCenterHovered ? (
                        <div className="featured-drag-pill absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2">
                          {"< DRAG >"}
                        </div>
                      ) : null}
                    </>
                  ) : null}

                  {!isCenter ? (
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="rounded-[1.3rem] bg-black/14 px-4 py-3 backdrop-blur-[2px]">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/78">
                          {program.subtitle}
                        </p>
                        <p className="mt-2 font-display text-[1.65rem] leading-[0.96] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]">
                          {program.title}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {programs.map((program, index) => (
            <button
              key={program.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-12 bg-[#11639b]" : "w-6 bg-[#c7dce7]"
              }`}
              aria-label={`Go to featured program ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
