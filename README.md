# NokYai.com Landing Page

**Version:** V1.0  
**Status:** Initial build complete — pending color re-skin  
**Branch:** main  
**Dev Server:** http://localhost:5174  

---

## Quick Start

```bash
cd C:\Users\daron\dev3\nokyai-lp
npm run dev
```

## Tech Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3.4 (custom design tokens)
- Framer Motion (component animations)
- GSAP + ScrollTrigger (scroll-driven animations)
- 2D Canvas particle system (custom, mouse-reactive)
- Google Fonts: Syne (display) + Outfit (body)

## File Structure

```
nokyai-lp/
├── src/
│   ├── components/
│   │   ├── layout/        Navbar.tsx, Footer.tsx
│   │   ├── sections/      Hero, Services, CaseStudies, Process,
│   │   │                  Testimonials, TechStack, WhyNokYai,
│   │   │                  CTABand, Contact, LogoBar
│   │   ├── ui/            MagneticButton, GlowCard, SectionHeading,
│   │   │                  CustomCursor, ScrollProgress
│   │   └── effects/       ParticleField, GradientMesh, NoiseOverlay
│   ├── styles/globals.css
│   ├── lib/               animations.ts, constants.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Color Palette (Target — V1.1)

| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNokYai, Footer bg |
| nok-forest | #1a3a2a | LogoBar, Cases, Testimonials bg |
| nok-medium | #2d5a42 | Services, Process, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |

## Build & Deploy

```bash
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
```

Netlify deployment pending — will auto-deploy from main branch.

## Critical Rules

- One change per Claude Code prompt
- Verify on localhost after every change
- Do not modify fonts (Syne + Outfit locked in)
- Do not change section order or component structure
- Inline animations only — no external animation libraries beyond Framer Motion + GSAP
