# Plumbing By Paul: brand ("Sunshine City")

One idea: **a friendly local crew from the Sunshine City, and the day gets better when they arrive.**
St. Petersburg is "The Sunshine City", the trucks are bright and carry a cartoon mascot, and the business signs
off "with heart". So the brand is warm, sunny and coastal, not dark, technical or corporate.

It is deliberately the opposite of the two things it must not look like:

| | Old Paul Figma v2 | United Plumbing | This brand |
|---|---|---|---|
| Colour | navy + sky blue | night LED cobalt, cyan, yellow | deep Gulf teal, warm shell, coral |
| Type | Unbounded + Karla | Big Shoulders + IBM Plex + Doto | Tilt Warp + Rubik |
| Shape | angled hero | hard grid, digital dots | circles, arches, pills, a rising sun |
| Mood | generic trade | 24h emergency, electric | daylight, neighbourly, hand-painted sign |

## Palette

| Token | Hex | Use |
|---|---|---|
| `--deep` | `#06363D` | dark sections, header band, ink for buttons |
| `--deep-2` | `#0A4850` | cards on dark |
| `--deep-3` | `#042A30` | footer, deepest band |
| `--shell` | `#FBF5E9` | main light background |
| `--sand` | `#F2E7D3` | second light background |
| `--coral` | `#FF6B52` | the one action colour (buttons, the sun) |
| `--coral-deep` | `#B4301C` | coral words on light backgrounds |
| `--coral-soft` | `#FFE1D9` | soft tinted card |
| `--tide` | `#7ADBD0` | accent on dark, marquee band |
| `--teal` | `#0A6866` | icons and links on light |
| `--sun` | `#FFC247` | review stars, tiny highlights only |
| `--ink` | `#0B2B30` | text on light |
| `--ink-2` / `--ink-3` | `#3D5559` / `#4F6366` | secondary text on light |
| `--on-dark-2` | `#B9D3D1` | secondary text on dark |

### Contrast-checked pairs (WCAG 2.2 AA)

| Text | Background | Ratio | OK for |
|---|---|---|---|
| ink `#0B2B30` | shell `#FBF5E9` | 13.6 | all text |
| ink `#0B2B30` | coral `#FF6B52` | 5.33 | button labels (always ink on coral, never white) |
| shell `#FBF5E9` | deep `#06363D` | 12.1 | all text |
| coral `#FF6B52` | deep `#06363D` | 4.66 | headings and large text on dark |
| coral-deep `#B4301C` | shell `#FBF5E9` | 5.7 | coral words in headings and links on light |
| tide `#7ADBD0` | deep `#06363D` | 8.0 | eyebrows, accents on dark |
| teal `#0A6866` | shell `#FBF5E9` | 6.0 | icons, small links on light |
| ink-3 `#4F6366` | shell `#FBF5E9` | 5.9 | captions |
| on-dark-2 `#B9D3D1` | deep `#06363D` | 8.2 | body text on dark |

Rules: white text never sits on coral. Plain coral `#FF6B52` is never used for text on a light background
(use coral-deep). Sun yellow is never a text colour.

## Type

- **Display: Tilt Warp 400** (`@fontsource/tilt-warp`). A rounded, slightly warped sign-painter face. It echoes the
  chunky lettering on Paul's trucks, so the site and the trucks feel like one business. Used for H1 to H3, numbers,
  button labels and the wordmark. Line height 0.98, sentence case, never all caps in long lines.
- **Body: Rubik 400/500/600/700** (`@fontsource/rubik`). Soft corners that match the display face, very readable
  at 16 to 18 px.
- Eyebrows: Rubik 700, 12 to 13 px, wide tracking, capitals, always led by the small heart.
- Both are self-hosted woff2 in `public/fonts/` and preloaded in `Base.astro`. Neither font has been used on any
  earlier agency site.

## Motif: the sun

One shape does all the brand work.

- **Sunline divider** (`Sunline.astro`): a half-sun on the horizon between two sections, rays draw in as it rises.
- **Hero**: Paul stands in front of a coral sun with drawn rays. Service and town heroes put an arch photo on it.
- **Arch frames**: photos are cropped as arches (a sun at the top of a doorway), never plain rectangles with
  rounded corners everywhere.
- **Process**: a sun travels an arc across the section as you scroll and lights each step.
- **Intro**: a sunrise. The sun rises, then opens as a hole to reveal the page.
- **Page transition**: a coral circle grows from the click and closes.
- **Heart**: the small heart in eyebrows is the "with heart" sign-off. It is the only second glyph.
- Buttons are pills. Cards get a hard offset shadow (ink or coral), like a printed sticker, not a soft blur.

## Photo treatment

- Real photos first: Paul (cut-out on the sun), the crew with the trucks, the community event, Alycia.
  Natural colour, no filters, no duotone. The trucks' light blue already sits well with teal and coral.
- Stock photos (files named `stock-*`) only illustrate a type of job. They are **never** captioned or described
  as Paul's own work, and get plain descriptive alt text.
- A photo appears once per page.
- No AI-generated people.

## Voice

Plain, warm, short. A neighbour who happens to be a very good plumber.

- Say the problem in the customer's words ("no hot water", "a drain that keeps backing up").
- Short sentences. Verbs first on buttons ("Call", "Get a free estimate").
- No hype words, no "A+ rated", no awards that do not exist, no invented numbers.
- No em dashes in on-screen copy.
- Review quotes are used word for word, with `…` where shortened.

## Logo decision

**The truck mascot stays**, as a round badge with a coral ring, next to a new live-text wordmark
"Plumbing by Paul" set in Tilt Warp ("by Paul" in coral), with the line "St. Pete · Pinellas County".

Why: the mascot is on every truck in Pinellas, and people who saw a truck must recognise the website in one second.
What changes is everything around it: the old logo file had low-resolution lettering and a busy lockup, so the
lettering is replaced by crisp text and the mascot is cropped to its face (`src/assets/img/mascot-badge.png`).
A rotating round sticker ("Family owned · Plumbing with heart", `RingBadge.astro`) is the secondary mark.
The favicon and app icons are the mascot badge.

To confirm with Paul: that he owns the mascot artwork, and whether a vector original exists (the crop is taken
from a 1024 px PNG and is fine up to about 120 px on screen).
