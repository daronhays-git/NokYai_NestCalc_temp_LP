# NokYai LP — Document Inventory

Tracks which source files are covered by which documentation. Used by Scribe to detect stale docs after code changes.

**Last verified:** 2026-04-14

---

## Entry HTML

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `index.html` | Entry HTML: meta/OG tags, Twitter Card, fonts, JSON-LD | `CLAUDE.md`, `lighthouse.md` (Steps 1–5) | 2026-04-14 |

---

## Root Source Files

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `src/main.tsx` | React app mount point | `CLAUDE.md` (Architecture) | 2026-04-14 |
| `src/App.tsx` | Root layout, lazy section loading, GSAP init | `CLAUDE.md` (Architecture), `module-map.md` | 2026-04-14 |
| `src/styles/globals.css` | Tailwind v4 `@theme`, all design tokens | `design-tokens.md`, `CLAUDE.md` (Design System) | 2026-04-14 |

---

## Section Components (`src/components/sections/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `Hero.tsx` | Primary hero section, animated headline | `module-map.md`, `design-tokens.md` | 2026-04-14 |
| `Services.tsx` | Services/offerings section | `module-map.md` | 2026-04-14 |
| `TechStack.tsx` | Technology stack display | `module-map.md` | 2026-04-14 |
| `WhyNokYai.tsx` | Value proposition / differentiators | `module-map.md`, `lighthouse.md` (Step 12) | 2026-04-14 |
| `Testimonials.tsx` | Client testimonials | `module-map.md` | 2026-04-14 |
| `Contact.tsx` | Contact form (Netlify Forms) | `module-map.md`, `REVIEW.md` (handleSubmit guard) | 2026-04-14 |
| `CTABand.tsx` | Call-to-action banner | `module-map.md` | 2026-04-14 |
| `CaseStudies.tsx` | Client case study summaries | `module-map.md` | 2026-04-14 |
| `Process.tsx` | Engagement process steps | `module-map.md` | 2026-04-14 |
| `LogoBar.tsx` | Client logo bar | `module-map.md` | 2026-04-14 |

---

## Layout Components (`src/components/layout/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `Navbar.tsx` | Site navigation | `module-map.md` | 2026-04-14 |
| `Footer.tsx` | Footer, legal modal triggers, copyright | `module-map.md`, `lighthouse.md` (Steps 13–14), `design-tokens.md` (exceptions) | 2026-04-14 |

---

## UI Components (`src/components/ui/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `CustomCursor.tsx` | Custom pointer cursor | `module-map.md` | 2026-04-14 |
| `GlowCard.tsx` | Glowing card container primitive | `module-map.md`, `design-tokens.md` | 2026-04-14 |
| `MagneticButton.tsx` | Magnetic hover button | `module-map.md`, `design-tokens.md` | 2026-04-14 |
| `ScrollProgress.tsx` | Scroll progress indicator | `module-map.md` | 2026-04-14 |
| `SectionHeading.tsx` | Reusable section heading | `module-map.md`, `design-tokens.md` | 2026-04-14 |

---

## Effects (`src/components/effects/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `GradientMesh.tsx` | Three.js/R3F gradient mesh overlay | `module-map.md`, `lessons.md` (FP-001 hex exception) | 2026-04-14 |
| `NoiseOverlay.tsx` | Noise texture overlay | `module-map.md` | 2026-04-14 |
| `ParticleField.tsx` | Three.js particle system | `module-map.md` | 2026-04-14 |

---

## Legal (`src/components/legal/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `LegalModal.tsx` | Modal wrapper for legal pages | `module-map.md` | 2026-04-14 |
| `PrivacyPolicy.tsx` | Privacy Policy content | `module-map.md`, `lighthouse.md` (EEAT) | 2026-04-14 |
| `TermsOfService.tsx` | Terms of Service content | `module-map.md`, `lighthouse.md` (EEAT) | 2026-04-14 |
| `Disclaimer.tsx` | Disclaimer content | `module-map.md`, `lighthouse.md` (EEAT) | 2026-04-14 |

---

## Hooks (`src/hooks/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `useInView.ts` | Intersection Observer hook | `module-map.md` | 2026-04-14 |
| `useMousePosition.ts` | Mouse position tracker | `module-map.md` | 2026-04-14 |
| `useScrollProgress.ts` | Scroll progress calculator | `module-map.md` | 2026-04-14 |

---

## Lib (`src/lib/`)

| File | Type | Covered By | Last Verified |
|------|------|------------|---------------|
| `animations.ts` | GSAP ScrollTrigger animation definitions | `CLAUDE.md` (Animation init rule), `module-map.md` | 2026-04-14 |
| `birdPaths.ts` | NokYai Guardian Bird SVG path data (locked) | `CLAUDE.md` (Locked files), `module-map.md` | 2026-04-14 |
| `constants.ts` | Module-level constants (currently empty) | `CLAUDE.md` (Known Issues) | 2026-04-14 |

---

## Config / Agent Files

| File | Covered By | Last Verified |
|------|------------|---------------|
| `CLAUDE.md` | Self-documenting | 2026-04-14 |
| `REVIEW.md` | Self-documenting | 2026-04-14 |
| `design-tokens.md` | Self-documenting | 2026-04-14 |
| `lessons.md` | This file | 2026-04-14 |
| `feedback-log.md` | This file | 2026-04-14 |
| `module-map.md` | This file | 2026-04-14 |
| `docs/doc-inventory.md` | Self-documenting | 2026-04-14 |

---

## Public Files

| File | Covered By | Last Verified |
|------|------------|---------------|
| `public/robots.txt` | `lighthouse.md` (Step 3) | 2026-04-14 |
| `public/sitemap.xml` | `lighthouse.md` (Step 4) | 2026-04-14 |

---

## Known Gaps

- No methodology page — LP only, not applicable
- No blog or content pages — LP only, not applicable
- No API docs — no backend
- Legal pages are modal-rendered (not standalone HTML) — crawlers cannot index them; tracked as EEAT gap in `lighthouse.md`
