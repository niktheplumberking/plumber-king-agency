/**
 * Social proof. EVERY entry starts as status "placeholder".
 *
 * Why: the US FTC rule on fake reviews and testimonials (16 CFR Part 465, in force since Oct 2024) fines businesses
 * per violation for made-up reviews and unproven claims, and the WFACT design rulebook (DR-FAKE-SOCIAL-PROOF)
 * bans invented quotes. Placeholders render ONLY on preview builds (NEXT_PUBLIC_SHOW_PLACEHOLDERS=1), each with a
 * visible PLACEHOLDER badge. Flip an entry to "verified" only when Nick confirms it is real and can be backed up
 * (a Google review link, a signed permission, a screenshot of the analytics).
 *
 * Nick confirmed on 2026-10-14 that the clients, quotes and portfolio on his old site were NOT his work, so all of
 * it was removed. What is left are generic slots that show the layout on preview builds only, until real reviews
 * and real projects exist. No numbers: none can be backed up yet.
 */

export type ProofStatus = "placeholder" | "verified";

export interface Testimonial {
  status: ProofStatus;
  quote: string;
  name: string;
  company: string;
  location?: string;
  /** Link to the public review (Google, Facebook). Required before status can be "verified". */
  sourceUrl?: string;
}

export interface Stat {
  status: ProofStatus;
  value: string;
  label: string;
  /** How the number was measured. Required before status can be "verified". */
  basis?: string;
}

export interface WorkItem {
  status: ProofStatus;
  name: string;
  place?: string;
  /** Screenshot in public/work/. null until supplied. */
  image: string | null;
  liveUrl?: string;
  result?: string;
  accent: string;
}

export const testimonials: Testimonial[] = [
  { status: "placeholder", quote: "Your first client review goes here, word for word, linked to the public Google review.", name: "Client name", company: "Plumbing company" },
  { status: "placeholder", quote: "A second real review goes here once a client has seen results and agrees to be quoted.", name: "Client name", company: "Plumbing company" },
];

/** Empty on purpose: add a stat only with a `basis` saying how it was measured. */
export const stats: Stat[] = [];

export const work: WorkItem[] = [
  { status: "placeholder", name: "Your first client project", image: null, accent: "#2a6460" },
  { status: "placeholder", name: "Your second client project", image: null, accent: "#9a4518" },
];

export function visible<T extends { status: ProofStatus }>(items: T[], showPlaceholders: boolean): T[] {
  return items.filter((i) => i.status === "verified" || showPlaceholders);
}
