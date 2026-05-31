"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import VideoShowcase from "@/components/ui/VideoShowcase";

function MobileVideoCard() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  async function handlePlay() {
    setStarted(true);
    requestAnimationFrame(() => {
      videoRef.current?.play?.().catch(() => {});
    });
  }

  return (
    <div className="flex h-[240px] overflow-hidden rounded-[18px] border border-[#DDECEE] bg-white shadow-sm">
      <div className="flex w-[45%] flex-col justify-center px-4 py-3">
        <h2 id="resorb-video-heading-mobile" className="text-base font-bold text-[#1C2E6B]">
          RESORB In Action
        </h2>
        <p className="mt-1.5 text-[11px] leading-snug text-gray-500">
          A quick look at the replacement remote experience.
        </p>
      </div>

      <div className="relative w-[55%] bg-[#E0EEF0]">
        <video
          ref={videoRef}
          src="/videos/resorb-video.mp4"
          controls={started}
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full bg-black object-cover transition-opacity duration-200 ${
            started ? "opacity-100" : "opacity-0"
          }`}
        />

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-[#E0EEF0]"
            aria-label="Play RESORB video"
          >
            <Image
              src="/images/brand/resorb-logo.png"
              alt=""
              width={1137}
              height={363}
              unoptimized
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-white/90 text-[#1C2E6B] shadow-md">
              <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function VideoSection() {
  return (
    <section className="py-5 lg:py-8" aria-labelledby="resorb-video-heading">
      {/* Desktop — unchanged */}
      <div className="hidden lg:block">
        <div className="mb-5">
          <h2 id="resorb-video-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
            RESORB in Action
          </h2>
          <p className="mt-1 text-sm text-gray-500">A quick look at the replacement remote experience.</p>
        </div>
        <div className="w-full">
          <VideoShowcase />
        </div>
      </div>

      {/* Mobile — compact card */}
      <div className="lg:hidden">
        <MobileVideoCard />
      </div>
    </section>
  );
}
