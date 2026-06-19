import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import MobileCategoryCarousel from "@/components/home/MobileCategoryCarousel";

const DEVICE_TYPE_CARDS = [
  {
    title: "LED TV Remotes",
    href: "/category/tv-remotes",
    image: "/images/categories/tv-remotes.png",
  },
  {
    title: "AC Remotes",
    href: "/category/ac-remotes",
    image: "/images/categories/ac-remotes.png",
  },
  {
    title: "Set-Top Box & Streaming",
    href: "/category/set-top-box-remotes",
    image: "/images/categories/set-top-box-remotes.png",
  },
  {
    title: "Home Theatre Remotes",
    href: "/category/speaker-remotes",
    image: "/images/categories/home-theatre-remotes.png",
  },
  {
    title: "Projector Remotes",
    href: "/category/projector-remotes",
    image: "/images/categories/projector-remotes.png",
  },
  {
    title: "Fan Remotes",
    href: "/category/fan-remotes",
    image: "/images/categories/fan-remotes.png",
  },
];

export default function DeviceTypeSection() {
  return (
    <section className="pt-6 pb-8 lg:py-8" aria-labelledby="device-type-heading">
      <div className="mb-6 lg:mb-8">
        <h2 id="device-type-heading" className="text-2xl font-extrabold tracking-tight text-[#0B2559] lg:text-[28px] relative inline-block pb-3 [text-shadow:0_1px_0_rgba(255,255,255,0.4)]">
          Browse Categories
          <span className="absolute bottom-0 left-0 w-10 h-1 bg-[#2563EB] rounded-full"></span>
        </h2>
      </div>

      <MobileCategoryCarousel />

      {/* Desktop grid: 3x2 clean minimalistic layout */}
      <div className="hidden gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-3">
        {DEVICE_TYPE_CARDS.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group block overflow-hidden rounded-2xl bg-[#F0F2F5] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 p-2"
            aria-label={`Browse ${category.title}`}
          >
            <div className="relative aspect-[4/3] w-full flex items-center justify-center p-6 pb-4">
              <Image
                src={category.image}
                alt={category.title}
                width={800}
                height={800}
                className="object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-xl"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                unoptimized
              />
            </div>
            <div className="bg-white rounded-[14px] px-5 py-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F2249] transition-colors">
                {category.title}
              </h3>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0057FF] text-white transition-transform group-hover:scale-110">
                <ChevronRightIcon className="h-3 w-3" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
