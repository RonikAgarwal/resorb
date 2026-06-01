import Link from "next/link";
import Image from "next/image";

const CATEGORY_IMAGES = {
  "tv-remotes": "/images/remotes/tv.png",
  "ac-remotes": "/images/remotes/ac.png",
  "set-top-box-remotes": "/images/remotes/stb.png",
  "speaker-remotes": "/images/remotes/speaker.png",
  "streaming-remotes": "/images/remotes/streaming.png",
  "projector-remotes": "/images/remotes/projector.png",
  "universal-remotes": "/images/remotes/universal.png",
};

const CATEGORY_LABELS = {
  "tv-remotes": "Smart TV Remote",
  "ac-remotes": "AC Remote",
  "set-top-box-remotes": "Set-Top Box Remote",
  "speaker-remotes": "Home Theatre Remote",
  "streaming-remotes": "Streaming Remote",
  "projector-remotes": "Projector Remote",
  "universal-remotes": "Universal Remote",
};

export default function ProductCard({ product }) {
  // Support both old hardcoded shape (originalPrice, compatibleBrands)
  // and new DB shape (mrp, compatible_brands)
  const id = product.id;
  const title = product.title;
  const price = product.price;
  const originalPrice = product.mrp || product.originalPrice || price;
  const discount = product.discount || 0;
  const inStock = product.in_stock !== undefined ? product.in_stock : product.inStock;
  const category = product.category;
  const popular = product.popular;
  const compatibleBrands = product.compatible_brands || product.compatibleBrands || [];

  // Use product-specific images if available, otherwise fallback to category image
  const hasProductImages = product.images && product.images.length > 0 && product.images[0].startsWith("http");
  const imgSrc = hasProductImages
    ? product.images[0]
    : CATEGORY_IMAGES[category] || "/images/remotes/tv.png";
  const isExternal = imgSrc.startsWith("http");

  const primaryBrand = compatibleBrands[0] || product.brand || "RESORB";
  const categoryLabel = CATEGORY_LABELS[category] || "Replacement Remote";
  const productTitle = `${primaryBrand} ${categoryLabel}`;
  const compatibilityText =
    compatibleBrands.length > 1
      ? `Compatible with multiple ${primaryBrand} models`
      : `Compatible with ${primaryBrand} models`;

  return (
    <Link
      href={`/product/${id}`}
      className="group relative flex min-h-[184px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-[#CFE6EA] hover:shadow-lg sm:flex-row"
      aria-label={`${productTitle} - ${title}`}
    >
      <div className="absolute left-4 top-3 z-10 flex items-center gap-1.5">
        {discount > 0 && (
          <span className="rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
        {popular && (
          <span className="rounded bg-[#1C2E6B] px-2 py-1 text-[10px] font-bold text-white">
            BEST SELLER
          </span>
        )}
      </div>

      <div className="relative mx-auto mt-8 h-[118px] w-[76px] flex-shrink-0 overflow-hidden rounded-md bg-white sm:mr-4 sm:mt-7 sm:h-[132px] sm:w-[76px]">
        {isExternal ? (
          <img
            src={imgSrc}
            alt={productTitle}
            className="absolute inset-0 w-full h-full scale-[2.05] object-contain transition-transform duration-300 group-hover:scale-[2.16]"
          />
        ) : (
          <Image
            src={imgSrc}
            alt={productTitle}
            fill
            sizes="80px"
            className="scale-[2.05] object-contain transition-transform duration-300 group-hover:scale-[2.16]"
          />
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 pt-4 text-center sm:pt-7 sm:text-left">
        <p className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-[#1C2E6B]">
          {productTitle}
        </p>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
          {compatibilityText}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#1C2E6B]">
            ₹{price.toLocaleString("en-IN")}
          </span>
          {originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
