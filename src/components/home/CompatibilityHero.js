import Image from "next/image";
import Link from "next/link";
import { SearchIcon, ShieldCheckIcon, StarIcon, RefreshIcon, ChatIcon } from "@/components/icons";
import MobileCompatibilityHero from "@/components/home/MobileCompatibilityHero";
import ReassuranceStrip from "@/components/home/ReassuranceStrip";

const QUICK_SEARCHES = [
  { label: "Samsung TV", href: "/search?q=Samsung%20TV" },
  { label: "Voltas AC", href: "/search?q=Voltas%20AC" },
  { label: "Tata Play", href: "/search?q=Tata%20Play" },
  { label: "Mi TV", href: "/search?q=Mi%20TV" },
];

const HERO_TRUST_ITEMS = [
  {
    title: "1000+ Compatible Models",
    text: "Verified Database",
    icon: "shield",
    colorClass: "text-[#2563EB]"
  },
  {
    title: "Premium Quality",
    text: "Durable & Reliable",
    icon: "premium",
    colorClass: "text-[#0EA5A4]"
  },
  {
    title: "Tested Before Dispatch",
    text: "Quality Assured",
    icon: "tested",
    colorClass: "text-[#0B2559]"
  },
  {
    title: "WhatsApp Support",
    text: "Expert Assistance",
    icon: "chat",
    colorClass: "text-[#25D366]"
  },
];

function TrustIcon({ type }) {
  if (type === "star" || type === "premium") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 13L2 9Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3 8 9l4 13 4-13-3-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
      </svg>
    );
  }
  if (type === "tested") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    );
  }
  if (type === "refresh") return <RefreshIcon className="h-5 w-5" />;
  if (type === "chat") return <ChatIcon className="h-5 w-5" />;
  return <ShieldCheckIcon className="h-5 w-5" />;
}

function DesktopCompatibilityHero() {
  return (
    <section
      className="relative hidden min-h-[620px] overflow-hidden bg-[#080f23] md:block lg:h-[520px] lg:min-h-0"
      aria-labelledby="finder-heading"
    >
      <Image
        src="/images/hero/resorb-remote-store-hero.png"
        alt=""
        fill
        unoptimized
        sizes="100vw"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(8,15,35,0.85) 0%, rgba(8,15,35,0.55) 40%, rgba(8,15,35,0.10) 75%, rgba(8,15,35,0) 100%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/25 to-white" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] px-4 lg:px-12 xl:px-16 items-center">
        <div className="w-full max-w-[600px] flex flex-col justify-center mt-[-20px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-[#007D72]/85 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm w-max">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
            </svg>
            India&apos;s trusted remote store
          </div>

          <h1 id="finder-heading" className="text-[36px] xl:text-[46px] font-[800] leading-[1.08] text-white whitespace-nowrap">
            Find the Correct Replacement <span className="text-[#0EA5A4]">Remote</span>
          </h1>
          <p className="mt-3 max-w-[560px] text-base leading-relaxed text-white/90 sm:text-lg">
            Search by model number, remote code, or brand.
          </p>

          <form action="/search" method="get" className="mt-6 mb-5 w-full max-w-[580px]" aria-label="Compatibility search">
            <div className="flex h-[58px] sm:h-[64px] items-center overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] focus-within:ring-4 focus-within:ring-[#0EA5A4]/20">
              <div className="pl-5 pr-3 text-[#009B9B] flex-shrink-0">
                <SearchIcon className="h-5 w-5" />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, remote code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] sm:text-base text-gray-900 outline-none placeholder-gray-400 font-medium"
                aria-label="Search for a compatible replacement remote"
              />
              <div className="h-full p-1">
                <button
                  type="submit"
                  className="h-full px-7 sm:px-8 rounded-xl text-sm font-semibold text-white hover:bg-[#0a142c] transition-colors shadow-[0_4px_12px_rgba(11,37,89,0.12)]"
                  style={{ background: "#0F2249" }}
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="grid w-full max-w-[580px] grid-cols-2 gap-4 text-white md:grid-cols-4 md:gap-0">
            {HERO_TRUST_ITEMS.map((item, index) => (
              <div
                key={item.title}
                className={`flex items-center gap-2 ${
                  index % 2 !== 0 ? "border-l border-white/18 pl-3 sm:pl-4 md:border-l-0 md:pl-0" : ""
                } ${index > 0 ? "md:border-l md:border-white/18 md:pl-4 lg:pl-5" : ""}`}
              >
                <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm ${item.colorClass}`}>
                  <TrustIcon type={item.icon} />
                </div>
                <div className="min-w-0 pr-2">
                  <p className="text-[12px] font-semibold leading-[1.2] sm:text-[13px]">{item.title}</p>
                  <p className="mt-0.5 text-[10.5px] leading-[1.3] text-white/80">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CompatibilityHero() {
  return (
    <>
      <MobileCompatibilityHero />
      <DesktopCompatibilityHero />
      <ReassuranceStrip />
    </>
  );
}
