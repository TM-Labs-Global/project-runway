---
name: effects-setup
description: Per-project guidance for shared/styles/effects.css — shadows, transitions, opacities, and the z-index scale. Mostly stable; the z-index scale is a fixed contract. Adjust shadows/transitions only when the design explicitly calls for it.
---

# Effects Setup (per project)

Covers **`shared/styles/effects.css`**: box shadows, transitions, opacities, z-index scale. This is the **most stable** style file — treat it as "leave alone unless the design explicitly specifies otherwise."

## Z-index scale — a FIXED contract, do not casually change
```
--z-negative: -1;  --z-elevate: 1;  --z-sticky: 100;
--z-drawer: 200;   --z-modal: 300;  --z-toast: 400;  --z-max: 9999;
```
These are load-bearing across the whole app (fixed headers, sticky sections, overlays, pinned scroll animations all rely on this ordering). Use these tokens for any layering decision; don't invent ad-hoc `z-[999]` values.
- **Gap to know:** there is no named token between `--z-elevate` (1) and `--z-sticky` (100). Scroll-pinned / temporarily-fixed content that must sit above normal content but below a `z-sticky:100` header needs a value in that range — pick one (e.g. 50) or add a named token (ask before adding).

## Shadows — adjust only if the brand's elevation language differs
`--shadow-sm…2xl`, `--shadow-inner`, `--shadow-none` are a standard elevation ramp. Change only if the design uses a distinctly different shadow style (e.g. harder/softer, colored shadows). Components reference the semantic aliases (`--shadow-card`, `--shadow-popover` in `semantics.css`), so adjust there, not on components.

## Transitions — usually stable
`--transition-fast/normal/slow` (150/300/500ms, standard easing). Rarely per-project. Adjust only for a deliberately snappier/slower motion feel.

## Opacities — stable
`--opacity-0…100`. Utility values; rarely touched.

## What to adjust per project
- Realistically: **little to nothing.** Possibly shadow style if the brand demands it, possibly adding a z-index step for pinned-scroll layering.

## What never changes
- The z-index ordering/scale (it's a cross-app contract).
