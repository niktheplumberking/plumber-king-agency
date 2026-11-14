// Legal pages (PAGES.md 13b/13c, Figma 443:7819 privacy / 443:8551 terms). FIRST DRAFT text from the Figma frames, kept
// word for word and labelled "Draft for Paul's review" on the page. STICKY: needs Paul's sign-off (ideally his attorney's)
// before launch; the SMS section must match how the office really texts; [bracketed] items are Paul/attorney to supply.
import { SITE } from '../../data/site';

const NAP = `${SITE.legalName}\n${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.zip}\n${SITE.phone} · ${SITE.email}`;

export interface LegalDoc { title: string; crumb: string; path: string; summary: string; sections: [string, string][] }

export const PRIVACY: LegalDoc = {
  title: 'Privacy policy', crumb: 'Privacy policy', path: '/privacy-policy',
  summary: `We collect what you give us (name, phone, address, photos of your plumbing) so we can call you back and do the job. We don't sell it. We use Google Analytics to see how the site is used. You can ask us to delete your details at any time: ${SITE.email} or ${SITE.phone}.`,
  sections: [
    ['What we collect', 'When you call, text or send a form, we collect what you give us: your name, phone number, email if you add it, your address and any photos of your plumbing. Our website also records basic visit data, such as which pages are opened.'],
    ['How we use it', "We use your details to call you back, give you an estimate, schedule the visit, do the job and send your invoice. We don't use them for anything else without asking you first."],
    ['Text messages and calls', 'If you give us a mobile number, we may text you about your appointment, for example to say a technician is on the way. Message and data rates may apply. Reply STOP to stop texts at any time.'],
    ['Cookies and analytics', 'We use Google Analytics to see how the site is used, such as which pages people read. It sets cookies in your browser. You can block cookies in your browser settings and the site will still work.'],
    ['Who we share it with', "We don't sell your details. We share them only with the services that help us run the business, such as scheduling, phone and payment providers, and when the law requires it."],
    ['How long we keep it', 'We keep job records for as long as we need them for warranty, tax and legal reasons. [Paul to confirm the period.]'],
    ['Your choices', `You can ask what we hold about you, ask us to correct it or ask us to delete it. Email ${SITE.email} or call ${SITE.phone}.`],
    ['Children', "This website is for adults who need a plumber. We don't knowingly collect details from children under 13."],
    ['Changes to this policy', "If we change this policy, we'll post the new version here and update the date at the top."],
    ['Contact us', NAP],
  ],
};

export const TERMS: LegalDoc = {
  title: 'Terms and conditions', crumb: 'Terms and conditions', path: '/terms-and-conditions',
  summary: 'This website tells you about our services. An estimate is not a contract until you approve it. Prices on the site, if shown, are starting points, not quotes. Our work is covered by our workmanship warranty as written on your invoice.',
  sections: [
    ['Using this website', `This website tells you about ${SITE.legalName} and our services. The advice in our guides is general. It isn't a substitute for a plumber looking at your home.`],
    ['Estimates and pricing', 'An estimate is our best price for the work described. It is not a contract until you approve it. Prices on the site, if shown, are starting points, not quotes. If the job changes once we open things up, we tell you before we go on.'],
    ['Scheduling and cancellations', 'We give you an arrival time and let you know if it changes. If you need to move or cancel a visit, call the office as early as you can. [Paul to confirm any cancellation terms.]'],
    ['Payment', 'Payment is due as written on your invoice. You can pay the technician or use the payment link on this site. [Paul to confirm accepted methods.]'],
    ['Warranty', "Our work is covered by our workmanship warranty as written on your invoice. Parts and fixtures carry their makers' warranties. [Exact terms from Paul.]"],
    ['Limits of liability', '[Attorney to supply.] We are responsible for the work we do. We are not responsible for existing conditions we could not see, or for problems caused by work done by others.'],
    ['Photos and reviews', 'We sometimes photograph our work. We ask before we share a photo that shows your home. Reviews quoted on this site are from Google and are shown as written.'],
    ['Changes', 'We may update these terms. The date at the top shows the latest version.'],
    ['Contact us', NAP],
  ],
};
