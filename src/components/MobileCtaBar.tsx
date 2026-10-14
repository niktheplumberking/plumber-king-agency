"use client";
import { useEffect, useState } from "react";
import { CtaButton } from "./CtaButton";

/** On phones, the primary action stays under the thumb once the hero has scrolled away. */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div inert={!show} className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 backdrop-blur p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
      <CtaButton className="w-full" />
    </div>
  );
}
