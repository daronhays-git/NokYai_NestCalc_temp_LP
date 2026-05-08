# NestCalc LP V1.4.5 — Handoff

**Created:** May 8, 2026
**Starting Point:** V1.4.4 deployed (tag v1.4.4)
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Live:** Deployed via Netlify (auto-deploy from main branch)
**Dev:** http://localhost:5173
**Goal:** JSON-LD validation, NokYai → NestCalc rename audit, image oversize cleanup, llms.txt, content replacement

**⚠️ Supersedes:** NestCalc-V1.4.4-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.4)

### What Was Completed in V1.4.4

- **Lighthouse CLI baseline (P1)** — Captured V1.4.x canonical baseline using `npx lighthouse` (CLI, not DevTools). Desktop 99/96/100/100, Mobile 84/96/100/100. Reports saved to `docs/reports/lighthouse-v1.4.3-{desktop,mobile}.{html,json}`. CLI uses simulated throttling vs DevTools' applied throttling — V1.4.0 baseline (99/94/100/100) is no longer directly comparable.
- **Footer version badge contrast fix (P1A)** — Bumped opacity-60 → opacity-70 on the version badge span in Footer.tsx. Effective foreground #858972 → #99997F on #0f2920, contrast 4.28:1 → 5.36:1, clearing WCAG AA. Verified via Lighthouse re-run: Accessibility 96 → 100 on both profiles. Single class change, surgical fix.
- **Wordmark intrinsic dimensions (P1B)** — Added `width`/`height` HTML attributes to wordmark `<img>` tags via new `wordmarkWidth` (number) and `wordmarkHeight` (number) fields in the SERVICES array. Renamed pre-existing string-class field `wordmarkHeight` to `wordmarkHeightClass` to avoid collision. Cleared the unsized-images audit; mobile CLS dropped from 0.0012 → 0.0000 (aspect-ratio reservation working as designed). Visual rendering unchanged — Tailwind h-* + w-auto continue to control displayed size.
- **Wordmark WebP conversion (P1C)** — Created `scripts/optimize-wordmarks.mjs` using the already-installed sharp dep to generate WebP siblings. Swapped `<img>` for `<picture>` with WebP `<source>` + PNG fallback. Byte savings: Casawise 57.6 KB → 29.0 KB (-49.7%), HFC 63.8 KB → 28.4 KB (-55.6%), total 64 KB saved. Mobile LCP improved 150 ms (3464 → 3314). Score deltas (Desktop -2, Mobile -1) within Windows headless Chrome run variance. Image-delivery audit still fails on the **oversize** dimension, parked for V1.4.5.
- **Footer entity statement + email (P3 + P3-FIX)** — New centered metadata line above version badge: "NestCalc.ai is operated by NestCalc.ai, LLC. · daron@NestCalc.ai". Hoisted EMAIL/EMAIL_DISPLAY constants out of Contact.tsx into new `src/lib/contact.ts` (single source of truth). Added `copyAndOpenMailto` helper to lib/contact.ts that handles clipboard copy + mailto navigation; both Contact.tsx and Footer.tsx now delegate to the helper. Footer email link works on machines without a default mail app via clipboard fallback.

### What's Pending

- **JSON-LD schema audit and validation (was V1.4.4-P2, deferred)** — Audit Organization + Person JSON-LD in index.html for placeholder values (e.g. "YOUR-LINKEDIN-SLUG"); validate via Google Rich Results Test post-deploy. Cross-check against `Daron-Hays-Bio-Package-V3-Final.docx` and `person-schema-nestcalc-ready.json` in project files.
- **NokYai → NestCalc rename audit (was V1.4.4-P4, deferred)** — Source code rename completed in V1.4.2; remaining references live in CLAUDE.md, REVIEW.md, design-tokens.md, README.md, .claude/commands/*.md, .github/workflows/*.yml, package.json (name field), vite.config.ts, tailwind.config.ts, doc-inventory.md, CHANGELOG.md. Categorize each as stale / intentional / branding decision.
- **Wordmark + brand logo oversize fix (P1D follow-up)** — Wordmarks are 600px source vs ~150px rendered (4× over). Brand logo nestcalc-logo-gold-green.png surfaced as ~20 KiB savings opportunity. Generate downsized variants (~320px wide for wordmarks, ~200px max for brand logo) via the existing `scripts/optimize-wordmarks.mjs` pattern. Should clear the remaining image-delivery-insight audit failure.
- **llms.txt advisory** — Lighthouse flagged llms.txt as not following recommendations. Not category-affecting but an AEO/agentic-browsing signal. Add proper llms.txt at site root.
- **Wordmark visual balance (V1.4.4-P5 placeholder)** — HFC and Casawise wordmarks have visually different text scales due to source image icon-to-text ratios. Two paths documented: source-level SVG re-export (preferred) or PNG re-crop. Hold until source files available.
- **public/favicon2.png cleanup** — Stray untracked file present since session start. Predates V1.4.4. Resolve: delete, gitignore, commit deliberately, or rename to favicon.png as appropriate.
- **Contact.tsx setTimeout unmount cleanup (micro-fix)** — Pre-existing minor bug: the 3-second setCopied timeout doesn't clear on unmount. Harmless (React swallows the stale setState) but technically incorrect. One-prompt fix candidate.
- Google Analytics 4 setup (still blocked — waiting on domain/bank setup)
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with specific content or link
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Future: provide proper SVG versions of wordmarks (current PNGs are derivative cream variants)
- Blog/content section (future)

### Known MINOR Issues

- TechStack padding (py-16 lg:py-20) differs from other sections — intentional for compact marquee
- Mailto toast may be obscured by mailto redirect — functionality works, feedback is fleeting
- CustomCursor useEffect deps array has [mouseX, mouseY] — no runtime impact, lint nit only
- Legal modal text small, no footer link — cosmetic
- HFC and Casawise wordmark visual scales differ slightly — acceptable
- "View live →" button height slightly shorter than wordmark buttons — acceptable
- HFC wordmark has faint cream "house" outline competing with lightning bolt — readable but less crisp
- **[NEW] Lighthouse run-noise on Windows headless Chrome** — Desktop FCP can swing 200 ms run-to-run with no mechanical cause. Score deltas of ±1–2 points are not reliable signal; need 3+ runs to confirm a real regression
- **[NEW] Contact.tsx setTimeout unmount leak** — pre-existing, harmless; documented above as a future micro-fix candidate

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NestCalc-V1.4.4-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1.4.5-Handoff.md`) is loaded in project files
3. Open a new Claude.ai chat and type:

```
si-code
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NestCalc LP V1.4.5 — continuing from V1.4.4 (tag v1.4.4).

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
- src/assets/               (nestcalc-logo-gold-green.png, 
                             casawise-wordmark-final.{png,webp},
                             homefastcalc-wordmark-final.{png,webp})
- scripts/                  (optimize-wordmarks.mjs)

AGENT STACK:
- Commands: /shield, /eagle, /lighthouse, /scribe
- CI: Shield + Eagle + Scribe + Review-All on PRs, Lighthouse on push
- Baseline: docs/reports/agent-baseline-2026-04-15.md
- Latest CLI Lighthouse: docs/reports/lighthouse-v1.4.3-{desktop,mobile}

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

**Prompt V1.4.5-P1 — Diagnostic: JSON-LD schema content audit**
```
V1.4.5-P1 — Diagnostic: JSON-LD schema content audit

The deployed site has Organization and Person JSON-LD schemas 
in index.html. Before validating with Google Rich Results Test,
audit the current schema content for accuracy.

1. Read index.html and report all <script type="application/ld+json">
   blocks verbatim
2. For the Organization schema, confirm:
   - name field
   - url field
   - logo field (path/URL)
   - sameAs array (LinkedIn etc.)
3. For the Person schema, confirm:
   - name, jobTitle, url
   - alumniOf, hasCredential
   - hasOccupation array
   - knowsAbout array
   - description
   - sameAs array
4. Flag any placeholder values (e.g. "YOUR-LINKEDIN-SLUG") that 
   need replacement before deploy validation
5. Cross-check the existing Person schema against the bio package
   in project files (Daron-Hays-Bio-Package-V3-Final.docx Version 5)
   and person-schema-nestcalc-ready.json — report any drift between
   what's in index.html and what the bio package specifies as the
   canonical schema

Do NOT change anything — report only.
```

**Prompt V1.4.5-P2 — Diagnostic: NokYai → NestCalc rename audit (config + docs)**
```
V1.4.5-P2 — Diagnostic: Remaining NokYai references

The source code rename to NestCalc was completed in V1.4.2,
but configuration and documentation files still reference 
NokYai in places. Audit before deciding what to update.

Search the entire repo for "NokYai" (case-insensitive) and report:

1. Each file containing the string
2. The line content for each match
3. Whether the reference is:
   - Stale (should become NestCalc)
   - Intentional (e.g. repo URL still uses NokYai_NestCalc_temp_LP, 
     or historical references in changelog/handoffs)
   - Branding decision (e.g. NokYai brand parked but not yet renamed)

Files likely to contain references:
- CLAUDE.md
- REVIEW.md
- design-tokens.md
- README.md
- .claude/commands/*.md
- .github/workflows/*.yml
- package.json (name field?)
- vite.config.ts
- tailwind.config.ts
- doc-inventory.md
- CHANGELOG.md

Do NOT change anything — report a categorized list. The action
prompt will be written based on findings.
```

**Prompt V1.4.5-P3 — Image oversize cleanup (wordmarks + brand logo)**
```
V1.4.5-P3 — Generate downsized image variants for oversize fix

Lighthouse image-delivery-insight still fails after V1.4.4 WebP
conversion because the wordmarks (600px source) are rendered at
~150px (4× oversize). The brand logo nestcalc-logo-gold-green.png
also surfaced as a savings opportunity (200×200 source, rendered
much smaller in footer/brand contexts).

Extend scripts/optimize-wordmarks.mjs (or create a sibling script)
to generate appropriately-sized variants:

WORDMARKS:
- Generate 320px-wide WebP + PNG variants of each wordmark
- Output names: casawise-wordmark-final-320.{webp,png}
                homefastcalc-wordmark-final-320.{webp,png}
- Update Services.tsx imports + JSX to use the smaller variants

BRAND LOGO:
- Determine actual rendered size of nestcalc-logo-gold-green.png
  (read Footer.tsx or wherever it's used — likely h-12 → ~48px
  rendered, so a 96px source covers 2× DPR)
- Generate downsized WebP + PNG variants
- Update consumer to use smaller variant + <picture>

Do NOT delete the original 600px / 200px source files — they
remain for any future high-DPR use case.

Run the scripts, report file size comparisons, then update the
JSX consumers. Verify on localhost. Commit prompt will follow.
```

**Prompt V1.4.5-P4 — Add llms.txt at site root**
```
V1.4.5-P4 — Add llms.txt for AEO/agentic-browsing

Lighthouse flagged llms.txt as not present / not following the
recommended pattern. Add a properly structured llms.txt at the
site root (public/) so it ships at https://nestcalc.ai/llms.txt.

Reference spec: https://llmstxt.org/

The file should contain:
1. Site name, description, and primary purpose (1-2 lines)
2. Sections covering: company structure, products, contact,
   key facts about the founder (Daron Hays — pull from
   Daron-Hays-Bio-Package-V3-Final.docx Version 4 short bio)
3. Links to canonical resources (privacy, terms, sitemap)

Create public/llms.txt with the content. Verify it's served by
the dev server at http://localhost:5173/llms.txt. Commit prompt
will follow.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW V1.4.4] CLI vs DevTools Lighthouse use different throttling** — CLI uses simulated throttling, DevTools uses applied throttling. Scores are not directly comparable. Pick one tool and stick with it for baseline comparisons; document which was used in the report header.

**[NEW V1.4.4] Lighthouse run-to-run noise is real on Windows headless Chrome** — Desktop FCP can swing 200 ms with no mechanical cause; ±1–2 score points across runs is noise, not signal. Need multiple runs to confirm a real regression, especially when the change has no plausible mechanism to affect the metric in question.

**[NEW V1.4.4] WebP conversion savings are real but score impact is bounded** — 53% file size reduction on wordmarks did not move the Lighthouse Performance score because LCP/FCP are dominated by other factors (fonts, JS bundle). The real benefit is bytes-saved on slow connections, not the headline score. Don't over-promise score movement from image optimization alone.

**[NEW V1.4.4] Image-delivery audit checks BOTH format AND size** — WebP conversion alone cleared half the savings target; remaining flag is "oversize" (source dimensions > rendered dimensions). To fully clear the audit, source images must match rendered display size with reasonable DPR margin (typically 1×–2×, not 4×).

**[NEW V1.4.4] Constant hoist is the right time to add helpers** — When extracting EMAIL/EMAIL_DISPLAY from Contact.tsx into lib/contact.ts, the natural extension is to add the related click handler logic too. The lib module becomes "everything contact-related"; consumers stay thin.

**[NEW V1.4.4] Aspect-ratio reservation via width/height attrs is invisible but effective** — Adding intrinsic dimensions to `<img>` doesn't change rendered size (CSS still wins) but eliminates pre-load layout shift. Mobile CLS dropping from 0.0012 to literally 0.0000 is the smoking gun.

**[NEW V1.4.4] Field-name collisions when adding numeric variants** — Pre-existing string field `wordmarkHeight` (Tailwind class) collided with new numeric `wordmarkHeight` (HTML attr). Rename the older field to a more specific name (`wordmarkHeightClass`) rather than the new one — keeps the new field's name conventional (matches HTML attribute name).

**[NEW V1.4.4] Contrast fix via opacity is often safer than color change** — Bumping opacity from 60% → 70% on existing color tokens preserved the visual intent (muted chip) while clearing AA. Changing the color hex would have required a new design token. Opacity is the smaller, more reversible change.

**[NEW V1.4.4] Mailto links need clipboard fallback by default** — Bare `<a href="mailto:">` does nothing for users without a default mail app. Always pair with onClick that copies to clipboard. The pattern is standard enough to deserve a shared utility.

**[NEW V1.4.4] Diagnostic-first reading reveals where to put new code** — The wordmark P1B/P1C diagnostic surfaced that EMAIL was already locally defined in Contact.tsx, that no image plugin existed, and that sharp was already a devDep — all three findings shaped the implementation approach before any code was written.

**[NEW V1.4.4] Run noise vs real movement: check the mechanism** — Desktop FCP regressing 190 ms after adding lazy-loaded below-the-fold WebP images cannot be mechanically caused by the change. When the metric and the change can't be connected, treat it as noise.

**[Carried] Wordmark assets designed for light backgrounds need recoloring for dark cards** — Brand wordmarks delivered as dark-on-white render with low contrast on dark green cards. Solution: recolor dark elements to cream (#FEF3C7) keeping gold accents intact, maintain transparent background.

**[Carried] h-full chain breaks at conditional wrappers** — For equal-height cards, h-full must flow through every level: motion.div → conditional anchor wrapper → GlowCard outer → GlowCard inner content layer with flex flex-col.

**[Carried] Touch event parity requires explicit touchend → returning state** — `mouseleave` does not fire on touch devices. Touchend handler must explicitly trigger any state reset that desktop relies on mouseleave for.

**[Carried] Single magic numbers reveal architecture intent** — When a 670-line file has its entire bird sizing controlled by one literal (`128`), the cleanest mobile adaptation is a single conditional, not a refactor.

**[Carried] DevTools mobile emulation is sufficient for verification** — Chrome's device toolbar simulates touch events well enough. Real-phone localhost requires `npm run dev -- --host` + same-WiFi setup.

**[Carried] Claude Code self-flagging deserves trust** — When Claude Code reports "I followed the constraint but believe it may need an exception," verify and update accordingly.

**[Carried] Wordmark text fields in JSON-LD need actual values** — placeholder strings like "YOUR-LINKEDIN-SLUG" must be replaced before deploy validation.

**[Carried] Dual scroll (onClick scrollIntoView + anchor href) creates race condition** — Use one scroll mechanism only.

**[Carried] touchstart preventDefault kills click synthesis on mobile** — Calling `preventDefault()` on touchstart suppresses click event synthesis, making React onClick handlers and anchor taps dead.

**[Carried] passive: true on touch listeners when not calling preventDefault** — Use `{ passive: true }` unless you specifically need to prevent default.

**[Carried] elementFromPoint browser diagnostic for blocking layers** — Console mousemove listener with `document.elementFromPoint(e.clientX, e.clientY)` identifies which DOM element is intercepting pointer events.

**[Carried] mix-blend-difference on gold background produces black cursor ring** — Cosmetic, not a blocking layer.

**[Carried] Company structure: NestCalc.ai, LLC is umbrella** — Two apps: HomeFastCalc.com and Casawise.ai. LP is the company website.

**[Carried] NokYai.com retired** — Brand parked. Source references renamed to NestCalc. Doc/config files still reference NokYai LP in places.

**[Carried] Stray files in project directory** — Always check `git status` for sensitive files before committing.

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
| nok-caption | #D4C9A8 | Captions, muted labels, version badge (now opacity-70) |

### Services Card States
| Card | href | Badge |
|------|------|-------|
| AI Applications | casawise.ai | Casawise.ai wordmark (h-10 sm:h-12, WebP+PNG fallback) in gold-bordered button |
| Websites and Landing Pages | builder-lp Cloud Run URL | "VIEW LIVE →" text in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark (h-12 sm:h-14, WebP+PNG fallback) in gold-bordered button |
| AI Strategy & Consulting | none | "COMING SOON" plain caption text, no border |

### Lighthouse CLI Baseline (V1.4.4)
| Category | Desktop | Mobile |
|----------|---------|--------|
| Performance | 99 (97 post-P1C, run noise) | 86 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

CLI uses simulated throttling. Reports in `docs/reports/lighthouse-v1.4.3-{desktop,mobile}.{html,json}`.

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
- Contact.tsx setTimeout unmount cleanup (pre-existing, harmless, future micro-fix)
- public/favicon2.png (stray file predating V1.4.4 — resolve in V1.4.5 or beyond)

---

## Completed Phases Through V1.4.4

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.4 (deployed, tag v1.4.4):**
- Captured Lighthouse CLI canonical baseline (P1)
- Fixed footer version badge contrast (P1A) — Accessibility 96 → 100 on both profiles
- Added intrinsic width/height to wordmark images (P1B) — unsized-images audit cleared, mobile CLS to 0.0000
- Converted wordmark PNGs to WebP via <picture> (P1C) — 64 KB saved (53% reduction), mobile LCP -150 ms
- Added footer entity statement + email link with shared helper (P3 + P3-FIX) — hoisted EMAIL constants and copyAndOpenMailto helper to lib/contact.ts
