// Reviews page data (PAGES.md R1 + R3, Figma 441:6010). Every quote is WORD FOR WORD from research/reviews/REVIEWS.md
// (13 Nov 2026): typos, spacing, emoji and the diamond row are the reviewer's own. `n` = item number in REVIEWS.md.
// Order: the twelve cards the Figma shows, then the rest in PAGES.md R3 order (#3, #4, #9, #10, #12, #13, #16, #17, #18,
// #20, #21, #22, #24, #25, #27, #28, #29). Patches = first names written in the review itself (STICKY 5: Paul to approve).
// `jobs` are the filter groups; a review with no clear job type sits only under "All".
// Do not feature reviewers named Brian Rinda or Stacy Alves (staff / owner names).
import type { Review } from '../../data/reviews';

export type Job = 'wh' | 'dr' | 'lk' | 'tf' | 'sf' | 'cm';
export interface PageReview extends Review { jobs: Job[]; }

export const JOBS: { k: Job | 'all'; label: string }[] = [
  { k: 'all', label: 'All' },
  { k: 'wh', label: 'Water heaters' },
  { k: 'dr', label: 'Drains' },
  { k: 'lk', label: 'Leaks and pipes' },
  { k: 'tf', label: 'Toilets and fixtures' },
  { k: 'sf', label: 'Softeners and filters' },
  { k: 'cm', label: 'Commercial' },
];
export const PLUMBERS = ['Brian', 'Phil', 'Chris', 'JR', 'Troy', 'Steven', 'Marcus', 'Elvis', 'Jacob', 'CJ', 'Carlton', 'Alex', 'Tim'];

export const ALL: PageReview[] = [
  { n: 7, name: 'James Douglas', age: '5 months ago', full: true, tags: ['Plumbing leak repair'], fixedBy: ['Phil'], jobs: ['lk'],
    hl: ['they answered on the first ring'],
    quote: 'Paul (Phil) to the rescue!!\n\nI had a leak in copper pipe on a very tricky area. I called Paul and they answered on the first ring. Great attitude on the phone and very helpful. Phil was here within the hour and fixed it in under an hour. Phil let me know if there were any issues to just give them a call back.\n\nI’m so glad I called Paul. Repair was way cheaper than I thought it was going to be. Incredible experience.' },
  { n: 1, name: 'Brendan Berry', age: 'a month ago', full: true, tags: ['water softener'], fixedBy: ['Brian'], jobs: ['sf'],
    hl: ['explained how everything worked'],
    quote: 'Plumbing by Paul is an exceptional company and Brian went above and beyond when replacing my water softer system! Not only did they accommodate coming out on a Saturday that worked with my schedule but they got the job done in a very efficient and timely fashion as well. Brian was very educational and explained how everything worked, how filters get replaced and when to put more salt in the system. I highly recommend plumbing by Paul you won’t be disappointed in their services or team!' },
  { n: 5, name: 'Doriana Atchley', age: 'Edited 4 weeks ago', full: true, tags: ['Water heater installation'], fixedBy: ['Chris', 'Alex'], jobs: ['wh', 'dr'],
    quote: 'Chris & Alex did absolutely incredible job, look at the welding! Beautiful 😍\n\nFrom calling in to schedule the appointment to them cleaning up - everything was perfect! My only regret was not getting this water tank installed sooner, yes, I was dreading it 😫\n\nBut they were incredible n would recommend them to anyone!\n\n◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇\n\nSo after we had them install the water heater, we had Brian come out and clear our main pipe clog!\n\nAgain we received incredible service, fast, knowledgeable, Brian was amazing! Thank you! I\'m posting the cute Halloween toilet paper roll 🧻' },
  { n: 11, name: 'Sheila Cordray', age: 'a month ago', full: true, tags: ['pipe repair', 'repipe'], fixedBy: ['Brian', 'Carlton'], jobs: ['lk'],
    hl: ['From the office staff down to every single plumber and technician'],
    quote: "Truly the best plumbing company I've ever worked with. From the office staff down to every single plumber and technician, each one of them was fantastic. Had a broken pipe and had to repipe the entire house- efficient, professional, timely and affordable. Thank you Brian and Carlton for all your hard work- you guys rock!" },
  { n: 6, name: 'Stefan Despotovic', age: '4 weeks ago', full: true, tags: ['Plumbing pipe repair'], fixedBy: ['JR', 'Elvis'], jobs: ['lk', 'cm'],
    hl: ["he wasn't discouraged"],
    quote: "JR and his assistance Elvis did a phenomenal job repairing the plumbing at my Church's hall. JR was committed to resolve our plumbing issue. When the job proved to be tougher than he thought, he wasn't discouraged. JR and Elvis kept everything clean throughout the project and worked with us around our schedule. The entire parish is thankful for their work!" },
  { n: 2, name: 'Jamie Horn', age: '3 weeks ago', full: true, tags: ['Shower installation'], fixedBy: ['Chris'], jobs: ['tf'],
    quote: 'Chris did an excellent job installing our freestanding tub. He was professional, courteous, and clearly took pride in his work. The installation looks fantastic, and we’re thrilled with how it turned out. I’d gladly recommend Chris to anyone looking for a skilled, dependable plumber!' },
  { n: 19, name: 'Michele Mary', age: '3 months ago', full: true, tags: ['leak repair'], fixedBy: ['Marcus', 'Troy'], jobs: ['lk'],
    hl: ['their honesty, fairness, and integrity were immediately clear'],
    quote: 'Marcus and Troy came to my townhome this afternoon and truly saved the day. They were originally meant to be a second opinion, but their honesty, fairness, and integrity were immediately clear. Thank you both for fixing my leak so quickly and thoroughly. I’m already looking forward to having you handle my upcoming bathroom remodel.\n\nMichele Sosslau' },
  { n: 14, name: 'Stephane Davis', age: 'a month ago', full: true, tags: ['Drain cleaning'], fixedBy: ['Brian'], jobs: ['dr'],
    hl: ["Called and they said they'd be out the next day"],
    quote: "Had a stoppage occur at our home a few days ago. Tried to DIY it myself with no luck. Called and they said they'd be out the next day. Brian came out and cleared out the blockage along with noting come other things of concern. Very professional, awesome job. Second job we have used them for along with a water heater install a few months ago. Highly recommend and will continue to use for anything in the future." },
  { n: 23, name: 'Renee Frias', age: '7 months ago', full: true, tags: ['repeat customer'], fixedBy: ['Brian'], jobs: [],
    hl: ['our go-to plumbers for the past three years'],
    quote: 'These guys have been our go-to plumbers for the past three years. We bought a flip house. We’ve had issue after issue with our plumbing, and they’ve always been able to help. Brian is incredibly knowledgeable, personable, and straightforward. It really felt like he did everything he could to resolve the problems we were having. We will certainly continue to use Plumbing By Paul as our flip house continues to surprise us.' },
  { n: 8, name: 'sam pastorella', age: 'a month ago', full: true, tags: ['water softener', 'drain camera'], fixedBy: ['Brian', 'Jacob'], jobs: ['sf', 'dr'],
    hl: ['not your average plumbers'],
    quote: "These guys are truly outstanding, not your average plumbers. Brian installed a water softener system with filters and he's very knowledgeable about all plumbing topics. Jacob used cutting-edge technology to diagnose an issue with our drain lines and was able to map out the entire system and pinpoint the problem. Plumbing repairs can be stressful, but I have high confidence that you're in good hands with PBP!" },
  { n: 15, name: 'Michael Gambill', age: '2 months ago', full: true, tags: ['Water heater installation'], fixedBy: ['Phil', 'CJ'], jobs: ['wh'],
    hl: ['got me in a day earlier'],
    quote: 'I just moved to St. Pete and new that I needed a water heater. I scheduled with Plumbing by Paul and they had an opening and got me in a day earlier. Phil and CJ were courteous and got to work right away. They even explained to me how to fix my low water pressure on my bathroom sink at no charge. I highly recommend Plumbing by Paul.' },
  { n: 26, name: 'Ava Andiego', age: '6 months ago', full: true, tags: ['Toilet repair'], fixedBy: ['JR'], jobs: ['tf'],
    hl: ['He told me exactly what I needed'],
    quote: 'Wow! JR did a fantastic job switching out my ancient toilet. He told me exactly what I needed, gave me great advice, got the product and presto, I was back in business. Plus, he was super nice to deal with. Could not ask for better! A+' },
  // ---- below the fold: shown by "Show more reviews" or by a filter ----
  { n: 3, name: 'Phil Every', age: '8 months ago', full: true, tags: ['toilet replacement', 'garbage disposal'], fixedBy: ['Chris', 'Steven'], jobs: ['tf'],
    quote: 'Plumbing By Paul did a fantastic job replacing my two toilets and garbage disposal today. Chris and Steven did an excellent job! Not only did they haul away the old ones, they cleaned up behind themselves! Would definitely recommend!' },
  { n: 4, name: 'Cher R', age: '2 weeks ago', full: true, tags: ['Garbage disposal installation'], fixedBy: ['Steven'], jobs: ['tf'],
    quote: 'I called Plumbing by Paul because a friend of mine highly recommended them. Kris & Steven showed up at my home, ON TIME, they were very professional and polite. We discussed what was going on with my disposal and dishwasher & they knew immediately what needed to happen. They were very clean, knowledgeable, and fixed the issues without breaking the bank! I would highly recommend this company for any and all of your plumbing needs! Thanks, guys, for a job well done.' },
  { n: 9, name: 'Mark Smith', age: 'a month ago', full: true, tags: ['Water heater repair', 'Shower repair'], fixedBy: ['Brian'], jobs: ['wh', 'tf'],
    quote: "So, I figure replacing a shower cartridge is pretty straight forward right? Not when is an old system and impossible to find. Thank you Brian and Plumbing by Paul for getting a temporary fix in place super fast. They will be installing our new shower valve shortly! I own a small business, and I recommend them for all of my clients!" },
  { n: 10, name: 'Kelly Corbett', age: '3 weeks ago', full: true, tags: ['sink installation'], fixedBy: ['JR'], jobs: ['tf', 'cm'],
    quote: 'I needed a 2nd sink installed in my office and I choose Plumbing By Paul because of their responsiveness and good reputation. JR did not disappoint. He arrived on time and did a great job with the project. I will definitely use these guys again in the future.' },
  { n: 12, name: 'Melissa Robinson', age: 'a month ago', full: true, fixedBy: ['Phil'], jobs: [],
    quote: 'We contacted a couple different plumbing companies and got the run around but not with you guys. Phil came out and done an awesome job, neat, clean and professional in every manner. We recommend Phil and will request him for future work!' },
  { n: 13, name: 'Alix McKeel', age: '2 months ago', full: true, tags: ['Water heater installation'], jobs: ['wh'],
    quote: 'Thank you so much for a quick response. Our water heater hose busted on a Monday morning and had no idea what to do.\n\nSomeone made it very quick, and it was affordable. They were very nice and respectful of our home- made sure to clean up. Highly recommend to anyone in need of a plumber in St.Pete / Clearwater' },
  { n: 16, name: 'Brian Peterson', age: 'a month ago', full: true, tags: ['Drain cleaning'], fixedBy: ['Phil'], jobs: ['dr'],
    quote: "We have been having problems with the water slowly draining and backing up. Phil came out found the issue and gave a clear directions on how to keep things flowing. Great company and great staff! Can't say enough about them and we will be recommending them to anyone who needs a plumber! Thanks again Phil!!" },
  { n: 17, name: 'Dorinne', age: 'a month ago', full: true, fixedBy: ['Paul'], jobs: [],
    quote: 'Honestly, I was not sure what was going to happen when Paul came today, but I was very pleased he was clean, cut, looking very well mannered I’m very happy now I called your service so when someone’s looking for a plumber, I will definitely recommend your company. It’s so nice to have something refreshing for a change..' },
  { n: 18, name: 'Patty Przywara', age: '3 months ago', full: true, tags: ['Water heater installation'], jobs: ['wh'],
    quote: 'Plumbing by Paul replaced our hot water heater today. Outstanding service and professionally installed. Removed old unit and left installation immaculate. Thanks to the excellent customer service and crew!' },
  { n: 20, name: 'Bob Gregovich', age: '2 months ago', full: true, tags: ['Toilet repair', 'Drain cleaning'], fixedBy: ['Phil', 'Tim'], jobs: ['tf', 'dr'],
    quote: 'Phil and Tim rebuilt both of our toilets and cleaned a nasty drain. Both Phil and Tim were professional and courteous. They did very good work. This was the 2nd time I used this company and was happy both times.' },
  { n: 21, name: 'Robert Brooks', age: '5 months ago', full: true, tags: ['toilet clog'], fixedBy: ['JR'], jobs: ['tf'],
    quote: 'Last min call, Sun going down and toilet water was rising, and to the rescue came Plumbing By Paul, and Mr JR.\n\nYou guys are so awesome!! Thank you for saving the night!!' },
  { n: 22, name: 'Dean Johnson', age: 'a month ago', full: true, tags: ['Faucet installation', 'Shower repair'], fixedBy: ['Chris'], jobs: ['tf'],
    quote: 'Chris showed up exactly on time . He was very professional and explained everything that he would be doing as well as the cost . He stayed all day and completed the job. I would recommend this company to anyone needing plumbing work done . Thank you 🙏 again.' },
  { n: 24, name: 'Anthony Mancuso', age: '4 months ago', full: true, tags: ['drain clearing'], fixedBy: ['Chris', 'Marcus'], jobs: ['dr'],
    quote: 'Chris and Marcus delivered excellent service today clearing my drains. They were highly professional, friendly, and knowledgeable. Their efficient work is greatly appreciated, and I highly recommend them.' },
  { n: 25, name: 'Luke Utting', age: '10 months ago', full: true, tags: ['leak repair'], fixedBy: ['Phil'], jobs: ['lk'],
    quote: 'Plumbing by Paul Came to my home in St. Petersburg same day and fixed the leak at my meter box in just a few short hours. Very happy with service provided by Alycia & Phil' },
  { n: 27, name: 'Daniel Herzog', age: '8 months ago', full: true, tags: ['toilet installation'], fixedBy: ['Joshua'], jobs: ['tf'],
    quote: 'Needed a new toilet installed. Office Staff were extremely pleasant and helpful when scheduling an appointment. We got a text the morning of install keeping us informed of the Techs arrival. When Joshua arrived he explained the process. He was extremely professional and hard working. We definitely recommend Plumbing by Paul!!' },
  { n: 28, name: 'Thomas Mcauley', age: '4 weeks ago', full: true, tags: ['Shower repair'], fixedBy: ['Chris'], jobs: ['tf'],
    quote: 'Chris is professional, courteous and an expert at his job! He is a great asset to the company, and I will only request him for any future projects.' },
  { n: 29, name: 'Carrington Cox', age: 'a year ago', full: true, tags: ['water heater'], fixedBy: ['Brian'], jobs: ['wh'],
    quote: 'Brian is a lifesaver.\nEver had a nightmare where your hot water was accidentally hooked up to the cold and your cold is to the hot? Showers were only ever warm for 30 seconds or less? Water heater almost ready to start highschool aged?\nThat was us until Plumbing by Paul pulled us from the wreckage of whoever did the original install, Brian deserves a medal 🏅' },
];

/** Every name a review mentions, for the plumber filter (patches show at most two). */
export const named = (r: PageReview) => PLUMBERS.filter((p) => new RegExp(`\\b${p}\\b`).test(r.quote) || (r.fixedBy ?? []).includes(p));

/** R1 hero wall: first sentence only, word for word (REVIEWS.md items 1, 2, 3, 4, 7, 10, 11, 12, 16, 18, 22, 28). */
export const MINI: { q: string; by: string; patch?: string }[] = [
  { q: 'Plumbing by Paul is an exceptional company and Brian went above and beyond when replacing my water softer system!', by: 'Brendan Berry', patch: 'Brian' },
  { q: 'Chris did an excellent job installing our freestanding tub.', by: 'Jamie Horn', patch: 'Chris' },
  { q: 'Plumbing By Paul did a fantastic job replacing my two toilets and garbage disposal today.', by: 'Phil Every', patch: 'Steven' },
  { q: 'I called Plumbing by Paul because a friend of mine highly recommended them.', by: 'Cher R', patch: 'Steven' },
  { q: 'Paul (Phil) to the rescue!!', by: 'James Douglas', patch: 'Phil' },
  { q: 'I needed a 2nd sink installed in my office and I choose Plumbing By Paul because of their responsiveness and good reputation.', by: 'Kelly Corbett', patch: 'JR' },
  { q: "Truly the best plumbing company I've ever worked with.", by: 'Sheila Cordray', patch: 'Brian' },
  { q: 'We contacted a couple different plumbing companies and got the run around but not with you guys.', by: 'Melissa Robinson', patch: 'Phil' },
  { q: 'We have been having problems with the water slowly draining and backing up.', by: 'Brian Peterson', patch: 'Phil' },
  { q: 'Plumbing by Paul replaced our hot water heater today.', by: 'Patty Przywara' },
  { q: 'Chris showed up exactly on time .', by: 'Dean Johnson', patch: 'Chris' },
  { q: 'Chris is professional, courteous and an expert at his job!', by: 'Thomas Mcauley', patch: 'Chris' },
];

/** R2: Google's own topic chips on the listing, read 13 Nov 2026 (refresh at build). */
export const TOPICS: [string, number][] = [
  ['Knowledgeable staff', 350], ['Polite staff', 89], ['Water heater replacement', 35], ['Leak repair', 31],
  ['Faucet replacement', 18], ['Garbage disposal replacement', 15], ['Water softener installation', 14], ['Leak detection', 12],
];

/** R5 leaderboard: reviews naming each person in the 170 most relevant (13 Nov 2026). JR approximate. */
export const NAMED: [string, number][] = [['Brian', 39], ['Phil', 35], ['Chris', 25], ['JR', 16], ['Troy', 15], ['Noah', 11]];
