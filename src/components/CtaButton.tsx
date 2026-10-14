import Link from "@/components/Link";
import { ArrowRight } from "lucide-react";
import { ctaHref, site } from "@/content/site";

/** The one primary action, worded the same on every page. */
export function CtaButton({ variant = "primary", className = "", label = site.primaryCta }: { variant?: "primary" | "gold"; className?: string; label?: string }) {
  const external = ctaHref.startsWith("http");
  const cls = `btn ${variant === "gold" ? "btn-gold" : "btn-primary"} group ${className}`;
  const inner = (
    <>
      {label}
      <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </>
  );
  return external ? (
    <a href={ctaHref} className={cls} target="_blank" rel="noopener">{inner}</a>
  ) : (
    <Link href={ctaHref} className={cls}>{inner}</Link>
  );
}
