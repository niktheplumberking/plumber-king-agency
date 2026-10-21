"use client";

import { CalendarCheck, MapPin, PhoneCall, Search, ShieldCheck } from "lucide-react";
import { HowItWorks, type HowPlace, type HowStep } from "../ui/how-it-works";
import { TrailLayer } from "../ui/svg-follow-scroll";
import { WalkingBobo } from "./WalkingBobo";

/**
 * Section 3, "From invisible to booked", rebuilt 2026-10-21 (Nick: the 21st.dev "How it works" component, same text
 * and topic, pink background, no notebook lines or grid). Five tilted cards in a zigzag tell the path from a search to a
 * booked job. Card heights are the component's own (0 / 120 / 450 / 570 / 850 px); card 01 keeps its place and 02-05
 * are moved off the straight columns. The scroll-drawn line starts at card 05's bottom-right corner (white here) and runs
 * on into the next section (pink there), see svg-follow-scroll.tsx.
 */
const steps: HowStep[] = [
  { word: "Found", icon: Search, title: "They search. You show up.", body: "“Emergency plumber near me.” Whether they ask Google or an AI assistant, your service pages and Google Business Profile put you in the answers." },
  { word: "Chosen", icon: MapPin, title: "You stand out from the list.", body: "Your Google profile looks like the pro in town: real photos, hours, services and reviews, so they pick you over the plumber next to you." },
  { word: "Trusted", icon: ShieldCheck, title: "They land. They trust you in seconds.", body: "Real photos of you and your trucks, your real reviews and what makes you different, right where a worried homeowner looks first." },
  { word: "Called", icon: PhoneCall, title: "They tap. Your phone rings.", body: "A call button under every thumb and a two-field quote form for the people who would rather type." },
  { word: "Booked", icon: CalendarCheck, title: "You call back first. The job is yours.", body: "Every call and quote request lands on your phone straight away, so you get the job before they call someone else." },
];

/* Places from Nick's marked screenshot (2026-10-21, 2560 px screen): 01 and 02 keep their height, 03 and 04 drop a
   little (03 also left, 04 also right), 05 keeps its X and drops. Left-hand cards lean right (+8), right-hand left (-8). */
const places: HowPlace[] = [
  { top: 0, k: -0.924, tilt: 8 },
  { top: 120, k: 1, tilt: -8 },
  { top: 533, k: -0.635, tilt: 8 },
  { top: 608, k: 0.661, tilt: -8 },
  { top: 970, k: -0.048, tilt: 8 },
];

export function StoryScroll() {
  return (
    <section className="relative isolate overflow-x-clip bg-sky pt-24 pb-40 md:pt-32 md:pb-48" aria-labelledby="story-h">
      <TrailLayer tone="white" />
      <WalkingBobo />
      <div className="container-x relative">
        <h2 id="story-h" className="display text-center text-t1">From invisible to <span className="accent story-booked">booked.</span></h2>
        <HowItWorks steps={steps} places={places} height={1330} className="mt-16 lg:mt-24" lastCardAttr="data-trail-start" />
      </div>
    </section>
  );
}
