import type { Metadata, Viewport } from "next";
import { Open_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Bobo } from "@/components/Bobo";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

/**
 * Critical CSS inlined in <head>: the hero entrance keyframes, so the first screen animates in from plain CSS
 * before any JavaScript loads (keeps LCP fast). Transform and opacity only, every entrance done within 1.5 s,
 * and nothing moves for visitors who ask for reduced motion.
 */
const criticalCss = `
@keyframes pk-rise{from{transform:translateY(105%)}}
@keyframes pk-fade{from{transform:translateY(14px)}}
@keyframes pk-slide{from{transform:translateX(40px) scale(.96)}}
@keyframes pk-pulse{50%{transform:scale(1.08)}}
@keyframes pk-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.enter-rise{animation:pk-rise .7s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
.enter-fade{animation:pk-fade .6s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
.enter-slide{animation:pk-slide .6s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
.enter-pulse{animation:pk-pulse 1.2s ease-in-out .2s both}
.enter-draw{stroke-dasharray:1;animation:pk-draw .7s cubic-bezier(.16,1,.3,1) .7s both}
@media (prefers-reduced-motion:reduce){.enter-rise,.enter-fade,.enter-slide,.enter-draw,.enter-pulse{animation:none}}
`;

// Two fonts only, site-wide (Nick, 2026-10-15 13:13): Urbanist for titles, Open Sans for body. Next sizes each font's
// fallback to its metrics (adjustFontFallback), so text wraps the same before and after the font loads.
const display = Urbanist({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-urbanist", display: "swap" });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-open-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Websites & SEO for Plumbers`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder, url: `${site.url}/about/` }],
  creator: site.name,
  publisher: site.legalEntity,
  formatDetection: { telephone: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: site.assets.logo ? { icon: site.assets.logo, apple: site.assets.logo } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Scroll reveals hide content only when JavaScript is running to show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileCtaBar />
        <RevealObserver />
        <SmoothScroll />
        <Bobo />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
