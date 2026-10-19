"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Bobo sitting on the "Still got a question?" card (Nick 2026-10-19): an 8 s Higgsfield loop (job 4e045a51, same
 * still as first and last frame, green keyed out to a see-through WebM). Calm idle, one happy squint per loop. It loads
 * only near the screen and plays only while visible. Safari has no see-through WebM, so it gets the same loop as an
 * animated WebP (sit.webp). Reduced motion, Save-Data and the Pause motion button show the still first frame instead.
 */

export function SittingBobo({ fallback, className }: { fallback: React.ReactNode; className?: string }) {
  const box = useRef<HTMLSpanElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [safari, setSafari] = useState(false);
  const [paused, setPaused] = useState(false);
  const stop = useRef(false);
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    // Every iPhone/iPad browser is WebKit underneath, so all of them take the WebP path, not only Safari.
    setSafari(/iP(hone|ad|od)/.test(navigator.userAgent) || /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent));
    stop.current = document.documentElement.classList.contains("pk-still");
    setPaused(stop.current);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setOn(true);
      const v = vid.current;
      if (v) { if (e.isIntersecting && !stop.current) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    const onMotion = (e: Event) => {
      stop.current = (e as CustomEvent<boolean>).detail;
      setPaused(stop.current);
      const v = vid.current;
      if (v) { if (stop.current) v.pause(); else v.play().catch(() => {}); }
    };
    window.addEventListener("pk-motion", onMotion);
    return () => { io.disconnect(); window.removeEventListener("pk-motion", onMotion); };
  }, []);
  return (
    <span ref={box} aria-hidden className={className}>
      {on && safari ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={paused ? "/bobo/sit-still.webp" : "/bobo/sit.webp"} alt="" width={216} height={384} className="h-full w-full object-contain" />
      ) : on ? (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" poster="/bobo/sit-still.webp" className="h-full w-full object-cover">
          <source src="/bobo/sit.webm" type="video/webm" />
        </video>
      ) : fallback}
    </span>
  );
}
