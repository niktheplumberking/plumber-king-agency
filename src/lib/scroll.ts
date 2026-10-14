"use client";
import { useEffect, useState, type RefObject } from "react";

/**
 * A scroll range, the same idea as Motion's `offset`: progress is 0 when the element's point `e0` (0 = its top,
 * 1 = its bottom) meets the viewport's point `v0` (0 = top, 1 = bottom), and 1 when `e1` meets `v1`.
 */
export type ScrollRange = [e0: number, v0: number, e1: number, v1: number];
export const ENTER_TO_EXIT: ScrollRange = [0, 1, 1, 0]; // from entering the bottom to leaving the top
export const PINNED: ScrollRange = [0, 0, 1, 1]; // while a tall section is pinned to the viewport
export const SCROLL_AWAY: ScrollRange = [0, 0, 1, 0]; // a top-of-page section scrolling away

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function progressOf(el: Element, [e0, v0, e1, v1]: ScrollRange) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const f0 = r.top + e0 * r.height - v0 * vh;
  const f1 = r.top + e1 * r.height - v1 * vh;
  const p = f0 === f1 ? 0 : f0 / (f0 - f1);
  return Math.min(1, Math.max(0, p));
}

/**
 * Calls `onProgress` with the element's scroll progress (0..1), once per animation frame while scrolling.
 * Writes go straight to the DOM in the callback, so scrolling never re-renders React. Skipped under reduced motion
 * unless `always` is set (for state that must still update, such as which story step is showing).
 */
export function useScrollProgress(ref: RefObject<Element | null>, range: ScrollRange, onProgress: (p: number) => void, always = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el || (!always && reducedMotion())) return;
    let frame = 0;
    const update = () => { frame = 0; onProgress(progressOf(el, range)); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, always, ...range]);
}

/** Linear map of progress p from [0,1] onto [a,b]. */
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** True when the visitor asked their system for reduced motion (false during the server render). */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}
