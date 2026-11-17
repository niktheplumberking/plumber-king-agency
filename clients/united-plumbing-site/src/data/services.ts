import drainImg from '../assets/img/standin-drain.jpg';
import whImg from '../assets/img/standin-water-heater.jpg';
import rooterImg from '../assets/img/standin-rooter.png';
import gasImg from '../assets/img/standin-gas.jpg';
import hydroImg from '../assets/img/standin-hydro.jpg';
import camImg from '../assets/img/standin-sewer-camera.jpg';

export type Family = 'drains' | 'water' | 'gas' | 'home';
export interface Service {
  slug: string; name: string; nav: string; short: string; family: Family; icon: string;
  title: string; description: string; img?: ImageMetadata; standIn?: boolean; cta: string;
}

export const FAMILIES: Record<Family, { num: string; name: string; icon: string; blurb: string }> = {
  drains: { num: '01', name: 'Drains & Sewer', icon: 'drop', blurb: 'Most calls start with a clog. In older Pomona neighborhoods, the bigger problem is often under the yard: old clay or cast-iron sewer lines that crack and let tree roots in.' },
  water: { num: '02', name: 'Water & Pipes', icon: 'flame', blurb: 'Pomona Valley water is hard. Minerals settle in water heaters and inside pipes. That means noisy tanks, lukewarm showers and, over time, pinhole leaks in copper.' },
  gas: { num: '03', name: 'Gas Lines', icon: 'fuel', blurb: 'We repair gas leaks and bad connections, and run new lines for stoves, dryers, outdoor grills, fire pits and pool heaters.' },
  home: { num: '04', name: 'Home Projects', icon: 'home', blurb: 'Toilets, faucets, garbage disposals, laundry lines, and plumbing for new ADUs (backyard units). If water runs through it, we work on it.' },
};

export const SERVICES: Service[] = [
  { slug: 'drain-cleaning-pomona', name: 'Drain Cleaning', nav: 'Drain cleaning', short: 'Sinks, tubs, toilets and main lines cleared and flowing again.', family: 'drains', icon: 'drop', img: drainImg, standIn: true, cta: 'Call about drain cleaning',
    title: 'Drain Cleaning Pomona | Family Owned | Open 24/7', description: 'Clogged sink, slow shower or backed-up drain in Pomona? United Plumbing clears it fast. Family owned since 2018. Call (909) 587-0711.' },
  { slug: 'water-heater-pomona', name: 'Water Heaters', nav: 'Water heaters', short: 'No hot water? Tank and tankless water heaters repaired or replaced.', family: 'water', icon: 'flame', img: whImg, standIn: true, cta: 'Call about water heaters',
    title: 'Water Heater Repair Pomona | Tank & Tankless | 24/7', description: 'No hot water in Pomona? Water heater repair and replacement, tank and tankless. Family owned since 2018. Call (909) 587-0711.' },
  { slug: 'rooter-service-pomona', name: 'Rooter Service', nav: 'Rooter service', short: 'Tree roots and backed-up sewer lines cleared.', family: 'drains', icon: 'wrench', img: rooterImg, standIn: true, cta: 'Call about rooter service',
    title: 'Rooter Service Pomona | Tree Root Removal | 24/7', description: 'Tree roots in your sewer line? United Plumbing cuts them out and gets your Pomona home flowing. Call (909) 587-0711.' },
  { slug: 'gas-line-repair-pomona', name: 'Gas Line Repair', nav: 'Gas line repair', short: 'Gas leaks and bad connections found and fixed.', family: 'gas', icon: 'fuel', img: gasImg, standIn: true, cta: 'Call about gas lines',
    title: 'Gas Line Repair Pomona | Open 24/7 | Family Owned', description: 'Smell gas? Leave the house and call your gas company first. Then call United Plumbing for gas line repair in Pomona: (909) 587-0711.' },
  { slug: 'hydro-jetting-pomona', name: 'Hydro Jetting', nav: 'Hydro jetting', short: 'High-pressure water scours grease and roots off the pipe walls.', family: 'drains', icon: 'jet', img: hydroImg, standIn: true, cta: 'Call about hydro jetting',
    title: 'Hydro Jetting Pomona | Grease & Root Clearing | 24/7', description: 'Drains that keep clogging? Hydro jetting blasts out grease, scale and roots. Pomona and nearby towns. Call (909) 587-0711.' },
  { slug: 'sewer-camera-inspection-pomona', name: 'Sewer Camera Inspection', nav: 'Sewer camera', short: 'See what is in your sewer line before anyone digs.', family: 'drains', icon: 'video', img: camImg, standIn: true, cta: 'Call about sewer camera',
    title: 'Sewer Camera Inspection Pomona | See the Problem', description: "We run a camera down your sewer line and show you what's wrong before any digging. Pomona and nearby. Call (909) 587-0711." },
  { slug: 'leak-detection-pomona', name: 'Leak Detection', nav: 'Leak detection', short: 'Hidden leaks and slab leaks, found fast.', family: 'water', icon: 'search', cta: 'Call about leak detection',
    title: 'Leak Detection Pomona | Slab Leaks | Open 24/7', description: 'High water bill or warm spot on the floor? We find hidden and slab leaks in Pomona homes. Call United Plumbing at (909) 587-0711.' },
  { slug: 'main-line-repair-pomona', name: 'Main Line Repair', nav: 'Main line repair', short: 'Main sewer and water line fixes.', family: 'drains', icon: 'arrow', cta: 'Call about main lines',
    title: 'Main Sewer Line Repair Pomona | Water Line | 24/7', description: 'Main sewer or water line problems in Pomona? Repair and replacement by a family-owned crew. Call United Plumbing at (909) 587-0711.' },
  { slug: 'repiping-pomona', name: 'Copper Pipe & Repiping', nav: 'Repiping', short: 'Copper pipe repair and full repipes.', family: 'water', icon: 'wrench', cta: 'Call about repiping',
    title: 'Repiping Pomona | Copper Pipe Repair | Family Owned', description: 'Pinhole leaks or old pipes? Copper pipe repair and whole-house repiping in Pomona. Call United Plumbing at (909) 587-0711.' },
  { slug: 'gas-line-installation-pomona', name: 'Gas Line Installation', nav: 'Gas line install', short: 'Lines for stoves, dryers, grills, fire pits.', family: 'gas', icon: 'fuel', cta: 'Call about gas line installs',
    title: 'Gas Line Installation Pomona | Grills, Dryers, Fire Pits', description: 'New gas line for a stove, dryer, grill, fire pit or pool heater in Pomona. United Plumbing, (909) 587-0711.' },
  { slug: 'residential-plumbing-pomona', name: 'Home Plumbing', nav: 'Home plumbing', short: 'Toilets, faucets, disposals, laundry.', family: 'home', icon: 'home', cta: 'Call about home plumbing',
    title: 'Home Plumbing Pomona | Toilets, Faucets, Disposals', description: 'Toilets, faucets, garbage disposals and laundry lines fixed or installed in Pomona homes. Call United Plumbing at (909) 587-0711.' },
  { slug: 'adu-plumbing-pomona', name: 'ADU Plumbing', nav: 'ADU plumbing', short: 'Plumbing for your backyard unit.', family: 'home', icon: 'plus', cta: 'Call about ADU plumbing',
    title: 'ADU Plumbing Pomona | Rough-In to Finish | Family Owned', description: 'Building an ADU in Pomona? Water, sewer and fixture plumbing for your backyard unit. Call United Plumbing at (909) 587-0711.' },
  { slug: 'plumbing-repair-pomona', name: 'General Repair', nav: 'General repair', short: 'If water runs through it, we fix it.', family: 'home', icon: 'wrench', cta: 'Call about a repair',
    title: 'Plumbing Repair Pomona | Any Job, Big or Small | 24/7', description: 'If water runs through it, we fix it. General plumbing repair in Pomona and nearby towns. Call (909) 587-0711.' },
];
export const bySlug = (s: string) => SERVICES.find((x) => x.slug === s)!;
