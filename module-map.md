# NestCalc LP — Module Map

Architecture inventory for the NestCalc.ai landing page. Used by Shield, Eagle, and Scribe to understand file boundaries and dependencies.

---

## Directory Structure

```
nokyai-lp/
├── index.html                          — Entry HTML: meta/OG/Twitter tags, fonts, JSON-LD
├── src/
│   ├── main.tsx                        — React 19 app mount point
│   ├── App.tsx                         — Root layout, lazy section loading, GSAP init
│   ├── App.css                         — App-level base styles
│   ├── index.css                       — Global reset / base
│   │
│   ├── styles/
│   │   └── globals.css                 — ★ LOCKED: Tailwind v4 @theme block, all design tokens
│   │
│   ├── components/
│   │   ├── sections/                   — Lazy-loaded page sections (one component per section)
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── TechStack.tsx
│   │   │   ├── WhyNestCalc.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── CTABand.tsx
│   │   │   ├── CaseStudies.tsx
│   │   │   ├── Process.tsx
│   │   │   └── LogoBar.tsx
│   │   │
│   │   ├── layout/                     — Always-present frame components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx             — Includes legal modal triggers + copyright
│   │   │
│   │   ├── ui/                         — Reusable primitive components
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── GlowCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   └── SectionHeading.tsx
│   │   │
│   │   ├── effects/                    — Visual-only Three.js / WebGL components
│   │   │   ├── GradientMesh.tsx       — R3F mesh; takes raw hex color props (documented exception)
│   │   │   ├── NoiseOverlay.tsx
│   │   │   └── ParticleField.tsx      — Three.js particle system
│   │   │
│   │   └── legal/                     — Modal-rendered legal pages
│   │       ├── LegalModal.tsx         — Modal wrapper
│   │       ├── PrivacyPolicy.tsx
│   │       ├── TermsOfService.tsx
│   │       └── Disclaimer.tsx
│   │
│   ├── hooks/
│   │   ├── useInView.ts
│   │   ├── useMousePosition.ts
│   │   └── useScrollProgress.ts
│   │
│   ├── lib/
│   │   ├── animations.ts              — GSAP ScrollTrigger animations; init in App.tsx only
│   │   ├── birdPaths.ts               — ★ LOCKED: Guardian Bird SVG path data
│   │   └── constants.ts              — Module-level constants (currently empty — TODO)
│   │
│   └── assets/
│       └── nestcalc-logo-gold-green.png
│
└── public/
    ├── robots.txt
    └── sitemap.xml
```

---

## Module Dependencies

| Consumer | Depends On | Notes |
|----------|-----------|-------|
| `sections/*` | `ui/GlowCard`, `ui/MagneticButton`, `ui/SectionHeading` | Shared primitives |
| `sections/*` | `effects/GradientMesh`, `effects/ParticleField` | Visual overlays |
| `sections/*` | `hooks/useInView`, `hooks/useMousePosition` | Scroll + pointer state |
| `layout/Footer` | `legal/LegalModal`, `legal/PrivacyPolicy`, `legal/TermsOfService`, `legal/Disclaimer` | Modal triggers |
| `layout/Navbar` | `lib/constants.ts` | Nav link data |
| `effects/*` | `lib/birdPaths.ts` | Bird SVG path data |
| `App.tsx` | `lib/animations.ts` | GSAP init (once at root — do not re-init in children) |

---

## Locked Files

Do not modify these without explicit review:

| File | Reason |
|------|--------|
| `src/lib/birdPaths.ts` | Guardian Bird SVG path data; exact values are production-calibrated |
| `src/styles/globals.css` | Authoritative design token source; any change affects the entire design system |

---

## Isolation Notes

- Each `sections/` component is independently lazy-loaded in `App.tsx` via `React.lazy` + `Suspense`
- `legal/` modals are self-contained — no external data dependencies
- `effects/` components are visual-only — no business logic, no state outside animation
- GSAP ScrollAnimations are initialized once in `App.tsx` — do not re-initialize in child components
- `lib/birdPaths.ts` is read-only — edit only with design approval

---

## Not Present (Single-Page LP — Not Applicable)

- No `pages/` directory — SPA with no client-side routing
- No backend / serverless functions
- No API routes
- No test files
- No methodology, blog, or content pages
