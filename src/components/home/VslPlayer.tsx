"use client";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { nick, nickSrc, nickSrcSet } from "@/content/about";

/** Nick's VSL, hosted with the site on Hostinger (Nick 2026-10-17). The phone file is the smaller encode. */
const VSL = { desktop: "/media/vsl/vsl-1080.mp4", phone: "/media/vsl/vsl-720.mp4" };

/**
 * The hero video. Until someone presses play it is only Nick's night-desk photo (his chosen cover, 2026-10-20) and a
 * play button, so the video costs nothing on page load. Pressing play loads the file that fits the screen and plays it
 * with the normal controls; it pauses by itself once it is scrolled out of view.
 */
export function VslPlayer() {
  const [on, setOn] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState("");
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  const start = () => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const small = window.matchMedia("(max-width: 767px)").matches || !!nav.connection?.saveData;
    setSrc(small ? VSL.phone : VSL.desktop);
    setOn(true);
  };

  useEffect(() => {
    if (!on || !video.current) return;
    const v = video.current;
    // The stickers on the frame would cover the picture: they step aside while the video is on.
    const media = box.current?.closest<HTMLElement>("[data-hero-media]");
    media?.setAttribute("data-playing", "");
    v.play().catch(() => {}); // if the browser refuses, the controls are there to press play again
    const io = new IntersectionObserver(([e]) => { if (e.intersectionRatio < 0.25 && !v.paused) v.pause(); }, { threshold: [0, 0.25] });
    if (box.current) io.observe(box.current);
    return () => { io.disconnect(); media?.removeAttribute("data-playing"); };
  }, [on]);

  return (
    <div ref={box} className="vsl-frame">
      <div aria-hidden className="vsl-bg" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={nickSrc(nick.studio)} srcSet={nickSrcSet(nick.studio)} sizes="(min-width: 1024px) 40vw, 92vw" alt={on ? "" : nick.studio.alt} width={nick.studio.w} height={nick.studio.h} fetchPriority="high" decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${playing ? "opacity-0" : "opacity-100"}`} style={{ objectPosition: nick.studio.pos }} />
      {on ? (
        <video ref={video} src={src} controls playsInline preload="auto" onPlaying={() => setPlaying(true)}
          aria-label="Nick Bennett: how I get plumbers booked" className="absolute inset-0 h-full w-full bg-ink object-cover" />
      ) : (
        <button type="button" onClick={start} aria-label="Play video: how I get plumbers booked" className="vsl-start absolute inset-0 cursor-pointer">
          <span className="vsl-play vsl-play-low" aria-hidden><Play className="h-9 w-9 translate-x-0.5 fill-current" /></span>
          <span className="absolute bottom-3 left-3 hidden rounded-md bg-ink px-3 py-1.5 text-t3 font-bold text-white sm:bottom-4 sm:left-4 sm:inline-block">Watch: how I get plumbers booked</span>
        </button>
      )}
    </div>
  );
}
