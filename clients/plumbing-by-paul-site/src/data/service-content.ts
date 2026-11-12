// Long-form content for each service page. A service only gets a page once it has an entry here.
// Source: Paul's current service pages (text in source-site-text/) rewritten in plain words. No prices, no invented facts.
export interface ServiceContent {
  /** H1 is "<h1a> <h1b>", h1b is the coral half. Keep the keyword + town in it. */
  h1a: string; h1b: string; eyebrow: string; lead: string;
  introTitle: [string, string]; intro: string[]; includes: string[];
  /** Optional tabbed guide (e.g. which drain / which heater). */
  guide?: { title: [string, string]; lead: string; tabs: { key: string; label: string; icon: string; text: string; tip?: string }[] };
  why: { icon: string; title: string; text: string }[];
  process: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[]; // service slugs
  ctaTitle: string;
  /** true = auto-built starter page (no entry below yet). Builders: add a full entry and this goes away. */
  basic?: boolean;
}

export const SERVICE_CONTENT: Record<string, ServiceContent> = {
  'drain-cleaning-st-petersburg-fl': {
    h1a: 'Drain cleaning in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Drains & sewer',
    lead: 'A slow sink, a shower that will not empty or a main line that keeps backing up: we clear it and check why it happened. Book a visit, or call the 24/7 line when it cannot wait.',
    introTitle: ['Fast drain cleaning,', 'when you need it.'],
    intro: [
      'When a drain stops, you want it fixed now. That can mean a next-day appointment or an emergency call in the middle of the night. We do both, for homes and businesses across Pinellas County.',
      'Nobody wants to pay an arm and a leg to get a drain cleaned. We keep our drain rates competitive and start with a free estimate, so you know the price before we begin.',
    ],
    includes: ['Scheduled appointments', 'Emergency after-hours calls, 24/7', 'Competitive drain cleaning rates', 'Homes and businesses'],
    guide: {
      title: ['Which drain', 'needs cleaning?'],
      lead: 'Every drain in the building runs to one main line that connects to the city sewer. Pick the one giving you trouble.',
      tabs: [
        { key: 'toilets', label: 'Toilets', icon: 'toilet', text: 'A toilet can clog or overflow in seconds. We clear the blockage and look for the cause, so it does not come straight back.', tip: 'Only flush toilet paper. Wipes belong in the trash, even the ones labelled flushable.' },
        { key: 'kitchen', label: 'Kitchen sinks', icon: 'water', text: 'Grease, food and buildup are what stop a kitchen drain. We clean the line out so the sink empties the way it should.' },
        { key: 'bath', label: 'Bathroom sinks', icon: 'drop', text: 'A bathroom sink that drains slowly usually has a blockage building in the trap or the line behind it. We clear it before it stops completely.', tip: 'A hair trap over the drain catches most of it before it reaches the pipe.' },
        { key: 'shower', label: 'Showers & tubs', icon: 'drain', text: 'Hair, soap and residue are the usual causes of shower and tub clogs. We remove the blockage and get the water moving again.', tip: 'Drain covers in showers and tubs stop debris before it gets into the pipes.' },
        { key: 'floor', label: 'Floor drains', icon: 'pipe', text: 'Floor drains collect dirt and debris until they stop taking water. We clean them out and check that the line below is clear.', tip: 'Keeping the floor around the drain clean prevents most of the buildup.' },
        { key: 'sewer', label: 'Sewer lines', icon: 'sewer', text: 'When several drains back up together, the blockage is usually in the main line. We clean sewer lines too, and can put a camera down the pipe to see exactly what is in there.' },
      ],
    },
    why: [
      { icon: 'users', title: 'A professional team', text: 'Friendly plumbers with years of experience behind them. Every member of the team is licensed, bonded and insured.' },
      { icon: 'tag', title: 'Free estimates', text: 'A free, no-obligation estimate before work starts. For an emergency we can often estimate over the phone.' },
      { icon: 'camera', title: 'Camera inspection', text: 'When it is needed, a drain camera shows how serious the problem is and helps catch the next one early.' },
    ],
    process: [
      { title: 'Estimate', text: 'For non-emergency work we assess the job in full before we start, and you get the price up front.' },
      { title: 'Inspect', text: 'When it is needed we run a drain camera down the line to see the real problem.' },
      { title: 'Clean', text: 'We clear the blockage and get the drain flowing properly again.' },
      { title: 'Prevent', text: 'We point out anything likely to cause trouble later, before it costs you real money.' },
    ],
    faqs: [
      { q: 'Do you offer emergency drain cleaning?', a: 'Yes. Plumbing By Paul offers emergency after-hours service 24 hours a day, 7 days a week.' },
      { q: 'Do you provide free estimates?', a: 'Yes. For non-emergency drain cleaning, we provide a full assessment before starting work. Emergency estimates may be provided over the phone.' },
      { q: 'Can you clean sewer lines?', a: 'Yes. We handle sewer lines, floor drains, toilets, kitchen sinks, bathroom sinks, showers, and tubs.' },
      { q: 'Do you use drain camera inspections?', a: 'Yes. When needed, we use drain cameras to better understand the blockage and help prevent future issues.' },
      { q: 'What should I do about a clogged toilet or drain before you arrive?', a: 'A plunger is the safe first step. If that does not clear it, stop there and call us: we unclog it and make sure the same thing does not happen again any time soon.' },
    ],
    related: ['clogged-drain-repair-st-petersburg-fl', 'drain-camera-inspection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl'],
    ctaTitle: 'Drain backed up right now?',
  },

  'clogged-drain-repair-st-petersburg-fl': {
    h1a: 'Clogged drain repair in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Drains & sewer',
    lead: 'Water sitting in the sink, a tub that will not empty or a toilet that backs up: we clear the clog, find out what caused it and tell you how to keep it from coming back. Open 7 days, with a 24/7 line for backups.',
    introTitle: ['When the water', 'will not go down.'],
    intro: [
      'Clogs build up slowly. A sink that takes a little longer to empty is easy to ignore, but once water is still standing after several minutes, it is only going to get worse.',
      'Chemical drain cleaners often fail on a deeper blockage, and they can be hard on older pipes. We clear the whole drain line, not just the surface, with a drain snake or hydro-jetting where the job calls for it.',
      'Kitchens, bathrooms, laundry rooms and garage floor drains, in homes and businesses from Gulfport and Kenneth City up to Largo and Clearwater.',
    ],
    includes: ['Kitchen, bath and toilet clogs', 'Laundry, garage and floor drains', 'Drain snaking and hydro-jetting', 'Free estimate, 24/7 for backups'],
    guide: {
      title: ['What is your', 'drain doing?'],
      lead: 'Pick the one that sounds like yours. Each one points to a different cause, and a different fix.',
      tabs: [
        { key: 'slow', label: 'Slow drain', icon: 'drain', text: 'A slow drain usually means buildup is forming inside the pipe. Hair, soap, grease or food scraps narrow the line until it stops completely. Clearing it early is the easier fix.', tip: 'A hair trap over bathroom sink and tub drains catches most of it before it gets into the pipe.' },
        { key: 'standing', label: 'Standing water', icon: 'water', text: 'Water that sits in the sink or tub for several minutes means the line is nearly closed. We clear the blockage all the way through so the drain empties properly again.', tip: 'If a plunger does not shift it, skip the bottle of chemicals. The clog is deeper than they can reach.' },
        { key: 'smell', label: 'Bad smell', icon: 'drop', text: 'A sewer smell from a drain often comes from buildup rotting inside the line, or from a trap that has dried out in a shower or floor drain nobody uses. We find which one it is and fix it.', tip: 'Run water in guest bathrooms and unused floor drains now and then so the trap stays full.' },
        { key: 'several', label: 'Several drains at once', icon: 'sewer', text: 'When the toilet gurgles while the washer drains, or more than one fixture backs up together, the clog is usually in the main line. That is a sewer job, and a camera down the pipe shows what is in there.' },
        { key: 'kitchen', label: 'Kitchen sink', icon: 'disposal', text: 'Grease, food and soap scum harden in kitchen lines over time. We clear the full drain line, not just the trap under the sink, so it stays open.', tip: 'Let cooking grease cool and put it in the trash, never down the sink.' },
        { key: 'business', label: 'Business drains', icon: 'building', text: 'Restaurant grease lines, commercial restrooms and floor drains in shops and workshops. We work fast to keep your downtime short.' },
      ],
    },
    why: [
      { icon: 'wrench', title: 'The whole line, not the surface', text: 'We clear the full drain line, not just the top of the blockage, so the same clog does not come straight back.' },
      { icon: 'camera', title: 'We look instead of guessing', text: 'If a clog keeps returning, a drain camera shows whether it is roots, a broken pipe or buildup, so you pay for the right fix.' },
      { icon: 'tag', title: 'Price before we start', text: 'A free estimate before any work, an honest price and no hidden fees.' },
    ],
    process: [
      { title: 'Diagnose', text: 'We find where the blockage is and what it is likely made of, and give you the price before we start.' },
      { title: 'Clear', text: 'We clear the line with a drain snake, or hydro-jetting for heavy buildup, until the water runs freely.' },
      { title: 'Check', text: 'If the clog keeps coming back, we run a camera down the line to look for roots, cracks or a sagging pipe.' },
      { title: 'Prevent', text: 'We tell you what caused it and the simple habits that stop it from happening again.' },
    ],
    faqs: [
      { q: 'When should I call a plumber for a clogged drain?', a: 'If water drains slowly, sits for several minutes, smells bad or backs up regularly, call before it gets worse. Acting early prevents bigger repairs.' },
      { q: 'Are chemical drain cleaners safe to use?', a: 'Chemical cleaners often do not solve a deeper blockage, and they can damage pipes over time. For a clog that keeps coming back, a professional look is safer and works better.' },
      { q: 'Why do my drains clog again a few weeks after I clear them?', a: 'Usually because the clog was pushed through rather than removed, or because something in the line keeps catching debris: a root, a crack or a low spot in the pipe. Older St. Petersburg homes often still have cast-iron drains, which get rough inside as they age. A camera inspection shows which it is.' },
      { q: 'Can you help with sewer drain backups?', a: 'Yes. We inspect and fix larger sewer drain problems too, including backups that affect several drains across the whole property.' },
      { q: 'Do you offer emergency drain service?', a: 'Yes. The team is available 24/7 for urgent problems, including clogged drains and sewer backups, anywhere in Pinellas County.' },
      { q: 'Do you clear drains for businesses?', a: 'Yes. We clear restaurant grease lines, commercial restrooms, floor drains and utility drains, and we work fast to keep your downtime short.' },
    ],
    related: ['drain-cleaning-st-petersburg-fl', 'drain-camera-inspection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl'],
    ctaTitle: 'Water not going down?',
  },

  'drain-camera-inspection-st-petersburg-fl': {
    h1a: 'Drain camera inspection in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Drains & sewer',
    lead: 'See the problem before anyone digs. We send a small waterproof camera down the line, find the real cause of the clog or damage, and explain what we found in plain words.',
    introTitle: ['See inside your pipes,', 'without tearing them out.'],
    intro: [
      'Plumbing can be a messy job, but finding the problem does not have to be. We lower a small waterproof video camera on a flexible cable into the drain or sewer line and look at the inside of the pipe on a screen.',
      'Instead of guessing, we see exactly where a blockage, root or crack is. That means no unnecessary digging, a repair aimed at the right spot, and fewer repeat visits.',
      'It is worth doing for clogs that keep coming back, slow drains with no clear cause, suspected sewer trouble, older plumbing, or before a big repair.',
    ],
    includes: ['HD camera view inside the line', 'No unnecessary digging', 'A clear explanation of what we found', 'Homes and businesses'],
    guide: {
      title: ['What can a', 'camera find?'],
      lead: 'A camera inspection finds problems deep inside the pipe without opening the line first. These are the things it shows most often.',
      tabs: [
        { key: 'blockages', label: 'Blockages', icon: 'drain', text: 'Clogs, grease and buildup that sit further down the line than a plunger can reach. We see exactly where the blockage is and what it is made of before we clear it.' },
        { key: 'roots', label: 'Tree roots', icon: 'sewer', text: 'Roots find their way into sewer lines through small joints and cracks, then grow into a mat that catches everything. Older neighbourhoods with big shade trees see this a lot.', tip: 'Roots that come back after clearing usually mean a damaged joint. The camera shows where it is.' },
        { key: 'damage', label: 'Pipe damage', icon: 'pipe', text: 'Cracks, breaks, corrosion and sections that have sagged and hold water. Older cast-iron lines are especially prone to it as they age.' },
        { key: 'early', label: 'Early warnings', icon: 'shield', text: 'Small problems that are not causing trouble yet, such as early buildup or a joint starting to separate. Catching them now costs far less than an emergency later.' },
      ],
    },
    why: [
      { icon: 'camera', title: 'A clear view of the pipe', text: 'We see inside your plumbing and find the source of the problem quickly, instead of guessing.' },
      { icon: 'wrench', title: 'The right repair', text: 'Once we know exactly what is happening, we recommend the fix that solves it, and only that.' },
      { icon: 'shield', title: 'Fewer repeat calls', text: 'Finding the deeper issue early stops the same problem from bringing us back next month.' },
    ],
    process: [
      { title: 'Access', text: 'We open the line at a cleanout or fixture and set up the camera equipment.' },
      { title: 'Inspect', text: 'The waterproof camera goes into the pipe so we can see the inside of the line.' },
      { title: 'Diagnose', text: 'We identify blockages, buildup, roots, damage or anything else that will cause trouble.' },
      { title: 'Recommend', text: 'You get a clear explanation and the next step for repair or prevention, with the price first.' },
    ],
    faqs: [
      { q: 'Is a drain camera inspection invasive?', a: 'No. The camera goes into your plumbing through the existing line, so we can inspect the pipes without digging or tearing anything apart.' },
      { q: 'When should I schedule a camera inspection?', a: 'It helps with clogs that keep coming back, slow drains, suspected sewer problems, older plumbing systems, and before any major repair.' },
      { q: 'Can it help prevent future plumbing problems?', a: 'Yes. Seeing what is happening deep inside the pipes shows problems early, before they turn into expensive emergencies.' },
      { q: 'Will you explain what you found?', a: 'Yes. We tell you what the camera showed in plain words, what it means, and what we recommend for repair or prevention.' },
      { q: 'Why would an older St. Petersburg home need one?', a: 'Many older homes in St. Pete, in neighbourhoods like Old Northeast and Kenwood, still have their original cast-iron drain lines. Cast iron corrodes and roughens on the inside as it ages, so clogs can come from the pipe itself. A camera shows its condition before you choose between cleaning, repair or replacement.' },
      { q: 'Do you offer emergency service?', a: 'Yes. Plumbing By Paul offers 24/7 emergency service, so you can call any time you have a plumbing emergency.' },
    ],
    related: ['sewer-line-service-st-petersburg-fl', 'drain-cleaning-st-petersburg-fl', 'clogged-drain-repair-st-petersburg-fl'],
    ctaTitle: 'Want to know what is really in there?',
  },

  'sewer-line-service-st-petersburg-fl': {
    h1a: 'Sewer line service in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Drains & sewer',
    lead: 'Backups, slow main lines, roots and broken pipes. We assess the problem, explain whether it needs cleaning, repair or replacement, and fix it. The line is answered 24/7 for sewer emergencies.',
    introTitle: ['Your sewer line', 'works every day.'],
    intro: [
      'Most owners never think about the sewer line until it backs up. Every drain in your home or business runs to one main line under the property, and that line connects to the city sewer.',
      'If something goes wrong on your side of the property line, the repair is usually the owner\'s job. We give advice, assessments, repairs, replacements and emergency sewer service for homes and businesses across Pinellas County.',
    ],
    includes: ['Sewer line repair', 'Sewer line replacement', 'Root and blockage removal', 'Free assessment, 24/7 emergencies'],
    guide: {
      title: ['What sewer issue', 'do you have?'],
      lead: 'Pick the one that matches what you are seeing. A camera inspection usually confirms it before any work starts.',
      tabs: [
        { key: 'broken', label: 'Broken pipe', icon: 'pipe', text: 'A broken sewer pipe causes drainage trouble and can damage the property. We inspect the line, find the break and recommend the right repair.' },
        { key: 'corrosion', label: 'Corrosion', icon: 'sewer', text: 'Older cast-iron sewer lines corrode from the inside, which narrows the pipe and makes it catch debris. We tell you whether a repair will hold or the section needs replacing.' },
        { key: 'blockage', label: 'Blockage', icon: 'drain', text: 'Grease, wipes and buildup can close a main line, and then every drain in the building backs up. We clear the line and find out what caused it.', tip: 'Only toilet paper goes down the toilet. Wipes labelled flushable still catch in sewer lines.' },
        { key: 'belly', label: 'Bellied pipe', icon: 'water', text: 'A belly is a section of pipe that has sunk and holds water and waste, so it clogs again and again. The lasting fix is replacing that section.' },
        { key: 'roots', label: 'Tree roots', icon: 'wrench', text: 'Roots get into sewer lines through joints and cracks and grow into a mat that stops the flow. We remove them and look at the damage they came in through.' },
        { key: 'replace', label: 'Replacement', icon: 'shield', text: 'When a line is too old or damaged to repair, we replace it. We explain the options first and work to keep the job practical for you.' },
      ],
    },
    why: [
      { icon: 'users', title: 'An experienced crew', text: 'Our plumbers have worked in the local industry for years, and every one of them is licensed, bonded and insured.' },
      { icon: 'tag', title: 'Competitive rates', text: 'Quality sewer work at competitive prices for homeowners and businesses, with a free assessment first.' },
      { icon: 'clock', title: 'Emergency support', text: 'Sewer trouble does not wait for office hours. The team is ready to help at any time of day or night.' },
    ],
    process: [
      { title: 'Assess', text: 'We look at the sewer problem and find the cause, with a camera when it is needed.' },
      { title: 'Recommend', text: 'We explain whether cleaning, root removal, repair or replacement is the right option, and what it costs.' },
      { title: 'Repair', text: 'We do the sewer work with care, and clean up after ourselves.' },
      { title: 'Support', text: 'If the line needs replacing, we lay out practical options and stay with you through the job.' },
    ],
    faqs: [
      { q: 'Am I responsible for the sewer line on my property?', a: 'In many cases, yes. Property owners are usually responsible for the sewer line inside their property line, so if something goes wrong there, the repair cost falls on the owner.' },
      { q: 'What are the signs of a sewer line problem?', a: 'Several drains backing up at once, a toilet that gurgles, water coming up in the shower or tub when you flush, a sewage smell inside or outside, or soggy patches in the yard. Any of these is worth a call.' },
      { q: 'Can you repair and replace sewer lines?', a: 'Yes. We handle sewer repair, blockage removal, root removal, corrosion repair, bellied pipe replacement and full sewer line replacement.' },
      { q: 'Why do older St. Pete homes have more sewer trouble?', a: 'Many homes in older St. Petersburg neighbourhoods still have their original cast-iron sewer pipes. Cast iron corrodes from the inside, and older joints let tree roots in, especially under big shade trees. A camera inspection shows the condition of your line.' },
      { q: 'Do you offer emergency sewer services?', a: 'Yes. We provide emergency plumbing and sewer service, 24/7, when an urgent problem happens suddenly.' },
      { q: 'Do you provide assessments?', a: 'Yes. If you are not sure what your sewer system needs, we assess it and explain your options before any work begins.' },
    ],
    related: ['drain-camera-inspection-st-petersburg-fl', 'drain-cleaning-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    ctaTitle: 'Sewage backing up?',
  },

  'repiping-st-petersburg-fl': {
    h1a: 'Repiping in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Pipes, leaks & gas',
    lead: 'Low pressure, leaks that keep coming back or rusty water usually mean the pipes are worn out. We inspect the system, give you a clear quote and timeline, and replace one section or the whole house.',
    introTitle: ['Built right,', 'made to last.'],
    intro: [
      'Your plumbing works behind the scenes every day. Replaced at the right time, new pipes end the cycle of leak repairs, improve water flow and serve the property for years.',
      'Pinellas water is hard, and scale and corrosion are tough on older pipes. Many older homes around St. Petersburg still have galvanized steel supply lines, which rust and narrow from the inside. We inspect what you have before we recommend anything.',
      'We also design plumbing systems for new builds and renovations, for homes and commercial properties, around the structure, the budget and how the building is used.',
    ],
    includes: ['Whole-home and partial repipes', 'Inspection before any work', 'Upfront quote and timeline', 'Plumbing design for new builds'],
    guide: {
      title: ['Do you need', 'new pipes?'],
      lead: 'Pick the sign that best matches what you are noticing at your property.',
      tabs: [
        { key: 'pressure', label: 'Low water pressure', icon: 'water', text: 'If the pressure varies, or has dropped slowly over the years, the pipes may be corroded, scaled up or partly blocked. We check whether it is one fixture or the whole system.', tip: 'If it is only one tap, unscrew and rinse the aerator first. Mineral buildup there is common with hard water.' },
        { key: 'leaks', label: 'Leaks keep coming back', icon: 'drop', text: 'One leak is a repair. Leak after leak in different places usually means the whole run of pipe is wearing out, and patching it costs more over time.' },
        { key: 'colour', label: 'Rusty or odd-tasting water', icon: 'filter', text: 'Brown, yellow or metallic-tasting water, especially first thing in the morning, can point to old pipes corroding from the inside.' },
        { key: 'age', label: 'An older system', icon: 'calendar', text: 'Galvanized steel supply lines, and the grey polybutylene pipe used in many Florida homes in the 1980s and early 1990s, are near or past the end of their life. If your plumbing keeps needing repairs, it is worth an inspection.' },
      ],
    },
    why: [
      { icon: 'wrench', title: 'Inspected first', text: 'We review the whole system for pressure, leak and corrosion problems, and explain what needs replacing before we suggest a repipe.' },
      { icon: 'tag', title: 'A clear quote and timeline', text: 'You get the price and a realistic project timeline before any work begins.' },
      { icon: 'building', title: 'Homes and businesses', text: 'From one bathroom to a full commercial system, designed around the property and its daily use.' },
    ],
    process: [
      { title: 'Inspect', text: 'We review the current plumbing and find pressure, leak, corrosion or performance problems.' },
      { title: 'Recommend', text: 'We explain what needs repairing or replacing, and the best option for your property.' },
      { title: 'Quote', text: 'You get a clear quote and a realistic project timeline before any work begins.' },
      { title: 'Complete', text: 'Our team does the work with care, cleans up, and walks you through what was done.' },
    ],
    faqs: [
      { q: 'How do I know if my pipes need replacing?', a: 'Common signs are lower water pressure, frequent leaks, changes in the colour or taste of the water, and an older plumbing system that keeps needing repairs.' },
      { q: 'Do I have to repipe the whole house?', a: 'Not always. Sometimes one section is failing and the rest is sound. We inspect first and tell you which parts need replacing.' },
      { q: 'Does hard water damage pipes in Pinellas County?', a: 'Over time it can. Hard water leaves calcium and magnesium scale inside pipes, fixtures and water heaters, which slowly cuts the flow. In old galvanized pipe, scale and rust together can close the pipe down a lot. A water softener helps protect new pipes once they are in.' },
      { q: 'Will I get a quote before the work starts?', a: 'Yes. After inspecting the system, we give you a quote and a timeline, so you know what to expect before the project begins.' },
      { q: 'Do you work with both homes and businesses?', a: 'Yes. We provide plumbing design and repiping for both residential and commercial properties.' },
      { q: 'Can you design plumbing for a new property?', a: 'Yes. We design plumbing systems for new properties with different needs, budgets and layouts.' },
    ],
    related: ['leak-detection-st-petersburg-fl', 'water-softeners-filtration-st-petersburg-fl', 'commercial-plumbing-st-petersburg-fl'],
    ctaTitle: 'Tired of patching the same pipes?',
  },

  'leak-detection-st-petersburg-fl': {
    h1a: 'Leak detection in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Pipes, leaks & gas',
    lead: 'A water bill that jumped, a damp patch, or the sound of running water with every tap off. We find the leak and fix it, and repair burst pipes fast, with a 24/7 line for when water is coming through.',
    introTitle: ['Find the leak,', 'fix it once.'],
    intro: [
      'Even a small drip wastes a lot of water over a year, and a hidden leak can soak walls, floors and cabinets long before you see it. Leaks do not fix themselves. They get worse and more expensive with time.',
      'Most Pinellas homes are built on a concrete slab, so water lines often run under the floor or inside the walls. We work out where the water is actually going, then make the repair in the right place.',
      'We also sort out water pressure problems, from one weak tap to a whole house with poor flow.',
    ],
    includes: ['Hidden leaks found and repaired', 'Burst pipe emergency repair', 'Water pressure problems', '24/7 emergency line'],
    guide: {
      title: ['What are you', 'noticing?'],
      lead: 'Leaks show up in different ways. Pick the one you are seeing.',
      tabs: [
        { key: 'bill', label: 'High water bill', icon: 'tag', text: 'A bill that jumps with no change in how you use water often means a hidden leak. If the water meter moves while every tap and appliance is off, that confirms it.', tip: 'Read the meter, wait an hour without using any water, then read it again. If the number moved, call us.' },
        { key: 'damp', label: 'Damp patch or stain', icon: 'drop', text: 'Stains on ceilings or walls, bubbling paint or warped floors mean water is getting where it should not. We find the source, which is not always right above the stain.' },
        { key: 'sound', label: 'Running water sound', icon: 'water', text: 'Hearing water run when nothing is on, or finding a warm spot on a tiled floor, can mean a leak in a line under the slab. Call before it damages the floor.' },
        { key: 'burst', label: 'Burst pipe', icon: 'alert', text: 'Water coming through fast needs action now. Shut off the main valve and call the 24/7 line. We repair the pipe and check the rest of the run.', tip: 'The main shutoff is outside, near the water meter. Turn it clockwise until it stops.' },
        { key: 'pressure', label: 'Low pressure', icon: 'pipe', text: 'Weak pressure can come from scale in the pipes, sediment in the water heater, a pinched or partly blocked line, or a leak along the way. We find which one it is.' },
      ],
    },
    why: [
      { icon: 'drop', title: 'We find the real source', text: 'Water travels along pipes and framing before it shows. We trace it back so the repair is made where the leak actually is.' },
      { icon: 'alert', title: 'Fast on burst pipes', text: 'Quick action prevents serious damage to walls and flooring. The emergency line is answered 24/7.' },
      { icon: 'shield', title: 'Backed for a year', text: 'Our leak repairs carry a 1-year workmanship warranty. If something we fixed goes wrong, we come back.' },
    ],
    process: [
      { title: 'Stop the damage', text: 'For a burst pipe, we talk you through shutting off the water while the team is on the way.' },
      { title: 'Find the leak', text: 'We work out where the water is coming from and give you the price before we open anything up.' },
      { title: 'Repair', text: 'We fix the leak or replace the damaged section of pipe.' },
      { title: 'Check', text: 'We run the water and check the repair and the pressure before we leave.' },
    ],
    faqs: [
      { q: 'How do I know if I have a hidden leak?', a: 'Common signs are a higher water bill, a water meter that moves when nothing is running, damp or stained walls and ceilings, a musty smell, or the sound of running water. If you notice any of them, call us for a look.' },
      { q: 'What should I do if a pipe bursts?', a: 'Shut off the main water valve (outside, near the water meter, turned clockwise), keep away from any water near outlets or the electrical panel, then call the 24/7 line. We talk you through the first steps while the team is on the way.' },
      { q: 'What is a slab leak?', a: 'Most homes in Pinellas County sit on a concrete slab, and some water lines run underneath it. A leak there can show up as a warm spot on the floor, cracked tile, damp carpet or a high water bill. It needs to be found before the floor is opened.' },
      { q: 'One of my taps has very low pressure. What could cause it?', a: 'Often it is the aerator, the small screen at the tip of the faucet, clogged with mineral deposits. Unscrew it, rinse it and put it back. If that does not fix it, there may be a leak or a blockage along the pipe, and we can find it.' },
      { q: 'Why is my shower pressure so weak?', a: 'It can be hard-water buildup in the pipes, sediment in the water heater, or a water line that is pinched or partly blocked. Pinellas County has hard water, so scale is common here. We find the cause and fix it.' },
      { q: 'Does salt air affect plumbing near the beaches?', a: 'It can. Salt air speeds up corrosion on exposed metal, such as outdoor hose bibs, valves and pipes on the outside of the house. In beach towns like St. Pete Beach, Treasure Island and Madeira Beach, it is worth checking outdoor plumbing now and then.' },
    ],
    related: ['repiping-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl'],
    ctaTitle: 'Water where it should not be?',
  },

  'gas-line-services-st-petersburg-fl': {
    h1a: 'Gas line services in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Pipes, leaks & gas',
    lead: 'Gas leak detection and repair, new gas lines and appliance hookups, done carefully and checked for leaks before we leave. If you smell gas right now, get everyone outside first, then call for help from there.',
    introTitle: ['Gas work, done', 'safely and correctly.'],
    intro: [
      'Gas line work takes precision and experience. We take it seriously, because your safety comes before anything else on the job.',
      'Adding a gas range, dryer or water heater, worried about a leak, or need a line checked? We install, repair and inspect gas lines for homes and businesses across Pinellas County.',
      'Near the Gulf and the bay, salt air speeds up corrosion on exposed metal, including outdoor gas piping. That is one more reason to have older lines looked at.',
    ],
    includes: ['Gas leak detection and repair', 'New gas line installation', 'Gas appliance hookups', 'Gas line safety inspections'],
    guide: {
      title: ['What do', 'you need?'],
      lead: 'Most gas jobs fall into one of these. If you smell gas, start with the first one.',
      tabs: [
        { key: 'smell', label: 'I smell gas', icon: 'alert', text: 'Do not switch lights or appliances on or off, and do not use a lighter or a match. Get everyone out of the building, then call your gas company or 911 from outside. Once it is safe, we find the leak and repair the line.', tip: 'Natural gas has a smell added to it, often described as rotten eggs, so that a leak gets noticed.' },
        { key: 'appliance', label: 'New gas appliance', icon: 'flame', text: 'Gas ranges, dryers, water heaters and other appliances need a correct, tight connection. We hook them up and check every connection for leaks.' },
        { key: 'line', label: 'New gas line', icon: 'pipe', text: 'Adding a line for a remodel or a new appliance? We plan the route and install the new gas line.' },
        { key: 'inspect', label: 'Safety inspection', icon: 'shield', text: 'Older lines, a home you just bought, or a line you are not sure about. We inspect it and tell you plainly what we found.' },
      ],
    },
    why: [
      { icon: 'shield', title: 'Care at every step', text: 'Gas work is not rushed. Every member of the team is licensed, bonded and insured.' },
      { icon: 'truck', title: 'Prepared for the job', text: 'The truck arrives with the tools and fittings loaded, so the work gets done without a second trip.' },
      { icon: 'tag', title: 'Price before work', text: 'A free estimate first, and no hidden fees.' },
    ],
    process: [
      { title: 'Assess', text: 'We look at the line or the appliance and give you the price before we start.' },
      { title: 'Make safe', text: 'If there is a leak, the gas is shut off at the right point before any work begins.' },
      { title: 'Install or repair', text: 'We repair the line, run the new pipe or connect the appliance.' },
      { title: 'Test', text: 'We check the connections for leaks before we leave.' },
    ],
    faqs: [
      { q: 'What should I do if I smell gas?', a: 'Leave the building with everyone in it. Do not switch anything electrical on or off and do not light anything. From outside, call your gas company or 911. Once it is safe, call us to find and repair the leak.' },
      { q: 'Can you hook up a new gas stove or dryer?', a: 'Yes. We connect gas ranges, dryers, water heaters and other gas appliances, and check the connection for leaks before we leave.' },
      { q: 'Do you install new gas lines?', a: 'Yes. We install new gas lines for homes and businesses, for example for a remodel or a new appliance.' },
      { q: 'Do you repair gas leaks?', a: 'Yes. We find gas leaks, repair the line and test it before the gas is used again.' },
      { q: 'Can I do gas work myself?', a: 'We do not recommend it. Gas work needs the right fittings and testing, and a small mistake can be dangerous. Leave it to a professional.' },
      { q: 'Does salt air affect outdoor gas lines?', a: 'It can. Salt air near the Gulf and the bay speeds up corrosion on exposed metal, including gas piping on the outside of a house. If your outdoor lines look rusty, have them inspected.' },
    ],
    related: ['water-heater-repair-st-petersburg-fl', 'leak-detection-st-petersburg-fl', 'commercial-plumbing-st-petersburg-fl'],
    ctaTitle: 'Adding a gas appliance?',
  },

  'water-heater-repair-st-petersburg-fl': {
    h1a: 'Water heater repair in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Hot water & fixtures',
    lead: 'No hot water, rusty water or a puddle under the tank. We repair tank and tankless water heaters, replace them when it is time, and keep them running with maintenance. 24/7 for water heater failures.',
    introTitle: ['Your hot water', 'experts.'],
    intro: [
      'You have a lot on your mind, and the water heater should not be one more thing. From maintenance to repair and replacement, we keep it running so you are never suddenly without hot water.',
      'We always try to repair first. If the unit is past its expected life, keeps needing repairs, or the repair costs more than the unit is worth, we recommend a replacement and explain why.',
      'Pinellas water is hard, and those minerals settle as sediment at the bottom of the tank. Sediment causes popping noises, slower heating and a shorter tank life. Regular flushing helps.',
    ],
    includes: ['Tank, tankless and hybrid', 'All major brands serviced', 'Repair tried before replacement', 'Free estimate, 24/7 for no hot water'],
    guide: {
      title: ['Repair, replace', 'or maintain?'],
      lead: 'Pick one to see what is involved and when it makes sense.',
      tabs: [
        { key: 'maintain', label: 'Maintenance', icon: 'calendar', text: 'Once or twice a year we flush out sediment, inspect the anode rod, test the pressure relief valve and check the age and condition of the unit. A small check now saves a big repair later.', tip: 'Just moved in? The heater\'s age is coded in the serial number on its label. Call and we will help you read it.' },
        { key: 'repair', label: 'Repair', icon: 'wrench', text: 'Sediment buildup, thermostats, heating elements, pilot lights and ignition problems, and leaks. We fix the problem in front of us and look for what caused it.' },
        { key: 'install', label: 'Installation', icon: 'heater', text: 'Tank, tankless or hybrid. We help you pick the right type for your household and budget, handle the permits and code requirements, remove the old unit and walk you through the new one.' },
        { key: 'types', label: 'Tank or tankless?', icon: 'water', text: 'A tank heater stores and heats water and costs less up front. A tankless unit heats water on demand, costs more to install and usually lasts longer. A hybrid pairs a heat pump with a tank for high efficiency. We help you weigh them up.' },
        { key: 'signs', label: 'Signs it is time', icon: 'alert', text: 'An older unit, rusty or smelly hot water, popping or rumbling noises, or water pooling around the base. Pooling water needs attention right away.' },
      ],
    },
    why: [
      { icon: 'wrench', title: 'Repair before replace', text: 'We try every sensible repair before recommending a new unit, and tell you honestly when a repair is not worth it.' },
      { icon: 'heater', title: 'Every type and brand', text: 'Gas and electric, tank, tankless and hybrid, from all the major brands.' },
      { icon: 'clock', title: 'No hot water at night?', text: 'A failed water heater is an emergency we answer 24/7.' },
    ],
    process: [
      { title: 'Call or request', text: 'Call or send the form. We are open 7 days a week, for scheduled work or emergencies.' },
      { title: 'Free assessment', text: 'We inspect the current unit and give you a clear, upfront estimate.' },
      { title: 'Repair or install', text: 'We try the repair first. If a replacement is needed, we help you choose the right unit.' },
      { title: 'Backed by warranty', text: 'Our work carries a 1-year workmanship warranty, so you are covered after we leave.' },
    ],
    faqs: [
      { q: 'How do I know how old my water heater is?', a: 'The age is coded in the serial number on the unit\'s label. Give us a call and we can read it for you during a free inspection.' },
      { q: 'Should I repair or replace my water heater?', a: 'We always try to repair first. If the unit is past its expected life, repairs are becoming frequent, or a repair costs more than the unit is worth, we recommend a replacement and explain why.' },
      { q: 'Why is my water heater making popping noises?', a: 'Usually it is sediment. Hard Pinellas water leaves minerals that settle at the bottom of the tank, and water trapped under them pops as it heats. Flushing the tank often helps. In an older unit, it can be a sign the heater is near the end of its life.' },
      { q: 'Do you offer emergency water heater service?', a: 'Yes. We offer 24/7 emergency service, because no one should be without hot water for long. Call (727) 709-2552 at any time.' },
      { q: 'What brands of water heaters do you install?', a: 'We work with all the major brands. During your free estimate we recommend the best option for your budget, household size and energy goals.' },
      { q: 'How long does a water heater installation take?', a: 'Most standard tank replacements take two to three hours. Tankless installs can take longer, depending on the gas or electrical work needed. We give you a time estimate before we begin.' },
    ],
    related: ['water-softeners-filtration-st-petersburg-fl', 'gas-line-services-st-petersburg-fl', 'leak-detection-st-petersburg-fl'],
    ctaTitle: 'No hot water?',
  },

  'toilet-repair-st-petersburg-fl': {
    h1a: 'Toilet repair in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Hot water & fixtures',
    lead: 'Clogged, leaking, running nonstop or overflowing: we fix the toilet, check whether it points to a bigger problem, and install new toilets when it is time. The line is answered 24/7 for overflows.',
    introTitle: ['Toilet trouble,', 'fixed fast.'],
    intro: [
      'A leaking or clogged toilet is not something anyone can ignore for long. If yours is overflowing or will not stop running, just give us a call.',
      'Toilet problems sometimes point to something bigger in the main sewer line, especially clogs that keep coming back. So we fix the toilet in front of us and check whether it is part of a larger issue.',
      'We also replace and install toilets, including low-flow models that use less water with every flush, and take the old one away.',
    ],
    includes: ['Clogs, leaks and running toilets', 'Flush and fill valve repairs', 'New toilet installation', 'Free estimate, 24/7 for overflows'],
    guide: {
      title: ['What is your toilet', 'doing?'],
      lead: 'Pick the one that matches. Some are a quick fix, some point further down the line.',
      tabs: [
        { key: 'clogged', label: 'Clogged', icon: 'toilet', text: 'A clog that will not clear makes the toilet unusable and can lead to an overflow. We clear the blockage and check for anything deeper.', tip: 'A flange plunger seals better in a toilet than a flat cup plunger. Firm, steady pressure works better than force.' },
        { key: 'leaking', label: 'Leaking', icon: 'drop', text: 'Water around the base, a leaking tank or a dripping supply connection. Leaks damage bathroom floors, so we find the cause, often a worn seal or a faulty connection, and fix it.' },
        { key: 'running', label: 'Running', icon: 'water', text: 'A toilet that runs nonstop wastes water and raises the bill. It is usually the flapper, fill valve or float, and many of these are fixed in one visit.', tip: 'Adjusting the float in the tank can stop a running toilet. If it keeps coming back, the fill valve or float needs replacing.' },
        { key: 'overflow', label: 'Overflowing', icon: 'alert', text: 'Turn the shutoff valve behind the toilet clockwise to stop the water, do not flush again, then call. We clear the blockage and find out why it happened.', tip: 'Every toilet has its own shutoff valve on the wall behind it, near the floor.' },
        { key: 'sewer', label: 'Gurgling or backing up', icon: 'sewer', text: 'If the toilet gurgles when other drains run, or water comes up in the tub when you flush, the problem is likely in the main line. We can check it with a drain camera.' },
      ],
    },
    why: [
      { icon: 'alert', title: 'Emergency repairs', text: 'If the toilet is overflowing or backing up, we can help quickly, day or night.' },
      { icon: 'wrench', title: 'One-visit fixes', text: 'Many leaking tank and running toilet problems are assessed and fixed in a single visit.' },
      { icon: 'tag', title: 'Free estimate', text: 'Call or email to set up an appointment and get a free estimate before any work.' },
    ],
    process: [
      { title: 'Assess', text: 'We look at the toilet and work out whether the problem is on its own or part of something bigger.' },
      { title: 'Repair', text: 'We fix clogs, leaks, running toilets and other toilet problems, or fit a new toilet.' },
      { title: 'Inspect', text: 'When it is needed, we use a drain camera to check the pipe further down.' },
      { title: 'Prevent', text: 'We tell you what caused it, so you can avoid bigger repairs later.' },
    ],
    faqs: [
      { q: 'When should I call a plumber for a toilet problem?', a: 'Call when the toilet will not stop running, keeps clogging, leaks, overflows, or does not respond to the basic fixes.' },
      { q: 'Can a toilet problem mean a bigger plumbing issue?', a: 'Yes. Some toilet problems are connected to deeper plumbing or sewer line issues, especially when clogs keep coming back.' },
      { q: 'Why does my toilet clog so easily?', a: 'Often there is a partial blockage in the drain that grows with each flush. Too much toilet paper, or wipes and other absorbent items, are common causes. It can also be a water flow or venting problem. We assess it and find the best fix.' },
      { q: 'What should I do if the toilet will not stop running?', a: 'The water level in the tank is set by a float. Adjusting it often stops the running. If it keeps happening, the fill valve or float needs replacing, and we can do that quickly.' },
      { q: 'What are the benefits of a low-flow toilet?', a: 'Using less water with every flush saves water and lowers your bill. Modern low-flow toilets work just as well as older models. We can help you choose and install the right one.' },
      { q: 'Do you offer emergency toilet repair?', a: 'Yes. If you have a toilet emergency, you can call Plumbing By Paul 24/7 for help.' },
    ],
    related: ['clogged-drain-repair-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'garbage-disposal-repair-st-petersburg-fl'],
    ctaTitle: 'Toilet overflowing?',
  },

  'garbage-disposal-repair-st-petersburg-fl': {
    h1a: 'Garbage disposal repair in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Hot water & fixtures',
    lead: 'Jammed, humming, leaking or completely dead. We repair garbage disposals, replace worn-out units and install new ones, and help you choose the right unit for your kitchen.',
    introTitle: ['A cleaner kitchen,', 'better flow.'],
    intro: [
      'A disposal does more than sit in the drain. It breaks food scraps down before they can clog the kitchen line, and it keeps food waste out of the trash.',
      'Whether you already have one or want one fitted, we install, maintain and repair sink disposal units. With proper care, many disposals work for around 5 to 10 years.',
      'Opening up a disposal yourself can be dangerous. Turn it off at the switch and call us instead.',
    ],
    includes: ['New disposal installation', 'Jams, leaks and dead units', 'Advice on the right unit', 'Licensed, bonded and insured'],
    guide: {
      title: ['What is your disposal', 'doing?'],
      lead: 'Pick the one that matches and see what we do about it.',
      tabs: [
        { key: 'install', label: 'Need a new one', icon: 'disposal', text: 'No disposal yet, or the old one is finished? We recommend the right unit for your kitchen and budget, install it safely and take the old one away.' },
        { key: 'jam', label: 'Jammed or humming', icon: 'alert', text: 'A hum with no grinding usually means something is stuck. We clear the jam, check the motor and get it turning again.', tip: 'Never put your hand into a disposal. Turn it off at the switch first, every time.' },
        { key: 'leak', label: 'Leaking', icon: 'drop', text: 'Water under the sink can come from the sink flange, the drain connection or the unit itself. We find which one, then repair or replace.' },
        { key: 'noise', label: 'Strange noises', icon: 'wrench', text: 'Grinding, rattling or clanking can be something caught inside, or worn parts. We check it before it does more damage.' },
        { key: 'care', label: 'Looking after it', icon: 'check', text: 'Run cold water while it grinds, and keep grease, bones and stringy peels out of it. A little care helps it last its full life.', tip: 'Grease belongs in the trash once it has cooled, not in the disposal.' },
      ],
    },
    why: [
      { icon: 'shield', title: 'Safe repairs', text: 'Disposals mix water, electricity and blades. Our licensed, bonded and insured team repairs and installs them safely.' },
      { icon: 'tag', title: 'Honest advice', text: 'If a repair is worth it, we repair. If the unit is done, we help you pick a replacement that fits your kitchen and budget.' },
      { icon: 'drain', title: 'Fewer kitchen clogs', text: 'A disposal that grinds properly breaks food down before it can block the kitchen drain.' },
    ],
    process: [
      { title: 'Assess', text: 'We check your sink setup or the existing disposal to see what is needed.' },
      { title: 'Recommend', text: 'We advise on the best unit or repair for your kitchen and budget, with the price first.' },
      { title: 'Service', text: 'We install, repair or maintain the disposal safely.' },
      { title: 'Protect', text: 'We show you how to keep it working and cut down on future kitchen drain problems.' },
    ],
    faqs: [
      { q: 'Can you install a new garbage disposal?', a: 'Yes. We install sink disposal units and can advise you on the best unit for your kitchen.' },
      { q: 'Can you repair a clogged or leaking disposal?', a: 'Yes. We repair clogged, leaking, noisy or broken disposal units.' },
      { q: 'Why does my disposal hum but not spin?', a: 'Usually something is jammed between the grinding plate and the housing, or the motor has tripped. Turn it off at the switch and do not reach inside. We can clear it safely and check the motor.' },
      { q: 'What should not go down a garbage disposal?', a: 'Grease and oil, bones, fruit pits and stringy peels such as celery or corn husks. They jam the unit or harden in the drain line. Run cold water while it grinds.' },
      { q: 'Should I try to repair it myself?', a: 'It is safer to call a professional. Disposal units can be dangerous when they are opened or handled the wrong way.' },
      { q: 'How long does a garbage disposal last?', a: 'With proper maintenance and repair, many garbage disposal units work for around 5 to 10 years.' },
    ],
    related: ['clogged-drain-repair-st-petersburg-fl', 'drain-cleaning-st-petersburg-fl', 'toilet-repair-st-petersburg-fl'],
    ctaTitle: 'Disposal jammed or leaking?',
  },

  'water-softeners-filtration-st-petersburg-fl': {
    h1a: 'Water softeners and filtration in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Hot water & fixtures',
    lead: 'Pinellas water is hard. Scale builds up in pipes, water heaters and faucets, and leaves spots on glasses. We install and maintain water softeners, whole-home filters and drinking water filters.',
    introTitle: ['Softer water,', 'longer-lasting pipes.'],
    intro: [
      'Much of the water in our region comes from the Floridan Aquifer, which runs through limestone. That gives the water plenty of calcium and magnesium, and those minerals are what make it hard.',
      'Hard water leaves scale inside pipes, water heaters, dishwashers and faucets. Over time it cuts water pressure and shortens the life of appliances, and you feel it on your skin and hair too. A water softener protects the whole system.',
      'We install and maintain water softeners, whole-home filtration systems and under-sink drinking water filters, and help you choose what your home actually needs.',
    ],
    includes: ['Water softener installation', 'Whole-home filtration', 'Under-sink drinking water filters', 'Service and maintenance'],
    guide: {
      title: ['Which system', 'fits your home?'],
      lead: 'Softeners and filters do different jobs. Here is the short version of each.',
      tabs: [
        { key: 'softener', label: 'Water softener', icon: 'filter', text: 'Removes the calcium and magnesium that cause scale. It protects the pipes, the water heater and appliances, and stops the white crust on faucets and shower heads.' },
        { key: 'whole', label: 'Whole-home filter', icon: 'water', text: 'Filters all the water coming into the house, for every tap and shower. A good choice if taste, smell or sediment bother you everywhere, not just at the kitchen sink.' },
        { key: 'drinking', label: 'Drinking water filter', icon: 'drop', text: 'A compact filter under the kitchen sink for cleaner water to drink and cook with, without treating the whole house.' },
        { key: 'signs', label: 'Signs of hard water', icon: 'check', text: 'White crust on faucets and shower heads, spots on glasses, soap that will not lather, a noisy water heater and pressure that slowly gets weaker.', tip: 'Soak a crusted faucet aerator in white vinegar overnight to dissolve the buildup.' },
      ],
    },
    why: [
      { icon: 'filter', title: 'Made for Pinellas water', text: 'We know the local water and the scale, corrosion and pressure problems it causes in pipes and appliances.' },
      { icon: 'wrench', title: 'Installed and maintained', text: 'We fit the system and keep it serviced, so it keeps doing its job year after year.' },
      { icon: 'tag', title: 'Free estimate', text: 'We recommend what your home needs, and you see the price before any work begins.' },
    ],
    process: [
      { title: 'Talk it through', text: 'Tell us what bothers you: spots, scale, taste, smell or weak pressure.' },
      { title: 'Recommend', text: 'We suggest the right system for the house and the budget, with a free estimate.' },
      { title: 'Install', text: 'We fit the softener or filter and connect it to your plumbing.' },
      { title: 'Maintain', text: 'We service the system so it keeps protecting your pipes and appliances.' },
    ],
    faqs: [
      { q: 'Is the water hard in St. Petersburg?', a: 'Yes. Water across Pinellas County is hard, because much of the region\'s supply comes from the Floridan Aquifer, which runs through limestone and picks up calcium and magnesium.' },
      { q: 'What does a water softener do?', a: 'It removes the minerals that make water hard, before the water reaches your pipes and fixtures. That stops new scale from forming in pipes, the water heater and appliances.' },
      { q: 'What is the difference between a softener and a filter?', a: 'A softener removes the hardness minerals that cause scale. A filter removes things that affect taste, smell or clarity. Some homes want one, some want both, and we help you decide.' },
      { q: 'Can hard water lower my water pressure?', a: 'Yes. Scale builds up inside pipes and fixtures over time and narrows them. A water softener can improve pressure over time and protects the pipes from more buildup.' },
      { q: 'Does hard water shorten the life of a water heater?', a: 'It can. The minerals settle as sediment in the tank, which makes the heater work harder. A softener, plus regular flushing, helps it last.' },
      { q: 'Do you install drinking water filters?', a: 'Yes. We install under-sink and drinking water filters, as well as whole-home filtration systems.' },
    ],
    related: ['water-heater-repair-st-petersburg-fl', 'repiping-st-petersburg-fl', 'leak-detection-st-petersburg-fl'],
    ctaTitle: 'Tired of scale and spots?',
  },

  'emergency-plumber-st-petersburg-fl': {
    h1a: '24/7 emergency plumber in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Emergency & commercial',
    lead: 'Burst pipe, sewer backup, overflowing toilet or no hot water. Call (727) 709-2552 at any hour. We arrive ready to work, without delays or missing tools.',
    introTitle: ['Fast, prepared,', 'always available.'],
    intro: [
      'Plumbing problems do not keep office hours. The emergency line is answered 24 hours a day, 7 days a week, for homes and businesses across Pinellas County, from Tarpon Springs down to St. Pete Beach.',
      'We arrive fully prepared, with the tools and parts loaded, so we can start on the problem straight away. While the team is on the way, we talk you through the first steps to limit the damage.',
    ],
    includes: ['Answered 24/7, every day', 'Burst pipes and leaks', 'Sewer and drain backups', 'Water heater failures'],
    guide: {
      title: ['What is', 'happening?'],
      lead: 'Pick your emergency to see what to do in the next few minutes. Then call.',
      tabs: [
        { key: 'leak', label: 'Leak', icon: 'drop', text: 'Leaks damage walls and floors quickly. Close the valve to the fixture, or the main valve if you cannot find it, and call straight away.', tip: 'The main shutoff is outside, near your water meter. Turn it clockwise until it stops.' },
        { key: 'burst', label: 'Burst pipe', icon: 'alert', text: 'Shut off the main water valve right away, keep away from any water near outlets or the electrical panel, and call the 24/7 line.', tip: 'Make sure everyone in the house knows where the main shutoff is before an emergency happens.' },
        { key: 'sewer', label: 'Sewer backup', icon: 'sewer', text: 'Stop using water in the house, because every drain feeds the same line. Keep away from the sewage and call. Sewer problems get worse quickly.' },
        { key: 'drain', label: 'Drain blockage', icon: 'drain', text: 'Stop running water into the blocked drain so it cannot overflow, and call. A blocked drain can lead to flooding and damage.' },
        { key: 'toilet', label: 'Toilet overflow', icon: 'toilet', text: 'Turn the valve behind the toilet clockwise to stop the water. Do not flush again. Then call.' },
        { key: 'heater', label: 'No hot water', icon: 'heater', text: 'If the heater is leaking, turn off its power or gas and close the cold water valve on top, then call. A failed water heater is a 24/7 call for us.' },
      ],
    },
    why: [
      { icon: 'phone', title: 'Answered 24/7', text: 'The emergency line is answered day and night, every day of the year.' },
      { icon: 'truck', title: 'Arrives prepared', text: 'The team arrives ready to handle the problem immediately, without delays or missing tools.' },
      { icon: 'message', title: 'Help on the phone', text: 'We walk you through the immediate steps while the team is on the way to you.' },
    ],
    process: [
      { title: 'Call', text: 'Call (727) 709-2552 at any hour. Tell us what is happening and where.' },
      { title: 'Make it safe', text: 'We talk you through shutting off the water and staying clear of anything electrical.' },
      { title: 'Fix', text: 'The crew arrives with the truck stocked and stops the problem.' },
      { title: 'Follow up', text: 'We explain what failed and anything that still needs doing, with the price first.' },
    ],
    faqs: [
      { q: 'Do you really answer at night and on weekends?', a: 'Yes. The emergency line is answered 24 hours a day, 7 days a week, including nights, weekends and holidays.' },
      { q: 'What counts as a plumbing emergency?', a: 'Anything that is flooding, backing up or unsafe: burst pipes, major leaks, sewer backups, overflowing toilets, and a water heater that is leaking or has failed. If you are not sure, call and ask.' },
      { q: 'What should I do first in a plumbing emergency?', a: 'Shut off the main water valve, stay away from any water near outlets or the electrical panel, and call us. We talk you through the next steps while the team is on the way.' },
      { q: 'Where is my main water shutoff?', a: 'It is outside, near your water meter. Turn it clockwise until it stops to cut the water to the whole house. Some water stays in the pipes, but it clears as you use it.' },
      { q: 'Can you give me an estimate on the phone?', a: 'For an emergency we can often give you an estimate over the phone, so you know what to expect before the team arrives.' },
      { q: 'What if I smell gas?', a: 'Get everyone out of the building, do not switch anything on or off, and call your gas company or 911 from outside. Once it is safe, we can find and repair the leak.' },
      { q: 'Do you cover the whole county for emergencies?', a: 'Yes. We are based in St. Petersburg and take emergency calls across Pinellas County, including Clearwater, Seminole, Largo, Pinellas Park and the beach towns.' },
    ],
    related: ['leak-detection-st-petersburg-fl', 'sewer-line-service-st-petersburg-fl', 'water-heater-repair-st-petersburg-fl'],
    ctaTitle: 'Emergency right now?',
  },

  'commercial-plumbing-st-petersburg-fl': {
    h1a: 'Commercial plumbing in', h1b: 'St. Petersburg, FL',
    eyebrow: 'Emergency & commercial',
    lead: 'Repairs, drains and installations for shops, offices, restaurants and job sites. We respond fast to keep your business running and your downtime short.',
    introTitle: ['Keep your business', 'flowing.'],
    intro: [
      'When the plumbing stops at a business, so does the work. We respond quickly and aim to fix the problem with as little disruption to your customers and staff as we can.',
      'We handle commercial drain clogs, restaurant grease lines, restrooms, water heaters, main line water service, repiping and new construction, for owners, property managers, builders and contractors across Pinellas County.',
    ],
    includes: ['Repairs and installations', 'Commercial drains and grease lines', 'Plumbing design and repiping', 'New construction projects'],
    guide: {
      title: ['What does your', 'business need?'],
      lead: 'Pick the kind of job. Small fixes and big projects get the same care.',
      tabs: [
        { key: 'repairs', label: 'Repairs', icon: 'wrench', text: 'Leaks, broken fixtures, water heater problems and main line water service repairs. Small jobs and big ones.' },
        { key: 'drains', label: 'Drains & grease lines', icon: 'drain', text: 'Restaurant grease lines, commercial restrooms, floor drains and utility drains. We clear them, and use a drain camera when a line keeps blocking.', tip: 'Grease poured down the sink hardens in the line. Scrape plates into the trash before washing.' },
        { key: 'design', label: 'Design & repiping', icon: 'pipe', text: 'Plumbing systems designed around the building and its daily demand, and repiping for properties whose pipes are wearing out.' },
        { key: 'build', label: 'New construction', icon: 'building', text: 'Plumbing for new construction and renovation projects, for owners, builders and contractors.' },
        { key: 'hours', label: 'After hours', icon: 'clock', text: 'A burst pipe or a backup does not wait for opening time. The 24/7 emergency line covers businesses too.' },
      ],
    },
    why: [
      { icon: 'clock', title: 'Short downtime', text: 'Fast response and practical fixes, so the disruption to your business stays small.' },
      { icon: 'shield', title: 'Fully credentialed', text: 'Every member of the team is licensed, bonded and insured, on your site and around your customers.' },
      { icon: 'users', title: 'One crew for it all', text: 'Drains, water heaters, gas lines, repiping and new installations, from one local team.' },
    ],
    process: [
      { title: 'Tell us about the site', text: 'What is wrong, how urgent it is, and when work causes the least disruption.' },
      { title: 'Assess and quote', text: 'We look at the job and give you a clear price before work begins.' },
      { title: 'Do the work', text: 'Our team completes the job with care and leaves the site clean.' },
      { title: 'Stay on call', text: 'We are one phone call away for the next job, day or night.' },
    ],
    faqs: [
      { q: 'Do you work on commercial properties?', a: 'Yes. We provide plumbing for homes and businesses, including shops, offices, restaurants and job sites across Pinellas County.' },
      { q: 'Can you clear restaurant grease lines?', a: 'Yes. We clear restaurant grease lines and commercial kitchen drains, and can run a drain camera down a line that keeps blocking.' },
      { q: 'Do you take on new construction projects?', a: 'Yes. We handle plumbing for new construction and renovations, including plumbing system design, for owners, builders and contractors.' },
      { q: 'Can you work outside business hours?', a: 'Emergency calls are answered 24/7. For planned work, tell us when it would disrupt your business least and we will do our best to fit it in.' },
      { q: 'Are your plumbers licensed and insured?', a: 'Yes. Every member of the team is fully licensed, bonded and insured.' },
      { q: 'Which areas do you cover?', a: 'All of Pinellas County. Our shop is in St. Petersburg, and we work in Clearwater, Largo, Pinellas Park, Seminole and the rest of the county.' },
    ],
    related: ['drain-cleaning-st-petersburg-fl', 'repiping-st-petersburg-fl', 'emergency-plumber-st-petersburg-fl'],
    ctaTitle: 'Plumbing holding up your business?',
  },
};

export const hasServicePage = (slug: string) => slug in SERVICE_CONTENT;

// Starter content for a service that has no full entry yet, built only from facts already in services.ts and site.ts.
// It keeps every service URL alive on the preview. Replace it by adding a real entry above (see AGENT-BRIEF.md).
import { SERVICES, FAMILIES, type Service } from './services';
import { PROCESS, FAQS } from './site';
export function contentFor(s: Service): ServiceContent {
  const full = SERVICE_CONTENT[s.slug];
  if (full) return full;
  const lower = s.name.charAt(0) === '2' ? 'emergency plumbing' : s.name.toLowerCase();
  return {
    basic: true,
    h1a: `${s.name} in`, h1b: 'St. Petersburg, FL',
    eyebrow: FAMILIES[s.family].name,
    lead: `${s.blurb} Family-owned Plumbing By Paul covers St. Petersburg and all of Pinellas County, 7 days a week, with a 24/7 emergency line.`,
    introTitle: ['Done right,', 'the first trip.'],
    intro: [
      `${s.blurb} We work on homes and businesses across Pinellas County.`,
      'Our services start with a free estimate, so you know the price before any work begins. The truck arrives prepared for the job: no second trips, no excuses.',
    ],
    includes: ['Free estimate before work starts', 'Open 7 days, 24/7 emergency line', 'Licensed, bonded and insured team', '1-year workmanship warranty'],
    why: [
      { icon: 'phone', title: 'Direct line to the owner', text: 'No middlemen and no phone trees. You get Paul\'s personal commitment to the job, start to finish.' },
      { icon: 'truck', title: 'Prepared for the job', text: 'We show up with the tools and parts loaded, every time, so the work gets done in one visit.' },
      { icon: 'shield', title: 'Backed for a year', text: `Our ${lower} work carries a 1-year workmanship warranty. If something goes wrong, we come back and fix it.` },
    ],
    process: [...PROCESS],
    faqs: FAQS.slice(0, 5).map((f) => ({ ...f })),
    related: SERVICES.filter((x) => x.family === s.family && x.slug !== s.slug).slice(0, 3).map((x) => x.slug),
    ctaTitle: 'Need it fixed today?',
  };
}
