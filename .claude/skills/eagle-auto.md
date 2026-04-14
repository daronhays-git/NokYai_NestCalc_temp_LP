---
name: Eagle Auto-Review
description: Automatically triggers design token and accessibility review when UI component files are modified
globs:
  - "src/components/**/*.tsx"
  - "src/components/**/*.jsx"
  - "src/components/**/*.css"
---

# Eagle Auto-Review Skill

When any UI component file matching the globs above is modified, automatically run the Eagle design review process.

## Behavior
1. Read `design-tokens.md` for the canonical design system
2. Read `REVIEW.md` §1 (Design Token Compliance), §2 (Accessibility Requirements)
3. Read `lessons.md` for known false positive patterns to skip (see FP-001, FP-002 for documented hex exceptions)
4. Review ONLY the modified files (not the full codebase)
5. Output findings in the standard Eagle format (Verdict + Findings table + check-by-check summary)

## When NOT to auto-activate
- If the user is explicitly running /eagle (avoid duplicate runs)
- If changes are limited to comments, imports, or non-visual logic (e.g. a hook's internal state logic)
- If the file is a test file

## Severity guide
- **error**: Raw hex color not in design-tokens.md, missing alt text on images, missing aria-label on interactive elements
- **warn**: Spacing value not in the documented system, border-radius inconsistency, fixed px font sizes
- **info**: Minor deviations that may be intentional (e.g. one-off animation timing)
