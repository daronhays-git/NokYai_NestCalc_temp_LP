# NestCalc LP V1.4.3 — Handoff

**Created:** May 8, 2026  
**Starting Point:** V1.4.2 deployed (tag v1.4.2)  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Live:** Deployed via Netlify (auto-deploy from main branch)  
**Dev:** http://localhost:5173  
**Goal:** App product cards (HomeFastCalc + CasaWise), mobile Guardian Bird, GA4, Lighthouse audit

**⚠️ Supersedes:** NokYai-V1_4_2-Handoff.md — delete from project files before next si-code.

---

## SECTION 1: Current State (V1.4.2)

### What Was Completed in V1.4.2

- **Hero CTA dual-scroll fix:** Added `pointer-events-none` to ParticleField outer wrapper div; removed `btnHovered` state, dynamic z-index, `onMouseEnter`/`onMouseLeave`, and duplicate `onClick` with `scrollIntoView` from Hero.tsx — anchor `<a href="#contactus">` now handles navigation alone
- **Mobile touch fix:** Split `touchstart` into its own lightweight handler (no `preventDefault`), removed `preventDefault` from `touchmove`, changed both listeners to `{ passive: true }` — restores click synthesis (hamburger, CTA) and native scrolling on mobile
- **NokYai → NestCalc source rename:** Renamed `NokYai-logo-gold-green.png` → `nestcalc-logo-gold-green.png`, `WhyNokYai.tsx` → `WhyNestCalc.tsx`, updated all imports and variable names (`nokYaiLogo` → `nestcalcLogo`)
- **Privacy Policy rewrite:** Full rewrite of PrivacyPolicy.tsx for NestCalc.ai, LLC — contact form only, no auth/payments/RE, references HomeFastCalc.com and Casawise.ai as separate products
- **Terms of Service rewrite:** Full rewrite of TermsOfService.tsx — website usage terms, $100 liability cap, Wyoming governing law, no subscriptions/tiers/Stripe
- **Disclaimer rewrite:** Full rewrite of Disclaimer.tsx — AI-as-computational-estimates language, no RE investment risk, references both products
- **Favicon replacement:** New cropped PNG favicons (48x48, 180x180, 512x512), removed SVG favicon, updated index.html link tags

### What's Pending

- Add HomeFastCalc.com and Casawise.ai product cards to LP (classy high-tech clickable cards with logos)
- Mobile Guardian Bird (smaller version for touch devices)
- Google Analytics 4 setup (parked — waiting on domain/bank setup)
- Lighthouse audit re-run (scores after all V1.4.x changes)
- Validate JSON-LD schema with Google Rich Results Test
- Wire `__APP_VERSION__` to footer display
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Social sharing preview image (verify OG renders correctly)
- Replace "Coming Soon" service cards with specific content
- Add email link to Footer
- Add operating entity statement to Footer
- Create standalone routes for legal pages (/privacy, /terms, /disclaimer)
- Update doc/config files (CLAUDE.md, README, design-tokens.md, REVIEW.md, .claude/commands/, .github/workflows/) to replace remaining NokYai references
- Blog/content section (future)

### Known MINOR Issues

- TechStack padding (py-16 lg:py-20) differs from other sections (py-12 sm:py-16 lg:py-32) — intentional for compact marquee
- Mailto toast may be obscured by mailto redirect — functionality works, feedback is fleeting
- CustomCursor useEffect deps array has [mouseX, mouseY] — no runtime impact, lint nit only
- Legal modal text is small and has no footer link — cosmetic, functional

---

## SECTION 2: Claude.ai Initialization

To start the next session:

1. Delete `NokYai-V1_4_2-Handoff.md` from project files
2. Ensure this handoff (`NestCalc-V1_4_3-Handoff.md`) is loaded in project files
3. Open a new Claude.ai chat and type:

```
si-code
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NestCalc LP V1.4.3 — continuing from V1.4.2 (tag v1.4.2).

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
```

---

## SECTION 4: Next Session Prompts

**Prompt V1.4.3-P1 — Diagnostic: Services section structure for app cards**
```
V1.4.3-P1 — Diagnostic: Services section audit

Read src/components/sections/Services.tsx and report:

1. How many GlowCards are currently rendered?
2. What content is in each card (title, description, icon)?
3. Are any cards marked "Coming Soon"?
4. How is the grid structured (cols, gap, responsive)?
5. Does GlowCard accept an href or onClick prop for 
   making cards clickable/linkable?
6. Read src/components/ui/GlowCard.tsx — report the full 
   props interface.

We want to add two product cards for HomeFastCalc.com 
and Casawise.ai as clickable links. Need to understand 
the current structure first.

Do NOT change anything — report only.
```

**Prompt V1.4.3-P2 — Diagnostic: Guardian Bird mobile feasibility**
```
V1.4.3-P2 — Diagnostic: Guardian Bird mobile check

The Guardian Bird is currently hidden on mobile/touch 
devices. We want to add a smaller version for mobile.

Read the Guardian Bird implementation:
1. Where is the bird rendered? (which component, which file)
2. What hides it on mobile? (CSS class, media query, or JS)
3. What are the bird's current dimensions/scale?
4. Does it use requestAnimationFrame or GSAP?
5. What would need to change to show a smaller bird 
   on mobile (reduced size, simplified physics, 
   touch-following instead of cursor-following)?

Do NOT change anything — report only.
```

**Prompt V1.4.3-P3 — Add Google Analytics 4**
```
V1.4.3-P3 — Add Google Analytics 4

Add Google Analytics 4 to the NestCalc LP.

1. Add the GA4 script tag to index.html (use gtag.js method)
2. Use measurement ID: [USER TO PROVIDE GA4 ID]
3. Place the script in <head> before other scripts
4. Remove the TODO comment in PrivacyPolicy.tsx and add 
   a Google Analytics section:
   - Google Analytics: collects anonymous usage data 
     (pages visited, session duration, device type)
   - See Google's privacy policy for details
5. Verify the build still passes after adding

Do not change any other component files.
```

**Prompt V1.4.3-P4 — Lighthouse audit re-run**
```
V1.4.3-P4 — Lighthouse audit re-run

Run a Lighthouse audit on the NestCalc LP production build.

1. npm run build
2. npm run preview
3. Report scores for: Performance, Accessibility, 
   Best Practices, SEO
4. Compare against V1.4.0 baseline:
   99 / 94 / 100 / 100
5. List any remaining issues
6. Do NOT fix anything — report only

Output the results as a table.
```

**Prompt V1.4.3-P5 — Wire APP_VERSION to footer**
```
V1.4.3-P5 — Wire __APP_VERSION__ to footer

1. In vite.config.ts, add a define block that exposes 
   the package.json version:
   define: {
     '__APP_VERSION__': JSON.stringify(
       require('./package.json').version
     )
   }
   (or use import if ESM — check current vite.config format)

2. In src/components/layout/Footer.tsx, add a small 
   version badge displaying V + __APP_VERSION__ 
   (e.g. "V1.4.3") in nok-caption color, bottom-right 
   or below the copyright line.

3. Verify on localhost that the version displays correctly.

Files changed: vite.config.ts, Footer.tsx
```

---

## SECTION 5: Key Lessons Carried Forward

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
| Particles | 2D Canvas (custom, touch-enabled) |
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
| 2 | Hero | #0f2920 deep | First impression, particles, single CTA |
| 3 | Services | #2d5a42 medium | 4 service cards |
| 4 | TechStack | #1a3a2a forest | Technology grid + marquee |
| 5 | WhyNestCalc | #0f2920 deep | Stats + differentiators + founder bio |
| 6 | Testimonials | #1a3a2a forest | Social proof carousel |
| 7 | Contact | #2d5a42 medium | Form + mailto + trust badges |
| 8 | Footer | #0f2920 deep | Links + legal |

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNestCalc, Footer bg |
| nok-forest | #1a3a2a | TechStack, Testimonials bg |
| nok-medium | #2d5a42 | Services, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |

---

## SECTION 7: Parked Items

- Blog/content section
- Case study detail pages
- Client portal link
- Pricing section (if applicable)
- FAQ schema when content expands
- NokYai.com brand (retired, parked)
- Controller agent (parked until all 8 agents running — see Agent Stack Phased Plan)

---

## Completed Phases Through V1.4.2

See NestCalc-Roadmap.md for the full Completed Phases table.

**V1.4.2 (deployed, tag v1.4.2):**
- Fixed Hero CTA dual-scroll bug (ParticleField pointer-events-none + removed btnHovered/dynamic z-index/duplicate onClick)
- Fixed mobile touch (split touchstart, removed preventDefault, passive listeners)
- Renamed NokYai → NestCalc in source (asset file, component file, imports)
- Rewrote PrivacyPolicy.tsx for NestCalc.ai, LLC
- Rewrote TermsOfService.tsx for NestCalc.ai, LLC
- Rewrote Disclaimer.tsx for NestCalc.ai, LLC
- Replaced favicon PNGs (48x48, 180x180, 512x512), removed SVG favicon
