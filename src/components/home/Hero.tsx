import { Fragment } from "react";
import Link from "@/components/Link";
import { CalendarCheck, MapPin, PhoneIncoming, Star, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { HeroMotion } from "./HeroMotion";

const leads = [
  { icon: PhoneIncoming, title: "Incoming call", body: "Burst pipe under the kitchen sink", meta: "Cary, NC · just now", tone: "bg-ribbon" },
  { icon: Wrench, title: "Quote request", body: "Water heater replacement, 50 gal", meta: "Raleigh, NC · 4 min ago", tone: "bg-royal" },
  { icon: CalendarCheck, title: "Job booked", body: "Drain cleaning, Thursday 9 am", meta: "Apex, NC · 12 min ago", tone: "bg-ink" },
];

/**
 * Home hero: a bright, full-bleed scene of a plumber at work (Higgsfield still, then a silent looping clip once it
 * has loaded) behind huge uppercase type. The headline and photo are server-rendered so they paint before any
 * JavaScript (fast LCP); GSAP only adds the scroll-away motion. The plumber is generated imagery used as mood,
 * not presented as a client or as Nick.
 */
export function Hero() {
  return (
    <HeroMotion className="relative isolate overflow-hidden bg-white">
      {/* Media: right side on desktop, top block on phones. */}
      <div data-hero-media className="relative h-[52svh] min-h-[20rem] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[68%]">
        <picture>
          <source media="(min-width: 1280px)" srcSet="/media/hero-1920.webp" />
          <source media="(min-width: 768px)" srcSet="/media/hero-1280.webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/hero-768.webp" alt="A plumber fixing pipes under a kitchen sink (illustrative photo)" width={1920} height={1086} fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[72%_50%]" />
        </picture>
        {/* <HeroVideo /> from ./HeroMotion goes back here once hero-loop.webm/.mp4 are in public/media. */}
        {/* White fade into the type column (desktop) and into the text below (phones). */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,#fff_0%,rgb(255_255_255/0)_38%)] md:bg-[linear-gradient(to_right,#fff_0%,rgb(255_255_255/0.85)_14%,rgb(255_255_255/0)_42%)]" />

        <ul data-hero-leads className="absolute right-24 bottom-10 hidden w-[19rem] space-y-2.5 md:block lg:right-28 lg:bottom-14" aria-label="Example of leads arriving (illustration)">
          {leads.map((l, i) => (
            <li key={l.title} className="enter-slide lead-card" style={{ "--d": `${0.45 + i * 0.2}s` } as React.CSSProperties}>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded ${l.tone}`}><l.icon className="h-5 w-5 text-white" aria-hidden /></span>
              <span className="min-w-0">
                <span className="lead-t">{l.title} <span className="font-semibold text-slate normal-case">(SAMPLE)</span></span>
                <span className="block truncate text-[0.85rem]">{l.body}</span>
                <span className="lead-m"><MapPin className="h-3 w-3" aria-hidden />{l.meta}</span>
              </span>
            </li>
          ))}
        </ul>
        <span data-hero-sticker className="sticker absolute top-[22%] left-[6%] hidden bg-ribbon text-ink md:inline-flex" style={{ "--tilt": "-8deg" } as React.CSSProperties} aria-hidden>
          <Star className="h-3.5 w-3.5 fill-current" />Plumbers only
        </span>
      </div>

      <div className="container-x relative pb-16 md:flex md:min-h-[100svh] md:items-center md:pt-28 md:pb-24">
        <div data-hero-copy className="-mt-8 max-w-[40rem] md:mt-0">
          <h1 className="display mt-5 text-[clamp(3rem,1.6rem+6.4vw,7.2rem)] text-ink">
            <SplitWords text="Websites that keep plumbers" />{" "}
            <span className="accent"><SplitWords text="booked solid." delay={0.25} /></span>
          </h1>
          {/* No entrance on this paragraph: on phones it can be the largest text block, so it paints at once. */}
          <p className="mt-7 max-w-[34rem] text-lg text-slate md:text-xl">
            When a pipe bursts, homeowners call the first plumber they trust. We make sure that&apos;s you: a fast site built to convert, top spots on Google and AI search, and a call button under every thumb.
          </p>
          <div className="enter-fade mt-9 flex flex-col gap-4 sm:flex-row" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <CtaButton />
            <Link href="/free-website-audit/" className="btn btn-ghost-dark">{site.secondaryCta}</Link>
          </div>
          <p className="enter-fade mt-6 text-sm text-slate" style={{ "--d": "0.4s" } as React.CSSProperties}>Free 30-minute strategy call · Plumbers only · You own your website</p>
        </div>
      </div>
    </HeroMotion>
  );
}

function SplitWords({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {/* The space sits between the clipped word boxes: a trailing space inside an inline-block collapses. */}
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="split-w">
            <span className="enter-rise split-i" style={{ "--d": `${Math.min(0.6, delay + i * 0.05)}s` } as React.CSSProperties}>{w}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
