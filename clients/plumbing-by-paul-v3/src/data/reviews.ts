// Google reviews, WORD FOR WORD from research/reviews/REVIEWS.md (13 Nov 2026). Typos and spacing are the reviewer's.
// `quote` is exactly what the Figma shows. Where the Figma shows only part of a review, the part shown is a contiguous run of
// the reviewer's own sentences (never reworded) and `full: false`. `n` = item number in REVIEWS.md.
// `age` is Google's relative date as read on 13 Nov 2026: refresh at launch.
export interface Review {
  n: number; name: string; age: string; quote: string; full: boolean;
  tags?: string[]; hl?: string[]; fixedBy?: string[]; service?: string;
}

export const REVIEWS = {
  sheila: { n: 11, name: 'Sheila Cordray', age: 'a month ago', full: true,
    quote: "Truly the best plumbing company I've ever worked with. From the office staff down to every single plumber and technician, each one of them was fantastic. Had a broken pipe and had to repipe the entire house- efficient, professional, timely and affordable. Thank you Brian and Carlton for all your hard work- you guys rock!",
    tags: ['Plumbing leak detection', 'Plumbing pipe repair'], hl: ['From the office staff down to every single plumber and technician'], fixedBy: ['Brian', 'Carlton'] },
  phil: { n: 3, name: 'Phil Every', age: '8 months ago', full: true,
    quote: 'Plumbing By Paul did a fantastic job replacing my two toilets and garbage disposal today. Chris and Steven did an excellent job! Not only did they haul away the old ones, they cleaned up behind themselves! Would definitely recommend!',
    tags: ['toilet replacement', 'garbage disposal'], hl: ['they cleaned up behind themselves'], fixedBy: ['Chris', 'Steven'] },
  michele: { n: 19, name: 'Michele Mary', age: '3 months ago', full: false,
    quote: 'Marcus and Troy came to my townhome this afternoon and truly saved the day. They were originally meant to be a second opinion, but their honesty, fairness, and integrity were immediately clear. Thank you both for fixing my leak so quickly and thoroughly.',
    tags: ['leak repair'], hl: ['their honesty, fairness, and integrity were immediately clear'], fixedBy: ['Marcus', 'Troy'] },
  ava: { n: 26, name: 'Ava Andiego', age: '6 months ago', full: true,
    quote: 'Wow! JR did a fantastic job switching out my ancient toilet. He told me exactly what I needed, gave me great advice, got the product and presto, I was back in business. Plus, he was super nice to deal with. Could not ask for better! A+',
    tags: ['Toilet repair'], hl: ['He told me exactly what I needed'], fixedBy: ['JR'] },
  dean: { n: 22, name: 'Dean Johnson', age: 'a month ago', full: true,
    quote: 'Chris showed up exactly on time . He was very professional and explained everything that he would be doing as well as the cost . He stayed all day and completed the job. I would recommend this company to anyone needing plumbing work done . Thank you 🙏 again.',
    tags: ['Faucet installation', 'Shower repair'], hl: ['explained everything that he would be doing as well as the cost'], fixedBy: ['Chris'] },
  kelly: { n: 10, name: 'Kelly Corbett', age: '3 weeks ago', full: true,
    quote: 'I needed a 2nd sink installed in my office and I choose Plumbing By Paul because of their responsiveness and good reputation. JR did not disappoint. He arrived on time and did a great job with the project. I will definitely use these guys again in the future.',
    tags: ['sink installation'], fixedBy: ['JR'] },
  melissa: { n: 12, name: 'Melissa Robinson', age: 'a month ago', full: false,
    quote: 'We contacted a couple different plumbing companies and got the run around but not with you guys.', fixedBy: ['Phil'] },
  james: { n: 7, name: 'James Douglas', age: '5 months ago', full: false, service: 'Plumbing leak repair',
    quote: 'I had a leak in copper pipe on a very tricky area. I called Paul and they answered on the first ring. Great attitude on the phone and very helpful. Phil was here within the hour and fixed it in under an hour.',
    hl: ['answered on the first ring', 'here within the hour', 'fixed it in under an hour'], fixedBy: ['Phil'] },
} satisfies Record<string, Review>;

/** Home H8 wall: three columns, two cards each, in Figma order. Middle column is navy. */
export const HOME_WALL: { r: Review; navy?: boolean }[][] = [
  [{ r: REVIEWS.sheila }, { r: REVIEWS.ava }],
  [{ r: REVIEWS.phil, navy: true }, { r: REVIEWS.dean, navy: true }],
  [{ r: REVIEWS.michele }, { r: REVIEWS.kelly }],
];

/** Process step proof lines: exact fragments of reviews 7, 27, 22, 3 (punctuation as written). */
export const PROCESS_PROOF = {
  1: { quote: 'I called Paul and they answered on the first ring.', name: 'James Douglas' },
  2: { quote: 'We got a text the morning of install keeping us informed of the Techs arrival.', name: 'Daniel Herzog' },
  3: { quote: 'He was very professional and explained everything that he would be doing as well as the cost .', name: 'Dean Johnson' },
  4: { quote: 'Not only did they haul away the old ones, they cleaned up behind themselves!', name: 'Phil Every' },
};

/** Crew rail (H7). Counts = reviews naming them in the 170-review sample (JR approximate). Quotes word for word (PAGES.md H7). */
export interface CrewMember { name: string; count: string; quote?: string; by?: string; meta?: string; }
export const CREW: CrewMember[] = [
  { name: 'Brian', count: '39+', quote: 'Brian is a lifesaver.', by: 'Carrington Cox', meta: 'Google review · water heater' },
  { name: 'Phil', count: '35+', quote: "Great company and great staff! Can't say enough about them and we will be recommending them to anyone who needs a plumber! Thanks again Phil!!", by: 'Brian Peterson', meta: 'Google review · Drain cleaning' },
  { name: 'Chris', count: '25+', quote: 'Chris is professional, courteous and an expert at his job! He is a great asset to the company, and I will only request him for any future projects.', by: 'Thomas Mcauley', meta: 'Google review · Shower repair' },
  { name: 'JR', count: '16+', quote: 'JR did not disappoint. He arrived on time and did a great job with the project.', by: 'Kelly Corbett', meta: 'Google review · sink installation' },
  { name: 'Troy', count: '15+', quote: 'Marcus and Troy came to my townhome this afternoon and truly saved the day.', by: 'Michele Mary', meta: 'Google review' },
  { name: 'Noah', count: '11+' }, // REVIEW TO PULL: NOAH (PAGES.md H7): shown as a labelled stand-in
];
