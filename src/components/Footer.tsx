import Link from "@/components/Link";
import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { Logo } from "./Logo";
import { FooterWordmark } from "./FooterWordmark";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/90">
      <div className="container-x grid gap-12 pt-20 pb-28 md:grid-cols-3 md:pb-14 lg:grid-cols-12">
        {/* Tablets: the brand block gets its own row, the three link columns sit under it (QA 2026-10-21: at 768 px the
            brand text was squeezed into a narrow column). */}
        <div className="md:col-span-3 lg:col-span-4">
          {/* Nick 2026-10-21: the line sits beside the duck, centred on it; the contact rows move up into its old place.
              The gap from the duck to the line equals the gap from the duck down to the email row (29 px of ink, measured). */}
          <div className="flex items-center gap-[27px]">
            <Logo duckOnly className="h-24 w-auto shrink-0" />
            <p className="max-w-sm text-white/90">Websites, SEO and AI-search visibility for plumbing companies across the USA and Canada.</p>
          </div>
          <ul className="mt-5 space-y-2.5 text-t3">
            <li><a className="tap inline-flex min-h-8 items-center gap-2.5 [overflow-wrap:anywhere] hover:text-white" href={`mailto:${site.email}`}><Mail className="h-4.5 w-4.5" aria-hidden />{site.email}</a></li>
            <li className="inline-flex items-center gap-2.5"><MapPin className="h-4.5 w-4.5" aria-hidden />Serving the USA and Canada</li>
          </ul>
          <div className="mt-6 flex gap-2">
            {/* Only these three networks (Nick, 2026-10-16). LinkedIn shows but is not a link until Nick sends its URL. */}
            {[{ href: site.social.instagram, label: "Instagram", Icon: InstagramIcon }, { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon }, { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon }].map(({ href, label, Icon }) =>
              href ? (
                <a key={label} href={href} target="_blank" rel="noopener me" aria-label={`${site.name} on ${label}`} className="soc-btn"><Icon className="h-5 w-5" /></a>
              ) : (
                <span key={label} role="img" aria-label={`${label} (coming soon)`} className="soc-btn cursor-default"><Icon className="h-5 w-5" /></span>
              ),
            )}
          </div>
        </div>
        <FooterCol title="Services" className="lg:col-span-3" links={[...services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name })), { href: "/free-website-audit/", label: "Free website audit" }]} />
        <FooterCol title="Company" className="lg:col-span-2" links={[{ href: "/about/", label: "About Nick" }, { href: "/process/", label: "Our process" }, { href: "/faq/", label: "FAQ" }, { href: "/contact/", label: "Contact" }]} />
        <FooterCol title="Guides" className="lg:col-span-3" links={guides.map((g) => ({ href: `/resources/${g.slug}/`, label: g.title.split(":")[0] }))} />
      </div>
      {/* Oversized wordmark, like a sign on the shop wall: full width, slanted, white with KING in deep pink (Nick 2026-10-17). */}
      <FooterWordmark />
      <div className="border-t border-white/10">
        {/* Phones (Nick 2026-10-22): the room under the legal links matches the room above the copyright line, now the
            call bar is gone. Bobo sits right, clear of the links on the left. Desktop keeps room right for Bobo. */}
        <div className="container-x flex flex-col gap-3 pt-6 pb-[17px] text-t3 text-white/90 md:flex-row md:items-center md:justify-between md:pr-32 md:pb-8">
          <p>© {year} {site.ownership} · {site.legalAddress.replace(", USA", "")}. All rights reserved.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link href="/privacy-policy/" className="flink">Privacy Policy</Link>
            <Link href="/terms-of-service/" className="flink">Terms of Service</Link>
            <a href="/sitemap.xml" className="flink">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className }: { title: string; links: { href: string; label: string }[]; className?: string }) {
  return (
    <div className={className}>
      <h2 className="proof-l">{title}</h2>
      <ul className="mt-3 space-y-1 text-t3">
        {links.map((l) => (<li key={l.href}><Link href={l.href} className="flink">{l.label}</Link></li>))}
      </ul>
    </div>
  );
}
