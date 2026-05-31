import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

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

const MOBILE_DEVICE_CARDS = [
  {
    title: "AC Remotes",
    href: "/category/ac-remotes",
    image: "/images/categories/mobile/ac-remotes.png",
    width: 819,
    height: 1024,
  },
  {
    title: "TV Remotes",
    href: "/category/tv-remotes",
    image: "/images/categories/mobile/tv-remotes.png",
    width: 769,
    height: 1024,
  },
  {
    title: "Set-Top Box Remotes",
    href: "/category/set-top-box-remotes",
    image: "/images/categories/mobile/set-top-box-remotes.png",
    width: 768,
    height: 1024,
  },
  {
    title: "Streaming Remotes",
    href: "/category/streaming-remotes",
    image: "/images/categories/mobile/streaming-remotes.png",
    width: 768,
    height: 1024,
  },
  {
    title: "Home Theatre Remotes",
    href: "/category/speaker-remotes",
    image: "/images/categories/mobile/home-theatre-remotes.png",
    width: 768,
    height: 1024,
  },
  {
    title: "Projector Remotes",
    href: "/category/projector-remotes",
    image: "/images/categories/mobile/projector-remotes.png",
    width: 769,
    height: 1024,
  },
];

function MobileCategoryCard({ category }) {
  return (
    <Link
      href={category.href}
      className="block w-[calc(50%-6px)] overflow-hidden rounded-[20px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C2E6B] focus-visible:ring-offset-2"
      aria-label={`Browse ${category.title}`}
    >
      <Image
        src={category.image}
        alt={category.title}
        width={category.width}
        height={category.height}
        unoptimized
        sizes="45vw"
        className="block h-auto w-full"
      />
    </Link>
  );
}

function MobileCategoryCarousel() {
  const slides = [];
  for (let i = 0; i < MOBILE_DEVICE_CARDS.length; i += 2) {
    slides.push(MOBILE_DEVICE_CARDS.slice(i, i + 2));
  }

  return (
    <div className="lg:hidden">
      <div className="-mx-4 flex snap-x snap-mandatory overflow-x-auto no-scrollbar">
        {slides.map((pair, slideIndex) => (
          <div
            key={slideIndex}
            className="flex w-full flex-shrink-0 snap-start gap-3 px-4"
          >
            {pair.map((category) => (
              <MobileCategoryCard key={category.title} category={category} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 pt-3">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-[#1C2E6B]" : "w-1.5 bg-gray-300"}`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

export default function DeviceTypeSection() {
  return (
    <section className="border-b border-gray-100 pt-3 pb-5 md:py-8 lg:py-8" aria-labelledby="device-type-heading">
      <div className="mb-4 flex items-end justify-between gap-4 lg:mb-5">
        <h2 id="device-type-heading" className="text-xl font-bold lg:text-2xl" style={{ color: "#1C2E6B" }}>
          Browse by Device Type
        </h2>
        <Link
          href="/products"
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#1C2E6B] lg:hidden"
        >
          View all
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <MobileCategoryCarousel />

      {/* Desktop grid — unchanged */}
      <div className="hidden grid-cols-1 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-3">
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
