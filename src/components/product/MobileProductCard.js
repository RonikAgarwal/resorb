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

export default function MobileProductCard({ product }) {
  const { id, price, originalPrice, discount, rating, reviewCount, compatibleBrands = [], inStock, category, popular } = product;
  const imgSrc = CATEGORY_IMAGES[category] || "/images/remotes/tv.png";
  const primaryBrand = compatibleBrands[0] || "RESORB";
  const categoryLabel = CATEGORY_LABELS[category] || "Replacement Remote";
  const productTitle = `${primaryBrand} ${categoryLabel}`;

  return (
    <Link
      href={`/product/${id}`}
      className="group flex w-[180px] flex-shrink-0 flex-col overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
      aria-label={productTitle}
    >
      <div className="relative h-[140px] bg-[#F8FAFA] p-3">
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="rounded bg-emerald-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              {discount}% OFF
            </span>
          )}
          {popular && (
            <span className="rounded bg-[#1C2E6B] px-1.5 py-0.5 text-[9px] font-bold text-white">
              BESTSELLER
            </span>
          )}
        </div>
        <div className="relative mx-auto h-full w-[70px]">
          <Image
            src={imgSrc}
            alt={productTitle}
            fill
            sizes="70px"
            className="object-contain"
          />
        </div>
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 pt-2">
        <p className="line-clamp-2 text-xs font-bold leading-snug text-[#1C2E6B]">{productTitle}</p>

        <div className="mt-1.5 flex items-center gap-1">
          <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-[11px] font-semibold text-[#1C2E6B]">{rating.toFixed(1)}</span>
          <span className="text-[10px] text-gray-400">({reviewCount})</span>
        </div>

        <div className="mt-auto flex items-baseline gap-1.5 pt-2">
          <span className="text-base font-bold text-[#1C2E6B]">₹{price.toLocaleString("en-IN")}</span>
          {originalPrice > price && (
            <span className="text-[10px] text-gray-400 line-through">
              ₹{originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
