"use client";

import VideoShowcase from "@/components/ui/VideoShowcase";

const MARKETPLACES = [
  { name: "Amazon", color: "#FF9900", textColor: "#232F3E" },
  { name: "Flipkart", color: "#2874F0", textColor: "#ffffff" },
  { name: "JioMart", color: "#0078AD", textColor: "#ffffff" },
  { name: "Meesho", color: "#570A57", textColor: "#ffffff" },
  { name: "IndiaMART", color: "#2C5ECF", textColor: "#ffffff" },
];

export default function VideoMarketplaceSection() {
  return (
    <section className="hidden lg:block py-8" aria-labelledby="video-marketplace-heading">
      <div className="flex gap-8 items-start">
        {/* Left — Video */}
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h2 id="video-marketplace-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
              RESORB in Action
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              See how we help you find the right replacement remote.
            </p>
          </div>
          <VideoShowcase />
        </div>

        {/* Right — Marketplace */}
        <div className="w-[340px] flex-shrink-0">
          <h3 className="text-xl font-bold text-[#1C2E6B] mb-4">
            Buy RESORB Products From
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {MARKETPLACES.map((mp) => (
              <div
                key={mp.name}
                className="flex h-[72px] items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <span
                  className="text-base font-bold"
                  style={{ color: mp.color }}
                >
                  {mp.name}
                </span>
              </div>
            ))}
            {/* Fill last row if odd */}
            {MARKETPLACES.length % 2 !== 0 && (
              <div className="h-[72px]" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
