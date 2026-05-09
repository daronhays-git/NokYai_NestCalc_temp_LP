# NestCalc LP — File Inventory

Every file in the repository with a one-line purpose note. Grouped by directory. Excludes `node_modules/`, `.git/`, and `dist/`.

**Last updated:** 2026-04-15

---

## Project Root

| File | Purpose |
|------|---------|
| `index.html` | SPA entry; meta/OG/Twitter tags, Google Fonts preload, Netlify hidden form, JSON-LD placeholder |
| `package.json` | npm dependencies and scripts (authoritative version reference) |
| `package-lock.json` | Lock file for reproducible installs |
| `vite.config.ts` | Vite build config; three-vendor and animation-vendor manual chunk splitting |
| `tailwind.config.ts` | Tailwind v4 color palette and font family overrides (supplementary to globals.css) |
| `tsconfig.json` | TypeScript project references root |
| `tsconfig.app.json` | TypeScript config for app source (`src/`) |
| `tsconfig.node.json` | TypeScript config for build tooling (`vite.config.ts`) |
| `eslint.config.js` | ESLint flat config |
| `netlify.toml` | Netlify deploy configuration |
| `.gitignore` | Git ignore rules |
| `CLAUDE.md` | Authoritative project guide for Claude Code agents; dev conventions, file structure, coding rules |
| `REVIEW.md` | Review rules and enforcement checklist for Shield, Eagle, Scribe, and Lighthouse agents |
| `design-tokens.md` | Canonical design token values (colors, typography, spacing, component patterns); Eagle references this |
| `lessons.md` | Review false-positive log (FP-XXX entries); prevents repeat false flags |
| `feedback-log.md` | Beacon input; append user feedback entries here |
| `module-map.md` | Architecture inventory; component dependencies, locked files, isolation notes |
| `README.md` | Quick-start reference; tech stack, file structure, color palette, critical rules |
| `SETUP.md` | Setup and onboarding instructions |
| `doc-inventory.md` | This file — complete per-file catalog of every file in the repo |
| `NokYai-Roadmap.md` | Product roadmap |
| `NokYai-logo-simplified-version.dxf` | Logo DXF vector file for fabrication or print use |

---

## Handoff Files (Historical Snapshots)

These files were accurate at the time of writing. They are not maintained; treat as read-only version archives.

| File | Purpose |
|------|---------|
| `NokYai-V1.1-Handoff.md` | v1.1 version handoff snapshot |
| `NokYai-V1_2-Handoff.md` | v1.2 version handoff snapshot |
| `NokYai-V1.3-Handoff.md` | v1.3 version handoff snapshot |
| `NokYai-V1.4.0-Handoff.md` | v1.4.0 version handoff snapshot |

---

## `.claude/`

| File | Purpose |
|------|---------|
| `.claude/settings.json` | Claude Code project settings (committed) |
| `.claude/settings.local.json` | Local Claude Code settings overrides (gitignored) |

### `.claude/agents/`

| File | Purpose |
|------|---------|
| `.claude/agents/shield.md` | Shield subagent definition — read-only code and security review |

### `.claude/commands/`

| File | Purpose |
|------|---------|
| `.claude/commands/beacon-rules.md` | Beacon triage classification rules and scoring thresholds |
| `.claude/commands/beacon.md` | `/beacon` — user feedback triage and pattern detection |
| `.claude/commands/changelog.md` | `/changelog` — generate a formatted changelog entry |
| `.claude/commands/dep-audit.md` | `/dep-audit` — dependency version and vulnerability audit |
| `.claude/commands/eagle.md` | `/eagle` — design and UI/UX review (11 steps) |
| `.claude/commands/finance.md` | `/finance` — financial metrics and cost review |
| `.claude/commands/foundation.md` | `/foundation` — project foundation and config review |
| `.claude/commands/handoff.md` | `/handoff` — generate a versioned handoff document |
| `.claude/commands/launch-gate.md` | `/launch-gate` — pre-launch readiness checklist |
| `.claude/commands/launch-status.md` | `/launch-status` — current launch readiness summary |
| `.claude/commands/lighthouse.md` | `/lighthouse` — SEO, AEO, EEAT, and Core Web Vitals audit |
| `.claude/commands/review-all.md` | `/review-all` — run Shield, Eagle, Lighthouse, and Scribe in sequence |
| `.claude/commands/scribe.md` | `/scribe` — documentation staleness review (11 steps) |
| `.claude/commands/shield.md` | `/shield` — code logic, security, and architectural review (9 steps) |

### `.claude/skills/`

| File | Purpose |
|------|---------|
| `.claude/skills/eagle-auto.md` | Eagle auto-review skill definition for automated design checks |

---

## `.github/workflows/`

| File | Purpose |
|------|---------|
| `.github/workflows/claude.yml` | Claude Code action base workflow (PR-triggered code review) |
| `.github/workflows/shield.yml` | Shield code review CI — triggers on push to main, creates GitHub Issues |
| `.github/workflows/eagle.yml` | Eagle design review CI — triggers on push to main, creates GitHub Issues |
| `.github/workflows/lighthouse.yml` | Lighthouse CI performance/SEO gating — triggers on push to main, creates regression issues |
| `.github/workflows/scribe.yml` | Scribe documentation staleness CI — triggers on push to main |
| `.github/workflows/review-all.yml` | Runs Shield, Eagle, Scribe, and Lighthouse agents in sequence |
| `.github/workflows/beacon-intake.yml` | Beacon feedback intake — triage and log incoming user feedback |
| `.github/workflows/finance.yml` | Finance metrics workflow |

---

## `public/`

| File | Purpose |
|------|---------|
| `public/favicon.svg` | SVG favicon (eagle/NestCalc logo) |
| `public/favicon.png` | 48×48 PNG favicon |
| `public/apple-touch-icon.png` | 180×180 iOS home screen icon |
| `public/og-image.png` | 1200×630 Open Graph social share image |
| `public/icons.svg` | SVG icon sprite |
| `public/robots.txt` | Search crawler rules |
| `public/sitemap.xml` | XML sitemap for search indexing |
| `public/form.html` | Standalone Netlify form test/backup page |

---

## `src/`

| File | Purpose |
|------|---------|
| `src/main.tsx` | React 19 app mount point; `document.fonts.ready` trigger for body fade-in |
| `src/App.tsx` | Root component; lazy section loading via React.lazy + Suspense; GSAP init |
| `src/styles/globals.css` | **LOCKED** — Tailwind v4 `@theme` block (authoritative design tokens); keyframes; base styles |

### `src/assets/`

| File | Purpose |
|------|---------|
| `src/assets/nestcalc-logo-gold-green.png` | Primary brand logo — gold + green variant (~21KB, optimized) |

### `src/components/layout/`

| File | Purpose |
|------|---------|
| `src/components/layout/Navbar.tsx` | Sticky header; mobile hamburger menu; IntersectionObserver active link highlighting |
| `src/components/layout/Footer.tsx` | 4-column grid; legal modal triggers; copyright and brand block |

### `src/components/sections/`

All sections below Hero are lazy-loaded via `React.lazy` in `App.tsx`.

| File | Purpose |
|------|---------|
| `src/components/sections/Hero.tsx` | Above-fold hero; eager-loaded; hosts ParticleField + GradientMesh |
| `src/components/sections/Services.tsx` | 4 service offering cards with GlowCard wrappers |
| `src/components/sections/TechStack.tsx` | Infinite marquee carousel of technology logos |
| `src/components/sections/WhyNestCalc.tsx` | 3 differentiator cards; exports as `WhyNestCalc` |
| `src/components/sections/Testimonials.tsx` | Client testimonials placeholder ("coming soon") |
| `src/components/sections/Contact.tsx` | Netlify form with email copy fallback and status states |

### `src/components/effects/`

Visual-only components; no business logic.

| File | Purpose |
|------|---------|
| `src/components/effects/ParticleField.tsx` | **FRAGILE** — Canvas 2D particle system + Guardian Bird mascot animation (628 lines) |
| `src/components/effects/GradientMesh.tsx` | Three.js / R3F animated gradient blobs; uses raw hex color props (documented exception) |
| `src/components/effects/NoiseOverlay.tsx` | Full-screen SVG noise texture overlay |

### `src/components/ui/`

Reusable primitive components shared across sections.

| File | Purpose |
|------|---------|
| `src/components/ui/GlowCard.tsx` | 3D tilt card with gradient glow on hover; accepts optional `glowColor` prop |
| `src/components/ui/MagneticButton.tsx` | Magnetic pull button; renders `<a>` when `href` present, `<button>` otherwise |
| `src/components/ui/SectionHeading.tsx` | `<h2>` + gold accent bar + optional subtitle |
| `src/components/ui/CustomCursor.tsx` | Custom dot/ring cursor; desktop only |
| `src/components/ui/ScrollProgress.tsx` | Top-fixed gold-to-teal scroll progress bar |

### `src/components/legal/`

Modal-rendered legal pages (not standalone HTML; not crawlable).

| File | Purpose |
|------|---------|
| `src/components/legal/LegalModal.tsx` | Framer Motion full-screen modal wrapper for all legal content |
| `src/components/legal/PrivacyPolicy.tsx` | Privacy Policy content (stale — references old NestCalc real estate product) |
| `src/components/legal/TermsOfService.tsx` | Terms of Service content (stale — references old product) |
| `src/components/legal/Disclaimer.tsx` | Disclaimer content (stale — references old product) |

### `src/hooks/`

| File | Purpose |
|------|---------|
| `src/hooks/useMousePosition.ts` | Tracks `window` mousemove events → returns `{ x, y }` |
| `src/hooks/useScrollProgress.ts` | Tracks scroll position → returns number 0–1 |
| `src/hooks/useInView.ts` | IntersectionObserver wrapper → returns `{ ref, inView }` |

### `src/lib/`

| File | Purpose |
|------|---------|
| `src/lib/animations.ts` | `initScrollAnimations()` and `cleanupScrollAnimations()` via GSAP ScrollTrigger; called once in App.tsx |
| `src/lib/birdPaths.ts` | **LOCKED** — `BIRD_PATHS` string array + `BIRD_BOUNDS` (production-calibrated SVG path data for canvas bird mascot) |

---

## `docs/`

| File | Purpose |
|------|---------|
| `docs/doc-inventory.md` | Source file coverage matrix; maps each file to the documentation that covers it; used by Scribe |
| `docs/nestcalc-review-stack-ops-guide.md` | Operations guide for the NestCalc CI review stack (Shield, Eagle, Lighthouse, Scribe) |
| `docs/reports/agent-baseline-2026-04-15.md` | Consolidated agent review baseline (Shield/Eagle/Lighthouse/Scribe) as of 2026-04-15 |
