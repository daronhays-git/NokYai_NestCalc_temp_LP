# NestCalc LP V1.4.8 — Handoff

**Created:** May 9, 2026
**Starting Point:** V1.4.7 deployed (tag v1.4.7)
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Live:** https://nestcalc.ai (auto-deploy from main branch via Netlify)
**Dev:** http://localhost:5173
**Goal:** Continue mobile FCP/LCP optimization OR pivot to content replacement (testimonials, tech logos)

**⚠️ Supersedes:** NestCalc-V1.4.7-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.7)

### What Was Completed in V1.4.7

- **GSAP removed, .reveal-section replaced with framer-motion m.section whileInView (P1A)** — 5 sections converted (Services, WhyNestCalc, Contact, Testimonials, TechStack). Port settings: opacity 0→1, y 40→0, duration 0.8s, ease cubic-out [0.215, 0.61, 0.355, 1], viewport once amount 0.2. Removed useEffect + dynamic animations import from App.tsx (App is now a pure render component). Deleted src/lib/animations.ts (54 lines, no longer referenced). Stripped dead `.reveal-section` className from all consumers (was a pure GSAP selector hook, never defined in CSS). Uninstalled gsap + @gsap/react. Bundle impact: animation-vendor −112.9 KB raw / −43.5 KB gzip (−58.7%). Beat the V1.4.6-P2 diagnostic estimate by ~40%.
- **ParticleField lazy-loaded via React.lazy + Suspense (P2)** — Converted static import in Hero.tsx to lazy import using named-export shape: `lazy(() => import('../effects/ParticleField').then(mod => ({ default: mod.ParticleField })))` to avoid shadowing the `m` import from framer-motion. Wrapped render in `<Suspense fallback={null}>` (purely decorative — pointer-events-none + aria-hidden="true" + behind-content z-0). Particles + Guardian Bird now load off the critical render path. Hero text and CTAs paint immediately, no longer competing with 628-line canvas effect during FCP window. Bundle impact: entry chunk −26.4 KB raw / −11.5 KB gzip (−15.1%). New ParticleField-*.js chunk: 26.7 KB raw / 11.8 KB gzip. Total dist/ unchanged (split, not removal).
- **Lighthouse V1.4.7 baselines captured** — Reports overwritten in `docs/reports/lighthouse-v1.4.7-{desktop,mobile}.{html,json}` after both perf changes deployed. Headline result: **mobile unused-javascript audit fully cleared (60 KiB → 0, FAIL → PASS)** — first time this audit has passed on mobile since the V1.4.5 baseline. Desktop unused-JS −64% (64 → 23 KiB).
- **Lighthouse score improvements (V1.4.6 → V1.4.7):**
  - Desktop Performance: 0.95 → 0.98 (+0.03)
  - Mobile Performance: 0.88 → 0.90 (+0.02)
  - Desktop FCP / LCP: 1122 → 909 ms (−213 ms, −19%)
  - Desktop Speed Index: 1422 → 1059 ms (−363 ms, −25.5%) — surprising upside from removing GSAP main-thread work
  - Mobile FCP / LCP: 2993 → 2815 ms (−178 ms, −6%)
  - Mobile TBT: 22 → 0 ms
  - Accessibility, Best Practices, SEO held at 100/100/100 (zero regressions)

### What's Pending

- **Mobile FCP/LCP still primary lever (2.8s mobile FCP is gating mobile Performance score)** — V1.4.7 cleared unused-JS but FCP score is 0.56 on mobile. Next-tier perf candidates target this.
- **Lazy-load animation-vendor chunk (next-biggest perf lever)** — Defer the framer-motion chunk until first scroll. Medium effort, defers ~75 KB gzip past first paint. The static `<m.section>` markup in Hero would need to either fall back to plain `<section>` until lazy-load or accept a delayed reveal animation. Candidate for V1.4.8 if continuing perf path.
- **Mobile Guardian Bird responsiveness** — Slow movement and slow response to touch on mobile. Minor visual issue; parked for V1.5+.
- **Wordmark visual balance (placeholder)** — HFC and Casawise wordmarks have different text scales. Hold until source files (proper SVG variants) are available.
- Replace placeholder testimonials with real quotes (Testimonials section has 0 testimonials, just a "Coming Soon" badge)
- Replace tech logo placeholders with actual SVG logos (12 placeholders, all unicode/emoji glyphs in TechStack.tsx)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with specific content or link
- Write final copy for all sections
- Google Analytics 4 setup (still blocked — waiting on domain/bank setup)
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
- npm audit pre-existing issues (1 moderate, 1 high) — not introduced by V1.4.7, flag for separate audit pass
- Bio package OneDrive source still references "Based in Khanom, Thailand" — out of repo scope
- Future: provide proper SVG versions of wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Known MINOR Issues

- TechStack padding (py-16 lg:py-20) differs from other sections — intentional for compact marquee
- Mailto toast may be obscured by mailto redirect — fleeting feedback; functional behavior verified
- CustomCursor useEffect deps array `[mouseX, mouseY]` — lint nit only
- Legal modal text small, no footer link — cosmetic
- HFC and Casawise wordmark visual scales differ slightly — acceptable (hold for SVG sources)
- "View live →" button height slightly shorter than wordmark buttons — acceptable
- HFC wordmark has faint cream "house" outline competing with lightning bolt — readable but less crisp
- Lighthouse run-noise on Windows headless Chrome — Desktop FCP can swing 200 ms; ±1–2 score points is noise
- Lighthouse image-delivery-insight remains at 0.5 partial pass (18 KB flagged) — accepted as DPR-vs-quality tradeoff
- Mobile Guardian Bird flight slow to move and slow to respond to touch — parked for V1.5+
- Lighthouse desktop unused-javascript audit did not fully clear like mobile did (still 0.5 score, 23 KiB) — likely because LH desktop coverage analyzer evaluates more aggressively than mobile pass

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NestCalc-V1.4.7-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1.4.8-Handoff.md`) is loaded in project files
3. Open a new Claude.ai chat and type:

```
si-code
```

The handoff file in project files is the context — si-code loads it silently and confirms ready.

**If si-code fails to render the side panel:** proceed without the skill. Paste the Claude Code INIT block from Section 3 directly into VS Code.

---

## SECTION 3: Claude Code Context Prompt

⚠️ THIS IS CONTEXT ONLY — paste into Claude Code in VS Code AFTER Claude.ai is initialized.

```
NestCalc LP V1.4.8 — continuing from V1.4.7 (tag v1.4.7).

PROJECT CONTEXT:
- Vite + React 19 + TypeScript frontend
- Terminal: C:\Users\daron\dev3\nokyai-lp> npm run dev
- Dev server: http://localhost:5173
- Branch: main
- Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
- Deployed via Netlify (auto-deploy from main)

COMPANY STRUCTURE:
- NestCalc.ai, LLC is the umbrella company
- Two apps: HomeFastCalc.com (simplified non-AI calculator)
  and Casawise.ai (AI-powered RE analysis, formerly NestCalc.ai app)
- This LP is the NestCalc.ai company website

FILE STRUCTURE:
- src/components/layout/    (Navbar.tsx, Footer.tsx)
- src/components/sections/  (Hero, Services, Testimonials,
                             TechStack, WhyNestCalc, Contact)
- src/components/ui/        (MagneticButton, GlowCard, SectionHeading,
                             CustomCursor, ScrollProgress)
- src/components/effects/   (ParticleField — lazy-loaded as of V1.4.7,
                             GradientMesh, NoiseOverlay)
- src/components/legal/     (LegalModal, PrivacyPolicy, TermsOfService,
                             Disclaimer)
- src/styles/globals.css
- src/lib/birdPaths.ts      (Guardian Bird SVG paths)
- src/lib/contact.ts        (EMAIL, EMAIL_DISPLAY, copyAndOpenMailto)
- src/hooks/                (useMousePosition, useScrollProgress, useInView)
- src/assets/               (nestcalc-logo-gold-green.png + 96 variants,
                             casawise-wordmark-final.{png,webp} + 320 variants,
                             homefastcalc-wordmark-final.{png,webp} + 320 variants)
- scripts/                  (optimize-wordmarks.mjs)
- public/                   (logo.png 200x200, llms.txt, favicons,
                             og-image.png, robots.txt, sitemap.xml)

ANIMATION STACK (post-V1.4.7):
- framer-motion (m + LazyMotion + domAnimation) ~75 KB gzip — only library
- gsap REMOVED in V1.4.7 (was 1 file, 54 lines, replaced with whileInView)
- src/lib/animations.ts no longer exists
- ParticleField lazy-loaded via React.lazy + Suspense (own chunk)

AGENT STACK:
- Commands: /shield, /eagle, /lighthouse, /scribe
- CI: Shield + Eagle + Scribe + Review-All on PRs, Lighthouse on push
- Baseline: docs/reports/agent-baseline-2026-04-15.md
- Latest CLI Lighthouse: docs/reports/lighthouse-v1.4.7-{desktop,mobile}

COLOR PALETTE:
  Backgrounds: #0f2920 (deep) / #1a3a2a (forest) / #2d5a42 (medium)
  Text: #FFFFFF (headings) / #FEF3C7 (body) / #D4C9A8 (captions)
  Accents: #F59E0B (gold) / #0d9488 (teal) / #dc2626 (errors)

CRITICAL RULES:
- One change per prompt
- Verify on localhost after every change
- Do NOT modify fonts (Space Grotesk + Outfit locked in)
- Do NOT change section order or component structure
- Do NOT change the color palette
- Git push goes to origin (NokYai_NestCalc_temp_LP) on main
- Every Claude Code prompt ID on the FIRST line of the code block
- Explicit git add <path> — NEVER git add -A
```

---

## SECTION 4: Next Session Prompts

V1.4.8 has a path-decision moment up front, similar to V1.4.7: continue perf optimization (mobile FCP at 2.8s is the primary remaining lever — animation-vendor lazy-load is the next-biggest target) OR pivot to content replacement (testimonials, tech logos, AI Strategy card). The first prompt is a decision-framing diagnostic.

### Prompt V1.4.8-P0 — Decision framing: perf vs content for V1.4.8

```
V1.4.8-P0 — Decision framing diagnostic

V1.4.7 cleared mobile unused-javascript audit (60 KiB → 0, FAIL → PASS)
and dropped desktop Speed Index 25.5%. Mobile Performance is now 0.90,
gated primarily by FCP (2.8s, score 0.56) and LCP (2.88s, score 0.81).

Daron is choosing the V1.4.8 direction: continue perf optimization
or pivot to content replacement. This diagnostic gathers the data
needed for the decision. Read-only.

1. Pull the latest mobile + desktop Lighthouse reports from
   docs/reports/lighthouse-v1.4.7-{desktop,mobile}.report.json
   - Report current Performance score (mobile + desktop)
   - List remaining audits with score < 1.0, ordered by potential
     savings (ms or KB) — focus on what's gating mobile FCP/LCP

2. animation-vendor chunk lazy-load feasibility check:
   - Confirm animation-vendor-*.js is currently eager (loaded in
     entry chunk's import graph)
   - Find every consumer of m / LazyMotion / framer-motion in src/
   - Check if Hero.tsx is the only consumer that fires above-the-fold
     (if other sections use framer-motion only on whileInView, those
     don't need the lib until scroll)

3. Content placeholder count (for content-path option):
   - Count testimonials in src/components/sections/Testimonials.tsx
     (V1.4.7 confirmed 0 real testimonials, "Coming Soon" badge)
   - Count tech logos in src/components/sections/TechStack.tsx
     (V1.4.7 confirmed 12 emoji/text placeholders, 0 real SVG logos)
   - Confirm Services.tsx still has 1 "Coming Soon" card (AI Strategy)

4. Report:
   - Lighthouse remaining-savings ranked list (mobile-focused)
   - animation-vendor lazy-load feasibility (consumer map)
   - Content placeholder count (unchanged from V1.4.7-P0?)
   - Daron's two paths: animation-vendor lazy-load (perf) vs
     placeholder replacement (content)

Do NOT change anything. This is decision-framing only.
```

### Prompt V1.4.8-P1A — Lazy-load animation-vendor chunk (perf path, IF Daron picks perf)

```
V1.4.8-P1A — Lazy-load animation-vendor (framer-motion) chunk

ONLY run this prompt if V1.4.8-P0 confirmed:
- animation-vendor is still eager-loaded
- Most framer-motion consumers fire only on whileInView (i.e., below
  the fold or on scroll)
- Daron has chosen the perf path for V1.4.8

This is more complex than V1.4.7-P2 (ParticleField lazy-load) because
framer-motion is consumed by multiple components, not just one. The
straight React.lazy pattern doesn't apply directly to a vendor chunk.

STEP 1 — Audit framer-motion consumers
For each consumer file, identify:
   - Which framer-motion features are used (m.X, AnimatePresence,
     whileInView, useScroll, etc.)
   - Whether the component renders above the fold or on scroll
   - Whether a fallback to plain HTML elements would work for the
     above-the-fold case

STEP 2 — Strategy options
Consider these patterns:
   a) Lazy-load the entire LazyMotion wrapper at the App root,
      with a fallback that renders children without animation
   b) Split per-component: keep Hero static, lazy-load animation
      for everything below the fold via React.lazy on the section
      level
   c) Defer until first scroll: use IntersectionObserver to trigger
      the framer-motion import on first scroll event

STEP 3 — STOP. Report findings + recommended strategy.
The action plan depends on the consumer audit results.
```

### Prompt V1.4.8-P1B — Replace placeholder testimonials (content path, IF Daron picks content)

```
V1.4.8-P1B — Replace placeholder testimonials

ONLY run this prompt if V1.4.8-P0 confirmed:
- Testimonials section still has placeholder/empty state
- Daron has chosen the content path for V1.4.8
- Real testimonial copy is ready (Daron will paste in chat
  before this prompt)

STEP 1 — Read src/components/sections/Testimonials.tsx and report:
   - Current rendered state (Coming Soon badge per V1.4.7-P0)
   - Component structure — how was it set up to receive an array
     of testimonials when content arrives?
   - Whether data lives inline or imported from constants

STEP 2 — STOP. Wait for Daron to paste real testimonial copy.
```

### Prompt V1.4.8-P1C — Replace tech logo placeholders (content path, IF Daron picks content)

```
V1.4.8-P1C — Replace tech logo placeholders with real SVGs

ONLY run this prompt if V1.4.8-P0 confirmed:
- TechStack still has 12 emoji/text placeholders
- Daron has chosen the content path for V1.4.8
- Daron has sourced real SVG/img assets for the 12 logos and
  placed them in src/assets/tech/ (or named directory) before
  this prompt runs

STEP 1 — Read src/components/sections/TechStack.tsx and report:
   - Current data structure for the 12 tech entries
   - Where the icon strings (⚛, ▲, TS, etc.) live
   - Whether the structure can accept SVG/img refs as drop-in
     replacements without component refactoring

STEP 2 — Read src/assets/tech/ directory (or wherever Daron
placed the assets) and list available SVG/img files

STEP 3 — STOP. Action prompt comes after diagnostic findings.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW V1.4.7] Splitting (lazy-load) ≠ removing — total dist/ unchanged but critical-path JS shrinks** — V1.4.7-P2 dropped entry chunk 26.4 KB raw / 11.5 KB gzip without changing total dist/ size. The win is what gets parsed before first paint, not total payload. When evaluating perf changes, look at the entry-chunk delta + critical-path JS audit, not just total bundle size.

**[NEW V1.4.7] React.lazy with named export needs `.then(mod => ({ default: mod.ParticleField }))` shape** — When the consuming file (Hero.tsx) already imports `m` from framer-motion, naming the lazy alias `m` would shadow it. The cleanest pattern is `lazy(() => import('../effects/ParticleField').then(mod => ({ default: mod.ParticleField })))` with the const named explicitly (`const ParticleField = lazy(...)`). Avoids shadowing AND handles named-vs-default export in one line.

**[NEW V1.4.7] Pure-decorative components are ideal lazy candidates** — ParticleField had `pointer-events-none` + `aria-hidden="true"` + behind-content z-0, with sibling elements rendering layout-independently. Three signals that flag a component as a clean React.lazy target: (1) cannot receive input, (2) invisible to assistive tech, (3) layout doesn't depend on it. When all three are true, `<Suspense fallback={null}>` is the right choice — re-introducing a loading state would add work back to the critical path and undo the benefit.

**[NEW V1.4.7] Removing GSAP eliminated main-thread work on top of bundle savings** — Diagnostic estimated ~80 KB raw / ~30 KB gzip from animation-vendor. Actual was −112.9 KB raw / −43.5 KB gzip (40% better than estimate). But the surprising upside was Desktop Speed Index dropping 25.5% (1422 → 1059 ms) — that's main-thread parse/compile time, not network time. When evaluating future GSAP-style "remove a dependency" wins, factor in main-thread relief, not just network bytes.

**[NEW V1.4.7] Lighthouse "unused-javascript" audit can fully clear when critical-path code is restructured even if total bundle size is unchanged** — V1.4.7-P2 split ParticleField off the entry chunk; total dist/ unchanged at 725K. Mobile unused-JS audit went 60 KiB FAIL → 0 PASS because LH measures unused code in the *initial download*, not total payload. Splitting code into deferrable chunks satisfies the audit even without removing anything.

**[NEW V1.4.7] Diagnostic-first + STOP-and-report-before-edits caught the named-export collision before the action prompt was written** — The V1.4.7-P2 diagnostic prompt included a PRE-CHECK step asking Claude Code to confirm export style before writing the lazy import. This caught the named-export-vs-default-export issue (and the `m` shadowing risk) and let the action prompt include the correct shape on first try. Always include export-style verification when writing React.lazy prompts for files Claude hasn't seen recently.

**[NEW V1.4.7] cubic-out ease as exact GSAP power3.out match in framer-motion** — `ease: [0.215, 0.61, 0.355, 1]` is the cubic-out cubic-bezier and is an exact mathematical match for GSAP's `'power3.out'`. Using `'easeOut'` (framer-motion preset) is close but not identical for short translates; use the cubic-bezier array when porting from GSAP for visual parity.

**[NEW V1.4.7] viewport={{ once: true, amount: 0.2 }} matches GSAP's `start: 'top 80%'` semantics closely** — When porting ScrollTrigger reveals to whileInView, `amount: 0.2` (20% of element visible) approximates GSAP's "top of element hits 80% of viewport" trigger. Not pixel-exact (differs by ~tens of pixels on tall sections) but visually indistinguishable. Use `viewport={{ once: true, margin: '0px 0px -20% 0px' }}` if pixel-exact match is needed, but `amount: 0.2` is cleaner and idiomatic.

**[NEW V1.4.7] Dead className strings should be stripped during refactors** — V1.4.7-P1A diagnostic found `.reveal-section` was a pure GSAP selector hook, never defined in any CSS. After GSAP removal, the className was a dead string in 5 files. Stripping it in the same prompt as the GSAP removal kept the codebase clean and prevented "what does this className do?" confusion in future audits. Always grep CSS files for class definitions when removing the JS that consumes them.

**[Carried V1.4.6] `<LazyMotion strict>` throws ReferenceError when motion JSX survives migration** — when `motion` is removed from imports but a `<motion.X>` JSX reference survives, the runtime error is `motion is not defined` (plain ReferenceError), not a clearly-attributed LazyMotion error. The error stack still pinpoints the file and line.

**[Carried V1.4.6] Cached browser bundles after Vite migrations need hard-refresh (Ctrl+Shift+R)** — after a bulk JSX migration, even a clean grep + clean build can show stale errors in the browser because Vite caches transformed modules aggressively. ALWAYS try hard-refresh first before chasing a phantom code bug.

**[Carried V1.4.6] media="print" onload swap is the cleanest non-blocking stylesheet pattern** — `<link rel="stylesheet" media="print" onload="this.media='all'">` + `<noscript>` fallback is one-line surgery that works in every modern browser.

**[Carried V1.4.6] Diagnostic-first paid off three times in V1.4.6 and twice in V1.4.7** — Each diagnostic prevented either over-reach or under-reach. The pattern is now baseline practice for every prompt series.

**[Carried V1.4.6] Code blocks reserved for Claude Code prompts only** — User-facing instructions go in plain prose. Permanent rule.

**[Carried V1.4.6] Build commands always go to Claude Code, not the user** — `npm run build`, `npm run preview`, `npm run dev`, grep, etc. — Claude Code runs these faster and reports back deterministically. Permanent rule.

**[Carried V1.4.6] When user says "too much output," shorten and STAY short** — don't drift back to long-form on the next response.

**[Carried V1.4.6] Bundle size delta confirmation: build numbers > Lighthouse audit numbers** — Lighthouse `unused-javascript` audit can show misleading deltas across runs. Source of truth is the local `npm run build` output.

**[Carried V1.4.6] Variants in workflow skills create friction faster than they solve problems** — When a skill grows multiple paths, ask whether collapsing them loses anything real or just removes friction.

**[Carried V1.4.5] Lighthouse Rich Results Test has TWO modes (desktop + smartphone)** — verify both after schema changes.

**[Carried V1.4.5] Lighthouse image-delivery-insight uses CSS pixel comparison (no DPR awareness)** — accept partial pass (0.5) when residual flag is the DPR margin needed for retina quality.

**[Carried V1.4.5] When the same trivial issue keeps surfacing across sessions, name the pattern and ask once how to handle it permanently** — re-litigating an untracked stray file every session is production-destroying friction.

**[Carried V1.4.5] User-reported "click does nothing" on a known-correct pattern → first ask "tested in incognito with hard refresh?"** — service worker / cached state is the cheapest first hypothesis.

**[Carried V1.4.5] Constant hoist + helper is the right pattern for cross-component utilities** — Contact.tsx and Footer.tsx both use email click behavior. Hoisting to `lib/contact.ts` keeps consumers thin.

**[Carried V1.4.5] git mv preserves history at 96% similarity** — when renaming a file with substantial content edits in the same commit.

**[Carried V1.4.5] Stop-and-report guardrails should not include items the prompt itself flagged as expected** — cross-check.

**[Carried V1.4.4] CLI vs DevTools Lighthouse use different throttling** — CLI uses simulated, DevTools uses applied. Pick one, stick with it for baselines.

**[Carried V1.4.4] Lighthouse run-to-run noise is real on Windows headless Chrome** — Desktop FCP can swing 200 ms; ±1–2 score points across runs is noise.

**[Carried V1.4.4] WebP conversion savings are real but score impact is bounded** — file size reduction does not move Lighthouse Performance when LCP/FCP are dominated by other factors.

**[Carried V1.4.4] Image-delivery audit checks BOTH format AND size** — WebP alone clears format; remaining flag is "oversize."

**[Carried V1.4.4] Aspect-ratio reservation via width/height attrs is invisible but effective** — eliminates pre-load layout shift.

**[Carried V1.4.4] Field-name collisions when adding numeric variants** — watch for collision between existing string fields and new numeric fields.

**[Carried V1.4.4] Contrast fix via opacity is often safer than color change** — bumping opacity preserves visual intent while clearing AA.

**[Carried V1.4.4] Mailto links need clipboard fallback by default** — bare `<a href="mailto:">` does nothing for users without a default mail app.

**[Carried V1.4.4] Diagnostic-first reading reveals where to put new code** — running a quick read-only audit before writing implementation surfaces existing conventions and helpers.

**[Carried] Wordmark assets designed for light backgrounds need recoloring for dark cards** — recolor dark elements to cream (#FEF3C7) keeping gold accents intact, maintain transparent background.

**[Carried] h-full chain breaks at conditional wrappers** — for equal-height cards, h-full must flow through every level: motion.div → conditional anchor wrapper → GlowCard outer → GlowCard inner content layer with flex flex-col.

**[Carried] Touch event parity requires explicit touchend → returning state** — `mouseleave` does not fire on touch devices.

**[Carried] Single magic numbers reveal architecture intent** — when a 670-line file has its entire bird sizing controlled by one literal, the cleanest mobile adaptation is a single conditional, not a refactor.

**[Carried] DevTools mobile emulation is sufficient for verification** — Chrome's device toolbar simulates touch events well enough.

**[Carried] Claude Code self-flagging deserves trust** — when Claude Code reports "I followed the constraint but believe it may need an exception," verify and update accordingly.

**[Carried] Wordmark text fields in JSON-LD need actual values** — placeholder strings must be replaced before deploy validation.

**[Carried] Dual scroll (onClick scrollIntoView + anchor href) creates race condition** — Use one scroll mechanism only.

**[Carried] touchstart preventDefault kills click synthesis on mobile** — Calling `preventDefault()` on touchstart suppresses click event synthesis.

**[Carried] passive: true on touch listeners when not calling preventDefault** — Use `{ passive: true }` unless you specifically need preventDefault.

**[Carried] elementFromPoint browser diagnostic for blocking layers** — Console mousemove listener with `document.elementFromPoint(e.clientX, e.clientY)` identifies which DOM element is intercepting pointer events.

**[Carried] mix-blend-difference on gold background produces black cursor ring** — Cosmetic, not a blocking layer.

**[Carried] Company structure: NestCalc.ai, LLC is umbrella** — Two apps: HomeFastCalc.com and Casawise.ai. LP is the company website.

**[Carried] NokYai.com retired** — Brand parked. Source code, docs, and CI fully renamed in V1.4.2 + V1.4.5. Repo URL and folder paths kept (real identifiers).

**[Carried] Stray files in project directory** — Always check `git status` for sensitive files before committing. Don't re-litigate harmless strays every session.

**[Carried] Touch events on pointer-events:none canvas need window-level listeners** — ParticleField canvas has pointer-events:none, so touch listeners must be on window with bounds checking.

**[Carried] preventDefault only inside canvas bounds** — Calling preventDefault on all touch events blocks page scrolling.

**[Carried] Single CTA converts better than dual CTA** — One clear "Start Your Project" → Contact reduces decision fatigue.

**[Carried] Person + Organization JSON-LD as separate script blocks** — Don't merge schema types.

**[Carried] Claude Code can't create logo art** — SVG favicons with brand imagery need manual design.

**[Carried] Favicon SVG needs simplification for small sizes** — Detail muddles at 16-32px.

**[Carried] Check for orphaned assets periodically** — Run a grep-based audit of src/assets/.

**[Carried] Legal modal UX** — Add back/close link at both top and bottom of long scrollable content.

**[Carried] CTA label should match the target** — Rename CTAs when destination doesn't have expected content.

**[Carried] One class change can fix many Lighthouse findings** — Systematic fixes beat one-by-one patches.

**[Carried] claude-code-action@v1 only supports pull_request triggers** — push events fail with "Unsupported event type: push".

**[Carried] max_turns is not a valid input** — Use claude_args: "--max-turns 30" instead.

**[Carried] GitHub secrets are per-repo** — CLAUDE_CODE_OAUTH_TOKEN must be added manually in each repo.

**[Carried] Use claude setup-token in standalone terminal** — Cannot run inside Claude Code session.

**[Carried] Scribe can false-positive** — Always verify before acting on Scribe output.

**[Carried] Dead code accumulates silently** — Run cleanup audits periodically.

**[Carried] Favicon is what Claude Code generates, not what the prompt spec says** — Always verify generated assets.

**[Carried] Tighten mobile padding early** — Use py-12 sm:py-16 lg:py-32 pattern.

**[Carried] Footer 2x2 grid works well on mobile** — grid-cols-2 with compact gap-6.

**[Carried] Test contact forms with realistic content** — Repeated short test messages flagged as spam.

**[Carried] Netlify Akismet filtering is platform-level** — Cannot be disabled via code.

**[Carried] Always verify git remote before pushing** — Use git remote -v to confirm.

**[Carried] Canvas > Three.js for particle effects** — 2D canvas with rAF gives better mouse interaction.

**[Carried] Color scheme testing** — Visualize full section flow before implementing.

**[Carried] NestCalc palette is a competitive advantage** — Forest green + gold + warm wheat is distinctive.

**[Carried] Cloudinary video embed** — iframe embeds don't support mix-blend-mode. Use native video tag.

**[Carried] Workspace management** — Save VS Code workspaces as .code-workspace files.

---

## SECTION 6: Architecture Reference

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (CSS-first @theme) |
| Animation | Framer Motion (m + LazyMotion + domAnimation) — GSAP removed in V1.4.7 |
| Particles + Bird | 2D Canvas (custom, lazy-loaded as of V1.4.7, mobile bird at 80px / desktop 128px) |
| Fonts | Space Grotesk (display) + Outfit (body) — non-blocking load via media="print" swap |
| Forms | Netlify Forms (AJAX submission) |
| Deploy | Netlify (auto-deploy from main) |
| Agents | Shield, Eagle, Lighthouse, Scribe |
| CI | GitHub Actions (PR: Shield+Eagle+Scribe+Review-All, Push: Lighthouse) |
| Repo | GitHub: daronhays-git/NokYai_NestCalc_temp_LP |

### Company Structure
| Entity | Role |
|--------|------|
| NestCalc.ai, LLC | Umbrella company |
| HomeFastCalc.com | Simplified non-AI RE calculator app |
| Casawise.ai | AI-powered RE analysis app (formerly NestCalc.ai) |
| NestCalc.ai (this LP) | Company website and product showcase |

### Section Flow
| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Navbar | transparent → deep/80 | Navigation + "Start Your Project" CTA |
| 2 | Hero | #0f2920 deep | First impression, lazy particles, single CTA, Guardian Bird (80px mobile / 128px desktop) |
| 3 | Services | #2d5a42 medium | 4 cards — 3 link to live products via wordmark/text buttons, 1 Coming Soon |
| 4 | TechStack | #1a3a2a forest | Technology grid + marquee (12 emoji placeholders) |
| 5 | WhyNestCalc | #0f2920 deep | Stats + differentiators + founder bio |
| 6 | Testimonials | #1a3a2a forest | "Coming Soon" badge — empty state |
| 7 | Contact | #2d5a42 medium | Form + mailto + trust badges |
| 8 | Footer | #0f2920 deep | Links + legal + entity statement + email + version badge |

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNestCalc, Footer bg |
| nok-forest | #1a3a2a | TechStack, Testimonials bg |
| nok-medium | #2d5a42 | Services, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights, button borders |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels, version badge (opacity-70) |

### Lighthouse CLI Baseline (V1.4.7)
| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 98 | 90 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

CLI uses simulated throttling. Reports in `docs/reports/lighthouse-v1.4.7-{desktop,mobile}.{html,json}`.

Mobile unused-javascript: PASSING (was 60 KiB FAIL in V1.4.6).
Desktop unused-javascript: 0.5 partial (23 KiB, was 64 KiB FAIL in V1.4.6).
Mobile FCP: 2815 ms (still primary lever for V1.4.8).
Mobile LCP: 2890 ms.
Desktop FCP/LCP: 909 ms each.
Desktop Speed Index: 1059 ms (was 1422 ms in V1.4.6 — 25.5% improvement).
image-delivery-insight: 0.5 partial (DPR-vs-quality tradeoff, accepted).

### Animation Library Status (post-V1.4.7)
| Library | Status | Size | Notes |
|---------|--------|------|-------|
| framer-motion | Active (m + LazyMotion + domAnimation) | ~75 KB gzip | All consumers use m, LazyMotion+domAnimation at App root. Candidate for V1.4.8 lazy-load |
| gsap + ScrollTrigger + @gsap/react | REMOVED V1.4.7 | 0 KB | Replaced with whileInView |
| three / @react-three/* | REMOVED V1.4.6 | 0 KB | Were dead code |

### Code Splitting Status (post-V1.4.7)
| Chunk | Loading | Notes |
|-------|---------|-------|
| index-*.js (entry) | Eager | Critical path — 199 KB raw / 65 KB gzip after V1.4.7 |
| animation-vendor-*.js | Eager | 88.5 KB raw / 30.6 KB gzip — V1.4.8 lazy-load candidate |
| ParticleField-*.js | Lazy (V1.4.7-P2) | 26.7 KB raw / 11.8 KB gzip — loads off critical path |
| Section chunks (Services, etc.) | Eager | Various sizes |

---

## SECTION 7: Parked Items

- Blog/content section
- Case study detail pages
- Client portal link
- Pricing section (if applicable)
- FAQ schema when content expands
- NokYai.com brand (retired, parked)
- Controller agent (parked until all 8 agents running)
- Wordmark SVG re-export (current PNGs are derivative cream variants)
- Autonomous wandering bird behavior on mobile (current is touch-follow parity)
- Bio package OneDrive doc — Khanom location reference (out of repo scope)
- Mobile Guardian Bird flight slow movement and touch responsiveness — V1.5+

---

## Completed Phases Through V1.4.7

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.7 (deployed, tag v1.4.7):**
- GSAP removed, replaced .reveal-section with framer-motion m.section whileInView (P1A) — animation-vendor −112.9 KB raw / −43.5 KB gzip (−58.7%)
- ParticleField lazy-loaded via React.lazy + Suspense (P2) — entry chunk −26.4 KB raw / −11.5 KB gzip (−15.1%)
- Mobile unused-javascript audit cleared (60 KiB FAIL → 0 PASS)
- Desktop Performance: 0.95 → 0.98 (+0.03)
- Mobile Performance: 0.88 → 0.90 (+0.02)
- Desktop Speed Index: 1422 → 1059 ms (−25.5%)
- Desktop FCP/LCP: 1122 → 909 ms (−19%)
- Mobile FCP/LCP: −178 ms (−6%)
- Zero regressions
