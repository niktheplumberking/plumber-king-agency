"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, useGsap } from "@/lib/gsap";

/** Hero wrapper: as it scrolls away the video frame sinks a little, the type lifts off faster than the page, and the lead cards drift. */
export function HeroMotion({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, () => {
    const st = { trigger: ref.current, start: "top top", end: "bottom top", scrub: true };
    gsap.to("[data-hero-media]", { yPercent: 8, ease: "none", scrollTrigger: st });
    gsap.to("[data-hero-copy]", { yPercent: -18, ease: "none", scrollTrigger: st });
    gsap.to("[data-hero-leads]", { y: -120, ease: "none", scrollTrigger: st });
    gsap.to("[data-hero-sticker]", { y: 160, rotate: 10, ease: "none", scrollTrigger: st });
  });
  return <section ref={ref} className={className}>{children}</section>;
}

/**
 * The silent looping clip over the still. It loads only after the page is idle, never for reduced motion or
 * Save-Data, and fades in once it can play, so it never delays the first paint.
 */
// The Higgsfield loop is not in public/media yet (its CDN is blocked from the build machine). Flip this on once
// hero-loop.webm and hero-loop.mp4 are copied in, so the page never requests files that are not there.
const HERO_VIDEO_READY = false;

export function HeroVideo() {
  const [on, setOn] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const start = () => setOn(true);
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const id = w.requestIdleCallback ? w.requestIdleCallback(start) : window.setTimeout(start, 1200);
    return () => { if (!w.requestIdleCallback) clearTimeout(id); };
  }, []);
  if (!on || !HERO_VIDEO_READY) return null;
  return (
    <video aria-hidden muted loop playsInline autoPlay preload="auto" poster="/media/hero-1280.webp" onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover object-[72%_50%] transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
      <source src="/media/hero-loop.webm" type="video/webm" />
      <source src="/media/hero-loop.mp4" type="video/mp4" />
    </video>
  );
}
