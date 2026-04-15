# NokYai.com Landing Page

**Version:** V1.4.0  
**Status:** Deployed — agent fixes applied, Lighthouse 99/94/100/100, pending content replacement  
**Branch:** main  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Commit:** 198782e  
**Dev Server:** http://localhost:5173  

---

## Quick Start

```bash
cd C:\Users\daron\dev3\nokyai-lp
npm run dev
```

## Tech Stack

- Vite + React 19 + TypeScript
- Tailwind CSS 4 (CSS-first @theme tokens)
- Framer Motion (component animations)
- GSAP + ScrollTrigger (scroll-driven animations)
- 2D Canvas particle system (custom, mouse-reactive)
- Netlify Forms (contact form submissions)
- Google Fonts: Space Grotesk (display) + Outfit (body)
- Agent stack: Shield, Eagle, Lighthouse, Scribe (CI via GitHub Actions)

## File Structure

```
nokyai-lp/
├── src/
│   ├── components/
│   │   ├── layout/        Navbar.tsx, Footer.tsx
│   │   ├── sections/      Hero, Services, Testimonials,
│   │   │                  TechStack, WhyNokYai, Contact
│   │   ├── ui/            MagneticButton, GlowCard, SectionHeading,
│   │   │                  CustomCursor, ScrollProgress
│   │   ├── effects/       ParticleField, GradientMesh, NoiseOverlay
│   │   └── legal/         LegalModal, PrivacyPolicy, TermsOfService,
│   │                      Disclaimer
│   ├── assets/            NokYai-logo-gold-green.png (primary logo)
│   ├── styles/globals.css
│   ├── lib/               animations.ts, birdPaths.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── public/
│   ├── favicon.svg        Eagle favicon
│   ├── favicon.png        48x48 PNG version
│   ├── apple-touch-icon.png  180x180 iOS icon
│   ├── og-image.png       1200x630 OG image
│   ├── robots.txt
│   └── sitemap.xml
├── .claude/
│   ├── commands/          shield.md, eagle.md, lighthouse.md, scribe.md
│   ├── agents/
│   └── skills/
├── .github/workflows/     shield.yml, eagle.yml, lighthouse.yml,
│                          scribe.yml, review-all.yml
├── docs/reports/          agent-baseline-2026-04-15.md
├── CLAUDE.md
├── REVIEW.md
├── design-tokens.md
├── CHANGELOG.md
├── doc-inventory.md
├── tailwind.config.ts
├── vite.config.ts
├── netlify.toml
└── package.json
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNokYai, Footer bg |
| nok-forest | #1a3a2a | TechStack, Testimonials bg |
| nok-medium | #2d5a42 | Services, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |

## Agent Stack

| Agent | Trigger | Purpose |
|-------|---------|---------|
| Shield | PR to main | Code quality + security review |
| Eagle | PR to main | Design + accessibility review |
| Lighthouse | Push to main | SEO, performance, EEAT |
| Scribe | PR to main | Documentation staleness |
| Review-All | PR to main | Orchestrates all PR agents |

Manual: run `/shield`, `/eagle`, `/lighthouse`, `/scribe` in Claude Code.

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
- Do not modify fonts (Space Grotesk + Outfit locked in)
- Do not change section order or component structure
- Do not change the color palette
- Always push to origin (NokYai_NestCalc_temp_LP)

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Contact form goes to spam | Use realistic content + different email addresses for testing |
| mailto: link doesn't open | User has no default mail app — clipboard copy fallback handles this |
| Pushing to wrong repo | Run `git remote -v` to verify origin before pushing |
| Favicon not showing | Hard refresh (Ctrl+Shift+R) — browsers cache favicons aggressively |
| Shield/Eagle CI fails | Check CLAUDE_CODE_OAUTH_TOKEN secret exists in repo Settings → Secrets |
| CI "unsupported event" | Shield/Eagle must use pull_request trigger, not push |
| Favicon SVG looks wrong | Claude Code can't create logo art — design manually in Figma/Inkscape |
