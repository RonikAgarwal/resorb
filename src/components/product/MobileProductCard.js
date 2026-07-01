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
  // Support both old hardcoded shape and new DB shape
  const id = product.id;
  const price = product.price;
  const originalPrice = product.mrp || product.originalPrice || price;
  const discount = product.discount || 0;
  const inStock = product.in_stock !== undefined ? product.in_stock : product.inStock;
  const category = product.category;
  const popular = product.popular;
  const compatibleBrands = product.compatible_brands || product.compatibleBrands || [];

  const hasProductImages = product.images && product.images.length > 0 && product.images[0].startsWith("http");
  const imgSrc = hasProductImages ? product.images[0] : CATEGORY_IMAGES[category] || "/images/remotes/tv.png";
  const isExternal = imgSrc.startsWith("http");

  const primaryBrand = compatibleBrands[0] || product.brand || "RESORB";
  const categoryLabel = CATEGORY_LABELS[category] || "Replacement Remote";
  const productTitle = product.item_name || product.title || `${primaryBrand} ${categoryLabel}`;

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
          {isExternal ? (
            <img
              src={imgSrc}
              alt={productTitle}
              className="absolute inset-0 w-full h-full object-contain"
            />
          ) : (
            <Image
              src={imgSrc}
              alt={productTitle}
              fill
              sizes="70px"
              className="object-contain"
            />
          )}
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
        <span className="mb-1 text-[10px] font-medium text-gray-500 uppercase tracking-wider">{primaryBrand}</span>
        <p className="line-clamp-2 text-xs font-bold leading-snug text-[#1C2E6B]">{productTitle}</p>

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
