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
  "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo.";

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

function FooterHeading({ children }) {
  return (
    <h3 className="text-[13px] font-bold uppercase tracking-wider text-white">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer className="text-slate-300">
      {/* Main footer — desktop */}
      <section className="hidden lg:block bg-[#1C2E6B]">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-4 gap-8">
            {/* Column 1 — Brand */}
            <div>
              <div className="mb-3">
                <ResorbWordmark size="sm" light={true} />
              </div>
              <p className="text-[13.5px] leading-relaxed text-slate-300">
                India&apos;s trusted replacement remote store.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#009B9B]/20 text-[#20D6C7]">
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </div>
                <a
                  href="tel:+919876543210"
                  className="text-sm font-semibold text-[#20D6C7] transition-colors hover:text-white"
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="mailto:support@resorb.in" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Email">
                  <EmailIcon />
                </a>
              </div>
            </div>

            {/* Column 2 — Support */}
            <div>
              <FooterHeading>Support</FooterHeading>
              <ul className="mt-4 space-y-2">
                {SUPPORT_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13.5px] text-slate-400 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Information */}
            <div>
              <FooterHeading>Information</FooterHeading>
              <ul className="mt-4 space-y-2">
                {INFO_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13.5px] text-slate-400 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — WhatsApp CTA */}
            <div>
              <div className="rounded-xl border border-white/10 bg-black/15 p-5 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                  <svg width="80" height="80" fill="none" viewBox="0 0 100 100">
                    <pattern id="footer-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#20D6C7" />
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#footer-dots)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <h3 className="text-[16px] font-bold leading-snug text-white">
                    Need help finding<br/>the right remote?
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-400 pr-2">
                    Send us a photo on WhatsApp and we&apos;ll help you find the perfect match.
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#0FA561] px-4 py-2 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0C8C52]"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-3 text-[12.5px] text-white/60">
            <p>© 2025 RESORB. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Mobile footer — preserved from original */}
      <section className="lg:hidden bg-[#1C2E6B]">
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
                  href="tel:+919876543210"
                  className="text-sm font-semibold text-[#20D6C7] transition-colors hover:text-white"
                >
                  +91 98765 43210
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
