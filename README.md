# NestCalc.ai Landing Page

**Version:** V1.4.7
**Status:** Deployed (tag v1.4.7) — GSAP removed and replaced with framer-motion whileInView (animation-vendor −112.9 KB raw / −43.5 KB gzip), ParticleField lazy-loaded via React.lazy + Suspense (entry chunk −26.4 KB raw / −11.5 KB gzip), mobile unused-javascript audit cleared (60 KiB FAIL → 0 PASS)
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
- Framer Motion via `m` + `<LazyMotion features={domAnimation} strict>` wrapper (V1.4.6) — only animation library after V1.4.7 GSAP removal
- 2D Canvas particle system + Guardian Bird (custom, mouse-reactive + touch-reactive, 128px desktop / 80px mobile) — lazy-loaded via React.lazy + Suspense as of V1.4.7
- Netlify Forms (contact form submissions)
- Google Fonts: Space Grotesk (display) + Outfit (body) — non-blocking load via media="print" swap (V1.4.6)
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
│   │   ├── effects/       ParticleField (lazy-loaded V1.4.7),
│   │   │                  GradientMesh, NoiseOverlay
│   │   └── legal/         LegalModal, PrivacyPolicy, TermsOfService,
│   │                      Disclaimer
│   ├── assets/            nestcalc-logo-gold-green.png (200x200)
│   │                      nestcalc-logo-gold-green-96.{png,webp}
│   │                      casawise-wordmark-final.{png,webp} (600px)
│   │                      casawise-wordmark-final-320.{png,webp}
│   │                      homefastcalc-wordmark-final.{png,webp} (600px)
│   │                      homefastcalc-wordmark-final-320.{png,webp}
│   ├── styles/globals.css
│   ├── lib/               birdPaths.ts, contact.ts
│   │                      (animations.ts removed V1.4.7 — GSAP gone)
│   └── hooks/             useMousePosition, useScrollProgress, useInView
├── scripts/
│   └── optimize-wordmarks.mjs  Sharp-based WebP + downsized variant generation
├── public/
│   ├── logo.png           200x200 brand logo (Organization JSON-LD)
│   ├── favicon.png        48x48 PNG favicon
│   ├── favicon-512.png    512x512 high-DPI / PWA icon
│   ├── apple-touch-icon.png  180x180 iOS icon
│   ├── og-image.png       1200x630 OG image
│   ├── llms.txt           AEO/agentic-browsing entry point
│   ├── robots.txt
│   └── sitemap.xml
├── .claude/
│   ├── commands/          shield.md, eagle.md, lighthouse.md, scribe.md
│   ├── agents/
│   └── skills/
├── .github/workflows/     shield.yml, eagle.yml, lighthouse.yml,
│                          scribe.yml, review-all.yml
├── docs/reports/          agent-baseline-2026-04-15.md,
│                          lighthouse-v1.4.5-{desktop,mobile}.{html,json},
│                          lighthouse-v1.4.6-{desktop,mobile}.{html,json},
│                          lighthouse-v1.4.7-{desktop,mobile}.{html,json}
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
| AI Applications | casawise.ai | Casawise.ai wordmark (320px WebP + PNG fallback) in gold-bordered button |
| Websites and Landing Pages | Builder LP Cloud Run | "VIEW LIVE →" in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark (320px WebP + PNG fallback) in gold-bordered button |
| AI Strategy & Consulting | — | "COMING SOON" plain caption |

## Footer Layout

The footer ends with three centered metadata regions stacked above each other:

1. **Bottom bar row** — copyright + "Built by NestCalc.ai" tagline
2. **Entity + email line** — "NestCalc.ai is operated by NestCalc.ai, LLC. · daron@NestCalc.ai" (email link uses `copyAndOpenMailto` helper from `src/lib/contact.ts`; toast timeout uses useRef + useEffect cleanup pattern as of V1.4.6-P5)
3. **Version badge** — `V{__APP_VERSION__}` in monospace at 70% opacity (AA-compliant contrast)

## Email / Contact Helper

`src/lib/contact.ts` is the single source of truth for contact constants and the email click handler:

- `EMAIL` — canonical lowercase address used in mailto: hrefs and clipboard copy
- `EMAIL_DISPLAY` — display casing
- `copyAndOpenMailto(e, onCopied?)` — handles clipboard copy + mailto navigation; optional callback for toast feedback

Both `Contact.tsx` and `Footer.tsx` import from this module. Both use a `useRef<ReturnType<typeof setTimeout> | null>` + `useEffect` cleanup pattern for the toast timeout (Contact.tsx fixed in V1.4.5-P8, Footer.tsx fixed in V1.4.6-P5).

## Animation Library Pattern

As of V1.4.6, all framer-motion consumers use the `m` component + `<LazyMotion features={domAnimation} strict>` root wrapper. The `strict` flag throws a hard runtime error if any descendant uses `motion` instead of `m` — caught early and prevents partial migrations from shipping.

Pattern in any animated component:
```tsx
import { m, AnimatePresence } from 'framer-motion'

// Use m.X instead of motion.X
<m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
```

Pattern at the root (App.tsx):
```tsx
import { LazyMotion, domAnimation } from 'framer-motion'

<LazyMotion features={domAnimation} strict>
  {/* app */}
</LazyMotion>
```

`domAnimation` covers: animate, initial, exit, transition, variants, whileHover, whileTap, whileFocus, whileInView, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll. Does NOT cover drag, layout, layoutId, or pan — would need `domMax` if any of those are added.

### Section Reveal Pattern (post-V1.4.7)

As of V1.4.7, section-level fade-up animations use framer-motion's `whileInView` directly on the section element instead of the GSAP-driven `.reveal-section` class (now removed). Pattern:

```tsx
<m.section
  id="..."
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
  viewport={{ once: true, amount: 0.2 }}
>
```

The `ease: [0.215, 0.61, 0.355, 1]` cubic-bezier is an exact match for GSAP's `power3.out`. The `viewport={{ once: true, amount: 0.2 }}` matches GSAP's `start: 'top 80%'` semantics closely (fires when 20% of section is visible).

### Code Splitting Pattern (V1.4.7-P2)

ParticleField is lazy-loaded via React.lazy + Suspense in Hero.tsx:

```tsx
import { lazy, Suspense, useRef } from 'react'

const ParticleField = lazy(() =>
  import('../effects/ParticleField').then(mod => ({ default: mod.ParticleField }))
)

// In JSX:
<Suspense fallback={null}>
  <ParticleField {...props} />
</Suspense>
```

The `.then(mod => ({ default: mod.ParticleField }))` shape handles the named export (avoids `m` import shadowing collision). `<Suspense fallback={null}>` is correct because ParticleField is purely decorative (pointer-events-none + aria-hidden="true" + behind-content z-0).

## JSON-LD Schemas

Two structured data blocks in index.html:
- **Organization** — NestCalc.ai business entity. Logo at `/logo.png` (200×200). `sameAs: ["https://www.linkedin.com/in/daron-hays"]`. Validated by Google Rich Results Test on both desktop + smartphone profiles (V1.4.5).
- **Person** — Daron R. Hays founder bio (EEAT/AEO signal). Aligned with bio package V5 canonical.

## llms.txt

Spec-compliant per [llmstxt.org](https://llmstxt.org/). Sections: Company, Products, Services, Founder, Trust and Legal. Founder credentials drawn from bio package V4 short bio. Khanom location explicitly excluded per Wyoming-only address policy. Served at `https://nestcalc.ai/llms.txt`.

## Agent Stack

| Agent | Trigger | Purpose |
|-------|---------|---------|
| Shield | PR to main | Code quality + security review |
| Eagle | PR to main | Design + accessibility review |
| Lighthouse | Push to main | SEO, performance, EEAT |
| Scribe | PR to main | Documentation staleness |
| Review-All | PR to main | Orchestrates all PR agents |

Manual: run `/shield`, `/eagle`, `/lighthouse`, `/scribe` in Claude Code.

## Lighthouse CLI Baseline (V1.4.7)

Captured via `npx lighthouse` (simulated throttling):

| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 98 | 90 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Reports: `docs/reports/lighthouse-v1.4.7-{desktop,mobile}.{html,json}`.

V1.4.7 wins:
- Mobile unused-javascript audit: 60 KiB FAIL → 0 PASS (cleared completely)
- Desktop unused-javascript: 64 KiB → 23 KiB (−64%)
- Desktop Performance: 0.95 → 0.98 (+0.03)
- Desktop FCP / LCP: 1122 → 909 ms (−213 ms, −19%)
- Desktop Speed Index: 1422 → 1059 ms (−363 ms, −25.5%)
- Mobile FCP / LCP: 2993 → 2815 ms (−178 ms, −6%)
- Mobile TBT: 22 → 0 ms

V1.4.8 perf candidates:
- Lazy-load animation-vendor chunk (defer framer-motion until first scroll) — ~75 KB gzip lever, primary remaining target for mobile FCP (still 2.8s)
- Replace placeholder content (testimonials, 12 tech logos, AI Strategy "Coming Soon" card) — content path alternative

## Image Optimization

Three image-optimization passes have shipped:

1. **V1.4.4** — Wordmark PNGs converted to WebP (-53% / -56% per asset)
2. **V1.4.4** — Intrinsic width/height attributes added (CLS to 0.0000)
3. **V1.4.5** — 320px wordmark variants + 96×96 logo variants generated. Total delivered bytes 80 KB → 31 KB (-62%). Logo WebP base64-inlined by Vite (eliminates one HTTP request).

To regenerate variants after updating source assets:
```bash
node scripts/optimize-wordmarks.mjs
```

Original 600px wordmark and 200×200 logo source files preserved in `src/assets/` for future high-DPR use.

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
| mailto: link doesn't open | The `copyAndOpenMailto` helper handles this — clipboard copy is the silent fallback. If "click does nothing" reported, FIRST try incognito + hard refresh — service worker / browser cache is the cheapest first hypothesis |
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
| Image-delivery audit still failing after WebP | Check oversize — source dimensions must be close to rendered dimensions (1×–2× DPR margin) |
| Lighthouse score noise | Windows headless Chrome has run-to-run variance; ±1–2 points is not signal |
| Rich Results Test only shows one schema | Person schema isn't an eligible rich-result type. Organization is the only one validated. Both schemas are still useful (knowledge graph + AEO) |
| Lighthouse Rich Results Test mode | Dropdown next to TEST URL switches between Googlebot desktop + smartphone — verify both after schema changes |
| Browser console shows `motion is not defined` after framer-motion migration | First try Ctrl+Shift+R hard refresh — Vite caches transformed modules aggressively. If error persists after hard refresh, grep src/ for `motion\.` and verify the JSX migration is complete (V1.4.6 lesson) |
| `<LazyMotion strict>` not throwing expected error | Strict mode produces a plain ReferenceError (`motion is not defined`), not a LazyMotion-specific message. Stack trace still pinpoints the file and line — that's the signal |
| Section fade-up not triggering | V1.4.7+ uses whileInView, not GSAP. Check viewport={{ once: true, amount: 0.2 }} prop exists on outer m.section. amount controls when trigger fires (0.2 = 20% visible) |
| ParticleField not loading | V1.4.7+ uses React.lazy. Check Hero.tsx for `<Suspense fallback={null}>` wrapper. Network tab should show ParticleField-*.js chunk fetched after entry chunk |
| New chunk import shape error after lazy-load | Named exports need `.then(mod => ({ default: mod.ComponentName }))` wrapper in lazy() call. Default exports just need `lazy(() => import('...'))` |
