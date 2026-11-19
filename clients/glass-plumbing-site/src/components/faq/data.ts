// /faq content, word for word from the Figma frames 730:437 (desktop) / 730:766 (mobile). Five groups, 17 questions.
// `src` = the source line under the answer (Figma copy). Group ids are the anchors the hero tiles and the rail link to.
export interface Qa { q: string; a: string; src?: string }
export interface Group { id: string; name: string; items: Qa[] }

export const FAQ_GROUPS: Group[] = [
  {
    id: 'emergencies', name: 'Emergencies', items: [
      { q: 'A pipe burst. What do I do first?', a: 'Close your main shut-off valve to stop the water, then call (727) 512-0673.' },
      { q: 'Do you really answer 24/7?', a: 'Yes. For emergencies, call (727) 512-0673 any hour, day or night.' },
      { q: 'Where is my main shut-off valve?', a: 'Usually where the water line enters the house, or at the meter near the street. Find it and label it before you need it, as Pinellas County advises.', src: 'Source · Pinellas County, “Prepare your pipes for cold weather”' },
      { q: 'My water heater sat in storm flood water. Can I use it?', a: 'Don’t turn it on. A heater that sat in flood water, salt water above all, usually needs replacing. Call and we check it first.' },
    ],
  },
  {
    id: 'water-heaters', name: 'Water heaters', items: [
      { q: 'Tank or tankless for a Florida home?', a: 'It depends on how much hot water you use at once and whether you have gas. Tankless heats on demand and hangs on the wall. A tank stores hot water and costs less to fit.' },
      { q: 'Do I need a permit to replace a water heater?', a: 'Usually, yes. Pinellas County lists a “Water Heater Equal Change Out, Tank or Tankless” permit, and Clearwater requires permits for water heaters. We file it for you.', src: 'Source · pinellas.gov Express Permits · myclearwater.com, read 17 Nov 2026' },
      { q: 'How fast can you put in a new one?', a: 'Often the next day. One customer wrote: “called and had one installed the next day”.', src: 'Source · Kevin Kelleman, Google review' },
    ],
  },
  {
    id: 'hard-water', name: 'Hard water', items: [
      { q: 'How hard is Pinellas County water?', a: 'Very hard. It averages 217 ppm, which is 11.1 to 14.3 grains per gallon. That builds scale inside tanks and tankless units.', src: 'Source · Pinellas County Utilities 2025 water quality report' },
      { q: 'What should my softener be set to?', a: 'Pinellas County Utilities gives 11.1 to 14.3 grains per gallon as the softener setting. We set it up when we install.', src: 'Source · Pinellas County Utilities 2025 water quality report' },
      { q: 'Why does my water smell like a pool some weeks?', a: 'Twice a year Pinellas County Utilities switches from chloramine to free chlorine for a short time. The smell is that switch, not your pipes.', src: 'Source · pinellas.gov water quality pages' },
    ],
  },
  {
    id: 'permits', name: 'Permits in Pinellas', items: [
      { q: 'Which office issues my permit?', a: 'It depends on your address. Largo homes go to the Largo Building Division, Clearwater files online, and unincorporated areas go to Pinellas County. We check and file it.', src: 'Source · largo.com · myclearwater.com · pinellas.gov, read 17 Nov 2026' },
      { q: 'Does a repipe need a permit?', a: 'Yes. Pinellas County lists a “Re-pipe Water Distribution Interior Only” permit. We pull it before work starts.', src: 'Source · pinellas.gov Express Permits' },
      { q: 'Is Glass Plumbing licensed?', a: 'Yes. Florida certified plumbing contractor, licence CFC1432488, active until 08/31/2028. Licensed and insured.', src: 'Source · Florida DBPR licence lookup' },
    ],
  },
  {
    id: 'booking', name: 'Booking & price', items: [
      { q: 'Do I get the price before you start?', a: 'Yes. You get the price first, then you decide.' },
      { q: 'Can I send a photo first?', a: 'Yes. Text it to (727) 512-0673 with your town and what is going on.' },
      { q: 'Who gets the 10% discount?', a: 'Veterans, first responders, teachers and seniors. 10% off, up to $100.' },
      { q: 'Which areas do you cover?', a: 'All of Pinellas County, from our base in Largo: Seminole, Clearwater, St. Pete, the beaches and up to Tarpon Springs.' },
    ],
  },
];

export const FAQ_ALL: Qa[] = FAQ_GROUPS.flatMap((g) => g.items);
if (FAQ_ALL.length !== 17) throw new Error(`faq/data.ts: expected 17 questions, found ${FAQ_ALL.length}`);
