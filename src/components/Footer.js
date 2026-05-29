import Image from "next/image";
import Link from "next/link";
import ResorbWordmark from "@/components/ResorbWordmark";

const CATEGORY_LINKS = [
  { name: "TV Remotes", href: "/category/tv-remotes" },
  { name: "AC Remotes", href: "/category/ac-remotes" },
  { name: "Set-Top Box", href: "/category/set-top-box-remotes" },
  { name: "Home Theatre", href: "/category/speaker-remotes" },
  { name: "Streaming", href: "/category/streaming-remotes" },
  { name: "Projector", href: "/category/projector-remotes" },
  { name: "Universal", href: "/category/universal-remotes" },
];

const SUPPORT_LINKS = [
  { name: "Track Order", href: "/track" },
  { name: "Return Policy", href: "/return-policy" },
  { name: "Shipping Policy", href: "/shipping" },
  { name: "Contact Us", href: "/contact" },
  { name: "Compatibility Help", href: "/help" },
  { name: "About RESORB", href: "/about" },
];

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20finding%20the%20right%20replacement%20remote.%20I%20can%20share%20a%20photo.";

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM10 15.464L15.908 12 10 8.536v6.928z" clipRule="evenodd" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
    <footer className="relative overflow-hidden text-slate-300">
      <section className="relative h-[105px] sm:h-[130px] overflow-hidden bg-[#1C2E6B]" aria-labelledby="compatibility-strip-heading">
        <Image
          src="/images/brand/resorb-compatibility-footer.png"
          alt="Trusted compatibility with Samsung, LG, Sony, Mi, Panasonic, Voltas, and Tata Play."
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 15%" }}
        />
        <div className="absolute inset-0 bg-[#1C2E6B]/40" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-transparent to-[#1C2E6B]" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end justify-center px-4 pb-3 text-center">
          <div>
            <h2 id="compatibility-strip-heading" className="sr-only">
              Trusted Compatibility Across 10,000+ Device Models
            </h2>
          </div>
        </div>
      </section>

      <section className="relative bg-[#1C2E6B]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:pr-4">
              <div className="mb-2">
                <ResorbWordmark size="sm" light={true} />
              </div>
              <p className="text-[13.5px] leading-relaxed text-slate-300">
                India&apos;s trusted replacement remote store.
              </p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-slate-400">
                Verified compatibility across 10,000+ device models.
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
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="YouTube">
                  <YouTubeIcon />
                </a>
                <a href="mailto:support@resorb.in" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Email">
                  <EmailIcon />
                </a>
              </div>
            </div>

            <div className="pl-0 md:pl-6">
              <FooterHeading>Categories</FooterHeading>
              <ul className="mt-4 space-y-2">
                {CATEGORY_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13.5px] text-slate-400 transition-colors hover:text-white">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

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

            <div>
              <div className="rounded-xl border border-white/10 bg-black/15 p-4 lg:p-5 h-full relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                  <svg width="80" height="80" fill="none" viewBox="0 0 100 100">
                    <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#20D6C7" />
                    </pattern>
                    <rect x="0" y="0" width="100" height="100" fill="url(#dots)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#13B958]/15 text-[#20D6C7]">
                    <WhatsAppIcon className="h-4 w-4" />
                  </div>
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

        <div className="border-t border-white/10 mt-0">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 text-[12.5px] text-white/60 md:flex-row">
            <p>© 2025 RESORB. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <span className="text-white/10">|</span>
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <span className="text-white/10">|</span>
              <Link href="/refund" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
