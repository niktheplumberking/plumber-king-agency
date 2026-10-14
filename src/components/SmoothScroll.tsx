"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth scrolling (Nick asked for it, 2026-10-14), driven by GSAP's ticker so ScrollTrigger scenes stay in sync.
 * Off for reduced motion and for touch screens, where native scrolling already feels right.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, anchors: { offset: -88 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  // New page: recalculate every pinned scene once the new layout is in.
  useEffect(() => { const id = requestAnimationFrame(() => ScrollTrigger.refresh()); return () => cancelAnimationFrame(id); }, [pathname]);
  return null;
}
