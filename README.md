# NokYai.com Landing Page

**Version:** V1.2  
**Status:** Deployed — contact form working, pending responsive polish  
**Branch:** main  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Commit:** 38b5c73  
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
- Netlify Forms (contact form submissions)
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
│   ├── lib/               animations.ts, constants.ts, birdPaths.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── tailwind.config.ts
├── vite.config.ts
├── netlify.toml
└── package.json
```

## Color Palette

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

## Git Remote

Single remote — `origin` points to `NokYai_NestCalc_temp_LP`:
```bash
git remote -v
# origin  https://github.com/daronhays-git/NokYai_NestCalc_temp_LP.git
```

## Build & Deploy

```bash
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
git push origin main # Auto-deploys to Netlify
```

## Critical Rules

- One change per Claude Code prompt
- Verify on localhost after every change
- Do not modify fonts (Syne + Outfit locked in)
- Do not change section order or component structure
- Do not change the color palette
- Always push to origin (NokYai_NestCalc_temp_LP)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Contact form goes to spam | Use realistic content + different email addresses for testing |
| mailto: link doesn't open | User has no default mail app — clipboard copy fallback handles this |
| Pushing to wrong repo | Run `git remote -v` to verify origin before pushing |
