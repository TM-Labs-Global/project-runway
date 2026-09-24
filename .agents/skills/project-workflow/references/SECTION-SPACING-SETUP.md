---
name: section-spacing-setup
description: Per-project setup for section vertical padding (top/bottom) and horizontal margins (left/right), for desktop and mobile. These values change every project and are filled in at project start — EXCEPT mobile left/right margin, which is always 20px. Companion to adapting-generated-code.
---

# Section Spacing Setup (per project)

> **This file holds values that change per project.** Unlike the adaptation rules (which stay stable across projects), the numbers here are set fresh at the start of each project. The user provides them. Fill in the slots below before building any section, and treat the filled-in values as the **default baseline that most sections follow** — not an unbreakable law. Some sections deliberately deviate; see "Per-section exceptions" below.

These control two things for every page **section**:
- **Vertical padding** — the space above and below a section's content (top / bottom).
- **Horizontal margin** — the gutter/inset between a section's content and the left/right edges of the viewport.

Both differ between **desktop** and **mobile**.

## The one constant (never changes across projects)
- **Mobile left/right margin = `20px`.** This is fixed. Do not ask about it, do not change it per project — it is always 20px on mobile.

## The per-project values (fill these in at project start)
Everything below is a slot to be set per project. Until the user provides them, STOP and ask rather than guessing.

| Section spacing | Desktop | Mobile |
|---|---|---|
| Padding **top** | **120px** (`var(--spacing-30)`) | **60px** (`var(--spacing-15)`) |
| Padding **bottom** | **120px** (`var(--spacing-30)`) | **60px** (`var(--spacing-15)`) |
| Margin **left / right** | **100px** (`var(--spacing-25)`) | **`20px` (fixed)** (`var(--spacing-5)`) |

> When the user gives you the values for a project, replace the `<set per project>` slots above with the actual numbers, so this file becomes the recorded source of truth for that project's section spacing.

## How to apply these values (rules that don't change)
- **Route them through the project's spacing tokens, not raw pixels in JSX.** Every value here is on the 4px scale and should map to a spacing token (e.g. a 20px inset → the token that equals 20px, a 120px gutter → the token that equals 120px). Do not hardcode `px-[20px]`/`py-[100px]` as literal arbitrary values if a token exists for that number — map to the token. If a needed value has no token, STOP and ask before adding one.
- **"Margin left/right" is implemented as the section's horizontal inset** — typically horizontal padding on the section (or a centered max-width container), producing the gutter between content and the viewport edge. It is not a literal CSS `margin` requirement; it's the horizontal spacing result that matters.
- **"Padding top/bottom" is the section's vertical padding** — the breathing room above and below the section's content.
- **Desktop vs. mobile is handled responsively**, via the project's breakpoint system (mobile-first base value + a desktop override at the appropriate breakpoint). The mobile value is the base; the desktop value is the larger-screen override.
- **These are the default for every section — hand-written and adapted alike.** They are the layout baseline for the whole project, not only for imported/adapted code. Most sections follow them; the exceptions below are the deliberate departures.

## Per-section exceptions (the "certain sections within the same project" case)
The spacing values are a **default baseline, not an unbreakable rule.** Within a single project, specific sections intentionally break these values when the design calls for it. This is legitimate and expected — do not "correct" a section back to the baseline when its deviation is intentional.

**The most common exception: full-bleed media.** A section may keep its left margin/padding but run an image, video, or media column **flush to a viewport edge**, deliberately ignoring the horizontal margin on that side.
- *Real precedent (Venture Valley):* the guest episode template kept the standard left inset (`pl-[spacing-5] lg:pl-[spacing-30]`) but set the right padding to `0` (`pr-0`), so the guest photo on the right bled past the right margin all the way to the edge of the screen. The footer and other sections reused the same "respect the left, bleed the right" pattern. That was intentional design, not a spacing error.

**Other legitimate deviations:** a section that needs different vertical rhythm (a tighter or more generous top/bottom than the baseline), a full-width background color/section that spans edge-to-edge, or a hero that fills the viewport differently.

**The guardrail (so "exception" doesn't become "free rein"):**
- A section only deviates from the baseline when there is an **explicit design reason or instruction** for it (a mockup shows the bleed, or the user asks for it). 
- The agent must **NOT silently decide on its own** to break the margin/padding just because it looks better. If it's unsure whether a section should follow the baseline or deviate, it STOPS and asks — consistent with the project's non-overridable "ask when in doubt" rule.
- When a section does deviate, it should still respect the baseline on the sides/axes that aren't part of the intended exception (e.g. the Venture Valley example broke the *right* margin only — the left inset and everything else stayed on the standard).

## Relationship to the other instruction files
- This is the "changes per project" companion to `adapting-generated-code` (which is the stable, reusable methodology). When adapting any generated code into a section, apply the spacing values recorded here — the adaptation rules say "use the project's section spacing"; this file is where those actual numbers live.
- If the user says the spacing values are changing mid-project, distinguish the two cases (both are named in the project's own rules): **(a) a whole-project change** — update the table above and use the new values everywhere going forward; **(b) a single-section deviation** — a one-off exception per "Per-section exceptions" above, which does NOT change the baseline table for other sections.
