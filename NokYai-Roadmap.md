# NokYai.com LP — Roadmap

**Last Updated:** March 28, 2026  
**Current Status:** V1.1 complete — re-skin + Guardian Bird done, pending responsive + deploy  

---

## Completed Phases

| Phase | Version | What Was Done |
|-------|---------|--------------|
| Phase 1: Scaffolding | V1.0 | Project init, Tailwind config, design tokens, app shell |
| Phase 2: Global Effects | V1.0 | CustomCursor, ScrollProgress, NoiseOverlay, GradientMesh, GlowCard, MagneticButton |
| Phase 3: Navbar + Hero | V1.0 | Navbar with active detection, ParticleField (2D canvas), Hero content with animated headline |
| Phase 4: Content Sections | V1.0 | LogoBar, Services, CaseStudies, Process |
| Phase 5: Social Proof + CTA | V1.0 | Testimonials, TechStack, WhyNokYai, CTABand, Contact, Footer |
| Phase 6A: GSAP Integration | V1.0 | ScrollTrigger for all section reveals |
| Phase 6B: Performance | V1.0 | Lazy loading, code splitting |
| Re-skin (R-1, R-2, R-3) | V1.1 | Green/gold palette applied to design system, all components, all sections |
| Guardian Bird | V1.1 | Path2D geometric eagle with flight physics, cursor following, button awareness |

---

## Next Session (V1.2)

**Priority:** Responsive polish + Netlify deploy

1. Responsive audit (diagnostic — all breakpoints)
2. Responsive fixes (based on audit findings)
3. Mobile bird behavior (scale down, disable cursor tracking)
4. Netlify deploy configuration
5. Page load fade-in animation

---

## Backlog (Post V1.2)

### Content
- [ ] Replace placeholder testimonials with real quotes
- [ ] Replace gradient placeholder images with real project screenshots
- [ ] Replace tech logo placeholders with actual SVG logos
- [ ] Write final copy for all sections

### Functionality
- [ ] Connect contact form to Netlify Forms or Formspree
- [ ] Add form validation with error states
- [ ] Add success/error toast notifications
- [ ] Bird draw-in animation on first appearance (optional)

### SEO & Marketing
- [ ] SEO meta tags (title, description, keywords)
- [ ] Open Graph image for social sharing
- [ ] Favicon and apple-touch-icon
- [ ] Google Analytics or Plausible tracking
- [ ] robots.txt and sitemap.xml

### Future Enhancements
- [ ] Blog/content section
- [ ] Case study detail pages
- [ ] Client portal link
- [ ] Pricing section (if applicable)
- [ ] Multi-language support (from Builder_LP_5 pattern)

---

## What Changed — V1.1

**Session 2 (March 28, 2026)**
- Green/gold re-skin completed (R-1, R-2, R-3): Tailwind tokens, globals.css, all components and sections converted from cyan/violet to forest green/gold
- Guardian Bird feature built from scratch:
  - Brainstormed 7 concepts, selected "Guardian Bird" (Concept B)
  - Attempted particle-based bird silhouette — abandoned (particles can't form recognizable shapes)
  - Pivoted to Path2D canvas rendering with real SVG logo paths
  - Simplified logo in Inkscape, traced to SVG, extracted path data
  - Implemented flight physics: momentum, overshoot, friction, velocity capping
  - Added horizontal mirror when flying left
  - Added gold particle trail during flight
  - Button proximity detection (per-frame, not event-based)
  - Button exclusion zones with bird-height-aware push-out
  - Z-index layer swapping for button hover visibility
  - Glow/pulse effects on button hover
- Key decision: Path2D with real SVG data over particle approximation
- Key decision: Per-frame proximity detection over event-based hover
- Key decision: Bird flies behind text naturally (z-0 canvas, z-10 content), only rises for button hover

## What Changed — V1.0

**Session 1 (March 28, 2026)**
- Built entire LP from scratch using Builder_LP_5 as structural reference
- 6 phases, 19 Claude Code prompts executed
- Established "Dark Luxe Tech" initial design (cyan/violet) — replaced with NestCalc green/gold in V1.1
- Key decision: 2D Canvas particles over Three.js for better mouse interaction
- Key decision: Forest green palette from NestCalc DNA instead of generic dark tech look
- Color schema finalized and approved:
  - 3 green background tones: deep (#0f2920), forest (#1a3a2a), medium (#2d5a42)
  - Text hierarchy: gold (#F59E0B) → white → wheat (#FEF3C7) → muted (#D4C9A8)
  - Accent: teal (#0d9488) for links, gold for CTAs
