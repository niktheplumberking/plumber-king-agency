"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Marks [data-reveal] elements as shown when they scroll into view (re-scans after each client-side navigation). */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach((el) => io.observe(el));
    // About 65% of buttons, picked at random on each page, get a small repeating shake (Nick 2026-10-17); CSS .nudge.
    // Exactly 65% (rounded), shuffled, so the share holds on every load instead of drifting with chance.
    const btns = [...document.querySelectorAll<HTMLElement>(".btn:not(.nudge)")].sort(() => Math.random() - 0.5);
    btns.slice(0, Math.round(btns.length * 0.65)).forEach((b) => {
      b.style.setProperty("--nd", `${(Math.random() * 6).toFixed(1)}s`); b.classList.add("nudge");
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
