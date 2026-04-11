# NokYai LP V1.4.0 — Handoff

**Created:** April 11, 2026  
**Starting Point:** V1.3.0 deployed (commit 167bb5a)  
**Repo:** https://github.com/daronhays-git/NokYai_NestCalc_temp_LP  
**Live:** Deployed via Netlify (auto-deploy from main branch)  
**Dev:** http://localhost:5174  
**Goal:** Replace placeholder content, add analytics, animated bird logo

---

## SECTION 1: Current State (V1.3.0)

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
- Guardian Bird feature (geometric eagle, flight physics, button interaction, hidden on mobile)
- GSAP ScrollTrigger integration for section reveals
- Performance: lazy loading, code splitting
- Contact form: Netlify Forms with AJAX submission, email notifications to daron@nestcalc.ai and nestcalc.ai@gmail.com
- Email link: mailto + clipboard copy with gold toast notification
- Trust badges (Secure, 24hr response) — Bangkok badge removed
- Git remote consolidated: single origin → NokYai_NestCalc_temp_LP
- Full responsive pass at 375px, 768px, 1024px, 1440px:
  - Hero headline clamp(3rem, 8vw, 6rem)
  - Services 1-col mobile, 2-col tablet+
  - CaseStudies horizontal scroll mobile, 3-col desktop
  - Process vertical mobile, horizontal desktop
  - Testimonials progressive padding
  - Contact stacked mobile, side-by-side desktop
  - Footer 2x2 grid mobile, 4-col desktop, compact padding
  - All touch targets minimum 44px
  - Custom cursor hidden on touch devices
  - No horizontal overflow at any breakpoint
- Mobile padding tightened: all content sections py-12 sm:py-16 lg:py-32
- SEO meta tags: title, description, OG tags, Twitter cards, canonical URL
- Green eagle favicon (SVG + PNG + apple-touch-icon)
- OG image (1200x630 branded)
- robots.txt and sitemap.xml

### What's Pending
- Replace placeholder testimonials with real quotes
- Replace gradient placeholder images with real project screenshots
- Replace tech logo placeholders with actual SVG logos
- Write final copy for all sections
- Animated bird logo video integration (need clean file with matching bg)
- Google Analytics or Plausible tracking
- Performance audit (Lighthouse 90+)
- Social sharing preview image (verify OG image renders correctly)
- Blog/content section (future)
- Case study detail pages (future)

---

## SECTION 2: Claude.ai Initialization

To start the next session, open a new Claude.ai chat and paste:

```
I'm continuing work on the NokYai.com landing page project.
Repo: https://github.com/daronhays-git/NokYai_NestCalc_temp_LP
The handoff file in project files has full context.
The immediate priority is replacing placeholder content and adding analytics.
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NokYai LP V1.4.0 — continuing from V1.3.0 (commit 167bb5a).

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

**Prompt V1.4.0-P1 — Add Google Analytics**
```
Add Google Analytics 4 to the NokYai LP.

1. Add the GA4 script tag to index.html (use gtag.js method)
2. Use measurement ID: [USER TO PROVIDE GA4 ID]
3. Place the script in <head> before other scripts
4. Verify the build still passes after adding

Do not change any component files.
```

**Prompt V1.4.0-P2 — Replace placeholder testimonials**
```
In src/lib/constants.ts, replace the placeholder testimonials with these real quotes:

[USER TO PROVIDE REAL TESTIMONIAL CONTENT:
- Name, title, company
- Quote text
- For each of the 3 testimonial slots]

Do not change any component files — only update the data in constants.ts.
```

**Prompt V1.4.0-P3 — Replace case study placeholder images**
```
In src/components/sections/CaseStudies.tsx, replace the gradient placeholder backgrounds with real project screenshot images.

1. Place the screenshot images in public/images/cases/
2. Update each case study card to use <img> tags pointing to the new images
3. Ensure images are optimized (compress to under 200KB each)
4. Maintain the existing card layout and overlay text

[USER TO PROVIDE: 3 project screenshot images]
```

**Prompt V1.4.0-P4 — Lighthouse performance audit**
```
Run a Lighthouse audit on the NokYai LP production build.

1. npm run build
2. npm run preview
3. Report scores for: Performance, Accessibility, Best Practices, SEO
4. List the top 5 issues affecting each score
5. Do NOT fix anything yet — report only

Output the results as a table.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Favicon is what Claude Code generates, not what the prompt spec says** — Always verify generated assets match expectations. The spec said "gold N" but Claude Code created a green eagle. Check outputs, don't assume.

**[NEW] Tighten mobile padding early** — Default py-24 (96px) is excessive on mobile. Use py-12 sm:py-16 lg:py-32 pattern for content sections.

**[NEW] Footer 2x2 grid works well on mobile** — grid-cols-2 with compact gap-6 keeps the footer to half-screen height instead of full-screen.

**Test contact forms with realistic content** — Repeated short test messages from the same email address will be flagged as spam by Akismet. Use different email addresses and write 2-3 sentences of real content.

**Netlify Akismet filtering is platform-level** — Cannot be disabled via code. Honeypot removal alone doesn't fix it if the submissions themselves look spammy.

**Always verify git remote before pushing** — Use `git remote -v` to confirm which repo you're pushing to. Consolidate to a single `origin` to avoid confusion.

**mailto: links need clipboard fallback** — Not all users have a default email app configured. Copy-to-clipboard + toast is the bulletproof pattern.

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
