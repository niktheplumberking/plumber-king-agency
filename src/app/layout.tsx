import type { Metadata, Viewport } from "next";
import { Open_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Bobo } from "@/components/Bobo";
import { JsonLd } from "@/components/JsonLd";
import { organizationLd, websiteLd } from "@/lib/seo";

/**
 * Critical CSS inlined in <head>: the load-in (Nick 2026-10-22, every fresh load or hard refresh), so the first screen
 * animates from plain CSS before any JavaScript loads. [data-intro] elements rise in one after another (--id = delay);
 * the header slides down ([data-intro=bar]). The video is never animated. Done in about 1.2 s; RevealObserver adds
 * pk-intro-done after that so in-app navigation never replays it. Reduced motion: a short fade only.
 */
const criticalCss = `
@keyframes pk-fade{from{transform:translateY(14px)}}
@keyframes pk-slide{from{transform:translateX(40px) scale(.96)}}
@keyframes pk-intro{from{opacity:0;transform:translateY(18px)}}
@keyframes pk-intro-bar{from{transform:translateY(-100%)}}
@keyframes pk-intro-in{from{opacity:0}}
.enter-fade{animation:pk-fade .6s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
.enter-slide{animation:pk-slide .6s cubic-bezier(.16,1,.3,1) var(--d,0s) both}
.js:not(.pk-intro-done) [data-intro]{animation:pk-intro .6s cubic-bezier(.23,1,.32,1) var(--id,0s) both}
.js:not(.pk-intro-done) [data-intro=bar]{animation-name:pk-intro-bar;animation-duration:.5s}
@media (max-width:767px){.js:not(.pk-intro-done) [data-intro]{animation-duration:.5s}}
@media (prefers-reduced-motion:reduce){.enter-fade,.enter-slide{animation:none}.js:not(.pk-intro-done) [data-intro]{animation-name:pk-intro-in!important;animation-duration:.25s!important}}
`;

// Two fonts only, site-wide (Nick, 2026-10-15 13:13): Urbanist for titles, Open Sans for body. Next sizes each font's
// fallback to its metrics (adjustFontFallback), so text wraps the same before and after the font loads.
const display = Urbanist({ subsets: ["latin"], weight: ["800", "900"], variable: "--font-urbanist", display: "swap" });
// Urbanist's own italic (same family), only for the slanted giant words Nick asked for (2026-10-17): "0 GUESSWORK"
// and the footer name. Not preloaded, so it never competes with the first paint.
const slant = Urbanist({ subsets: ["latin"], weight: ["900"], style: ["italic"], variable: "--font-urbanist-italic", display: "swap", preload: false });
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
  // Favicon and phone icon come from src/app/icon.png and apple-icon.png (head-only Bobo, Brand DNA 2026-10-16).
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" suppressHydrationWarning className={`${display.variable} ${slant.variable} ${body.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        {/* Scroll reveals hide content only when JavaScript is running to show it again. */}
        {/* Safety net: if the page's scripts never start (RevealObserver adds pk-ready), drop the class after 5 s so
            nothing waits hidden for an animation that will never run. */}
        <script dangerouslySetInnerHTML={{ __html: "(function(d){d.classList.add('js');setTimeout(function(){if(!d.classList.contains('pk-ready'))d.classList.remove('js')},5000)})(document.documentElement)" }} />
      </head>
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <SmoothScroll />
        <Bobo />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
