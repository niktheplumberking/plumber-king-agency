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
      <ArrowRight className="cta-arrow" aria-hidden />
    </>
  );
  return external ? (
    <a href={ctaHref} className={cls} target="_blank" rel="noopener">{inner}</a>
  ) : (
    <Link href={ctaHref} className={cls}>{inner}</Link>
  );
}
