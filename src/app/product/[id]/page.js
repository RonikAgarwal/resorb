import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCartButton from "@/components/product/AddToCartButton";
import { getProductById, getSimilarModelProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/data/categories";
import {
  CompatibilityIcon,
  QualityIcon,
  PairingIcon,
  NoPairingIcon,
  RemoteControlIcon,
  ShieldCheckIcon,
  SafetyIcon,
} from "@/components/icons";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};

  const displayName = product.item_name || product.title;
  return {
    title: `${displayName} — RESORB`,
    description: product.compatibility
      ? `${product.compatibility} ${product.quality || ""}`.trim().slice(0, 160)
      : `Buy ${displayName} online at RESORB. Verified compatibility, tested before dispatch.`,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const similarModels = await getSimilarModelProducts(product);

  // Parse specs from JSONB
  const specs = Array.isArray(product.specs) ? product.specs : [];

  // Product images — use uploaded images or fallback to placeholder
  const productImages = product.images && product.images.length > 0 ? product.images : [];
  const mainImage = productImages[0] || null;
  const hasImages = productImages.length > 0;

  // Display names (support both old and new schema)
  const itemName = product.item_name || product.title;
  const modelName = product.model_name || "";

  // Price calculations
  const discount =
    product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  // Prepare cart-compatible product object
  const cartProduct = {
    id: product.id,
    name: itemName,
    price: product.price,
    originalPrice: product.mrp,
    image: mainImage || "/images/remotes/tv.png",
    inStock: product.in_stock,
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
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
        <span className="text-gray-700">{itemName}</span>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          PRODUCT HEADER — 2 Column Grid
          ══════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        {/* ── Left: Image Gallery ── */}
        <div className="space-y-3">
          <div className="aspect-square bg-gray-50 rounded-2xl border border-gray-100 relative overflow-hidden">
            {hasImages ? (
              mainImage.startsWith("http") ? (
                <img src={mainImage} alt={itemName} className="absolute inset-0 w-full h-full object-contain p-8" />
              ) : (
                <Image src={mainImage} alt={itemName} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-8" />
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <RemoteControlIcon className="w-24 h-24 text-gray-300" />
              </div>
            )}
          </div>
          {productImages.length > 1 && (
            <div className="flex gap-2">
              {productImages.map((img, i) => (
                <div key={i} className="w-16 h-16 bg-gray-50 rounded-lg border border-gray-200 relative overflow-hidden cursor-pointer hover:border-blue-300 transition-colors">
                  {img.startsWith("http") ? (
                    <img src={img} alt={`${itemName} ${i + 1}`} className="absolute inset-0 w-full h-full object-contain p-2" />
                  ) : (
                    <Image src={img} alt={`${itemName} ${i + 1}`} fill sizes="64px" className="object-contain p-2" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Product Info ── */}
        <div>
          {/* Model Name (small) */}
          {modelName && (
            <p className="text-sm font-mono font-semibold text-teal mb-1.5 tracking-wide uppercase">{modelName}</p>
          )}

          {/* Item Name (large heading) */}
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">{itemName}</h1>

          {/* ── Price Section ── */}
          <div className="mb-5">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString("en-IN")}</span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                  <span className="text-sm font-semibold text-green-600">{discount}% off</span>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${product.in_stock ? "text-green-600" : "text-red-500"}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {product.in_stock ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                  )}
                </svg>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Free shipping above ₹499
              </span>
            </div>
          </div>

          {/* ── Product Highlights ── */}
          <div className="space-y-2.5 mb-6">
            {product.compatibility && (
              <div className="product-highlight-card">
                <div className="product-highlight-icon product-highlight-icon-blue">
                  <CompatibilityIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Compatibility</p>
                  <p className="text-sm text-gray-800">{product.compatibility}</p>
                </div>
              </div>
            )}

            {product.quality && (
              <div className="product-highlight-card">
                <div className="product-highlight-icon product-highlight-icon-amber">
                  <QualityIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Quality</p>
                  <p className="text-sm text-gray-800">{product.quality}</p>
                </div>
              </div>
            )}

            {/* Pairing Section */}
            {product.pairing_required ? (
              <div className="product-highlight-card">
                <div className="product-highlight-icon product-highlight-icon-violet">
                  <PairingIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Pairing Required</p>
                  <p className="text-sm text-gray-800">{product.pairing_instructions || "Follow the included pairing instructions."}</p>
                </div>
              </div>
            ) : (
              <div className="product-highlight-card">
                <div className="product-highlight-icon product-highlight-icon-green">
                  <NoPairingIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-0.5">Plug & Play</p>
                  <p className="text-sm text-gray-800">No Pairing Required</p>
                </div>
              </div>
            )}
          </div>

          {/* ── CTA Buttons ── */}
          <div className="mb-6">
            <AddToCartButton product={cartProduct} />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          ABOUT PRODUCT — Bullet Points
          ══════════════════════════════════════════════════════════ */}
      {(product.quality_assurance || product.disclaimer || product.safety_information) && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About This Product</h2>
          <div className="bg-gray-50 rounded-xl p-6 space-y-3">
            {product.quality_assurance && (
              <div className="flex items-start gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{product.quality_assurance}</p>
              </div>
            )}
            {product.disclaimer && (
              <div className="flex items-start gap-3">
                <SafetyIcon className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{product.disclaimer}</p>
              </div>
            )}
            {product.safety_information && (
              <div className="flex items-start gap-3">
                <SafetyIcon className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{product.safety_information}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SPECIFICATIONS TABLE
          ══════════════════════════════════════════════════════════ */}
      {specs.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Specifications</h2>
          <div className="border border-gray-100 rounded-xl overflow-hidden bg-white max-w-2xl">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-gray-100">
                {specs.map((spec, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                    <td className="py-3 px-5 font-medium text-gray-500 w-1/3 border-r border-gray-100">{spec.key}</td>
                    <td className="py-3 px-5 text-gray-900 font-semibold">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          SIMILAR MODELS — Model Family Chips
          ══════════════════════════════════════════════════════════ */}
      {similarModels.length > 0 && (
        <section className="mb-8" aria-labelledby="similar-models-heading">
          <h2 id="similar-models-heading" className="text-lg font-bold text-gray-900 mb-4">Similar Models</h2>
          <div className="flex flex-wrap gap-2">
            {/* Current product chip (active) */}
            {product.model_family && product.model_family.map(tag => {
              // Check if this tag belongs to the current product only
              const isCurrentSku = tag.toUpperCase() === product.sku?.toUpperCase();
              if (!isCurrentSku) return null;
              return (
                <span key={tag} className="model-chip model-chip-active">{tag}</span>
              );
            })}

            {/* If no exact SKU match in tags, show current product's SKU */}
            {product.sku && !(product.model_family || []).some(t => t.toUpperCase() === product.sku.toUpperCase()) && (
              <span className="model-chip model-chip-active">{product.sku}</span>
            )}

            {/* Similar model chips */}
            {similarModels.map(p => (
              <Link key={p.id} href={`/product/${p.id}`} className="model-chip">
                {p.model_name || p.sku || p.item_name || p.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════
          WHATSAPP ASSISTANCE
          ══════════════════════════════════════════════════════════ */}
      <section className="mb-8 bg-green-50 border border-green-100 rounded-xl p-5 max-w-3xl mx-auto md:mx-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-gray-900 mb-1">Need Help Choosing?</h2>
            <p className="text-sm text-gray-600">
              Send your model number on WhatsApp to confirm compatibility before you order.
            </p>
          </div>
          <a
            href={`https://wa.me/917011779887?text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(itemName)}.%20Is%20it%20compatible%20with%20my%20device%3F`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm w-full sm:w-auto justify-center"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
