# NokYai.com LP — Roadmap

**Last Updated:** March 28, 2026  
**Current Status:** V1.0 complete — structure built, pending re-skin  

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

---

## Next Session (V1.1)

**Priority:** Green/gold re-skin + deploy

1. R-1: Update Tailwind config + globals.css with green/gold palette
2. R-2: Update layout + UI components (Navbar, Footer, Cursor, Cards, Buttons)
3. R-3: Update all section backgrounds + text colors
4. 6-C: Responsive polish pass (all breakpoints)
5. 6-D: Netlify deploy configuration

---

## Backlog (Post V1.1)

### Content
- [ ] Replace placeholder testimonials with real quotes
- [ ] Replace gradient placeholder images with real project screenshots
- [ ] Replace tech logo placeholders with actual SVG logos
- [ ] Write final copy for all sections
- [ ] Add NokYai animated bird logo (need clean video file)

### Functionality
- [ ] Connect contact form to Netlify Forms or Formspree
- [ ] Add form validation with error states
- [ ] Add success/error toast notifications

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

## What Changed — V1.0

**Session 1 (March 28, 2026)**
- Built entire LP from scratch using Builder_LP_5 as structural reference
- 6 phases, 19 Claude Code prompts executed
- Established "Dark Luxe Tech" initial design (cyan/violet) — to be replaced with NestCalc green/gold in V1.1
- Key decision: 2D Canvas particles over Three.js for better mouse interaction
- Key decision: Forest green palette from NestCalc DNA instead of generic dark tech look
- Color schema finalized and approved:
  - 3 green background tones: deep (#0f2920), forest (#1a3a2a), medium (#2d5a42)
  - Text hierarchy: gold (#F59E0B) → white → wheat (#FEF3C7) → muted (#D4C9A8)
  - Accent: teal (#0d9488) for links, gold for CTAs
