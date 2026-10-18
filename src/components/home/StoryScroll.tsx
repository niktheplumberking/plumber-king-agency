"use client";
import { useRef, useState } from "react";
import { PINNED, useReducedMotion, useScrollProgress } from "@/lib/scroll";
import { PhoneCall, Search, ShieldCheck } from "lucide-react";
import { FluidExpandingGrid, type GalleryItem } from "../ui/fluid-expanding-grid";
import { CtaButton } from "../CtaButton";
import { WalkingBobo } from "./WalkingBobo";

const steps = [
  {
    key: "found",
    label: "Found",
    title: "They search. You show up.",
    body: "\"Emergency plumber near me.\" \"Who fixes water heaters in Cary?\" Whether they type it into Google or ask an AI assistant, your business is built to be one of the answers: service pages, Google Business Profile, schema markup and clear answers that search engines can read.",
  },
  {
    key: "trusted",
    label: "Trusted",
    title: "They land. They trust you in seconds.",
    body: "Real photos of you and your trucks, your real reviews and what makes you different, right where a worried homeowner looks first. No stock-photo models, no walls of text.",
  },
  {
    key: "booked",
    label: "Booked",
    title: "They tap. Your phone rings.",
    body: "A call button under every thumb, a two-field quote form for the people who would rather type, and every lead sent to your phone straight away, so you get the job before they call someone else.",
  },
] as const;

/**
 * Section 3. Right: the title and three steps on a pink rail that fills as you scroll (2026-10-16). Left, rebuilt
 * 2026-10-18 (Nick: "something more interactive"): the 21st.dev Fluid Expanding Grid. The step being read opens its
 * tile; any tile opens on click. An open tile splits into "without us" and "with us" with example numbers, clearly
 * labelled as examples, never as a promise. Phones and reduced motion get the same grid without the pinned scroll.
 */
const icons = [Search, ShieldCheck, PhoneCall] as const;

/* Example figures only (Nick: "hypothetically present some expected increases… easy to get to"). Kept modest, and the
   caption under the grid says they are examples only. */
const set = (n: string) => ({ src: `/media/story-${n}-720.webp`, srcSet: `/media/story-${n}-720.webp 720w, /media/story-${n}-1200.webp 1200w` });
/* Photos made in Higgsfield for this section (Nick 2026-10-18), mood pictures, not real clients. */
const tile = (id: string, label: string, title: string, pos: string, beforePos: string, alt: string, beforeAlt: string, stat: string, from: string, to: string): GalleryItem => {
  const a = set(`${id}-after`), b = set(`${id}-before`);
  return { id, label, title, image: a.src, imageSrcSet: a.srcSet, pos, before: b.src, beforeSrcSet: b.srcSet, beforePos, alt, beforeAlt, stat, from, to };
};
const tiles: GalleryItem[] = [
  tile("found", "Found", steps[0].title, "54% 40%", "50% 45%", "A smiling plumber taking a call beside his van", "A plumber sitting in his van staring at a quiet phone", "Calls from Google a month", "8", "14"),
  tile("trusted", "Trusted", steps[1].title, "42% 40%", "18% 50%", "A relieved homeowner calling a plumber from her kitchen", "A worried homeowner frowning at an outdated plumbing website", "Visitors who call, out of 100", "2", "5"),
  tile("booked", "Booked", steps[2].title, "47% 50%", "55% 50%", "A plumber's gloved hand holding a phone with a full week of booked jobs", "A dusty cracked phone on a workbench with a missed-call dot", "Web leads answered in 5 minutes, out of 10", "4", "10"),
];

export function StoryScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  // The scroll callback is kept from the first render, so it reads reduced motion through a ref (the list stays still).
  const reduceRef = useRef(reduce);
  reduceRef.current = reduce;
  useScrollProgress(ref, PINNED, (p) => {
    setActive(Math.min(2, Math.floor(p * 3.2)));
    if (rail.current && !reduceRef.current) rail.current.style.transform = `scaleY(${Math.min(1, p * 1.15)})`;
  }, true);

  /* Nick 2026-10-17: only the step being read is lit. Its icon turns pink, its title and text grow (a scale, so the
     page keeps exactly 3 type sizes) and its title fades linearly from ink to pink; earlier steps go back to normal.
     `all` lights every icon for the reduced-motion list, where nothing moves. */
  const steps3 = (cur: number, all = false) => (
    <ol className={`relative mt-10 space-y-14 pl-14 lg:mt-6 lg:space-y-10 ${all ? "" : "story-steps"}`}>
      <div aria-hidden className="absolute top-2 bottom-2 left-[1.1rem] w-1 rounded bg-ink/10">
        <div ref={rail} className="h-full w-full origin-top scale-y-0 rounded bg-ribbon" />
      </div>
      {steps.map((s, i) => {
        const Icon = icons[i];
        const on = i === cur;
        return (
          <li key={s.key} aria-current={on ? "step" : undefined} className={`step ${on ? "on" : ""}`}>
            <span className={`step-dot ${on || all ? "on" : ""}`}><Icon className="h-5 w-5" aria-hidden /></span>
            <h3 className="display text-t2">{s.label}: {s.title}</h3>
            <p className="mt-2 max-w-lg text-t3">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );

  if (reduce) {
    return (
      <section className="bg-sky py-24" aria-labelledby="story-h">
        <div className="container-x max-w-4xl">
          <h2 id="story-h" className="display text-t1">From invisible to <span className="accent">booked.</span></h2>
          <div className="mt-10">
            <FluidExpandingGrid items={tiles} id="story-grid-still" className="story-grid" />
            <p className="mt-3 text-t3 text-slate">Example figures only. Real results depend on your market.</p>
          </div>
          {steps3(-1, true)}
          <div className="mt-12"><CtaButton /></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative overflow-x-clip bg-sky lg:h-[240vh]" aria-labelledby="story-h">
      <div className="relative pt-24 pb-44 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden lg:pt-24 lg:pb-4">
        <WalkingBobo />
        <div aria-hidden className="hero-dots pointer-events-none absolute top-[12%] right-0 h-64 w-[30%] rotate-180" />
        <div className="story-pin container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* 1) Media: the expanding before/after grid. */}
          <div className="relative w-full">
            <FluidExpandingGrid items={tiles} open={tiles[active].id} id="story-grid" className="story-grid" />
            <p className="relative mt-3 text-t3 text-slate">Example figures only. Real results depend on your market.</p>
          </div>

          {/* 2) Title, 3) the three steps on a filling rail, 4) the button after step 3. */}
          <div>
            <h2 id="story-h" className="display text-t1">From invisible to <span className="accent">booked.</span></h2>
            {steps3(active)}
            <div className={`mt-10 transition-[opacity,translate] duration-700 lg:mt-8 lg:pl-14 ${active === 2 ? "translate-y-0 opacity-100" : "lg:translate-y-4 lg:opacity-0"}`}><CtaButton /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
