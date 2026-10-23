"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Bobo walks along the bottom edge of the "From invisible to booked" section (moved there from the strips, Nick
 * 2026-10-17 17:05): a looping clip with a see-through background, made in Higgsfield (job 2766a0fb, background
 * removed). He waddles in from the right, stops, looks at you, waves and walks back off. The clip loads only near the
 * screen, plays only while visible, and is skipped for reduced motion and Save-Data, so it never slows the first paint.
 * WebM (VP9 with alpha) for Chrome, Edge and Firefox. Safari can't show see-through WebM, so it gets an animated WebP
 * of the same walk. The feet sit at 91% of the clip's height; .walk-bobo lands them on the section's bottom edge.
 * Nick 2026-10-19: the walk plays at 1.1x speed and, once Bobo has walked off, the stage stays empty for REST ms
 * before he walks in again (no back-to-back loop). Safari's WebP copy (walk-once.webp) has the same 1.1x timing baked
 * in and plays once; it is restarted after the same rest.
 */
const SPEED = 1.1;
const REST = 3500;
/** walk-once.webp length in ms (walk.webp's 9916 ms divided by SPEED). */
const WEBP_MS = 8965;
const isSafari = () => /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

export function WalkingBobo() {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [still, setStill] = useState(false);
  const [paused, setPaused] = useState(false);
  const [lap, setLap] = useState(0);
  const [resting, setResting] = useState(false);
  const stop = useRef(false);
  const seen = useRef(false);
  const rest = useRef(0);
  useEffect(() => {
    const el = box.current;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || nav.connection?.saveData) return;
    const io = new IntersectionObserver(([e]) => {
      seen.current = e.isIntersecting;
      if (e.isIntersecting) { setStill(isSafari()); setLoad(true); }
      const v = vid.current;
      if (v && !rest.current) { if (e.isIntersecting && !stop.current) v.play().catch(() => {}); else v.pause(); }
    }, { rootMargin: "300px 0px" });
    io.observe(el);
    // The page's one "Pause motion" button stops Bobo too.
    const onMotion = (e: Event) => {
      const p = (e as CustomEvent<boolean>).detail;
      stop.current = p; setPaused(p);
      const v = vid.current;
      if (v && !rest.current) { if (p) v.pause(); else v.play().catch(() => {}); }
    };
    window.addEventListener("pk-motion", onMotion);
    return () => { io.disconnect(); window.removeEventListener("pk-motion", onMotion); clearTimeout(rest.current); };
  }, [load]);

  // After each walk: wait REST ms, then walk again (only if still on screen and motion is not paused).
  const again = () => {
    clearTimeout(rest.current);
    rest.current = window.setTimeout(function next() {
      if (stop.current || !seen.current) { rest.current = window.setTimeout(next, 500); return; }
      rest.current = 0;
      const v = vid.current;
      if (v) { v.currentTime = 0; v.play().catch(() => {}); } else { setResting(false); setLap((n) => n + 1); }
    }, REST);
  };

  // Safari: the WebP plays once; hide it when the walk is over, then remount it after the rest.
  useEffect(() => {
    if (!load || !still || paused) return;
    const t = window.setTimeout(() => { setResting(true); again(); }, WEBP_MS);
    return () => clearTimeout(t);
  }, [load, still, paused, lap]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={box} aria-hidden className="walk-bobo">{load && (still ? (paused || resting ? null : (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={lap} src="/bobo/walk-once.webp" alt="" width={480} height={205} decoding="async" className="h-full w-full" />
    )) : (
      <video ref={vid} muted playsInline autoPlay preload="auto" className="h-full w-full"
        onLoadedMetadata={(e) => { e.currentTarget.playbackRate = SPEED; }}
        onPlay={(e) => { e.currentTarget.playbackRate = SPEED; }}
        onEnded={again}>
        <source src="/bobo/walk.webm" type="video/webm" />
      </video>
    ))}</div>
  );
}

/**
 * WCAG 2.2.2: anything that moves on its own for more than 5 seconds can be paused. One button, above the strips,
 * stops everything: the strips (ScrollFx), Bobo's walk and the repeating button and card nudges (html.pk-still in CSS).
 * Paused stays paused while scrolling.
 */
export function PauseMotion() {
  const [on, setOn] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setOn(true); }, []);
  const toggle = () => {
    const p = !paused;
    window.dispatchEvent(new CustomEvent("pk-motion", { detail: p }));
    document.documentElement.classList.toggle("pk-still", p);
    setPaused(p);
  };
  return on ? (
    <button type="button" onClick={toggle} aria-pressed={paused} aria-label={`${paused ? "Play" : "Pause"} motion: the moving strips and Bobo`} className="pause-pill">
      {paused ? <Play className="h-4 w-4 fill-current" aria-hidden /> : <Pause className="h-4 w-4 fill-current" aria-hidden />}<span aria-hidden>{paused ? "Play" : "Pause"} motion</span>
    </button>
  ) : null;
}
