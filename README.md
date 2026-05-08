# NestCalc.ai Landing Page

**Version:** V1.4.4
**Status:** Deployed (tag v1.4.4) — footer contrast fixed, wordmark images optimized (WebP + dimensions), footer entity statement + email link with shared clipboard-fallback helper
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
- Sharp (devDep, used by scripts/optimize-wordmarks.mjs for WebP generation)
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
│   │                      casawise-wordmark-final.{png,webp},
│   │                      homefastcalc-wordmark-final.{png,webp}
│   ├── styles/globals.css
│   ├── lib/               animations.ts, birdPaths.ts, contact.ts
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── scripts/
│   └── optimize-wordmarks.mjs  Sharp-based WebP generation
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
├── docs/reports/          agent-baseline-2026-04-15.md,
│                          lighthouse-v1.4.3-{desktop,mobile}.{html,json}
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
| nok-caption | #D4C9A8 | Captions, muted labels, version badge (opacity-70 for AA contrast) |

## Services Card States

The Services section shows 4 cards. Three link to live products with wordmark/text buttons; one is "Coming Soon".

| Card | Linked? | Badge |
|------|---------|-------|
| AI Applications | casawise.ai | Casawise.ai wordmark (WebP + PNG fallback) in gold-bordered button |
| Websites and Landing Pages | Builder LP Cloud Run | "VIEW LIVE →" in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark (WebP + PNG fallback) in gold-bordered button |
| AI Strategy & Consulting | — | "COMING SOON" plain caption |

## Footer Layout (V1.4.4+)

The footer ends with three centered metadata regions stacked above each other:

1. **Bottom bar row** — copyright + "Built by NestCalc.ai" tagline
2. **Entity + email line** — "NestCalc.ai is operated by NestCalc.ai, LLC. · daron@NestCalc.ai" (email link uses `copyAndOpenMailto` helper from `src/lib/contact.ts` for clipboard fallback)
3. **Version badge** — `V{__APP_VERSION__}` in monospace at 70% opacity (AA-compliant contrast)

## Email / Contact Helper

`src/lib/contact.ts` is the single source of truth for contact constants and the email click handler:

- `EMAIL` — canonical lowercase address used in mailto: hrefs and clipboard copy
- `EMAIL_DISPLAY` — display casing
- `copyAndOpenMailto(e, onCopied?)` — handles clipboard copy + mailto navigation; optional callback for toast feedback

Both `Contact.tsx` and `Footer.tsx` import from this module.

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

## Lighthouse CLI Baseline (V1.4.4)

Captured via `npx lighthouse` (simulated throttling):

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 97–99 (run noise) | 85–86 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Reports: `docs/reports/lighthouse-v1.4.3-{desktop,mobile}.{html,json}`.

## Image Optimization

Wordmark PNGs are converted to WebP via `scripts/optimize-wordmarks.mjs` (sharp-based, run once per asset update). Both formats are committed; the `<picture>` element in `Services.tsx` serves WebP to modern browsers with PNG fallback.

To regenerate WebPs after updating source PNGs:
```bash
node scripts/optimize-wordmarks.mjs
```

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
| mailto: link doesn't open | The `copyAndOpenMailto` helper handles this — clipboard copy is the silent fallback |
| Pushing to wrong repo | Run `git remote -v` to verify origin before pushing |
| Favicon not showing | Hard refresh (Ctrl+Shift+R) — browsers cache favicons aggressively |
| Shield/Eagle CI fails | Check CLAUDE_CODE_OAUTH_TOKEN secret exists in repo Settings → Secrets |
| CI "unsupported event" | Shield/Eagle must use pull_request trigger, not push |
| Touch particles not working | Requires window-level listeners (canvas has pointer-events:none) |
| Mobile clicks dead | Check ParticleField touchstart handler — never preventDefault on touchstart |
| Hero CTA not scrolling | Ensure only one scroll mechanism (anchor href, not dual onClick+href) |
| Bird freezes after tap on mobile | touchend handler must set birdStateRef.current = 'returning' |
| Wordmark image looks washed on dark cards | Source asset designed for light backgrounds — needs cream/dark-mode variant |
| Cards in same row are different heights | h-full must chain through motion.div → anchor wrapper → GlowCard outer → GlowCard inner content |
| Footer version shows old number | Confirm package.json was bumped before push; __APP_VERSION__ reads from package.json at build time |
| Image-delivery audit still failing after WebP | Check oversize — source dimensions must be close to rendered dimensions |
| Lighthouse score noise | Windows headless Chrome has run-to-run variance; ±1–2 points is not signal |
