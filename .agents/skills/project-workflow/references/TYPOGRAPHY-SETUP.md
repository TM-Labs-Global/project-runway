---
name: typography-setup
description: Per-project method for adapting typography (typography.css + the font loading in app/layout.tsx) to a project's Figma type styles. Covers font families, the type scale, letter-spacing gaps, per-element assignment, and the ask-before-loading-fonts rule.
---

# Typography Setup (per project)

Typography spans **two files** — unlike colors, you cannot do it in one:
- **`shared/styles/typography.css`** — font-family tokens, the size/weight/line-height scale, base element rules, utility classes.
- **`app/layout.tsx`** — where the actual fonts are LOADED and exposed as CSS variables.

Three parts to rework: **font families**, **the type scale** (your Figma values), and **assignment** (which font drives which element).

## 1. Font families — loading lives in `layout.tsx`, and you MUST ask how
The correct chain is: **`layout.tsx` loads a font → exposes a CSS variable → `typography.css` points `--font-*` at that variable → components use the `--font-*` token only** (never the raw font name).
```
layout.tsx:   const display = localFont({ ..., variable: '--font-display-face' })
typography:   --font-display: var(--font-display-face);
component:    className="font-display"
```
- **Ask before wiring the loading.** Each font loads either locally (`next/font/local`), from Google, or another server — that's the user's call, not a default. Never silently self-host and never silently add a remote `<link>`.
- **Align the two files.** Templates often have a disconnect (e.g. `typography.css` names one font while `layout.tsx` loads another). Reworking families means making `--font-*` reference exactly what `layout.tsx` actually loads, and stripping any leftover placeholder/remote font tags the project isn't using.

## 2. The type scale — your Figma values (update + add, never delete)
The `--text-*`, `--weight-*`, `--leading-*` tokens are per-project Figma type styles.
- **Update** existing token values to your Figma scale.
- **Expect to ADD larger steps.** The base template scale typically stops around `--text-5xl` (48px); real hero/display headings need more (projects have added `4xl-5`, `6xl`, `7xl`, `8xl`, `8xl-5`, `9xl` up to ~200px). Add what your scale defines.
- **Never delete** an existing size token — only update or add.

## 3. Letter-spacing is a genuine gap — add it (flag first)
Figma type styles include letter-spacing, but the base template usually has **no letter-spacing tokens at all**. Reworking typography means *adding* a `--tracking-*` group (e.g. `--tracking-tight`, `--tracking-normal`, `--tracking-wide`) plus matching utility classes. Adding a new token group needs a heads-up per the "ask before inventing tokens" rule — but it's expected here, not optional, since the design system requires it.

## 4. Assignment — which font is used for which thing (the "semantic" layer)
Parallel to "this color is for this specific thing." Decide and wire, in the base element rules + utility classes:
- Headings (`h1`–`h6`) → usually `--font-display`.
- Body / `p` → usually `--font-sans`.
- Any font reserved for one specific use (a display face used only for heroes) → its own utility class, applied deliberately.
Wire these through the `--font-*`/`--text-*` tokens — never raw font names or px in JSX.

## 5. Display-font kerning (only if the user flags it — not a default)
Most fonts are fine. If the user reports a specific display font crowding/overlapping at large sizes, the known starting fix (apply to the affected large headings):
```
[font-kerning:none] [font-variant-ligatures:none] [font-feature-settings:'liga'_0,'kern'_0]
```
```css
font-kerning: none; font-variant-ligatures: none; font-feature-settings: 'liga' 0, 'kern' 0;
```
Do NOT apply automatically — only when a font actually exhibits the issue.

## What to collect from the user before reworking
1. **Fonts + how each loads** (display = X self-hosted; body = Y Google; etc.).
2. **The Figma type scale** — sizes, weights, line-heights, letter-spacing.
3. **Assignment** — which font for headings, body, and any single-purpose font.

## Verification
Confirm `--font-*` tokens resolve to actual loaded fonts (not a fallback), no remote font `<link>` remains unless the user chose remote loading, and the `/design-system` typography section renders the updated scale.
