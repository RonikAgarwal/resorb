import VideoShowcase from "@/components/ui/VideoShowcase";

export default function VideoSection() {
  return (
    <section className="py-8" aria-labelledby="resorb-video-heading">
      <div className="mb-5">
        <h2 id="resorb-video-heading" className="text-2xl font-bold" style={{ color: "#1C2E6B" }}>
          RESORB in Action
        </h2>
        <p className="text-sm text-gray-500 mt-1">A quick look at the replacement remote experience.</p>
      </div>

      <div className="w-full">
        <VideoShowcase />
      </div>
    </section>
  );
}
