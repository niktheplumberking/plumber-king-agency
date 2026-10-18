import { PauseMotion } from "./WalkingBobo";
import { ClipboardList, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { MarqueeRow, ScrollFx } from "../ScrollFx";
import PolaroidLineCarousel from "../ui/polaroid-line-carousel";
import Timeline from "../ui/timeline";

/*
 * Server-rendered home sections. Their markup ships as HTML; only the small ScrollFx wrappers run on the client,
 * which keeps the JavaScript small with GSAP and Lenis on board.
 */

/* ---------- Two crossing marquee bands (what we do, and the jobs we help you win) ---------- */
const what = ["Websites", "Local SEO", "AI search", "Google Maps", "More calls"];
const jobs = ["Water heaters", "Drain cleaning", "Burst pipes", "Repiping", "Sewer lines", "Leak detection", "Tankless installs", "Emergency calls", "Sump pumps"];

export function JobsMarquee() {
  // Two crossed bands laid over the seam between the hero and the next section (no box or background of their own).
  // They loop on their own in opposite directions and get an eased push when the visitor scrolls (ScrollFx).
  return (
    <ScrollFx as="section" aria-label="What we do and the jobs we help you win" className="pointer-events-none relative z-20 -my-16 overflow-x-clip md:-my-24">
      <PauseMotion />
      <div className="relative z-10 -mx-10 -rotate-2 bg-royal py-4 md:py-5">
        <MarqueeRow items={what} loop="1" itemClass="band-item text-t1" sep="✦" outlineEvery />
      </div>
      <div className="relative -mx-10 -mt-3 rotate-[1.5deg] bg-ribbon py-3 md:py-4">
        <MarqueeRow items={jobs} loop="-1" itemClass="band-item text-t2" sep="dot" />
      </div>
    </ScrollFx>
  );
}

/* ---------- The system: four picture panels that open on hover ---------- */
export const system = [
  { img: "/media/svc-web.webp", alt: "Laptop and phone showing a clean website next to plumbing tools", href: `/services/${services[0].slug}/`, title: "Websites that actually convert", body: "Not brochures. Click-to-call on every screen, a page for every job and every town, and trust signals exactly where homeowners look." },
  { img: "/media/svc-maps.webp", alt: "Homeowner holding a phone with a map pin, a leak under the kitchen sink behind", href: `/services/${services[1].slug}/`, title: "Top of Google and the map pack", body: "Service pages, Google Business Profile and technical SEO built around the searches that turn into jobs in your towns." },
  { img: "/media/svc-ai.webp", alt: "Phone with an answer card surrounded by plumbing fittings", href: `/services/${services[1].slug}/`, title: "Recommended by AI search", body: "Clear answers and structured data so ChatGPT, Gemini and Google's AI Overviews can understand you and recommend you." },
  { img: "/media/svc-leads.webp", alt: "Plumber in his van answering a call", href: `/services/${services[2].slug}/`, title: "Every lead on your phone", body: "Calls and quote requests sent to you the moment they land, so you call back before the homeowner calls someone else." },
];

/**
 * "Everything it takes", rebuilt 2026-10-18 (Nick) with the 21st.dev Polaroid Line Carousel: the four services as
 * instant photos pegged to a sagging string. Drag, arrows, keys or a click move them; they sway and play on their own
 * until someone touches them (the Pause button and reduced motion stop that). The pale pink band stays, the grid is
 * gone, and white shapes drift behind at different speeds for depth.
 */
export function SystemBento() {
  return (
    <ScrollFx as="section" className="on-blue sys relative overflow-clip bg-navy-900 pt-24 md:pt-32" aria-labelledby="system-h">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="sys-o sys-o1" data-fx-y="70" />
        <span className="sys-o sys-o2" data-fx-y="-60" />
        <span className="sys-o sys-o3" data-fx-y="110" />
        <span className="sys-o sys-o4" data-fx-y="-90" />
        <span className="sys-spark sys-s1" data-fx-rotate="-30,60">✦</span>
        <span className="sys-spark sys-s2" data-fx-rotate="20,-70">✦</span>
        <span className="sys-spark sys-s3" data-fx-rotate="0,90">✦</span>
      </div>
      <div className="container-x relative">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end">
          <h2 id="system-h" className="display text-t1">Everything it takes <span className="accent">to own your town.</span></h2>
          <p className="text-t3 text-white/90 md:text-t2">Built for plumbers only. We handle the tech so you can stay on the tools.</p>
        </Reveal>
      </div>
      <PolaroidLineCarousel
        className="relative"
        ariaLabel="What we do for plumbers"
        height="var(--sys-h)"
        cardWidth={320}
        sag={46}
        autoplay={4500}
        string="#c2185b"
        background="transparent"
        ink="#141414"
        style={{ ["--pl-muted" as string]: "#5c5559" }}
        slides={system.map((s) => ({ image: s.img.replace(".webp", "-720.webp"), title: s.title, caption: s.body, alt: s.alt, href: s.href, linkText: "How it works" }))}
      />
    </ScrollFx>
  );
}

/* ---------- Process: a horizontal track that slides sideways while the section is pinned ---------- */
export const process = [
  { icon: Search, title: "Discovery & strategy", body: "A quick call to understand your trade, your goals and your customers. Then a plan for your service area and the jobs you want more of." },
  { icon: ClipboardList, title: "Content & wireframe", body: "We gather the right content or write it for you. Then a clean wireframe so the structure is right before design starts." },
  { icon: PenTool, title: "Design & build", body: "Your custom site, designed and built with SEO baked in. Every element is there to turn a visitor into a call." },
  { icon: Rocket, title: "Launch", body: "Once you approve, we go live with SEO set up, the sitemap submitted to Google and Bing, and tracking in place." },
  { icon: LifeBuoy, title: "Support after launch", body: "3 months of fixes included in your contract. After that, paid support or a yearly maintenance plan." },
];

/**
 * "Five steps", rebuilt 2026-10-18 (Nick) with the 21st.dev Timeline (Hyperiux): the section holds still while the
 * track slides sideways, the pink line draws, and each step draws its stem and dot and reveals its words line by line.
 * The version before this is kept as ProcessTimelineClassic (Classic.tsx) in case Nick wants it back.
 */
export function ProcessTimeline() {
  return (
    <Timeline
      steps={process.map(({ title, body }) => ({ title, body }))}
      titleId="process-h"
      title={<>Five steps.<span className="sr-only"> Zero guesswork.</span></>}
      periodLabel={
        <div className="flex flex-col items-start gap-5">
          <p aria-hidden className="font-display text-t2 font-black text-slate">Zero guesswork.</p>
          <CtaButton />
        </div>
      }
      imageUrl="/media/svc-web.webp"
      imageAlt="Laptop and phone showing a clean website next to plumbing tools"
      duration={1.4}
    />
  );
}
