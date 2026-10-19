"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Bobo sitting on the "Still got a question?" card (Nick 2026-10-19): an 8 s Higgsfield loop (job 4e045a51, same
 * still as first and last frame, green keyed out to a see-through WebM). Calm idle, one happy squint per loop. It loads
 * only near the screen, plays only while visible, and never for reduced motion, Save-Data or the Pause motion button;
 * those visitors, and Safari (no see-through WebM), keep the still duck.
 */
// Off until public/bobo/sit.webm is in the repo (Higgsfield's CDN is blocked from the build machine, Nick brings it over).
const SIT_READY = false;

export function SittingBobo({ fallback, className }: { fallback: React.ReactNode; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const stop = useRef(false);
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const safari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
    if (!SIT_READY || !el || safari || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setOn(true);
      const v = vid.current;
      if (v) { if (e.isIntersecting && !stop.current) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    const onMotion = (e: Event) => {
      stop.current = (e as CustomEvent<boolean>).detail;
      const v = vid.current;
      if (v) { if (stop.current) v.pause(); else v.play().catch(() => {}); }
    };
    window.addEventListener("pk-motion", onMotion);
    return () => { io.disconnect(); window.removeEventListener("pk-motion", onMotion); };
  }, []);
  return (
    <span ref={box} aria-hidden className={className}>
      {on ? (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" className="h-full w-full object-contain">
          <source src="/bobo/sit.webm" type="video/webm" />
        </video>
      ) : fallback}
    </span>
  );
}
