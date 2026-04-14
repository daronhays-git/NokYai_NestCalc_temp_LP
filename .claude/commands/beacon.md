# /beacon — Feedback Triage & Categorization

Read feedback-log.md and categorize every entry that has
Category "uncategorized" or Severity "unscored".

---

## Steps

1. Read feedback-log.md from the project root.

2. For each entry with Category "uncategorized", assign one of:
   - bug — something is broken or behaves incorrectly
   - feature-request — user wants new functionality
   - ux-friction — it works but is confusing or hard to use
   - churn-risk — user expresses frustration or intent to leave
   - design-drift — visual inconsistency against design-tokens.md

3. For each entry with Severity "unscored", assign one of:
   - critical — blocks core functionality or loses data
   - major — significant but has a workaround
   - minor — cosmetic or low-impact
   - suggestion — nice-to-have, no current impact

4. Group duplicate or closely related entries and note
   the grouping in a Duplicates section at the bottom.

5. Update each entry in feedback-log.md in place —
   change only the Category and Severity fields.
   Do not alter any other fields.

6. After updating, produce a summary report:
   - Count by category (bug: N, ux-friction: N, etc.)
   - Count by severity (critical: N, major: N, etc.)
   - Top 3 priority items (highest severity first)
   - Any duplicate clusters found

7. Save the summary to beacon-triage.md in the project root.
   If beacon-triage.md already exists, overwrite it.

---

## Output Format
Use tables for the counts. List priority items with their
title and one-line rationale for the ranking.
