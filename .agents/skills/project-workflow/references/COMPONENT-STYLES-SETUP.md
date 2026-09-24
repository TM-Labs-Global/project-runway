---
name: component-styles-setup
description: Per-project guidance for component stylesheets in shared/styles (button.css, input.css, and any new component .css). These consume semantic tokens, so they mostly re-theme automatically when colors/typography change. Covers what to adjust, the new-component rule, and a known token-reference bug to fix.
---

# Component Styles Setup (per project)

Covers the component-level stylesheets in **`shared/styles/`** (`button.css`, `input.css`, and any new ones you add). These are **layer 3** of the 3-layer CSS system — they *consume* semantic tokens.

## The key property: they re-theme automatically
Because these files reference semantic tokens (`--color-action-primary`, `--text-inverse`, `--radius-button`, `--border-default`, etc.) rather than raw values, **most re-theming happens for free** when you remap colors (see `COLOR-SETUP.md`) or radii (see `DIMENSIONS-SETUP.md`). You usually do NOT hand-edit these when the brand changes — the token remap cascades through them.

## Known bug to fix (template ships broken)
`button.css` references **`--color-text-primary`** and **`--color-text-inverse`**, but `semantics.css` defines **`--text-primary`** and **`--text-inverse`** (no `--color-` prefix). So those button text colors currently resolve to nothing (inherited fallback). Fix the references in `button.css` to the correct token names when setting up buttons on any project.

## What to actually adjust per project
- **Variant set:** the template ships many button variants (`primary`, `secondary`, `tertiary`, `outline-navy`, `outline-blue`, `ghost`, `destructive`, `link`). Trim to what the project's design actually uses, or rename brand-specific ones (`outline-navy`/`outline-blue` are named after the template's placeholder palette — rename to the project's language).
- **Sizes / radii / padding:** adjust `.btn-sm/md/lg/xl` and input padding if the project's component specs differ — but pull from spacing/radius tokens, never hardcode px.
- **Inputs:** `input.css` hardcodes `background-color: var(--color-white)` on `.input`; if the project is dark-themed, point this at a surface token instead so inputs aren't stuck white.

## The non-negotiable rule for NEW components
When you create a new base UI component in `shared/components/ui`, you **MUST**:
1. Create a matching `.css` file in `shared/styles/`.
2. Wire its `@import` into `app/globals.css` (in the correct layer order — after semantics).
3. Style it only through semantic tokens (no raw hex/px), so it inherits theming like the others.
4. Make it polymorphic (`as` prop / element switching) and use `React.forwardRef`, per the component pattern rules.

## What never changes
- The rule that component styles consume semantic tokens only — never ad-hoc hex/px in JSX or in the component CSS.
