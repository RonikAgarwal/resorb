import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { getBrandsByCategory } from "@/data/brands";

/*
  Category hero images — shown at the top of MAIN category pages only.
  When user clicks a brand filter, they go to /search which doesn't show these.
  File naming: /public/images/category-heroes/{category-slug}.{jpg|jpeg}
*/
const CATEGORY_HEROES = {
  "tv-remotes": {
    src: "/images/category-heroes/tv-remotes.jpg",
    width: 3000,
    height: 600,
  },
  "ac-remotes": {
    src: "/images/category-heroes/ac-remotes.jpg",
    width: 3000,
    height: 600,
  },
  "set-top-box-remotes": {
    src: "/images/category-heroes/set-top-box-remotes.jpg",
    width: 3000,
    height: 600,
  },
  "speaker-remotes": {
    src: "/images/category-heroes/home-theatre-remotes.jpeg",
    width: 2560,
    height: 512,
  },
  "streaming-remotes": {
    src: "/images/category-heroes/streaming-remotes.jpg",
    width: 3000,
    height: 600,
  },
  "projector-remotes": {
    src: "/images/category-heroes/projector-remotes.jpg",
    width: 3000,
    height: 600,
  },
  "universal-remotes": {
    src: "/images/heroes/universal-remotes.png",
    width: 1024,
    height: 204,
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.name} — RESORB Replacement Remotes`,
    description: `Shop replacement remotes for ${category.name}. Verified compatibility with top Indian brands. Plug & play. WhatsApp support.`,
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const brands = getBrandsByCategory(slug);
  const heroImage = CATEGORY_HEROES[slug];

  return (
    <div className="bg-white">

      {/* ── Hero Banner — full-width, no compression, only on main category ── */}
      {heroImage && (
        <div className="w-full bg-white">
          <div className="w-full max-w-[1800px] mx-auto">
            <Image
              src={heroImage.src}
              alt={`${category.name} — RESORB`}
              width={heroImage.width}
              height={heroImage.height}
              unoptimized
              priority
              sizes="100vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-4 flex items-center gap-1.5" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#1C2E6B] transition-colors">Home</Link>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6"/>
          </svg>
          <span className="text-gray-700 font-medium">{category.name}</span>
        </nav>

        {/* Category header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold" style={{ color: '#1C2E6B' }}>{category.name}</h1>
          <p className="text-sm text-gray-500 mt-1">{category.description}</p>
        </div>

        {/* Brand filter pills */}
        {brands.length > 0 && (
          <div className="mb-6">
            <p className="text-[10px] text-gray-400 mb-2 font-bold uppercase tracking-widest">Filter by brand</p>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Link
                  key={brand.id}
                  href={`/search?q=${encodeURIComponent(brand.name)}&category=${slug}`}
                  className="text-xs font-medium text-gray-600 bg-white border border-gray-200 hover:border-[#009B9B] hover:text-[#1C2E6B] px-3 py-1.5 rounded-full transition-all"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {products.length > 0 ? (
          <>
            <p className="text-sm text-gray-400 mb-4">{products.length} products found</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">No products yet</h2>
            <p className="text-sm text-gray-500 mb-4">
              We&apos;re adding products to this category. WhatsApp us for specific requirements.
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
