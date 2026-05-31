import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "@/components/icons";

const QUICK_SEARCHES = [
  { label: "Samsung TV", href: "/search?q=Samsung%20TV" },
  { label: "Voltas AC", href: "/search?q=Voltas%20AC" },
  { label: "Tata Play", href: "/search?q=Tata%20Play" },
  { label: "Mi TV", href: "/search?q=Mi%20TV" },
];

export default function MobileCompatibilityHero() {
  return (
    <section
      className="relative h-[450px] overflow-hidden bg-[#080f23] md:hidden"
      aria-labelledby="mobile-finder-heading"
    >
      <Image
        src="/images/hero/resorb-mobile-hero.png"
        alt=""
        fill
        unoptimized
        preload
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Bottom fade into white section below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.35) 45%, rgba(255,255,255,0.85) 75%, #ffffff 100%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col px-4 pb-3 pt-5">
        {/* Text block — left side, remotes visible on right via image composition */}
        <div className="max-w-[58%]">
          <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#009B9B]/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
            </svg>
            India&apos;s Trusted Remote Store
          </div>

          <h1
            id="mobile-finder-heading"
            className="text-[26px] font-bold leading-[1.12] text-white"
          >
            Find the Correct Replacement{" "}
            <span className="text-[#009B9B]">Remote</span>
          </h1>
          <p className="mt-1.5 text-[12px] leading-snug text-white/90">
            Search by model number, remote code, or brand.
          </p>
        </div>

        {/* Search + chips — full width, below text/remotes zone */}
        <div className="mt-auto w-full">
          <form action="/search" method="get" className="w-full" aria-label="Compatibility search">
            <div className="flex h-[50px] w-full items-center overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_rgba(0,0,0,0.2)] focus-within:ring-4 focus-within:ring-[#009B9B]/20">
              <div className="pl-3.5 pr-2 text-[#009B9B] flex-shrink-0">
                <SearchIcon className="h-[18px] w-[18px]" />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, remote code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder-gray-400"
                aria-label="Search for a compatible replacement remote"
              />
              <button
                type="submit"
                className="h-full w-[30%] min-w-[96px] max-w-[120px] flex-shrink-0 text-[12px] font-semibold text-white transition-colors hover:bg-[#162352]"
                style={{ background: "#1C2E6B" }}
              >
                Find Remote
              </button>
            </div>
          </form>

          <div className="mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="flex-shrink-0 text-[10px] font-bold text-white">Popular searches:</span>
            {QUICK_SEARCHES.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex-shrink-0 rounded-full border border-white/35 bg-[#080f23]/30 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
