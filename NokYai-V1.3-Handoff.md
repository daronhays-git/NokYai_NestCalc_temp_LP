# NokYai LP V1.3 — Handoff

**Created:** April 11, 2026  
**Starting Point:** V1.2 deployed (commit 38b5c73)  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Live:** Deployed via Netlify (auto-deploy from main branch)  
**Dev:** http://localhost:5174  
**Goal:** Responsive polish, SEO, final content, and animated logo

---

## SECTION 1: Current State (V1.2)

### What's Complete and Working
- Vite + React 18 + TypeScript project scaffolded
- Tailwind CSS 3.4 with custom design tokens and animations
- Google Fonts loaded: Syne (display) + Outfit (body)
- Green/gold color re-skin complete (NestCalc DNA palette):
  - Backgrounds: #0f2920 (deep), #1a3a2a (forest), #2d5a42 (medium)
  - Text: #FFFFFF (headings), #FEF3C7 (body wheat), #D4C9A8 (captions)
  - Accents: #F59E0B (gold), #0d9488 (teal)
- 12 section components built and rendering:
  - Navbar (fixed, scroll-aware, mobile menu, Nok/Yai gold logo)
  - Hero (full viewport, animated headline, staggered CTAs, particle field)
  - LogoBar (infinite CSS marquee with tech logos)
  - Services (4 GlowCards in 2x2 grid)
  - CaseStudies (3 project cards with metrics)
  - Process (horizontal timeline, 4 steps)
  - Testimonials (auto-rotating glassmorphism carousel)
  - TechStack (grid of tech cards)
  - WhyNokYai (stat counters + differentiator cards)
  - CTABand (full-width gradient with MagneticButton)
  - Contact (form + mailto with clipboard copy + trust badges)
  - Footer (4-column layout with social icons)
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
- Guardian Bird feature (geometric eagle, flight physics, button interaction)
- GSAP ScrollTrigger integration for section reveals
- Performance: lazy loading, code splitting
- Contact form: Netlify Forms with AJAX submission, email notifications to daron@nestcalc.ai and nestcalc.ai@gmail.com
- Email link: mailto + clipboard copy with gold toast notification
- Trust badges replacing decorative code snippet
- Git remote consolidated: single origin → NokYai_NestCalc_temp_LP

### What's Pending
- Responsive polish pass (all breakpoints)
- Animated bird logo video integration (need clean file with matching bg)
- Replace placeholder content (testimonials, case study images, tech logos)
- SEO meta tags and OG image
- Analytics tracking (Google Analytics or Plausible)
- robots.txt and sitemap.xml
- Favicon and apple-touch-icon

---

## SECTION 2: Claude.ai Initialization

To start the next session, open a new Claude.ai chat and paste:

```
I'm continuing work on the NokYai.com landing page project.
Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
The handoff file in project files has full context.
The immediate priority is responsive polish and SEO setup.
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NokYai LP V1.3 — continuing from V1.2 (commit 38b5c73).

PROJECT CONTEXT:
- Vite + React 18 + TypeScript frontend
- Terminal: C:\Users\daron\dev3\nokyai-lp> npm run dev
- Dev server: http://localhost:5174
- Branch: main
- Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
- Deployed via Netlify (auto-deploy from main)

FILE STRUCTURE:
- src/components/layout/    (Navbar.tsx, Footer.tsx)
- src/components/sections/  (Hero, Services, CaseStudies, Process,
                             Testimonials, TechStack, WhyNokYai,
                             CTABand, Contact, LogoBar)
- src/components/ui/        (MagneticButton, GlowCard, SectionHeading,
                             CustomCursor, ScrollProgress)
- src/components/effects/   (ParticleField, GradientMesh, NoiseOverlay)
- src/styles/globals.css
- src/lib/animations.ts     (GSAP configs)
- src/lib/constants.ts      (site content)
- src/lib/birdPaths.ts      (Guardian Bird SVG paths)

COLOR PALETTE:
  Backgrounds: #0f2920 (deep) / #1a3a2a (forest) / #2d5a42 (medium)
  Text: #FFFFFF (headings) / #FEF3C7 (body) / #D4C9A8 (captions)
  Accents: #F59E0B (gold) / #0d9488 (teal) / #dc2626 (errors)

CRITICAL RULES:
- One change per prompt
- Verify on localhost after every change
- Do NOT modify fonts (Syne + Outfit locked in)
- Do NOT change section order or component structure
- Do NOT change the color palette
- Git push goes to origin (NokYai_NestCalc_temp_LP) on main
```

---

## SECTION 4: Next Session Prompts

**Prompt V1.3-P1 — Responsive polish pass**
```
Do a responsive design pass on all NokYai.com LP sections.

Test at these breakpoints: 375px, 768px, 1024px, 1440px

Ensure:
- Hero headline scales properly (clamp)
- Service cards: 1 column mobile, 2 tablet+
- Case studies: horizontal scroll mobile, 3 visible desktop
- Process: vertical timeline mobile, horizontal desktop
- Testimonials: full-width cards mobile
- Stats: 2x2 grid mobile, 4-across desktop
- Contact: stacked mobile, side-by-side desktop
- Footer: single column mobile, 4 columns desktop
- All text readable, no overflow or truncation
- Touch targets minimum 44px on mobile
- Custom cursor hidden on mobile
- No horizontal overflow on any screen size
- Guardian Bird hidden or simplified on mobile

Verify at all breakpoints — no broken layouts.
```

**Prompt V1.3-P2 — SEO meta tags**
```
Add SEO meta tags to index.html:

- <title>NestCalc.ai — AI-Powered Real Estate Investment Tools</title>
- <meta name="description" content="Custom AI applications, 
  intelligent automation, and next-gen digital products — 
  built fast, built right.">
- Open Graph tags: og:title, og:description, og:image, og:url
- Twitter card tags: twitter:card, twitter:title, twitter:description
- Favicon: add a simple gold "N" favicon if no file exists
- Apple touch icon
- <meta name="robots" content="index, follow">
- Canonical URL

Do not change any component files.
```

**Prompt V1.3-P3 — Add robots.txt and sitemap**
```
Create public/robots.txt:
  User-agent: *
  Allow: /
  Sitemap: https://[SITE_URL]/sitemap.xml

Create public/sitemap.xml with the single landing page URL.

Verify both files appear in dist/ after npm run build.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Test contact forms with realistic content** — Repeated short test messages from the same email address will be flagged as spam by Akismet. Use different email addresses and write 2-3 sentences of real content.

**[NEW] Netlify Akismet filtering is platform-level** — Cannot be disabled via code. Honeypot removal alone doesn't fix it if the submissions themselves look spammy.

**[NEW] Always verify git remote before pushing** — Use `git remote -v` to confirm which repo you're pushing to. Consolidate to a single `origin` to avoid confusion.

**[NEW] mailto: links need clipboard fallback** — Not all users have a default email app configured. Copy-to-clipboard + toast is the bulletproof pattern.

**Canvas > Three.js for particle effects** — 2D canvas with requestAnimationFrame gives better mouse interaction control than R3F Points geometry.

**Color scheme testing** — Always visualize the full section flow before implementing. The "zebra effect" from alternating dark/light was caught early.

**NestCalc palette is a competitive advantage** — Forest green + gold + warm wheat is distinctive and proven. Carries credibility across products.

**Cloudinary video embed** — iframe embeds don't support mix-blend-mode. Use native <video> tag with direct Cloudinary URL for transparency effects.

**Workspace management** — Save VS Code workspaces as .code-workspace files to switch between projects cleanly.

---

## SECTION 6: Architecture Reference

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 18 + TypeScript |
| Styling | Tailwind CSS 3.4 |
| Animation | Framer Motion + GSAP ScrollTrigger |
| Particles | 2D Canvas (custom) |
| Fonts | Syne (display) + Outfit (body) |
| Forms | Netlify Forms (AJAX submission) |
| Deploy | Netlify (auto-deploy from main) |
| Repo | GitHub: daronhays-git/NokYai_NestCalc_temp_LP |

### Section Flow
| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Navbar | transparent → deep/80 | Navigation |
| 2 | Hero | #0f2920 deep | First impression, particles, CTA |
| 3 | LogoBar | #1a3a2a forest | Tech credibility strip |
| 4 | Services | #2d5a42 medium | 4 service cards |
| 5 | CaseStudies | #1a3a2a forest | Project showcases |
| 6 | Process | #2d5a42 medium | 4-step timeline |
| 7 | Testimonials | #1a3a2a forest | Social proof carousel |
| 8 | TechStack | #2d5a42 medium | Technology grid |
| 9 | WhyNokYai | #0f2920 deep | Stats + differentiators |
| 10 | CTABand | gradient | Conversion section |
| 11 | Contact | #2d5a42 medium | Form + mailto + trust badges |
| 12 | Footer | #0f2920 deep | Links + legal |

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| nok-deep | #0f2920 | Hero, WhyNokYai, Footer bg |
| nok-forest | #1a3a2a | LogoBar, Cases, Testimonials bg |
| nok-medium | #2d5a42 | Services, Process, Contact bg |
| nok-gold | #F59E0B | CTAs, numbers, highlights |
| nok-teal | #0d9488 | Links, secondary accent |
| nok-heading | #FFFFFF | Section headings |
| nok-body | #FEF3C7 | Body text (warm wheat) |
| nok-caption | #D4C9A8 | Captions, muted labels |
