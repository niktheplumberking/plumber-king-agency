"use client";
import { useRef, useState } from "react";
import { PINNED, useReducedMotion, useScrollProgress } from "@/lib/scroll";
import { PhoneCall, Search, ShieldCheck } from "lucide-react";
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
 * Section 3, rebuilt 2026-10-16. Media first (Nick's eye path): a big phone in a pink arch plays the story while
 * all three steps stay readable beside it, a pink rail fills as you scroll, and each step parks an object around
 * the phone, so the stage fills up instead of emptying. The button arrives after step 3. Phones and reduced motion
 * get a plain vertical timeline. Patterns from 21st.dev "Scroll Reveal Content A" (abui) and "Scroll animated
 * timeline" (ibrandify), ported to our scroll hook (no extra library).
 */
const parked = [
  { icon: Search, text: "emergency plumber near me", cls: "top-[8%] -left-[22%] bg-white text-ink", tilt: "-6deg" },
  { icon: ShieldCheck, text: "Real photos, real you", cls: "top-[42%] -right-[26%] bg-ink text-white", tilt: "5deg" },
  { icon: PhoneCall, text: "New call from your site", cls: "bottom-[10%] -left-[18%] bg-ribbon-deep text-white", tilt: "-4deg" },
] as const;

const screens = [
  { src: "/media/screen-found.webp", alt: "Phone search for emergency plumber near me: an AI answer and the map list both show Your Plumbing Co. first" },
  { src: "/media/screen-trusted.webp", alt: "Phone showing the plumber's website: a headline, five stars, a Call now button and trust points" },
  { src: "/media/screen-booked.webp", alt: "Phone showing an incoming call from the website: new customer, water heater leaking" },
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

  /* Nick 2026-10-17: only the step being read is lit. Its icon turns pink, its title and text grow (a scale, so the
     page keeps exactly 3 type sizes) and its title fades linearly from ink to pink; earlier steps go back to normal.
     `all` lights every icon for the reduced-motion list, where nothing moves. */
  const steps3 = (cur: number, all = false) => (
    <ol className="relative mt-10 space-y-8 pl-14">
      <div aria-hidden className="absolute top-2 bottom-2 left-[1.1rem] w-1 rounded bg-ink/10">
        <div ref={rail} className="h-full w-full origin-top scale-y-0 rounded bg-ribbon" />
      </div>
      {steps.map((s, i) => {
        const Icon = parked[i].icon;
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
          {steps3(-1, true)}
          <div className="mt-12"><CtaButton /></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative overflow-x-clip bg-sky lg:h-[240vh]" aria-labelledby="story-h">
      <div className="py-24 lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:items-center lg:overflow-hidden lg:py-0">
        <div aria-hidden className="hero-dots pointer-events-none absolute top-[12%] right-0 h-64 w-[30%] rotate-180" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* 1) Media: the phone in a pink arch, with the parked objects around it. */}
          <div className="relative mx-auto w-full max-w-[19rem] lg:max-w-[22rem]">
            <div aria-hidden className="absolute -inset-x-[30%] top-[6%] -bottom-[6%] rounded-t-full bg-[linear-gradient(180deg,var(--color-ribbon),var(--color-ribbon-deep))]" />
            <div className="relative -rotate-3">
              <PhoneFrame>
                <div className="h-[30rem]">
                  {/* The phone screens are pictures (made from the old mock markup), so the page keeps exactly 3 text sizes. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img key={active} src={screens[active].src} alt={screens[active].alt} width={333} height={481} loading="lazy" decoding="async" className="enter-fade block h-full w-full object-cover object-top" />
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
