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

const CATEGORY_ICONS = {
  "tv-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  "ac-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/>
    </svg>
  ),
  "set-top-box-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="2" y="7" width="20" height="10" rx="2"/><path d="M7 12h.01M12 12h.01"/>
    </svg>
  ),
  "speaker-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  ),
  "streaming-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8z"/>
    </svg>
  ),
  "projector-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="2"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  ),
  "universal-remotes": (
    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
};

export default function CategoryCard({ category }) {
  const { name, slug, description, productCount } = category;
  const imgSrc = CATEGORY_IMAGES[slug];
  const icon = CATEGORY_ICONS[slug];

  return (
    <Link
      href={`/category/${slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-sm transition-all duration-200"
      aria-label={`Browse ${name}`}
    >
      {/* Image */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 14vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">{icon}</div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 mb-0.5">
          {icon}
          <h3 className="text-xs font-semibold text-gray-900 leading-tight">{name}</h3>
        </div>
        <p className="text-[11px] text-blue-600 font-medium">{productCount} products</p>
      </div>
    </Link>
  );
}
