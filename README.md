# NestCalc.ai Landing Page

**Version:** V1.4.3
**Status:** Deployed — clickable product cards (Casawise + HFC + Builder LP wordmarks/buttons), equal-height cards, mobile Guardian Bird, footer version badge (tag v1.4.3)
**Branch:** main
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Dev Server:** http://localhost:5173

---

## Company Structure

| Entity | Role |
|--------|------|
| NestCalc.ai, LLC | Umbrella company |
| HomeFastCalc.com | Simplified non-AI RE calculator app |
| Casawise.ai | AI-powered RE analysis app (formerly NestCalc.ai) |
| NestCalc.ai (this LP) | Company website and product showcase |

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
- 2D Canvas particle system + Guardian Bird (custom, mouse-reactive + touch-reactive, 128px desktop / 80px mobile)
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
│   │   │                  TechStack, WhyNestCalc, Contact
│   │   ├── ui/            MagneticButton, GlowCard, SectionHeading,
│   │   │                  CustomCursor, ScrollProgress
│   │   ├── effects/       ParticleField, GradientMesh, NoiseOverlay
│   │   └── legal/         LegalModal, PrivacyPolicy, TermsOfService,
│   │                      Disclaimer
│   ├── assets/            nestcalc-logo-gold-green.png,
│   │                      casawise-wordmark.png,
│   │                      homefastcalc-wordmark.png
│   ├── styles/globals.css
│   ├── lib/               animations.ts, birdPaths.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── public/
│   ├── favicon.png        48x48 PNG favicon
│   ├── favicon-512.png    512x512 high-DPI / PWA icon
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
├── vite.config.ts         (defines __APP_VERSION__ from package.json)
├── netlify.toml
└── package.json
```

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNestCalc, Footer bg |
| nok-forest | #1a3a2a | TechStack, Testimonials bg |
| nok-medium | #2d5a42 | Services, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights, button borders |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels, version badge |

## Services Card States

The Services section shows 4 cards. Three link to live products with wordmark/text buttons; one is "Coming Soon".

| Card | Linked? | Badge |
|------|---------|-------|
| AI Applications | casawise.ai | Casawise.ai wordmark in gold-bordered button |
| Websites and Landing Pages | Builder LP Cloud Run | "VIEW LIVE →" in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark in gold-bordered button |
| AI Strategy & Consulting | — | "COMING SOON" plain caption |

## Footer Version Badge

The footer displays the current app version pulled from `package.json` via Vite's `__APP_VERSION__` define. Format: `V` + three-part semver in monospace at 60% opacity (e.g. `V1.4.3`). The version badge auto-updates on each release; package.json bump happens at session close (sc-code).

## JSON-LD Schemas

Two structured data blocks in index.html:
- **Organization** — NestCalc.ai business entity
- **Person** — Daron R. Hays founder bio (EEAT/AEO signal)

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
- Every Claude Code prompt ID on the FIRST line of the code block
- Explicit `git add <path>` — NEVER `git add -A`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Contact form goes to spam | Use realistic content + different email addresses for testing |
| mailto: link doesn't open | User has no default mail app — clipboard copy fallback handles this |
| Pushing to wrong repo | Run `git remote -v` to verify origin before pushing |
| Favicon not showing | Hard refresh (Ctrl+Shift+R) — browsers cache favicons aggressively |
| Shield/Eagle CI fails | Check CLAUDE_CODE_OAUTH_TOKEN secret exists in repo Settings → Secrets |
| CI "unsupported event" | Shield/Eagle must use pull_request trigger, not push |
| Touch particles not working | Requires window-level listeners (canvas has pointer-events:none) |
| Mobile clicks dead | Check ParticleField touchstart handler — never preventDefault on touchstart |
| Hero CTA not scrolling | Ensure only one scroll mechanism (anchor href, not dual onClick+href) |
| Bird freezes after tap on mobile | touchend handler must set birdStateRef.current = 'returning' |
| Wordmark image looks washed on dark cards | Source asset designed for light backgrounds — needs cream/dark-mode variant |
| Cards in same row are different heights | h-full must chain through motion.div → anchor wrapper → GlowCard outer → GlowCard inner content (with flex flex-col) |
| Footer version shows old number | Confirm package.json was bumped before push; __APP_VERSION__ reads from package.json at build time |
