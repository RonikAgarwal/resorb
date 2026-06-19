"use client";

import VideoShowcase from "@/components/ui/VideoShowcase";

function AmazonLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 260 96" className={className} role="img" aria-label="Amazon">
      <text x="28" y="52" fill="#221F1F" fontFamily="Arial, Helvetica, sans-serif" fontSize="56" fontWeight="800">
        amazon
      </text>
      <path d="M83 66c31 18 85 18 124-4" fill="none" stroke="#FF9900" strokeLinecap="round" strokeWidth="8" />
      <path d="M199 62c12-3 19-2 24 3-2 7-7 14-14 21" fill="none" stroke="#FF9900" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
    </svg>
  );
}

function FlipkartLogo({ className = "" }) {
  return (
    <img 
      src="/images/flipkart-logo.png" 
      alt="Flipkart" 
      className={className} 
      style={{ objectFit: 'contain' }} 
    />
  );
}

function JioMartLogo({ className = "h-12 w-full" }) {
  return (
    <svg viewBox="0 0 180 56" className={className} role="img" aria-label="JioMart">
      <circle cx="43" cy="28" r="22" fill="#D71920" />
      <text x="43" y="33" fill="#FFFFFF" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="700" textAnchor="middle">
        Jio
      </text>
      <text x="70" y="34" fill="#202124" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="700">
        Mart
      </text>
    </svg>
  );
}

function MeeshoLogo({ className = "h-12 w-full" }) {
  return (
    <svg viewBox="0 0 180 56" className={className} role="img" aria-label="Meesho">
      <text x="20" y="35" fill="#E43D8B" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700">
        meesho
      </text>
      <circle cx="143" cy="18" r="4" fill="#E43D8B" opacity="0.75" />
      <circle cx="154" cy="24" r="3" fill="#7B1B73" opacity="0.7" />
    </svg>
  );
}

function IndiaMartLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 300 132" className={className} role="img" aria-label="IndiaMART">
      <g transform="translate(111 6)">
        <ellipse cx="39" cy="31" rx="43" ry="29" fill="#D92C2D" />
        <ellipse cx="39" cy="31" rx="43" ry="29" fill="url(#indiamart-shine)" opacity="0.42" />
        <circle cx="23" cy="4" r="10" fill="#D92C2D" />
        <circle cx="60" cy="7" r="13" fill="#D92C2D" />
        <path d="M16 49 23 15c2-7 12-8 15-1l17 35 17-34c3-7 14-6 16 2l7 32" fill="none" stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="14" />
      </g>
      <text x="5" y="119" fill="#424392" fontFamily="Arial, Helvetica, sans-serif" fontSize="58" fontWeight="900">
        indiamart
      </text>
      <defs>
        <linearGradient id="indiamart-shine" x1="6" x2="60" y1="5" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6D8B" />
          <stop offset="1" stopColor="#6D141C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const MARKETPLACES = [
  { 
    name: "Amazon", 
    Logo: AmazonLogo, 
    logoClass: "h-[40px] w-auto transition-transform hover:scale-105",
    href: "https://www.amazon.in/stores/page/E8766C51-DBF5-4F70-B3A7-55260A16ED3E?ingress=0&visitId=3a02f85d-7069-4bea-ad19-4d636f515010"
  },
  { name: "Flipkart", Logo: FlipkartLogo, logoClass: "h-[90px] w-auto transition-transform hover:scale-105" },
  { name: "JioMart", Logo: JioMartLogo, logoClass: "h-[40px] w-auto transition-transform hover:scale-105" },
  { name: "Meesho", Logo: MeeshoLogo, logoClass: "h-[40px] w-auto transition-transform hover:scale-105" },
  { name: "IndiaMART", Logo: IndiaMartLogo, logoClass: "h-[40px] w-auto transition-transform hover:scale-105" },
];

export default function VideoMarketplaceSection() {
  return (
    <section className="hidden lg:block pb-10" aria-labelledby="video-marketplace-heading">
      <div className="flex flex-col w-full max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Headings */}
        <div className="text-center mb-6">
          <h2 id="video-marketplace-heading" className="text-3xl font-bold tracking-tight text-gray-900">
            RESORB in Action
          </h2>
          <p className="mt-2 text-base text-gray-600">
            See how we help you find the right replacement remote.
          </p>
        </div>

        {/* Compact Trust Bar */}
        <div className="text-center mb-8">
          <p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-4">
            Available on
          </p>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-14 bg-white rounded-xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] px-8 py-4 w-fit overflow-visible max-w-full">
            {MARKETPLACES.map(({ name, Logo, logoClass, href }) => {
              const Wrapper = href ? 'a' : 'div';
              const wrapperProps = href ? { href, target: "_blank", rel: "noopener noreferrer" } : {};
              
              return (
                <Wrapper key={name} className={`flex items-center justify-center h-10 overflow-visible ${href ? 'cursor-pointer' : ''}`} aria-label={`${name} marketplace`} {...wrapperProps}>
                  <Logo className={logoClass} style={{ objectFit: 'contain' }} />
                </Wrapper>
              );
            })}
          </div>
        </div>

        {/* Full Width Video */}
        <div className="rounded-[24px] overflow-hidden border border-gray-100 shadow-sm w-full bg-gray-900">
          <VideoShowcase />
        </div>
      </div>
    </section>
  );
}
