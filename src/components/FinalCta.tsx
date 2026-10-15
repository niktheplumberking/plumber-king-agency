import { CalendarCheck, Check } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { CtaButton } from "./CtaButton";

/** Closing call to action on a blue blueprint band: book the call on Calendly, or send the short form. */
export function FinalCta({ kind = "strategy-call" }: { kind?: "strategy-call" | "website-audit" }) {
  return (
    <section id="book" className="on-blue blueprint relative overflow-hidden py-24 text-white md:py-32" aria-labelledby="final-h">
      <div className="container-x grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <h2 id="final-h" className="display text-t1">Ready to get your phone <span className="accent">ringing?</span></h2>
          <p className="mt-6 max-w-md text-t3 text-white/90">Book a free 30-minute strategy call. We&apos;ll look at your website, your Google presence and your competitors, and tell you straight what would get you more calls.</p>
          <ul className="mt-8 space-y-3">
            {["A straight answer on what's holding your site back", "What your top local competitors are doing", "Clear next steps for your business"].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-white" aria-hidden />{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <CtaButton />
            <span className="flex items-center gap-2 text-t3 text-white/90"><CalendarCheck className="h-4 w-4" aria-hidden />Pick a time that suits you</span>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="rounded-md border-2 border-ink bg-white p-6 text-ink shadow-[8px_8px_0_var(--color-ink)] md:p-10">
          <p className="display text-t2">Rather write? <span className="accent">Send the details.</span></p>
          <div className="mt-6"><LeadForm kind={kind} tone="light" /></div>
        </Reveal>
      </div>
    </section>
  );
}
