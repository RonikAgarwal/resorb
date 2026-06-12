import Image from "next/image";
import Link from "next/link";
import { SearchIcon, ShieldCheckIcon, PlugIcon, RefreshIcon, ChatIcon } from "@/components/icons";
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
    title: "10,000+ Compatible Models",
    text: "Verified database",
    icon: "shield",
  },
  {
    title: "Premium Quality Products",
    text: "Durable & reliable",
    icon: "plug",
  },
  {
    title: "Tested Before Dispatch",
    text: "Quality assured",
    icon: "refresh",
  },
  {
    title: "WhatsApp Support",
    text: "Expert assistance",
    icon: "chat",
  },
];

function TrustIcon({ type }) {
  if (type === "plug") return <PlugIcon className="h-5 w-5" />;
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
        preload
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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-4 py-9 lg:py-9">
        <div className="max-w-[720px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md bg-[#007D72]/85 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
            </svg>
            India&apos;s trusted remote store
          </div>

          <h1 id="finder-heading" className="max-w-xl text-4xl font-bold leading-[1.08] text-white sm:text-[44px]">
            Find the Correct Replacement <span className="text-[#14C7B8]">Remote</span>
          </h1>
          <p className="mt-3 max-w-[560px] text-base leading-relaxed text-white/90 sm:text-lg">
            Search by model number, remote code, or brand.
          </p>

          <form action="/search" method="get" className="mt-6 mb-4 w-full max-w-[720px]" aria-label="Compatibility search">
            <div className="flex h-[58px] items-center overflow-hidden rounded-[18px] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.24)] focus-within:ring-4 focus-within:ring-[#14C7B8]/20">
              <div className="pl-5 pr-3 text-[#009B9B] flex-shrink-0">
                <SearchIcon />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, remote code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-gray-900 outline-none placeholder-gray-400 sm:text-base"
                aria-label="Search for a compatible replacement remote"
              />
              <button
                type="submit"
                className="h-full w-[150px] text-sm font-semibold text-white hover:bg-[#162352] transition-colors sm:w-[170px]"
                style={{ background: "#1C2E6B" }}
              >
                Find Remote
              </button>
            </div>
          </form>


        </div>

        <div className="mt-auto grid w-full max-w-[880px] -translate-x-3 grid-cols-2 gap-4 text-white md:grid-cols-4 md:gap-0">
          {HERO_TRUST_ITEMS.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-2 ${
                index % 2 !== 0 ? "border-l border-white/18 pl-3 sm:pl-4 md:border-l-0 md:pl-0" : ""
              } ${index > 0 ? "md:border-l md:border-white/18 md:pl-4 lg:pl-5" : ""}`}
            >
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <TrustIcon type={item.icon} />
              </div>
              <div className="min-w-0">
                <p className="whitespace-nowrap text-[12px] font-semibold leading-tight sm:text-[13.5px]">{item.title}</p>
                <p className="mt-0.5 whitespace-nowrap text-[10px] leading-tight text-white/78 sm:text-[11.5px]">{item.text}</p>
              </div>
            </div>
          ))}
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
