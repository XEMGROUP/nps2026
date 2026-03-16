# Design Guide: Theme Callout Card

A reference for replicating the two-column callout card used between the stats ribbon and the Focus Areas section on the NPS 2026 website.

---

## What This Card Is

A horizontal split card used to spotlight a single key piece of information — in this instance, the summit theme and date. It pairs a **text-heavy left column** (label, headline, supporting copy) with a **compact visual anchor** on the right (the navy date block). The contrast between the white card and the muted blue-gray section background gives it clear visual lift without using drop shadows aggressively.

---

## Visual Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│                                          ┌──────────────────┐│
│  LABEL (mono, uppercase, green)          │  Save the Date   ││
│                                          │                  ││
│  Headline text                           │      July        ││
│  spanning one or two lines               │      15–17       ││
│                                          │   2026 · Abuja   ││
│  Supporting paragraph body copy          └──────────────────┘│
│  goes here, one to three sentences.                          │
└──────────────────────────────────────────────────────────────┘
```

On mobile (below `lg` breakpoint) the two columns stack vertically: text on top, the navy block underneath.

---

## Section Wrapper

The card sits inside a section with a muted blue-gray background to lift the white card off the page.

```jsx
<section className="py-16 bg-[#F0F7FF]">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    {/* Card goes here */}
  </div>
</section>
```

| Property | Value | Notes |
|---|---|---|
| Section background | `#F0F7FF` | Muted blue-gray — not pure white, not dark |
| Section vertical padding | `py-16` (64px) | Slightly shorter than a full section (`py-24`) |
| Max container width | `max-w-7xl` (1280px) | Centered with auto margins |
| Horizontal padding | `px-4` mobile · `px-6` desktop | |

---

## Card Container

```jsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-80px" }}
  className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5E7EB] shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-8 lg:items-center"
>
```

| Property | Value | Notes |
|---|---|---|
| Background | `bg-white` | White — contrasts against `#F0F7FF` section |
| Border radius | `rounded-3xl` (24px) | Large, soft corners — key to the premium feel |
| Padding | `p-8` (32px) mobile · `p-12` (48px) desktop | More breathing room on larger screens |
| Border | `1px solid #E5E7EB` | Subtle gray — present but not distracting |
| Shadow | `shadow-xl shadow-black/5` | Large shadow at 5% black opacity — very soft |
| Layout | `flex flex-col` mobile · `lg:flex-row` desktop | Stacks then goes side-by-side |
| Gap | `gap-8` (32px) | Space between left and right columns |
| Alignment | `lg:items-center` | Vertically centers columns on desktop |

**Animation:** The card fades in and rises 40px using `framer-motion` `whileInView`. It triggers once when the card enters the viewport (80px before its top edge).

```js
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
```

---

## Left Column — Text Content

The left column takes all remaining horizontal space (`flex-1`).

```jsx
<div className="flex-1">
  <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#016633] mb-4">
    Your Label Here
  </p>
  <h3 className="text-3xl md:text-4xl font-black text-[#02004C] tracking-tighter leading-tight mb-4">
    Your headline goes here,<br />
    spanning one or two lines.
  </h3>
  <p className="text-[#787878] text-lg font-medium leading-relaxed">
    Supporting body copy. One to three sentences. Expands on the headline
    without repeating it. Keep it concrete and outcome-oriented.
  </p>
</div>
```

### Label (eyebrow text)

| Property | Value |
|---|---|
| Font | JetBrains Mono |
| Size | `text-xs` (12px) |
| Weight | `font-bold` (700) |
| Transform | `uppercase` |
| Letter spacing | `tracking-widest` (~0.2em) |
| Color | `#016633` (Primary Green) |
| Bottom margin | `mb-4` (16px) |

Use a very short phrase — 1–4 words — that categorises what the headline is about. Examples: `2026 Theme`, `Save the Date`, `Key Objective`.

### Headline

| Property | Value |
|---|---|
| Font | Montserrat |
| Size | `text-3xl` (30px) mobile · `text-4xl` (36px) desktop |
| Weight | `font-black` (900) |
| Color | `#02004C` (Navy) |
| Letter spacing | `tracking-tighter` (~-0.05em) |
| Line height | `leading-tight` (1.25) |
| Bottom margin | `mb-4` (16px) |

Keep to 8–12 words maximum. Can include a line break (`<br />`) for typographic control if the phrase has a natural pause.

### Body copy

| Property | Value |
|---|---|
| Font | Montserrat |
| Size | `text-lg` (18px) |
| Weight | `font-medium` (500) |
| Color | `#787878` (Muted gray) |
| Line height | `leading-relaxed` (1.625) |

---

## Right Column — Visual Anchor Block

A compact navy block that carries a key fact visually separate from the text. It shrinks to a fixed width on desktop and never squishes (`shrink-0`).

```jsx
<div className="lg:w-64 shrink-0">
  <div className="bg-[#02004C] rounded-2xl p-8 text-white text-center">
    <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
      Save the Date
    </p>
    <p className="font-black text-4xl text-[#016633] tracking-tighter mb-1">
      July
    </p>
    <p className="font-black text-6xl text-white tracking-tighter leading-none">
      15–17
    </p>
    <p className="font-mono text-sm text-white/60 mt-3 uppercase tracking-wider">
      2026 · Abuja
    </p>
  </div>
</div>
```

### Outer wrapper

| Property | Value | Notes |
|---|---|---|
| Width | `lg:w-64` (256px) on desktop | Full width on mobile |
| Flex shrink | `shrink-0` | Prevents the block from compressing |

### Inner navy block

| Property | Value |
|---|---|
| Background | `#02004C` (Navy) |
| Border radius | `rounded-2xl` (16px) — one step down from the outer card |
| Padding | `p-8` (32px) |
| Text alignment | `text-center` |

### Content inside the navy block

The block stacks four lines of text, each with a distinct typographic role:

| Line | Example | Font | Size | Weight | Color |
|---|---|---|---|---|---|
| Micro-label | "Save the Date" | JetBrains Mono | `text-xs` | bold | `white/50` (50% opacity white) |
| Category word | "July" | Montserrat | `text-4xl` | black (900) | `#016633` (Primary Green) |
| Hero number/fact | "15–17" | Montserrat | `text-6xl` | black (900) | `white` |
| Sub-label | "2026 · Abuja" | JetBrains Mono | `text-sm` | regular | `white/60` (60% opacity white) |

**The hero number (6xl) is the loudest element** — everything else supports it.

Spacing between lines:
- After micro-label: `mb-3`
- After category word: `mb-1`
- Before sub-label: `mt-3`

---

## How to Adapt This Card

### Change the label / theme
Replace the `<p>` eyebrow text and `<h3>` content. Keep the eyebrow very short.

### Change the navy block content
Swap the four lines for any fact/date/number combination. The structure is:
`micro-label → category → hero value → qualifier`

Example adaptations:

```
"Deadline"     →  "Applications"  →  "March 31"    →  "2026 · Lagos"
"Speakers"     →  "Confirmed"     →  "40+"          →  "Experts"
"Partnership"  →  "Tier"          →  "Platinum"     →  "Headline Sponsor"
```

### Remove the animation
Replace `<motion.div>` with a plain `<div>` and remove all `motion.*` props. The card works identically without Framer Motion.

### Use it without the right block
Drop the right column entirely and set the left column to `max-w-3xl` for a wider single-column callout. The card still works well — the white-on-muted-background contrast carries the visual weight.

### Dark variant
Swap the outer card background to `bg-[#02004C]` and update text colors:
- Label: `text-[#016633]`
- Headline: `text-white`
- Body: `text-white/70`
- Right block: `bg-white/10` with `text-white` content

---

## Dependencies

| Library | Usage |
|---|---|
| Tailwind CSS v4 | All utility classes |
| Framer Motion | `motion.div`, `whileInView`, `variants` |
| Google Fonts | `Montserrat` (weights 400–900), `JetBrains Mono` (weights 400–700) |

Font import (in your global CSS):

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

Tailwind font registration (in your global CSS theme):

```css
@theme inline {
  --font-sans: 'Montserrat', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Menlo', monospace;
}
```

---

## Full Copy-Paste Code

```jsx
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ThemeCalloutCard() {
  return (
    <section className="py-16 bg-[#F0F7FF]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-[#E5E7EB] shadow-xl shadow-black/5 flex flex-col lg:flex-row gap-8 lg:items-center"
        >
          {/* ── Left: text ─────────────────────────────── */}
          <div className="flex-1">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#016633] mb-4">
              Your Label Here
            </p>
            <h3 className="text-3xl md:text-4xl font-black text-[#02004C] tracking-tighter leading-tight mb-4">
              Your headline spans<br />one or two lines.
            </h3>
            <p className="text-[#787878] text-lg font-medium leading-relaxed">
              Supporting body copy. One to three sentences. Keep it concrete
              and outcome-oriented.
            </p>
          </div>

          {/* ── Right: navy anchor block ────────────────── */}
          <div className="lg:w-64 shrink-0">
            <div className="bg-[#02004C] rounded-2xl p-8 text-white text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-white/50 mb-3">
                Micro Label
              </p>
              <p className="font-black text-4xl text-[#016633] tracking-tighter mb-1">
                Category
              </p>
              <p className="font-black text-6xl text-white tracking-tighter leading-none">
                Hero
              </p>
              <p className="font-mono text-sm text-white/60 mt-3 uppercase tracking-wider">
                Qualifier · Detail
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

```

# PYTHON CODE 

```python
for i in range(50,1):
  if i % 2 == 0:
    print("even")
  else:
    print("odd")
```