"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HighlightItem {
  title: string;
  image: string;
  href: string;
}

interface UpcomingHighlightsCarouselProps {
  items: HighlightItem[];
}

function modulo(value: number, length: number) {
  return ((value % length) + length) % length;
}

export default function UpcomingHighlightsCarousel({
  items
}: UpcomingHighlightsCarouselProps) {
  const dragStartXRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [viewport, setViewport] = useState(1200);

  useEffect(() => {
    const updateViewport = () => setViewport(window.innerWidth);

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (items.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((previous) => modulo(previous + 1, items.length));
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [items.length]);

  const visibleItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    return [-2, -1, 0, 1, 2].map((offset) => {
      const index = modulo(activeIndex + offset, items.length);
      return {
        index,
        offset,
        item: items[index]
      };
    });
  }, [activeIndex, items]);

  if (items.length === 0) {
    return null;
  }

  const compact = viewport < 640;
  const medium = viewport >= 640 && viewport < 1100;
  const cardWidth = compact ? 205 : medium ? 235 : 270;
  const imageHeight = compact ? 245 : medium ? 275 : 315;
  const cardHeight = imageHeight + (compact ? 94 : 108);

  const getCardStyle = (offset: number) => {
    const desktopX = offset === -2 ? -450 : offset === -1 ? -245 : offset === 1 ? 245 : offset === 2 ? 450 : 0;
    const tabletX = offset === -2 ? -330 : offset === -1 ? -180 : offset === 1 ? 180 : offset === 2 ? 330 : 0;
    const mobileX = offset === -2 ? -185 : offset === -1 ? -96 : offset === 1 ? 96 : offset === 2 ? 185 : 0;
    const translateX = compact ? mobileX : medium ? tabletX : desktopX;
    const rotate = offset === -2 ? -6 : offset === -1 ? -3 : offset === 1 ? 3 : offset === 2 ? 6 : 0;
    const scale = offset === 0 ? 1.08 : offset === -1 || offset === 1 ? 0.96 : 0.9;
    const opacity = offset === 0 ? 1 : offset === -1 || offset === 1 ? 0.9 : 0.72;
    const zIndex = offset === 0 ? 30 : offset === -1 || offset === 1 ? 20 : 10;

    return {
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      transform: `translate(-50%, 0) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
      opacity,
      zIndex
    };
  };

  const shiftCards = (direction: "left" | "right") => {
    setActiveIndex((previous) =>
      direction === "left" ? modulo(previous + 1, items.length) : modulo(previous - 1, items.length)
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

    if (deltaX <= -60) {
      shiftCards("left");
      dragStartXRef.current = event.clientX;
    }

    if (deltaX >= 60) {
      shiftCards("right");
      dragStartXRef.current = event.clientX;
    }
  };

  const handleMouseUp = () => {
    dragStartXRef.current = null;
    setIsDragging(false);
  };

  return (
    <div className="relative overflow-hidden rounded-[2.4rem] bg-[radial-gradient(circle_at_top_center,rgba(196,225,239,0.34),transparent_42%),linear-gradient(180deg,#fbfdff_0%,#f2f8fb_100%)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_center,rgba(137,185,213,0.2),transparent_68%)]" />

      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative mx-auto h-[25rem] max-w-[78rem] select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } sm:h-[31rem] lg:h-[34rem]`}
      >
        {visibleItems.map(({ index, offset, item }) => {
          const isActive = offset === 0;

          return (
            <Link
              key={`${item.title}-${index}`}
              href={item.href}
              style={getCardStyle(offset)}
              className="upcoming-tilt-card absolute left-1/2 top-3 block"
            >
              <div className="relative overflow-hidden rounded-[1.25rem] shadow-[0_18px_34px_rgba(44,81,103,0.14)]">
                <div className="relative" style={{ height: `${imageHeight}px` }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 220px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,15,19,0.02)_35%,rgba(9,15,19,0.14)_58%,rgba(9,15,19,0.72)_100%)]" />

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="rounded-[1rem] bg-black/12 px-3 py-3 backdrop-blur-[2px]">
                      <h3
                        className={`font-body font-semibold leading-tight text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)] ${
                          isActive ? "text-[1.45rem]" : "text-[1.2rem]"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] text-white/80">Read More</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full border transition ${
              index === activeIndex
                ? "border-[#11639b] bg-[#11639b]"
                : "border-[#b5bec5] bg-transparent"
            }`}
            aria-label={`Go to highlight ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
