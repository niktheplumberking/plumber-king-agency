"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Marks [data-reveal] elements as shown when they scroll into view (re-scans after each client-side navigation). */
export function RevealObserver() {
  const path = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("pk-ready");
    // The load-in (layout.tsx) is done after about 1.2 s; from then on it never replays, not even on in-app navigation.
    const done = window.setTimeout(() => root.classList.add("pk-intro-done"), Math.max(0, 1500 - performance.now()));
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver((entries) => {
      // Blocks that come into view together go in reading order, 0.07 s apart (at most 0.35 s), once each.
      const shown = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)
        .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
      shown.forEach((el, i) => {
        el.style.setProperty("--rs", `${Math.min(i, 5) * 0.07}s`);
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    els.forEach((el) => io.observe(el));
    // About 65% of buttons, picked at random on each page, get a small repeating shake (Nick 2026-10-17); CSS .nudge.
    // Exactly 65% (rounded), shuffled, so the share holds on every load instead of drifting with chance.
    const btns = [...document.querySelectorAll<HTMLElement>(".btn:not(.nudge):not(.no-nudge)")].sort(() => Math.random() - 0.5);
    btns.slice(0, Math.round(btns.length * 0.65)).forEach((b) => {
      b.style.setProperty("--nd", `${(Math.random() * 6).toFixed(1)}s`); b.classList.add("nudge");
    });
    return () => { io.disconnect(); window.clearTimeout(done); };
  }, [path]);
  return null;
}
