import Link from "@/components/Link";
import { Star } from "lucide-react";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { HeroMotion } from "./HeroMotion";
import { VslPlayer } from "./VslPlayer";

/** Where plumbers get found. These are the places we optimise for, not partners or endorsements. */
const foundOn = ["Google Search", "Google Maps", "ChatGPT", "Perplexity", "Bing"];

/**
 * Home hero, built around the eye path Nick set (2026-10-16): 1) the video, 2) the headline, 3) the subline,
 * 4) the buttons, 5) logos, 6) the menu. Nick 2026-10-19: no load-in animation anywhere in the hero (or its header);
 * everything is there from the first paint. His photo is the video's cover until play is pressed.
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
          {/* Nick's VSL (filmed 2026-10-21). Loads only when someone presses play. */}
          <VslPlayer />
          <span data-hero-sticker className="sticker absolute -top-5 left-[6%] z-10 bg-white text-ink" style={{ "--tilt": "-8deg" } as React.CSSProperties} aria-hidden>
            <Star className="h-3.5 w-3.5 fill-current" />Plumbers only
          </span>
          <span className="sticker absolute -right-2 top-[18%] z-10 bg-ink text-white" style={{ "--tilt": "6deg" } as React.CSSProperties}>Nick · Founder</span>
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
