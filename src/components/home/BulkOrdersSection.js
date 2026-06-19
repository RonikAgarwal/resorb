import { WhatsAppIcon } from "@/components/icons";

const BULK_WHATSAPP_URL =
  "https://wa.me/917011779887?text=Hi%2C%20I%20need%20bulk%20pricing%20for%20replacement%20remotes.";
const FIND_REMOTE_WHATSAPP_URL =
  "https://wa.me/917011779887?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo.";

export default function BulkOrdersSection() {
  return (
    <section className="hidden lg:block py-6" aria-labelledby="find-remote-heading bulk-orders-heading">
      <div className="grid grid-cols-2 items-stretch gap-6">
        {/* Can't Find Your Remote Card */}
        <div className="group min-h-[260px] rounded-2xl bg-gray-50 p-8 transition-colors hover:bg-gray-100 border border-gray-100">
          <div className="flex h-full items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
            </div>
            <div className="min-w-0">
              <h2 id="find-remote-heading" className="text-2xl font-bold leading-tight text-gray-900">
                Can&apos;t Find Your Remote?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Send us a photo of your remote on WhatsApp and we&apos;ll help you find the perfect match.
              </p>
              <a
                href={FIND_REMOTE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bulk Orders Card */}
        <div className="group min-h-[260px] rounded-2xl bg-gray-50 p-8 transition-colors hover:bg-gray-100 border border-gray-100">
          <div className="grid h-full grid-cols-[auto_minmax(0,1fr)_minmax(190px,auto)] items-center gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-gray-700 shadow-sm">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
              </div>
            </div>

            {/* Content */}
            <div className="min-w-0 border-r border-gray-200 pr-6">
              <h2 id="bulk-orders-heading" className="text-2xl font-bold leading-tight text-gray-900">
                Need Bulk Quantities?
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-2">
                {["Dealers", "Service Centers", "Retail Stores", "Corporate Orders"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="h-4 w-4 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA side */}
            <div className="flex min-w-0 flex-col justify-center pl-2">
              <div className="mb-4 text-sm font-semibold text-gray-900">Get a quick quote</div>
              <a
                href={BULK_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Request Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
