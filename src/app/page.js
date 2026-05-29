import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import VideoShowcase from "@/components/VideoShowcase";
import { getPopularProducts } from "@/data/products";

export const metadata = {
  title: "RESORB — India's Trusted Replacement Remote Control Store",
  description:
    "Find the exact replacement remote for your TV, AC, Set-Top Box, and more. Verified compatibility. Plug & play. Free shipping above ₹499.",
};

const QUICK_SEARCHES = [
  { label: "Samsung TV", href: "/search?q=Samsung%20TV" },
  { label: "Voltas AC", href: "/search?q=Voltas%20AC" },
  { label: "Tata Play", href: "/search?q=Tata%20Play" },
  { label: "Mi TV", href: "/search?q=Mi%20TV" },
];

const HERO_TRUST_ITEMS = [
  {
    title: "Verified Compatibility",
    text: "10,000+ models",
    icon: "shield",
  },
  {
    title: "Plug & Play",
    text: "Easy setup",
    icon: "plug",
  },
  {
    title: "30-Day Replacement",
    text: "Hassle-free returns",
    icon: "refresh",
  },
  {
    title: "WhatsApp Support",
    text: "Expert assistance",
    icon: "chat",
  },
];

const DEVICE_TYPE_CARDS = [
  {
    title: "AC Remotes",
    href: "/category/ac-remotes",
    image: "/images/categories/ac-remotes.png",
    height: 698,
  },
  {
    title: "LED TV Remotes",
    href: "/category/tv-remotes",
    image: "/images/categories/tv-remotes.png",
    height: 698,
  },
  {
    title: "Home Theatre Remotes",
    href: "/category/speaker-remotes",
    image: "/images/categories/home-theatre-remotes.png",
    height: 697,
  },
  {
    title: "Projector Remotes",
    href: "/category/projector-remotes",
    image: "/images/categories/projector-remotes.png",
    height: 697,
  },
  {
    title: "Set Top Box Remotes",
    href: "/category/set-top-box-remotes",
    image: "/images/categories/set-top-box-remotes.png",
    height: 698,
  },
  {
    title: "Streaming Services",
    href: "/category/streaming-remotes",
    image: "/images/categories/streaming-services.png",
    height: 698,
  },
];

function SearchIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  );
}

function TrustIcon({ type }) {
  if (type === "plug") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V3m6 4V3M7 7h10v4a5 5 0 0 1-10 0V7Zm5 9v5" />
      </svg>
    );
  }

  if (type === "refresh") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992V4.356M20.49 9.348A8.25 8.25 0 1 0 21 12m-5.25 3.75 2.25 2.25 3.75-4.5" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm3.75 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.142-4.03 7.5-9 7.5a10.6 10.6 0 0 1-3.618-.624L3 21l1.647-4.392C3.61 15.33 3 13.747 3 12c0-4.142 4.03-7.5 9-7.5s9 3.358 9 7.5Z" />
      </svg>
    );
  }

  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c5.385-1.798 8.25-5.708 8.25-11.342V5.906a1.5 1.5 0 0 0-1.018-1.422l-6.75-2.287a1.5 1.5 0 0 0-.964 0l-6.75 2.287A1.5 1.5 0 0 0 3.75 5.906v4.502c0 5.634 2.865 9.544 8.25 11.342Z" />
    </svg>
  );
}

function CompatibilityHero() {
  return (
    <section
      className="relative min-h-[620px] overflow-hidden bg-[#080f23] lg:h-[520px] lg:min-h-0"
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

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-white">Popular Searches:</span>
            {QUICK_SEARCHES.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full border border-white/35 bg-[#080f23]/30 px-4 py-1.5 text-xs font-semibold text-white shadow-sm backdrop-blur-sm hover:border-[#14C7B8] hover:text-[#14C7B8] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto grid max-w-[720px] -translate-x-3 grid-cols-4 gap-0 text-white">
          {HERO_TRUST_ITEMS.map((item, index) => (
            <div key={item.title} className={`flex items-center gap-2 ${index > 0 ? "border-l border-white/18 pl-4" : ""}`}>
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <TrustIcon type={item.icon} />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold leading-tight">{item.title}</p>
                <p className="mt-0.5 truncate text-xs leading-tight text-white/78">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProductsSection({ products }) {
  return (
    <section className="-mt-1 pb-8 pt-6" aria-labelledby="featured-products-heading">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 id="featured-products-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
            Featured Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">Popular compatible replacement remotes customers buy often</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:border-[#009B9B] hover:text-[#1C2E6B] transition-colors whitespace-nowrap"
        >
          View all products
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

function DeviceTypeSection() {
  return (
    <section className="py-8 border-b border-gray-100" aria-labelledby="device-type-heading">
      <div className="flex items-end justify-between gap-4 mb-5">
        <div>
          <h2 id="device-type-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
            Browse by Device Type
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DEVICE_TYPE_CARDS.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="block overflow-hidden rounded-lg border border-[#DDECEE] bg-[#F4FAFA] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#009B9B] hover:shadow-[0_14px_34px_rgba(28,46,107,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2E6B] focus-visible:ring-offset-2"
            aria-label={`Browse ${category.title}`}
          >
            <Image
              src={category.image}
              alt={category.title}
              width={1425}
              height={category.height}
              unoptimized
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}



function VideoSection() {
  return (
    <section className="py-8" aria-labelledby="resorb-video-heading">
      <div className="mb-5">
        <h2 id="resorb-video-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
          RESORB in Action
        </h2>
        <p className="text-sm text-gray-500 mt-1">A quick look at the replacement remote experience.</p>
      </div>

      <div className="w-full">
        <VideoShowcase />
      </div>
    </section>
  );
}

export default function HomePage() {
  const featuredProducts = getPopularProducts().slice(0, 10);

  return (
    <div className="bg-white">
      <CompatibilityHero />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <FeaturedProductsSection products={featuredProducts} />
        <DeviceTypeSection />
        <VideoSection />
      </div>
    </div>
  );
}
