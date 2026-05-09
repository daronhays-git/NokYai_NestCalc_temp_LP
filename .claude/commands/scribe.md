# /scribe — Documentation Staleness Review

Read-only review agent. Do not modify any files.

## Purpose

Scribe cross-references the documentation files against the actual codebase to find stale, wrong, or missing documentation. It never edits — it reports what needs to be updated and what the correct value should be.

---

## Files to Read Before Running

1. `package.json` — authoritative versions for all dependencies
2. `index.html` — authoritative font loading, meta tags
3. `src/styles/globals.css` — authoritative design token values
4. `tailwind.config.ts` — font and color declarations
5. `src/App.tsx` — authoritative section inventory and load pattern
6. `src/components/` — all `.tsx` files, for component existence and exports
7. `src/hooks/` — all `.ts` files
8. `src/lib/` — all `.ts` files

Then read the documentation files:
- `README.md`
- `CLAUDE.md`
- `REVIEW.md`
- `design-tokens.md`
- `lessons.md`
- All `NokYai-V*.md` handoff files in the project root

---

## Review Steps

### Step 1 — README.md vs package.json (Tech Stack Versions)

Read `README.md` §Tech Stack and `package.json` `dependencies` + `devDependencies`.

For each technology listed in README.md, look up its actual installed version in package.json:

| README entry | package.json key | Check |
|-------------|-----------------|-------|
| React version | `react` | match? |
| Vite version | `vite` | match? |
| TypeScript version | `typescript` | match? |
| Tailwind CSS version | `tailwindcss` | match? |
| Framer Motion | `framer-motion` | present? |
| GSAP + ScrollTrigger | `gsap` | present? |
| Three.js / React Three | `three`, `@react-three/fiber` | present? |
| Netlify Forms | (no npm dep) | service only |

Flag 🔴 **Wrong** if a version number in README.md contradicts the actual installed version.
Flag 🟡 **Stale** if a library listed in README.md is no longer in package.json.
Flag 🟡 **Stale** if a library present in package.json is completely absent from the README tech stack section.

### Step 2 — README.md vs Actual File Structure

Read `README.md` §File Structure and the actual directory tree under `src/`.

Check for each item mentioned in the README file structure tree:
- Does the file or directory actually exist?
- Is it in the location described?

**Known deletions from PORT-C2 cleanup** — flag 🔴 Wrong if any of these still appear in README.md:
- `src/components/sections/CaseStudies.tsx`
- `src/components/sections/CTABand.tsx`
- `src/components/sections/LogoBar.tsx`
- `src/components/sections/Process.tsx`
- `src/App.css`
- `src/index.css`
- `src/lib/constants.ts`
- `src/assets/react.svg`
- `src/assets/vite.svg`

Also check whether the file structure tree in README.md reflects the current layout:
- `src/components/effects/` directory
- `src/components/legal/` directory
- `src/hooks/` with correct file names
- `src/lib/` with only `animations.ts` and `birdPaths.ts`

Flag 🔴 **Wrong** for files listed that do not exist.
Flag 🟡 **Stale** for real files that are not listed (missing from the tree).

### Step 3 — README.md Version Number

Read `README.md` §Version and `package.json` `version`.

- Check that the version in the README header matches `package.json`
- Check that it matches the version string in `src/components/layout/Footer.tsx` (displayed as `v1.X`)

Flag 🔴 **Wrong** if any of the three disagree.

### Step 4 — CLAUDE.md Component Inventory vs Actual Files

Read `CLAUDE.md` §File Structure and compare the component list against actual files in `src/components/`.

For each component mentioned in CLAUDE.md:
- Does the file actually exist at the stated path?

**Known deletions from PORT-C2 cleanup** — flag 🔴 Wrong if any of these still appear in CLAUDE.md:
- `src/components/sections/CaseStudies.tsx`
- `src/components/sections/CTABand.tsx`
- `src/components/sections/LogoBar.tsx`
- `src/components/sections/Process.tsx`
- `src/lib/constants.ts`

Also check `CLAUDE.md` §Dev Commands:
- Do the listed npm scripts still exist in `package.json`?
- Is the dev server port still accurate?

Flag 🔴 **Wrong** for files listed that do not exist.
Flag 🟡 **Stale** for files that exist but are not documented.

### Step 5 — CLAUDE.md Known Issues vs Current State

Read `CLAUDE.md` §Known Issues. For each listed issue:
- Check whether the issue has been resolved in the codebase
- If resolved, flag it as 🟡 **Stale** — it should be removed or updated

Check these specific known issues:
- "index.html `<title>` reads 'AI-Powered Real Estate Investment Tools'" — read `index.html` and check if the title has been updated
- "Legal content references the old NestCalc real estate product" — scan `src/components/legal/` for Supabase, Stripe, property analysis references to confirm the issue still exists

Flag 🟡 **Stale** for resolved issues that are still listed.
Flag 🟢 **Current** for active known issues that are accurately described.

### Step 6 — design-tokens.md vs globals.css @theme

Read `design-tokens.md` §Color Palette and `src/styles/globals.css` `@theme` block.

For each color token in `design-tokens.md`, verify the hex value matches exactly what is in `globals.css`:
- `nok-deep`, `nok-forest`, `nok-medium`, `nok-surface`
- `nok-white`, `nok-gold`, `nok-heading`, `nok-body`, `nok-caption`
- `nok-teal`, `nok-amber`, `nok-red`
- `nok-border`, `nok-border-light`

Read `design-tokens.md` §Animation Keyframes. For each keyframe:
- Confirm the keyframe name exists in `globals.css`
- Confirm the CSS properties match
- Confirm the default duration/easing listed in `design-tokens.md` matches the `--animate-*` value in `globals.css` `@theme` or the actual usage in component files

Flag 🔴 **Wrong** for any value mismatch.
Flag 🟡 **Stale** for a token present in `globals.css` but not documented in `design-tokens.md`.

### Step 7 — design-tokens.md vs Font Loading

Read `design-tokens.md` §Typography and cross-reference against:
- `index.html` Google Fonts `<link>` tags — which families and weights are actually loaded
- `src/styles/globals.css` `--font-display` and `--font-body` values
- `tailwind.config.ts` `fontFamily.display` and `fontFamily.body`

Verify that all three sources agree on:
- Display font: Space Grotesk, weights 600 and 700
- Body font: Outfit, weights 300, 400, 500, and 600

Flag 🔴 **Wrong** if `design-tokens.md` names a font that is not actually loaded in `index.html`.
Flag 🟡 **Stale** if `design-tokens.md` does not mention a font that is loaded.

### Step 8 — design-tokens.md Component Patterns vs Actual Code

Read `design-tokens.md` §Component Patterns. For each pattern documented:

**GlowCard** — read `src/components/ui/GlowCard.tsx`:
- Verify the 3-layer structure description matches the actual JSX
- Verify the tilt angle (±12°) and perspective (1000px) values
- Verify `glowColor` default value
- Verify content layer padding (`p-7`)

**MagneticButton** — read `src/components/ui/MagneticButton.tsx`:
- Verify magnetic radius (100px), strength multiplier (0.3)
- Verify return transition easing value
- Verify base classes (`px-8 py-4 rounded-xl`)

**SectionHeading** — read `src/components/ui/SectionHeading.tsx`:
- Verify accent bar dimensions (w-16, h-1)
- Verify default `accentColor`
- Verify wrapper margin (`mb-16`)

Flag 🔴 **Wrong** for any value in `design-tokens.md` that contradicts the actual implementation.
Flag 🟡 **Stale** for a structural change in a component that is not reflected in the pattern documentation.

### Step 9 — Handoff Files: Deleted File References

Read all `NokYai-V*.md` handoff files in the project root.

Scan each for references to the files deleted in PORT-C2:
- `CaseStudies`, `CTABand`, `LogoBar`, `Process` (section components)
- `App.css`, `index.css` (Vite boilerplate)
- `constants.ts`
- `react.svg`, `vite.svg`
- `Syne` (font name, replaced with Space Grotesk in PORT-C1)

Handoff files are **historical snapshots** — they were accurate at the time of writing. Do not flag them as 🔴 Wrong. Report them as 🟡 **Stale** only as a heads-up that they describe an older state, not as errors requiring action.

### Step 10 — Version Consistency Across Docs

Read the version string in each documentation file that contains one:
- `README.md` — header line
- `CLAUDE.md` — §Project Identity
- `src/components/layout/Footer.tsx` — bottom bar copyright/version string
- `package.json` — `"version"` field

Collect all version strings found. Flag 🔴 **Wrong** if any two disagree. Report the correct value as whatever `package.json` says.

### Step 11 — lessons.md Accuracy Check

Read `lessons.md`. For each false positive entry (FP-XXX):
- Check whether the underlying issue still exists in the codebase
- If the root cause has been fixed (like the Syne font fix in PORT-C1), confirm the FP entry has been removed or updated

Check for the FP-003 Syne entry — it was removed in PORT-C1. If it's back, flag 🟡 **Stale**.

For each "Known Gaps" item listed at the bottom of `lessons.md`:
- Verify whether the gap still exists in the codebase
- If resolved, flag 🟡 **Stale** — entry should be removed

---

## Output Format

```
## Scribe Review — [date]

### Summary
[2–3 sentences: total doc files reviewed, number with issues,
most critical finding, and whether any docs are actively misleading.]

---

### Findings

#### README.md
🔴 Wrong — §Tech Stack: React listed as 18, actually 19.2.4 (package.json)
🟡 Stale  — §File Structure: lists constants.ts which was deleted in PORT-C2
🟢 Current — font reference (Space Grotesk) matches index.html

#### CLAUDE.md
🔴 Wrong  — ...
🟡 Stale  — ...
🟢 Current — ...

#### REVIEW.md
[findings or: 🟢 Current — all reviewed rules match actual patterns]

#### design-tokens.md
[findings or: 🟢 Current]

#### lessons.md
[findings or: 🟢 Current]

#### Handoff Files (NokYai-V*.md)
🟡 Stale — NokYai-V1.1-Handoff.md: references CaseStudies.tsx, CTABand.tsx (deleted PORT-C2); references Syne font (corrected PORT-C1) — historical snapshots, no action required

---

### Priority Update List

Ordered by severity — 🔴 items first, then 🟡, then 🟢 (informational only).

| # | Severity | File | Section | Issue | Correct value |
|---|----------|------|---------|-------|---------------|
| 1 | 🔴 Wrong | README.md | §Tech Stack | React listed as 18 | React 19.2.4 |
| 2 | 🔴 Wrong | ... | ... | ... | ... |
| 3 | 🟡 Stale | ... | ... | ... | ... |

No 🟢 Current items need to appear in this table.
```

**Severity key:**
- 🔴 **Wrong** — factually incorrect; actively misleading; fix before next review
- 🟡 **Stale** — was accurate at time of writing but no longer reflects current state; update when convenient
- 🟢 **Current** — accurate as of this review

**Scope note:** Handoff files (`NokYai-V*.md`) are historical version snapshots. Report them as 🟡 Stale for awareness only — they are not maintained documents and do not require correction.
