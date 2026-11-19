// Home FAQ (1.11). Q01 is Figma's answer; Q02-Q04 have no drawn answer in Figma and reuse Figma / PAGE-SHEET lines
// (README "Khinda to confirm"). `a` = plain text for FAQPage schema; `am` = shorter mobile body where Figma has one.
export const HOME_FAQ = [
  {
    k: 'Do I need a permit?', km: 'Permit',
    q: 'Do I need a permit for electrical work in Surrey?',
    a: 'For regulated work, yes. The City of Surrey issues its own electrical permits (Bylaw 15596) and a licensed contractor applies. Strata owners can’t get a homeowner permit, so a contractor has to.',
    am: 'For regulated work, yes. The City of Surrey issues its own electrical permits (Bylaw 15596) and a licensed contractor applies. Strata owners can’t get a homeowner permit.',
    src: 'City of Surrey Bylaw 15596 · Technical Safety BC',
  },
  {
    k: 'How long is a panel upgrade?', km: 'Panel time',
    q: 'How long does a panel upgrade take?',
    a: 'It depends on your panel, the permit and the inspection. He looks first, then prices it: you hear the price before any work starts. A photo of the panel helps.',
  },
  {
    k: 'EV charger rebate?', km: 'EV rebate',
    q: 'Is there a rebate for a home EV charger?',
    a: 'BC Hydro home charger rebate: up to 50%, max $350, with a licensed electrician and a permit. Ask about your charger and your panel on the same call.',
    src: 'BC Hydro home charger rebate guide, 15 Jul 2026',
  },
  {
    k: 'Do you do commercial work?', km: 'Commercial',
    q: 'Do you do commercial work?',
    a: 'Yes. All domestic, commercial work and renovations: shop fit-outs, barbershops, fire alarm. Send a photo of the job to the same number.',
    src: 'Khinda Electrical on Instagram',
  },
] as const;
