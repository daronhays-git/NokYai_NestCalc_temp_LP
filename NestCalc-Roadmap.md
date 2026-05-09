# NestCalc.ai Landing Page — Roadmap

**Last Updated:** May 9, 2026
**Current Status:** V1.4.5 deployed (tag v1.4.5) — JSON-LD validated by Google Rich Results Test, NokYai → NestCalc rename cleanup complete (config + docs + CI), image oversize fixed (320px wordmarks + 96×96 logo, total bytes 80 KB → 31 KB), llms.txt at site root, Contact.tsx setTimeout unmount cleanup
**Branch:** main
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP

---

## Completed Phases

| Version | Tag | Highlights |
|---------|-----|-----------|
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

## What Changed in V1.4.5

### P1 — Organization JSON-LD logo + sameAs fix
Audited Organization + Person schemas in index.html. Person schema clean (zero drift from bio package V5 canonical). Organization schema had two real issues: `logo` field pointed to the 1200×630 OG social image instead of a true logo (would fail Google's logo guidelines), and `sameAs` was missing. Fix: copied `src/assets/nestcalc-logo-gold-green.png` (200×200, 20.85 KB) to `public/logo.png` so it serves at `https://nestcalc.ai/logo.png`; updated schema `logo` field; added `sameAs: ["https://www.linkedin.com/in/daron-hays"]`. Validated via Google Rich Results Test on both Googlebot desktop and smartphone profiles — Organization detected as 1 valid item on both.

### P2 — NokYai → NestCalc rename cleanup (config + docs + CI)
Audited 173 NokYai references across the repo and categorized into 6 buckets: A (factually wrong about code — files/components that have been renamed), B (stale doc titles), C (intentional real identifiers — repo URL, folder paths, allowlisted commands), D (historical snapshots — handoff files, build artifacts), E (review stack branding — "NokYai Review Stack" → "NestCalc Review Stack"), F (bird mascot identity). Applied A + B + E + F in a single batch: 32 line edits across 16 files plus 1 file rename (`docs/nokyai-review-stack-ops-guide.md` → `docs/nestcalc-review-stack-ops-guide.md`, tracked as a true rename at 96% similarity preserving file history). Bird mascot renamed to generic "Guardian Bird" so it ages well across future projects. Favicon description updated to "(eagle/NestCalc logo)". Final residual: 127 NokYai matches, all in Category C or D. Build clean, zero source code changes.

### P3 — Image oversize cleanup
Lighthouse image-delivery-insight was still failing on the oversize dimension after V1.4.4's WebP conversion. Root cause: wordmarks were 600px source rendered at ~150px (4× over), brand logo was 200×200 rendered at ~48px. Extended `scripts/optimize-wordmarks.mjs` to generate appropriately-sized variants. Wordmarks → 320px WebP + PNG (Casawise -53%, HFC -52%). Brand logo → 96×96 WebP + PNG; the 2.6 KB logo WebP falls under Vite's 4 KB `assetsInlineLimit` and gets base64-inlined into the JS bundle, eliminating one HTTP request entirely. Total delivered bytes 80 KB → 31 KB (-62%). Original source files preserved for future high-DPR use. Visual rendering unchanged (Tailwind sizing identical). Lighthouse mobile image-delivery audit moved from FAIL (0) to partial (0.5) — remaining 18 KB residual is a DPR-vs-quality tradeoff (accepted by design).

### P4 — llms.txt at site root
Added `public/llms.txt`, spec-compliant per llmstxt.org (H1 + blockquote summary + prose intro + 5 H2 sections with `[Title](URL): description` link format). Sections: Company, Products, Services, Founder, Trust and Legal. Founder credentials drawn from bio package V4 short bio (30+ years, B.S. Structural Engineering Honors Oregon State, licensed GC at 18, 52 homes, $15M+ contracts). Reframed founder role as founder of the NestCalc.ai studio (umbrella entity), with Casawise.ai called out as the AI app. Khanom/Thailand location explicitly excluded per Wyoming-only address policy. Should clear the (intermittent) Lighthouse llms-txt audit and provides the canonical entry point for AI agent crawls (ChatGPT search, Claude, Perplexity).

### P5 — Khanom/Thailand/Bangkok policy audit (diagnostic only)
Confirmed repo is fully aligned with the Wyoming-only address policy. Zero user-facing matches (index.html, public/, src/components/**, JSON-LD schemas all clean). Zero docs/dev-only matches. Two historical changelog entries in `NokYai-Roadmap.md` document the prior removal of Bangkok references — kept as-is per the historical-snapshot policy (those entries are the audit trail of the policy itself). Bio package OneDrive doc still has "Based in Khanom, Thailand" — out of repo scope, flagged for separate cleanup.

### P8 — Contact.tsx setTimeout unmount cleanup
Pre-existing harmless edge case: the 3-second `setCopied(false)` timeout didn't clear when the component unmounted. Fixed by replacing inline `setTimeout` with a `useRef<ReturnType<typeof setTimeout> | null>` plus a `useEffect` cleanup that clears the timeout on unmount. Bonus: pre-clear before each new schedule handles rapid double-clicks (re-anchors the toast to a fresh 3 s window from the second click). Footer.tsx has the same pattern but uses its own state — flagged for V1.4.6 follow-up.

### P9 — `__APP_VERSION__` footer wiring verification (diagnostic only)
Confirmed end-to-end wiring is mechanically correct: `vite.config.ts` reads from `package.json` at build time via `define` config and JSON-stringifies for substitution; `Footer.tsx` uses `V{__APP_VERSION__}` JSX expression with no hardcoded version string anywhere; rendered output matches package.json content exactly. No code change needed — package.json bump at session close cascades correctly to the deployed footer.

---

## Next Session (V1.4.6)

### Priorities
1. **Render-blocking-insight reduction** — Lighthouse flags 440 ms desktop / 1,200 ms mobile. Biggest remaining performance win. Likely candidates: lazy-load fonts, defer non-critical CSS, audit `<link rel="stylesheet">` and inline `<script>` blocks in `index.html`.
2. **Unused JavaScript reduction** — Lighthouse flags 43 KB desktop / 75 KB mobile. Likely candidates: tree-shake unused Framer Motion / GSAP exports, route-split lazy-loaded sections, audit utility imports.
3. **Mobile smoke test verification** — Daron will run mobile-device verification post-deploy. Any regressions become V1.4.6-P-prefixed fix prompts.
4. **Footer.tsx setTimeout unmount cleanup** — Apply V1.4.5-P8 fix pattern to Footer.tsx (same useRef + useEffect approach).

### Backlog
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file)
- Social sharing preview image (verify OG renders)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with content or link
- Standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Wordmark visual balance (V5 placeholder — hold for source files)
- Bio package OneDrive source still references "Based in Khanom, Thailand" — out of repo scope; flagged for separate cleanup pass
- Google Analytics 4 setup (still blocked — domain/bank pending)
- Future: proper SVG wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Parked
- NokYai.com brand (retired)
- Controller agent (parked until all 8 agents running)
- Autonomous wandering bird behavior on mobile
- Wordmark visual balance fix (HFC vs Casawise text scale difference — needs source SVGs)

---

## Phase Tracking Notes

V1.4.x is the **post-launch polish phase**: small surgical improvements while the LP is live and serving as the NestCalc.ai company website. Each version ships 3–7 small, independently-revertible commits. Big content/branding work is deferred to V1.5.x once domain + GA4 + brand finalization unblock.

V1.4.5 was a heavy session — 7 prompts shipped (P1, P2, P3, P4, P5, P8, P9), 4 production commits before close. The pattern of diagnostic-first prompting paid off again: P2's audit categorization prevented over-reach (would have renamed real GitHub identifiers) AND under-reach (would have missed the dead-code references). P9's wiring verification confirmed nothing needed changing — sometimes the diagnostic IS the deliverable.
