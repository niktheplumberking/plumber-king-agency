"use client";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

/** Sticky header: white bar with a hairline once you scroll; transparent over the bright hero. Square corners throughout. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  // While the full-screen menu is open: no page scroll, the page behind it is inert (focus stays in the menu),
  // and Esc closes it and puts focus back on the menu button.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const bar = toggle.current?.closest("header");
    const behind = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== bar && !el.contains(bar ?? null));
    behind.forEach((el) => (el.inert = open));
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggle.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((el) => (el.inert = false));
    };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${scrolled || open ? "bg-white/90 shadow-[0_1px_0_rgb(11_27_63/0.08)] backdrop-blur-xl" : "bg-white xl:bg-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      {/* Last in the eye path (Nick, 2026-10-16): the bar fades in after the hero has played its entrance. */}
      <div className="container-x flex h-20 items-center justify-between gap-6 lg:h-24">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname?.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} aria-current={active ? "page" : undefined} className={`relative whitespace-nowrap px-3.5 py-2.5 text-t3 font-bold tracking-[0.08em] uppercase transition-colors after:absolute after:inset-x-3.5 after:bottom-1 after:h-[2px] after:origin-left after:bg-ribbon after:transition-transform after:duration-300 ${active ? "text-ink after:scale-x-100" : "text-ink/75 after:scale-x-0 hover:text-ink hover:after:scale-x-100"}`}>{n.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden xl:block"><CtaButton className="!min-h-11 !px-4" label="Book a free call" /></div>
        <button ref={toggle} type="button" className="grid h-12 w-12 place-items-center rounded-md border-2 border-ink text-ink xl:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-5rem)] overflow-y-auto bg-white xl:hidden">
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 pt-6 pb-10">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="display border-b border-ink/10 py-4 text-t2 text-ink">{n.label}</Link>
          ))}
          <Link href="/free-website-audit/" className="display accent border-b border-ink/10 py-4 text-t2">Free website audit</Link>
          <CtaButton className="mt-8 w-full" />
        </nav>
      </div>
    </header>
  );
}
