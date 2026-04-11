# NokYai.com LP — Roadmap

**Last Updated:** April 11, 2026  
**Current Status:** V1.2 complete — deployed, contact form working

---

## Completed Phases

| Phase | Version | What Was Done |
|-------|---------|--------------|
| Phase 1-6: Full LP Build | V1.0 | Project scaffold, all 12 sections, effects, animations, performance |
| Green/Gold Re-skin | V1.1 | NestCalc DNA palette applied, Guardian Bird feature added |
| Contact Form & Polish | V1.2 | Netlify Forms working, email link with clipboard copy, trust badges, git remote fix |

---

## Next Session (V1.3)

**Priority:** Responsive polish + SEO

1. Responsive design pass (375px, 768px, 1024px, 1440px)
2. SEO meta tags (title, description, OG tags, Twitter cards)
3. robots.txt and sitemap.xml
4. Favicon and apple-touch-icon

---

## Backlog (Post V1.3)

### Content
- [ ] Replace placeholder testimonials with real quotes
- [ ] Replace gradient placeholder images with real project screenshots
- [ ] Replace tech logo placeholders with actual SVG logos
- [ ] Write final copy for all sections
- [ ] Add NokYai animated bird logo video (need clean file with matching bg)

### SEO & Marketing
- [ ] Google Analytics or Plausible tracking
- [ ] Performance audit (Lighthouse 90+)
- [ ] Social sharing preview image

### Future Enhancements
- [ ] Blog/content section
- [ ] Case study detail pages
- [ ] Client portal link
- [ ] Pricing section (if applicable)

---

## What Changed — V1.2

**Session (April 11, 2026)**
- Debugged contact form spam issue — root cause was test emails looking like spam to Akismet
- Removed honeypot field (was contributing to spam flagging)
- Added AJAX submission headers (X-Requested-With, Referer, absolute URL)
- Made email link bulletproof: mailto + clipboard copy + gold toast notification
- Replaced decorative code snippet with trust badges (Secure, 24hr response, Bangkok location)
- Fixed git remote confusion — consolidated to single origin → NokYai_NestCalc_temp_LP
- Updated sc-code and si-code skills to be project-agnostic

---

## What Changed — V1.1

**Session (March 28, 2026)**
- Complete green/gold re-skin from NestCalc DNA palette
- Guardian Bird feature: geometric eagle with flight physics, cursor following, button interaction
- All 12 sections color-updated with three-tone green backgrounds
- Text hierarchy: gold (#F59E0B) → white → wheat (#FEF3C7) → muted (#D4C9A8)

---

## What Changed — V1.0

**Session (March 28, 2026)**
- Built entire LP from scratch using Builder_LP_5 as structural reference
- 6 phases, 19 Claude Code prompts executed
- Key decision: 2D Canvas particles over Three.js for better mouse interaction
- Key decision: Forest green palette from NestCalc DNA instead of generic dark tech look
- Color schema finalized and approved
