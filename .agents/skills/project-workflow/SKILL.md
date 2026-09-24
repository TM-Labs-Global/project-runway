---
name: project-workflow
description: Step-by-step start-of-project sequence and build order for this Next.js project. Covers reading the template, sequential design-system token setup (colors, typography, dimensions, semantics, buttons), layout section spacing, feature scaffolding, and rules for adapting generated code. Use whenever starting, onboarding, setting up, or building features for this project.
---

# Project Instructions — Start-of-Project Order

This skill holds the reusable rules for starting and building a project. **Do these steps ONE AT A TIME, in order.** Complete a step fully, get the user's confirmation, then move to the next. **Never batch multiple steps together, and never run ahead.** This matches the project's core "one section at a time, wait for go-ahead" philosophy.

Each step points to its own detailed reference file in `./references/`. Read that file when you reach the step.

---

## Step 0 — Read the entire template first (do not skip)
Read **every folder and every file** in the project template. Understand the `shared/styles` token flow, the `features/{name}` layout, the `index.ts` barrels, and how globals/fonts are wired. Then explain the structure back to the user and **wait for approval** before touching anything. (Also stated at the top of [ADAPTING-GENERATED-CODE.md](./references/ADAPTING-GENERATED-CODE.md), which is always read.)

## Step 1 — Design system, in THIS exact order (one at a time)
This is the user's actual setup sequence. Do each fully, confirm, then the next:

1. **Colors** → [COLOR-SETUP.md](./references/COLOR-SETUP.md) — add the flat brand palette to `colors.css` (primitives). Keep neutral + status scales.
2. **Typography** → [TYPOGRAPHY-SETUP.md](./references/TYPOGRAPHY-SETUP.md) (with [RESPONSIVE-TYPOGRAPHY-PLAN.md](./references/RESPONSIVE-TYPOGRAPHY-PLAN.md) and [TYPOGRAPHY-FONT-RESOLUTION-FIX.md](./references/TYPOGRAPHY-FONT-RESOLUTION-FIX.md)) — fonts (+ `layout.tsx` loading, ask how each loads), type scale, letter-spacing, responsive cross-device scaling, per-element assignment.
3. **Dimensions** → [DIMENSIONS-SETUP.md](./references/DIMENSIONS-SETUP.md) — spacing scale (4px, constant), radii (brand feel), containers.
4. **Semantics** → [SEMANTICS-SETUP.md](./references/SEMANTICS-SETUP.md) — repoint the intent tokens in `semantics.css` at the brand palette. **Done after dimensions on purpose** — semantics references both color primitives AND radius/dimension tokens. Covers brand ≠ action/CTA, greys/status independence, hover derivation, dark mode.
5. **Buttons** → [COMPONENT-STYLES-SETUP.md](./references/COMPONENT-STYLES-SETUP.md) (apply to `button.css`) — set up buttons upfront. Mostly re-themes via tokens; fix the known token-name bug.

## Step 2 — Layout spacing values
[SECTION-SPACING-SETUP.md](./references/SECTION-SPACING-SETUP.md) — per-project section padding (top/bottom) and margins (left/right), desktop + mobile. Mobile left/right margin is always 20px; the rest are set per project. Includes the per-section exception rule (e.g. full-bleed images).

## Step 3 — Confirm feature scaffolding
[FEATURE-STRUCTURE.md](./references/FEATURE-STRUCTURE.md) — ensure every feature has the COMPLETE folder/file structure. Fix the current gap (`features/home` is missing its `components/` folder). Whenever a new page is started later, scaffold the entire feature structure up front — the agent tends to forget this.

## Deferred — do these AS YOU GO, not upfront
The user sets these up later, during the project, not at the start:
- **Input** → [COMPONENT-STYLES-SETUP.md](./references/COMPONENT-STYLES-SETUP.md) (apply to `input.css`) — when forms are actually built. (If the project is dark-themed, fix the hardcoded white input background then.)
- **Effects** → [EFFECTS-SETUP.md](./references/EFFECTS-SETUP.md) — shadows/transitions/z-index, adjusted as specific needs arise. The z-index scale is a fixed contract; mostly leave alone.

## Ongoing (used throughout, not a one-time step)
- **[ADAPTING-GENERATED-CODE.md](./references/ADAPTING-GENERATED-CODE.md)** — the method for bringing in externally-generated code (raw HTML/CSS/JS vs. Figma Make), applied every time such code arrives. Its Step 0 also re-states "read the whole template first."
- **Build order:** one page at a time, one section at a time, waiting for the user's go-ahead between each (per the project skill file).

---

## Reference Guides Index
| File | Purpose | When |
|---|---|---|
| [COLOR-SETUP.md](./references/COLOR-SETUP.md) | Brand palette → `colors.css` primitives. | Step 1.1 |
| [TYPOGRAPHY-SETUP.md](./references/TYPOGRAPHY-SETUP.md) | Fonts, type scale, assignment (+ layout.tsx). | Step 1.2 |
| [RESPONSIVE-TYPOGRAPHY-PLAN.md](./references/RESPONSIVE-TYPOGRAPHY-PLAN.md) | Responsive font size strategy (hybrid CSS + @utility + clamp). | Step 1.2 |
| [TYPOGRAPHY-FONT-RESOLUTION-FIX.md](./references/TYPOGRAPHY-FONT-RESOLUTION-FIX.md) | Next.js font variable scoping (:root vs body) & Tailwind v4 gotchas. | Step 1.2 |
| [DIMENSIONS-SETUP.md](./references/DIMENSIONS-SETUP.md) | Spacing scale, radii, containers. | Step 1.3 |
| [SEMANTICS-SETUP.md](./references/SEMANTICS-SETUP.md) | Repoint intents in `semantics.css`. | Step 1.4 |
| [COMPONENT-STYLES-SETUP.md](./references/COMPONENT-STYLES-SETUP.md) | button.css (upfront) + input.css (deferred) + new component CSS. | Step 1.5 / deferred |
| [SECTION-SPACING-SETUP.md](./references/SECTION-SPACING-SETUP.md) | Per-project section padding/margins. | Step 2 |
| [FEATURE-STRUCTURE.md](./references/FEATURE-STRUCTURE.md) | Complete feature scaffolding rules. | Step 3 / ongoing |
| [EFFECTS-SETUP.md](./references/EFFECTS-SETUP.md) | Shadows, transitions, z-index. | Deferred |
| [ADAPTING-GENERATED-CODE.md](./references/ADAPTING-GENERATED-CODE.md) | Adapting raw HTML/CSS/JS & Figma Make (always-read; contains Step 0). | Ongoing |
