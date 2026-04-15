# NokYai.com LP — Roadmap

**Last Updated:** April 15, 2026  
**Current Status:** V1.3.1 complete — agent stack ported, CI active (commit 57790c2)

---

## Completed Phases

| Phase | Version | What Was Done |
|-------|---------|--------------|
| Phase 1-6: Full LP Build | V1.0 | Project scaffold, all 12 sections, effects, animations, performance |
| Green/Gold Re-skin | V1.1 | NestCalc DNA palette applied, Guardian Bird feature added |
| Contact Form & Polish | V1.2 | Netlify Forms working, email link with clipboard copy, trust badges, git remote fix |
| Responsive & SEO | V1.3.0 | Full responsive pass, SEO meta tags, favicon, OG image, robots/sitemap, padding tightening |
| Agent Stack Porting | V1.3.1 | Font config fix, dead code removal, Foundation configs, 4 agent commands, 5 GitHub Actions, baseline snapshot |

---

## Next Session (V1.4.0)

**Priority:** Fix agent-flagged issues, replace placeholder content, add analytics

1. Fix 5 quick-win agent findings (Contact catch, Footer import/color, LegalModal h1, Services nok-amber)
2. Fix stale title tags in index.html
3. Add Organization JSON-LD schema
4. Add Google Analytics 4 tracking
5. Lighthouse performance audit

---

## Backlog (Post V1.4.0)

### Content
- [ ] Replace placeholder testimonials with real quotes
- [ ] Write final copy for all sections
- [ ] Add NokYai animated bird logo video (need clean file with matching bg)
- [ ] Replace "Coming Soon" service cards with specific content
- [ ] Add founder/author bio for EEAT

### Legal
- [ ] Rewrite legal documents for AI services (currently references old RE product)

### SEO & Marketing
- [ ] Performance audit (Lighthouse 90+)
- [ ] Social sharing preview image (verify OG renders correctly)
- [ ] Add email link to Footer
- [ ] Add operating entity statement to Footer
- [ ] Create standalone routes for legal pages (/privacy, /terms, /disclaimer)

### Future Enhancements
- [ ] Blog/content section
- [ ] Case study detail pages
- [ ] Client portal link
- [ ] Pricing section (if applicable)
- [ ] FAQ schema when content expands

---

## What Changed — V1.3.1

**Session (April 15, 2026)**
- PORT-C1: Fixed font discrepancy — tailwind.config.ts Syne → Space Grotesk to match globals.css/index.html
- PORT-C2: Removed 9 dead files (CaseStudies, CTABand, LogoBar, Process sections; App.css, index.css; constants.ts; react.svg, vite.svg)
- PORT-2: Generated CLAUDE.md, REVIEW.md, design-tokens.md from Foundation retroactive audit
- PORT-3: Created Shield (9 steps), Eagle (11 steps), Lighthouse (16 steps), Scribe (11 steps) command files
- PORT-4/5: Created GitHub Actions for Shield, Eagle, Lighthouse, Scribe, Review-All
- PORT-6: Tested all 4 agents — found 11 unique issues across codebase
- PORT-7: Baseline snapshot captured at docs/reports/agent-baseline-2026-04-15.md
- PORT-8: README fixed (React 19, Tailwind 4, removed dead file refs), CHANGELOG.md + doc-inventory.md created
- Fixed CI triggers: claude-code-action@v1 requires pull_request, not push
- Added CLAUDE_CODE_OAUTH_TOKEN to GitHub repo secrets
- All 5 CI workflows verified green

---

## What Changed — V1.3.0

**Session (April 11, 2026)**
- Full responsive pass at 375px, 768px, 1024px, 1440px — 9 files changed
- Hero headline scales with clamp(3rem, 8vw, 6rem)
- Services cards 2-col at 768px (md breakpoint)
- WhyNokYai cards progressive 1→2→3 grid
- Testimonials progressive padding
- Contact gap tightened, info bar wraps on mobile
- CTABand heading uses clamp() scaling
- Footer + Navbar touch targets 44px minimum
- Guardian Bird hidden on mobile/touch devices
- SEO meta tags: title, description, OG, Twitter cards, canonical URL
- Green eagle favicon (SVG + PNG), apple-touch-icon, OG image (1200x630)
- robots.txt + sitemap.xml created and build-verified
- Removed Bangkok location trust badge from Contact
- Footer mobile: 2x2 grid, reduced padding, compact layout
- All content sections padding: py-24 → py-12 sm:py-16 lg:py-32
- Process mobile steps gap: gap-12 → gap-8 lg:gap-12

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
