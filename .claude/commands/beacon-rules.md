# Template — customize for your project. See SETUP.md for placeholder reference.

# /beacon-rules — Feedback-to-Rules Pipeline

## Purpose
Analyze accumulated user feedback to surface recurring patterns, then draft automated review rules that prevent those issues from reappearing. The pipeline closes the feedback loop: user complaints → pattern detection → agent-enforced prevention via Shield, Eagle, Scribe, or Lighthouse.

**Two-phase command:**
1. **Analysis phase** — reads feedback, identifies patterns, drafts proposed rules, presents a full report for review. Read-only.
2. **Write phase** — after explicit builder confirmation, appends approved rules to `REVIEW.md` under a `## Beacon-Generated Rules` section. This is the only write action.

---

## Files to Read Before Running

1. `feedback-log.md` — primary input; all user feedback entries with category, severity, and description
2. `beacon-triage.md` — most recent triage output from `/beacon`; provides pre-scored and pre-categorized entries
3. `beacon-digest-*.md` — most recent digest file if available; useful for additional pattern context and prior theme summaries
4. `REVIEW.md` — existing review rules; used to avoid generating duplicates
5. `module-map.md` — code structure map; needed to write specific, file-path-accurate Shield rules
6. `design-tokens.md` — canonical design values; needed to write specific, token-accurate Eagle rules

---

## What Beacon-Rules Does

### Step 1 — Load and Validate Feedback

Read `feedback-log.md`. If it does not exist or is empty, output:
```
❌ feedback-log.md not found or empty.
Run /beacon first to generate categorized feedback data.
```
Stop.

Also read `beacon-triage.md` if present. Use its scored entries to supplement the raw log — pre-categorized data takes precedence over raw entries if the same entry appears in both.

Count total entries loaded and note the date range (earliest to most recent entry).

---

### Step 2 — Group by Category

Assign each feedback entry to exactly one category. Use the categories established by `/beacon`:

| Category | Description |
|----------|-------------|
| `bug` | Something is broken or behaves incorrectly |
| `feature-request` | User wants new functionality |
| `ux-friction` | Works but is confusing or hard to use |
| `churn-risk` | User expresses frustration or intent to leave |
| `design-drift` | Visual inconsistency against design-tokens.md |

If an entry is uncategorized, infer the category from the description. Document any inferred categories.

Count entries per category.

---

### Step 3 — Identify Patterns

A **pattern** is any issue that meets one of these criteria:

1. **Frequency threshold** — the same root cause appears in 2 or more separate feedback entries (different users or different sessions)
2. **Systemic indicator** — a single entry that suggests a structural problem rather than a one-off incident (e.g., "every time I use feature X it crashes", "the calculation seems wrong in multiple scenarios", "your privacy policy link is broken")

For each candidate pattern:
- Group the source feedback entry IDs that support it
- Name the pattern concisely (e.g., "Missing error feedback on failed payment", "Raw hex values in modal components")
- Identify the root cause: code path, component, or process gap
- Count supporting entries

Do not promote single isolated complaints to patterns unless they clearly indicate a systemic issue.

---

### Step 4 — Map Each Pattern to an Agent

For each identified pattern, determine which agent can enforce a rule to prevent recurrence. Apply this routing table:

| Pattern type | Agent | Reasoning |
|-------------|-------|-----------|
| Code logic error, missing try/catch, state bug, architectural violation | **Shield** | Code-level check on changed files |
| Design token violation, missing alt text, inaccessible element, visual inconsistency | **Eagle** | UI component review |
| Documentation out of date, missing coverage for a changed area | **Scribe** | Doc-to-code cross-reference |
| Slow load, poor SEO metadata, missing structured data, low Core Web Vitals | **Lighthouse** | Performance and SEO source-level check |
| None of the above | **Manual** | Cannot be expressed as an automated code check |

A pattern that spans multiple concerns should be split into separate rules, one per agent.

**Cannot be automated** — classify as Manual if the pattern involves:
- Business or product decisions (pricing complaints, missing feature requests)
- Inherently subjective UX opinions with no measurable code equivalent
- One-time bugs that have already been fixed with no recurrence risk
- Infrastructure or third-party service failures outside the codebase

---

### Step 5 — Draft Proposed Rules

For each pattern routed to an agent (not Manual), draft a review rule. Use the format established in `REVIEW.md`.

Each rule must include:
- **ID** — assigned sequentially as `B-01`, `B-02`, etc. (prefix `B-` distinguishes Beacon-generated rules from manually authored ones)
- **Agent** — Shield / Eagle / Scribe / Lighthouse
- **Check** — a specific, actionable description of what to look for in code or content. Cite file paths from `module-map.md` and token names from `design-tokens.md` where applicable. Vague checks like "check colors" or "handle errors" are not acceptable.
- **Source entries** — the feedback-log IDs that triggered this rule (e.g., `#12, #17, #23`)
- **Rationale** — one sentence explaining why this rule prevents the feedback pattern from recurring

**Rule specificity standard:** A good Beacon rule is specific enough that another developer could implement it from the description alone, without reading the source feedback.

Example of an acceptable rule:
> `B-04 | Eagle | Flag any color value in [PROJECT_SRC]/components/** that is a raw hex not present in design-tokens.md §Color Palette. Source: #8, #15. Rationale: Two users reported inconsistent button colors in the upgrade modal — tracing to a hard-coded value bypassing the token system.`

Example of an unacceptable rule:
> `B-04 | Eagle | Check that colors are consistent.`

---

### Step 6 — Check Against Existing REVIEW.md Rules

Read `REVIEW.md`. For each proposed rule, check whether an existing rule already covers the same scenario:

- **Duplicate** — an existing rule covers the exact same code pattern and agent. Drop the proposed rule; note it in the "Already Covered" output section.
- **Overlap** — an existing rule is adjacent but does not fully cover the new pattern. Keep the proposed rule but note the overlap and which existing rule it extends.
- **Novel** — no existing rule covers this pattern. Mark for proposal.

---

### Step 7 — Present the Full Report

Print the complete analysis report (format below). At the end of the report, ask for confirmation before writing anything:

```
────────────────────────────────────────────────────────
Proposed rules: N
Already covered: N
Manual-only patterns: N

Which rules should be added to REVIEW.md?
Enter rule IDs (e.g. B-01,B-03), "all" to approve all, or "none" to skip.
────────────────────────────────────────────────────────
```

Wait for the builder's response before proceeding to Step 8.

---

### Step 8 — Append Approved Rules to REVIEW.md

**Only execute this step after explicit confirmation from Step 7.**

For each approved rule ID:
1. Read the current contents of `REVIEW.md`
2. Locate the `## Beacon-Generated Rules` section. If it does not exist, create it at the end of the file.
3. Append the rule in the format used by `REVIEW.md`'s other sections. Do not reformat existing content.
4. Write the updated `REVIEW.md`

After writing, confirm which rules were added:
```
✓ Added to REVIEW.md: B-01, B-03, B-05
  Section: ## Beacon-Generated Rules
  Next step: commit with "beacon: add rules from feedback patterns"
```

Do not commit automatically — leave the commit to the builder.

---

## Output Format

```markdown
# [PROJECT_NAME] — Beacon Rules Analysis
_Generated: [YYYY-MM-DD] · Feedback entries analyzed: N · Date range: [start] – [end]_

---

## Feedback Volume by Category

| Category | Entries | % of Total |
|----------|---------|------------|
| bug | N | N% |
| ux-friction | N | N% |
| design-drift | N | N% |
| churn-risk | N | N% |
| feature-request | N | N% |
| **Total** | **N** | **100%** |

---

## Identified Patterns

| # | Pattern | Category | Supporting Entries | Agent |
|---|---------|----------|--------------------|-------|
| 1 | [Pattern name] | bug | #12, #17 | Shield |
| 2 | [Pattern name] | design-drift | #8, #15 | Eagle |
| 3 | [Pattern name] | ux-friction | #3, #9, #21 | Manual |

---

## Proposed New Rules

### B-01 — [Pattern name]
- **Agent:** Shield / Eagle / Scribe / Lighthouse
- **Check:** [Specific, file-path-accurate description of what to look for]
- **Source entries:** #N, #N
- **Rationale:** [One sentence — why this rule prevents the pattern from recurring]

### B-02 — [Pattern name]
- **Agent:** Eagle
- **Check:** [Specific check]
- **Source entries:** #N, #N
- **Rationale:** [One sentence]

_[Repeat for each proposed rule]_

---

## Already Covered by Existing REVIEW.md Rules

| Pattern | Covered by | Existing rule excerpt |
|---------|------------|----------------------|
| [Pattern name] | REVIEW.md §[Section] | "[Relevant rule text]" |

_If none: "All identified patterns are novel — no duplicates with existing rules."_

---

## Patterns Requiring Manual Fixes (No Automation Possible)

| Pattern | Category | Why automation is not possible | Recommended action |
|---------|----------|--------------------------------|-------------------|
| [Pattern name] | feature-request | Feature gap — no code pattern to enforce | Add to product backlog |
| [Pattern name] | churn-risk | Subjective pricing concern — no rule expression | Review with product context |

_If none: "All identified patterns can be expressed as automated rules."_

---

_Proposed: N rules · Awaiting confirmation before writing to REVIEW.md_
```

---

## How to Run

**Default — analyze all feedback and propose rules:**
```
/beacon-rules
```

**Rules while running:**
1. The analysis phase (Steps 1–7) is read-only. Do not modify `REVIEW.md`, `feedback-log.md`, or any other file during analysis.
2. Only write to `REVIEW.md` after explicit builder confirmation in Step 7. Never auto-append rules.
3. Each proposed rule must meet the specificity standard in Step 5. Rewrite any rule that is too vague before presenting it — "check colors" is not a rule.
4. The frequency threshold for a pattern is 2 or more separate entries. Do not lower this threshold unless the single entry clearly indicates a systemic structural problem.
5. Rule IDs use the `B-` prefix and increment from the highest existing Beacon rule already in `REVIEW.md`. If `REVIEW.md` already has `B-07`, the next new rule is `B-08`.
6. Do not generate a rule for a pattern that is already covered by an existing `REVIEW.md` rule — log it in the "Already Covered" section instead.
7. Manual-only patterns must still appear in the output — they are not discarded. Document why automation is not possible and suggest a manual action.
8. If `/beacon` has not been run recently (no `beacon-triage.md` or entries are older than 14 days), note this at the top of the report: _"Feedback data may be stale — consider running /beacon before finalizing these rules."_
9. When writing approved rules to `REVIEW.md`, preserve all existing content exactly. Only append to the `## Beacon-Generated Rules` section — never modify rules in other sections.
10. After appending rules, do not commit automatically. Print the recommended commit message and let the builder run it.
