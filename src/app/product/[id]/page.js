import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import AddToCartButton from "@/components/product/AddToCartButton";
import { getProductById, getRelatedProducts } from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return {};
  return {
    title: `${product.name} — ${product.title}`,
    description: `${product.description} Compatible with: ${product.compatibleModels.slice(0, 4).join(", ")}.`,
  };
}

function StarDisplay({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-gray-500">{rating} ({count} reviews)</span>
    </div>
  );
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = getRelatedProducts(product, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link href={`/category/${category.slug}`} className="hover:text-blue-600">{category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Image */}
        {(() => {
          const CATEGORY_IMAGES = {
            "tv-remotes": "/images/remotes/tv.png",
            "ac-remotes": "/images/remotes/ac.png",
            "set-top-box-remotes": "/images/remotes/stb.png",
            "speaker-remotes": "/images/remotes/speaker.png",
            "streaming-remotes": "/images/remotes/streaming.png",
            "projector-remotes": "/images/remotes/projector.png",
            "universal-remotes": "/images/remotes/universal.png",
          };
          const imgSrc = CATEGORY_IMAGES[product.category] || "/images/remotes/tv.png";
          return (
            <div className="space-y-3">
              <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
                <Image src={imgSrc} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" />
              </div>
              <div className="flex gap-2">
                {[1, 2].map((i) => (
                  <div key={i} className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden cursor-pointer hover:border-blue-300 transition-colors">
                    <Image src={imgSrc} alt={product.name} fill sizes="64px" className="object-contain p-2" />
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Right: Product info */}
        <div>
          {/* SKU */}
          <p className="sku-text mb-1">{product.sku}</p>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-900 leading-snug mb-3">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mb-4">
            <StarDisplay rating={product.rating} count={product.reviewCount} />
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>

          {/* Stock + shipping */}
          <div className="flex flex-wrap gap-4 mb-5">
            <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {product.inStock
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                  : <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>}
              </svg>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
              Free shipping above ₹499
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
              {product.warranty}
            </span>
          </div>

          {/* Remote specs */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Type", value: product.remoteType },
              { label: "Battery", value: product.batteryType },
              { label: "Voice", value: product.voiceEnabled ? "Yes" : "No" },
              { label: "Plug & Play", value: product.plugAndPlay ? "Yes" : "Pairing needed" },
              { label: "Batteries", value: product.batteryIncluded ? "Included" : "Not included" },
            ].map((spec) => (
              <div key={spec.label} className="bg-gray-50 rounded-lg p-2.5 text-center">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">{spec.label}</p>
                <p className="text-xs font-semibold text-gray-800">{spec.value}</p>
              </div>
            ))}
          </div>

          {/* Add to cart */}
          <div className="mb-6">
            <AddToCartButton product={product} />
          </div>

          {/* Features */}
          <div className="mb-5">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Features</h2>
            <ul className="space-y-1.5">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-1.5">Description</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* ── COMPATIBILITY TABLE — THE MOST CRITICAL SECTION ── */}
      <section className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6" aria-labelledby="compatibility-heading">
        <h2 id="compatibility-heading" className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
          Verified Compatible Models
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          This remote has been tested and confirmed to work with the following device models.
        </p>

        {/* Compatible brands */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.compatibleBrands.map((brand) => (
            <span
              key={brand}
              className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Model list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {product.compatibleModels.map((model) => (
            <div key={model} className="flex items-center gap-2 bg-white border border-blue-100 rounded-lg px-3 py-2 text-sm">
              <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7"/></svg>
              <span className="font-mono text-xs text-gray-700">{model}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-blue-100">
          <p className="text-xs text-gray-500">
            Don&apos;t see your model? WhatsApp us — we&apos;ll confirm compatibility before you order.
          </p>
          <a
            href={`https://wa.me/919876543210?text=Hi%2C%20is%20${encodeURIComponent(product.name)}%20compatible%20with%20my%20device%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-green-600 hover:text-green-700"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Ask us about compatibility
          </a>
        </div>
      </section>

      {/* ── Related Products ── */}
      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-lg font-bold text-gray-900 mb-5">
            More {category?.name}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
