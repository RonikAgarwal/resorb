import Image from "next/image";

const LOGO_SIZES = {
  sm: { width: 125, height: 40 },
  md: { width: 158, height: 50 },
  lg: { width: 238, height: 76 },
};

export default function ResorbWordmark({ size = "md", light = false }) {
  const logoSize = LOGO_SIZES[size] || LOGO_SIZES.md;

  return (
    <span
      className="inline-flex select-none"
      style={{ lineHeight: 0 }}
      aria-label="RESORB"
    >
      <Image
        src="/images/brand/resorb-logo.png"
        alt="RESORB"
        width={logoSize.width}
        height={logoSize.height}
        unoptimized
        draggable="false"
        className={`block h-auto max-w-full ${light ? "brightness-0 invert" : ""}`}
      />
    </span>
  );
}
