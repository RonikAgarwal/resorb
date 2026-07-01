import CompatibilityHero from "@/components/home/CompatibilityHero";
import DeviceTypeSection from "@/components/home/DeviceTypeSection";
import WhatsAppHelpSection from "@/components/home/WhatsAppHelpSection";
import VideoSection from "@/components/home/VideoSection";
import BulkOrdersSection from "@/components/home/BulkOrdersSection";
import VideoMarketplaceSection from "@/components/home/VideoMarketplaceSection";
import UspStrip from "@/components/home/UspStrip";

export const metadata = {
  title: "RESORB — India's Trusted Replacement Remote Control Store",
  description:
    "Find the exact replacement remote for your TV, AC, Set-Top Box, and more. Verified compatibility. Free shipping above ₹499.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  return (
    <div className="bg-white">
      <CompatibilityHero />

      <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-4">
        <DeviceTypeSection />

        {/* Mobile-only sections preserved */}
        <WhatsAppHelpSection />
        <div className="lg:hidden">
          <VideoSection />
        </div>

        {/* Desktop: Bulk Orders + Can't Find (side by side) */}
        <BulkOrdersSection />

        {/* Desktop: Video + Marketplace (side by side) */}
        <VideoMarketplaceSection />

        {/* Desktop: USP Strip */}
        <UspStrip />
      </div>
    </div>
  );
}
