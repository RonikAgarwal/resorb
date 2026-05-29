/**
 * RESORB Product Categories
 * 7 categories matching the business vertical exactly.
 * productCount kept accurate to products.js below.
 */
export const categories = [
  {
    id: "tv-remotes",
    name: "TV Remotes",
    slug: "tv-remotes",
    description: "Compatible replacement remotes for Smart TVs, LED TVs, and LCD TVs",
    icon: "📺",
    productCount: 8,
  },
  {
    id: "ac-remotes",
    name: "AC Remotes",
    slug: "ac-remotes",
    description: "Replacement remotes for split ACs, window ACs, and cassette ACs",
    icon: "❄️",
    productCount: 8,
  },
  {
    id: "set-top-box-remotes",
    name: "Set-Top Box Remotes",
    slug: "set-top-box-remotes",
    description: "Replacement remotes for DTH and cable set-top boxes",
    icon: "📡",
    productCount: 8,
  },
  {
    id: "speaker-remotes",
    name: "Home Theatre & Speaker Remotes",
    slug: "speaker-remotes",
    description: "Replacement remotes for soundbars, home theatres, and speaker systems",
    icon: "🔊",
    productCount: 8,
  },
  {
    id: "streaming-remotes",
    name: "Streaming Device Remotes",
    slug: "streaming-remotes",
    description: "Replacement remotes for Fire TV Stick, Mi Box, Apple TV, and more",
    icon: "📱",
    productCount: 8,
  },
  {
    id: "projector-remotes",
    name: "Projector Remotes",
    slug: "projector-remotes",
    description: "Replacement remotes for home and office projectors",
    icon: "📽️",
    productCount: 8,
  },
  {
    id: "universal-remotes",
    name: "Universal & Smart Remotes",
    slug: "universal-remotes",
    description: "One remote to control multiple devices — TVs, ACs, STBs, and more",
    icon: "🎛️",
    productCount: 8,
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}
