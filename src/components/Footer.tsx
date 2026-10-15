import Link from "@/components/Link";
import { Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { guides } from "@/content/guides";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, ThreadsIcon } from "./SocialIcons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white/90">
      <div className="container-x grid gap-12 pt-20 pb-28 md:grid-cols-12 md:pb-14">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-white/90">Websites, SEO and AI-search visibility for plumbing companies across the USA and Canada.</p>
          <ul className="mt-6 space-y-2.5 text-t3">
            <li><a className="inline-flex min-h-8 items-center gap-2.5 [overflow-wrap:anywhere] hover:text-white" href={`mailto:${site.email}`}><Mail className="h-4.5 w-4.5" aria-hidden />{site.email}</a></li>
            <li className="inline-flex items-center gap-2.5"><MapPin className="h-4.5 w-4.5" aria-hidden />Serving the USA and Canada</li>
          </ul>
          <div className="mt-6 flex gap-2">
            {[{ href: site.social.facebook, label: "Facebook", Icon: FacebookIcon }, { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon }, { href: site.social.threads, label: "Threads", Icon: ThreadsIcon }].map(({ href, label, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener me" aria-label={`${site.name} on ${label}`} className="soc-btn"><Icon className="h-5 w-5" /></a>
            ))}
          </div>
        </div>
        <FooterCol title="Services" className="md:col-span-3" links={[...services.map((s) => ({ href: `/services/${s.slug}/`, label: s.name })), { href: "/free-website-audit/", label: "Free website audit" }]} />
        <FooterCol title="Company" className="md:col-span-2" links={[{ href: "/about/", label: "About Nick" }, { href: "/process/", label: "Our process" }, { href: "/faq/", label: "FAQ" }, { href: "/contact/", label: "Contact" }]} />
        <FooterCol title="Guides" className="md:col-span-3" links={guides.map((g) => ({ href: `/resources/${g.slug}/`, label: g.title.split(":")[0] }))} />
      </div>
      {/* Oversized wordmark, like a sign on the shop wall. Static: one looping band per page at most. */}
      <div aria-hidden className="marquee overflow-hidden border-t border-white/10 py-6">
        <span className="foot-mark display block" data-a="Plumber King " data-b="Agency" />
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 pb-24 text-t3 text-white/90 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>© {year} {site.name}, a {site.legalEntity} company · {site.legalAddress.replace(", USA", "")}. All rights reserved.</p>
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
