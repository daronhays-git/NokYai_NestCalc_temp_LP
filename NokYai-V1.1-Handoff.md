# NokYai LP V1.1 — Handoff

**Created:** March 28, 2026  
**Starting Point:** V1.0 deployed (initial commit, branch: main)  
**Repo:** https://github.com/daronhays-git/nokyai-LP  
**Local Dev:** http://localhost:5174  
**Goal:** Complete green/gold re-skin, responsive polish, and Netlify deploy

---

## SECTION 1: Current State (V1.0)

### What's Complete and Working
- Vite + React 18 + TypeScript project scaffolded
- Tailwind CSS 3.4 with custom design tokens and animations
- Google Fonts loaded: Syne (display) + Outfit (body)
- 12 section components built and rendering:
  - Navbar (fixed, scroll-aware, mobile menu)
  - Hero (full viewport, animated headline, staggered CTAs)
  - LogoBar (infinite CSS marquee with tech logos)
  - Services (4 GlowCards in 2x2 grid)
  - CaseStudies (3 project cards with metrics)
  - Process (horizontal timeline, 4 steps)
  - Testimonials (auto-rotating glassmorphism carousel)
  - TechStack (grid of tech cards)
  - WhyNokYai (stat counters + differentiator cards)
  - CTABand (full-width gradient with MagneticButton)
  - Contact (form + info, animated focus states)
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
- GSAP ScrollTrigger integration for section reveals
- Performance: lazy loading, code splitting (Three.js removed)
- Git: pushed to origin/main, 47 files, 7,173 lines

### What's Pending
- Color palette re-skin (currently cyan/violet/black — needs green/gold)
- Animated logo video integration (need clean file with matching bg)
- Responsive polish pass (Prompt 6-C)
- Netlify deploy configuration (Prompt 6-D)
- Replace placeholder content (testimonials, case study images, logos)
- Connect contact form backend
- SEO meta tags and OG image
- Analytics tracking

---

## SECTION 2: Claude.ai Initialization

To start the next session, open a new Claude.ai chat and paste:

```
I'm continuing work on the NokYai.com landing page project.
Repo: https://github.com/daronhays-git/nokyai-LP
The handoff file in project files has full context.
The immediate priority is the green/gold color re-skin using 
prompts R-1, R-2, R-3 from the build plan.
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NokYai LP V1.1 — continuing from V1.0 (initial commit, branch: main).

PROJECT CONTEXT:
- Vite + React 18 + TypeScript frontend
- Terminal: C:\Users\daron\dev3\nokyai-lp> npm run dev
- Dev server: http://localhost:5174
- Branch: main
- Tailwind CSS 3.4 with custom tokens
- Framer Motion for animations, GSAP ScrollTrigger for scroll
- 2D Canvas particle field (not Three.js)
- Fonts: Syne (display), Outfit (body) via Google Fonts

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

TARGET COLOR PALETTE (from NestCalc DNA):
  Backgrounds: #0f2920 (deep) / #1a3a2a (forest) / #2d5a42 (medium)
  Text: #FFFFFF (headings) / #FEF3C7 (body) / #D4C9A8 (captions)
  Accents: #F59E0B (gold) / #0d9488 (teal) / #dc2626 (errors)

CRITICAL RULES:
- One change per prompt
- Verify on localhost after every change
- Do NOT introduce new fonts
- Do NOT change the section order or component structure
- Keep all animations and effects — only change colors
```

---

## SECTION 4: Next Session Prompts

These prompts are ready to execute in order in the V1.1 Claude Code session.

**Prompt V1.1-P1 — Re-skin design system (R-1)**
```
Re-skin the NokYai.com project with a new color palette based on 
deep forest greens and warm gold accents. This prompt updates ONLY 
the design system files — not individual components.

UPDATE tailwind.config.ts — replace the entire nok color palette:

Backgrounds:
  nok-deep: #0f2920
  nok-forest: #1a3a2a
  nok-medium: #2d5a42
  nok-surface: rgba(255,255,255,0.08)
  nok-white: #FFFFFF

Text colors:
  nok-gold: #F59E0B
  nok-heading: #FFFFFF
  nok-body: #FEF3C7
  nok-caption: #D4C9A8

Accents:
  nok-teal: #0d9488
  nok-red: #dc2626

Borders:
  nok-border: rgba(255,255,255,0.1)
  nok-border-light: rgba(255,255,255,0.05)

REMOVE all old tokens (nok-black, nok-dark, nok-cyan, nok-violet, 
nok-violet-dim, nok-cyan-dim, nok-muted, nok-text).

UPDATE src/styles/globals.css:
- :root CSS custom properties to match all new tokens
- Body background: #0f2920, text: #FEF3C7
- Selection: bg #F59E0B, text #0f2920
- Scrollbar thumb: #F59E0B, track: #0f2920

Do NOT touch any component files yet.
Verify: npm run dev — deep green background, gold scrollbar.
```

**Prompt V1.1-P2 — Re-skin layout + UI components (R-2)**
```
Update all layout and UI components to use the new green/gold palette.
Replace every reference to old cyan/violet colors.

Navbar.tsx: "Nok" white, "Yai" #F59E0B. Scrolled bg: nok-deep/80.
  Nav links: text-nok-caption hover:text-white. CTA: bg-nok-gold text-nok-deep.
Footer.tsx: bg-nok-deep. Links: text-nok-caption hover:text-white.
  Social icons: hover:text-nok-gold.
CustomCursor.tsx: Ring hover color #F59E0B.
ScrollProgress.tsx: Gradient from #0d9488 to #F59E0B. Glow rgba(245,158,11,0.5).
GlowCard.tsx: Glow color gold. Card bg: nok-surface. Border: nok-border.
MagneticButton.tsx: bg-nok-gold, text-nok-deep. Hover glow gold/30%.
SectionHeading.tsx: Accent bar bg-nok-gold. Subtitle text-nok-body.
GradientMesh.tsx: Colors ['#F59E0B', '#0d9488', '#0f2920'].
ParticleField.tsx: Gold connection lines, warm gold cursor glow,
  wheat-tinted inter-particle lines.

Global replace: #00f0ff→#F59E0B, #7c3aed→#0d9488, #5b21b6→#1a3a2a.
Verify: Gold navbar logo, gold scroll bar, gold cursor hover.
```

**Prompt V1.1-P3 — Re-skin all sections (R-3)**
```
Update all section backgrounds and text colors:

Backgrounds:
  Hero: #0f2920 | LogoBar: #1a3a2a | Services: #2d5a42
  CaseStudies: #1a3a2a | Process: #2d5a42 | Testimonials: #1a3a2a
  WhyNokYai: #0f2920 | CTABand: gradient #1a3a2a↔#2d5a42
  Contact: #2d5a42

Text rules for ALL sections:
  Headings: #FFFFFF | Body: #FEF3C7 | Captions: #D4C9A8
  Numbers/stats: #F59E0B | Links: #0d9488
  CTA buttons: text #0f2920 on bg #F59E0B

Cards: bg rgba(255,255,255,0.08), border rgba(255,255,255,0.1)
Timeline gradient: #F59E0B → #0d9488
Step numbers: bg-nok-gold text-nok-deep
Testimonial dots: active #F59E0B, inactive #D4C9A8/30%
Input focus: border #0d9488, ring #0d9488/30%

Remove dark mode toggle from App.tsx — always green theme.
Verify: Full scroll — all sections correct green tones, warm 
gold/wheat text, no cyan or violet anywhere.
```

**Prompt V1.1-P4 — Responsive polish (6-C)**
```
Responsive design pass on all sections. Test at 375px, 768px, 
1024px, 1440px. Ensure no overflow, readable text, 44px touch 
targets, custom cursor hidden on mobile, proper stacking on all 
breakpoints. Add smooth page-load fade-in animation.
```

**Prompt V1.1-P5 — Netlify deploy (6-D)**
```
Create netlify.toml with build config, redirects, security headers, 
and cache headers. Create _redirects in public/. Update vite.config.ts 
with manual chunks for vendor/animation splits. Verify with 
npm run build && npm run preview.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Canvas > Three.js for particle effects** — 2D canvas with requestAnimationFrame gives better mouse interaction control than R3F/Three.js Points geometry. Easier to debug, better performance.

**[NEW] Color scheme testing** — Always visualize the full section flow before implementing. The "zebra effect" from alternating dark/light was caught in the visual mockup phase.

**[NEW] NestCalc palette is a competitive advantage** — The forest green + gold + warm wheat combination is distinctive and proven. Carries credibility across products.

**[NEW] Cloudinary video embed** — iframe embeds don't support mix-blend-mode. Use native `<video>` tag with direct Cloudinary URL for background transparency effects.

**Workspace management** — Save VS Code workspaces as .code-workspace files to switch between NestCalc and NokYai cleanly.

**Claude Code chat resets on workspace switch** — Expected behavior. Code on disk is preserved. Just re-paste context prompt.

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
| Deploy | Netlify (pending) |
| Repo | GitHub: daronhays-git/nokyai-LP |

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
| 11 | Contact | #2d5a42 medium | Form + info |
| 12 | Footer | #0f2920 deep | Links + legal |
