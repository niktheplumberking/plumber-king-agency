import Link from "@/components/Link";
import { MapPin, Play, PhoneIncoming, Star, Wrench } from "lucide-react";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { PlaceholderBadge } from "../PlaceholderBadge";
import { HeroMotion } from "./HeroMotion";

const leads = [
  { icon: PhoneIncoming, title: "Incoming call", body: "Burst pipe under the kitchen sink", meta: "Cary, NC · just now", tone: "bg-ribbon-deep" },
  { icon: Wrench, title: "Quote request", body: "Water heater replacement, 50 gal", meta: "Raleigh, NC · 4 min ago", tone: "bg-ink" },
];

/** Where plumbers get found. These are the places we optimise for, not partners or endorsements. */
const foundOn = ["Google Search", "Google Maps", "ChatGPT", "Perplexity", "Bing"];

/**
 * Home hero, built around the eye path Nick set (2026-10-16): 1) the video, 2) the headline, 3) the subline,
 * 4) the buttons, 5) logos, 6) the menu. Nick 2026-10-19: no load-in animation anywhere in the hero (or its header);
 * everything is there from the first paint. Until Nick's VSL exists the frame shows his photo.
 */
export function Hero() {
  const lines = ["Websites that", "keep plumbers"];
  return (
    <HeroMotion className="relative isolate overflow-hidden bg-white">
      {/* Background objects: a big soft disc, a ring and a dot field, filling the blank space without a hard edge. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-[18%] right-[-14%] aspect-square w-[min(68rem,85vw)] rounded-full bg-sky" />
        <div className="absolute top-[8%] right-[30%] aspect-square w-[min(34rem,40vw)] rounded-full border-[3px] border-dashed border-ribbon/25" />
        <div className="hero-dots absolute bottom-[6%] left-[-2%] h-56 w-[38%]" />
      </div>

      <div className="container-x relative grid items-center gap-x-10 gap-y-10 pt-28 pb-44 lg:min-h-[100svh] lg:grid-cols-[minmax(0,1.32fr)_minmax(0,1fr)] lg:pt-24 lg:pb-60">
        {/* 1) The video. First in reading order on every screen. */}
        <div data-hero-media className="relative order-first lg:order-last">
          <figure className="relative">
            <div className="vsl-frame">
              <div aria-hidden className="vsl-bg" />
              <div aria-hidden className="hero-rays absolute inset-0" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/nick-hero-520.webp" srcSet="/brand/nick-hero-520.webp 520w, /brand/nick-hero.webp 820w" sizes="(min-width: 1024px) 34vw, 70vw" alt="Nick, founder of Plumber King Agency" width={820} height={1019} fetchPriority="high" decoding="async" className="absolute bottom-0 left-[58%] h-[104%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom" />
              <span className="vsl-play" aria-hidden><Play className="h-9 w-9 translate-x-0.5 fill-current" /></span>
              <figcaption className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex flex-wrap items-center gap-2">
                <span className="hidden rounded-md bg-ink px-3 py-1.5 text-t3 font-bold text-white sm:inline-block">Watch: how I get plumbers booked</span>
                <PlaceholderBadge label="Video coming soon" />
              </figcaption>
            </div>
          </figure>
          <span data-hero-sticker className="sticker absolute -top-5 left-[6%] z-10 bg-white text-ink" style={{ "--tilt": "-8deg" } as React.CSSProperties} aria-hidden>
            <Star className="h-3.5 w-3.5 fill-current" />Plumbers only
          </span>
          <span className="sticker absolute -right-2 top-[18%] z-10 bg-ink text-white" style={{ "--tilt": "6deg" } as React.CSSProperties}>Nick · Founder</span>
          <ul data-hero-leads className="absolute -bottom-14 -left-[14%] z-10 hidden w-[17.5rem] space-y-2.5 2xl:block" aria-label="Example of leads arriving (illustration)">
            {leads.map((l) => (
              <li key={l.title} className="lead-card">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded ${l.tone}`}><l.icon className="h-5 w-5 text-white" aria-hidden /></span>
                <span className="min-w-0">
                  <span className="lead-t">{l.title} <span className="font-semibold text-slate normal-case">(SAMPLE)</span></span>
                  <span className="block truncate text-t3">{l.body}</span>
                  <span className="lead-m"><MapPin className="h-3 w-3" aria-hidden />{l.meta}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-hero-copy className="hero-copy relative z-10">
          {/* 2) The headline. */}
          <h1 className="display hero-title text-ink">
            {lines.map((l) => (
              <span key={l} className="block">{l}</span>
            ))}
            <span className="accent">booked solid.</span>
          </h1>
          {/* 3) The subline. */}
          <p className="mt-7 max-w-[36rem] text-t3 text-slate md:text-t2">
            When a pipe bursts, homeowners call the first plumber they trust. I make sure that&apos;s you: a fast site built to convert, top spots on Google and AI search, and a call button under every thumb.
          </p>
          {/* 4) The buttons. */}
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <CtaButton />
            <Link href="/free-website-audit/" className="btn btn-ghost-dark">{site.secondaryCta}</Link>
          </div>
          {/* 5) Logos: where your customers search. */}
          <div className="mt-10">
            <p className="text-t3 font-semibold text-slate">Get found where homeowners search:</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Search platforms we optimise for">
              {foundOn.map((f) => <li key={f} className="rounded-md border-2 border-ink/10 bg-white px-3 py-1.5 text-t3 font-bold text-ink">{f}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </HeroMotion>
  );
}
