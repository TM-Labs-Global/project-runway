---
name: dimensions-setup
description: Per-project guidance for shared/styles/dimensions.css — the 4px spacing scale (constant), border radii (brand-dependent), and container widths. Most of this is stable; adjust radii to match brand feel and add spacing steps only as needed.
---

# Dimensions Setup (per project)

Covers **`shared/styles/dimensions.css`**: the spacing scale, border radii, and container widths.

## Spacing scale — CONSTANT across projects (mostly)
- The **4px base unit never changes.** Every spacing token is a multiple of 4px. This is a fixed rule, not a per-project value.
- You may **ADD** steps a project needs that the base template lacks (e.g. projects have added `--spacing-25` = 100px, `--spacing-30` = 120px for large section rhythm). Add, never delete or renumber existing steps.
- The actual section padding/margin *values* that consume these tokens are a separate per-project concern — see **`SECTION-SPACING-SETUP.md`**. This file is just the underlying scale those values are built from.

## Border radii — adjust to brand feel
`--radius-*` (`none`, `xs`…`3xl`, `full`) sets how sharp or rounded the UI reads. This IS brand-dependent:
- A sharp/editorial brand may push `--radius-button`/`--radius-card` toward `--radius-none`/`--radius-sm`.
- A soft/friendly brand may push them toward `--radius-lg`/`--radius-xl`.
- Adjust the *semantic* radius tokens (`--radius-card`, `--radius-button`, `--radius-input` live in `semantics.css` and reference these) rather than hardcoding radii on components.
Confirm the brand's radius language with the user; don't assume the template default.

## Container widths — usually stable
`--container-sm…2xl` are standard breakpoint-aligned max-widths. Rarely change per project. Note projects often standardize on a single max content width (e.g. `max-w-[1440px]`) for sections — if so, that's a layout convention, not necessarily a change to these tokens.

## What to adjust per project
1. **Radii** → match the brand's sharpness/roundness (confirm with user).
2. **Add spacing steps** only if the project needs sizes the scale lacks (keep 4px multiples).
3. Leave container widths unless the project's layout system calls for different maxima.

## What never changes
- The 4px base unit and existing spacing steps' values.
