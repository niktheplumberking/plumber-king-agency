import { CalendarCheck, Check, FileCheck2, Handshake, KeyRound, LifeBuoy } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { CtaButton } from "./CtaButton";

/** Promises we already make in the FAQ and Terms, shown where the visitor decides. */
const word = [
  { icon: Handshake, t: "No commitment, no hard sell" },
  { icon: KeyRound, t: "You own your website" },
  { icon: LifeBuoy, t: "3 months of support in the contract" },
  { icon: FileCheck2, t: "A timeline before we start" },
];

/**
 * Closing call to action, rebuilt 2026-10-17 (Nick: "make it as easy as possible to take the next step"). Two clear
 * paths side by side, after the 21st.dev "Contact 01" (shadcnspace) layout: pick a time on Calendly, or send the
 * two-step form. Under them, the promises we stand behind, and a personal note from Nick, so the visitor knows who
 * answers.
 * Nick 2026-10-20: title centred with "ringing?" 1.15x on its own row; his photo and one-line note sit just above the
 * "Fastest" card; both card titles 1.3x; the call button stays still and only grows smoothly on hover.
 */
export function FinalCta({ kind = "strategy-call" }: { kind?: "strategy-call" | "website-audit" }) {
  return (
    <section id="book" className="on-blue blueprint relative overflow-hidden py-24 text-white md:py-32" aria-labelledby="final-h">
      <div className="container-x">
        <Reveal>
          <h2 id="final-h" className="display text-t1 text-center">Ready to get your phone <span className="accent fc-ring">ringing?</span></h2>
        </Reveal>
        <Reveal className="mt-14 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nick/avatar-w5-192.webp" alt="Nick" width={192} height={192} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-full border-2 border-ink object-cover object-top" />
          {/* Batch 3: set as a bold statement in the title font (Nick disliked the small body-text look). */}
          <p className="fc-note display text-t2 text-ink">You work exclusively with me, and me only. Contract included.</p>
        </Reveal>
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-8">
          <Reveal className="fc-card fc-call">
            <span className="fc-tag"><CalendarCheck className="h-4 w-4" aria-hidden />Fastest</span>
            <p className="display fc-h">Pick a time for a free 30-minute strategy call.</p>
            <ul className="mt-6 space-y-3">
              {["A straight answer on what's holding your site back", "What your top local competitors are doing", "Clear next steps for your business"].map((t) => (
                <li key={t} className="flex gap-3 text-t3"><Check className="mt-1 h-5 w-5 shrink-0 text-ribbon" aria-hidden />{t}</li>
              ))}
            </ul>
            <CtaButton className="fc-btn no-nudge mt-8" />
          </Reveal>
          <Reveal delay={0.1} className="fc-card">
            <span className="fc-tag light">2 quick steps</span>
            <p className="display fc-h">Rather write? <span className="accent">Send the details.</span></p>
            <div className="mt-6"><LeadForm kind={kind} tone="light" /></div>
          </Reveal>
        </div>
        <Reveal as="section" className="mt-6">
          <h3 className="sr-only">What we stand behind</h3>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {word.map((w) => <li key={w.t} className="fc-word"><w.icon className="h-5 w-5" aria-hidden />{w.t}</li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
