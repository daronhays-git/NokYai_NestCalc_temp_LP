# NestCalc.ai Landing Page — Roadmap

**Last Updated:** May 9, 2026
**Current Status:** V1.4.7 deployed (tag v1.4.7) — GSAP removed and replaced with framer-motion whileInView (animation-vendor −112.9 KB raw / −43.5 KB gzip / −58.7%), ParticleField lazy-loaded via React.lazy + Suspense (entry chunk −26.4 KB raw / −11.5 KB gzip / −15.1%). Mobile unused-javascript audit cleared completely (60 KiB FAIL → 0 PASS). Lighthouse Performance: 95 → 98 desktop, 88 → 90 mobile. Desktop Speed Index: 1422 → 1059 ms (−25.5%).
**Branch:** main
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP

---

## Completed Phases

| Version | Tag | Highlights |
|---------|-----|-----------|
| V1.4.7 | tag v1.4.7 | GSAP removed and replaced with framer-motion `whileInView` across 5 sections (P1A) — animation-vendor −112.9 KB raw / −43.5 KB gzip (−58.7%), beat diagnostic estimate by 40%; ParticleField lazy-loaded via React.lazy + Suspense (P2) — entry chunk −26.4 KB raw / −11.5 KB gzip (−15.1%), Hero text/CTAs no longer compete with 628-line canvas during FCP window; **mobile unused-javascript audit cleared (60 KiB FAIL → 0 PASS) — first time passing since V1.4.5 baseline**; desktop unused-JS −64% (64 → 23 KiB); Lighthouse Performance 95 → 98 desktop / 88 → 90 mobile; desktop Speed Index 1422 → 1059 ms (−25.5%); zero regressions |
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

## What Changed in V1.4.7

### P1A — GSAP removed, replaced with framer-motion whileInView

V1.4.7-P0 decision-framing diagnostic confirmed GSAP scope was light: 1 file (`src/lib/animations.ts`, 54 lines), 2 ScrollTrigger blocks (`.reveal-section` used by 5 sections, `.stagger-children` used by 0 sections), zero cross-cutting concerns, zero timeline sequencing. Diagnostic also revealed `.reveal-section` was a pure GSAP selector hook never defined in any CSS — a dead className in 5 files once GSAP was removed.

Pre-flight diagnostic prompt confirmed exact port mapping: GSAP `from { opacity: 0, y: 40 }` → `to { opacity: 1, y: 0 }` with `duration: 0.8, ease: 'power3.out', start: 'top 80%', once: true` maps to framer-motion `initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }} viewport={{ once: true, amount: 0.2 }}`. The `[0.215, 0.61, 0.355, 1]` cubic-bezier is an exact mathematical match for `power3.out` (cubic-out). The `amount: 0.2` matches `start: 'top 80%'` semantics within ~tens of pixels — visually indistinguishable.

Action prompt: converted 5 outer `<section>` elements to `<m.section>` (Services, WhyNestCalc, Contact, Testimonials, TechStack), stripped dead `.reveal-section` className from all consumers, removed `useEffect` + dynamic `./lib/animations` import from App.tsx (App is now a pure render component), deleted `src/lib/animations.ts` entirely, uninstalled `gsap` + `@gsap/react`. Build green, zero TS errors, zero warnings.

Bundle delta: animation-vendor 201,444 → 88,530 raw (−112,914 / −56.1%), 74,116 → 30,598 gzip (−43,518 / −58.7%). Total dist/ 841K → 725K (−116 KB on disk). Diagnostic V1.4.6-P2 had estimated ~80 KB raw / ~30 KB gzip — actual was ~40% better.

### P2 — ParticleField lazy-loaded via React.lazy + Suspense

Diagnostic confirmed ParticleField was an ideal lazy candidate: zero module-scoped side effects (no top-level browser API reads, no event listeners attached at module scope), single importer (Hero.tsx — confirmed via grep), purely decorative (`pointer-events-none` + `aria-hidden="true"` + behind-content `z-0`), sibling layers (GradientMesh, hero text/CTA) render and are fully usable without it, Hero has `min-h-screen` so layout dimensions don't depend on it. Three signals that flag a clean React.lazy target.

Pre-check confirmed ParticleField is a named export (`export function ParticleField`), not a default export — required `.then(mod => ({ default: mod.ParticleField }))` shape in the lazy import. Naming the lazy alias `m` would have shadowed the existing framer-motion `m` import in Hero.tsx, so the const was named explicitly: `const ParticleField = lazy(() => import('../effects/ParticleField').then(mod => ({ default: mod.ParticleField })))`.

Action prompt: updated Hero.tsx React import to include `lazy` and `Suspense`, replaced static ParticleField import with module-level lazy declaration, wrapped JSX render in `<Suspense fallback={null}>` (correct choice for purely decorative components — non-null fallback would re-introduce work into the critical path and undo most of the benefit).

Bundle delta: new ParticleField-0EAL8gCL.js chunk emitted at 26,737 raw / 11,711 gzip. Entry chunk (index-*.js) shrank 225,454 → 199,015 raw (−26,439 / −11.7%), 76,224 → 64,734 gzip (−11,490 / −15.1%). Total dist/ unchanged at 725K — this was a split, not a removal. The win is what gets parsed before first paint, not total payload.

### Lighthouse impact (V1.4.6 → V1.4.7 final)

**Desktop:**
- Performance: 0.95 → 0.98 (+0.03)
- FCP: 1122 → 909 ms (−213 ms, −19%)
- LCP: 1122 → 909 ms (−213 ms, −19%)
- Speed Index: 1422 → 1059 ms (−363 ms, −25.5%) — **surprising upside from removing GSAP main-thread work**
- TBT: 0 → 0 ms
- CLS: 0.001 → 0.001
- unused-javascript: 64 → 23 KiB (−64%, score still 0.5)

**Mobile:**
- Performance: 0.88 → 0.90 (+0.02)
- FCP: 2993 → 2815 ms (−178 ms, −5.9%)
- LCP: 3069 → 2890 ms (−179 ms, −5.8%)
- Speed Index: 2993 → 2815 ms (−178 ms, −5.9%)
- TBT: 22 → 0 ms
- CLS: 0 → 0
- **unused-javascript: 60 KiB FAIL → 0 PASS (audit cleared completely)**

Accessibility, Best Practices, SEO held at 100/100/100 on both form factors. Zero regressions.

The headline result is the mobile unused-JS audit clearing completely. That audit had been failing since the V1.4.5 baseline. The combined GSAP removal + ParticleField split eliminated the finding entirely on mobile. On desktop the audit moved from FAIL to 0.5 partial (23 KiB residual — likely because LH desktop coverage analyzer evaluates more aggressively eager-loaded code than the mobile pass).

The desktop Speed Index drop (−25.5%) was the surprise of the session. Speed Index measures visual completeness over time — that's main-thread parse/compile relief, not network bytes. Removing GSAP eliminated work the browser was doing during the FCP window. When evaluating future "remove a dependency" wins, factor in main-thread relief, not just network bytes.

### Workflow improvements

- **Diagnostic-first paid off twice in V1.4.7** — P1A pre-flight caught the dead `.reveal-section` className issue (would have left 5 files with a meaningless class name), the unused `useInView` hook (left alone, not deleted), and the `useEffect` import that becomes unused after GSAP removal (would have failed `tsc -b` strict). P2 pre-check caught the named-export-vs-default-export issue and the `m` import shadowing risk. Always include export-style verification in React.lazy prompts.
- **Splitting ≠ removing** — V1.4.7-P2 dropped entry chunk 26.4 KB raw / 11.5 KB gzip without changing total dist/ size. The win is critical-path JS reduction, not bundle size. Look at entry-chunk delta + critical-path JS audit, not total payload.
- **Pure-decorative components are ideal lazy candidates** — Three signals: (1) `pointer-events-none` (cannot receive input), (2) `aria-hidden="true"` (invisible to assistive tech), (3) layout doesn't depend on it. When all three are true, `<Suspense fallback={null}>` is correct — anything else re-introduces critical-path work.

---

## Next Session (V1.4.8)

### Decision needed up front
V1.4.8 has the same path-decision moment V1.4.7 had: continue perf optimization (mobile FCP at 2.8s is the primary remaining lever — animation-vendor lazy-load is the next-biggest target) or pivot to content replacement (testimonials, tech logos, AI Strategy card).

### V1.4.8 perf candidates (if continuing perf path)
1. **Lazy-load animation-vendor chunk** — Defer the framer-motion chunk (~75 KB gzip) until first scroll. Higher complexity than V1.4.7-P2 because framer-motion is consumed by multiple components, not just one. The straight React.lazy pattern doesn't apply directly to a vendor chunk — needs a strategy decision (lazy LazyMotion wrapper at root with non-animated fallback, per-component lazy-loading for below-the-fold sections, or IntersectionObserver-triggered import on first scroll).
2. **Other LCP/FCP levers** — V1.4.7-P0 diagnostic should be re-run early in V1.4.8 to identify what's now gating mobile FCP (2.8s) after the V1.4.7 wins.

### V1.4.8 content candidates (if pivoting to content)
1. **Replace placeholder testimonials with real quotes** — Testimonials section currently shows "Coming Soon" badge with 0 testimonials. Need real testimonial copy from Daron.
2. **Replace tech logo placeholders with actual SVG logos** — TechStack.tsx has 12 emoji/text placeholders (⚛, ▲, TS, 🌊, 🐍, ⬢, ⚡, ☁, ◎, ◈, 🔗, TF). Need real SVG/img assets sourced and dropped into `src/assets/tech/` (or named directory) before the action prompt runs.
3. **Replace "Coming Soon" service card** — Services.tsx still has 1 of 4 cards as "Coming Soon" (AI Strategy & Consulting). Needs specific content or a link target.

### Backlog (carries forward)
- Mobile Guardian Bird flight slow movement and touch responsiveness — V1.5+
- Wordmark visual balance (HFC vs Casawise text scale difference — needs source SVGs)
- Animated bird logo video integration (need clean file)
- Social sharing preview image (verify OG renders)
- Standalone routes for legal pages (/privacy, /terms, /disclaimer)
- npm audit pre-existing issues (1 moderate, 1 high) — not introduced by V1.4.7, flag for separate audit pass
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

V1.4.x is the **post-launch polish phase**: small surgical improvements while the LP is live and serving as the NestCalc.ai company website. Each version ships 2–7 small, independently-revertible commits. Big content/branding work is deferred to V1.5.x once domain + GA4 + brand finalization unblock.

V1.4.7 was a clean two-prompt perf session (P1A GSAP removal + P2 ParticleField lazy-load) that hit every primary target and exceeded the diagnostic estimates. The diagnostic-first pattern paid off twice — P1A pre-flight caught the dead className + unused import + tsc-strict trap, P2 pre-check caught the named-export collision before the action prompt was written. Both action prompts succeeded on first execution with green builds.

The headline result was the mobile unused-javascript audit clearing completely (60 KiB FAIL → 0 PASS) — first time this audit has passed on mobile since the V1.4.5 baseline. The combined effect of removing GSAP and lazy-loading ParticleField restructured the critical-path JS budget enough that LH no longer flags any unused JS in the initial mobile download.

The desktop Speed Index drop (1422 → 1059 ms, −25.5%) was the unexpected upside. Speed Index measures visual completeness over time — that's main-thread parse/compile time, not network. Removing GSAP eliminated work the browser was doing during the FCP window on top of the bundle savings. This adds a new evaluation dimension for future dependency-removal wins: factor in main-thread relief, not just network bytes.

V1.4.8 has clear next steps either way: animation-vendor lazy-load is the next-biggest perf lever, or content replacement is the next-biggest production-readiness lever. Both paths are independent — they can be tackled in either order across V1.4.8 / V1.4.9 without conflict.
