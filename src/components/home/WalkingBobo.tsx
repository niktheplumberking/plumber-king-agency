"use client";
import { useEffect, useRef, useState } from "react";

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
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || !WALK_READY || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStill(isSafari()); setLoad(true); }
      const v = vid.current;
      if (v) { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [load]);
  return (
    <div ref={box} aria-hidden className="pointer-events-none absolute right-0 bottom-[calc(100%-3.85vw-0.6rem)] z-20 aspect-[1280/548] w-full lg:bottom-[calc(100%-2.3vw-0.6rem)] lg:w-[60%]">
      {load && (still ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/bobo/walk.webp" alt="" width={720} height={308} decoding="async" className="h-full w-full" />
      ) : (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" className="h-full w-full">
          <source src="/bobo/walk.webm" type="video/webm" />
        </video>
      ))}
    </div>
  );
}
