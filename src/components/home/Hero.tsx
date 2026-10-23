import Link from "@/components/Link";
import { site } from "@/content/site";
import { CtaButton } from "../CtaButton";
import { HeroMotion } from "./HeroMotion";
import { VslPlayer } from "./VslPlayer";

/** Where plumbers get found. These are the places we optimise for, not partners or endorsements. */
const foundOn = ["Google Search", "Google Maps", "ChatGPT", "Perplexity", "Bing"];
const intro = (s: number) => ({ "--id": `${s}s` }) as React.CSSProperties;

/**
 * Home hero, built around the eye path Nick set (2026-10-16): 1) the video, 2) the headline, 3) the subline,
 * 4) the buttons, 5) logos, 6) the menu. Load-in (Nick 2026-10-22, replacing his 2026-10-19 "no load-in"): on every fresh
 * load the header slides down, then the title lines, subline, buttons and search chips rise in one at a time (about
 * 1.2 s, CSS in layout.tsx). The video and its sticker stay still and visible from the first paint.
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
          {/* 19 px bold (SEO fix 3, 2026-10-23): white on the brand pink is 3.3:1, which passes only as "large text" (bold 18.7 px+).
              Nick 2026-10-22: the "Plumbers only" sticker is gone; the founder sticker sits in its spot, pink with white
              type (1.3x from tablets up; phones keep 1x, Nick 13:31), level with the video (the frame's own 1.2° tilt to the right) and centred on the frame's top border. The
              margin lifts it by how much that tilted border rises between the frame's middle and the sticker's middle. */}
          <span data-hero-sticker className="sticker absolute top-0 left-[6%] z-10 -translate-y-1/2 bg-ribbon text-[19px] text-white md:scale-130" style={{ "--tilt": "1.2deg", marginTop: "calc(-0.921% + 3.5px)" } as React.CSSProperties}>Nick · Founder</span>
        </div>

        <div data-hero-copy className="hero-copy relative z-10">
          {/* 2) The headline. */}
          <h1 className="display hero-title text-ink">
            {lines.map((l, i) => (
              <span key={l} data-intro="" style={intro(0.1 + i * 0.08)} className="block">{l}</span>
            ))}
            <span data-intro="" style={intro(0.26)} className="accent">booked solid.</span>
          </h1>
          {/* 3) The subline. */}
          <p data-intro="" style={intro(0.38)} className="mt-7 max-w-[36rem] text-t3 text-slate md:text-t2">
            When a pipe bursts, homeowners call the first plumber they trust. I make sure that&apos;s you: a fast site built to convert, top spots on Google and AI search, and a call button under every thumb.
          </p>
          {/* 4) The buttons. */}
          <div data-intro="" style={intro(0.48)} className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <CtaButton />
            <Link href="/free-website-audit/" className="btn btn-ghost-dark">{site.secondaryCta}</Link>
          </div>
          {/* 5) Logos: where your customers search. */}
          <div data-intro="" style={intro(0.58)} className="mt-10">
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
