"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Bobo walks along the scroll strips (Nick, 2026-10-16): a looping clip with a see-through background, made in
 * Higgsfield (job 2766a0fb, background removed). He waddles in from the right, stops, looks at you, waves and
 * walks back off. The clip loads only when the strips come near the screen, plays only while visible, and is
 * skipped for reduced motion and Save-Data, so it never slows the first paint.
 * WebM (VP9 with alpha, 450 KB) for Chrome, Edge and Firefox. Safari can't show see-through WebM, so it gets an
 * animated WebP of the same walk instead (12 fps, smaller). Alpha was cut locally from Higgsfield's
 * background-removed copy; the feet sit at 91% of the clip's height, which the offset below lands on the strip.
 */
const WALK_READY = true;
const isSafari = () => /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

export function WalkingBobo() {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);
  // WCAG 2.2.2: anything that moves for more than 5 seconds gets a pause button. Paused stays paused while scrolling.
  const [paused, setPaused] = useState(false);
  const stop = useRef(false);
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || !WALK_READY || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStill(isSafari()); setLoad(true); }
      const v = vid.current;
      if (v) { if (e.isIntersecting && !stop.current) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [load]);
  const toggle = () => {
    stop.current = !paused;
    setPaused(!paused);
    const v = vid.current;
    if (v) { if (paused) v.play().catch(() => {}); else v.pause(); }
  };
  return (
    <div ref={box} className="walk-bobo">
      {load && (
        <button type="button" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Play Bobo walking animation" : "Pause Bobo walking animation"} className="pointer-events-auto absolute bottom-1 left-3 z-10 md:right-3 md:left-auto inline-flex h-11 items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3 text-t3 font-semibold text-ink">
          {paused ? <Play className="h-4 w-4 fill-current" aria-hidden /> : <Pause className="h-4 w-4 fill-current" aria-hidden />}<span aria-hidden>{paused ? "Play" : "Pause"} Bobo</span>
        </button>
      )}
      <div aria-hidden className="h-full w-full">{load && (still ? (paused ? null : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/bobo/walk.webp" alt="" width={720} height={308} decoding="async" className="h-full w-full" />
      )) : (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" className="h-full w-full">
          <source src="/bobo/walk.webm" type="video/webm" />
        </video>
      ))}</div>
    </div>
  );
}
