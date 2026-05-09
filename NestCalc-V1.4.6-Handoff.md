# NestCalc LP V1.4.6 — Handoff

**Created:** May 9, 2026
**Starting Point:** V1.4.5 deployed (tag v1.4.5)
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Live:** Deployed via Netlify (auto-deploy from main branch)
**Dev:** http://localhost:5173
**Goal:** Render-blocking reduction, unused-JS reduction, mobile verification, content replacement

**⚠️ Supersedes:** NestCalc-V1.4.5-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.5)

### What Was Completed in V1.4.5

- **JSON-LD Organization schema fix (P1)** — Copied brand logo to `public/logo.png` (200×200, 20.85 KB) so it serves at `https://nestcalc.ai/logo.png`. Updated Organization schema `logo` field from the 1200×630 OG image to the proper logo file. Added `sameAs: ["https://www.linkedin.com/in/daron-hays"]`. Validated via Google Rich Results Test on both desktop and smartphone profiles — Organization detected as valid item, Person schema unchanged and clean. Person schema not validated by Rich Results Test (not an eligible rich-result type — still useful for knowledge graph + AEO).
- **NokYai → NestCalc rename cleanup (P2)** — Audited 173 NokYai references, categorized into A (factually wrong about code), B (stale doc titles), C (intentional real identifiers — repo URL, folder paths), D (historical snapshots), E (review stack branding), F (bird mascot identity). Applied A + B + E + F: fixed 32 line edits across 16 files plus 1 git mv (`docs/nokyai-review-stack-ops-guide.md` → `docs/nestcalc-review-stack-ops-guide.md`, 96% similarity preserving file history). Bird mascot renamed to generic "Guardian Bird" so it ages well across future projects. Favicon description updated to "(eagle/NestCalc logo)". Final residual: 127 NokYai matches, all in Category C (real identifiers) or D (historical snapshots). Build clean, 0 source code changes.
- **Image oversize cleanup (P3)** — Extended `scripts/optimize-wordmarks.mjs` to generate 320px wordmark variants and 96×96 logo variants. Wordmarks: 600px source → 320px (Casawise -53%, HFC -52%). Brand logo: 200×200 → 96×96 (2.6 KB WebP gets base64-inlined by Vite, eliminating one HTTP request). Total delivered bytes 80 KB → 31 KB (-62%). Original source files preserved for future high-DPR use. Visual rendering unchanged (Tailwind sizing identical). Lighthouse mobile image-delivery audit moved from FAIL (0) to partial (0.5). Remaining 18 KB residual is a Lighthouse-heuristic-vs-retina-quality tradeoff — accepted by design.
- **llms.txt at site root (P4)** — Added `public/llms.txt`, spec-compliant per llmstxt.org (H1, blockquote summary, prose intro, 5 H2 sections with `[Title](URL): description` link format). Sections: Company, Products, Services, Founder, Trust and Legal. Founder credentials drawn from bio package V4 short bio. Reframed founder role as founder of the NestCalc.ai studio (umbrella entity), with Casawise.ai called out as the AI app — aligns with current company structure. Khanom/Thailand location explicitly excluded per Wyoming-only address policy. Should clear Lighthouse llms-txt audit on next run.
- **Khanom/Thailand/Bangkok policy audit (P5)** — Diagnostic confirmed the repo is fully aligned with the Wyoming-only address policy. Zero user-facing matches (index.html, public/, src/components/**, JSON-LD schemas all clean). Zero docs/dev-only matches. Two historical matches in `NokYai-Roadmap.md` document the prior removal of Bangkok references — left as-is per the historical-snapshot policy (those entries are the audit trail of the policy itself).
- **Contact.tsx setTimeout unmount cleanup (P8)** — Replaced inline `setTimeout(() => setCopied(false), 3000)` with `useRef<ReturnType<typeof setTimeout> | null>` plus a `useEffect` cleanup that clears the timeout on unmount. Bonus: pre-clear before each new schedule handles rapid double-clicks (re-anchors the toast to a fresh 3 s window from the second click). Footer.tsx has the same pattern but uses its own state and was scoped out — flagged for V1.4.6 follow-up.
- **`__APP_VERSION__` footer wiring verification (P9)** — Diagnostic confirmed end-to-end wiring is mechanically correct: `vite.config.ts` reads from `package.json` at build time via `define` config and JSON-stringifies for substitution; `Footer.tsx` uses `V{__APP_VERSION__}` JSX expression with no hardcoded version string; rendered output matches package.json content exactly. No code change needed — package.json bump at session close cascades correctly to the deployed footer.

### What's Pending

- **Render-blocking-insight reduction** — Lighthouse flags 440 ms desktop / 1,200 ms mobile. Biggest remaining performance win this session. Likely candidates: lazy-load fonts, defer non-critical CSS, audit `<link rel="stylesheet">` and inline `<script>` blocks in `index.html`.
- **unused-javascript reduction** — Lighthouse flags 43 KB desktop / 75 KB mobile of unused JS. Likely candidates: tree-shake unused Framer Motion / GSAP exports, route-split lazy-loaded sections, audit lodash/utility imports.
- **Mobile smoke test** — Daron will run mobile-device verification after session close. Any regressions found become V1.4.6-P-prefixed fix prompts.
- **Footer.tsx setTimeout unmount cleanup** — Same pattern as V1.4.5-P8 but for Footer.tsx. One-prompt micro-fix.
- **Wordmark visual balance (placeholder)** — HFC and Casawise wordmarks have different text scales. Hold until source files (proper SVG variants) are available.
- Google Analytics 4 setup (still blocked — waiting on domain/bank setup)
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with specific content or link
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Bio package OneDrive source still references "Based in Khanom, Thailand" — out of repo scope; flagged for separate cleanup pass on the OneDrive doc
- Future: provide proper SVG versions of wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Known MINOR Issues

- TechStack padding (py-16 lg:py-20) differs from other sections — intentional for compact marquee
- Mailto toast may be obscured by mailto redirect — fleeting feedback; functional behavior verified working in incognito + hard refresh
- CustomCursor useEffect deps array `[mouseX, mouseY]` — lint nit only
- Legal modal text small, no footer link — cosmetic
- HFC and Casawise wordmark visual scales differ slightly — acceptable
- "View live →" button height slightly shorter than wordmark buttons — acceptable
- HFC wordmark has faint cream "house" outline competing with lightning bolt — readable but less crisp
- Lighthouse run-noise on Windows headless Chrome — Desktop FCP can swing 200 ms run-to-run; ±1–2 score points is noise, not signal
- Lighthouse image-delivery-insight remains at 0.5 partial pass (18 KB flagged) — accepted as DPR-vs-quality tradeoff
- Footer.tsx still has the inline setTimeout pattern fixed in P8 for Contact.tsx — same harmless edge case, pending V1.4.6 micro-fix

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NestCalc-V1.4.5-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1.4.6-Handoff.md`) is loaded in project files
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
NestCalc LP V1.4.6 — continuing from V1.4.5 (tag v1.4.5).

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
- src/lib/animations.ts     (GSAP configs)
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
- Latest CLI Lighthouse: docs/reports/lighthouse-v1.4.5-{desktop,mobile}

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

**Prompt V1.4.6-P1 — Diagnostic: Render-blocking resource audit**
```
V1.4.6-P1 — Diagnostic: Render-blocking resource audit

Lighthouse V1.4.5 baseline flagged render-blocking-insight at
440 ms desktop / 1,200 ms mobile. Biggest remaining perf win.
Audit before deciding fix approach.

1. Read index.html and report ALL <link>, <script>, and <style>
   tags in <head> — note rel/type/async/defer attributes for each
2. Identify which resources are render-blocking by Lighthouse's
   definition (synchronous CSS without media query, synchronous
   JS without async/defer)
3. For Google Fonts (Space Grotesk + Outfit), report the exact
   <link> pattern used and whether it uses font-display: swap
   or preconnect
4. Check vite.config.ts for any chunk-splitting / preload config
5. Pull the latest Lighthouse desktop report
   (docs/reports/lighthouse-v1.4.5-desktop.report.json) and
   extract the render-blocking-insight audit details — list each
   blocking URL with its blocking time

Do NOT change anything — report findings categorized by:
   - Definite blocker (render-blocking, can be deferred)
   - Critical (must stay synchronous, e.g. above-fold CSS)
   - Already optimized (async/defer/preload in place)
```

**Prompt V1.4.6-P2 — Diagnostic: Unused JavaScript audit**
```
V1.4.6-P2 — Diagnostic: Unused JavaScript audit

Lighthouse V1.4.5 baseline flagged unused-javascript at 43 KB
desktop / 75 KB mobile. Identify the heaviest unused chunks
before writing fix prompts.

1. Pull the unused-javascript audit details from
   docs/reports/lighthouse-v1.4.5-desktop.report.json
2. List each chunk with its total size and unused bytes
3. For the top 3 offenders, identify which library or component
   they originate from (cross-reference with vite.config.ts
   chunk-splitting if present, or with package.json deps)
4. Common candidates worth flagging specifically:
   - Framer Motion (we use scroll animations — some exports may
     be unused)
   - GSAP + ScrollTrigger (large library — only used in specific
     sections)
   - Lodash (if any imports are full-package vs cherry-picked)
   - Tailwind purge effectiveness (any stale class output?)
5. Build with --reportCompressedSize to get gzip estimates

Do NOT change anything — report findings with size impact and
suggested fix approach for each top offender.
```

**Prompt V1.4.6-P3 — Footer.tsx setTimeout unmount cleanup**
```
V1.4.6-P3 — Footer.tsx setTimeout unmount cleanup

Apply the same fix pattern from V1.4.5-P8 (Contact.tsx) to
Footer.tsx. The footer email click handler has the same
inline setTimeout pattern that doesn't clean up on unmount.

STEP 1 — Read Footer.tsx and find:
- The setCopied(true) call inside the email onClick handler
- The setTimeout(() => setCopied(false), 3000) call

STEP 2 — Apply the same fix as Contact.tsx:
- Add useRef<ReturnType<typeof setTimeout> | null>(null) for
  the timeout ID
- Add useEffect cleanup that clears the timeout on unmount
- Replace inline setTimeout with the ref-tracked pattern, with
  a pre-clear before each new schedule (rapid-double-click
  re-anchor)
- Make sure useRef and useEffect are imported from 'react'

STEP 3 — Verify:
- npm run build clean
- Click footer email on localhost, confirm toast appears and
  disappears after 3s
- Report the diff

Do NOT touch Contact.tsx — already done in V1.4.5-P8.
Do NOT commit yet.
```

**Prompt V1.4.6-P4 — Mobile smoke test verification (post-deploy)**
```
V1.4.6-P4 — Mobile smoke test verification

Daron will run a complete mobile-device smoke test on the live
site (https://nestcalc.ai) before any V1.4.6 code changes ship.
This prompt only runs IF the smoke test surfaces issues.

Daron will report any of:
- Visual regressions (layout, sizing, contrast)
- Interaction bugs (tap targets, scroll, animations)
- Functional bugs (form, email link, navigation)
- Performance issues (jank, slow LCP, layout shift)

For each issue Daron reports, write a separate diagnostic prompt
following the diagnostic-first pattern. Do NOT batch fixes —
each issue gets its own diagnostic-then-action sequence.

If smoke test passes cleanly: skip this prompt entirely and
move to P1 / P2 / P3 priorities.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW V1.4.5] Lighthouse Rich Results Test has TWO modes (desktop + smartphone)** — the dropdown next to "TEST URL" lets you switch between Googlebot desktop and smartphone crawls. After schema changes, verify both. Don't tell the user "there's only one mode" when their screenshot clearly shows the dropdown.

**[NEW V1.4.5] Lighthouse image-delivery-insight uses CSS pixel comparison (no DPR awareness)** — the audit flags any source that's larger than the rendered CSS pixel size, ignoring device pixel ratio. Going below ~2× rendered size to chase the audit will visibly soften retina assets. Correct call is to accept a partial pass (0.5) when the residual flag is the DPR margin needed for retina quality. Don't trade visible quality for an audit number.

**[NEW V1.4.5] When the same trivial issue keeps surfacing across sessions, name the pattern and ask once how to handle it** — re-litigating an untracked stray file or known-cosmetic warning every session is production-destroying friction. Either resolve it once permanently or flag the friction in one sentence so Daron can fix it on his side. Don't keep treating it as a fresh blocker.

**[NEW V1.4.5] User-reported "click does nothing" on a known-correct pattern → first ask "tested in incognito with hard refresh?"** — service worker / cached state / dev-server staleness is the cheapest first hypothesis when shipping code matches the working pattern. Don't write a 50-line diagnostic prompt before the 30-second check.

**[NEW V1.4.5] Diagnostic-first paid off again on rename audit** — V1.4.5-P2 surfaced 173 references that needed to be categorized into 6 buckets (factually-wrong, stale-titles, real-identifiers, historical, branding-decisions × 2). Writing the action prompt without the audit would have either over-reached (renaming real GitHub URLs) or under-reached (missing the dead-code references that point at deleted files).

**[NEW V1.4.5] Constant hoist + helper is the right pattern for cross-component utilities** — Contact.tsx and Footer.tsx both need email click behavior. Hoisting EMAIL/EMAIL_DISPLAY constants AND the click handler to `lib/contact.ts` keeps consumers thin and gives one place to update behavior. Same pattern applied to Footer.tsx in V1.4.6-P3.

**[NEW V1.4.5] git mv preserves history at 96% similarity** — when renaming a file with substantial content edits in the same commit (docs/nokyai-review-stack-ops-guide.md → nestcalc-review-stack-ops-guide.md plus content updates), git's similarity detection still tracks it as a true rename. Don't avoid renames out of fear of losing history — git handles it well as long as you use `git mv` (or stage the delete + add together).

**[NEW V1.4.5] Stop-and-report guardrails should not include items the prompt itself flagged as expected** — if I tell the user "the 4 Lighthouse reports will be untracked" and the same prompt says "stop if anything unexpected appears," the guardrail is malformed. Always cross-check: is what I'm telling Claude Code to stop on actually unexpected, or is it the same thing I just told them was fine? This was a friction loop in V1.4.5 closes.

**[Carried V1.4.4] CLI vs DevTools Lighthouse use different throttling** — CLI uses simulated throttling, DevTools uses applied throttling. Scores not directly comparable. Pick one and stick with it for baselines; document which in the report header.

**[Carried V1.4.4] Lighthouse run-to-run noise is real on Windows headless Chrome** — Desktop FCP can swing 200 ms with no mechanical cause; ±1–2 score points across runs is noise, not signal. Need multiple runs to confirm a real regression.

**[Carried V1.4.4] WebP conversion savings are real but score impact is bounded** — file size reduction does not move Lighthouse Performance score when LCP/FCP are dominated by other factors (fonts, JS bundle). Real benefit is bytes-saved on slow connections, not headline score. Don't over-promise score movement from image optimization alone.

**[Carried V1.4.4] Image-delivery audit checks BOTH format AND size** — WebP conversion alone clears the format dimension; remaining flag is "oversize" (source dimensions > rendered dimensions). To fully clear, source must match rendered display size with reasonable DPR margin (1×–2×).

**[Carried V1.4.4] Aspect-ratio reservation via width/height attrs is invisible but effective** — Adding intrinsic dimensions to `<img>` doesn't change rendered size (CSS still wins) but eliminates pre-load layout shift. Mobile CLS dropping from 0.0012 to 0.0000 is the smoking gun.

**[Carried V1.4.4] Field-name collisions when adding numeric variants** — when extending a config object, watch for collision between existing string fields (Tailwind classes) and new numeric fields (HTML attrs). Rename the older field rather than the new one — keeps the new field's name conventional.

**[Carried V1.4.4] Contrast fix via opacity is often safer than color change** — bumping opacity preserves the visual intent (muted chip) while clearing AA. Opacity is the smaller, more reversible change than introducing a new color token.

**[Carried V1.4.4] Mailto links need clipboard fallback by default** — bare `<a href="mailto:">` does nothing for users without a default mail app. Always pair with onClick that copies to clipboard. Standard enough to deserve a shared utility (now `src/lib/contact.ts`).

**[Carried V1.4.4] Diagnostic-first reading reveals where to put new code** — running a quick read-only audit before writing implementation surfaces existing conventions, available helpers, and dependency state. Saves a full round trip when assumptions don't match reality.

**[Carried] Wordmark assets designed for light backgrounds need recoloring for dark cards** — recolor dark elements to cream (#FEF3C7) keeping gold accents intact, maintain transparent background.

**[Carried] h-full chain breaks at conditional wrappers** — for equal-height cards, h-full must flow through every level: motion.div → conditional anchor wrapper → GlowCard outer → GlowCard inner content layer with flex flex-col.

**[Carried] Touch event parity requires explicit touchend → returning state** — `mouseleave` does not fire on touch devices. Touchend handler must explicitly trigger any state reset that desktop relies on mouseleave for.

**[Carried] Single magic numbers reveal architecture intent** — when a 670-line file has its entire bird sizing controlled by one literal (`128`), the cleanest mobile adaptation is a single conditional, not a refactor.

**[Carried] DevTools mobile emulation is sufficient for verification** — Chrome's device toolbar simulates touch events well enough. Real-phone localhost requires `npm run dev -- --host` + same-WiFi setup.

**[Carried] Claude Code self-flagging deserves trust** — when Claude Code reports "I followed the constraint but believe it may need an exception," verify and update accordingly.

**[Carried] Wordmark text fields in JSON-LD need actual values** — placeholder strings like "YOUR-LINKEDIN-SLUG" must be replaced before deploy validation.

**[Carried] Dual scroll (onClick scrollIntoView + anchor href) creates race condition** — Use one scroll mechanism only.

**[Carried] touchstart preventDefault kills click synthesis on mobile** — Calling `preventDefault()` on touchstart suppresses click event synthesis, making React onClick handlers and anchor taps dead.

**[Carried] passive: true on touch listeners when not calling preventDefault** — Use `{ passive: true }` unless you specifically need to prevent default.

**[Carried] elementFromPoint browser diagnostic for blocking layers** — Console mousemove listener with `document.elementFromPoint(e.clientX, e.clientY)` identifies which DOM element is intercepting pointer events.

**[Carried] mix-blend-difference on gold background produces black cursor ring** — Cosmetic, not a blocking layer.

**[Carried] Company structure: NestCalc.ai, LLC is umbrella** — Two apps: HomeFastCalc.com and Casawise.ai. LP is the company website.

**[Carried] NokYai.com retired** — Brand parked. Source code, docs, and CI fully renamed in V1.4.2 + V1.4.5. Repo URL and folder paths kept (Category C — real identifiers).

**[Carried] Stray files in project directory** — Always check `git status` for sensitive files before committing. Don't re-litigate the same harmless stray every session.

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
| Animation | Framer Motion + GSAP ScrollTrigger |
| Particles + Bird | 2D Canvas (custom, touch-enabled, mobile bird at 80px / desktop 128px) |
| Fonts | Space Grotesk (display) + Outfit (body) |
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

### Services Card States
| Card | href | Badge |
|------|------|-------|
| AI Applications | casawise.ai | Casawise.ai wordmark (h-10 sm:h-12, 320px WebP+PNG fallback) in gold-bordered button |
| Websites and Landing Pages | builder-lp Cloud Run URL | "VIEW LIVE →" text in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark (h-12 sm:h-14, 320px WebP+PNG fallback) in gold-bordered button |
| AI Strategy & Consulting | none | "COMING SOON" plain caption text, no border |

### JSON-LD Schemas (index.html)
| Schema | Status |
|--------|--------|
| Organization | ✅ Validated by Google Rich Results Test (V1.4.5) — logo at /logo.png, sameAs LinkedIn |
| Person | ✅ Aligned with bio package V5 canonical, no rich-result eligibility (knowledge graph + AEO signal only) |

### Image Optimization (V1.4.5)
| Asset | Source | Delivered | Method |
|-------|--------|-----------|--------|
| Casawise wordmark | 600×157 PNG | 320×84 WebP (14 KB) | scripts/optimize-wordmarks.mjs |
| HomeFastCalc wordmark | 600×197 PNG | 320×105 WebP (14 KB) | scripts/optimize-wordmarks.mjs |
| Brand logo | 200×200 PNG | 96×96 WebP base64-inlined | Vite assetsInlineLimit + scripts |

### Lighthouse CLI Baseline (V1.4.5)
| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 93 (run noise) | 84 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

CLI uses simulated throttling. Reports in `docs/reports/lighthouse-v1.4.5-{desktop,mobile}.{html,json}`.

Image-delivery-insight: 0.5 partial (mobile FAIL → partial). 18 KB residual flag is DPR-vs-quality tradeoff (accepted).
Render-blocking-insight: 440 ms desktop / 1,200 ms mobile (V1.4.6-P1 priority).
Unused-javascript: 43 KB desktop / 75 KB mobile (V1.4.6-P2 priority).

---

## SECTION 7: Parked Items

- Blog/content section
- Case study detail pages
- Client portal link
- Pricing section (if applicable)
- FAQ schema when content expands
- NokYai.com brand (retired, parked)
- Controller agent (parked until all 8 agents running — see Agent Stack Phased Plan)
- Wordmark SVG re-export (current PNGs are derivative cream variants — proper light/dark variants needed long-term)
- Autonomous wandering bird behavior on mobile (current is touch-follow parity)
- Bio package OneDrive doc — Khanom location reference still in source doc (out of repo scope)

---

## Completed Phases Through V1.4.5

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.5 (deployed, tag v1.4.5):**
- Fixed Organization JSON-LD logo + sameAs (P1) — validated by Google Rich Results Test on both desktop + smartphone profiles
- NokYai → NestCalc rename cleanup across 16 files + 1 file rename (P2) — bird mascot genericized to "Guardian Bird"
- Image oversize cleanup (P3) — 320px wordmarks + 96×96 logo, total bytes 80 KB → 31 KB (-62%), mobile image-delivery audit FAIL → 0.5 partial
- llms.txt at site root (P4) — spec-compliant per llmstxt.org, founder credentials from bio V4, Khanom excluded per Wyoming policy
- Khanom/Thailand/Bangkok policy audit (P5) — confirmed repo fully compliant
- Contact.tsx setTimeout unmount cleanup (P8) — useRef + useEffect pattern, rapid-double-click pre-clear bonus
- `__APP_VERSION__` footer wiring verified (P9) — wiring mechanically correct end-to-end
