import { Check } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";
import { CrownMark } from "./CrownMark";

export function FinalCta({ kind = "strategy-call" }: { kind?: "strategy-call" | "website-audit" }) {
  return (
    <section id="book" className="grain relative overflow-hidden bg-navy-900 py-24 text-white md:py-32" aria-labelledby="final-h">
      <CrownMark className="pointer-events-none absolute -bottom-10 -left-10 h-72 w-96 text-white/[0.04]" />
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <h2 id="final-h" className="text-[clamp(2.4rem,1.6rem+3.4vw,4.6rem)] font-extrabold">Ready to get your phone ringing?</h2>
          <p className="mt-5 max-w-md text-lg text-white/80">Book a free strategy call. We&apos;ll look at your website, your Google presence and your competitors, and tell you straight what would get you more calls.</p>
          <ul className="mt-8 space-y-3 text-white/90">
            {["A straight answer on what's holding your site back", "What your top local competitors are doing", "Clear next steps for your business"].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1} className="rounded-[2rem] bg-navy-950/60 p-6 ring-1 ring-white/10 md:p-10">
          <LeadForm kind={kind} />
        </Reveal>
      </div>
    </section>
  );
}
