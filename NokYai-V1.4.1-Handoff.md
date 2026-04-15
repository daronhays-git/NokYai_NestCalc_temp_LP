# NokYai LP V1.4.1 — Handoff

**Created:** April 15, 2026  
**Starting Point:** V1.4.0 deployed (commit 198782e)  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Live:** Deployed via Netlify (auto-deploy from main branch)  
**Dev:** http://localhost:5173  
**Goal:** Fix favicon SVG, set up GA4 analytics, begin content replacement

---

## SECTION 1: Current State (V1.4.0)

### What's Complete and Working
- Vite + React 19 + TypeScript project scaffolded
- Tailwind CSS 4 with CSS-first @theme tokens and animations
- Google Fonts loaded: Space Grotesk (display) + Outfit (body)
- Green/gold color re-skin complete (NestCalc DNA palette):
  - Backgrounds: #0f2920 (deep), #1a3a2a (forest), #2d5a42 (medium)
  - Text: #FFFFFF (headings), #FEF3C7 (body wheat), #D4C9A8 (captions)
  - Accents: #F59E0B (gold), #0d9488 (teal)
- Active section components built and rendering:
  - Navbar (fixed, scroll-aware, mobile menu, Nok/Yai gold logo)
  - Hero (full viewport, animated headline, staggered CTAs, particle field)
  - Services (4 GlowCards in 2x2 grid)
  - Testimonials (auto-rotating glassmorphism carousel)
  - TechStack (grid of tech cards with marquee)
  - WhyNokYai (stat counters + differentiator cards)
  - Contact (form + mailto with clipboard copy + trust badges)
  - Footer (4-column layout with social icons)
- Legal components: LegalModal (with back link at top AND bottom), PrivacyPolicy, TermsOfService, Disclaimer
- Reusable UI components:
  - CustomCursor (dot + ring, hover detection, mobile hidden)
  - ScrollProgress (gradient bar, rAF-driven)
  - GlowCard (rotating gradient border, 3D tilt)
  - MagneticButton (cursor-following, spring return)
  - SectionHeading (title + accent bar + subtitle)
- Effects layer:
  - ParticleField (2D canvas, mouse-reactive, gold connection lines)
  - GradientMesh (3-blob animated backgrounds)
  - NoiseOverlay (SVG feTurbulence grain)
- Guardian Bird feature (geometric eagle, flight physics, button interaction, hidden on mobile)
- GSAP ScrollTrigger integration for section reveals
- Performance: lazy loading, code splitting
- Contact form: Netlify Forms with AJAX submission, console.error in catch block
- Email link: mailto + clipboard copy with gold toast notification
- Trust badges (Secure, 24hr response)
- Full responsive pass at 375px, 768px, 1024px, 1440px
- Mobile padding tightened: all content sections py-12 sm:py-16 lg:py-32
- SEO meta tags: title, description, OG tags, Twitter cards, canonical URL
- Title tags updated: "Custom AI Development Studio | NestCalc.ai"
- Organization JSON-LD schema in index.html
- Eagle favicon (PNG 48x48 + apple-touch-icon 180x180) — SVG needs manual redo
- OG image (1200x630 branded)
- robots.txt and sitemap.xml
- Agent stack ported and operational:
  - Foundation configs: CLAUDE.md, REVIEW.md, design-tokens.md
  - Agent commands: /shield, /eagle, /lighthouse, /scribe
  - GitHub Actions: Shield, Eagle, Scribe, Review-All (on PR), Lighthouse (on push)
  - Baseline snapshot captured: docs/reports/agent-baseline-2026-04-15.md
- Agent-flagged quick wins all fixed (5/5 from baseline)
- Accessibility contrast failures fixed (9/9 — text-nok-gold/60 → text-nok-caption)
- Unsized images fixed (width/height on both logo img tags)
- Orphaned assets removed (hero.png, NokYai-logo-gold.jpg, NokYai-logo.svg — 636 KB reclaimed)
- Footer typo fixed ("Built by NestCalc.ai")
- Hero CTAs: primary smooth-scrolls to Contact, secondary renamed "Explore Services"
- Lighthouse scores: 99 Performance / 94 Accessibility / 100 Best Practices / 100 SEO
- Font config aligned: Space Grotesk in tailwind.config.ts matches globals.css and index.html
- Dead code removed: CaseStudies, CTABand, LogoBar, Process sections; App.css, index.css boilerplate; constants.ts; react.svg, vite.svg

### What's Pending
- Fix favicon SVG (eagle silhouette — needs manual design, Claude Code can't create logo art)
- Google Analytics 4 setup (parked — waiting on domain/bank setup)
- Validate JSON-LD schema with Google Rich Results Test (post-deploy)
- Replace placeholder testimonials with real quotes
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Performance audit re-run (chase accessibility to 100 after contrast fix)
- Social sharing preview image (verify OG image renders correctly)
- Replace "Coming Soon" service cards with specific content
- Add founder/author bio for EEAT
- Rewrite legal documents for AI services (currently references old RE product)
- Blog/content section (future)

---

## SECTION 2: Claude.ai Initialization

To start the next session, open a new Claude.ai chat and paste:

```
I'm continuing work on the NokYai.com landing page project.
Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
The handoff file in project files has full context.
The immediate priority is fixing the favicon SVG, setting up GA4, and beginning content replacement.
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NokYai LP V1.4.1 — continuing from V1.4.0 (commit 198782e).

PROJECT CONTEXT:
- Vite + React 19 + TypeScript frontend
- Terminal: C:\Users\daron\dev3\nokyai-lp> npm run dev
- Dev server: http://localhost:5173
- Branch: main
- Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
- Deployed via Netlify (auto-deploy from main)

FILE STRUCTURE:
- src/components/layout/    (Navbar.tsx, Footer.tsx)
- src/components/sections/  (Hero, Services, Testimonials,
                             TechStack, WhyNokYai, Contact)
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

**Prompt V1.4.1-P1 — Replace favicon SVG with manually designed eagle**
```
V1.4.1-P1 — Replace favicon SVG

I've manually created a new public/favicon.svg with the 
eagle logo. Verify it:

1. Check that public/favicon.svg exists and is valid SVG
2. Hard refresh localhost (Ctrl+Shift+R)
3. Report what the browser tab icon looks like
4. Verify build passes

Do NOT modify the SVG file — report only.
```

**Prompt V1.4.1-P2 — Add Google Analytics 4**
```
V1.4.1-P2 — Add Google Analytics 4

Add Google Analytics 4 to the NokYai LP.

1. Add the GA4 script tag to index.html (use gtag.js method)
2. Use measurement ID: [USER TO PROVIDE GA4 ID]
3. Place the script in <head> before other scripts
4. Verify the build still passes after adding

Do not change any component files.
```

**Prompt V1.4.1-P3 — Re-run Lighthouse audit**
```
V1.4.1-P3 — Lighthouse audit re-run

Run a Lighthouse audit on the NokYai LP production build.

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

**Prompt V1.4.1-P4 — Audit placeholder content**
```
V1.4.1-P4 — Audit placeholder content

Search the entire codebase for placeholder content that 
needs replacing before launch:

1. Find all "Coming Soon" text
2. Find all "Lorem ipsum" or generic filler text
3. Find all placeholder testimonial quotes
4. Find all TODO/FIXME/PLACEHOLDER comments
5. Find any hardcoded example data (fake names, 
   fake companies, fake quotes)

For each finding, report: file, line number, and the 
current placeholder text.

Do NOT change anything — report only.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Claude Code can't create logo art** — SVG favicons with brand imagery need manual design in Figma/Inkscape. Claude Code can resize raster images but shouldn't generate simplified silhouettes.

**[NEW] Favicon SVG needs simplification for small sizes** — Detail muddles at 16-32px. A simple geometric shape reads better than a miniaturized complex logo.

**[NEW] Check for orphaned assets periodically** — 636 KB of unused images accumulated silently. Run a grep-based audit of src/assets/ to catch imports that were removed but files weren't deleted.

**[NEW] Legal modal UX** — Users read to the bottom then need to scroll back up. Always add a back/close link at both top and bottom of long scrollable content.

**[NEW] CTA label should match the target** — "View Our Work" pointing at Services was misleading. Rename CTAs when the destination section doesn't have the expected content yet.

**[NEW] One class change can fix many Lighthouse findings** — All 9 contrast failures were the same pattern (text-nok-gold/60). Systematic fixes beat one-by-one patches.

**claude-code-action@v1 only supports pull_request triggers** — push events fail with "Unsupported event type: push". Use pull_request for Shield/Eagle, push for Lighthouse (different action).

**max_turns is not a valid input** — for claude-code-action@v1, use claude_args: "--max-turns 30" instead.

**GitHub secrets are per-repo** — porting workflow files doesn't port CLAUDE_CODE_OAUTH_TOKEN. Must be added manually in each repo's Settings → Secrets.

**Use claude setup-token in standalone terminal** — cannot run inside Claude Code session. Generates OAuth token for CI use on Pro/Max plans.

**Scribe can false-positive** — CLAUDE.md constants.ts finding was wrong; always verify before acting on Scribe output.

**Dead code accumulates silently** — 4 section components were unused but still in the repo. Run PORT-C2 style cleanup periodically.

**Favicon is what Claude Code generates, not what the prompt spec says** — Always verify generated assets match expectations.

**Tighten mobile padding early** — Default py-24 (96px) is excessive on mobile. Use py-12 sm:py-16 lg:py-32 pattern.

**Footer 2x2 grid works well on mobile** — grid-cols-2 with compact gap-6 keeps footer to half-screen height.

**Test contact forms with realistic content** — Repeated short test messages flagged as spam by Akismet.

**Netlify Akismet filtering is platform-level** — Cannot be disabled via code.

**Always verify git remote before pushing** — Use git remote -v to confirm.

**mailto: links need clipboard fallback** — Not all users have a default email app configured.

**Canvas > Three.js for particle effects** — 2D canvas with rAF gives better mouse interaction.

**Color scheme testing** — Visualize full section flow before implementing.

**NestCalc palette is a competitive advantage** — Forest green + gold + warm wheat is distinctive.

**Cloudinary video embed** — iframe embeds don't support mix-blend-mode. Use native video tag.

**Workspace management** — Save VS Code workspaces as .code-workspace files.

---

## SECTION 6: Architecture Reference

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 + TypeScript |
| Styling | Tailwind CSS 4 (CSS-first @theme) |
| Animation | Framer Motion + GSAP ScrollTrigger |
| Particles | 2D Canvas (custom) |
| Fonts | Space Grotesk (display) + Outfit (body) |
| Forms | Netlify Forms (AJAX submission) |
| Deploy | Netlify (auto-deploy from main) |
| Agents | Shield, Eagle, Lighthouse, Scribe |
| CI | GitHub Actions (PR: Shield+Eagle+Scribe+Review-All, Push: Lighthouse) |
| Repo | GitHub: daronhays-git/NokYai_NestCalc_temp_LP |

### Section Flow
| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Navbar | transparent → deep/80 | Navigation |
| 2 | Hero | #0f2920 deep | First impression, particles, CTA |
| 3 | Services | #2d5a42 medium | 4 service cards |
| 4 | TechStack | #1a3a2a forest | Technology grid + marquee |
| 5 | WhyNokYai | #0f2920 deep | Stats + differentiators |
| 6 | Testimonials | #1a3a2a forest | Social proof carousel |
| 7 | Contact | #2d5a42 medium | Form + mailto + trust badges |
| 8 | Footer | #0f2920 deep | Links + legal |

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNokYai, Footer bg |
| nok-forest | #1a3a2a | TechStack, Testimonials bg |
| nok-medium | #2d5a42 | Services, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |
