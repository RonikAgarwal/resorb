import CompatibilityHero from "@/components/home/CompatibilityHero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DeviceTypeSection from "@/components/home/DeviceTypeSection";
import VideoSection from "@/components/home/VideoSection";
import { getPopularProducts } from "@/data/products";

export const metadata = {
  title: "RESORB — India's Trusted Replacement Remote Control Store",
  description:
    "Find the exact replacement remote for your TV, AC, Set-Top Box, and more. Verified compatibility. Plug & play. Free shipping above ₹499.",
};

export default function HomePage() {
  const featuredProducts = getPopularProducts().slice(0, 10);

  return (
    <div className="bg-white">
      <CompatibilityHero />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <DeviceTypeSection />
        <FeaturedProducts products={featuredProducts} />
        <VideoSection />
      </div>
    </div>
  );
}
