import { PauseMotion } from "./WalkingBobo";
import Link from "@/components/Link";
import { ArrowUpRight, ClipboardList, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { HScrollFx, MarqueeRow, ScrollFx } from "../ScrollFx";

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
const system = [
  { img: "/media/svc-web.webp", alt: "Laptop and phone showing a clean website next to plumbing tools", href: `/services/${services[0].slug}/`, title: "Websites that actually convert", body: "Not brochures. Click-to-call on every screen, a page for every job and every town, and trust signals exactly where homeowners look." },
  { img: "/media/svc-maps.webp", alt: "Homeowner holding a phone with a map pin, a leak under the kitchen sink behind", href: `/services/${services[1].slug}/`, title: "Top of Google and the map pack", body: "Service pages, Google Business Profile and technical SEO built around the searches that turn into jobs in your towns." },
  { img: "/media/svc-ai.webp", alt: "Phone with an answer card surrounded by plumbing fittings", href: `/services/${services[1].slug}/`, title: "Recommended by AI search", body: "Clear answers and structured data so ChatGPT, Gemini and Google's AI Overviews can understand you and recommend you." },
  { img: "/media/svc-leads.webp", alt: "Plumber in his van answering a call", href: `/services/${services[2].slug}/`, title: "Every lead on your phone", body: "Calls and quote requests sent to you the moment they land, so you call back before the homeowner calls someone else." },
];

/**
 * "Everything it takes", rebuilt 2026-10-17 (Nick: "completely rebuild it", 21st.dev). Pattern: the "Hover Expand
 * Gallery" (kedhareswer) and "Hover Expand" (educalvolpz) accordions, ported to plain CSS (.xg in globals.css, no
 * extra JavaScript): four tall picture panels; the one you point at (or tab into) opens wide with its story, the rest
 * fold into rails with a sideways label. Phones get the four cards stacked, all open.
 */
export function SystemBento() {
  return (
    <section className="on-blue blueprint relative overflow-hidden py-24 text-white md:py-32" aria-labelledby="system-h">
      <div className="container-x">
        <Reveal className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-end">
          <h2 id="system-h" className="display text-t1">Everything it takes <span className="accent">to own your town.</span></h2>
          <p className="text-t3 text-white/90 md:text-t2">Built for plumbers only. We handle the tech so you can stay on the tools.</p>
        </Reveal>
        <ol className="xg mt-14 md:mt-16">
          {system.map((s, i) => (
            <li key={s.title} className="xg-item" style={{ "--i": i } as React.CSSProperties}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} srcSet={`${s.img.replace(".webp", "-720.webp")} 720w, ${s.img} 1200w`} sizes="(min-width: 1024px) 50vw, 92vw" alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" className="xg-img" />
              <span aria-hidden className="xg-rail"><b>0{i + 1}</b>{s.title}</span>
              <div className="xg-full">
                <p className="xg-num">0{i + 1}</p>
                <h3 className="display text-t2">{s.title}</h3>
                <p className="mt-3 max-w-md text-t3 text-white/90">{s.body}</p>
                <Link href={s.href} className="xg-link">How it works<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Process: a horizontal track that slides sideways while the section is pinned ---------- */
const process = [
  { icon: Search, title: "Discovery & strategy", body: "A quick call to understand your trade, your goals and your customers. Then a plan for your service area and the jobs you want more of." },
  { icon: ClipboardList, title: "Content & wireframe", body: "We gather the right content or write it for you. Then a clean wireframe so the structure is right before design starts." },
  { icon: PenTool, title: "Design & build", body: "Your custom site, designed and built with SEO baked in. Every element is there to turn a visitor into a call." },
  { icon: Rocket, title: "Launch", body: "Once you approve, we go live with SEO set up, the sitemap submitted to Google and Bing, and tracking in place." },
  { icon: LifeBuoy, title: "Support after launch", body: "3 months of fixes included in your contract. After that, paid support or a yearly maintenance plan." },
];

/**
 * Pinned horizontal timeline, after the 21st.dev "Product Timeline" (hyperiux): the track slides left as you scroll and
 * the pink rail (the "train") draws itself. Rebuilt 2026-10-17 (Nick): the title is "Five steps." centred and stretched,
 * over a giant slanted "0 GUESSWORK" that runs off both screen edges; the subline is gone; titles are bigger; and each
 * station swells while the rail's head passes it, then settles as the next one swells (a wave). HScrollFx sets .on.
 * Phones and reduced motion get the same steps as a vertical list (on phones each step swells as it crosses the middle).
 */
export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <HScrollFx className={`overflow-hidden bg-white ${compact ? "py-16" : "py-24 md:py-0"}`} aria-labelledby="process-h">
      <div data-pin className="md:flex md:h-[100svh] md:flex-col md:justify-center md:pt-16">
        <h2 id="process-h" className="steps-h display">Five steps.<span className="sr-only"> Zero guesswork.</span></h2>
        <p aria-hidden className="guess slant">0 GUESSWORK</p>
        <div className="relative mt-8 md:mt-12">
          <span aria-hidden data-rail className="absolute top-[1.4rem] right-0 left-0 hidden h-[3px] origin-left bg-ribbon md:block" />
          <ol data-track className="container-x flex flex-col gap-10 md:w-max md:max-w-none md:flex-row md:gap-20 md:pr-[30vw]">
            {process.map((p, i) => (
              <li key={p.title} data-station className="station">
                <span className="step-ic"><p.icon className="h-5 w-5" aria-hidden /></span>
                <p className="big-num mt-6">0{i + 1}</p>
                <h3 className="station-h">{p.title}</h3>
                <p className="mt-3 max-w-[22rem] text-t3 text-slate">{p.body}</p>
              </li>
            ))}
            <li className="flex items-center md:w-[27rem]"><CtaButton /></li>
          </ol>
        </div>
      </div>
    </HScrollFx>
  );
}
