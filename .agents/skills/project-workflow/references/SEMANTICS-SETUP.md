---
name: semantics-setup
description: Per-project setup for shared/styles/semantics.css — the INTENT layer. Done AFTER colors, typography, and dimensions (it references color primitives AND radius/dimension tokens). Repoint existing intents at the brand palette — never duplicate or leave orphans. Covers brand-vs-action decoupling, greys/status independence, hover derivation, and dark mode.
---

# Semantics Setup — Intents (`semantics.css`)

This runs **after** colors, typography, and dimensions — because `semantics.css` references primitives from all of them (color values AND radius/dimension tokens like `--radius-card`). It maps "this color/value is used for X" onto the primitives already in place.

**Golden rule: repoint existing intents; don't duplicate.** For each brand color, find the existing semantic token that already means its role and change its value. You update mappings — you never create parallel new tokens or leave orphans.

## 1. Theme — which neutral is background vs. text
Set once per project (light or dark). Light example:
```css
--bg-page:   var(--color-brand-paper);
--text-base: var(--color-brand-ink);
```
Dark flips them. Don't re-ask this every task — it's a one-time project decision.

## 2. Repoint intents at the brand palette (by role)
Typical mapping (light theme):
```css
--bg-primary:   var(--color-brand-primary);
--text-brand:   var(--color-brand-primary);
--text-primary: var(--color-brand-primary);
--link-color:   var(--color-brand-primary);
--bg-secondary: var(--color-brand-secondary);
```
"This color is only for one specific thing" = repoint the one existing semantic token for that thing. Only ADD a token if the intent genuinely has no slot — and ask first.

## 3. Brand ≠ Action/CTA (the key decoupling)
**Your brand-primary color is NOT necessarily your button color.** The semantic layer exists so they can differ — the template even ships this way (`--color-action-primary` originally points at the sun yellow, not the indigo brand primary). So:
- Keep `--color-action-primary/secondary/tertiary` as their own decision.
- Ask the user which color drives buttons/CTAs; don't assume it equals brand-primary.
- Until told, park them on a brand color with a loud `PLACEHOLDER` comment — never silently equate brand and action.

## 4. Greys and status stay independent (by design)
- **Greys** (`--text-secondary/tertiary`, `--border-*`, disabled, surface hovers) stay on the **neutral scale** — the flat palette lacks mid-greys. If the user wants brand-tinted greys, ask or derive from ink via `color-mix`.
- **Status colors** (`--bg-danger`, `--text-success/warning/error/info`, `--border-error/success`) stay their conventional hues — system colors, not brand.

## 5. Hover / subtle / active — derive or ask, never invent a constant
```css
--bg-primary-hover:  color-mix(in srgb, var(--color-brand-primary) 88%, black);
--bg-primary-subtle: color-mix(in srgb, var(--color-brand-primary) 12%, white);
```
`color-mix` is a derivation (fine). A fabricated hex is inventing a token (not fine) — ask for exact Figma hover/active values instead if a specific value is needed.

## 6. Dark mode
If there's a `@media (prefers-color-scheme: dark)` block, it will still point primary at the OLD placeholder scale after you remap light mode. Either repoint its brand references to a brand-*derived* value (lighten brand-primary for text on dark, darken for subtle surfaces), OR if the project is light-only, strip the block — confirm first, don't delete unprompted.

## Known template bugs to fix while here
- **Undefined var:** `button.css` references `--color-text-primary` / `--color-text-inverse`, but this file defines `--text-primary` / `--text-inverse` (no `--color-` prefix). Fix the button.css references so button text colors resolve.
- **Broken dark ref:** the dark block may reference `--color-error-950`, which doesn't exist (error stops at 700). Replace with `color-mix(in srgb, var(--color-error-500) 25%, black)`.

## Verification
Confirm NO semantic token still points at a placeholder scale, in light AND dark. The `/design-system` page renders the full token set for a visual check.
