# NestCalc.ai Landing Page — Roadmap

**Last Updated:** May 8, 2026
**Current Status:** V1.4.4 deployed (tag v1.4.4) — Lighthouse baseline captured (CLI), accessibility 100/100, wordmark images optimized (WebP + intrinsic dimensions), footer entity + email line with shared clipboard-fallback helper
**Branch:** main
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP

---

## Completed Phases

| Version | Tag | Highlights |
|---------|-----|-----------|
| V1.4.4 | tag v1.4.4 | CLI Lighthouse baseline; footer contrast fix (a11y 96→100); wordmark width/height attrs (CLS to 0.0000); WebP wordmarks via `<picture>` (-64 KB / 53%); footer entity statement + email link; hoisted email handler with clipboard fallback to `lib/contact.ts` |
| V1.4.3 | tag v1.4.3 | Product cards (Casawise + HFC + Builder LP wordmarks/buttons); equal-height cards via h-full chain; mobile Guardian Bird (80px); footer version badge |
| V1.4.2 | tag v1.4.2 | Source code rename NokYai → NestCalc (config/docs deferred); Hero CTA scroll race fix |
| V1.4.0–V1.4.1 | tag v1.4.0, v1.4.1 | Establish brand palette (forest + gold + warm wheat); base sections; initial Lighthouse pass 99/94/100/100 desktop |
| V1.3 series | various | Section flow established; particle field + GradientMesh + NoiseOverlay; Guardian Bird desktop |
| V1.2 series | various | Initial layout, navbar, hero, services, contact form |
| V1.1 series | various | Vite + React 19 + TypeScript + Tailwind 4 scaffold |
| V1.0 | tag v1.0.0 | Initial deploy on Netlify |

---

## What Changed in V1.4.4

### P1 — Lighthouse CLI baseline
Captured V1.4.x canonical baseline using `npx lighthouse` (CLI, simulated throttling). Reports saved to `docs/reports/lighthouse-v1.4.3-{desktop,mobile}.{html,json}`. CLI throttling differs from DevTools (applied throttling) so V1.4.0 baseline (99/94/100/100) is no longer directly comparable. Initial scores: Desktop 99/96/100/100, Mobile 84/96/100/100.

### P1A — Footer version badge contrast (a11y)
Single class change: `opacity-60` → `opacity-70` on the version badge span in Footer.tsx. Effective foreground #858972 → #99997F on #0f2920, contrast 4.28:1 → 5.36:1. Lighthouse Accessibility 96 → 100 on both desktop and mobile.

### P1B — Wordmark intrinsic dimensions
Added `width`/`height` HTML attributes to wordmark `<img>` tags via new numeric `wordmarkWidth` and `wordmarkHeight` fields. Renamed pre-existing string field `wordmarkHeight` to `wordmarkHeightClass` to avoid collision. Cleared the unsized-images audit. Mobile CLS dropped from 0.0012 to 0.0000 — aspect-ratio reservation working as designed.

### P1C — Wordmark WebP conversion
Created `scripts/optimize-wordmarks.mjs` (sharp-based, one-off generator). Swapped `<img>` for `<picture>` with WebP `<source>` + PNG fallback. Byte savings: Casawise 57.6 → 29.0 KB (-49.7%), HFC 63.8 → 28.4 KB (-55.6%), total 64 KB / 53% reduction. Mobile LCP improved 150 ms (3464 → 3314). Image-delivery audit still flags oversize (separate from format) — parked for V1.4.5.

### P3 + P3-FIX — Footer entity statement, email, and shared helper
New centered metadata line above the version badge: "NestCalc.ai is operated by NestCalc.ai, LLC. · daron@NestCalc.ai". Created `src/lib/contact.ts` to hoist EMAIL/EMAIL_DISPLAY constants and add `copyAndOpenMailto` helper. Both Contact.tsx and Footer.tsx import the helper for consistent mailto + clipboard-fallback behavior. Footer email link works for users without a default mail app.

---

## Next Session (V1.4.5)

### Priorities
1. **JSON-LD schema audit** — diagnose Organization + Person schemas in index.html for placeholder values; cross-check against bio package and `person-schema-nestcalc-ready.json`. Validate via Google Rich Results Test post-deploy.
2. **NokYai → NestCalc rename audit (config + docs)** — categorize all remaining NokYai references as stale / intentional / branding decision; cleanup prompts to follow.
3. **Image oversize cleanup** — generate downsized variants of wordmarks (320px wide) and brand logo to clear remaining image-delivery-insight audit failure.
4. **llms.txt at site root** — add properly structured llms.txt for AEO/agentic-browsing signals.

### Backlog
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file)
- Social sharing preview image (verify OG renders)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with content or link
- Standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Wordmark visual balance (V5 placeholder — hold for source files)
- public/favicon2.png cleanup (stray file)
- Contact.tsx setTimeout unmount cleanup (micro-fix)
- Google Analytics 4 setup (still blocked — domain/bank pending)
- Future: proper SVG wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Parked
- NokYai.com brand (retired)
- Controller agent (parked until all 8 agents running)
- Autonomous wandering bird behavior on mobile

---

## Phase Tracking Notes

V1.4.x is the **post-launch polish phase**: small surgical improvements while the LP is live and serving as the NestCalc.ai company website. Each version ships 3–5 small, independently-revertible commits. Big content/branding work is deferred to V1.5.x once domain + GA4 + brand finalization unblock.
