import { WhatsAppIcon } from "@/components/icons";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%2C%20I%20need%20bulk%20pricing%20for%20replacement%20remotes.";

export default function BulkOrdersSection() {
  return (
    <section className="hidden lg:block py-8" aria-labelledby="bulk-orders-heading">
      <div className="flex gap-6">
        {/* Bulk Orders Card */}
        <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4FAFA] text-[#1C2E6B]">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 id="bulk-orders-heading" className="text-xl font-bold text-[#1C2E6B]">
                Need Bulk Quantities?
              </h2>
              <p className="mt-2 text-sm text-gray-500">Remote requirements for:</p>
              <ul className="mt-2 space-y-1">
                {["Dealers", "Service Centers", "Retail Stores", "Corporate Orders"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                    <svg className="h-4 w-4 flex-shrink-0 text-[#009B9B]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp side */}
            <div className="flex flex-col items-end gap-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0FA561]/10 text-[#0FA561]">
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500">WhatsApp Us</p>
                  <p className="text-sm font-bold text-[#1C2E6B]">+91 98765 43210</p>
                </div>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#1C2E6B] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#162352]"
              >
                Get Bulk Pricing
              </a>
            </div>
          </div>
        </div>

        {/* Can't Find Your Remote Card */}
        <div className="w-[340px] flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4FAFA] text-[#1C2E6B]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1C2E6B]">Can&apos;t Find Your Remote?</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                Send us a photo of your remote on WhatsApp and we&apos;ll help you find the perfect match.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0FA561] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0C8C52]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
