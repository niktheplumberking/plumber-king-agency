"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useEffect, type RefObject } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs GSAP setup scoped to one element and reverts every tween and ScrollTrigger on unmount
 * (same contract as @gsap/react's useGSAP, without the extra package). Skipped for reduced motion,
 * so the static layout is what those visitors see.
 */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: (ctx: { reduce: boolean; mobile: boolean }) => void | (() => void), deps: unknown[] = []) {
  useIso(() => {
    const el = scope.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context(() => { cleanup = setup({ reduce, mobile: window.innerWidth < 768 }); }, el);
    return () => { if (typeof cleanup === "function") cleanup(); ctx.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
