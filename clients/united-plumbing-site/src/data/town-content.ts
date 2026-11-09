// Town-specific content for the 27 town pages (owned by the town-pages builder).
// Honesty rules: county and drive time come from towns.ts / 00-sitemap.md (drive times are rough, from 91767,
// to re-check in Google Maps before launch). Plumbing problems are framed generally (house age, slabs, hard water),
// never as invented facts about a town. Claremont alone uses the local facts the approved copy file gives
// (City of Trees, the Village, the Colleges, Towne Ave, Foothill Blvd), which are flagged "LOCAL FACTS: check" there.
import { TOWNS, type Town } from './towns';

export type ProblemKey = 'roots' | 'oldpipes' | 'hardwater' | 'slab' | 'heater' | 'grease' | 'mainline' | 'gas' | 'fixtures' | 'adu';

export interface Problem { tag: string; title: string; text: string; chip: string }
export interface GuideItem { t: string; d: string; links?: { label: string; href: string }[] }
export interface Faq { q: string; a: string }

interface Raw {
  zip?: string;
  /** Short "how we get there" line, honest and general. */
  route: string;
  /** Close-by paragraph, written per town. */
  close: string;
  /** Opening paragraph of the plumbing guide, written per town. */
  guideIntro: string;
  problems: [ProblemKey, ProblemKey, ProblemKey, ProblemKey];
  guide: ProblemKey[];
  neighbours: string[];
  /** Position of the town's label on map-service-area.jpg (percent), only when the town is labelled on that map. */
  map?: [number, number];
  extraFaq?: Faq;
}

const RAW: Record<string, Raw> = {
  'plumber-claremont': {
    zip: '91711',
    route: 'Up Towne Ave or across Foothill.',
    close: "Claremont is the next town over from our Pomona base. Most calls are a short drive up Towne Ave or across Foothill. That's why we can get to you fast.",
    guideIntro: 'United Plumbing is a family-owned plumbing company based in Pomona, right next to Claremont. A plumbing call in Claremont is a short drive for us, and we pick up the phone 24/7.',
    problems: ['roots', 'oldpipes', 'hardwater', 'slab'],
    guide: ['roots', 'oldpipes', 'slab', 'hardwater', 'adu'],
    neighbours: ['plumber-la-verne', 'plumber-montclair', 'plumber-upland', 'plumber-san-dimas', 'plumber-rancho-cucamonga'],
    map: [35.5, 27.8],
  },
  'plumber-la-verne': {
    route: 'A short hop up the 210 or along Foothill Blvd.',
    close: 'La Verne shares a border with Pomona, so a call from La Verne is one of the shortest drives we make. Phone us any hour and a real person picks up.',
    guideIntro: 'La Verne sits right on the north edge of Pomona. Because we work so close by, we see the same mix of homes here that we see at our own base: some older, some newer, all on the same hard water.',
    problems: ['roots', 'hardwater', 'oldpipes', 'heater'],
    guide: ['roots', 'hardwater', 'oldpipes', 'heater'],
    neighbours: ['plumber-claremont', 'plumber-san-dimas', 'plumber-glendora', 'plumber-upland', 'plumber-montclair'],
  },
  'plumber-san-dimas': {
    route: 'Straight out the 210 from Pomona.',
    close: 'San Dimas is about a quarter of an hour from our Pomona base. Call or text, tell us your street, and we tell you when we can be there.',
    guideIntro: 'From Pomona, San Dimas is a quick run west. The calls we get here are the everyday ones every Southern California home sees sooner or later: slow drains, tired water heaters and leaks.',
    problems: ['grease', 'heater', 'roots', 'slab'],
    guide: ['grease', 'heater', 'roots', 'slab'],
    neighbours: ['plumber-la-verne', 'plumber-glendora', 'plumber-covina', 'plumber-claremont', 'plumber-west-covina'],
  },
  'plumber-diamond-bar': {
    route: 'A short drive down the 57 or across on the 60.',
    close: 'Diamond Bar sits just south-west of Pomona. It is a short drive for us, so you are not waiting on a crew coming in from across the county.',
    guideIntro: 'Slab leaks, water heaters and drains are common calls from Diamond Bar. A lot of it comes down to two things: pipes under concrete floors, and hard water wearing parts out.',
    problems: ['slab', 'heater', 'hardwater', 'grease'],
    guide: ['slab', 'heater', 'hardwater', 'oldpipes'],
    neighbours: ['plumber-walnut', 'plumber-rowland-heights', 'plumber-chino-hills', 'plumber-brea', 'plumber-chino'],
  },
  'plumber-walnut': {
    route: 'West of Pomona, a short drive on the 60 or the 10.',
    close: 'Walnut is about 15 minutes from our Pomona base. We cover the whole city, nights and weekends included.',
    guideIntro: 'Walnut calls tend to be about water heaters, slab leaks and gas lines. Here is what is usually behind them, and what you can check before you call.',
    problems: ['heater', 'slab', 'gas', 'hardwater'],
    guide: ['heater', 'slab', 'gas', 'hardwater'],
    neighbours: ['plumber-diamond-bar', 'plumber-west-covina', 'plumber-rowland-heights', 'plumber-covina', 'plumber-san-dimas'],
  },
  'plumber-glendora': {
    route: 'West along the 210 from Pomona.',
    close: 'Glendora is around 20 minutes from Pomona in normal traffic. When you call, we give you a real arrival time on the phone.',
    guideIntro: 'Common Glendora calls: clogged drains, roots in sewer lines and water heaters that have given up. None of these fix themselves, and all of them get worse slowly before they get bad fast.',
    problems: ['roots', 'grease', 'heater', 'oldpipes'],
    guide: ['roots', 'grease', 'heater', 'oldpipes'],
    neighbours: ['plumber-san-dimas', 'plumber-azusa', 'plumber-la-verne', 'plumber-covina', 'plumber-west-covina'],
  },
  'plumber-covina': {
    route: 'West of Pomona, about 20 minutes on the 10.',
    close: 'Covina is about 20 minutes from our base. Call any hour, tell us what is going on, and we tell you honestly how soon we can get there.',
    guideIntro: 'In Covina, a lot of our work is under the ground and inside the walls: older sewer lines, drains that keep backing up, and water heaters near the end of their life.',
    problems: ['mainline', 'roots', 'grease', 'heater'],
    guide: ['mainline', 'roots', 'oldpipes', 'heater'],
    neighbours: ['plumber-west-covina', 'plumber-san-dimas', 'plumber-glendora', 'plumber-azusa', 'plumber-walnut'],
    map: [23, 29],
  },
  'plumber-west-covina': {
    route: 'Straight out the 10, about 20 minutes from Pomona.',
    close: 'West Covina is a straight run from Pomona. We come out for big jobs and small ones, and the phone is answered 24/7.',
    guideIntro: 'Slab leaks, drains and water heaters make up most of our West Covina calls. A few warning signs, caught early, can save you a torn-up floor or a flooded garage.',
    problems: ['slab', 'grease', 'heater', 'roots'],
    guide: ['slab', 'grease', 'heater', 'roots'],
    neighbours: ['plumber-covina', 'plumber-walnut', 'plumber-san-dimas', 'plumber-rowland-heights', 'plumber-azusa'],
    map: [19, 31.5],
  },
  'plumber-azusa': {
    route: 'West on the 210, about 25 minutes from our base.',
    close: 'Azusa is about 25 minutes from Pomona. Call first and we will give you a clear time on the phone before anyone gets in the truck.',
    guideIntro: 'We go out to Azusa for drains, leaks, sewer lines and water heaters. Here is what tends to go wrong, and the signs to look for.',
    problems: ['grease', 'mainline', 'heater', 'hardwater'],
    guide: ['grease', 'mainline', 'heater', 'hardwater'],
    neighbours: ['plumber-glendora', 'plumber-covina', 'plumber-west-covina', 'plumber-san-dimas', 'plumber-la-verne'],
  },
  'plumber-rowland-heights': {
    route: 'West on the 60, about 20 minutes from Pomona.',
    close: 'Rowland Heights is about 20 minutes from our Pomona base. Repipes, slab leaks, water heaters, drains: call and tell us what you see.',
    guideIntro: 'Repipes, slab leaks and water heaters are common calls from Rowland Heights. Here is how to tell what you are dealing with.',
    problems: ['oldpipes', 'slab', 'heater', 'grease'],
    guide: ['oldpipes', 'slab', 'heater', 'hardwater'],
    neighbours: ['plumber-diamond-bar', 'plumber-walnut', 'plumber-west-covina', 'plumber-brea', 'plumber-chino-hills'],
  },
  'plumber-montclair': {
    route: 'East on the 10, just past Claremont.',
    close: 'Montclair is minutes from Pomona, one of the closest towns we cover. That means a short wait when something breaks.',
    guideIntro: 'Montclair is close enough to our base that we know the calls well: backed-up sewer lines, slow drains and water heaters worn down by hard water.',
    problems: ['mainline', 'roots', 'heater', 'hardwater'],
    guide: ['mainline', 'roots', 'oldpipes', 'heater'],
    neighbours: ['plumber-claremont', 'plumber-upland', 'plumber-ontario', 'plumber-chino', 'plumber-rancho-cucamonga'],
  },
  'plumber-upland': {
    route: 'East on the 10 or the 210, about 15 minutes.',
    close: 'Upland is about 15 minutes from our Pomona base. Call or text a photo, any hour, and a Galvez brother calls you back.',
    guideIntro: 'Tree roots and old sewer lines are common in Upland calls, along with water heaters and leaks. Here is what to watch for.',
    problems: ['roots', 'oldpipes', 'heater', 'slab'],
    guide: ['roots', 'oldpipes', 'heater', 'slab', 'hardwater'],
    neighbours: ['plumber-montclair', 'plumber-rancho-cucamonga', 'plumber-claremont', 'plumber-ontario', 'plumber-la-verne'],
  },
  'plumber-ontario': {
    route: 'East on the 10 or the 60, about 15 minutes.',
    close: 'Ontario is about 15 minutes from Pomona. Big city, lots of different homes, and we work in all of it.',
    guideIntro: 'Ontario has older neighborhoods and brand-new ones, so the calls cover everything: an old sewer line in one house, a new tankless water heater in the next.',
    problems: ['grease', 'heater', 'slab', 'mainline'],
    guide: ['mainline', 'heater', 'slab', 'fixtures'],
    neighbours: ['plumber-montclair', 'plumber-upland', 'plumber-rancho-cucamonga', 'plumber-chino', 'plumber-fontana'],
    map: [40.5, 32.5],
  },
  'plumber-chino': {
    route: 'South-east on the 71 or the 60, about 15 minutes.',
    close: 'Chino is about 15 minutes from our base. We fix hard-water damage, water heaters, drains and leaks all over town.',
    guideIntro: 'Hard water causes a lot of the problems we fix around Chino: scaled-up water heaters, crusty faucets and pinhole leaks. Here is what that looks like and what helps.',
    problems: ['hardwater', 'heater', 'grease', 'slab'],
    guide: ['hardwater', 'heater', 'fixtures', 'slab'],
    neighbours: ['plumber-chino-hills', 'plumber-ontario', 'plumber-montclair', 'plumber-eastvale', 'plumber-norco'],
    map: [37.3, 38.5],
  },
  'plumber-chino-hills': {
    route: 'South on the 71, about 20 minutes from Pomona.',
    close: 'Chino Hills is about 20 minutes from Pomona. Slab leaks, repipes, water heaters and drains: call and we talk it through on the phone first.',
    guideIntro: 'Slab leaks, worn copper pipe and water heaters are common calls from Chino Hills. Here is how to spot the problem early.',
    problems: ['slab', 'oldpipes', 'heater', 'hardwater'],
    guide: ['slab', 'oldpipes', 'heater', 'hardwater'],
    neighbours: ['plumber-chino', 'plumber-diamond-bar', 'plumber-brea', 'plumber-yorba-linda', 'plumber-corona'],
    map: [34.3, 41.5],
  },
  'plumber-rancho-cucamonga': {
    route: 'East on the 210 or the 10, about 20 minutes.',
    close: 'Rancho Cucamonga is about 20 minutes from our Pomona base. Water heaters, leaks, drains and gas lines, day or night.',
    guideIntro: 'Water heaters, leaks and gas lines come up a lot in Rancho Cucamonga. A lot of it is everyday wear, made faster by hard water.',
    problems: ['heater', 'slab', 'gas', 'grease'],
    guide: ['heater', 'slab', 'gas', 'hardwater'],
    neighbours: ['plumber-upland', 'plumber-ontario', 'plumber-fontana', 'plumber-montclair', 'plumber-claremont'],
  },
  'plumber-fontana': {
    route: 'East on the 10 or the 210, about 25 minutes.',
    close: 'Fontana is about 25 minutes from Pomona. Call first and we give you an honest arrival time before we head out.',
    guideIntro: 'In Fontana we clear drains, fix water heaters and track down leaks and sewer problems. Here is what usually causes them.',
    problems: ['grease', 'heater', 'mainline', 'slab'],
    guide: ['grease', 'heater', 'mainline', 'slab'],
    neighbours: ['plumber-rancho-cucamonga', 'plumber-ontario', 'plumber-jurupa-valley', 'plumber-upland', 'plumber-riverside'],
    map: [56, 28.7],
  },
  'plumber-eastvale': {
    route: 'South-east, about 25 minutes from our base.',
    close: 'Eastvale is about 25 minutes from Pomona. Newer homes still break: water heaters, leaks and fixtures need a plumber too.',
    guideIntro: 'Eastvale is a newer city, with mostly newer homes, so old-pipe problems are less common than the everyday ones: water heaters, leaks at fixtures and clogged drains.',
    problems: ['heater', 'fixtures', 'grease', 'hardwater'],
    guide: ['heater', 'fixtures', 'grease', 'hardwater'],
    neighbours: ['plumber-norco', 'plumber-chino', 'plumber-ontario', 'plumber-jurupa-valley', 'plumber-corona'],
    map: [46.5, 44.4],
  },
  'plumber-norco': {
    route: 'South-east, about 25 minutes from Pomona.',
    close: 'Norco is about 25 minutes from our base. Main lines, water heaters, drains and gas lines: we come out for all of it.',
    guideIntro: 'On bigger Norco lots, where the house sits well back from the street, the water and sewer lines run longer, and there is more line to go wrong.',
    problems: ['mainline', 'heater', 'gas', 'grease'],
    guide: ['mainline', 'heater', 'gas', 'hardwater'],
    neighbours: ['plumber-corona', 'plumber-eastvale', 'plumber-jurupa-valley', 'plumber-riverside', 'plumber-chino'],
    map: [47.8, 49],
  },
  'plumber-corona': {
    route: 'South on the 71, about 30 minutes from Pomona.',
    close: 'Corona is about 30 minutes from Pomona. Call first and we tell you honestly how long it will take to get to you.',
    guideIntro: 'Slab leaks, water heaters, drains and repipes are the jobs Corona homeowners call us for. Here is what is behind each one.',
    problems: ['slab', 'heater', 'oldpipes', 'grease'],
    guide: ['slab', 'heater', 'oldpipes', 'hardwater'],
    neighbours: ['plumber-norco', 'plumber-eastvale', 'plumber-riverside', 'plumber-yorba-linda', 'plumber-chino-hills'],
    map: [45.8, 55.5],
  },
  'plumber-jurupa-valley': {
    route: 'East on the 60, about 25 minutes.',
    close: 'Jurupa Valley is about 25 minutes from our Pomona base. Sewer lines, drains and water heaters, any hour.',
    guideIntro: 'We go out to Jurupa Valley for sewer and main-line problems, along with drains and water heaters.',
    problems: ['mainline', 'grease', 'heater', 'roots'],
    guide: ['mainline', 'grease', 'heater', 'roots'],
    neighbours: ['plumber-riverside', 'plumber-eastvale', 'plumber-norco', 'plumber-fontana', 'plumber-ontario'],
    map: [51.5, 41],
  },
  'plumber-riverside': {
    route: 'East on the 60, about 35 minutes from Pomona.',
    close: 'Riverside is about 35 minutes from our base. Call first and we give you a real time on the phone.',
    guideIntro: 'Riverside has a lot of older housing, and older housing means older pipes: clay sewer lines, roots and worn-out water heaters are regular calls.',
    problems: ['roots', 'oldpipes', 'heater', 'slab'],
    guide: ['roots', 'oldpipes', 'heater', 'slab'],
    neighbours: ['plumber-jurupa-valley', 'plumber-moreno-valley', 'plumber-norco', 'plumber-corona', 'plumber-eastvale'],
    map: [60.3, 42.5],
  },
  'plumber-moreno-valley': {
    route: 'East on the 60, about 45 minutes.',
    close: 'Moreno Valley is the farthest town on our list, about 45 minutes from Pomona. Call first and we will tell you straight if and when we can get there.',
    guideIntro: 'Our Moreno Valley calls are mostly drains, water heaters and leaks. Because it is a longer drive for us, a photo by text helps us bring the right parts the first time.',
    problems: ['grease', 'heater', 'slab', 'hardwater'],
    guide: ['grease', 'heater', 'slab', 'hardwater'],
    neighbours: ['plumber-riverside', 'plumber-jurupa-valley', 'plumber-corona', 'plumber-norco', 'plumber-fontana'],
    map: [71, 48.5],
  },
  'plumber-brea': {
    route: 'South on the 57, about 30 minutes from Pomona.',
    close: 'Brea is about 30 minutes from Pomona, straight down the 57. Call any hour and we tell you when we can be there.',
    guideIntro: 'Brea calls are mostly drains, water heaters, slab leaks and repipes. Here is what to watch for in your own home.',
    problems: ['grease', 'slab', 'heater', 'oldpipes'],
    guide: ['grease', 'slab', 'heater', 'oldpipes'],
    neighbours: ['plumber-fullerton', 'plumber-yorba-linda', 'plumber-diamond-bar', 'plumber-chino-hills', 'plumber-rowland-heights'],
    map: [22.2, 50.8],
  },
  'plumber-yorba-linda': {
    route: 'South on the 57, then east, about 30 minutes.',
    close: 'Yorba Linda is about 30 minutes from our Pomona base. Slab leaks, repipes and water heaters: call and tell us what you see.',
    guideIntro: 'Slab leaks, repipes and water heaters are common calls from Yorba Linda. Here is how slab leaks work, and when a repipe makes sense.',
    problems: ['slab', 'oldpipes', 'heater', 'hardwater'],
    guide: ['slab', 'oldpipes', 'heater', 'hardwater'],
    neighbours: ['plumber-brea', 'plumber-anaheim', 'plumber-fullerton', 'plumber-chino-hills', 'plumber-corona'],
  },
  'plumber-fullerton': {
    route: 'South on the 57, about 35 minutes from Pomona.',
    close: 'Fullerton is about 35 minutes from Pomona. Call first and we give you an honest arrival time.',
    guideIntro: 'Fullerton has plenty of older homes, so we see old sewer lines, roots and worn drains here, along with water heaters.',
    problems: ['roots', 'mainline', 'grease', 'heater'],
    guide: ['roots', 'mainline', 'oldpipes', 'heater'],
    neighbours: ['plumber-brea', 'plumber-anaheim', 'plumber-yorba-linda', 'plumber-diamond-bar', 'plumber-rowland-heights'],
    map: [20.5, 56.5],
  },
  'plumber-anaheim': {
    route: 'South on the 57, about 35 minutes.',
    close: 'Anaheim is about 35 minutes from our Pomona base. Drains, water heaters, leaks and sewer lines: call any hour.',
    guideIntro: 'Anaheim is a big city with homes of every age. The calls we get here are the full range: clogged drains, water heaters, leaks and sewer lines.',
    problems: ['grease', 'heater', 'slab', 'mainline'],
    guide: ['grease', 'heater', 'slab', 'mainline'],
    neighbours: ['plumber-fullerton', 'plumber-yorba-linda', 'plumber-brea', 'plumber-corona', 'plumber-chino-hills'],
    map: [21, 60.7],
  },
};

const L = (label: string, slug: string) => ({ label, href: `/${slug}/` });

/** Problem cards (short). `n` = town name. */
function problem(k: ProblemKey, n: string): Problem {
  switch (k) {
    case 'roots': return { tag: 'Roots', chip: 'Tree roots in the sewer line', title: 'Roots in sewer lines', text: 'Big trees send roots into old clay sewer pipes. First sign: a slow toilet or a gurgle in the tub.' };
    case 'oldpipes': return { tag: 'Old pipes', chip: 'Slow drains in an older home', title: 'Older pipes', text: 'Galvanized water pipes rust inside and cast-iron drains scale up with age. Low pressure or brown water are the clues.' };
    case 'hardwater': return { tag: 'Hard water', chip: 'Water heater worn out by hard water', title: 'Hard water', text: 'Minerals build up in water heaters, faucets and pipes, and wear them out sooner.' };
    case 'slab': return { tag: 'Slab leak', chip: 'Warm spot on the floor', title: 'Slab leaks', text: 'Copper lines under concrete floors can wear through. Warm spot on the floor? Call us.' };
    case 'heater': return { tag: 'Water heater', chip: 'No hot water', title: 'Water heaters', text: `No hot water, a noisy tank or a puddle in the garage. We repair or replace tank and tankless units in ${n}.` };
    case 'grease': return { tag: 'Drains', chip: 'Kitchen sink keeps clogging', title: 'Clogged drains', text: 'Grease, food and soap build up inside kitchen and bath drains until the water stops going down.' };
    case 'mainline': return { tag: 'Main line', chip: 'Sewer backing up', title: 'Main sewer lines', text: 'When every drain is slow at once, the problem is usually the main line out to the street.' };
    case 'gas': return { tag: 'Gas lines', chip: 'Gas line for a stove or grill', title: 'Gas lines', text: 'Leaks found and fixed, and new lines run for stoves, dryers, grills and fire pits. Smell gas? Leave and call SoCalGas first.' };
    case 'fixtures': return { tag: 'Fixtures', chip: 'Leaky faucet or toilet', title: 'Faucets & toilets', text: 'Running toilets, dripping faucets and failed shut-off valves. Small leaks waste a lot of water over a year.' };
    case 'adu': return { tag: 'ADU', chip: 'Plumbing for a backyard unit', title: 'ADU plumbing', text: 'Water, sewer and gas for a backyard unit, from rough-in to fixtures.' };
  }
}

/** A third phrasing for the common topics, so towns with the same problem mix still read differently. */
const THIRD: Partial<Record<ProblemKey, (n: string) => GuideItem>> = {
  roots: (n) => ({ t: 'Backups that keep coming back', d: `A sewer line that backs up, gets cleared, then backs up again a few months later is a classic sign of roots. Clearing the line buys time. Seeing inside it tells you whether the pipe itself is cracked. We can do both on the same visit to your ${n} home, and you decide what happens next.`, links: [L('Sewer camera', 'sewer-camera-inspection-pomona'), L('Rooter service', 'rooter-service-pomona')] }),
  oldpipes: (n) => ({ t: 'Knowing what pipe you have', d: `Look under a sink or at the water heater connections. Grey threaded pipe is usually galvanized steel. Shiny or brown-green pipe is copper. White, blue or red flexible pipe is plastic. If your ${n} house still has galvanized lines, low pressure and rust-tinted water are the warning signs to watch.`, links: [L('Repiping', 'repiping-pomona'), L('General repair', 'plumbing-repair-pomona')] }),
  slab: (n) => ({ t: 'Is it a slab leak?', d: `Turn off every tap and appliance, then check the water meter. If the dial still moves, water is escaping somewhere. Add a warm patch on the floor or a sound of running water and a slab leak is likely. Call before you start pulling up flooring in your ${n} home: finding the exact spot first saves a lot of concrete.`, links: [L('Leak detection', 'leak-detection-pomona')] }),
  hardwater: (n) => ({ t: 'What hard water does over time', d: `Scale builds up a little every day: on the heating surfaces of the water heater, in faucet cartridges, in toilet fill valves. Nothing fails at once, but parts wear out years sooner. For most ${n} homes, a yearly water heater flush and cleaning aerators does more than any gadget.`, links: [L('Water heaters', 'water-heater-pomona'), L('Home plumbing', 'residential-plumbing-pomona')] }),
  heater: (n) => ({ t: 'Tank or tankless?', d: `A tank heater is cheaper to put in and simple to service. A tankless unit takes less space and never runs out mid-shower, but needs the right gas line and venting. When yours gives out, we explain both for your ${n} home in plain words, with the price before any work starts.`, links: [L('Water heaters', 'water-heater-pomona'), L('Gas line installation', 'gas-line-installation-pomona')] }),
  grease: (n) => ({ t: 'Keeping drains clear', d: `Wipe greasy pans before washing them, use a strainer in the shower, and keep wipes out of the toilet. Those three habits prevent most of the clogs we clear. When a drain in your ${n} home still slows down, call before the chemicals come out: they are hard on old pipes.`, links: [L('Drain cleaning', 'drain-cleaning-pomona')] }),
  mainline: (n) => ({ t: 'Signs the main line is the problem', d: `Gurgling toilets, water backing up in the lowest drain of the house, or a sewage smell in the yard all point to the main line, not one fixture. If you see any of that in ${n}, stop running water and call. We find where the line is blocked or broken before anything gets dug up.`, links: [L('Main line repair', 'main-line-repair-pomona'), L('Hydro jetting', 'hydro-jetting-pomona')] }),
};

/** Longer guide paragraphs. Two phrasings per topic (plus THIRD) so neighbouring pages read differently. */
function guide(k: ProblemKey, n: string, v: number): GuideItem {
  if (v % 3 === 2 && THIRD[k]) return THIRD[k]!(n);
  const a = v % 2 === 0;
  switch (k) {
    case 'roots': return a
      ? { t: 'Tree roots in sewer lines', d: `Many older homes have clay sewer pipe running from the house to the street, laid in short sections with a joint every few feet. Over the years the joints shift and open a little. A thin root gets in, finds water and grows. The first sign is usually a slow toilet or a gurgle in the tub. We cut roots out with a rooter, wash the line with hydro jetting when needed, and can run a camera down the line so you can see what is going on.`, links: [L('Rooter service', 'rooter-service-pomona'), L('Hydro jetting', 'hydro-jetting-pomona'), L('Sewer camera', 'sewer-camera-inspection-pomona')] }
      : { t: 'Roots in the sewer line', d: `Roots go looking for water, and an old sewer pipe is an easy place to find it. If your ${n} home has big trees near the line to the street, a backup that keeps coming back is often roots. We clear them, and if the pipe is broken or the roots return, we talk you through a main line repair.`, links: [L('Rooter service', 'rooter-service-pomona'), L('Main line repair', 'main-line-repair-pomona')] };
    case 'oldpipes': return a
      ? { t: 'Older pipes', d: `Homes built before modern plastic and copper pipe can still have galvanized steel water lines, which rust on the inside, and cast-iron drains, which scale and crack with age. That does not mean every older home in ${n} needs new pipes. It means it is worth knowing what you have. Low pressure, rusty water or a second leak in a year are the signs to ask about repiping.`, links: [L('Repiping', 'repiping-pomona')] }
      : { t: 'Worn copper and old water lines', d: `Pipe does not last forever. Hard water and time can wear thin spots in copper until pinhole leaks start showing up, one after another. One leak is a repair. Several in a year usually means it is time to look at a repipe. We tell you which one you are dealing with.`, links: [L('Copper pipe & repiping', 'repiping-pomona'), L('Leak detection', 'leak-detection-pomona')] };
    case 'slab': return a
      ? { t: 'Slab leaks', d: `Many Southern California homes are built on a concrete slab, with copper water pipes running underneath. Hard water and time can wear a pinhole in that copper. Signs: a warm spot on the floor, the sound of running water when nothing is on, a water bill that jumps for no reason, or a damp carpet. We find the leak first, so nobody breaks up more floor than needed.`, links: [L('Leak detection', 'leak-detection-pomona')] }
      : { t: 'Leaks under the floor', d: `If your ${n} home sits on a slab, a leak can run for weeks before you see it. Watch the water meter with every tap off: if it still moves, water is going somewhere. We track the leak down before any digging, then fix it or reroute the line.`, links: [L('Leak detection', 'leak-detection-pomona'), L('Repiping', 'repiping-pomona')] };
    case 'hardwater': return a
      ? { t: 'Hard water', d: `Water across much of Southern California is hard. Minerals coat faucet aerators, showerheads and the inside of pipes, and settle in the bottom of water heaters, which shortens their life. Flushing your water heater once a year helps a lot.`, links: [L('Water heaters', 'water-heater-pomona')] }
      : { t: 'Mineral build-up', d: `White crust on faucets and showerheads is the part of hard water you can see. The part you cannot see is the scale settling inside your water heater and pipes. A rumbling tank or a weak shower are early signs. A yearly flush keeps it in check.`, links: [L('Water heaters', 'water-heater-pomona'), L('Home plumbing', 'residential-plumbing-pomona')] };
    case 'heater': return a
      ? { t: 'Water heaters', d: `No hot water, lukewarm showers, a popping sound from the tank or water on the garage floor all point to the water heater. We repair what can be repaired and tell you straight when a tank is done. Tank or tankless, we install both.`, links: [L('Water heaters', 'water-heater-pomona')] }
      : { t: 'When the hot water quits', d: `Most tanks give warning before they fail: rust-coloured hot water, a rumble when it heats, a slow drip from the valve. If you see any of that in your ${n} home, call before it turns into a flooded garage. Text us a photo of the label and we can tell you a lot.`, links: [L('Water heaters', 'water-heater-pomona')] };
    case 'grease': return a
      ? { t: 'Drains that keep clogging', d: `Kitchen drains clog from grease and food, bathroom drains from hair and soap. Store-bought drain cleaner can make it worse. We clear the line properly, and if it keeps coming back, hydro jetting scours the pipe walls clean.`, links: [L('Drain cleaning', 'drain-cleaning-pomona'), L('Hydro jetting', 'hydro-jetting-pomona')] }
      : { t: 'Slow and clogged drains', d: `One slow sink is usually a local clog. Several slow drains at once, or water coming up in the tub when you flush, points further down the line. We figure out which it is before we start, and tell you the price first.`, links: [L('Drain cleaning', 'drain-cleaning-pomona'), L('Sewer camera', 'sewer-camera-inspection-pomona')] };
    case 'mainline': return a
      ? { t: 'Main sewer and water lines', d: `The main line carries everything from the house to the street. When it cracks, sags or fills with roots, every drain in the house backs up. A camera shows where the problem is, so the fix is aimed at the right spot.`, links: [L('Main line repair', 'main-line-repair-pomona'), L('Sewer camera', 'sewer-camera-inspection-pomona')] }
      : { t: 'Long lines, more to go wrong', d: `The farther a house sits from the street, the longer the water and sewer lines, and the more places they can crack or settle. Low water pressure across the house, or a wet patch in the yard, are worth a call.`, links: [L('Main line repair', 'main-line-repair-pomona'), L('Leak detection', 'leak-detection-pomona')] };
    case 'gas': return { t: 'Gas lines', d: `We repair gas leaks and bad connections, and run new lines for stoves, dryers, outdoor grills, fire pits and pool heaters. If you smell gas, leave the house first and call SoCalGas from outside. Then call us for the repair.`, links: [L('Gas line repair', 'gas-line-repair-pomona'), L('Gas line installation', 'gas-line-installation-pomona')] };
    case 'fixtures': return { t: 'Fixtures and everyday leaks', d: `Newer homes still need a plumber. Toilets run, faucets drip, shut-off valves seize and garbage disposals jam. Small jobs are real jobs to us, and they are often the cheapest ones to fix early.`, links: [L('Home plumbing', 'residential-plumbing-pomona'), L('General repair', 'plumbing-repair-pomona')] };
    case 'adu': return { t: 'ADUs', d: `Homeowners are adding backyard units (ADUs). An ADU needs water, a sewer connection and often gas. We do ADU plumbing from rough-in to fixtures.`, links: [L('ADU plumbing', 'adu-plumbing-pomona')] };
  }
}

function faqs(t: Town, r: Raw): Faq[] {
  const n = t.name;
  const fast = t.drive <= 10
    ? `We're about ${t.drive} minutes away in Pomona. Most calls get a plumber within about an hour.`
    : t.drive <= 20
      ? `${n} is roughly ${t.drive} minutes from our base in normal traffic. Call and we give you a real time on the phone.`
      : `${n} is roughly ${t.drive} minutes from Pomona. Call first and we tell you honestly how soon we can get there.`;
  const top = r.problems[0];
  const third: Record<ProblemKey, Faq> = {
    roots: { q: 'My sewer keeps backing up. Is it roots?', a: `Often it is, especially in older homes with big trees. A sewer camera shows it for sure, and a rooter clears it.` },
    oldpipes: { q: 'Should I repipe my older home?', a: 'Not always. If you have low pressure, rusty water or more than one leak in a year, it is worth a look. We tell you straight.' },
    hardwater: { q: 'Is hard water hurting my plumbing?', a: 'Over time, yes. It scales up water heaters, faucets and pipes. Flushing the water heater once a year helps a lot.' },
    slab: { q: 'How do I know if I have a slab leak?', a: 'A warm spot on the floor, the sound of running water with every tap off, or a water bill that jumps for no reason. We find the leak before anyone breaks up the floor.' },
    heater: { q: 'Should I repair or replace my water heater?', a: 'It depends on the age of the tank and what failed. We look first, tell you the options and the price, and you decide.' },
    grease: { q: 'Why does my kitchen drain keep clogging?', a: 'Usually grease and food building up inside the pipe. Clearing it properly, and hydro jetting when it keeps coming back, solves it for good more often than drain cleaner.' },
    mainline: { q: 'Every drain in the house is slow. What is it?', a: 'When all the drains are slow at once, the main line to the street is the usual suspect. A camera shows where the problem is before any digging.' },
    gas: { q: 'Can you run a gas line for a grill or fire pit?', a: 'Yes. We run new gas lines for stoves, dryers, grills, fire pits and pool heaters, and repair leaks. If you smell gas, leave the house and call SoCalGas first.' },
    fixtures: { q: 'Do you take small jobs like a running toilet?', a: 'Yes. A dripping faucet or a running toilet is a real job to us. Call or text a photo.' },
    adu: { q: 'Do you do plumbing for ADUs?', a: 'Yes. Water, sewer and gas for a backyard unit, from rough-in to fixtures.' },
  };
  const list: Faq[] = [
    { q: `How fast can you get to ${n}?`, a: fast },
    { q: `Do you cover all of ${n}?`, a: `Yes, all of ${n}${r.zip ? `, ${r.zip}` : ''}, plus the towns around it. If you are not sure we come to your street, just call.` },
    third[top],
    { q: 'Do you work at night and on weekends?', a: 'Yes. The phone is answered 24/7, nights, weekends and holidays.' },
    { q: 'What does it cost?', a: 'It depends on the job. We look first and tell you the price before we start. Text a photo and we can give you a price range.' },
  ];
  if (n === 'Claremont') {
    list[1] = { q: 'Do you cover North Claremont and up near the hills?', a: 'Yes. All of Claremont, 91711.' };
    list.splice(3, 0, { q: 'I live near the Village. Should I repipe?', a: "Not always. If you have low pressure, rusty water or more than one leak, it's worth a look." });
  }
  return list;
}

export interface TownPage {
  town: Town; zip?: string; route: string; close: string; guideIntro: string;
  problems: (Problem & { key: ProblemKey })[]; heroChips: string[]; guide: GuideItem[];
  neighbours: Town[]; faqs: Faq[]; map?: [number, number];
  areaChips?: string[]; areaText: string; glanceLed?: string; glanceTitle?: string; glanceText?: string;
  problemsHead: [string, string]; guideHead: [string, string]; areaHead: [string, string]; closeHead: [string, string];
}

export function townPage(slug: string): TownPage {
  const idx = TOWNS.findIndex((t) => t.slug === slug);
  const town = TOWNS[idx];
  const r = RAW[slug];
  const n = town.name;
  const problems = r.problems.map((k) => ({ key: k, ...problem(k, n) }));
  const page: TownPage = {
    town, zip: r.zip, route: r.route, close: r.close, guideIntro: r.guideIntro,
    problems, heroChips: problems.slice(0, 3).map((p) => p.chip),
    guide: [
      ...r.guide.map((k, i) => guide(k, n, idx * 2 + i)),
      { t: `Around ${n}`, d: `${n} is in ${town.county}, roughly ${town.drive} minutes from our Pomona base in normal traffic. We also cover the towns around it, including ${r.neighbours.slice(0, 4).map((s) => TOWNS.find((x) => x.slug === s)!.name).join(', ')}. Wherever you are, a real person answers the phone 24/7, in English or Spanish, and you hear the price before any work starts.`, links: r.neighbours.slice(0, 3).map((s) => { const x = TOWNS.find((y) => y.slug === s)!; return { label: `Plumber in ${x.name}`, href: `/${x.slug}/` }; }) },
    ],
    neighbours: r.neighbours.map((s) => TOWNS.find((t) => t.slug === s)!),
    faqs: faqs(town, r), map: r.map,
    areaText: `We cover all of ${n}, in ${town.county}, along with the towns around it. ${r.route}`,
    problemsHead: [`Common problems`, `in ${n} homes`],
    guideHead: [`Plumbing in ${n}:`, 'what to watch for'],
    areaHead: ['All over', `${n}`],
    closeHead: town.drive <= 10 ? ["We're right next", 'door in Pomona'] : town.drive <= 20 ? ['A short drive', 'from Pomona'] : town.drive <= 30 ? ['Based in Pomona,', `out to ${n}`] : ['Call first.', 'We tell you straight.'],
  };
  if (slug === 'plumber-claremont') {
    page.problems = [
      { key: 'roots', ...problem('roots', n), text: 'They call it the City of Trees for a reason. Big old trees send roots into old clay sewer pipes.' },
      { key: 'oldpipes', ...problem('oldpipes', n), title: 'Old pipes near the Village', text: 'Many homes near the Village and the Colleges are decades old, with cast-iron drains and galvanized water pipes.' },
      { key: 'hardwater', ...problem('hardwater', n), text: 'Minerals build up in water heaters, faucets and pipes.' },
      { key: 'slab', ...problem('slab', n), chip: '', text: 'Copper lines under concrete floors can wear through. Warm spot on the floor? Call us.' },
    ];
    page.heroChips = ['Tree roots in the sewer line', 'Slow drains in an older home', 'Water heater worn out by hard water'];
    page.problemsHead = ['Claremont homes have', 'their own problems'];
    page.guideHead = ['Why Claremont homes have', 'their own plumbing problems'];
    page.areaHead = ['From the Village', 'to the foothills'];
    page.areaText = 'We work all over Claremont: the Village and Village West, the streets around the Colleges, north of Foothill Blvd, up toward Padua Hills and the Wilderness Park.';
    page.areaChips = ['The Village', 'Village West', 'The Colleges', 'North Claremont', 'Padua Hills', 'Near Memorial Park', 'Near the Wilderness Park', 'Foothill Blvd', 'Indian Hill Blvd', 'Base Line Rd'];
    page.glanceLed = 'TREES'; page.glanceTitle = '"City of Trees"'; page.glanceText = 'Big old trees send roots into old clay sewer pipes.';
    page.guide = [
      { t: 'The City of Trees', d: 'Claremont is proud of its trees. Those trees are thirsty, and an old sewer pipe is a great place to find water. Many older homes have clay sewer lines with a joint every few feet. Over the years the joints shift and open a little. A thin root gets in and grows. The first sign is usually a slow toilet or a gurgle in the tub. Then one day the line backs up. We cut roots out with a rooter, wash the line with hydro jetting when needed, and can run a camera so you see what is going on.', links: [L('Rooter service', 'rooter-service-pomona'), L('Hydro jetting', 'hydro-jetting-pomona'), L('Sewer camera', 'sewer-camera-inspection-pomona')] },
      { t: 'Older homes near the Village', d: "Some of the oldest homes in the Pomona Valley are around the Village and the Colleges. They can still have galvanized steel water pipes (low pressure, brown water), cast-iron drains (scale and cracks) and clay sewer lines. That doesn't mean every older home needs new pipes. It means it's worth knowing what you have.", links: [L('Repiping', 'repiping-pomona')] },
      { t: 'Post-war homes on slabs', d: 'A lot of Claremont was built after World War II, with copper water pipes under a concrete slab. Hard water and time can wear a pinhole in that copper. Signs: a warm spot on the floor, running water when nothing is on, a water bill that jumps. Our leak detection finds it first, so nobody breaks up more floor than needed.', links: [L('Leak detection', 'leak-detection-pomona')] },
      { t: 'Hard water', d: 'Water across the Pomona Valley is hard. Minerals coat aerators and showerheads and settle in water heaters. Flushing your water heater once a year helps a lot.', links: [L('Water heaters', 'water-heater-pomona')] },
      { t: 'ADUs', d: 'Claremont homeowners are adding backyard units. An ADU needs water, a sewer connection and often gas. We do ADU plumbing from rough-in to fixtures.', links: [L('ADU plumbing', 'adu-plumbing-pomona')] },
    ];
  }
  return page;
}

export const COUNTY_GROUPS = [
  { county: 'Los Angeles County', short: 'LA County', sub: 'East LA County', id: 'la-county' },
  { county: 'San Bernardino County', short: 'San Bernardino', sub: 'Inland Empire west', id: 'san-bernardino' },
  { county: 'Riverside County', short: 'Riverside', sub: 'Inland Empire', id: 'riverside' },
  { county: 'Orange County', short: 'Orange County', sub: 'North OC', id: 'orange-county' },
] as const;

/** Zoom the regional map (map-service-area.jpg) onto Pomona + one town. Positions are percent of the full 1000x700 image. */
export function mapView(tp?: [number, number]) {
  const BASE: [number, number] = [33, 33.5];
  const W = tp ? Math.min(100, Math.max(50, 2 * Math.max(Math.abs(tp[0] - BASE[0]), Math.abs(tp[1] - BASE[1])) + 26)) : 50;
  const cx = tp ? (tp[0] + BASE[0]) / 2 : BASE[0];
  const cy = tp ? (tp[1] + BASE[1]) / 2 : BASE[1];
  const x0 = Math.min(Math.max(cx - W / 2, 0), 100 - W);
  const y0 = Math.min(Math.max(cy - W / 2, 0), 100 - W);
  // Phone crop (Figma 331:675): a 350x300 window zoomed twice as far, same centre. Hm = share of the image height it shows.
  const Wm = W / 2;
  const Hm = (Wm * 300) / (350 * 0.7);
  const x0m = Math.min(Math.max(cx - Wm / 2, 0), 100 - Wm);
  const y0m = Math.min(Math.max(cy - Hm / 2, 0), 100 - Hm);
  const pct = (v: number) => ((v / W) * 100).toFixed(2) + '%';
  const f = (v: number) => v.toFixed(2) + '%';
  const at = (pt: [number, number]) => `left:${pct(pt[0] - x0)};top:${pct(pt[1] - y0)};--mx:${f(((pt[0] - x0m) / Wm) * 100)};--my:${f(((pt[1] - y0m) / Hm) * 100)}`;
  const mapStyle = `width:${pct(100)};left:${pct(-x0)};top:${pct(-y0)};--mw:${f((100 / Wm) * 100)};--ml:${f((-x0m / Wm) * 100)};--mt:${f((-y0m / Hm) * 100)}`;
  // Which side each label sits on, so it never runs off the map edge.
  const baseLabel = (BASE[0] - x0) / W < 0.42 ? 'r' : 'l';
  const townLabel = tp && (tp[0] - x0) / W > 0.6 ? 'l' : 'r';
  return { BASE, at, mapStyle, baseLabel, townLabel };
}
