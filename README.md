# NokYai.com Landing Page

**Version:** V1.1  
**Status:** Re-skin complete + Guardian Bird feature — pending responsive polish + deploy  
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
- Path2D canvas eagle (Guardian Bird — cursor-following, button-aware)
- Google Fonts: Syne (display) + Outfit (body)

## File Structure

```
nokyai-lp/
├── src/
│   ├── assets/            NokYai-logo.svg (simplified geometric eagle)
│   ├── components/
│   │   ├── layout/        Navbar.tsx, Footer.tsx
│   │   ├── sections/      Hero, Services, CaseStudies, Process,
│   │   │                  Testimonials, TechStack, WhyNokYai,
│   │   │                  CTABand, Contact, LogoBar
│   │   ├── ui/            MagneticButton, GlowCard, SectionHeading,
│   │   │                  CustomCursor, ScrollProgress
│   │   └── effects/       ParticleField, GradientMesh, NoiseOverlay
│   ├── styles/globals.css
│   ├── lib/               animations.ts, constants.ts, birdPaths.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

## Color Palette (Implemented)

| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNokYai, Footer bg |
| nok-forest | #1a3a2a | LogoBar, Cases, Testimonials bg |
| nok-medium | #2d5a42 | Services, Process, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights, bird stroke |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |

## Guardian Bird

The hero section features an interactive geometric eagle rendered as a gold outlined stroke on the particle field canvas. The bird follows the cursor with momentum-based flight physics, mirrors when flying left, leaves a gold particle trail, and reacts to CTA button hover with glow/pulse effects. It uses Path2D objects built from SVG path data in `src/lib/birdPaths.ts`.

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
- Do not modify bird flight physics without testing all states (idle, flying, returning, button hover)
- Inline animations only — no external animation libraries beyond Framer Motion + GSAP
