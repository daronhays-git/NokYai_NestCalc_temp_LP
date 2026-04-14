# Template — customize for your project. See SETUP.md for placeholder reference.

# /eagle — Design & UI/UX Review

## Purpose
Reviews UI component files for design token compliance, accessibility, and responsive consistency. Eagle is the design equivalent of Shield — it catches visual drift, missing accessibility attributes, and inconsistent patterns before they reach production.

## Files to Read Before Reviewing
1. `design-tokens.md` — the canonical design system (colors, typography, spacing, components, modals, animations)
2. `REVIEW.md` — Design Token Compliance and Accessibility Requirements sections (per REVIEW.md conventions)
3. `CLAUDE-AGENTS.md` — Design Reviewer agent role if defined
4. `lessons.md` — known false positive patterns to skip

## What to Review
Scope: Only files in `[PROJECT_SRC]/components/` and `[PROJECT_SRC]/pages/` that were changed in the target commit range.

### Design Token Compliance
- Colors: all color values must trace back to the token palette defined in `design-tokens.md`. Flag any raw hex value not found there.
- Typography: font-family, font-size, font-weight, line-height must match the documented type scale. Flag values outside the scale (except documented exceptions).
- Spacing: padding, margin, gap values should use the documented spacing system. Flag one-off magic numbers.
- Border radius: must match documented component patterns. Flag inconsistent radii on the same component type.
- Shadows: must match documented boxShadow patterns in `design-tokens.md`. Flag custom shadows not in the design system.
- Animations: transition durations and easing must match the animations table in `design-tokens.md`.

### Accessibility
- Images: every `<img>` must have a meaningful `alt` attribute (not empty, not "image").
- Interactive elements: buttons, links, inputs must have accessible names (visible text, `aria-label`, or `aria-labelledby`).
- Keyboard navigation: interactive elements must be focusable. Check for `tabIndex` usage and `onKeyDown` handlers on custom interactive elements.
- Color contrast: flag any text color + background color pairing likely below WCAG AA 4.5:1 ratio (use documented color values to estimate).
- Form inputs: must have associated `<label>` elements or `aria-label`.

### Responsive Patterns
- Breakpoint usage should be consistent (check for one-off media query values not in design-tokens.md).
- Layout components should use the documented maxWidth and padding values.
- Font sizes should not use fixed px for body text (rem preferred).

## Output Format
Use the same format as Shield:
- Verdict: **PASS** / **NEEDS ATTENTION** / **FAIL**
- Findings table: File | Line | Severity (info/warn/error) | Category | Finding | Recommendation
- Check-by-check results summary

## How to Run
Default: review changes in the last commit (HEAD)
```
/eagle
```
With argument: `/eagle HEAD~5` reviews the last 5 commits.

Only review `.jsx`, `.tsx`, `.css`, and `.js` files in the UI directories (`[PROJECT_SRC]/components/` and `[PROJECT_SRC]/pages/`).

**Rules while running:**
1. Read `design-tokens.md` first, every run — the design system is the source of truth.
2. Only flag findings tied to a specific token or rule in `design-tokens.md` or `REVIEW.md`. Generic style opinions are not Eagle findings.
3. Cite `file:line` for every row.
4. Do not modify code. Eagle is review-only.
5. If the changeset is empty or only touches non-UI files, return `PASS — no UI changes in scope` without a findings table.
