import Link from "@/components/Link";
import { ArrowUpRight, ClipboardList, LifeBuoy, PenTool, Rocket, Search } from "lucide-react";
import { services } from "@/content/services";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { HScrollFx, MarqueeRow, ScrollFx, StackFx } from "../ScrollFx";

/*
 * Server-rendered home sections. Their markup ships as HTML; only the small ScrollFx wrappers run on the client,
 * which keeps the page inside the 700 KB JavaScript budget with GSAP and Lenis on board.
 */

/* ---------- Two crossing marquee bands (what we do, and the jobs we help you win) ---------- */
const what = ["Websites", "Local SEO", "AI search", "Google Maps", "More calls"];
const jobs = ["Water heaters", "Drain cleaning", "Burst pipes", "Repiping", "Sewer lines", "Leak detection", "Tankless installs", "Emergency calls", "Sump pumps"];

export function JobsMarquee() {
  // The top band loops (CSS); both bands slide against each other as the page scrolls (GSAP via ScrollFx).
  return (
    <ScrollFx as="section" aria-label="What we do and the jobs we help you win" className="relative overflow-hidden bg-white py-14 md:py-20">
      <div data-fx-x="-5%" className="relative z-10 -mx-10 -rotate-2 bg-royal py-4 md:py-5">
        <MarqueeRow items={what} dur="46s" itemClass="band-item text-t1" sep="✦" outlineEvery />
      </div>
      <div data-fx-x="5%" className="relative -mx-10 -mt-3 rotate-[1.5deg] bg-ribbon py-3 md:py-4">
        <MarqueeRow items={jobs} dur="52s" still itemClass="band-item text-t2" sep="dot" />
      </div>
    </ScrollFx>
  );
}

/* ---------- The system: four cards that stack up as you scroll ---------- */
const system = [
  { img: "/media/svc-web.webp", alt: "Laptop and phone showing a clean website next to plumbing tools", href: `/services/${services[0].slug}/`, title: "Websites that actually convert", body: "Not brochures. Click-to-call on every screen, a page for every job and every town, and trust signals exactly where homeowners look." },
  { img: "/media/svc-maps.webp", alt: "Homeowner holding a phone with a map pin, a leak under the kitchen sink behind", href: `/services/${services[1].slug}/`, title: "Top of Google and the map pack", body: "Service pages, Google Business Profile and technical SEO built around the searches that turn into jobs in your towns." },
  { img: "/media/svc-ai.webp", alt: "Phone with an answer card surrounded by plumbing fittings", href: `/services/${services[1].slug}/`, title: "Recommended by AI search", body: "Clear answers and structured data so ChatGPT, Gemini and Google's AI Overviews can understand you and recommend you." },
  { img: "/media/svc-leads.webp", alt: "Plumber in his van answering a call", href: `/services/${services[2].slug}/`, title: "Every lead on your phone", body: "Calls and quote requests sent to you the moment they land, so you call back before the homeowner calls someone else." },
];

export function SystemBento() {
  return (
    <StackFx className="on-blue blueprint relative py-24 text-white md:py-32" aria-labelledby="system-h">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <h2 id="system-h" className="display text-t1">Everything it takes <span className="accent">to own your town.</span></h2>
          <p className="mt-6 max-w-2xl text-t3 text-white/90">Built for plumbers only. We handle the tech so you can stay on the tools.</p>
        </Reveal>
        <ol className="mt-16 space-y-8 md:space-y-0">
          {system.map((s, i) => (
            <li key={s.title} data-stack-card className="md:sticky md:top-24 md:pb-10" style={{ zIndex: i + 1 }}>
              <div className="group svc-card">
                <div className="svc-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} srcSet={`${s.img.replace(".webp", "-720.webp")} 720w, ${s.img} 1200w`} sizes="(min-width: 768px) 40rem, 92vw" alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" className="zoom-img" />
                </div>
                <div className="svc-body">
                  <div>
                    <p className="big-num">0{i + 1}</p>
                    <h3 className="display mt-2 text-t2">{s.title}</h3>
                    <p className="mt-4 max-w-md text-t3 text-slate">{s.body}</p>
                  </div>
                  <Link href={s.href} className="ul-link">How it works<ArrowUpRight className="h-4 w-4" aria-hidden /></Link>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-t3 text-white/90">Photos are illustrations made for this site, not client work.</p>
      </div>
    </StackFx>
  );
}

/* ---------- Process: a horizontal track that slides sideways while the section is pinned ---------- */
const process = [
  { icon: Search, title: "Discovery & strategy", body: "A quick call to understand your trade, your goals and your customers. Then a plan for your service area and the jobs you want more of." },
  { icon: ClipboardList, title: "Content & wireframe", body: "We gather the right content or write it for you. Then a clean wireframe so the structure is right before design starts." },
  { icon: PenTool, title: "Design & build", body: "Your custom site, designed and built with SEO baked in. Every element is there to turn a visitor into a call." },
  { icon: Rocket, title: "Launch", body: "Once you approve, we go live with SEO set up, the sitemap submitted to Google and Bing, and tracking in place." },
  { icon: LifeBuoy, title: "Ongoing support", body: "Edits, updates and tweaks whenever you need them, so you're never left chasing a developer." },
];

/**
 * Pinned horizontal timeline, after the 21st.dev "Product Timeline" (hyperiux): the track slides left as you scroll and the
 * rail draws itself. Phones and reduced motion get the same steps as a plain vertical list.
 */
export function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <HScrollFx className={`overflow-hidden bg-white ${compact ? "py-16" : "py-24 md:py-0"}`} aria-labelledby="process-h">
      <div data-pin className="md:flex md:h-[100svh] md:flex-col md:justify-center">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="process-h" className="display text-t1">Five steps. <span className="accent">Zero guesswork.</span></h2>
          </div>
          <div className="max-w-sm"><p className="text-t3 text-slate">From first call to a site that keeps working for you. You always know what&apos;s happening and what we need from you.</p></div>
        </div>
        <div className="relative mt-12 md:mt-16">
          <span aria-hidden data-rail className="absolute top-[1.4rem] right-0 left-0 hidden h-[3px] origin-left bg-ribbon md:block" />
          <ol data-track className="container-x flex flex-col gap-10 md:w-max md:max-w-none md:flex-row md:gap-6 md:pr-[30vw]">
            {process.map((p, i) => (
              <li key={p.title} className="relative md:w-[24rem]">
                <span className="step-ic"><p.icon className="h-5 w-5" aria-hidden /></span>
                <p className="big-num mt-6">0{i + 1}</p>
                <h3 className="svc-h">{p.title}</h3>
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
