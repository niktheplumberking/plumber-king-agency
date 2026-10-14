"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Accessible accordion. The answers are also in the page's FAQPage schema. */
export function FaqList({ items, tone = "light", level = 3 }: { items: { q: string; a: string }[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`rounded-md border-2 transition-colors duration-300 ${tone === "light" ? (isOpen ? "border-ink bg-ink text-white" : "border-ink/15 bg-white hover:border-ink") : (isOpen ? "border-white bg-white text-ink" : "border-white/25")}`}>
            <H className="m-0 font-sans text-base font-extrabold tracking-wide uppercase md:text-lg">
              <button type="button" id={`${base}-q${i}`} aria-expanded={isOpen} aria-controls={`${base}-a${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-left md:px-6">
                {f.q}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-ribbon text-ink"><Plus className={`h-4.5 w-4.5 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden /></span>
              </button>
            </H>
            {/* Answers stay in the HTML when closed (hidden), so search engines and AI assistants can read every one. */}
            <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} hidden={!isOpen} className="enter-fade">
              <p className={`max-w-[68ch] px-5 pb-6 text-[1.05rem] md:px-6 ${isOpen && tone === "light" ? "text-white/90" : "text-slate"}`}>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
