# NokYai LP — Lessons Log

Tracks false positives, missed issues, and design decisions to improve Eagle, Shield, and Lighthouse accuracy for this project.

## How This Works
1. When an agent flags something that isn't a real problem → log it as a False Positive
2. When a real issue reaches production an agent should have caught → log it as a Missed Issue
3. For each entry, document what config change was made to prevent recurrence
4. After logging, update the relevant config file (eagle.md, shield.md, lighthouse.md, REVIEW.md)

---

## False Positives

### FP-001: GradientMesh raw hex values
- **Date:** 2026-04-14
- **Agent:** Eagle
- **What was flagged:** Raw hex color strings `#F59E0B`, `#0d9488`, `#0f2920` in `src/components/effects/GradientMesh.tsx:26`
- **Why it was wrong:** These are required for the Three.js/WebGL prop — Tailwind class names cannot be passed as color array values to R3F components. All three values are canonical nok-* tokens: `#F59E0B` = nok-gold, `#0d9488` = nok-teal, `#0f2920` = nok-deep. All are traceable to `design-tokens.md`.
- **Rule:** Do not flag raw hex in Three.js/R3F color props when all values appear in `design-tokens.md` Color Palette.

### FP-002: Footer hard-coded color exceptions
- **Date:** 2026-04-14
- **Agent:** Eagle
- **What was flagged:** `#6DC99E` (Nest text in logo) and `#fcd34d` (.ai text in logo) in `src/components/layout/Footer.tsx`
- **Why it was wrong:** These are documented design exceptions in `design-tokens.md` — Nest uses a distinct green tint, .ai uses a distinct gold tint for the split-color wordmark. Intentional deviation from the nok-* token palette for brand identity.
- **Rule:** Do not flag `#6DC99E` or `#fcd34d` in Footer.tsx — they are documented brand exceptions.

### FP-003: tailwind.config.ts Syne font declaration
- **Date:** 2026-04-14
- **Agent:** Shield / Lighthouse
- **What was flagged:** `tailwind.config.ts` declares `fontFamily.display: ['Syne']`
- **Why it was wrong:** In Tailwind v4, `tailwind.config.ts` is not authoritative — `src/styles/globals.css` `@theme` block is. The config.ts declaration is inactive; `globals.css` correctly sets `--font-display: 'Space Grotesk'`. Not a real conflict.
- **Rule:** Do not flag `tailwind.config.ts` font declarations as design drift — `globals.css @theme` is the authoritative source for Tailwind v4.

---

## Missed Issues

_None recorded yet._

---

## Known Gaps (Not Agent Errors — Tracked in CLAUDE.md)

These are real gaps but pre-existing decisions, not agent false positives or misses:

1. **Stale `<title>` tag** — `index.html` reads "AI-Powered Real Estate Investment Tools"; should reflect AI dev studio positioning. Lighthouse will correctly flag this as a ⚠️ Warning.
2. **`src/lib/constants.ts` empty** — contains only a TODO comment; no real constants yet. Shield will correctly note this.
3. **No Organization JSON-LD** — zero structured data in `index.html`. Lighthouse will correctly flag as 🔴 Critical.
4. **No contact email in footer** — only anchor link to `#contactus`; no `mailto:`. EEAT trust signal gap.
5. **Legal pages are modals** — Privacy Policy, Terms, Disclaimer rendered as React modals (not standalone HTML). Crawlers cannot index them; EEAT trust concern. Lighthouse will correctly flag as ⚠️.

---

## Pattern Updates

_None recorded yet._
