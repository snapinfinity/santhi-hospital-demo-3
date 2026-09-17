# Santhi Hospital — homepage

A production-quality homepage for Santhi Hospital, built with Next.js 15 (App Router), React 19,
TypeScript and Tailwind CSS v4.

> **All content is fictional.** Every consultant, statistic, testimonial, address, telephone number
> and appointment slot is demonstration data invented for this prototype. Nothing here describes a
> real hospital.

## Running it

```bash
npm install
npm run dev
```

| Script              | Does                                               |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Development server on port 3000                     |
| `npm run build`     | Production build                                    |
| `npm start`         | Serve the production build                          |
| `npm run lint`      | ESLint (`next/core-web-vitals`, `next/typescript`)  |
| `npm run typecheck` | `tsc --noEmit`                                      |

## Structure

```
app/            layout, page, design tokens, generated favicon
components/
  sections/     one file per homepage section
  ui/           logo, button, ribbon, reveal, stat, heading
  appointment/  the booking flow (provider, dialog, entry button)
data/           typed demo content — departments, doctors, services, …
lib/            design tokens for motion, the icon map, helpers
hooks/          reduced-motion and mount helpers
public/images/  doctor portraits, care photography, Open Graph card
```

The page is a server component. Four things opt into the client: the header (menu + scroll state),
the department index, the doctor roster (filtering), and the booking flow.

## Design decisions worth knowing

**Colour.** The palette follows the colours on santhihospital.com — a bright turquoise-green
(`#1cba9f`) and a deep navy (`#223a66`) on a cool white ground — declared once in `app/globals.css`
under `@theme`; no component carries a raw hex value. Contrast governs where each colour may appear:
the turquoise only reaches 2.5:1 on white, so `#0b7d6a` (the same hue, darkened to 5.1:1) carries
buttons and text, `#1cba9f` is decorative on light grounds and carries text only on navy, and
`#e0353c` is limited to emergency indicators.

**Imagery is the hospital's own.** The hero, the About frame and the featured article use
photographs from santhihospital.com — the campus gate with the mobile ICU, the dialysis unit and
the diagnostics laboratory — cropped and re-encoded into `public/images/santhi/`. They are demo
assets; the site only borrows the colours and photographs, never the layout.

**Portraits are art-directed, not just collected.** The twelve consultant portraits come from
several different shoots, with backdrops ranging from strong red to magenta to outdoors — which
would have fought the palette. A saturation-weighted pass collapses heavily
saturated backdrops toward neutral while leaving skin tones alone, so mixed sources read as one
commissioned set. Mean saturation across the set went from 0.06–0.51 to 0.07–0.19.

**Nobody is misrepresented.** The consultants are invented and the portraits are stock placeholders,
so alt text says exactly that — "Portrait used to represent Dr X… Demonstration image" — rather than
asserting the person pictured is the person named.

**The doctor roster is a single-row carousel.** The rail is a native horizontal scroller with
mandatory snap points — touch swiping, trackpad scrolling and keyboard focus all work without a
library — and the arrow buttons page it by however many whole cards are visible: four on a
desktop, three on a laptop, two on a tablet, one and a peek on a phone. A progress track mirrors
the rail and the arrows disable at either end. Filtering by department replaces the rail.

**Icons carry hierarchy, not decoration.** One set (lucide) at one stroke weight, mapped centrally in
`lib/icons.ts`. They appear where they speed up scanning — department lists, service indexes, contact
details — and never beside prose. All 96 are `aria-hidden` because each sits next to a text label.

**The hero is a full-bleed photograph.** The copy sits directly on the campus picture under two
scrims: a horizontal sweep that is near-solid navy behind the headline and thins to almost nothing
over the building, and a fade along the foot for the cards. Below `lg` the copy runs longer than
the viewport, so the picture becomes a band across the top that dissolves into the navy ground.

**No eyebrow labels.** A tracked-out all-caps caption above every heading is template chrome; the
headings say what each section is. `SectionHeading` still accepts a `kicker` for the rare line that
carries information a heading cannot.

## Motion

Motion follows the project's `motion-foundations` / `motion-patterns` conventions: `motion/react`
only, all durations, easings and springs imported from `lib/motion-tokens.ts`, transforms and
opacity only, `viewport={{ once: true }}` on reveals, and `prefers-reduced-motion` honoured
throughout.

Motion is weighted toward what a person just did — filtering the roster, opening a department,
stepping through booking, expanding an answer — rather than blanket scroll reveals, which read as
generated when every section fades up. Three sections reveal on scroll; the hero entrance is a CSS
keyframe so it plays on first paint without waiting for hydration.

Two deliberate departures, both for robustness:

- **Booking steps and the department panel animate in on mount rather than through
  `AnimatePresence mode="wait"`.** With `mode="wait"` the next step cannot render until the previous
  one has finished animating out, so anywhere animation frames are throttled the visitor is stranded
  mid-booking. Progressing through a form must never depend on an animation completing.
- **The FAQ accordion animates in CSS.** Collapsing a panel means animating `height`, which the
  motion system keeps out of `animate`; a scale fallback would leave closed panels occupying space.

## Accessibility

Radix drives the dialog and accordion semantics — focus trap, Escape, scroll lock, `role="dialog"`,
`aria-expanded`, arrow-key navigation. On top of that: a skip link, one `h1` with a logical heading
order, `aria-invalid` and `role="alert"` on form errors with focus moved to the first invalid field,
a `role="status"` confirmation, 44px filter and navigation targets, and a visible focus ring that
inverts on dark sections.

## Verified

`npm run lint`, `npm run typecheck` and `npm run build` all pass. The production build was loaded in
a browser with **no console errors and no hydration warnings**. Checked: no horizontal overflow and
no doctor card outside the viewport at 375, 768 or 1440px; the roster filter (12 → 1 → 12) and the
progressive reveal; booking driven end to end from a doctor card on mobile with the doctor
preselected; 19 images all with alt text; no broken anchors; no unnamed controls.

Animated *transitions* were verified by DOM state rather than by eye — the harness browser pane
suspends animation frames — so the fades and slides are worth a glance on a real screen.
