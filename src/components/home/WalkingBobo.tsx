"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Bobo walks along the scroll strips (Nick, 2026-10-16): a looping clip with a see-through background, made in
 * Higgsfield (job 2766a0fb, background removed). He waddles in from the right, stops, looks at you, waves and
 * walks back off. The clip loads only when the strips come near the screen, plays only while visible, and is
 * skipped for reduced motion and Save-Data, so it never slows the first paint.
 * WebM (VP9 with alpha) for Chrome, Edge and Firefox; HEVC with alpha (.mov) for Safari.
 */
// The clip is not in public/bobo yet (Higgsfield's CDN is blocked from the build machine). Flip on once
// walk.webm and walk.mov are added, so the page never requests files that are not there.
const WALK_READY = false;

export function WalkingBobo() {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || !WALK_READY || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setLoad(true);
      const v = vid.current;
      if (v) { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [load]);
  return (
    <div ref={box} aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-2.2rem)] z-20 aspect-[21/9] w-full md:bottom-[calc(100%-3rem)]">
      {load && (
        <video ref={vid} muted loop playsInline autoPlay preload="auto" className="h-full w-full object-contain object-bottom">
          <source src="/bobo/walk.mov" type='video/mp4; codecs="hvc1"' />
          <source src="/bobo/walk.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}
