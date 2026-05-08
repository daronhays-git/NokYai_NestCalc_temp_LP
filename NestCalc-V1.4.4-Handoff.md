# NestCalc LP V1.4.4 — Handoff

**Created:** May 8, 2026
**Starting Point:** V1.4.3 deployed (tag v1.4.3)
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
**Live:** Deployed via Netlify (auto-deploy from main branch)
**Dev:** http://localhost:5173
**Goal:** Lighthouse audit, JSON-LD validation, doc cleanup, content replacement

**⚠️ Supersedes:** NestCalc-V1.4.3-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.3)

### What Was Completed in V1.4.3

- **Services product cards (P1–P7):** Three of four service cards now link out to live products (AI Applications → casawise.ai, Web & Mobile Apps → homefastcalc.com, Websites and Landing Pages → builder-lp Cloud Run URL). AI Strategy & Consulting remains "Coming Soon"
- **Logo+wordmark buttons:** Casawise.ai and HomeFastCalc.com cards display cream-recolored wordmarks inside gold-bordered button containers; Builder LP card shows "View live →" in matching button container
- **Equal-height cards:** All four Services cards now stretch to row height in default and hover states (h-full chain through motion.div → anchor → GlowCard outer wrapper → GlowCard inner content layer)
- **HFC wordmark size adjustment:** HomeFastCalc wordmark uses `h-12 sm:h-14` (vs Casawise default `h-10 sm:h-12`) to visually balance the stacked icon-above-text layout
- **Hover affordance:** Gold border at 40% opacity on linked cards default state, brightens to 100% with subtle gold tint on hover (group-hover via the anchor wrapper)
- **Footer version badge:** `V{__APP_VERSION__}` displayed in monospace at 60% opacity, centered below copyright row. TypeScript declaration in `src/vite-env.d.ts`. `define` block in vite.config.ts was already in place from a prior session
- **Mobile Guardian Bird:** Bird now renders on touch devices at 80px scale (62% of desktop's 128px). Removed both `!isMobile()` gates around bird initialization. Fixed `touchend` asymmetry — bird now returns to perch on tap release (was previously freezing in 'flying' state because only `mouseleave` triggered 'returning')
- **Wordmark assets added:** `src/assets/casawise-wordmark.png` (58 KB) and `src/assets/homefastcalc-wordmark.png` (64 KB) — both cream/gold on transparent backgrounds, derived from user-supplied source images

### What's Pending

- Lighthouse audit re-run (deferred from V1.4.3 to capture V1.4.x baseline before further changes)
- Validate JSON-LD schemas via Google Rich Results Test (post-deploy task)
- Google Analytics 4 setup (still blocked — waiting on domain/bank setup)
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Replace "Coming Soon" service card (AI Strategy & Consulting) with specific content or link
- Add email link to Footer
- Add operating entity statement to Footer
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Update doc/config files (CLAUDE.md, README, design-tokens.md, REVIEW.md, .claude/commands/, .github/workflows/) to replace remaining NokYai references
- Future: provide proper SVG versions of wordmarks (current PNGs are derivative cream variants — original brand assets are dark green for light backgrounds)
- Blog/content section (future)

### Known MINOR Issues

- TechStack padding (py-16 lg:py-20) differs from other sections (py-12 sm:py-16 lg:py-32) — intentional for compact marquee
- Mailto toast may be obscured by mailto redirect — functionality works, feedback is fleeting
- CustomCursor useEffect deps array has [mouseX, mouseY] — no runtime impact, lint nit only
- Legal modal text is small and has no footer link — cosmetic, functional
- HomeFastCalc and Casawise wordmark images have slightly different visual scale even with the height adjustment — Casawise's icon is much smaller relative to its text than HFC's. Acceptable for V1.4.3, can be tuned with proper SVG versions later
- "View live →" button height may be slightly shorter than wordmark buttons (text vs image content). Acceptable visual variance
- HFC wordmark has a faint cream "house" outline that competes slightly with the lightning bolt — readable but less crisp than Casawise

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NestCalc-V1.4.3-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1.4.4-Handoff.md`) is loaded in project files
3. Open a new Claude.ai chat and type:

```
si-code
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NestCalc LP V1.4.4 — continuing from V1.4.3 (tag v1.4.3).

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
- src/hooks/                (useMousePosition, useScrollProgress, useInView)
- src/assets/               (nestcalc-logo-gold-green.png, 
                             casawise-wordmark.png,
                             homefastcalc-wordmark.png)

AGENT STACK:
- Commands: /shield, /eagle, /lighthouse, /scribe
- CI: Shield + Eagle + Scribe + Review-All on PRs, Lighthouse on push
- Baseline: docs/reports/agent-baseline-2026-04-15.md

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

**Prompt V1.4.4-P1 — Lighthouse audit on V1.4.3 deployed build**
```
V1.4.4-P1 — Lighthouse audit re-run

Run a Lighthouse audit on the NestCalc LP production build to
capture the V1.4.3 baseline.

1. npm run build
2. npm run preview (note the localhost preview port)
3. Open Chrome DevTools → Lighthouse tab
4. Run desktop audit on the preview URL
5. Run mobile audit on the preview URL
6. Report scores for: Performance, Accessibility, Best Practices, SEO
7. Compare against V1.4.0 desktop baseline: 99 / 94 / 100 / 100
8. List any new issues introduced since V1.4.0 (mobile bird, 
   wordmark images, equal-height card chain may have regressed
   layout shift or paint metrics)
9. Do NOT fix anything — report only

Output the results as a table with both desktop and mobile scores.
```

**Prompt V1.4.4-P2 — Diagnostic: JSON-LD schemas on deployed site**
```
V1.4.4-P2 — Diagnostic: JSON-LD schema content audit

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
5. Report whether the existing Person schema matches the bio 
   package's V3 Final spec from project files

Do NOT change anything — report only.
```

**Prompt V1.4.4-P3 — Footer email link + operating entity statement**
```
V1.4.4-P3 — Footer enhancements

Two small additions to src/components/layout/Footer.tsx:

1. Add an email link to the contact column (or wherever the 
   contact section sits in the footer):
   - Display: hello@nestcalc.ai (or whatever the canonical 
     contact email is — confirm in handoff before editing)
   - href: "mailto:hello@nestcalc.ai"
   - Use existing footer link styling

2. Add operating entity statement at the very bottom, below
   the version badge:
   - Text: "NestCalc.ai is operated by NestCalc.ai, LLC."
   - Style: text-nok-caption text-xs opacity-60, centered

Both additions must use existing color tokens and font stack —
do not introduce new tokens. Verify on localhost.
```

**Prompt V1.4.4-P4 — Diagnostic: NokYai → NestCalc rename audit (config + docs)**
```
V1.4.4-P4 — Diagnostic: Remaining NokYai references

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

**Prompt V1.4.4-P5 — Wordmark visual balance follow-up (optional)**
```
V1.4.4-P5 — Wordmark visual balance tuning (OPTIONAL)

The HomeFastCalc and Casawise wordmarks have visually different 
text scales even after the V1.4.3 height adjustment, because 
the source images have different icon-to-text ratios.

Two options to address this in future:

OPTION A — Source-level fix (preferred long-term):
Re-export both wordmarks from the original design source as 
SVGs with consistent text-baseline and icon-scale ratios. 
Replace the PNG assets in src/assets/ with the new SVGs and
update the imports.

OPTION B — Crop/normalize the existing PNGs:
Edit the existing PNGs to crop tighter around just the wordmark
text (drop the stacked icon entirely on each, or add a separate
small icon element next to the wordmark). This loses brand 
information but normalizes the visual scale.

This prompt is a placeholder — do nothing now. Decide which 
option to pursue when source files are available, then write
the action prompt at that time.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Wordmark assets designed for light backgrounds need recoloring for dark cards** — Brand wordmarks delivered as dark-on-white render with low contrast on dark green cards. Solution: recolor dark elements to cream (#FEF3C7) keeping gold accents intact, maintain transparent background. Long-term: maintain both light-mode and dark-mode wordmark variants.

**[NEW] h-full chain breaks at conditional wrappers** — For equal-height cards, h-full must flow through every level: motion.div → conditional anchor wrapper (when href exists) → GlowCard outer → GlowCard inner content layer with flex flex-col. Missing any level causes default-state height mismatch even if hover state works.

**[NEW] Touch event parity requires explicit touchend → returning state** — `mouseleave` does not fire on touch devices. If a stateful animation depends on `mouseleave` to reset, the touchend handler must explicitly trigger the reset. Without this, bird/element freezes after first tap.

**[NEW] Single magic numbers reveal architecture intent** — When a 670-line file has its entire bird sizing controlled by one literal (`128`), the cleanest mobile adaptation is a single conditional, not a refactor or new component. Diagnostic-first reading reveals these structural hints.

**[NEW] DevTools mobile emulation is sufficient for verification** — Chrome's device toolbar simulates touch events well enough to verify mobile-specific behavior. Real-phone localhost access requires `npm run dev -- --host` + same-WiFi setup. For session-end validation only, use the deployed Netlify site on real device.

**[NEW] Claude Code self-flagging deserves trust** — When Claude Code reports "I followed the constraint but believe it may need an exception," verify and update accordingly. The "DO NOT change anything else inside GlowCard" rule was too tight; inner content needed h-full + flex flex-col. Listening to its diagnostic preserved the close.

**[NEW] Wordmark text fields in JSON-LD need actual values** — placeholder strings like "YOUR-LINKEDIN-SLUG" must be replaced before deploy validation, or Google Rich Results Test will return false positives.

**[NEW] Dual scroll (onClick scrollIntoView + anchor href) creates race condition** — The wrapper div's `scrollIntoView` and the anchor's `href="#contactus"` fire simultaneously and can cancel each other. Use one scroll mechanism only — let the anchor handle it.

**[NEW] touchstart preventDefault kills click synthesis on mobile** — Mobile browsers synthesize click events from tap sequences (touchstart → touchend → click). Calling `preventDefault()` on touchstart suppresses this synthesis, making all React onClick handlers and anchor taps dead inside the affected region.

**[NEW] passive: true on touch listeners when not calling preventDefault** — Registering touch listeners with `{ passive: false }` when you don't actually call `preventDefault` triggers browser warnings and blocks scroll optimization. Use `{ passive: true }` unless you specifically need to prevent default.

**[NEW] elementFromPoint browser diagnostic for identifying blocking layers** — Paste a mousemove listener in DevTools console that logs `document.elementFromPoint(e.clientX, e.clientY)` to identify which DOM element is intercepting pointer events at any screen position.

**[NEW] mix-blend-difference on gold background produces black cursor ring** — The CustomCursor ring uses mix-blend-difference; over a gold (#F59E0B) background it appears black. This is cosmetic, not an indicator of a blocking layer.

**[NEW] Company structure: NestCalc.ai, LLC is umbrella** — Two apps: HomeFastCalc.com (simplified non-AI) and Casawise.ai (AI-powered, formerly NestCalc.ai app). LP is the NestCalc.ai company website.

**[NEW] NokYai.com retired** — Brand is parked. All source references renamed to NestCalc. Doc/config files still reference NokYai LP in places — cleanup deferred.

**[NEW] Stray files in project directory** — A bank statement PDF appeared untracked in the repo. Always check `git status` for sensitive files before committing.

Touch events on pointer-events:none canvas need window-level listeners — ParticleField canvas has pointer-events:none, so touch listeners must be on window with bounds checking to only activate inside the canvas area.

preventDefault only inside canvas bounds — calling preventDefault on all touch events blocks page scrolling. Check touch position is within canvas rect before preventing default.

Single CTA converts better than dual CTA — Removed "Explore Services" secondary button from Hero. One clear "Start Your Project" → Contact is cleaner and reduces decision fatigue.

Person + Organization JSON-LD as separate script blocks — don't merge schema types. Keep them as independent script blocks in index.html for clarity and easier maintenance.

Claude Code can't create logo art — SVG favicons with brand imagery need manual design in Figma/Inkscape. Claude Code can resize raster images but shouldn't generate simplified silhouettes.

Favicon SVG needs simplification for small sizes — Detail muddles at 16-32px. A simple geometric shape reads better than a miniaturized complex logo.

Check for orphaned assets periodically — 636 KB of unused images accumulated silently. Run a grep-based audit of src/assets/ to catch imports that were removed but files weren't deleted.

Legal modal UX — Users read to the bottom then need to scroll back up. Always add a back/close link at both top and bottom of long scrollable content.

CTA label should match the target — "View Our Work" pointing at Services was misleading. Rename CTAs when the destination section doesn't have the expected content yet.

One class change can fix many Lighthouse findings — All 9 contrast failures were the same pattern (text-nok-gold/60). Systematic fixes beat one-by-one patches.

claude-code-action@v1 only supports pull_request triggers — push events fail with "Unsupported event type: push". Use pull_request for Shield/Eagle, push for Lighthouse (different action).

max_turns is not a valid input — for claude-code-action@v1, use claude_args: "--max-turns 30" instead.

GitHub secrets are per-repo — porting workflow files doesn't port CLAUDE_CODE_OAUTH_TOKEN. Must be added manually in each repo's Settings → Secrets.

Use claude setup-token in standalone terminal — cannot run inside Claude Code session. Generates OAuth token for CI use on Pro/Max plans.

Scribe can false-positive — CLAUDE.md constants.ts finding was wrong; always verify before acting on Scribe output.

Dead code accumulates silently — 4 section components were unused but still in the repo. Run PORT-C2 style cleanup periodically.

Favicon is what Claude Code generates, not what the prompt spec says — Always verify generated assets match expectations.

Tighten mobile padding early — Default py-24 (96px) is excessive on mobile. Use py-12 sm:py-16 lg:py-32 pattern.

Footer 2x2 grid works well on mobile — grid-cols-2 with compact gap-6 keeps footer to half-screen height.

Test contact forms with realistic content — Repeated short test messages flagged as spam by Akismet.

Netlify Akismet filtering is platform-level — Cannot be disabled via code.

Always verify git remote before pushing — Use git remote -v to confirm.

mailto: links need clipboard fallback — Not all users have a default email app configured.

Canvas > Three.js for particle effects — 2D canvas with rAF gives better mouse interaction.

Color scheme testing — Visualize full section flow before implementing.

NestCalc palette is a competitive advantage — Forest green + gold + warm wheat is distinctive.

Cloudinary video embed — iframe embeds don't support mix-blend-mode. Use native video tag.

Workspace management — Save VS Code workspaces as .code-workspace files.

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
| 8 | Footer | #0f2920 deep | Links + legal + version badge |

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
| nok-caption | #D4C9A8 | Captions, muted labels, version badge |

### Services Card States
| Card | href | Badge |
|------|------|-------|
| AI Applications | casawise.ai | Casawise.ai wordmark (h-10 sm:h-12) in gold-bordered button |
| Websites and Landing Pages | builder-lp Cloud Run URL | "VIEW LIVE →" text in gold-bordered button |
| Web & Mobile Apps | homefastcalc.com | HomeFastCalc.com wordmark (h-12 sm:h-14, +20%) in gold-bordered button |
| AI Strategy & Consulting | none | "COMING SOON" plain caption text, no border |

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
- Autonomous wandering bird behavior on mobile (current is touch-follow parity with desktop — wandering would be a future polish if touch-follow feels too input-dependent)

---

## Completed Phases Through V1.4.3

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.3 (deployed, tag v1.4.3):**
- Made 3 Services cards conditionally clickable with anchor wrappers and href fields (P1–P3)
- Added logo+wordmark buttons for Casawise and HomeFastCalc with cream-recolored transparent PNGs (P4)
- Added gold-bordered button affordance with hover treatment; sized HFC wordmark 20% taller for visual balance (P5)
- Achieved equal-height cards via h-full chain through motion.div, anchor, GlowCard outer, GlowCard inner content layer (P6–P7)
- Footer version badge in monospace at 60% opacity reading from __APP_VERSION__ (P8–P9)
- Enabled Guardian Bird on mobile at 80px scale (62% of desktop); fixed touchend asymmetry so bird returns to perch on tap release (P10–P11)
