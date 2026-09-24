---
name: feature-structure
description: The complete, non-negotiable folder/file structure every feature must have (features/{name}). The agent must scaffold ALL of it for every feature/page — never a partial subset. Includes the current gap (features/home is missing its components folder) and the rule for building new pages.
---

# Feature Structure & Scaffolding (every feature, every page)

This project is Feature-Sliced. Every feature under `features/{name}` MUST have the **complete** structure below — not a partial subset. The agent has a habit of scaffolding features incompletely (missing a `components/` folder, a missing `index.ts` barrel, etc.). **Do not do that. Create the whole thing, every time.**

## The complete feature template
```
features/{name}/
├── apis/
│   └── index.ts
├── components/
│   └── index.ts          ← REQUIRED, even if empty at first
├── hooks/
│   ├── index.ts
│   └── request-hooks.ts
├── pages/
│   ├── {name}-page.tsx
│   └── index.ts
├── types/
│   └── index.d.ts
└── index.ts              ← feature barrel (exports pages, etc.)
```
Every subfolder has its own `index.ts` (or `index.d.ts` for `types`). The feature-level `index.ts` re-exports what the app composition layer needs (usually `export * from "./pages"`).

## Current gap to fix now
`features/home/` is **missing its `components/` folder and `components/index.ts`.** Per this structure it must have one (like `features/design-system/` and `features/docs/` do). Create `features/home/components/index.ts` (empty barrel is fine to start: `export {};`, then add exports as components are built).

## Rule when building a NEW page (About, Episodes, Shop, etc.)
When a new page/domain is started, **scaffold the entire feature structure above up front**, before writing section components:
1. Create the folder `features/{name}/` with ALL subfolders (`apis`, `components`, `hooks`, `pages`, `types`).
2. Create every `index.ts` / `index.d.ts` barrel — including the empty `components/index.ts`.
3. Create `pages/{name}-page.tsx` and its `pages/index.ts`.
4. Create the feature-level `index.ts`.
5. Wire the route in `app/{route}/page.tsx` to import the feature's page.

Do NOT create just the one component you're working on and skip the rest of the scaffold. Match `features/home` / `features/design-system` exactly.

## Barrel-export discipline (Verification)
- Every new component added to `components/` must be exported from `components/index.ts`.
- Every new page from `pages/index.ts`, etc.
- Before finishing any task, verify the `index.ts` files are updated — a component that isn't exported from its barrel is effectively invisible to the rest of the app.

## The Feature Wall (isolation)
- `features/A` must NEVER import from `features/B`. Features import only from `shared/` or the `app/` composition layer.
- If logic is needed by more than one feature, it moves to `shared/`.
