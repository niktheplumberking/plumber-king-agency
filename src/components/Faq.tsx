"use client";
import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Accessible accordion. The answers are also in the page's FAQPage schema. Restyled 2026-10-17 (Nick: "improve the FAQ
 * design"): numbered rows, a pink bar and lift on the open one, a plus that spins into a cross, hover feedback.
 * Pattern from the 21st.dev "Animated Line Accordion" (shadcnspace), in CSS (.fq in globals.css).
 */
export function FaqList({ items, level = 3 }: { items: { q: string; a: string }[]; tone?: "light" | "dark"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className="space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`fq ${isOpen ? "open" : ""}`}>
            <H className="m-0">
              <button type="button" id={`${base}-q${i}`} aria-expanded={isOpen} aria-controls={`${base}-a${i}`} onClick={() => setOpen(isOpen ? null : i)} className="fq-btn">
                <span aria-hidden className="fq-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">{f.q}</span>
                <span className="fq-ic"><Plus className="h-5 w-5" aria-hidden /></span>
              </button>
            </H>
            {/* Answers stay in the HTML when closed (hidden), so search engines and AI assistants can read every one. */}
            <div id={`${base}-a${i}`} role="region" aria-labelledby={`${base}-q${i}`} hidden={!isOpen} className="enter-fade">
              <p className="fq-a">{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
