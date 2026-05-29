"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  async function handlePlay() {
    setStarted(true);

    requestAnimationFrame(() => {
      videoRef.current?.play?.().catch(() => {});
    });
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="relative aspect-[2/1] bg-[#E0EEF0]">
        <video
          ref={videoRef}
          src="/videos/resorb-video.mp4"
          controls={started}
          playsInline
          preload="metadata"
          className={`absolute inset-0 h-full w-full bg-black object-cover transition-opacity duration-200 ${
            started ? "opacity-100" : "opacity-0"
          }`}
        >
          Your browser does not support the video tag.
        </video>

        {!started && (
          <button
            type="button"
            onClick={handlePlay}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-[#E0EEF0] text-center"
            aria-label="Play RESORB video"
          >
            <span className="relative flex flex-col items-center">
              <Image
                src="/images/brand/resorb-logo.png"
                alt="RESORB"
                width={1137}
                height={363}
                unoptimized
                className="h-auto w-56 sm:w-80 lg:w-[420px]"
                priority={false}
              />
              <span className="mt-5 text-xs sm:text-base font-semibold tracking-[0.45em] text-[#1C2E6B]">
                HOUSE OF REMOTES
              </span>
            </span>

            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-white/80 text-[#1C2E6B] shadow-md transition-transform hover:scale-105">
              <svg className="ml-1 h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
