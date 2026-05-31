import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "RESORB — Replacement Remote Controls | India's Trusted Remote Store",
    template: "%s | RESORB",
  },
  description:
    "Find the exact replacement remote for your TV, AC, Set-Top Box, Speaker, or Streaming Device. Verified compatibility, plug & play, free shipping above ₹499. WhatsApp support available.",
  keywords: [
    "replacement remote",
    "TV remote",
    "AC remote",
    "remote control",
    "compatible remote",
    "Samsung remote",
    "Mi TV remote",
    "Voltas AC remote",
    "set top box remote",
    "RESORB",
  ],
  authors: [{ name: "RESORB" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "RESORB",
    title: "RESORB — Replacement Remote Controls",
    description:
      "Find the exact replacement remote for your device. Verified compatibility. Plug & play. WhatsApp support.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#f8f9fa] text-[#1a1a2e] antialiased">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
