import CompatibilityHero from "@/components/home/CompatibilityHero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DeviceTypeSection from "@/components/home/DeviceTypeSection";
import WhatsAppHelpSection from "@/components/home/WhatsAppHelpSection";
import VideoSection from "@/components/home/VideoSection";
import { getPopularProducts } from "@/lib/products";

export const metadata = {
  title: "RESORB — India's Trusted Replacement Remote Control Store",
  description:
    "Find the exact replacement remote for your TV, AC, Set-Top Box, and more. Verified compatibility. Plug & play. Free shipping above ₹499.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await getPopularProducts(10);

  return (
    <div className="bg-white">
      <CompatibilityHero />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-4">
        <DeviceTypeSection />
        <FeaturedProducts products={featuredProducts} />
        <WhatsAppHelpSection />
        <VideoSection />
      </div>
    </div>
  );
}
