"use client";
import { useId, useRef, useState } from "react";
import { Check, ChevronsLeftRight, Phone, Star, X } from "lucide-react";
import { gsap, useGsap } from "@/lib/gsap";
import { Reveal } from "../Reveal";

/* ---------- The problem: drag between a typical plumber site and a Plumber King site ---------- */
const oldWay = ["Template look, same as every competitor", "Phone number buried in the footer", "No reason to trust you over the next guy", "Slow on a phone with one bar of signal"];
const kingWay = ["Built around the jobs you want more of", "Call button under every thumb", "Reviews, photos and promises up front", "Loads fast on any phone"];

export function ProblemSplit() {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(72);
  // On first view the divider sweeps across once, so visitors see it can be dragged.
  useGsap(ref, () => {
    const o = { v: 92 };
    gsap.to(o, { v: 50, duration: 1.4, ease: "power3.inOut", onUpdate: () => setValue(Math.round(o.v)), scrollTrigger: { trigger: "[data-compare]", start: "top 70%", once: true } });
  });
  return (
    <section ref={ref} className="bg-ivory py-24 md:py-32" aria-labelledby="problem-h">
      <div className="container-x">
        <Reveal className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="kicker">01 — The problem</p>
            <h2 id="problem-h" className="display mt-5 text-[clamp(2.4rem,1.4rem+4vw,5.2rem)]">Your website rings a phone. <span className="accent">Yours, or the other guy&apos;s.</span></h2>
          </div>
          <p className="text-lg text-slate">You didn&apos;t become a plumber to become a marketing expert. But a website that doesn&apos;t bring in calls is quietly sending your jobs to the plumber down the road. Drag the handle and see the difference.</p>
        </Reveal>

        <div data-compare className="mt-14">
          <Compare value={value} onValueChange={setValue} before={<TypicalSite />} after={<KingSite />} />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-md border-2 border-ink/15 bg-white p-7">
            <h3 className="display text-xl text-slate">The typical plumber site</h3>
            <ul className="mt-5 space-y-3">{oldWay.map((t) => <li key={t} className="flex gap-3 text-slate"><X className="mt-1 h-4 w-4 shrink-0 text-ribbon" aria-hidden />{t}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-md border-2 border-ink bg-white p-7 shadow-[6px_6px_0_var(--color-royal)]">
            <h3 className="display text-xl text-royal">A Plumber King site</h3>
            <ul className="mt-5 space-y-3">{kingWay.map((t) => <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-royal" aria-hidden />{t}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Before/after slider adapted from the 21st.dev "Image Compare" component (0xuser64bit): pointer and touch drag on the
 * stage plus a real range input for keyboard and screen readers. Here the two layers are live HTML mockups instead of images.
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
      <div ref={stage} className="relative aspect-[4/5] cursor-ew-resize touch-pan-y overflow-hidden rounded-md border-2 border-ink bg-white select-none sm:aspect-[16/9]"
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
        <span aria-hidden className="sticker absolute top-4 left-4 bg-slate text-white" style={{ "--tilt": "-3deg" } as React.CSSProperties}>Typical site</span>
        <span aria-hidden className="sticker absolute top-4 right-4 bg-royal text-white" style={{ "--tilt": "3deg" } as React.CSSProperties}>Plumber King</span>
      </div>
      <label htmlFor={id} className="sr-only">Compare a typical plumber website with a Plumber King website</label>
      <input id={id} type="range" min={0} max={100} value={v} onChange={(e) => onValueChange(Number(e.target.value))} aria-valuetext={`${v}% typical site shown`} className="mt-4 w-full accent-[var(--color-ribbon)]" />
      <figcaption className="mt-1 text-sm text-slate">Illustration (SAMPLE): two made-up plumbing companies, not real clients.</figcaption>
    </figure>
  );
}

function TypicalSite() {
  return (
    <div className="h-full bg-[#eceae6] p-4 font-serif text-[#555] sm:p-8">
      <div className="flex items-center justify-between border-b border-[#ccc] pb-3"><span className="text-lg italic sm:text-2xl">Smith Plumbing Services LLC</span><span className="hidden gap-3 text-xs sm:flex"><span>Home</span><span>About</span><span>Services</span><span>Gallery</span><span>Links</span></span></div>
      <div className="mt-4 grid gap-4 sm:mt-6 sm:grid-cols-[1fr_1.2fr]">
        <div className="aspect-[4/3] bg-[repeating-linear-gradient(45deg,#d6d3cd_0_10px,#dedbd6_10px_20px)]" />
        <div className="text-[0.7rem] leading-relaxed sm:text-sm">
          <p className="font-bold">Welcome to our website!</p>
          <p className="mt-2">We are a family owned and operated business providing quality plumbing services to the area for many years. We take pride in our work and strive for customer satisfaction. Please browse our website to learn more about the services we offer. Contact us today.</p>
          <p className="mt-2 hidden sm:block">Our services include but are not limited to residential plumbing, commercial plumbing, repairs, installations and more. Call for details.</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-[#d9d6d0] px-4 py-2 text-[0.65rem] sm:px-8">© Copyright · Contact: (555) 010-0000 · Site last updated 2014</div>
    </div>
  );
}

function KingSite() {
  return (
    <div className="h-full bg-white p-4 sm:p-8">
      <div className="flex items-center justify-between"><span className="display text-base text-royal italic sm:text-xl">Riverside <span className="text-ribbon">Plumbing</span></span><span className="flex items-center gap-1.5 rounded bg-ribbon px-2.5 py-1.5 text-[0.65rem] font-extrabold text-white uppercase sm:text-xs"><Phone className="h-3.5 w-3.5" />Call now</span></div>
      <div className="mt-5 grid gap-5 sm:mt-8 sm:grid-cols-[1.2fr_1fr] sm:items-center">
        <div>
          <p className="display text-2xl leading-[0.95] text-ink sm:text-5xl">Burst pipe? <span className="accent">We&apos;re there in 60 minutes.</span></p>
          <div className="mt-3 flex items-center gap-1 text-ribbon">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}<span className="ml-2 text-xs font-semibold text-slate">Your Google reviews here</span></div>
          <div className="mt-4 flex gap-2"><span className="rounded bg-ribbon px-3 py-2 text-xs font-extrabold text-white uppercase">Call (555) 010-0000</span><span className="rounded border-2 border-ink px-3 py-2 text-xs font-extrabold uppercase">Get a quote</span></div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Water heaters", "Drains", "Repiping", "Leaks"].map((t) => <span key={t} className="rounded border-2 border-ink/10 bg-ivory px-2 py-3 text-center text-[0.7rem] font-bold text-ink sm:py-5 sm:text-sm">{t}</span>)}
        </div>
      </div>
    </div>
  );
}

