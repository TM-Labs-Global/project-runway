---
name: adapting-generated-code
description: Reusable, project-agnostic rules for adapting externally-generated code into a Next.js/React/TypeScript project. Covers TWO distinct source types kept deliberately separate — (1) raw HTML/CSS/JS, and (2) Figma Make exports (Vite-based, with Figma Make attributes). Hand this to the coding agent at the start of any project.
---

# Adapting Generated Code Into the Project

## ⚠️ STEP 0 — Read the ENTIRE project template first (before any adaptation)
Before you adapt a single line — before you even look closely at the generated code — **read the whole project template: every folder, every file.** You cannot correctly fit anything into a codebase you haven't studied. Specifically, you must be able to point to:
- `shared/styles/` and how the 3-layer token flow works (colors → semantics → component CSS).
- How fonts are loaded (`app/layout.tsx`) and exposed as `--font-*` tokens.
- The feature-slice layout (`features/{name}/…`) and each `index.ts` barrel.
- Where globals are wired (`app/globals.css`, root layout).

If you cannot point to these, you are NOT ready to adapt — study the template first. This mirrors the project Workflow Order (read & study the template → explain it back → wait for approval). Do that before anything below. This step is placed at the top of this always-read document on purpose so it is never skipped.

---

> This is a **general, project-agnostic instruction set** — not tied to any one project. It tells the coding agent how to take code generated elsewhere and adapt it into the working project cleanly. Combine it with whatever project-specific skill/rules file exists for the current project (design tokens, fonts, colors, folder names, etc.); where this doc says "the project's tokens/fonts/breakpoints," look those up in that project's own rules, do not hardcode them from here.

The target project is a **Next.js + React + TypeScript** codebase using a design-token system and a feature-sliced architecture. Generated code is **never pasted in as-is** — it is always adapted to match the project's conventions so the result looks like it was written by someone already working in that codebase.

There are **TWO completely different kinds of generated code.** They come from different tools, carry different baggage, and need different cleanup. **Do not treat them as the same thing, and do not blur the two processes together.** This document keeps them in separate parts on purpose:

- **PART 1 — Raw HTML/CSS/JS** (plain vanilla web code, no framework).
- **PART 2 — Figma Make exports** (a Vite-based React project with Figma-Make-specific attributes and imports).

**Step 0 — before adapting anything, identify which type you're holding.** Use the detection guide below, pick the matching part, then apply the shared rules in PART 3 (which apply to BOTH). If you cannot tell which type it is, STOP and ask — do not guess.

---

## Detection guide: which type is this?

| Signal | → Type |
|---|---|
| Plain `.html` file with `<html>`/`<head>`/`<body>`, `<script>` tags, `class=` (not `className=`), `document.querySelector`, vanilla DOM code, maybe jQuery | **PART 1 — Raw HTML/CSS/JS** |
| Separate `.css` file(s) and/or `<style>` blocks, inline `style=""`, no React | **PART 1 — Raw HTML/CSS/JS** |
| `package.json` lists `vite`; imports like `import { ImageWithFallback } from "./figma/ImageWithFallback"` | **PART 2 — Figma Make** |
| `import svgPaths from "../../imports/..."` (SVG path data pulled from a Figma module) | **PART 2 — Figma Make** |
| `data-name="SOME LAYER NAME"` attributes on elements (Figma layer names) | **PART 2 — Figma Make** |
| Already React/JSX, but every element is absolutely positioned with literal pixels (`absolute left-[80px] top-[86px]`, `left-[calc(41.67%+2px)]`) and fixed heights (`h-[1000px]`) | **PART 2 — Figma Make** |

Rule of thumb: **PART 1 has no framework at all** (it's vanilla web code that must be *built up* into React). **PART 2 is already React but wrong-framework + machine-positioned** (it must be *cleaned down* and re-fitted). One is "add structure," the other is "strip and re-fit."

---
---

# PART 1 — Adapting Raw HTML/CSS/JS

**Use this part ONLY for plain vanilla HTML/CSS/JS with no framework.** (If the code is a Figma Make export, skip to PART 2 instead.)

The source is hand-writable web code. Your job is to **build it up** into a proper Next.js/React/TypeScript component that follows the project's conventions.

### Sequence
1. **Convert structure to a React functional component (`.tsx`).**
   - Preserve semantic tags (`<section>`, `<header>`, `<main>`, `<nav>`).
   - `class=` → `className=`. `for=` → `htmlFor=`. Self-close void elements.
2. **Replace direct DOM manipulation with React.**
   - `document.querySelector` / `addEventListener` / manual `.style` mutation → `useRef`, `useState`, `useEffect`, event-handler props.
   - If the JS was doing something React handles natively (toggling classes, showing/hiding), refactor it into state — don't port the imperative DOM code verbatim.
   - Remove jQuery entirely if present.
3. **Map all styling to the project's design system** (see PART 3 — this is the big one).
4. **Rebuild any animations on the project's animation stack** — typically GSAP / Framer Motion / Lenis. Do not ship hand-rolled `requestAnimationFrame` loops unless the effect genuinely doesn't map to the stack (continuous physics/lerp loops are a known exception — confirm before doing so).
5. **Images → `next/image`**, links → `next/link`, fonts → the project's font tokens (never a raw font-family, never a remote `<link>` to Google Fonts).
6. **Place the component** in the correct feature folder (e.g. `features/{name}/components`) and add its export to that folder's `index.ts`.

---
---

# PART 2 — Adapting Figma Make Exports

**Use this part ONLY for Figma Make exports** (Vite-based React with Figma-Make attributes). (If the code is plain vanilla HTML/CSS/JS, use PART 1 instead.)

Figma Make output is already React, but it is a **Vite** project, it is **frozen to a single desktop frame** (zero responsiveness), it uses **raw hex/px/font values everywhere** instead of tokens, and it ships **Figma-Make-specific imports and attributes** that do not exist in the target codebase. Your job is to **strip the Figma Make baggage and re-fit** the result into the project's architecture — dissolving it in so the output looks native.

### Figma Make baggage to strip / replace (every time)
- **`import { ImageWithFallback } from "./figma/ImageWithFallback"`** — a Figma-Make helper that doesn't exist in the project. Replace every usage with Next.js `<Image>`.
- **`import svgPaths from "../../imports/..."`** — SVG path data pulled from a Figma module. The referenced asset doesn't exist in the repo. Either use a real asset already in `public/` (check first — logos/graphics often already exist), or ask the user for it. Do not reconstruct inline `<path d={svgPaths.pXXXX} />` stacks.
- **`../../imports/...png` image paths** — Figma asset references, not real files. Replace with a real image in `public/` (ask the user for it if it isn't already there).
- **`data-name="LAYER NAME"` attributes** — Figma layer names. Delete them; they carry no meaning in the app.
- **Vite conventions** — the project is Next.js, not Vite. No `vite`-specific config, no plain `<img>`/`<a>` where `next/image`/`next/link` belong, no Vite asset-import patterns.

### The single biggest job: kill the absolute positioning, rebuild responsiveness
Figma Make lays everything out as one frozen desktop frame:
- Absolute coordinates with literal pixels: `absolute left-[80px] top-[86px]`, `left-[calc(41.67%+2px)]`, `top-1/2 -translate-y-1/2`.
- Fixed pixel dimensions: `h-[1000px]`, `w-[904px]`, `min-h-[900px]`, fixed column widths `w-[550px]`.
- **Zero responsive behavior** — it will break or overlap at every non-desktop width.

This violates the responsiveness rule (non-overridable — see PART 3). **Rebuild the layout with real flex/grid** that reflows across the project's breakpoint table. Turn fixed pixel widths into responsive max-widths; turn absolute-positioned children into normal flow / flex columns; turn fixed heights into content-driven or aspect-ratio heights. Preserve the *intended* look, not the literal coordinates.

### Figma Make quirks to watch for (recurring)
- **Fake forms** — "input fields" are often styled `<span>`s with a bottom border, not real `<input>`s. Newsletter/email bars are frequently a `<span>` labelled "Enter your email" with no actual input. These need real controlled `<input>` elements wired to state, not literal spans.
- **Percentage image-crop artifacts** — e.g. `h-[104.97%] left-[-8.38%] top-[-4.97%] w-[116.76%]`. This is how Figma exports a manually-panned fill image. Don't replicate the numbers — use a plain `object-cover` fill (with `object-position` if a specific crop is wanted).
- **Non-4px-multiple / frame-math values** — offsets like `top-[86px]`, `mt-[205px]`, `py-[18px]` are byproducts of the specific mockup's dimensions, not deliberate spacing. Don't force-map them to a token; rebuild the rhythm with real flex/gap spacing on the 4px scale.
- **Duplicated / typo'd copy** — machine export sometimes duplicates a word or block. Cross-check against any existing/intended copy before trusting the export's text verbatim.

---
---

# PART 3 — General Rules (apply to BOTH parts)

No matter which source type you started from, the adapted result must obey all of the following. These mirror the project's core rules — this is the enforcement checklist for adapted code specifically.

### Design tokens are mandatory
- All color, spacing, typography, and layout values must come from the project's design tokens (commonly organized as a 3-layer flow: raw values → semantic/intent → component usage).
- **No raw hex codes, no raw pixel values, no raw font-families in JSX.** A Tailwind arbitrary value holding a raw hex/px/font (`bg-[#090909]`, `text-[24px]`, `font-['SomeFont',serif]`) is NOT acceptable as final code — map it to the matching project token.
- **Trace each value to a KNOWN token, don't guess a class name.** If a value genuinely has no matching token, **STOP and ask the user** before adding one. Never invent or add a token without explicit approval. Never delete an existing token.

### Tailwind is layout-only
- Tailwind utilities are allowed for **structure/layout only** (flex, grid, gap, positioning, spacing). Never for branding, colors, or typography — those go through the project's tokens/utility classes.

### Responsiveness is non-negotiable
- Every adapted component must be responsive across all breakpoints. This rule can never be overridden, even under an active exception.
- Standard breakpoint table (unless the project's own rules state otherwise): **Mobile 0–768, Tablet 769–1024, Desktop 1025–1440, Large 1441+.**
- If the source had responsive behavior, preserve that behavior exactly and only remap the breakpoint pixel values. If the source had none (typical of Figma Make), you must design the responsive behavior in.

### Spacing
- 4px base unit. Everything spacing-related is a multiple of 4px, via the project's spacing tokens. Reject raw/odd pixel values that aren't on the scale (see the Figma "frame-math values" note above).

### Fonts & images
- **In components, reference the project's font tokens only** — never a raw font-family and never a system font baked into JSX.
- **How a font is loaded/registered varies per project, so ALWAYS ASK before wiring it up.** Sometimes fonts are loaded from local files (`next/font/local`), sometimes from Google Fonts, sometimes from another server — and remote loading is only acceptable when explicitly allowed. Do NOT assume self-host, do NOT assume remote, and do NOT silently add a Google Fonts `<link>` or connect to any external font source on your own. When adapting exported code that came with its own font loading (e.g. a Google Fonts `<link>` in the `<head>`), strip that loading out and **ask the user how they want this font loaded** before re-adding anything. Connecting to an external source is a decision only the user makes.
- Images: Next.js `<Image>`, sourced from a real path in `public/`. No remote CDN URLs, no Figma/asset-module imports.

### Display-font kerning (only when the user flags it — not a default step)
This is **not** something to apply automatically. Most fonts are fine. Only some display fonts render with broken kerning/ligatures at large sizes (letters crowding or overlapping). **Do this only if the user explicitly tells you a specific font has this problem** (as was done on the Venture Valley project). When they do, this is the known starting fix — apply it to the affected large headings:

Tailwind (arbitrary-property form, as used on Venture Valley's Quinn headings):
```
[font-kerning:none] [font-variant-ligatures:none] [font-feature-settings:'liga'_0,'kern'_0]
```

Equivalent plain CSS:
```css
font-kerning: none;
font-variant-ligatures: none;
font-feature-settings: 'liga' 0, 'kern' 0;
```

Treat this as a *starting reference* for solving a reported kerning issue, not a guaranteed complete fix — if the specific font still misbehaves after this, stop and flag it rather than guessing further.

### Structure & architecture
- Functional components + TypeScript.
- **Semantic HTML — applies regardless of source.** The finished component must use tags that describe the content (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>`, `<h1>`–`<h6>`, `<ul>`/`<li>`, `<a>`), not generic `<div>`/`<span>` soup. What this means depends on the source: for raw HTML/CSS/JS (PART 1), **preserve** the semantic tags already there; for a Figma Make export (PART 2), which is almost always meaningless positioned `<div>`s, **restore/introduce** the correct semantic tags as you rebuild. Either way the target is the same — proper semantic markup.
- **ARIA where genuinely needed — applies regardless of source.** Add ARIA only to fill gaps semantic HTML can't express: `aria-label` on icon-only buttons, `aria-hidden` on decorative/visual-only elements, `aria-expanded` on toggles, `aria-current` on the active nav item, etc. Do NOT sprinkle ARIA everywhere and do NOT use it to paper over div soup — a real `<button>`/`<nav>` needs no `role`. Use the right semantic tag first; reach for ARIA only for what the tag can't convey.
- Feature-sliced: components live in `features/{name}/components` (or the shared layer if genuinely generic/reusable). Add the export to the matching `index.ts`. Never import across feature boundaries (`features/A` must not import from `features/B`).
- New shared/base UI components should be polymorphic and use `React.forwardRef`; if the project pairs UI components with a matching stylesheet, create and wire that in per the project's convention.

### Forms
- Treat any exported "form" as a structural shell only — there's no live backend. Build real inputs/state, but flag the actual submit wiring (Supabase or similar) as a TODO rather than pretending the export's `action`/handler works.

### The non-overridable rule
- **If you hit ANY ambiguity, snag, missing token, missing asset, or unclear mapping — STOP and ask the user before doing anything.** Do not guess, do not silently work around it. This rule is never waived, even when other rules have been suspended for a specific exception.

---

> **Note:** More general rules will be added to PART 3 over time. Treat this section as the growing shared baseline both adaptation paths must satisfy.
