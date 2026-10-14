"use client";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Logo } from "./Logo";
import { CtaButton } from "./CtaButton";

/** Sticky header: transparent over the dark hero, solid navy once you scroll. The one blurred surface on the page. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${scrolled || open ? "bg-navy-950/85 shadow-[0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-xl" : "bg-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => {
              const active = pathname?.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link href={n.href} className={`rounded-full px-4 py-2.5 text-[0.95rem] font-medium transition-colors ${active ? "text-gold" : "text-white/85 hover:text-white"}`}>{n.label}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="hidden lg:block"><CtaButton className="!min-h-11 !px-5 !text-[0.95rem]" /></div>
        <button type="button" className="grid h-12 w-12 place-items-center rounded-full text-white lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      <div id="mobile-nav" hidden={!open} className="h-[calc(100dvh-5rem)] overflow-y-auto bg-navy-950 lg:hidden">
        <nav aria-label="Mobile" className="container-x flex flex-col gap-1 pt-6 pb-10">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="border-b border-white/10 py-4 font-display text-2xl font-semibold text-white">{n.label}</Link>
          ))}
          <Link href="/free-website-audit/" className="border-b border-white/10 py-4 font-display text-2xl font-semibold text-gold">Free website audit</Link>
          <CtaButton className="mt-8 w-full" />
        </nav>
      </div>
    </header>
  );
}
