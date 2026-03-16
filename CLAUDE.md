# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm check` — lint + format check (Biome) — **run before committing**
- `pnpm format` — auto-fix formatting
- `pnpm lint` — lint only

## Architecture

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4.

**Routes:**
- `/` → `src/app/page.tsx` — home: code input + leaderboard preview
- `/components` → `src/app/components/page.tsx` — component gallery (dev only)

**Component layout:**
- `src/components/ui/` — reusable UI primitives (Button, Badge, Toggle, CodeBlock, AnalysisCard…)
- `src/components/` — domain/page-specific composites (LeaderboardRow, HomeOptionsRow, Navbar)

**Server vs Client:**
All components are RSC by default. Use `"use client"` only when needed (interactive state). `CodeBlock.Content` is an async RSC that calls Shiki.

## Design System

Tokens are defined as CSS custom properties in `src/app/globals.css` (`@theme` block) and consumed as Tailwind utility classes. Never use raw hex values or non-token classes for colors/fonts.

Key tokens: `bg-page`, `bg-surface`, `bg-input`, `bg-elevated`, `border-border`, `text-text-primary/secondary/tertiary`, `accent-green/amber/red`, `font-mono`, `font-sans`.

SVG inline properties (stroke, stop-color) must use `var(--color-*)` directly — no Tailwind class equivalent exists for these.

## Component Patterns

Full rules in `src/components/ui/PATTERNS.md`. Key points:

- **Named exports only** — never `export default`
- **Variants** → `tv()` from `tailwind-variants`; **no variants** → `twMerge()` from `tailwind-merge`; never interpolate className strings
- **Extend native props** via `ComponentProps<"element">` — never redefine native HTML attributes
- **Composition pattern** (for components with 2+ named sections) → `Object.assign`:

  ```tsx
  export const Foo = Object.assign(FooRoot, { Header: FooHeader, Body: FooBody })
  // <Foo><Foo.Header /><Foo.Body /></Foo>
  ```
  Current composite components: `CodeBlock`, `AnalysisCard`, `LeaderboardRow`
