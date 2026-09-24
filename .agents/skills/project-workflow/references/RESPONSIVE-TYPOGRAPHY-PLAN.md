---
name: responsive-typography-plan
description: Implementation plan and reference guide for managing responsive font sizes across mobile, tablet, and desktop. Combines base CSS element scaling, Tailwind v4 @utility registration for JSX overrides, and fluid clamp() sizing for hero displays.
---

# Responsive Typography Strategy & Implementation Plan

This guide documents the implementation strategy for controlling typography sizes across viewports (mobile, tablet, desktop) in this Next.js template. Reference this document during **Step 1.2 (Typography Setup)**.

---

## 1. Strategy Overview: The 3-Tier Hybrid Approach

To balance **pixel-perfect Figma alignment**, **clean JSX markup**, and **prevent awkward line breaks on tablets**, we implement a 3-tier system:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Tier 1: Base HTML Element Rules (h1–h6 in typography.css)             │
│ → Mobile-first defaults; automatically scale up on desktop (1024px+)    │
│ → Zero extra classes needed for standard content markup                 │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 2: Tailwind v4 @utility Classes                                  │
│ → Registers custom scale tokens in Tailwind's native utility engine    │
│ → Enables responsive JSX modifiers: className="text-3xl lg:text-5xl"  │
├────────────────────────────────────────────────────────────────────────┤
│ Tier 3: Fluid Display / Hero Tokens (clamp())                          │
│ → Reserved for massive hero headlines (72px–120px+)                     │
│ → Prevents text overflow / awkward wrapping on mid-sized viewports      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technical Implementation Spec

### Tier 1: Base HTML Element Scaling (`shared/styles/typography.css`)

Configure standard HTML tags with mobile-first defaults and desktop overrides via media queries:

```css
/* Base element defaults — Mobile First */
h1 {
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  font-size: var(--text-4xl); /* 36px/40px on mobile */
  line-height: var(--leading-tight);
}

h2 {
  font-family: var(--font-display);
  font-weight: var(--weight-bold);
  font-size: var(--text-3xl); /* 30px on mobile */
  line-height: var(--leading-tight);
}

h3 {
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: var(--text-2xl); /* 24px on mobile */
  line-height: var(--leading-snug);
}

/* Desktop Scale (1024px and wider) */
@media (min-width: 1024px) {
  h1 {
    font-size: var(--text-6xl); /* 60px on desktop */
  }

  h2 {
    font-size: var(--text-4xl); /* 36px/40px on desktop */
  }

  h3 {
    font-size: var(--text-3xl); /* 30px on desktop */
  }
}
```

---

### Tier 2: Tailwind v4 `@utility` Directives (`shared/styles/typography.css`)

Per [`TYPOGRAPHY-FONT-RESOLUTION-FIX.md`](./TYPOGRAPHY-FONT-RESOLUTION-FIX.md), plain CSS selectors (e.g. `.text-5xl`) will **not** compile responsive variants in Tailwind v4. 

We declare custom sizes using `@utility` so responsive prefixes (`md:`, `lg:`, `xl:`) work seamlessly:

```css
@utility text-xs   { font-size: var(--text-xs);   line-height: var(--leading-normal); }
@utility text-sm   { font-size: var(--text-sm);   line-height: var(--leading-normal); }
@utility text-base { font-size: var(--text-base); line-height: var(--leading-normal); }
@utility text-lg   { font-size: var(--text-lg);   line-height: var(--leading-snug); }
@utility text-xl   { font-size: var(--text-xl);   line-height: var(--leading-snug); }
@utility text-2xl  { font-size: var(--text-2xl);  line-height: var(--leading-snug); }
@utility text-3xl  { font-size: var(--text-3xl);  line-height: var(--leading-tight); }
@utility text-4xl  { font-size: var(--text-4xl);  line-height: var(--leading-tight); }
@utility text-5xl  { font-size: var(--text-5xl);  line-height: var(--leading-tight); }
@utility text-6xl  { font-size: var(--text-6xl);  line-height: var(--leading-none); }
@utility text-7xl  { font-size: var(--text-7xl);  line-height: var(--leading-none); }

/* Usage in JSX */
<h2 className="text-2xl md:text-3xl lg:text-5xl">
  Custom Section Title
</h2>
```

---

### Tier 3: Fluid Sizing with `clamp()` for Hero / Display Headings

When a project has oversized display text (e.g., Hero headers > 64px), define a dedicated fluid token:

```css
:root {
  /*
    clamp(MIN, PREFERRED, MAX)
    - Min: 2.75rem (44px) at 375px mobile viewport
    - Preferred: 1.5rem + 5vw (scales smoothly with browser width)
    - Max: 5.5rem (88px) on desktop viewports
  */
  --text-hero: clamp(2.75rem, 1.5rem + 5vw, 5.5rem);
}

@utility text-hero {
  font-size: var(--text-hero);
  line-height: 1.05;
  letter-spacing: var(--tracking-tighter, -0.02em);
}
```

---

## 3. Checklist for Step 1.2 Execution

When executing **Step 1.2 (Typography Setup)**:

1. **Extract Mobile & Desktop Type Styles from Figma**:
   - Record mobile sizes for H1–H6.
   - Record desktop sizes for H1–H6.
   - Note if there is a dedicated Hero/Display style requiring `clamp()`.
2. **Configure `typography.css`**:
   - Define pure rem values in `:root`.
   - Wire base `h1`–`h6` with mobile defaults and `@media (min-width: 1024px)` desktop values.
   - Wrap size utilities in `@utility`.
3. **Resolve Next.js Font Variables**:
   - In `body`, declare font family aliases pointing to the Next.js injected variables:
     ```css
     body {
       --font-display: var(--font-display-face), sans-serif;
       --font-sans: var(--font-body-face), sans-serif;
       font-family: var(--font-sans);
     }
     ```
4. **Verification**:
   - Inspect viewport at **375px** (Mobile) → verify `<h1>` renders at mobile size.
   - Inspect viewport at **1440px** (Desktop) → verify `<h1>` scales to desktop size.
   - Test responsive class override `<h1 className="text-2xl lg:text-6xl">` in browser.
