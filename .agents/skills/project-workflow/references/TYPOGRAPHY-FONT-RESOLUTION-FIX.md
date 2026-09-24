# Next.js Font Variable Resolution: `:root` vs `body`

## Overview

This documents a common, non-obvious bug when combining `next/font` with a custom CSS design token system. It applies to **any Next.js project** using `next/font/google` or `next/font/local`.

---

## The Problem

When you load fonts using `next/font` and expose them as CSS custom properties via the `variable` option:

```tsx
// app/layout.tsx
const fontDisplay = SomeFont({ variable: '--font-display-raw', subsets: ['latin'] });
const fontBody    = AnotherFont({ variable: '--font-body-raw', subsets: ['latin'] });

<body className={`${fontDisplay.variable} ${fontBody.variable}`}>
```

Next.js injects `--font-display-raw` and `--font-body-raw` as CSS custom properties **on the `<body>` element** — not on `:root`.

If you then define your design token aliases in `:root`:

```css
/* ❌ WRONG */
:root {
  --font-display: var(--font-display-raw), 'FallbackFont', sans-serif;
  --font-body:    var(--font-body-raw),    'FallbackFont', sans-serif;
}
```

…the CSS custom property `var(--font-display-raw)` is resolved at the `:root` scope. At that scope, the variable does **not exist** — Next.js only injected it onto `body`. The browser treats it as invalid and falls back to the literal string `'FallbackFont'`, which (without a `@font-face` declaration backing it) silently falls through to the inherited `body` font or the browser default.

**Symptom:** Headings (`h1`–`h6`) render in the wrong font even though:
- The font loads correctly in the `<head>`
- The CSS rules appear correct
- The font variable name is spelled correctly

---

## Why It Fails — The CSS Scope Rule

> **CSS custom properties defined on an element are only available to that element and its descendants, not its ancestors.**

```
html (:root)
  └── body  ← Next.js injects --font-display-raw HERE
        └── h1  ← Inherits --font-display-raw ✓
```

When `:root` tries to read `var(--font-display-raw)`, the browser looks upward in the tree — there's nothing above `:root`, so the variable is undefined. The `var()` call fails silently.

---

## The Fix

Move the font family token declarations out of `:root` and into the `body` block, where the Next.js-injected variables are available:

```css
/* ✅ CORRECT */
body {
  /* Font family tokens — declared here because Next.js injects
     --font-display-raw and --font-body-raw onto <body> */
  --font-display: var(--font-display-raw), 'FallbackDisplay', sans-serif;
  --font-body:    var(--font-body-raw),    'FallbackBody',    sans-serif;

  font-family: var(--font-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display); /* ← Now resolves correctly */
}
```

All elements inside `body` (including `h1`–`h6`) inherit the custom properties defined on `body`, so the font-family chain resolves correctly.

---

## What Still Belongs in `:root`

Only tokens that have **no dependency on Next.js-injected variables** should stay in `:root`:

```css
:root {
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  /* ... all font-size tokens ... */

  --weight-regular: 400;
  --weight-bold: 700;
  /* ... all font-weight tokens ... */

  --leading-none: 1;
  --leading-tight: 1.25;
  /* ... all line-height tokens ... */
}
```

---

## Summary Table

| Token Type | Correct Scope | Reason |
|---|---|---|
| `--font-display`, `--font-body`, `--font-sans` | `body` | References Next.js-injected variables |
| `--text-*` (font sizes) | `:root` | Pure `rem` values, no variable dependency |
| `--weight-*` (weights) | `:root` | Pure numeric values, no variable dependency |
| `--leading-*` (line heights) | `:root` | Pure numeric values, no variable dependency |

---

## Additional Gotcha: `@theme inline` in Tailwind v4

If you use Tailwind v4's `@theme inline` to register font utilities (e.g. `font-display`), point it directly to the **raw** Next.js variable — not to your alias:

```css
/* ❌ Circular — --font-display references itself */
@theme inline {
  --font-display: var(--font-display);
}

/* ✅ Direct reference to the Next.js-injected variable */
@theme inline {
  --font-display: var(--font-display-raw);
}
```

This ensures Tailwind's generated utility class outputs `font-family: var(--font-display-raw)` inline, which resolves correctly at the element level.

---

## Tailwind v4 Gotcha: Custom Utility Classes and Responsive Modifiers

When defining custom design system typography or layout helpers in your styles files (e.g., `.text-4xl` or `.px-section`), defining them as standard CSS classes limits their responsiveness in Tailwind:

```css
/* ❌ LIMITS RESPONSIVENESS */
.text-4xl {
  font-size: var(--text-4xl);
  line-height: var(--leading-compact);
}
```

If defined as a standard CSS selector, Tailwind's build engine will not compile responsive variants for it. If you try to write `<h1 className="text-4xl lg:text-6xl">`, the browser will apply `.text-4xl` but the compiled `.lg:text-6xl` variant will either be ignored or fall back to Tailwind's default configuration value rather than your custom token.

### The Fix

Declare custom helper utilities using Tailwind v4's `@utility` directive:

```css
/* ✅ NATIVE TAILWIND UTILITY */
@utility text-4xl {
  font-size: var(--text-4xl);
  line-height: var(--leading-compact);
}

@utility text-6xl {
  font-size: var(--text-6xl);
  line-height: var(--leading-flat);
}
```

This registers the class in Tailwind's native utility layer, automatically compiling all responsive media-query variants (`sm:text-4xl`, `lg:text-6xl`, etc.) and allowing you to override sizes dynamically in JSX.

