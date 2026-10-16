"use client";
import { useRef, useState } from "react";
import { PINNED, useReducedMotion, useScrollProgress } from "@/lib/scroll";
import { Bot, MapPin, Phone, PhoneCall, Search, ShieldCheck, Star } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { CtaButton } from "../CtaButton";

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
    body: "Real photos of you and your trucks, your license and insurance, your reviews and your guarantee, right where a worried homeowner looks first. No stock-photo models, no walls of text.",
  },
  {
    key: "booked",
    label: "Booked",
    title: "They tap. Your phone rings.",
    body: "A call button under every thumb, a two-field quote form for the people who would rather type, and every lead sent to your phone straight away, so you get the job before they call someone else.",
  },
] as const;

/**
 * Section 3, rebuilt 2026-10-16. Media first (Nick's eye path): a big phone in a pink arch plays the story while
 * all three steps stay readable beside it, a pink rail fills as you scroll, and each step parks an object around
 * the phone, so the stage fills up instead of emptying. The button arrives after step 3. Phones and reduced motion
 * get a plain vertical timeline. Patterns from 21st.dev "Scroll Reveal Content A" (abui) and "Scroll animated
 * timeline" (ibrandify), ported to our scroll hook (no extra library).
 */
const parked = [
  { icon: Search, text: "emergency plumber near me", cls: "top-[8%] -left-[22%] bg-white text-ink", tilt: "-6deg" },
  { icon: ShieldCheck, text: "Licensed & insured", cls: "top-[42%] -right-[26%] bg-ink text-white", tilt: "5deg" },
  { icon: PhoneCall, text: "New call from your site", cls: "bottom-[10%] -left-[18%] bg-ribbon-deep text-white", tilt: "-4deg" },
] as const;

export function StoryScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, PINNED, (p) => {
    setActive(Math.min(2, Math.floor(p * 3.2)));
    if (rail.current) rail.current.style.transform = `scaleY(${Math.min(1, p * 1.15)})`;
  }, true);

  const steps3 = (cur: number) => (
    <ol className="relative mt-10 space-y-8 pl-14">
      <div aria-hidden className="absolute top-2 bottom-2 left-[1.1rem] w-1 rounded bg-ink/10">
        <div ref={rail} className="h-full w-full origin-top scale-y-0 rounded bg-ribbon" />
      </div>
      {steps.map((s, i) => {
        const Icon = parked[i].icon;
        const on = i <= cur;
        return (
          <li key={s.key} className={`relative transition-opacity duration-500 ${on ? "opacity-100" : "opacity-45"}`}>
            <span className={`absolute top-0 -left-14 grid h-10 w-10 place-items-center rounded-full border-2 transition-colors duration-500 ${on ? "border-ribbon-deep bg-ribbon-deep text-white" : "border-ink/15 bg-white text-slate"}`}><Icon className="h-5 w-5" aria-hidden /></span>
            <h3 className="display text-t2">{s.label}: {s.title}</h3>
            <p className="mt-2 max-w-lg text-t3 text-slate">{s.body}</p>
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
          {steps3(2)}
          <div className="mt-12"><CtaButton /></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative bg-sky lg:h-[240vh]" aria-labelledby="story-h">
      <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden lg:py-0">
        <div aria-hidden className="hero-dots pointer-events-none absolute top-[12%] right-0 h-64 w-[30%] rotate-180" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* 1) Media: the phone in a pink arch, with the parked objects around it. */}
          <div className="relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]">
            <div aria-hidden className="absolute -inset-x-[30%] top-[6%] -bottom-[6%] rounded-t-full bg-[linear-gradient(180deg,var(--color-ribbon),var(--color-ribbon-deep))]" />
            <div className="relative -rotate-3">
              <PhoneFrame>
                <div className="h-[30rem]">
                  {active === 0 && <ScreenFound key="f" />}
                  {active === 1 && <ScreenTrusted key="t" />}
                  {active === 2 && <ScreenBooked key="b" />}
                </div>
              </PhoneFrame>
            </div>
            {parked.map((o, i) => (
              <span key={o.text} aria-hidden className={`sticker absolute hidden transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(.16,1,.3,1)] lg:inline-flex ${o.cls} ${i <= active ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-75 opacity-0"}`} style={{ "--tilt": o.tilt } as React.CSSProperties}>
                <o.icon className="h-4 w-4" />{o.text}
              </span>
            ))}
            <p className="relative mt-4 text-center text-t3 text-white">SAMPLE illustration</p>
          </div>

          {/* 2) Title, 3) the three steps on a filling rail, 4) the button after step 3. */}
          <div>
            <h2 id="story-h" className="display text-t1">From invisible to <span className="accent">booked.</span></h2>
            {steps3(active)}
            <div className={`mt-10 transition-[opacity,translate] duration-700 lg:pl-14 ${active === 2 ? "translate-y-0 opacity-100" : "lg:translate-y-4 lg:opacity-0"}`}><CtaButton /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScreenFound() {
  return (
    <div className="enter-fade px-4 pt-4">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.8rem] text-ink"><Search className="h-4 w-4 text-slate" aria-hidden />emergency plumber near me</div>
      <div className="mt-4 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
        <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-royal-200"><Bot className="h-3.5 w-3.5" aria-hidden /> AI answer</p>
        <p className="mt-1.5 text-[0.78rem] leading-relaxed text-white/90">For a burst pipe tonight, <span className="rounded bg-gold/25 px-1 font-semibold text-gold-300">Your Plumbing Co.</span> handles emergency calls in your area and is well reviewed...</p>
      </div>
      <p className="mt-4 text-[0.75rem] font-semibold text-white/90">Places</p>
      {["Your Plumbing Co.", "Other Plumbing", "Another Rooter"].map((n, i) => (
        <div key={n} className={`mt-2 flex items-center gap-3 rounded-xl p-3 ${i === 0 ? "bg-gold/15 ring-1 ring-gold/40" : "bg-white/[0.05]"}`}>
          <MapPin className={`h-4.5 w-4.5 ${i === 0 ? "text-gold" : "text-white/90"}`} aria-hidden />
          <div className="min-w-0 flex-1"><p className={`truncate text-[0.82rem] font-semibold ${i === 0 ? "text-white" : "text-white/90"}`}>{n}</p><p className="text-[0.75rem] text-white/90">Plumber · Nearby</p></div>
          {i === 0 && <Phone className="h-4 w-4 text-gold" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function ScreenTrusted() {
  return (
    <div className="enter-fade px-4 pt-4">
      <div className="rounded-xl bg-royal p-4">
        <p className="text-[0.75rem] font-semibold text-gold">YOUR PLUMBING CO.</p>
        <p className="mt-1 font-display text-xl leading-tight font-bold">Fast, honest plumbing in Cary & Raleigh</p>
        <div className="mt-3 flex gap-0.5 text-gold" aria-label="Your Google rating">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />)}</div>
        <div className="mt-3 rounded-full bg-ribbon py-2 text-center text-[0.78rem] font-semibold">Call now</div>
      </div>
      <ul className="mt-3 space-y-2 text-[0.78rem]">
        {["Reviews from your neighbors", "Real photos of our team", "Clear service areas", "Call or text, your choice"].map((t) => (
          <li key={t} className="flex items-center gap-2 rounded-xl bg-white/[0.06] px-3 py-2.5"><ShieldCheck className="h-4 w-4 text-gold" aria-hidden />{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ScreenBooked() {
  return (
    <div className="enter-fade flex h-full flex-col items-center px-6 pt-14 text-center">
      <span className="enter-pulse grid h-20 w-20 place-items-center rounded-full bg-ribbon shadow-[0_0_0_10px_rgb(255_61_139/0.2),0_0_0_22px_rgb(255_61_139/0.1)]">
        <PhoneCall className="h-9 w-9" aria-hidden />
      </span>
      <p className="mt-8 text-[0.75rem] font-semibold text-white/90">Incoming call · from your website</p>
      <p className="mt-1 font-display text-2xl font-bold">New customer</p>
      <p className="text-[0.82rem] text-white/90">Water heater leaking · Apex, NC</p>
      <div className="mt-auto mb-8 flex w-full gap-3">
        <span className="flex-1 rounded-full bg-white/10 py-3 text-[0.8rem]">Decline</span>
        <span className="flex-1 rounded-full bg-[#1d7a3c] py-3 text-[0.8rem] font-semibold">Accept</span>
      </div>
    </div>
  );
}
