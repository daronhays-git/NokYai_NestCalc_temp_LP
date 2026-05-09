# NestCalc.ai Landing Page — Roadmap

**Last Updated:** May 9, 2026
**Current Status:** V1.4.6 deployed (tag v1.4.6) — render-blocking fonts deferred (440/1200 ms → 0 ms), dead three.js purged, framer-motion migrated to m + LazyMotion (-46 KB raw / -13 KB gzip on animation-vendor), Footer setTimeout cleanup. Lighthouse Performance: 93 → 95 desktop, 84 → 88 mobile.
**Branch:** main
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP

---

## Completed Phases

| Version | Tag | Highlights |
|---------|-----|-----------|
| V1.4.6 | tag v1.4.6 | Render-blocking fonts deferred via media="print" onload swap (P1, 440/1200 ms → 0 ms); dead three.js dependencies + dead vite chunk rule removed (P3, 56 packages purged, bit-identical bundle); framer-motion → m + LazyMotion + domAnimation across 8 files (P4, animation-vendor -46 KB raw / -13 KB gzip / -18.6%); Footer.tsx setTimeout unmount cleanup (P5, useRef + useEffect pattern); mobile smoke test passed cleanly; Lighthouse Performance 93 → 95 desktop / 84 → 88 mobile |
| V1.4.5 | tag v1.4.5 | Organization JSON-LD logo + sameAs (validated by Google Rich Results Test on desktop + smartphone); NokYai → NestCalc rename cleanup across 16 files + 1 git mv (96% similarity); image oversize cleanup (320px wordmarks + 96×96 logo, -62% delivered bytes, mobile image-delivery FAIL → 0.5 partial); spec-compliant llms.txt at site root; Khanom/Thailand audit confirms repo Wyoming-policy clean; Contact.tsx setTimeout unmount cleanup with rapid-double-click pre-clear bonus; `__APP_VERSION__` footer wiring verified end-to-end |
| V1.4.4 | tag v1.4.4 | CLI Lighthouse baseline; footer contrast fix (a11y 96→100); wordmark width/height attrs (CLS to 0.0000); WebP wordmarks via `<picture>` (-64 KB / 53%); footer entity statement + email link; hoisted email handler with clipboard fallback to `lib/contact.ts` |
| V1.4.3 | tag v1.4.3 | Product cards (Casawise + HFC + Builder LP wordmarks/buttons); equal-height cards via h-full chain; mobile Guardian Bird (80px); footer version badge |
| V1.4.2 | tag v1.4.2 | Source code rename NokYai → NestCalc (config/docs deferred); Hero CTA scroll race fix |
| V1.4.0–V1.4.1 | tag v1.4.0, v1.4.1 | Establish brand palette (forest + gold + warm wheat); base sections; initial Lighthouse pass 99/94/100/100 desktop |
| V1.3 series | various | Section flow established; particle field + GradientMesh + NoiseOverlay; Guardian Bird desktop |
| V1.2 series | various | Initial layout, navbar, hero, services, contact form |
| V1.1 series | various | Vite + React 19 + TypeScript + Tailwind 4 scaffold |
| V1.0 | tag v1.0.0 | Initial deploy on Netlify |

---

## What Changed in V1.4.6

### P1 — Render-blocking fonts deferred
The Google Fonts `<link rel="stylesheet">` was Lighthouse's #1 render-blocking offender (357 ms desktop / 846 ms mobile). Diagnostic confirmed adjacent `<link rel="preload">` was already in place but the synchronous `<link rel="stylesheet">` still blocked render. Fix: convert the stylesheet line to `media="print" onload="this.media='all'"` swap pattern with `<noscript>` fallback. Browsers fetch `media="print"` stylesheets without blocking render, then the onload swaps to `all` once parsed. Preload retained — fetch still kicks off early. App CSS (7.3 KB) intentionally left synchronous (too small / too critical to defer). Lighthouse render-blocking-insight audit moved from score 0 / 440-1200 ms savings to score 0.5 / 0 ms savings (passing).

### P3 — Dead three.js dependencies removed
V1.4.6-P2 unused-JS diagnostic surfaced that `three`, `@react-three/fiber`, `@react-three/drei`, and `@types/three` had zero imports across `src/`. Vite was already tree-shaking them out of the bundle (no `three-vendor` chunk emitted), so they didn't ship to clients — but they bloated `node_modules`, install time, and CI cache. Paranoia greps confirmed dead code, then `npm uninstall` removed all 4 packages (56 transitive packages purged). Dead `three-vendor` `manualChunks` rule in `vite.config.ts` removed in same atomic commit. Build output bit-identical to pre-removal — confirms the tree-shake was already working. Win is install time + node_modules size + CI cache.

### P4 — Framer Motion → `m` + `<LazyMotion features={domAnimation} strict>`
Single biggest perf-per-effort lever in the V1.4.6 plan. V1.4.6-P2 diagnostic flagged animation-vendor as 247 kB raw / 88 kB gzip with 54 KB of unused JS shipped to mobile clients. V1.4.6-P4-DIAG audited every framer-motion consumer: 8 files, all using only animation features that `domAnimation` covers (no drag, no layout, no pan — `domMax` would be over-pack). Migrated all 8 files from `motion` to `m` (one import change + JSX rename per file), wrapped App root in `<LazyMotion features={domAnimation} strict>`. The `strict` flag throws a hard runtime error if any descendant uses `motion` — this caught the migration verification step (initial smoke test surfaced cached browser bundles serving stale code; hard-refresh resolved). Result: animation-vendor 247 → 201 kB raw (-46 kB / -18.6%), 88 → 75 kB gzip (-13 kB / -14.9%). Beat the ~30 kB raw / ~12 kB gzip target by 50%. Mobile unused-JS audit: -15 KiB win.

### P5 — Footer.tsx setTimeout unmount cleanup
Same fix pattern from V1.4.5-P8 (Contact.tsx) applied to Footer.tsx. The footer email click handler had inline `setTimeout(() => setCopied(false), 3000)` that didn't clean up on unmount. Fixed by replacing with `useRef<ReturnType<typeof setTimeout> | null>` + `useEffect` cleanup that clears on unmount. Bonus: pre-clear before each new schedule re-anchors the 3 s window on rapid double-clicks (consistent with Contact.tsx behavior).

### Mobile smoke test verification
Daron ran complete mobile-device smoke test on https://nestcalc.ai before any V1.4.6 code shipped. All clickable buttons responsive, all sections rendered correctly. Minor flag: Guardian Bird flight slow-moving and slow to respond to touch. Acceptable for now — parked for V1.5+.

### Workflow + skill improvements (non-code session work)
- **sc-code skill rewritten to single-flow.** Removed Variant A / Variant B / Pre-launch Sprint sub-mode. Always 3 files (Handoff + README + Roadmap), always version bump (even zero-code sessions), always tag. Eliminates "which type is this?" friction and prevents version drift on mid-branch sessions.
- **Code blocks rule formalized.** Code blocks reserved for Claude Code prompts only. User-facing instructions (browser checks, screenshots) go in plain prose. Permanent rule.
- **Build commands rule formalized.** `npm run build`, `npm run preview`, `npm run dev`, grep — all go to Claude Code, not the user. Only browser-visual confirmations and third-party screenshots go to the user. Permanent rule.

---

## Next Session (V1.4.7)

### Decision needed up front
V1.4.7 has a path-decision moment: continue perf optimization (next levers are higher-effort) or pivot to content replacement (testimonials, tech logos, copy). First prompt of the session is a decision-framing diagnostic.

### V1.4.7 perf candidates (if continuing perf path)
1. **Drop GSAP entirely** — V1.4.6-P2 estimated this would drop ~80 KB raw / ~30 KB gzip from animation-vendor. Higher effort (rewrite `lib/animations.ts` reveal logic with `useInView`) but very high impact. Biggest remaining lever.
2. **Lazy-load animation-vendor chunk** — Defer the gsap chunk until first scroll. Medium effort, defers ~30 kB past first paint.
3. **Lazy-load ParticleField** — 628-line canvas effect, eager today. Splits heavy canvas code out of the critical path. Must verify Guardian Bird still renders correctly.

### V1.4.7 content candidates (if pivoting to content)
1. **Replace placeholder testimonials with real quotes** — Need real testimonial copy from Daron
2. **Replace tech logo placeholders with actual SVG logos** — Audit current TechStack.tsx, swap placeholders for real assets
3. **Write final copy for all sections** — Identify which sections still have placeholder/draft language

### Backlog (carries forward)
- Mobile Guardian Bird flight slow movement and touch responsiveness — V1.5+
- Wordmark visual balance (HFC vs Casawise text scale difference — needs source SVGs)
- Animated bird logo video integration (need clean file)
- Social sharing preview image (verify OG renders)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with content or link
- Standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Bio package OneDrive source still references "Based in Khanom, Thailand" — out of repo scope
- Google Analytics 4 setup (still blocked — domain/bank pending)
- Future: proper SVG wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Parked
- NokYai.com brand (retired)
- Controller agent (parked until all 8 agents running)
- Autonomous wandering bird behavior on mobile
- Wordmark visual balance fix (HFC vs Casawise — needs source SVGs)

---

## Phase Tracking Notes

V1.4.x is the **post-launch polish phase**: small surgical improvements while the LP is live and serving as the NestCalc.ai company website. Each version ships 3–7 small, independently-revertible commits. Big content/branding work is deferred to V1.5.x once domain + GA4 + brand finalization unblock.

V1.4.6 was a clean four-prompt perf session (P1, P3, P4, P5) that hit every primary target: render-blocking eliminated, dead deps purged, framer-motion bundle cut significantly, footer cleanup applied. The diagnostic-first pattern paid off three times — P1 ruled out app CSS as a deferral target, P2 surfaced three.js as free dead code, P4 confirmed `domAnimation` was sufficient (no `domMax` overhead). Mobile smoke test pre-deploy caught the Guardian Bird responsiveness item before any rework was wasted on it.

The sc-code skill rewrite at session close was the biggest meta-improvement: moving from a 3-variant flow (Release / Mid-branch / Pre-launch Sprint) to a single always-the-same flow eliminates an entire class of decision friction. Future sessions will all close the same way regardless of code volume.
