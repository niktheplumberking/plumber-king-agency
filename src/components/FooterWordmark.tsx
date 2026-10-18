"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * The giant "Plumber King Agency" at the foot of every page. From 21st.dev "Beam Wordmark Footer" Nick took exactly
 * three things (2026-10-18): letters rise in, one after another, the first time the footer is seen; each letter lifts
 * and grows under the pointer (and hops when clicked); a soft pink glow follows the pointer and lights the letters it
 * passes. The drifting beam of light was left out on purpose. "Agency" is stretched so the line runs edge to edge.
 * Reduced motion: no rise, no lift, no hop (the glow only moves when the pointer does). Decorative: the footer
 * already names the business in text, so screen readers skip this.
 */
/** How much wider "Agency" is drawn than the other two words (Nick: "stretch the word Agency even more"). */
const STRETCH = 1.12;

const words = [
  { text: "Plumber", cls: "" },
  { text: "King", cls: "fw-king" },
  { text: "Agency", cls: "fw-stretch" },
];

export function FooterWordmark() {
  const box = useRef<HTMLDivElement>(null);

  // Hide the letters below the line only once JS runs and only if the footer is still off screen, so a page without
  // JS (or one opened at the footer) never shows an empty band.
  useLayoutEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top > window.innerHeight) el.dataset.in = "false";
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const groups = Array.from(el.querySelectorAll<HTMLElement>(".fw-w"));
    const stretch = el.querySelector<HTMLElement>(".fw-stretch");
    const line = el.querySelector<HTMLElement>(".fw-line");

    // Fit the line edge to edge: "Agency" is stretched by STRETCH, then the font size is solved so the line's right
    // edge (slant included) lands on the box's inner right edge. Everything scales with the font size, so one
    // measurement at 100 px gives the answer.
    const fit = () => {
      if (!stretch || !line) return;
      stretch.style.transform = `scaleX(${STRETCH})`;
      line.style.fontSize = "100px";
      const pad = parseFloat(getComputedStyle(el).paddingRight) || 0;
      const right = el.getBoundingClientRect().right - pad;
      const left = groups[0].getBoundingClientRect().left;
      const reach = stretch.getBoundingClientRect().right - left;
      if (!(reach > 0)) return;
      line.style.fontSize = ((100 * (right - left)) / reach).toFixed(2) + "px";
      // Each letter paints a background the size of its word, shifted back by its own offset, so one glow spans the word.
      for (const g of groups) {
        g.style.setProperty("--fw-ww", g.offsetWidth + "px");
        g.style.setProperty("--fw-wh", g.offsetHeight * 1.6 + "px"); // tall enough for the g and y tails
        g.querySelectorAll<HTMLElement>(".fw-l").forEach((l) => {
          l.style.setProperty("--fw-x", l.offsetLeft + "px");
          l.style.setProperty("--fw-y", l.offsetTop + "px");
        });
      }
    };
    let frame = 0;
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
    fit();
    document.fonts?.ready.then(schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    // Pointer glow: the pointer in each word's own unscaled coordinates.
    let px = 0, py = 0, pending = false;
    const paint = () => {
      pending = false;
      for (const g of groups) {
        const r = g.getBoundingClientRect();
        const sx = r.width / (g.offsetWidth || 1);
        const sy = r.height / (g.offsetHeight || 1);
        g.style.setProperty("--fw-px", ((px - r.left) / sx).toFixed(1) + "px");
        g.style.setProperty("--fw-py", ((py - r.top) / sy).toFixed(1) + "px");
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      el.classList.add("fw-lit");
      if (!pending) { pending = true; requestAnimationFrame(paint); }
    };
    const onLeave = () => el.classList.remove("fw-lit");
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    // Rise in once, the first time it is on screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.dataset.in = "true"; io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(el);

    return () => {
      cancelAnimationFrame(frame); ro.disconnect(); io.disconnect();
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const hop = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = e.currentTarget;
    l.classList.remove("is-hop");
    void l.offsetWidth;
    l.classList.add("is-hop");
  };

  let n = 0;
  return (
    <div ref={box} aria-hidden className="fw fit-box border-t border-white/10 px-[2vw] pt-10 pb-6">
      <span className="fw-line slant">
        {words.map((w, wi) => (
          <span key={w.text} className={`fw-w ${w.cls}`}>
            {Array.from(w.text).map((ch, i) => {
              const d = 260 + n++ * 75;
              return (
                <span key={i} className="fw-lw" style={{ "--fw-d": `${d}ms` } as React.CSSProperties}>
                  <span className="fw-l" onClick={hop} onAnimationEnd={(e) => e.currentTarget.classList.remove("is-hop")}>{ch}</span>
                </span>
              );
            })}
            {wi < words.length - 1 && <span className="fw-sp"> </span>}
          </span>
        ))}
      </span>
    </div>
  );
}
