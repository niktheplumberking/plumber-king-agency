"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";

/** Accessible accordion. The answers are also in the page's FAQPage schema. */
export function FaqList({ items, tone = "light", level = 3 }: { items: { q: string; a: string }[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  const line = tone === "light" ? "border-navy-900/12" : "border-white/12";
  return (
    <div className={`border-t ${line}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`border-b ${line}`}>
            <H className="m-0 font-sans text-lg font-semibold tracking-normal md:text-xl">
              <button type="button" id={`${base}-q${i}`} aria-expanded={isOpen} aria-controls={`${base}-a${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left">
                {f.q}
                <Plus className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-ribbon" : ""}`} aria-hidden />
              </button>
            </H>
            {/* Answers stay in the HTML when closed (hidden), so search engines and AI assistants can read every one. */}
            <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} hidden={!isOpen} className="enter-fade">
              <p className={`max-w-[68ch] pb-6 text-[1.05rem] ${tone === "light" ? "text-slate" : "text-white/80"}`}>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
