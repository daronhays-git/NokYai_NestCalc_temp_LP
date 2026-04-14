# NestCalc.ai — Claude Code Guide

---

## Project Identity

- **Name:** NestCalc.ai
- **Tagline:** Custom AI Solutions For Your Business
- **Live URL:** https://nestcalc.ai/
- **Repository:** daronhays-git/NokYai_NestCalc_temp_LP
- **Current state:** v1 (live, v1.3.0)

---

## Critical Path

- **ONLY edit files under `src/`** — this is the active source root

---

## Architecture

- **Frontend entry:** `src/main.tsx`
- **Components:** `src/components/` — lazy-loaded sections: Hero, Services, Testimonials, TechStack, WhyNokYai, Contact, Footer
- **Styling approach:** Tailwind v4 utility classes — CSS custom properties in `src/styles/globals.css` `@theme` block
- **Animation stack:** Framer Motion (component animations) + GSAP/ScrollTrigger (scroll-driven, in `src/lib/animations.ts`) + Three.js/R3F (3D particle effects, in `src/components/effects/ParticleField.tsx`)
- **Dark-only design:** No light/dark mode switching — fixed dark green palette (`nok-deep: #0f2920` as page background)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend framework | React 19 (SPA) |
| Build tool | Vite 8 + TypeScript 5.9 |
| Hosting / deployment | Netlify |

---

## Dev Commands

- `npm run dev` — start local dev server
- `npm run build` — production build
- `git push origin main` — deploy to production (Netlify auto-deploys on push to main)

---

## File Structure and Module Boundaries

```
src/
  main.tsx                 — main application entry point
  components/              — extracted UI components (one file per component)
  hooks/                   — custom React hooks
  lib/                     — animations.ts, birdPaths.ts, constants.ts
  assets/                  — static assets
  styles/
    globals.css            — Tailwind v4 @theme block (authoritative token definitions)

public/                    — static files (images, robots.txt, sitemap.xml)
docs/                      — project documents
```

**Locked files** — do not modify without explicit review:
- `src/lib/birdPaths.ts` — NokYai Guardian Bird SVG path data; exact values are production-calibrated
- `src/styles/globals.css` — authoritative design token source; any change affects the entire design system

---

## Design System

- **Token reference:** `design-tokens.md` — all colors, typography, spacing, and component patterns
- **CSS approach:** Tailwind v4 utility classes
- **Theme structure:** Single dark-only theme — CSS custom properties in `src/styles/globals.css` `@theme` block
- **Font system:** `font-display` (Space Grotesk, weights 600/700), `font-body` (Outfit, weights 300/400/500/600)

---

## Coding Conventions

- **Component placement:** Components in dedicated files under `src/components/`; no component definitions inside other components
- **Hook rules:** All React hooks must come before any conditional returns
- **Import order:** React → third-party (framer-motion, gsap, three) → internal components → internal utils/lib → assets
- **State naming:** camelCase for useState vars; UPPER_SNAKE for module-level constants
- **Lazy loading:** All sections below the hero use `React.lazy` wrapped in `Suspense`
- **Animation init:** GSAP ScrollAnimations are initialized once in `App.tsx` — do not re-initialize in child components

---

## Environment Variables

No environment variables required for local development. Netlify Form submissions use the built-in Netlify Forms service. If adding integrations, prefix client-side variables with `VITE_`.

---

## Agent Configuration

Active agents for this project:

| Agent | Command | Reviews |
|-------|---------|---------|
| Shield | `/shield` | Code logic, security, architectural violations |
| Eagle | `/eagle` | UI components, design token compliance, accessibility |
| Scribe | `/scribe` | Documentation coverage, content accuracy |
| Lighthouse | `/lighthouse` | Performance, SEO, Core Web Vitals |
| Beacon | `/beacon` | User feedback triage and pattern detection |

Agent config files:
- `REVIEW.md` — review rules for Shield, Eagle, Scribe, and Lighthouse
- `feedback-log.md` — Beacon input; append user feedback here
- `design-tokens.md` — canonical design values; Eagle references this

---

## Known Issues / Active Decisions

- 2026-04-14 · `index.html` `<title>` reads "AI-Powered Real Estate Investment Tools" — stale from prior identity; update to match AI dev studio positioning
- 2026-04-14 · `tailwind.config.ts` declares `fontFamily.display: ['Syne']` but `globals.css @theme` sets `--font-display: 'Space Grotesk'` — globals.css is authoritative for Tailwind v4; the config.ts declaration is inactive
- 2026-04-14 · `src/lib/constants.ts` contains only a TODO comment — needs real content values
