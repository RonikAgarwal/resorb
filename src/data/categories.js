import {
  AcIcon,
  TvIcon,
  SetTopBoxIcon,
  SpeakerIcon,
  ProjectorIcon,
  FanIcon,
} from "@/components/icons";

/**
 * RESORB Product Categories
 * 6 confirmed categories — single source of truth
 */
export const categories = [
  {
    id: "tv-remotes",
    name: "LED TV Remotes",
    slug: "tv-remotes",
    description: "Find replacement remotes for Samsung, LG, Sony, Mi, and other popular LED TV brands.",
    icon: TvIcon,
    seoTitle: "Buy LED TV Replacement Remotes Online | RESORB",
    seoDescription: "Shop for compatible LED TV remotes for Samsung, LG, Sony, Mi, and more. 100% tested, fast delivery.",
  },
  {
    id: "ac-remotes",
    name: "AC Remotes",
    slug: "ac-remotes",
    description: "Compatible remotes for Voltas, Daikin, LG, Lloyd, and all major AC brands.",
    icon: AcIcon,
    seoTitle: "Buy AC Replacement Remotes Online | RESORB",
    seoDescription: "Find exact match replacement AC remotes for Voltas, Daikin, LG, Lloyd. Guaranteed compatibility.",
  },
  {
    id: "set-top-box-remotes",
    name: "Set-Top Box & Streaming",
    slug: "set-top-box-remotes",
    description: "Replacement remotes for Tata Play, Airtel Digital TV, Dish TV, Fire TV, Apple TV, and Android boxes.",
    icon: SetTopBoxIcon,
    seoTitle: "Set-Top Box & Streaming Remotes | RESORB",
    seoDescription: "Buy replacement remotes for DTH set-top boxes and streaming devices like Fire TV stick and Apple TV.",
  },
  {
    id: "speaker-remotes",
    name: "Home Theatre Remotes",
    slug: "speaker-remotes",
    description: "Control your soundbars, home theatres, and multimedia speaker systems.",
    icon: SpeakerIcon,
    seoTitle: "Home Theatre & Soundbar Remotes | RESORB",
    seoDescription: "Shop replacement remotes for home theatres, soundbars, and speaker systems.",
  },
  {
    id: "projector-remotes",
    name: "Projector Remotes",
    slug: "projector-remotes",
    description: "Replacement remotes for BenQ, Epson, Sony, and other home/office projectors.",
    icon: ProjectorIcon,
    seoTitle: "Projector Replacement Remotes | RESORB",
    seoDescription: "Find compatible remote controls for all major projector brands.",
  },
  {
    id: "fan-remotes",
    name: "Fan Remotes",
    slug: "fan-remotes",
    description: "Replacement remotes for BLDC ceiling fans, pedestal fans, and tower fans.",
    icon: FanIcon,
    seoTitle: "Fan Replacement Remotes | RESORB",
    seoDescription: "Buy replacement remotes for smart ceiling fans and pedestal fans.",
  },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}
