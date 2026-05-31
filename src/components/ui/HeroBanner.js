'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  { src: "/images/banners/tv.png", href: "/category/tv-remotes", alt: "LED TV Remotes" },
  { src: "/images/banners/ac.png", href: "/category/ac-remotes", alt: "Air Conditioner Remotes" },
  { src: "/images/banners/stb.png", href: "/category/set-top-box-remotes", alt: "Set-Top Box Remotes" },
  { src: "/images/banners/speaker.png", href: "/category/speaker-remotes", alt: "Home Theatre Remotes" },
  { src: "/images/banners/streaming.png", href: "/category/streaming-remotes", alt: "Streaming Device Remotes" },
  { src: "/images/banners/projector.png", href: "/category/projector-remotes", alt: "Projector Remotes" },
  { src: "/images/banners/universal.png", href: "/category/universal-remotes", alt: "Universal Remotes" },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setCurrent((p) => (p + 1) % SLIDES.length);

  return (
    /* Fixed height — images are square so we show the full width with contain + brand bg */
    <div className="relative w-full overflow-hidden" style={{ background: '#E0EEF0', height: 'clamp(220px, 35vw, 480px)' }}>
      {SLIDES.map((s, i) => (
        <Link
          key={s.href}
          href={s.href}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          tabIndex={i === current ? 0 : -1}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            /* contain keeps full image visible; brand bg fills sides */
            className="object-contain"
            priority={i === 0}
          />
        </Link>
      ))}

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Previous"
      >
        <svg className="w-4 h-4" style={{ color: '#1C2E6B' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 19-7-7 7-7"/>
        </svg>
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/85 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Next"
      >
        <svg className="w-4 h-4" style={{ color: '#1C2E6B' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7"/>
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{ background: i === current ? '#1C2E6B' : 'rgba(255,255,255,0.7)' }}
            className={`rounded-full transition-all ${i === current ? "w-6 h-2" : "w-2 h-2"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
