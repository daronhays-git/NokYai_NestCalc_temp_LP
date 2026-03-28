# NokYai LP V1.2 — Handoff

**Created:** March 28, 2026  
**Starting Point:** V1.1 deployed (commit TBD — see git push step)  
**Repo:** https://github.com/daronhays-git/nokyai-LP  
**Local Dev:** http://localhost:5174  
**Goal:** Responsive polish pass + Netlify deploy

---

## SECTION 1: Current State (V1.1)

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
- Green/gold color re-skin complete (R-1, R-2, R-3):
  - Tailwind tokens updated: nok-deep, nok-forest, nok-medium, nok-gold, nok-teal
  - All components and sections converted from cyan/violet to green/gold
  - globals.css updated with green bg, gold scrollbar, gold selection
- Guardian Bird feature complete:
  - Geometric eagle logo rendered as gold Path2D stroke on canvas
  - SVG path data extracted into src/lib/birdPaths.ts
  - Simplified logo SVG at src/assets/NokYai-logo.svg
  - Flight physics: momentum, overshoot, cursor following
  - Horizontal mirroring when flying left
  - Gold particle trail during flight
  - Idle bobbing animation at perch position (right of headline)
  - Button proximity detection with glow/pulse effects
  - Button exclusion zones (bird stays above buttons)
  - Z-index layer swapping: canvas rises to z-20 during button hover
  - Bird appears 1.2s after page load
- GSAP ScrollTrigger integration for section reveals
- Performance: lazy loading, code splitting (Three.js removed)

### What's Pending
- Responsive polish pass (all breakpoints)
- Netlify deploy configuration
- Bird draw-in animation on first appearance (optional enhancement)
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
The immediate priority is responsive polish and Netlify deploy.
```

---

## SECTION 3: Claude Code Context Prompt

Paste into Claude Code chat in VS Code at the start of each session:

```
NokYai LP V1.2 — continuing from V1.1.

PROJECT CONTEXT:
- Vite + React 18 + TypeScript frontend
- Terminal: C:\Users\daron\dev3\nokyai-lp> npm run dev
- Dev server: http://localhost:5174
- Branch: main
- Tailwind CSS 3.4 with custom tokens
- Framer Motion for animations, GSAP ScrollTrigger for scroll
- 2D Canvas particle field (not Three.js)
- Guardian Bird: Path2D eagle on canvas, cursor-following, button-aware
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
- src/lib/birdPaths.ts      (eagle SVG path data for canvas)
- src/assets/NokYai-logo.svg (simplified geometric eagle)

COLOR PALETTE (implemented):
  Backgrounds: #0f2920 (deep) / #1a3a2a (forest) / #2d5a42 (medium)
  Text: #FFFFFF (headings) / #FEF3C7 (body) / #D4C9A8 (captions)
  Accents: #F59E0B (gold) / #0d9488 (teal) / #dc2626 (errors)

GUARDIAN BIRD ARCHITECTURE:
  - Path2D rendering on existing ParticleField canvas
  - Bird state machine: idle | flying | returning
  - Props from Hero.tsx: buttonRefs, particleWrapperRef
  - Per-frame button proximity detection (not event-based)
  - Button exclusion zones prevent overlap
  - Z-index swaps via particleWrapperRef on hover

CRITICAL RULES:
- One change per prompt
- Verify on localhost after every change
- Do NOT introduce new fonts
- Do NOT change the section order or component structure
- Do NOT modify bird flight physics without testing all states
```

---

## SECTION 4: Next Session Prompts

These prompts are ready to execute in order in the V1.2 Claude Code session.

**Prompt V1.2-P1 — Responsive audit**
```
Read all section components and report responsive issues.
Test mentally at 375px, 768px, 1024px, 1440px breakpoints.

For each component, report:
- Any fixed widths that would cause horizontal overflow
- Text sizes that may be too large on mobile
- Grid layouts that don't stack properly on small screens
- Touch targets smaller than 44px
- The Guardian Bird perch position on small screens
- CustomCursor visibility on touch devices

Do NOT modify anything. Report findings with file names 
and line numbers.
```

**Prompt V1.2-P2 — Responsive fixes (based on P1 findings)**
```
[Will be written after P1 diagnostic results come back]
```

**Prompt V1.2-P3 — Mobile bird behavior**
```
On mobile/touch devices (screen width <= 768px), the Guardian 
Bird should:
- Still appear at perch position after 1.2s delay
- Show idle bobbing animation (no cursor tracking)
- Hide button hover effects (no hover on touch)
- Scale down to 100px wide (from 128px)
- Perch at x = w * 0.75, y = h * 0.35

Detect mobile via: window.matchMedia('(pointer: coarse)').matches
or canvas width <= 768.

Do NOT remove the bird on mobile — it's a brand element.
Just disable cursor-dependent behaviors.
```

**Prompt V1.2-P4 — Netlify deploy configuration**
```
Create netlify.toml with build config, redirects, security 
headers, and cache headers. Create _redirects in public/. 
Update vite.config.ts with manual chunks for vendor/animation 
splits. Verify with npm run build && npm run preview.
```

**Prompt V1.2-P5 — Page load animation**
```
Add a smooth page-load fade-in animation. The body should 
start with opacity 0 and fade to 1 over 600ms after the 
DOM is ready. This runs before any Framer Motion stagger 
animations. Use CSS only — add to globals.css with a 
@keyframes fadeIn on the body element.
```

---

## SECTION 5: Key Lessons Carried Forward

**[NEW] Path2D > particles for logo rendering** — Don't try to make particles look like a specific shape. Use Path2D with real SVG path data for recognizable logos. Particles work as accents (trails, bursts, ambient effects), not as the primary shape.

**[NEW] Auto-trace SVG for logo paths** — Hand-coding bezier paths to match a logo is nearly impossible. Use vectorizer.ai or Inkscape to trace a PNG to SVG, then simplify in a vector editor before extracting path data.

**[NEW] Z-index stacking context trap** — A child element can never exceed its parent's z-index stacking context. To dynamically raise a canvas above content, the z-index must be on the parent div, not the canvas wrapper inside it.

**[NEW] Per-frame proximity > event-based hover** — For elements that move (MagneticButton), onMouseEnter/onMouseLeave fires inconsistently. Check mouse-to-element proximity every frame in the animation loop instead.

**[NEW] Cursor-stopped hover detection** — onMouseMove stops firing when cursor is stationary. Button hover detection must run per-frame in the animate loop using stored mouse position, not rely on mouse events.

**[NEW] Account for rendered size in exclusion zones** — When checking if an element overlaps a zone, use the element's bottom edge (center + half height), not just the center point.

**Canvas > Three.js for particle effects** — 2D canvas with requestAnimationFrame gives better mouse interaction control than R3F/Three.js Points geometry. Easier to debug, better performance.

**Color scheme testing** — Always visualize the full section flow before implementing. The "zebra effect" from alternating dark/light was caught in the visual mockup phase.

**NestCalc palette is a competitive advantage** — The forest green + gold + warm wheat combination is distinctive and proven. Carries credibility across products.

**Cloudinary video embed** — iframe embeds don't support mix-blend-mode. Use native `<video>` tag with direct Cloudinary URL for background transparency effects.

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
| Bird | Path2D from SVG (custom) |
| Fonts | Syne (display) + Outfit (body) |
| Deploy | Netlify (pending) |
| Repo | GitHub: daronhays-git/nokyai-LP |

### Section Flow
| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Navbar | transparent → deep/80 | Navigation |
| 2 | Hero | #0f2920 deep | First impression, particles, bird, CTA |
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

### Guardian Bird Architecture
| Component | Role |
|-----------|------|
| ParticleField.tsx | Canvas rendering, flight physics, state machine |
| birdPaths.ts | SVG path data (BIRD_PATHS, BIRD_BOUNDS, BIRD_VIEWBOX) |
| NokYai-logo.svg | Simplified geometric eagle source |
| Hero.tsx | Passes buttonRefs, particleWrapperRef to ParticleField |

Bird States: `idle` (bobbing at perch) → `flying` (cursor following) → `returning` (gliding back to perch)

Button Interaction: Per-frame proximity check → glow/pulse → z-index layer swap → exclusion zone push-out
