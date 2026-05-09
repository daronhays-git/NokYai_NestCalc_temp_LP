# NestCalc LP V1.4.7 — Handoff

**Created:** May 9, 2026
**Starting Point:** V1.4.6 deployed (tag v1.4.6)
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Live:** https://nestcalc.ai (auto-deploy from main branch via Netlify)
**Dev:** http://localhost:5173
**Goal:** Decide V1.4.7 direction — perf optimization continuation OR pivot to content replacement

**⚠️ Supersedes:** NestCalc-V1.4.6-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.6)

### What Was Completed in V1.4.6

- **Render-blocking fonts deferred (P1)** — Converted Google Fonts `<link rel="stylesheet">` to `media="print" onload="this.media='all'"` swap pattern with `<noscript>` fallback. Preload on adjacent line retained — fetch still kicks off early. Lighthouse render-blocking-insight: 440 ms desktop / 1,200 ms mobile → 0 ms (audit passes).
- **Dead three.js dependencies removed (P3)** — `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` all uninstalled (zero imports in src/). 56 packages purged from node_modules. Dead `three-vendor` `manualChunks` rule in vite.config.ts removed in same commit. Bundle output bit-identical to pre-removal — Vite was already tree-shaking these. Win is install time + node_modules size + CI cache.
- **Framer Motion → `m` + LazyMotion migration (P4)** — All 8 framer-motion consumers migrated from `motion` to `m`. App root wrapped in `<LazyMotion features={domAnimation} strict>`. Diagnostic audit confirmed `domAnimation` covers every feature in use (no drag, no layout, no pan). animation-vendor chunk: 247 kB → 201 kB raw (-46 kB / -18.6%), 88 kB → 75 kB gzip (-13 kB / -14.9%). Beat the ~30 kB raw / ~12 kB gzip target by 50%.
- **Footer.tsx setTimeout unmount cleanup (P5)** — Applied V1.4.5-P8 pattern (already in Contact.tsx) to Footer.tsx. Replaced inline `setTimeout(() => setCopied(false), 3000)` with `useRef<ReturnType<typeof setTimeout>>` + `useEffect` cleanup. Pre-clear before each new schedule re-anchors the 3 s window on rapid double-clicks. Footer-*.js chunk: 17.75 kB → 17.91 kB (+0.16 kB raw / no measurable gzip change).
- **Mobile smoke test (P4 verification)** — Daron ran complete mobile-device smoke test on https://nestcalc.ai. All clickable buttons responsive, all sections rendered correctly. Minor flag: Guardian Bird flight slow-moving and slow to respond on mobile — parked for V1.5+.
- **Lighthouse V1.4.6 baseline captured** — Reports in `docs/reports/lighthouse-v1.4.6-{desktop,mobile}.{html,json}`. Performance: 93 → 95 desktop (+2), 84 → 88 mobile (+4). Accessibility, Best Practices, SEO held at 100/100/100.

### What's Pending

- **GSAP removal (biggest remaining perf lever)** — V1.4.6-P2 diagnostic flagged that replacing GSAP ScrollTrigger with the existing `useInView` hook would drop ~80 KB raw / ~30 KB gzip from animation-vendor. Higher effort (rewrite `animations.ts` reveal logic) but very high impact. Candidate for V1.4.7 if continuing perf path.
- **Lazy-load animation-vendor chunk** — Defer the gsap chunk until first scroll (it's only used by `initScrollAnimations()`). Medium effort, defers ~30 kB past first paint. Candidate for V1.4.7 if continuing perf path.
- **Lazy-load ParticleField** — 628-line canvas effect, eager today. Splitting it out moves heavy canvas code out of critical path. Medium effort, must verify Guardian Bird still renders correctly. Candidate for V1.4.7 if continuing perf path.
- **Mobile Guardian Bird responsiveness** — Slow movement and slow response to touch. Minor visual issue; parked for V1.5+.
- **Wordmark visual balance (placeholder)** — HFC and Casawise wordmarks have different text scales. Hold until source files (proper SVG variants) are available.
- Google Analytics 4 setup (still blocked — waiting on domain/bank setup)
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with specific content or link
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
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
- Mobile Guardian Bird flight slow to move and slow to respond to touch — acceptable for now, parked for V1.5+
- Lighthouse desktop unused-javascript audit reported 43 KB → 64 KB across V1.4.5 → V1.4.6 — apples-to-oranges comparison (V1.4.5 baseline measured animation-vendor at partial transfer ~33 KB instead of full 88 KB). Real shipped delta is -46 KB raw / -13 KB gzip. Mobile audit cleanly shows -15 KiB win.

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NestCalc-V1.4.6-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1.4.7-Handoff.md`) is loaded in project files
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
NestCalc LP V1.4.7 — continuing from V1.4.6 (tag v1.4.6).

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
- src/components/effects/   (ParticleField, GradientMesh, NoiseOverlay)
- src/components/legal/     (LegalModal, PrivacyPolicy, TermsOfService,
                             Disclaimer)
- src/styles/globals.css
- src/lib/animations.ts     (GSAP configs — candidate for V1.4.7 removal)
- src/lib/birdPaths.ts      (Guardian Bird SVG paths)
- src/lib/contact.ts        (EMAIL, EMAIL_DISPLAY, copyAndOpenMailto)
- src/hooks/                (useMousePosition, useScrollProgress, useInView)
- src/assets/               (nestcalc-logo-gold-green.png + 96 variants,
                             casawise-wordmark-final.{png,webp} + 320 variants,
                             homefastcalc-wordmark-final.{png,webp} + 320 variants)
- scripts/                  (optimize-wordmarks.mjs)
- public/                   (logo.png 200x200, llms.txt, favicons,
                             og-image.png, robots.txt, sitemap.xml)

AGENT STACK:
- Commands: /shield, /eagle, /lighthouse, /scribe
- CI: Shield + Eagle + Scribe + Review-All on PRs, Lighthouse on push
- Baseline: docs/reports/agent-baseline-2026-04-15.md
- Latest CLI Lighthouse: docs/reports/lighthouse-v1.4.6-{desktop,mobile}

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

V1.4.7 has a path-decision moment up front: continue the perf-optimization arc (P2-P3-P4 swept the easy wins; remaining levers are higher-effort) OR pivot to content replacement (testimonials, tech logos, copy). The first prompt is a decision-framing diagnostic that will help Daron decide. Action prompts come after the decision.

### Prompt V1.4.7-P0 — Decision framing: perf vs content for V1.4.7

```
V1.4.7-P0 — Decision framing diagnostic

Daron is choosing the V1.4.7 direction: continue perf
optimization or pivot to content replacement. This diagnostic
gathers the data needed for the decision. Read-only.

1. Pull the latest mobile + desktop Lighthouse reports from
   docs/reports/lighthouse-v1.4.6-{desktop,mobile}.report.json
   - Report current Performance score (mobile + desktop)
   - List remaining audits with score < 1.0, ordered by
     potential savings (ms or KB)

2. Audit current content placeholder count:
   - Count testimonials in src/components/sections/Testimonials.tsx
     that look like placeholder text (lorem-style, generic, or
     contain placeholder names)
   - Count tech logos in src/components/sections/TechStack.tsx
     that are placeholder/text vs actual SVG/img
   - List sections with obvious placeholder copy (look for
     phrases like "Coming Soon", "Lorem ipsum", "Sample text",
     or anything Daron has flagged in handoffs)

3. GSAP usage scope check:
   - View src/lib/animations.ts and report what it does
   - grep src/ for "ScrollTrigger" — list every usage with
     file + line
   - grep src/ for useInView usage — confirm the existing
     hook is sufficient to replace ScrollTrigger if GSAP
     were removed

4. Report:
   - Lighthouse remaining-savings ranked list
   - Content placeholder count
   - GSAP scope (light / medium / heavy use)

Do NOT change anything. This is decision-framing only.
```

### Prompt V1.4.7-P1A — Drop GSAP entirely (perf path, IF Daron picks perf)

```
V1.4.7-P1A — Drop GSAP, replace ScrollTrigger with useInView

ONLY run this prompt if V1.4.7-P0 confirmed:
- GSAP scope is light (1 file: src/lib/animations.ts)
- All ScrollTrigger usages are reveal-on-scroll patterns that
  useInView can replace
- Daron has chosen the perf path for V1.4.7

Diagnostic V1.4.6-P2 estimated this would drop ~80 KB raw /
~30 KB gzip from animation-vendor — biggest remaining perf
lever. After this change, gsap + @gsap/react can be removed
from package.json (same pattern as V1.4.6-P3 three.js cleanup).

STEP 1 — Read src/lib/animations.ts and list every exported
function. For each, identify whether it can be:
   - Replaced with useInView + framer-motion m.X animations
   - Removed entirely (no longer needed)
   - Kept but rewritten without GSAP

STEP 2 — STOP. Report findings before making any code changes.
The action plan depends on what's in animations.ts.
```

### Prompt V1.4.7-P1B — Replace placeholder testimonials (content path, IF Daron picks content)

```
V1.4.7-P1B — Replace placeholder testimonials

ONLY run this prompt if V1.4.7-P0 confirmed:
- Testimonials section has placeholder text
- Daron has chosen the content path for V1.4.7
- Real testimonial copy is ready (Daron will paste it in chat
  before this prompt)

STEP 1 — Read src/components/sections/Testimonials.tsx and
report:
   - Current testimonial data structure (array shape,
     properties per testimonial)
   - Number of testimonials in the array
   - Where the data lives (inline in component, or imported
     from constants)

STEP 2 — STOP. Wait for Daron to paste real testimonial copy
before doing any replacement. The action prompt is built from
the actual copy, not assumed text.
```

### Prompt V1.4.7-P2 — Lazy-load ParticleField (perf path optional add-on)

```
V1.4.7-P2 — Lazy-load ParticleField via React.lazy

ParticleField.tsx is a 628-line canvas effect that loads
eagerly today, contributing to the index-*.js chunk size.
Splitting it out moves heavy canvas code out of the critical
render path.

STEP 1 — Read src/components/sections/Hero.tsx and find:
   - The ParticleField import statement
   - Where ParticleField is rendered in the JSX

STEP 2 — Read ParticleField.tsx and confirm it has no
side-effect imports that would break on async load (theme
context, global event listeners that need to attach before
render, etc.)

STEP 3 — Report what changes would be needed:
   - Convert import to React.lazy()
   - Wrap render in <Suspense fallback={null}>
   - Confirm Hero text renders correctly even if ParticleField
     is delayed (fallback={null} is fine because it's a
     decorative effect, not a critical UI element)

STEP 4 — STOP and report. Action prompt comes after diagnostic
findings. Particularly important to verify Guardian Bird isn't
broken by the lazy-load — Guardian Bird lives inside
ParticleField, so deferred load means deferred bird.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW V1.4.6] `<LazyMotion strict>` throws ReferenceError, not LazyMotion-specific error, when motion JSX survives migration** — when `motion` is removed from imports but a `<motion.X>` JSX reference survives, the runtime error is `motion is not defined` (plain ReferenceError), not a clearly-attributed LazyMotion error. The error stack still pinpoints the file and line, so it's findable, but don't expect a "you used motion inside LazyMotion" message — strict mode just fails fast with the underlying JS error.

**[NEW V1.4.6] Cached browser bundles after Vite migrations need hard-refresh (Ctrl+Shift+R)** — after a bulk JSX migration like `motion` → `m`, even a clean grep + clean build can show stale errors in the browser because Vite caches transformed modules aggressively. Symptom: console errors point at line numbers that don't match current source. Fix: hard-refresh in DevTools (Ctrl+Shift+R) or enable "Disable cache" in Network tab. ALWAYS try this first before chasing a phantom code bug.

**[NEW V1.4.6] media="print" onload swap is the cleanest non-blocking stylesheet pattern** — `<link rel="stylesheet" media="print" onload="this.media='all'">` + `<noscript>` fallback is one-line surgery that works in every modern browser. Don't use the `rel="preload"` swap pattern when a `<link rel="preload">` already exists for the same resource — keep the preload as-is and just modify the `<link rel="stylesheet">` line.

**[NEW V1.4.6] Diagnostic-first paid off three times in V1.4.6** — P1 diagnostic ruled out app CSS as a deferral target (too small, too critical). P2 diagnostic identified GSAP as the highest-impact future lever AND revealed three.js as dead code (free win). P4 diagnostic confirmed `domAnimation` covers all 8 files (no `domMax` overhead needed). Each diagnostic prevented either over-reach (deferring critical CSS) or under-reach (missing dead deps).

**[NEW V1.4.6] Code blocks reserved for Claude Code prompts only** — User-facing instructions (visual smoke tests, browser checks, screenshots) go in plain prose. Putting user instructions in code blocks creates "paste-into-VS-Code" ambiguity and wastes time. Permanent rule.

**[NEW V1.4.6] Build commands always go to Claude Code, not the user** — `npm run build`, `npm run preview`, `npm run dev`, grep, etc. — Claude Code runs these faster and reports back deterministically. Only browser-visual confirmations and third-party dashboard screenshots come to the user. Permanent rule.

**[NEW V1.4.6] When user says "too much output," shorten and STAY short** — don't drift back to long-form on the next response. The pattern they're flagging is response length; correcting it once and reverting on the next turn defeats the rule.

**[NEW V1.4.6] Bundle size delta confirmation: build numbers > Lighthouse audit numbers** — Lighthouse `unused-javascript` audit can show misleading deltas across runs because it depends on which chunks the test session happened to load (partial transfer can under-report a chunk's size). Source of truth is the local `npm run build` output. V1.4.6 desktop audit showed +21 KiB unused-JS (apples-to-oranges); real shipped delta was -46 KB raw / -13 KB gzip.

**[NEW V1.4.6] Variants in workflow skills create friction faster than they solve problems** — sc-code originally had Variant A (release) / Variant B (mid-branch) / Pre-launch Sprint sub-mode. Three close paths. Every close required deciding which variant applied AND remembering the differences. Replaced with single flow: always 3 files, always version bump (even for zero-code sessions), always tag. Simpler, faster, error-free. Apply same principle to any future skill — when a skill grows multiple paths, ask whether collapsing them loses anything real or just removes friction.

**[Carried V1.4.5] Lighthouse Rich Results Test has TWO modes (desktop + smartphone)** — the dropdown next to "TEST URL" lets you switch between Googlebot desktop and smartphone crawls. After schema changes, verify both.

**[Carried V1.4.5] Lighthouse image-delivery-insight uses CSS pixel comparison (no DPR awareness)** — the audit flags any source larger than rendered CSS pixel size, ignoring DPR. Going below ~2× rendered size visibly softens retina assets. Correct call: accept partial pass (0.5) when residual flag is the DPR margin needed for retina quality.

**[Carried V1.4.5] When the same trivial issue keeps surfacing across sessions, name the pattern and ask once how to handle it permanently** — re-litigating an untracked stray file or known-cosmetic warning every session is production-destroying friction. Either resolve it once or flag the friction in one sentence.

**[Carried V1.4.5] User-reported "click does nothing" on a known-correct pattern → first ask "tested in incognito with hard refresh?"** — service worker / cached state / dev-server staleness is the cheapest first hypothesis when shipping code matches the working pattern.

**[Carried V1.4.5] Constant hoist + helper is the right pattern for cross-component utilities** — Contact.tsx and Footer.tsx both use email click behavior. Hoisting EMAIL/EMAIL_DISPLAY constants AND the click handler to `lib/contact.ts` keeps consumers thin.

**[Carried V1.4.5] git mv preserves history at 96% similarity** — when renaming a file with substantial content edits in the same commit, git's similarity detection still tracks it as a true rename.

**[Carried V1.4.5] Stop-and-report guardrails should not include items the prompt itself flagged as expected** — cross-check: is what I'm telling Claude Code to stop on actually unexpected, or did I just tell them it's fine?

**[Carried V1.4.4] CLI vs DevTools Lighthouse use different throttling** — CLI uses simulated, DevTools uses applied. Pick one, stick with it for baselines.

**[Carried V1.4.4] Lighthouse run-to-run noise is real on Windows headless Chrome** — Desktop FCP can swing 200 ms with no mechanical cause; ±1–2 score points across runs is noise.

**[Carried V1.4.4] WebP conversion savings are real but score impact is bounded** — file size reduction does not move Lighthouse Performance when LCP/FCP are dominated by other factors.

**[Carried V1.4.4] Image-delivery audit checks BOTH format AND size** — WebP alone clears format; remaining flag is "oversize" (source dimensions > rendered dimensions).

**[Carried V1.4.4] Aspect-ratio reservation via width/height attrs is invisible but effective** — adding intrinsic dimensions to `<img>` doesn't change rendered size but eliminates pre-load layout shift.

**[Carried V1.4.4] Field-name collisions when adding numeric variants** — when extending a config object, watch for collision between existing string fields (Tailwind classes) and new numeric fields (HTML attrs).

**[Carried V1.4.4] Contrast fix via opacity is often safer than color change** — bumping opacity preserves visual intent while clearing AA. Smaller, more reversible than introducing a new color token.

**[Carried V1.4.4] Mailto links need clipboard fallback by default** — bare `<a href="mailto:">` does nothing for users without a default mail app. Always pair with onClick + clipboard.

**[Carried V1.4.4] Diagnostic-first reading reveals where to put new code** — running a quick read-only audit before writing implementation surfaces existing conventions and helpers.

**[Carried] Wordmark assets designed for light backgrounds need recoloring for dark cards** — recolor dark elements to cream (#FEF3C7) keeping gold accents intact, maintain transparent background.

**[Carried] h-full chain breaks at conditional wrappers** — for equal-height cards, h-full must flow through every level: motion.div → conditional anchor wrapper → GlowCard outer → GlowCard inner content layer with flex flex-col.

**[Carried] Touch event parity requires explicit touchend → returning state** — `mouseleave` does not fire on touch devices. Touchend handler must explicitly trigger any state reset that desktop relies on mouseleave for.

**[Carried] Single magic numbers reveal architecture intent** — when a 670-line file has its entire bird sizing controlled by one literal (`128`), the cleanest mobile adaptation is a single conditional, not a refactor.

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
| Animation | Framer Motion (m + LazyMotion + domAnimation) + GSAP ScrollTrigger |
| Particles + Bird | 2D Canvas (custom, touch-enabled, mobile bird at 80px / desktop 128px) |
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
| 2 | Hero | #0f2920 deep | First impression, particles, single CTA, Guardian Bird (80px mobile / 128px desktop) |
| 3 | Services | #2d5a42 medium | 4 cards — 3 link to live products via wordmark/text buttons, 1 Coming Soon |
| 4 | TechStack | #1a3a2a forest | Technology grid + marquee |
| 5 | WhyNestCalc | #0f2920 deep | Stats + differentiators + founder bio |
| 6 | Testimonials | #1a3a2a forest | Social proof carousel |
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

### Lighthouse CLI Baseline (V1.4.6)
| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 95 | 88 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

CLI uses simulated throttling. Reports in `docs/reports/lighthouse-v1.4.6-{desktop,mobile}.{html,json}`.

render-blocking-insight: PASSING (was 440 ms desktop / 1,200 ms mobile in V1.4.5).
unused-javascript: 64 KiB desktop (apples-to-oranges with V1.4.5 baseline) / 60 KiB mobile (-15 KiB win, real). Real shipped delta: -46 KB raw / -13 KB gzip on animation-vendor.
image-delivery-insight: 0.5 partial (DPR-vs-quality tradeoff, accepted).

### Animation Library Status (post-V1.4.6)
| Library | Status | Size | Notes |
|---------|--------|------|-------|
| framer-motion | Active (m + LazyMotion + domAnimation) | ~75 KB gzip | All 8 consumers migrated |
| gsap + ScrollTrigger + @gsap/react | Active (1 file: lib/animations.ts) | ~30 KB gzip estimate | Candidate for V1.4.7 removal |
| three / @react-three/* | REMOVED V1.4.6 | 0 KB | Were dead code, tree-shaken before removal |

---

## SECTION 7: Parked Items

- Blog/content section
- Case study detail pages
- Client portal link
- Pricing section (if applicable)
- FAQ schema when content expands
- NokYai.com brand (retired, parked)
- Controller agent (parked until all 8 agents running — see Agent Stack Phased Plan)
- Wordmark SVG re-export (current PNGs are derivative cream variants)
- Autonomous wandering bird behavior on mobile (current is touch-follow parity)
- Bio package OneDrive doc — Khanom location reference (out of repo scope)
- Mobile Guardian Bird flight slow movement and touch responsiveness — V1.5+

---

## Completed Phases Through V1.4.6

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.6 (deployed, tag v1.4.6):**
- Render-blocking fonts deferred via media="print" onload swap (P1) — Lighthouse render-blocking-insight: 440/1200 ms → 0 ms
- Dead three.js dependencies and dead vite chunk rule removed (P3) — 56 packages purged from node_modules, bundle bit-identical
- Framer Motion migrated to m + LazyMotion + domAnimation across 8 files (P4) — animation-vendor -46 KB raw / -13 KB gzip
- Footer.tsx setTimeout unmount cleanup (P5) — useRef + useEffect pattern matching V1.4.5-P8
- Mobile smoke test passed cleanly (P4 verification) — Guardian Bird mobile responsiveness flagged minor, parked for V1.5+
- Lighthouse score improvements: Performance 93 → 95 desktop / 84 → 88 mobile
