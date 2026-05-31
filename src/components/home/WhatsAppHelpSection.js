import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo.";

export default function WhatsAppHelpSection() {
  return (
    <section className="lg:hidden pb-5" aria-labelledby="whatsapp-help-heading">
      <div className="flex items-center gap-3 rounded-[18px] border border-[#DDECEE] bg-white p-3.5 shadow-sm">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#E0EEF0] text-[#009B9B]">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3" />
          </svg>
        </div>

        <div className="min-w-0 flex-1">
          <h2 id="whatsapp-help-heading" className="text-sm font-bold text-[#1C2E6B]">
            Can&apos;t find your remote?
          </h2>
          <p className="mt-0.5 text-[11px] leading-snug text-gray-500">
            Send us a photo on WhatsApp and we&apos;ll identify the exact replacement.
          </p>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-shrink-0 flex-col items-center gap-1 rounded-xl bg-[#0FA561] px-3 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-[#0C8C52]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
