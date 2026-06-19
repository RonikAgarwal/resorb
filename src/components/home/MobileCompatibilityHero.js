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
      className="relative overflow-hidden md:hidden bg-gray-50 border-b border-gray-100"
      aria-labelledby="mobile-finder-heading"
    >
      <div className="relative px-4 pb-8 pt-8">
        <div className="flex flex-col items-start gap-3">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[10px] font-semibold tracking-wide text-blue-700 ring-1 ring-inset ring-blue-700/10">
            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
            </svg>
            India&apos;s Trusted Remote Store
          </div>

          <h1 id="mobile-finder-heading" className="text-[28px] font-bold leading-tight text-gray-900">
            Find the Correct Replacement{" "}
            <span className="text-blue-600">Remote</span>
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
            Search by model number, remote code, or brand.
          </p>
        </div>

        <form action="/search" method="get" className="mt-6 w-full" aria-label="Compatibility search">
          <div className="flex h-14 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
            <div className="flex min-w-0 items-center flex-1">
              <div className="shrink-0 pl-4 pr-2 text-gray-400">
                <SearchIcon className="h-5 w-5" />
              </div>
              <input
                id="home-compatibility-search"
                name="q"
                type="text"
                placeholder="Model number, code, or brand"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
                aria-label="Search for a compatible replacement remote"
              />
            </div>
            <button
              type="submit"
              className="px-5 text-[13px] font-semibold text-white transition-colors bg-blue-600 hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <span className="shrink-0 text-[11px] font-medium text-gray-500">Popular searches:</span>
          {QUICK_SEARCHES.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="shrink-0 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] font-medium text-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
