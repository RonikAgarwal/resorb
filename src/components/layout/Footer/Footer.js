import Link from "next/link";
import ResorbWordmark from "@/components/ui/ResorbWordmark";
import { WhatsAppIcon } from "@/components/icons";

const SUPPORT_LINKS = [
  { name: "Track Order", href: "/track" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "Contact Us", href: "/contact" },
  { name: "Compatibility Help", href: "/help" },
];

const INFO_LINKS = [
  { name: "About RESORB", href: "/about" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Refund Policy", href: "/refund" },
];

const WHATSAPP_URL =
  "https://wa.me/917011779887?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo.";

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
  );
}

function FooterHeading({ children, tone = "light" }) {
  return (
    <h3 className={`font-bold uppercase ${tone === "dark" ? "text-[13px] text-[#1C2E6B]" : "text-[12px] text-white"}`}>
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer>
      {/* Main footer — desktop */}
      <section className="hidden border-y border-gray-100 bg-white lg:block">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-[1.16fr_0.78fr_0.78fr_1.05fr] items-start gap-10">
            {/* Column 1 — Brand */}
            <div>
              <div className="mb-4">
                <ResorbWordmark size="sm" />
              </div>
              <p className="max-w-[250px] text-[14px] leading-relaxed text-gray-600">
                India&apos;s trusted replacement remote store.
              </p>
              <p className="mt-2 max-w-[250px] text-[13px] leading-relaxed text-gray-500">
                Verified compatibility across 10,000+ device models.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#009B9B]/10 text-[#009B9B]">
                  <WhatsAppIcon className="h-4 w-4" />
                </div>
                <a
                  href="tel:+917011779887"
                  className="text-[15px] font-bold text-[#009B9B] transition-colors hover:text-[#1C2E6B]"
                >
                  +91 70117 79887
                </a>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1C2E6B] transition-colors hover:border-[#009B9B] hover:bg-[#F8FBFC] hover:text-[#009B9B]" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="mailto:support@resorb.in" className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-[#1C2E6B] transition-colors hover:border-[#009B9B] hover:bg-[#F8FBFC] hover:text-[#009B9B]" aria-label="Email">
                  <EmailIcon />
                </a>
              </div>
            </div>

            {/* Column 2 — Support */}
            <div>
              <FooterHeading tone="dark">Support</FooterHeading>
              <ul className="mt-5 space-y-3">
                {SUPPORT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[14px] text-gray-500 transition-colors hover:text-[#1C2E6B]">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Information */}
            <div>
              <FooterHeading tone="dark">Information</FooterHeading>
              <ul className="mt-5 space-y-3">
                {INFO_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[14px] text-gray-500 transition-colors hover:text-[#1C2E6B]">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — WhatsApp CTA */}
            <div>
              <div className="rounded-2xl border border-gray-200 bg-[#F8FBFC] p-6 shadow-[0_12px_30px_rgba(28,46,107,0.06)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#0FA561]/10 text-[#0FA561]">
                  <WhatsAppIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold leading-snug text-[#1C2E6B]">
                  Need help finding the right remote?
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-gray-500">
                  Send us a photo on WhatsApp and we&apos;ll help you find the perfect match.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0FA561] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(15,165,97,0.18)] transition-colors hover:bg-[#0C8C52]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-100 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-4 text-[12.5px] text-gray-500">
            <p>© 2025 RESORB. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Mobile footer — preserved from original */}
      <section className="bg-[#1C2E6B] text-slate-300 lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-5">
          <div className="flex flex-col gap-5">
            <div>
              <ResorbWordmark size="sm" light={true} />
              <p className="mt-2 text-[13px] leading-relaxed text-slate-300">
                India&apos;s trusted replacement remote store.
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-slate-400">
                Verified compatibility across 10,000+ device models.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#009B9B]/20 text-[#20D6C7]">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </div>
                <a
                  href="tel:+917011779887"
                  className="text-sm font-semibold text-[#20D6C7] transition-colors hover:text-white"
                >
                  +91 70117 79887
                </a>
              </div>
            </div>

            <div>
              <FooterHeading>Support</FooterHeading>
              <ul className="mt-3 space-y-2">
                {[...SUPPORT_LINKS, ...INFO_LINKS].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13px] text-slate-400 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2.5">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="mailto:support@resorb.in" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Email">
                <EmailIcon />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-3 text-[12px] text-white/60">
            <p>© 2025 RESORB. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
