"use client";
import { useEffect, useState } from "react";

/**
 * True while repeating motion must stop: the visitor asked for reduced motion, or pressed the page's "Pause motion"
 * button (html.pk-still, announced with the pk-motion event). Components with their own loops read this.
 */
export function useStill() {
  const [still, setStill] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setStill(mq.matches || document.documentElement.classList.contains("pk-still"));
    const onMotion = (e: Event) => setStill(mq.matches || (e as CustomEvent<boolean>).detail);
    read();
    mq.addEventListener("change", read);
    window.addEventListener("pk-motion", onMotion);
    return () => { mq.removeEventListener("change", read); window.removeEventListener("pk-motion", onMotion); };
  }, []);
  return still;
}
