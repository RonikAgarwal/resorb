import Link from "next/link";
import { SearchIcon } from "@/components/icons";

const QUICK_SEARCHES = [
  { label: "Samsung TV", href: "/search?q=Samsung%20TV" },
  { label: "Voltas AC", href: "/search?q=Voltas%20AC" },
  { label: "Tata Play", href: "/search?q=Tata%20Play" },
  { label: "Mi TV", href: "/search?q=Mi%20TV" },
];

function HeroRemoteArt() {
  return (
    <svg
      viewBox="0 0 160 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[168px] w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
      aria-hidden
    >
      {/* TV remote */}
      <rect x="8" y="24" width="44" height="148" rx="10" fill="#1a1a1a" />
      <rect x="14" y="34" width="32" height="10" rx="3" fill="#c0392b" opacity="0.9" />
      <circle cx="30" cy="72" r="12" fill="#2a2a2a" stroke="#444" strokeWidth="1.5" />
      <rect x="16" y="96" width="28" height="6" rx="2" fill="#333" />
      <rect x="16" y="108" width="28" height="6" rx="2" fill="#333" />
      <rect x="16" y="120" width="28" height="6" rx="2" fill="#333" />

      {/* Streaming remote */}
      <rect x="58" y="12" width="38" height="162" rx="12" fill="#111" />
      <circle cx="77" cy="36" r="8" fill="#009B9B" />
      <circle cx="77" cy="78" r="16" fill="#222" stroke="#444" strokeWidth="1.5" />
      <circle cx="77" cy="78" r="6" fill="#333" />

      {/* AC remote */}
      <rect x="104" y="32" width="48" height="138" rx="10" fill="#f0f0f0" />
      <rect x="112" y="44" width="32" height="22" rx="4" fill="#d0eef0" stroke="#009B9B" strokeWidth="1" />
      <text x="128" y="59" textAnchor="middle" fill="#009B9B" fontSize="9" fontWeight="700">
        24°
      </text>
      <rect x="114" y="78" width="28" height="7" rx="2" fill="#ddd" />
      <rect x="114" y="92" width="28" height="7" rx="2" fill="#ddd" />
      <rect x="114" y="106" width="28" height="7" rx="2" fill="#ddd" />

      {/* Surface line */}
      <ellipse cx="80" cy="188" rx="72" ry="8" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}

export default function MobileCompatibilityHero() {
  return (
    <section
      className="relative overflow-hidden md:hidden"
      style={{
        background: "linear-gradient(145deg, #060b1a 0%, #162352 42%, #1C2E6B 100%)",
      }}
      aria-labelledby="mobile-finder-heading"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-6 top-0 h-48 w-48 rounded-full bg-[#009B9B]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 right-8 h-32 w-32 rounded-full bg-[#009B9B]/10 blur-2xl" />

      <div className="relative px-4 pb-5 pt-4">
        <div className="flex items-start gap-3">
          {/* Copy */}
          <div className="min-w-0 flex-1 pt-1">
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#009B9B] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
              <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
              </svg>
              India&apos;s Trusted Remote Store
            </div>

            <h1 id="mobile-finder-heading" className="text-[26px] font-bold leading-[1.1] text-white">
              Find the Correct Replacement{" "}
              <span className="text-[#009B9B]">Remote</span>
            </h1>
            <p className="mt-1.5 text-[12px] leading-snug text-white/80">
              Search by model number, remote code, or brand.
            </p>
          </div>

          {/* Decorative remotes */}
          <div className="w-[38%] max-w-[148px] shrink-0 opacity-95">
            <HeroRemoteArt />
          </div>
        </div>

        {/* Search */}
        <form action="/search" method="get" className="mt-4 w-full" aria-label="Compatibility search">
          <div className="grid h-[50px] w-full grid-cols-[1fr_30%] overflow-hidden rounded-2xl bg-white shadow-[0_8px_28px_rgba(0,0,0,0.18)] focus-within:ring-4 focus-within:ring-[#009B9B]/25">
            <div className="flex min-w-0 items-center">
              <div className="shrink-0 pl-3.5 pr-2 text-[#009B9B]">
                <SearchIcon className="h-[18px] w-[18px]" />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, remote code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-gray-900 outline-none placeholder:text-gray-400"
                aria-label="Search for a compatible replacement remote"
              />
            </div>
            <button
              type="submit"
              className="text-[12px] font-semibold text-white transition-colors hover:bg-[#162352]"
              style={{ background: "#1C2E6B" }}
            >
              Find Remote
            </button>
          </div>
        </form>

        <div className="mt-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[10px] font-bold text-white/90">Popular searches:</span>
          {QUICK_SEARCHES.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shrink-0 rounded-full border border-white/35 bg-white/10 px-3 py-1 text-[10px] font-semibold text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Blend into page */}
      <div
        className="h-8 w-full"
        style={{
          background: "linear-gradient(to bottom, transparent, #ffffff)",
        }}
      />
    </section>
  );
}
