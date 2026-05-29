/**
 * RESORB Device Brands
 * These are the DEVICE brands (Samsung, LG, Voltas etc.) — not RESORB itself.
 * Each brand has a categories[] array indicating which remote categories it appears in.
 */
export const brands = [
  // TV brands
  { id: "samsung", name: "Samsung", slug: "samsung", categories: ["tv-remotes", "ac-remotes", "speaker-remotes"] },
  { id: "lg", name: "LG", slug: "lg", categories: ["tv-remotes", "ac-remotes", "speaker-remotes"] },
  { id: "sony", name: "Sony", slug: "sony", categories: ["tv-remotes", "speaker-remotes", "projector-remotes"] },
  { id: "mi", name: "Mi / Xiaomi", slug: "mi", categories: ["tv-remotes", "streaming-remotes"] },
  { id: "oneplus", name: "OnePlus", slug: "oneplus", categories: ["tv-remotes"] },
  { id: "tcl", name: "TCL", slug: "tcl", categories: ["tv-remotes"] },
  { id: "vu", name: "VU", slug: "vu", categories: ["tv-remotes"] },
  { id: "panasonic", name: "Panasonic", slug: "panasonic", categories: ["tv-remotes", "ac-remotes"] },
  { id: "hisense", name: "Hisense", slug: "hisense", categories: ["tv-remotes"] },
  { id: "realme", name: "Realme", slug: "realme", categories: ["tv-remotes"] },
  { id: "micromax", name: "Micromax", slug: "micromax", categories: ["tv-remotes"] },
  // AC brands
  { id: "voltas", name: "Voltas", slug: "voltas", categories: ["ac-remotes"] },
  { id: "daikin", name: "Daikin", slug: "daikin", categories: ["ac-remotes"] },
  { id: "bluestar", name: "Blue Star", slug: "bluestar", categories: ["ac-remotes"] },
  { id: "carrier", name: "Carrier", slug: "carrier", categories: ["ac-remotes"] },
  { id: "hitachi", name: "Hitachi", slug: "hitachi", categories: ["ac-remotes"] },
  { id: "godrej", name: "Godrej", slug: "godrej", categories: ["ac-remotes"] },
  { id: "lloyd", name: "Lloyd", slug: "lloyd", categories: ["ac-remotes"] },
  { id: "whirlpool", name: "Whirlpool", slug: "whirlpool", categories: ["ac-remotes"] },
  { id: "haier", name: "Haier", slug: "haier", categories: ["ac-remotes"] },
  // STB brands
  { id: "tataplay", name: "Tata Play", slug: "tataplay", categories: ["set-top-box-remotes"] },
  { id: "airtel", name: "Airtel Xstream", slug: "airtel", categories: ["set-top-box-remotes"] },
  { id: "dishtv", name: "Dish TV", slug: "dishtv", categories: ["set-top-box-remotes"] },
  { id: "d2h", name: "Videocon D2H", slug: "d2h", categories: ["set-top-box-remotes"] },
  { id: "sundirect", name: "Sun Direct", slug: "sundirect", categories: ["set-top-box-remotes"] },
  { id: "jio", name: "JioTV / JioFiber", slug: "jio", categories: ["set-top-box-remotes"] },
  // Speaker brands
  { id: "boat", name: "boAt", slug: "boat", categories: ["speaker-remotes"] },
  { id: "jbl", name: "JBL", slug: "jbl", categories: ["speaker-remotes"] },
  { id: "zebronics", name: "Zebronics", slug: "zebronics", categories: ["speaker-remotes"] },
  { id: "philips", name: "Philips", slug: "philips", categories: ["speaker-remotes", "tv-remotes"] },
  // Streaming brands
  { id: "amazon", name: "Amazon Fire TV", slug: "amazon", categories: ["streaming-remotes"] },
  { id: "mibox", name: "Mi Box", slug: "mibox", categories: ["streaming-remotes"] },
  { id: "appletv", name: "Apple TV", slug: "appletv", categories: ["streaming-remotes"] },
  // Projector brands
  { id: "epson", name: "Epson", slug: "epson", categories: ["projector-remotes"] },
  { id: "benq", name: "BenQ", slug: "benq", categories: ["projector-remotes"] },
  { id: "viewsonic", name: "ViewSonic", slug: "viewsonic", categories: ["projector-remotes"] },
  { id: "optoma", name: "Optoma", slug: "optoma", categories: ["projector-remotes"] },
];

export function getBrandsByCategory(categorySlug) {
  return brands.filter((b) => b.categories.includes(categorySlug));
}

export function getBrandBySlug(slug) {
  return brands.find((b) => b.slug === slug) || null;
}
