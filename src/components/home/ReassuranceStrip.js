import { ShieldCheckIcon, RefreshIcon, WhatsAppIcon } from "@/components/icons";

const ITEMS = [
  { label: "10,000+ Compatible Models", icon: ShieldCheckIcon },
  { label: "30-Day Replacement", icon: RefreshIcon },
  { label: "WhatsApp Assistance", icon: WhatsAppIcon },
];

export default function ReassuranceStrip() {
  return (
    <section className="border-b border-[#DDECEE] bg-white pt-0 md:hidden" aria-label="Store reassurance">
      <div className="mx-auto flex max-w-7xl items-stretch divide-x divide-[#DDECEE] px-4 py-2.5">
        {ITEMS.map(({ label, icon: Icon }) => (
          <div key={label} className="flex flex-1 items-center justify-center gap-1.5 px-1">
            <Icon className="h-3.5 w-3.5 flex-shrink-0 text-[#009B9B]" />
            <span className="text-center text-[10px] font-semibold leading-tight text-[#1C2E6B]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
