# NestCalc LP — Claude Code Guide

---

## Project Identity

- **Project name:** NestCalc LP
- **Brand / tagline:** NestCalc.ai — Custom AI Solutions For Your Business
- **Live URL:** https://nestcalc.ai/
- **Repository:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
- **Branch:** main
- **Deploy:** Netlify — auto-deploys on push to `main`
- **Package name:** `nestcalc-lp` (v1.3.0)

---

## Dev Commands

```bash
npm run dev        # start local dev server (localhost:5173)
npm run build      # tsc -b && vite build
npm run preview    # preview production build locally
npm run lint       # ESLint check
git push origin main  # triggers Netlify production deploy
```

---

## Tech Stack

| Layer | Library | Version |
|-------|---------|---------|
| UI framework | React | 19.2.4 |
| Build tool | Vite | 8.0.1 |
| Language | TypeScript | 5.9.3 |
| CSS framework | Tailwind CSS | 4.2.2 |
| Component animation | Framer Motion | 12.38.0 |
| Scroll animation | GSAP + ScrollTrigger | 3.14.2 |
| 3D / mesh effects | Three.js + @react-three/fiber + @react-three/drei | 0.183.2 |
| Hosting | Netlify | — |

**CSS approach:** Tailwind v4 CSS-first — design tokens are defined in the `@theme` block in `src/styles/globals.css`. The `tailwind.config.ts` file exists for color palette and font overrides but `globals.css` is the single authoritative source.

**Font setup:**
- Loaded via Google Fonts in `index.html` (preconnect + preload)
- `Space Grotesk` weights 600, 700 → `font-display` utility class
- `Outfit` weights 300, 400, 500, 600 → `font-body` utility class
- `main.tsx` listens to `document.fonts.ready`, then adds `.loaded` class to `<body>` which triggers the page fade-in (body starts at `opacity: 0`)

---

## File Structure

```
src/
  main.tsx                       — React entry point; font-load trigger
  App.tsx                        — Root component; lazy section loading; GSAP init

  components/
    layout/
      Navbar.tsx                 — Sticky header; mobile menu; IntersectionObserver active link
      Footer.tsx                 — 4-col grid; legal modal triggers; brand block

    sections/
      Hero.tsx                   — Above-fold; eager loaded; ParticleField + GradientMesh
      Services.tsx               — 4 service cards (lazy)
      TechStack.tsx              — Infinite marquee carousel (lazy)
      WhyNestCalc.tsx              — 3 differentiator cards; exports WhyNestCalc (lazy)
      Testimonials.tsx           — Placeholder section; coming soon (lazy)
      Contact.tsx                — Netlify form; email copy; status states (lazy)

    effects/
      ParticleField.tsx          — Canvas 2D particle system + Guardian Bird mascot (628 lines)
      GradientMesh.tsx           — Three.js/R3F animated gradient blobs
      NoiseOverlay.tsx           — Full-screen SVG noise texture overlay

    ui/
      GlowCard.tsx               — 3D tilt + gradient glow card wrapper
      MagneticButton.tsx         — Magnetic pull button; renders <a> or <button>
      SectionHeading.tsx         — h2 + accent line + optional subtitle
      CustomCursor.tsx           — Custom dot/ring cursor; desktop only
      ScrollProgress.tsx         — Top fixed gold-to-teal progress bar

    legal/
      LegalModal.tsx             — Framer Motion full-screen modal wrapper
      PrivacyPolicy.tsx          — PrivacyPolicyContent JSX fragment
      TermsOfService.tsx         — TermsOfServiceContent JSX fragment
      Disclaimer.tsx             — DisclaimerContent JSX fragment

  hooks/
    useMousePosition.ts          — window mousemove → { x, y }
    useScrollProgress.ts         — scroll position → number 0–1
    useInView.ts                 — IntersectionObserver → { ref, inView }

  lib/
    animations.ts                — initScrollAnimations() + cleanupScrollAnimations() via GSAP
    birdPaths.ts                 — BIRD_PATHS string[] + BIRD_BOUNDS (SVG path data — DO NOT EDIT)

  assets/
    nestcalc-logo-gold-green.png   — Primary logo (optimized, ~21KB)

  styles/
    globals.css                  — @theme block (authoritative), base styles, keyframes

public/
  favicon.svg / favicon.png / apple-touch-icon.png
  og-image.png                   — 1200×630 Open Graph image
  robots.txt / sitemap.xml
```

---

## Component Patterns

**Lazy loading:** All sections below Hero use `React.lazy` wrapped in `<Suspense fallback={null}>` in `App.tsx`. Hero and layout components (Navbar, CustomCursor, ScrollProgress, NoiseOverlay) are eagerly loaded.

**Section structure:** Each section is a named export from a single `.tsx` file. Section-specific subcomponents (e.g. `TechCard` in TechStack, `FooterLinks` in Footer) are defined in the same file. No cross-file subcomponent sharing.

**Naming convention:** Files use PascalCase. Function names match exports.

**Section IDs** (used by Navbar IntersectionObserver and anchor links):
- `#hero`, `#solutions`, `#ourtech`, `#trust`, `#whynestcalc`, `#contactus`

**GlowCard:** Reusable wrapper providing 3D tilt + gradient glow on hover. Used in Services, TechStack, WhyNestCalc. Accepts optional `glowColor` prop (default: `#F59E0B`).

**MagneticButton:** Renders `<a>` when `href` prop is present, `<button>` otherwise. Magnetic pull radius is 100px. Used in Navbar CTA and Hero CTAs. Add `cursor-hover` class to any element that should trigger the custom cursor ring expansion.

---

## Animation Patterns

| Library | Where used | How triggered |
|---------|-----------|---------------|
| Framer Motion | Navbar mobile menu, Hero elements, Services cards, WhyNestCalc cards, Contact form, LegalModal | `whileInView`, `AnimatePresence`, `motion.*` props |
| GSAP ScrollTrigger | Batch scroll reveals across all sections | `initScrollAnimations()` called once in `App.tsx` useEffect |
| CSS keyframes | TechStack marquee, hero glow, gradient mesh drift | `globals.css` keyframes + Tailwind `animate-[]` utilities |
| Canvas 2D (custom) | ParticleField — particles + bird mascot | `requestAnimationFrame` loop; desktop only (120 particles) |
| Three.js / R3F | GradientMesh — 3 animated gradient blobs | `useFrame` loop inside R3F canvas |

**GSAP scroll classes:**
- `.reveal-section` — triggers fade-up (opacity 0→1, y: 40→0) when top of element hits 80% viewport height; fires once
- `.stagger-children` — staggers direct children with 0.1s delay each

**Animation init rule:** `initScrollAnimations()` is called exactly once in `App.tsx`. Never call it inside child components.

---

## Coding Rules

**TypeScript:** Strict mode enabled. `noUnusedLocals` and `noUnusedParameters` are both true. All code must pass `tsc -b` before building.

**Tailwind:** Utility-first throughout. Inline `style` props are only acceptable for dynamic values that cannot be expressed as Tailwind classes (e.g. `transform: rotateX(${x}deg)`, SVG path data, computed positions). No static design values in inline styles.

**Import order:** React → third-party (framer-motion, gsap, three) → internal components → hooks/lib → assets.

**State naming:** `camelCase` for `useState` variables; `UPPER_SNAKE_CASE` for module-level constants.

**Hooks:** All React hooks must appear before any conditional returns.

**Component isolation:** One component per file. No component definitions nested inside another component's function body.

**Environment variables:** None required for local dev. Netlify Forms handles contact submissions natively. Prefix any future client-side variables with `VITE_`.

---

## What Not to Modify

| File / Pattern | Reason |
|---------------|--------|
| `src/lib/birdPaths.ts` | Production-calibrated SVG path data for the canvas bird mascot. Wrong values break the bird rendering silently. |
| `src/styles/globals.css` @theme block | Single source of truth for every design token. Changing a value here changes it everywhere. Coordinate with design-tokens.md before editing. |
| `src/components/effects/ParticleField.tsx` | 628-line canvas animation with per-frame physics, Path2D rendering, and button-ref tracking. Highly fragile — test thoroughly on desktop before and after any change. |
| `index.html` hidden Netlify form | The `<form name="contact" data-netlify="true">` block is required for Netlify to detect and wire the form at build time. Do not remove or rename it. |
| Section `id` attributes | Navbar IntersectionObserver and all anchor links depend on exact ID strings. Renaming breaks navigation. |
| `vite.config.ts` manual chunks | three-vendor and animation-vendor chunk splitting is intentional for load performance. Do not collapse into a single bundle. |

---

## Agent Configuration

| Agent | Command | Reviews |
|-------|---------|---------|
| Shield | `/shield` | Code logic, security, architectural violations |
| Eagle | `/eagle` | UI components, design token compliance, accessibility |
| Scribe | `/scribe` | Documentation coverage, content accuracy |
| Lighthouse | `/lighthouse` | Performance, SEO, Core Web Vitals |
| Beacon | `/beacon` | User feedback triage and pattern detection |

Agent config files:
- `REVIEW.md` — review rules for Shield, Eagle, Scribe, and Lighthouse
- `design-tokens.md` — canonical design values; Eagle references this
- `feedback-log.md` — Beacon input; append user feedback entries here

---

## Known Issues / Active Decisions

- **2026-04-14** · `index.html` `<title>` reads "AI-Powered Real Estate Investment Tools" — stale from prior product identity; needs updating to reflect AI dev studio positioning
- **2026-04-14** · Legal content (PrivacyPolicy, Terms, Disclaimer) references the old NestCalc real estate product (Supabase, Stripe, property analysis tiers) — needs full rewrite for AI services agency
