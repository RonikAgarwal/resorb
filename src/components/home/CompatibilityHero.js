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
    colorClass: "text-[#2563EB]"
  },
  {
    title: "Premium Quality Products",
    text: "Durable & reliable",
    icon: "plug",
    colorClass: "text-[#0EA5A4]"
  },
  {
    title: "Tested Before Dispatch",
    text: "Quality assured",
    icon: "refresh",
    colorClass: "text-[#0B2559]"
  },
  {
    title: "WhatsApp Support",
    text: "Expert assistance",
    icon: "chat",
    colorClass: "text-[#25D366]"
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
      className="relative hidden h-[600px] overflow-hidden md:flex md:items-center border-b border-gray-100"
      aria-labelledby="finder-heading"
      style={{
        backgroundColor: '#E8F0F9', /* Fallback matching the new light blue */
        backgroundImage: 'url(/images/hero/heronew.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'calc(100% + 180px) center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] px-4 lg:px-12 xl:px-16 items-center h-full">
        {/* Content */}
        <div className="w-full max-w-[600px] flex flex-col justify-center mt-[-20px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold text-[#0B2559] shadow-sm bg-[#2563EB]/[0.08] border border-[#2563EB]/[0.15] w-max">
            <ShieldCheckIcon className="h-4 w-4 text-[#0EA5A4]" />
            India&apos;s trusted remote store
          </div>

          <h1 id="finder-heading" className="text-[36px] xl:text-[46px] font-[800] tracking-tight text-[#163A72] leading-[1.1] whitespace-nowrap">
            Find the Correct Replacement <span className="text-[#2563EB]">Remote</span>
          </h1>
          <p className="mt-4 text-[15px] xl:text-[17px] text-[#334155] max-w-lg">
            Search by model number, remote code, or brand.
          </p>

          <form action="/search" method="get" className="mt-7 mb-6 w-full max-w-[580px]" aria-label="Compatibility search">
            <div className="flex h-[60px] sm:h-[64px] items-center overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(15,23,42,0.05)] focus-within:border-[#2563EB] focus-within:ring-1 focus-within:ring-[#2563EB] transition-all border border-[#DCE3EE]">
              <div className="pl-5 pr-3 text-gray-400 flex-shrink-0">
                <SearchIcon className="h-[22px] w-[22px]" />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, remote code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-[16px] text-[#0B2559] outline-none placeholder-gray-400 font-medium"
                aria-label="Search for a compatible replacement remote"
              />
              <div className="p-1.5 h-full">
                <button
                  type="submit"
                  className="h-full px-7 sm:px-8 rounded-xl text-[15px] font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-colors shadow-sm"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          <div className="grid grid-cols-4 gap-2.5 w-full max-w-[580px]">
            {HERO_TRUST_ITEMS.map((item) => (
              <div key={item.title} className="flex flex-col gap-2 bg-white transition-colors px-3.5 py-3 rounded-[16px] border border-[#E5E7EB] shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ${item.colorClass}`}>
                  <TrustIcon type={item.icon} />
                </div>
                <div>
                  <p className="text-[11.5px] font-bold text-[#0B2559] leading-[1.2]">{item.title}</p>
                  <p className="mt-0.5 text-[9.5px] font-medium text-[#64748B] leading-[1.3]">{item.text}</p>
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
