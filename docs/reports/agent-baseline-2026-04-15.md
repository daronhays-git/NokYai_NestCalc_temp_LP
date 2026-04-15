# Agent Baseline — April 15, 2026

**Date:** April 15, 2026
**Codebase state:** Post PORT-C1 through PORT-6 (workflow rewrites + read-only review pass)
**Branch:** main
**Note:** No live scores yet — Lighthouse CI will run on next push to main. All findings below are from the manual PORT-6 review series.

---

## Shield Baseline

**3 Issues · 7 Warnings · 6 categories passing**

### Issues ❌

| # | File | Finding |
|---|------|---------|
| 1 | `src/components/sections/Contact.tsx:65` | Empty `catch` block — swallows errors silently with no `console.error` or recovery path |
| 2 | `src/components/layout/Footer.tsx:2` | Asset import (`NokYai-logo-gold-green.png`) placed before internal component imports, violating the 6-group import order convention (§6.1) |
| 3 | `src/components/legal/LegalModal.tsx:50` | Second `<h1>` rendered while `Hero.tsx` `<h1>` is still mounted — dual `<h1>` on page violates heading hierarchy |

### Warnings ⚠️

| # | File | Finding |
|---|------|---------|
| 1 | `src/App.tsx:19` | Dynamic import `.then()` has no `.catch()` — unhandled rejection if a lazy section fails to load |
| 2 | `src/main.tsx:14` | `document.fonts.ready.then()` has no `.catch()` — unhandled rejection on font load failure |
| 3 | `src/components/effects/ParticleField.tsx:353,361` | `getBoundingClientRect()` called inside `requestAnimationFrame` loop — forces layout recalculation every frame |
| 4 | `src/hooks/useMousePosition.ts:1` | Stale `// TODO: Implement` comment present |
| 5 | `src/hooks/useScrollProgress.ts:1` | Stale `// TODO: Implement` comment present |
| 6 | `src/hooks/useInView.ts:1` | Stale `// TODO: Implement` comment present |
| 7 | `src/components/sections/Services.tsx:32` | `nok-amber` token used — deprecated duplicate of `nok-gold`; use `nok-gold` instead |

*Note: `src/components/ui/ScrollProgress.tsx:31-32` (static hex in inline style) was also flagged — see Eagle Baseline §2 for the shared entry.*

---

## Eagle Baseline

**2 Issues · 2 Warnings · 10 of 11 steps passing**

### Issues ❌

| # | File | Finding |
|---|------|---------|
| 1 | `src/components/sections/Services.tsx:32` | `to-nok-amber` in gradient class — `nok-amber` is a deprecated duplicate of `nok-gold`; replace with `to-nok-gold` (§1.1 Color Token Compliance) |
| 2 | `src/components/layout/Footer.tsx:102` | `style={{ color: '#D4C9A8' }}` — static color value in inline style has a Tailwind equivalent (`text-nok-caption`); violates §1.4 Inline Style rule |

### Warnings ⚠️

| # | File | Finding | Overlap |
|---|------|---------|---------|
| 1 | `src/components/legal/LegalModal.tsx:50` | Dual `<h1>` — `LegalModal` renders `<h1>` while `Hero.tsx` `<h1>` is still mounted | Shared with Shield Issue #3 |
| 2 | `src/components/ui/ScrollProgress.tsx:31-32` | Static hex color in inline `style={{}}` — has a Tailwind token equivalent | Shared with Shield §raw hex |

---

## Lighthouse Baseline

**5 Issues · 5 Warnings · 3 clean areas**
**Note:** No live Lighthouse CI scores yet. Scores will be available after the next push to main triggers the `lighthouse.yml` workflow. All findings below are from the manual SEO/AEO/EEAT review (PORT-6C).

### Clean Areas ✅
- Performance signals: above-fold images handled via hero.png; no render-blocking resources identified
- Core Tailwind/font stack: Google Fonts preconnect + preload pattern in `index.html` is correct
- robots.txt and sitemap.xml present in `/public`

### Prioritized Recommendations (10 items)

| # | Severity | Finding |
|---|----------|---------|
| 1 | ❌ Issue | `index.html:9,20,30` — all three title tags read "AI-Powered Real Estate Investment Tools" (stale from prior product identity); must be updated to reflect AI dev studio positioning |
| 2 | ❌ Issue | `index.html` — no JSON-LD structured data; add `Organization` schema (name, url, contactPoint, sameAs social links) for rich result eligibility |
| 3 | ❌ Issue | Legal documents (`PrivacyPolicy.tsx`, `TermsOfService.tsx`, `Disclaimer.tsx`) — all reference old NestCalc real estate product (Supabase, Stripe, property analysis tiers); need full rewrite for AI services agency |
| 4 | ❌ Issue | No named founder / team member on page — EEAT signal missing; add at least one named author/founder with credentials |
| 5 | ❌ Issue | No visible email or direct contact method in Footer — currently CTA-only; add a contact email to Footer for trust/EEAT |
| 6 | ⚠️ Warning | `index.html` meta description does not differentiate from generic "AI solutions" messaging; needs specificity about custom AI workflows, integrations, and target client profile |
| 7 | ⚠️ Warning | Open Graph `og:title` and `og:description` in `index.html` carry same stale content as title tag — fix together with item #1 |
| 8 | ⚠️ Warning | No `<link rel="canonical">` in `index.html` — add `https://nestcalc.ai/` to prevent duplicate indexing risk |
| 9 | ⚠️ Warning | AEO/GEO gate applies: single-page LP with no article or blog content; AI-optimized content snippets and FAQ schema cannot be added without a content section — defer or plan a FAQ section |
| 10 | ⚠️ Warning | No social proof signals indexed by crawlers (testimonials section is placeholder "coming soon") — when testimonials are real, add structured data |

---

## Scribe Baseline

**6 Wrong · 3 Stale · design-tokens.md / REVIEW.md / lessons.md all current**

### Priority Update List

| # | Severity | File | Section | Issue | Correct value |
|---|----------|------|---------|-------|---------------|
| 1 | 🔴 Wrong | `README.md` | §Tech Stack | React listed as 18 | React 19.2.4 |
| 2 | 🔴 Wrong | `README.md` | §Tech Stack | Tailwind CSS listed as 3.4 | Tailwind CSS 4.2.2 |
| 3 | 🔴 Wrong | `README.md` | §File Structure | Lists `src/components/sections/CaseStudies.tsx` | File deleted in PORT-C2 |
| 4 | 🔴 Wrong | `README.md` | §File Structure | Lists `src/components/sections/CTABand.tsx` | File deleted in PORT-C2 |
| 5 | 🔴 Wrong | `README.md` | §File Structure | Lists `src/components/sections/LogoBar.tsx` | File deleted in PORT-C2 |
| 6 | 🔴 Wrong | `README.md` | §File Structure | Lists `src/lib/constants.ts` | File deleted in PORT-C2 |
| 7 | 🔴 Wrong | `CLAUDE.md` | §File Structure | Lists `src/lib/constants.ts` | File deleted in PORT-C2 |
| 8 | 🟡 Stale | `README.md` | §File Structure | Missing `src/components/legal/` directory | Added post-PORT-C1 |
| 9 | 🟡 Stale | `README.md` | §File Structure | Missing `src/components/effects/` directory | Added post-PORT-C1 |
| 10 | 🟡 Stale | `README.md` | §File Structure | Missing `src/hooks/` with correct hook file names | Hooks exist: useMousePosition, useScrollProgress, useInView |

*Note: `REVIEW.md`, `design-tokens.md`, and `lessons.md` are fully current. `NokYai-V*.md` handoff files contain expected stale references (Syne font, PORT-C2 deleted files) — historical snapshots, no action required.*

---

## Cross-Agent Overlap

Three findings were flagged by more than one agent:

| Finding | Files | Agents |
|---------|-------|--------|
| Dual `<h1>` while LegalModal is open | `LegalModal.tsx:50` | Shield ❌ · Eagle ⚠️ · Lighthouse ⚠️ (EEAT heading signal) |
| Static hex color in inline `style={{}}` | `ScrollProgress.tsx:31-32` | Shield ⚠️ · Eagle ⚠️ |
| `nok-amber` deprecated token | `Services.tsx:32` | Shield ⚠️ · Eagle ❌ |

**Total unique findings across all agents:**
- Unique ❌ Issues: 8 (3 Shield + 2 Eagle, minus 1 overlap between them, + 5 Lighthouse)
- Unique ⚠️ Warnings: 13 (7 Shield + 2 Eagle, minus 2 overlaps, + 5 Lighthouse; some cross-overlap counted once)
- Unique 🔴/🟡 Scribe items: 10

---

## Known Issues vs New Discoveries

### KNOWN — already documented in `CLAUDE.md` §Known Issues (2026-04-14)

| Finding | Source in CLAUDE.md | Confirmed by Agent |
|---------|--------------------|--------------------|
| `index.html` `<title>` reads "AI-Powered Real Estate Investment Tools" | Known issue 1 | Lighthouse ❌ #1 |
| Legal content references old NestCalc real estate product | Known issue 2 | Lighthouse ❌ #3 |
| `WhyNokYai.tsx` exports `WhyNestCalc` — filename/export mismatch | Known issue 3 | Not flagged by any agent (cosmetic, low priority — CLAUDE.md assessment stands) |

### NEW — discovered by agents, not previously documented

| Finding | Discovered by | Priority |
|---------|--------------|----------|
| `Contact.tsx:65` empty catch block | Shield ❌ | High |
| `Footer.tsx:2` import order violation | Shield ❌ | Medium |
| `LegalModal.tsx:50` dual `<h1>` | Shield ❌ · Eagle ⚠️ | High |
| `App.tsx:19` unhandled promise rejection | Shield ⚠️ | Medium |
| `main.tsx:14` unhandled promise rejection | Shield ⚠️ | Medium |
| `ParticleField.tsx:353,361` `getBoundingClientRect()` in RAF | Shield ⚠️ | Low |
| All 3 hooks stale TODO comments | Shield ⚠️ | Low |
| `Services.tsx:32` `nok-amber` deprecated | Shield ⚠️ · Eagle ❌ | Medium |
| `ScrollProgress.tsx:31-32` static hex inline style | Shield ⚠️ · Eagle ⚠️ | Low |
| `Footer.tsx:102` static inline color | Eagle ❌ | Medium |
| `index.html` missing JSON-LD Organization schema | Lighthouse ❌ | High |
| No named founder on page | Lighthouse ❌ | Medium |
| No email in Footer | Lighthouse ❌ | Medium |
| Stale `og:title`/`og:description` meta tags | Lighthouse ⚠️ | High (fix with title) |
| Missing `<link rel="canonical">` | Lighthouse ⚠️ | Medium |
| `README.md` React version wrong (18 vs 19.2.4) | Scribe 🔴 | Medium |
| `README.md` Tailwind version wrong (3.4 vs 4.2.2) | Scribe 🔴 | Medium |
| `README.md` + `CLAUDE.md` list 4–5 deleted files | Scribe 🔴 | Medium |
| `README.md` missing legal/effects/hooks directories | Scribe 🟡 | Low |

---

*This file is a read-only reference baseline. Do not modify it. A new snapshot should be created after each significant PORT series to measure improvement.*
