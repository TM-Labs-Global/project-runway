---
name: color-setup
description: Per-project setup for shared/styles/colors.css — the PRIMITIVE color layer. Add the project's flat brand palette, keep the neutral grey + status scales. The intent mapping happens later, in SEMANTICS-SETUP.md (done after dimensions).
---

# Color Setup — Primitives (`colors.css`)

This is the **first** design-system step. It covers only `shared/styles/colors.css` — the raw color values. The mapping of these values to intents ("this color is used for X") happens later in **`SEMANTICS-SETUP.md`**, after typography and dimensions.

**Golden rule: a primitive does nothing on its own.** A raw color only affects the UI once a semantic token points at it. So here you just lay down the values; the wiring comes in the semantics step.

## Collect once at project start (used now + in semantics)
- **The palette** — each brand color and what it's used for (its role).
- **Theme** — light or dark (used in the semantics step, but good to know now).
- **Button/CTA colors** — captured separately from brand (they're decoupled; see SEMANTICS-SETUP).

Record the palette at the top of this file per project so it's the source of truth.

## Add the flat brand palette (don't invent shade ramps)
Most Figma handoffs are a flat palette (a few brand colors, no 25–950 ramps). Add them as one clearly-labeled block — never fabricate ramps you weren't given:
```css
/* ===== Project Brand Palette ===== */
--color-brand-primary:   #......;
--color-brand-secondary: #......;
--color-brand-tertiary:  #......;
--color-brand-ink:       #......;  /* darkest neutral — base text on light */
--color-brand-paper:     #......;  /* lightest neutral — page background */
```

## Keep these existing scales (they still matter)
- **Neutral grey scale** — a flat 2-neutral palette (ink + paper) doesn't contain the mid-greys a UI needs for borders, muted text, and disabled states. The neutral scale fills that genuine gap. Keep it.
- **Status scales** (success / warning / error / info) — these are *system* colors (green = success, red = error), not brand. Keep them; they are NOT remapped to brand colors.

## The template's placeholder brand scales
The template ships placeholder brand ramps (e.g. an indigo `--color-primary-*`, a teal `--color-secondary-*`, and a sun/navy/ocean set). After the semantics step repoints intents to your brand block, these become **orphaned** (referenced by nothing). Per the "never delete a token" rule, leave them in the file but flag them for optional cleanup — do not delete unprompted.

## Next step
Once colors are in (and after typography + dimensions), do **`SEMANTICS-SETUP.md`** to repoint the intent tokens at this brand block.
