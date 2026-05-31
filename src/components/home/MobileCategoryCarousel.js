"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CARD_W = 768;
const CARD_H = 1024;

const MOBILE_DEVICE_CARDS = [
  { title: "AC Remotes", href: "/category/ac-remotes", image: "/images/categories/mobile/ac-remotes.png" },
  { title: "TV Remotes", href: "/category/tv-remotes", image: "/images/categories/mobile/tv-remotes.png" },
  { title: "Set-Top Box Remotes", href: "/category/set-top-box-remotes", image: "/images/categories/mobile/set-top-box-remotes.png" },
  { title: "Streaming Remotes", href: "/category/streaming-remotes", image: "/images/categories/mobile/streaming-remotes.png" },
  { title: "Home Theatre Remotes", href: "/category/speaker-remotes", image: "/images/categories/mobile/home-theatre-remotes.png" },
  { title: "Projector Remotes", href: "/category/projector-remotes", image: "/images/categories/mobile/projector-remotes.png" },
];

function MobileCategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      className="block w-full min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2E6B] focus-visible:ring-offset-2"
      aria-label={`Browse ${category.title}`}
    >
      <Image
        src={category.image}
        alt={category.title}
        width={CARD_W}
        height={CARD_H}
        unoptimized
        sizes="45vw"
        className="block h-auto w-full"
      />
    </Link>
  );
}

export default function MobileCategoryCarousel() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [];
  for (let i = 0; i < MOBILE_DEVICE_CARDS.length; i += 2) {
    slides.push(MOBILE_DEVICE_CARDS.slice(i, i + 2));
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const slideEls = container.querySelectorAll("[data-slide-index]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
            const idx = Number(entry.target.getAttribute("data-slide-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { root: container, threshold: [0.55, 0.75] }
    );

    slideEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  return (
    <div className="md:hidden">
      <div
        ref={scrollRef}
        className="-mx-4 flex snap-x snap-mandatory overflow-x-auto no-scrollbar"
      >
        {slides.map((pair, slideIndex) => (
          <div
            key={slideIndex}
            data-slide-index={slideIndex}
            className="grid w-full flex-shrink-0 snap-start grid-cols-2 gap-3 px-4"
          >
            {pair.map((category) => (
              <MobileCategoryCard key={category.title} category={category} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pt-3" aria-label="Carousel pagination">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === activeIndex ? "w-4 bg-[#1C2E6B]" : "w-1.5 bg-gray-300"
            }`}
            aria-current={i === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
