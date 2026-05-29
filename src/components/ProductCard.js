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

function ProductRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <svg className="h-3.5 w-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      <span className="font-semibold text-[#1C2E6B]">{rating.toFixed(1)}</span>
      <span className="text-gray-500">({count})</span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { id, title, price, originalPrice, discount, rating, reviewCount, compatibleBrands = [], inStock, category, popular } = product;
  const imgSrc = CATEGORY_IMAGES[category] || "/images/remotes/tv.png";
  const primaryBrand = compatibleBrands[0] || "RESORB";
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
        <Image
          src={imgSrc}
          alt={productTitle}
          fill
          sizes="80px"
          className="scale-[2.05] object-contain transition-transform duration-300 group-hover:scale-[2.16]"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1 pt-4 text-center sm:pt-7 sm:text-left">
        <p className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-[#1C2E6B]">{productTitle}</p>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-600">{compatibilityText}</p>

        <ProductRating rating={rating} count={reviewCount} />

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#1C2E6B]">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice > price && (
            <span className="text-xs text-gray-400 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
