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
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_14px_36px_rgba(28,46,107,0.07)]">
      <div className="relative aspect-[2.85/1] bg-[#E0EEF0]">
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
            className="absolute inset-0 flex flex-col items-center justify-center gap-7 bg-[#E0EEF0] text-center"
            aria-label="Play RESORB video"
          >
            <span className="relative flex flex-col items-center">
              <Image
                src="/images/brand/resorb-logo.png"
                alt="RESORB"
                width={1137}
                height={363}
                unoptimized
                className="h-auto w-56 sm:w-72 lg:w-[320px]"
                priority={false}
              />
              <span className="mt-3 text-xs font-semibold text-[#1C2E6B] sm:text-sm">
                HOUSE OF REMOTES
              </span>
            </span>

            <span className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-white bg-white/90 text-[#1C2E6B] shadow-[0_10px_24px_rgba(28,46,107,0.16)] transition-transform hover:scale-105">
              <svg className="ml-0.5 h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
