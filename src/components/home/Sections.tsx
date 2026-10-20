"use client";
import { useId, useRef, useState } from "react";
import { ChevronsLeftRight, X } from "lucide-react";
import { gsap, useGsap } from "@/lib/gsap";
import { Reveal } from "../Reveal";

/* ---------- The problem: drag between a typical plumber site and a Plumber King site ---------- */
const oldWay = ["Template look, same as every competitor", "Phone number buried in the footer", "No reason to trust you over the next guy", "Slow on a phone with one bar of signal"];
const kingWay = ["Built around the jobs you want more of", "Call button under every thumb", "Reviews, photos and promises up front", "Loads fast on any phone"];

// The two site images (Higgsfield, 2026-10-16): one made-up plumbing company, before and after. They are pictures,
// so the slider needs no fake markup. Files in public/work/ (Nick brought them over from Higgsfield).
const WORK_IMAGES_READY = true;

/**
 * Section 4, restructured 2026-10-16: the slider is the hero of the section and runs nearly full width; the two
 * checklists float over its corners like notes pinned to the screen. Eye path: title, subline, the slider (with a
 * one-time sweep that shows it can be dragged), then the two lists.
 */
export function ProblemSplit() {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(72);
  // On first view the divider sweeps across once, so visitors see it can be dragged.
  useGsap(ref, () => {
    const o = { v: 92 };
    gsap.to(o, { v: 50, duration: 1.4, ease: "power3.inOut", onUpdate: () => setValue(Math.round(o.v)), scrollTrigger: { trigger: "[data-compare]", start: "top 70%", once: true } });
  });
  return (
    <section ref={ref} className="relative overflow-x-clip bg-ivory py-24 md:py-32" aria-labelledby="problem-h">
      <div aria-hidden className="hero-dots pointer-events-none absolute top-16 right-0 h-72 w-[34%]" />
      <div className="container-x relative">
        {/* Title as an enormous zig-zag (Nick 2026-10-19: same words, much bigger, only the title block changes): four
            lines at one size, alternating left and right. Nick 2026-10-20: the subline is gone, the title stays as it is. */}
        <Reveal className="ps-head fit-box">
          <h2 id="problem-h" className="display ps-title">
            <span className="ps-l">Your website</span> <span className="ps-l ps-r">rings a phone.</span>{" "}
            <span className="accent"><span className="ps-l">Yours, or the</span> <span className="ps-l ps-r">other guy&apos;s.</span></span>
          </h2>
        </Reveal>

        {/* Nick 2026-10-20: the compare box runs the full grid width (logo's left edge to the call button's right edge).
            Batch 3: the two cards sit where they would if the old layout (box inset 6% each side) had been scaled up with
            the box, so they hang past its edges again (see .ps-card-l / .ps-card-r), never closer than 12 px to the screen edge. */}
        <div className="relative mt-14 lg:mt-20">
          <div data-compare>
            <Compare value={value} onValueChange={setValue}
              before={<Shot src="/work/ridgeline-before.webp" label="Typical plumber website" />}
              after={<Shot src="/work/ridgeline-after.webp" label="Rebuilt plumber website" />} />
          </div>
          <Reveal className="relative z-10 mt-8 rounded-xl border-2 border-ink/15 bg-white p-6 shadow-[6px_6px_0_rgb(20_20_20/0.12)] lg:absolute ps-card-l lg:mt-0 lg:w-[22rem] lg:-rotate-2">
            <h3 className="display text-t2 text-slate uppercase">Random plumbing agency</h3>
            <ul className="mt-4 space-y-2.5">{oldWay.map((t) => <li key={t} className="flex gap-3 text-t3 text-slate"><X className="mt-1 h-4 w-4 shrink-0 text-royal" aria-hidden />{t}</li>)}</ul>
          </Reveal>
          {/* Our card "rings" every 5 s (Nick 2026-10-17): a wiggle that speeds up, a short shake, then it settles. CSS only. */}
          <Reveal delay={0.1} className="relative z-10 mt-6 lg:absolute lg:top-[42%] ps-card-r lg:mt-0 lg:w-[22rem]">
            <div className="ring-card rounded-xl border-2 border-ink bg-white p-6 shadow-[8px_8px_0_var(--color-ribbon)] lg:rotate-2">
              <h3 className="display text-t2 uppercase">Plumber <span className="text-royal">King</span> Agency</h3>
              <ul className="mt-4 space-y-2.5">{kingWay.map((t) => <li key={t} className="flex gap-3 text-t3"><span aria-hidden className="duck-tick mt-0.5" />{t}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** One side of the slider: the site image, or a grey placeholder until the image file is added. */
function Shot({ src, label }: { src: string; label: string }) {
  if (!WORK_IMAGES_READY) {
    return <div className="grid h-full place-items-center bg-[repeating-linear-gradient(45deg,#e4e1e3_0_14px,#ecebec_14px_28px)] text-t3 font-semibold text-slate">{label} image goes here</div>;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={label} width={1296} height={768} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" draggable={false} />;
}

/**
 * Before/after slider adapted from the 21st.dev "Image Compare" component (0xuser64bit): pointer and touch drag on the
 * stage plus a real range input for keyboard and screen readers. Here the two layers are the before and after images.
 */
function Compare({ value, onValueChange, before, after }: { value: number; onValueChange: (v: number) => void; before: React.ReactNode; after: React.ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const id = useId();
  const v = Math.max(0, Math.min(100, value));
  const update = (x: number) => {
    const r = stage.current!.getBoundingClientRect();
    if (r.width) onValueChange(Math.round(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100))));
  };
  return (
    <figure>
      <div ref={stage} className="relative aspect-[4/3] cursor-ew-resize touch-pan-y overflow-hidden rounded-xl border-4 border-ink bg-white shadow-[12px_12px_0_var(--color-ink)] select-none sm:aspect-[27/16]"
        onPointerDown={(e) => { if (e.button === 0) { e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); } }}
        onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) update(e.clientX); }}
        onPointerUp={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId); }}>
        <div className="absolute inset-0" aria-hidden>{after}</div>
        <div className="absolute inset-0" aria-hidden style={{ clipPath: `inset(0 ${100 - v}% 0 0)` }}>{before}</div>
        {/* Moved with transform, not `left`, so dragging never counts as a layout shift. */}
        <span aria-hidden className="pointer-events-none absolute inset-0" style={{ transform: `translate3d(${v}%,0,0)` }}>
          <span className="absolute inset-y-0 left-0 w-[3px] -translate-x-1/2 bg-ink" />
          <span className="absolute top-1/2 left-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--color-ink)]"><ChevronsLeftRight className="h-5 w-5" /></span>
        </span>
      </div>
      <label htmlFor={id} className="sr-only">Compare a typical plumber website with a Plumber King website</label>
      <input id={id} type="range" min={0} max={100} value={v} onChange={(e) => onValueChange(Number(e.target.value))} aria-valuetext={`${v}% typical site shown`} className="mt-4 h-11 w-full cursor-pointer accent-[var(--color-ribbon)]" />
    </figure>
  );
}
