import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/product/ProductCard";
import AddToCartButton from "@/components/product/AddToCartButton";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/data/categories";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};
  return {
    title: `${product.title} — RESORB`,
    description: product.description
      ? product.description.replace(/<[^>]*>/g, "").slice(0, 160)
      : `Buy ${product.title} online at RESORB. Verified compatibility. Plug & play.`,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const related = await getRelatedProducts(product, 4);

  // Parse specs from JSONB
  const specs = Array.isArray(product.specs) ? product.specs : [];

  // Product images — use uploaded images or fallback to category placeholder
  const CATEGORY_IMAGES = {
    "tv-remotes": "/images/remotes/tv.png",
    "ac-remotes": "/images/remotes/ac.png",
    "set-top-box-remotes": "/images/remotes/stb.png",
    "speaker-remotes": "/images/remotes/speaker.png",
    "streaming-remotes": "/images/remotes/streaming.png",
    "projector-remotes": "/images/remotes/projector.png",
    "universal-remotes": "/images/remotes/universal.png",
  };
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : [CATEGORY_IMAGES[product.category] || "/images/remotes/tv.png"];
  const mainImage = productImages[0];

  // Prepare cart-compatible product object
  const cartProduct = {
    id: product.id,
    name: product.title,
    price: product.price,
    originalPrice: product.mrp,
    image: mainImage,
    inStock: product.in_stock,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav
        className="text-xs text-gray-400 mb-6 flex items-center gap-1 flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="hover:text-blue-600"
            >
              {category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-gray-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ── 1. PRODUCT IMAGES ── */}
        <div className="space-y-3">
          <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
            {mainImage.startsWith("http") ? (
              <img
                src={mainImage}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-contain p-8"
              />
            ) : (
              <Image
                src={mainImage}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            )}
          </div>
          {productImages.length > 1 && (
            <div className="flex gap-2">
              {productImages.map((img, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden cursor-pointer hover:border-blue-300 transition-colors"
                >
                  {img.startsWith("http") ? (
                    <img
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Image
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain p-2"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column ── */}
        <div>
          {/* ── 2. PRODUCT TITLE ── */}
          <h1 className="text-xl font-bold text-gray-900 leading-snug mb-4">
            {product.title}
          </h1>

          {/* ── 3. PRICE BLOCK ── */}
          <div className="mb-4">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    {product.discount}% off
                  </span>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                  product.in_stock ? "text-green-600" : "text-red-500"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  {product.in_stock ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                    />
                  )}
                </svg>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                Free shipping above ₹499
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                {product.warranty}
              </span>
            </div>
          </div>

          {/* ── 4. FEATURES & SPECS ── */}
          {specs.length > 0 && (
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Features & Specifications
              </h2>
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                {specs.map((spec, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm ${
                      i % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <span className="text-gray-500">{spec.key}</span>
                    <span className="font-medium text-gray-900 text-right">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart */}
          <div className="mb-6">
            <AddToCartButton product={cartProduct} />
          </div>
        </div>
      </div>

      {/* ── 5. PRODUCT DESCRIPTION ── */}
      {product.description && (
        <section className="mt-10">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Product Description
          </h2>
          <div
            className="prose prose-sm max-w-none text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-6"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* ── 6. MEASUREMENTS ── */}
      {(product.weight_grams ||
        product.length_cm ||
        product.width_cm ||
        product.height_cm) && (
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Measurements
          </h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden inline-block">
            {product.weight_grams && (
              <div className="flex items-center justify-between px-6 py-2.5 text-sm bg-gray-50 min-w-[280px]">
                <span className="text-gray-500">Weight</span>
                <span className="font-medium text-gray-900">
                  {product.weight_grams}g
                </span>
              </div>
            )}
            {(product.length_cm ||
              product.width_cm ||
              product.height_cm) && (
              <div className="flex items-center justify-between px-6 py-2.5 text-sm bg-white min-w-[280px]">
                <span className="text-gray-500">Dimensions</span>
                <span className="font-medium text-gray-900">
                  {[
                    product.length_cm && `${product.length_cm}L`,
                    product.width_cm && `${product.width_cm}W`,
                    product.height_cm && `${product.height_cm}H`,
                  ]
                    .filter(Boolean)
                    .join(" × ")}{" "}
                  cm
                </span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── 7. WHATSAPP ASSISTANCE ── */}
      <section className="mt-10 bg-green-50 border border-green-100 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">
              Not sure if this remote works with your device?
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              Send us your AC/TV model number on WhatsApp and we&apos;ll
              confirm compatibility before you order.
            </p>
            <a
              href={`https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(product.title)}.%20Is%20it%20compatible%20with%20my%20device%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. RELATED PRODUCTS ── */}
      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2
            id="related-heading"
            className="text-lg font-bold text-gray-900 mb-5"
          >
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
