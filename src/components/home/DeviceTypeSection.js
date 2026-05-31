import Image from "next/image";
import Link from "next/link";

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

export default function DeviceTypeSection() {
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
