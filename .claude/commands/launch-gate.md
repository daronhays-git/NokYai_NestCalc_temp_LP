# Template — customize for your project. See SETUP.md for placeholder reference.

# /launch-gate — Go/No-Go Launch Decision

## Purpose
Read-only launch gate review. Reads `docs/launch-checklist.md`, classifies every incomplete item as a HARD BLOCKER, SOFT BLOCKER, or NICE-TO-HAVE, computes a readiness score, issues a GO / CONDITIONAL GO / NO-GO verdict, and gives one next-action recommendation.

Run `/launch-gate` when you believe the project is close to ready, or any time you need an honest assessment of whether it is safe to ship. It never modifies any file.

---

## Files to Read Before Running

1. `docs/launch-checklist.md` — primary input; all items, statuses, and dependency data
2. `project-brief.md` — for project name, launch target date, and product context that informs HARD vs. SOFT classifications
3. `CLAUDE.md` — for tech stack details that inform severity of technical blockers

If `docs/launch-checklist.md` does not exist, check the project root for `launch-checklist.md`. If neither exists, report the missing file and stop — do not create it.

---

## What Launch-Gate Does

### Step 1 — Locate and Validate the Checklist

Find `docs/launch-checklist.md` (fall back to project root `launch-checklist.md`). If neither exists:

```
❌ launch-checklist.md not found.
Expected location: docs/launch-checklist.md
Run /foundation to generate project documents, then create a launch checklist.
```

Stop. Do not create the file.

---

### Step 2 — Parse All Checklist Items

For each item, extract: ID, description, status, and dependency. Use the same status inference rules as `/launch-status`: `DONE`, `IN-PROGRESS`, `TODO`, `BLOCKED`. If status is ambiguous, mark as `TODO`.

Count totals per category:
- `DONE` items — complete
- `IN-PROGRESS` items — partially complete
- `TODO` / `BLOCKED` items — incomplete

---

### Step 3 — Classify Every Incomplete Item

For every item that is NOT `DONE`, assign exactly one classification. Apply criteria in order — stop at the first match.

**HARD BLOCKER** — Launch cannot happen without resolving this.

Classify as HARD BLOCKER if the item involves any of:
- Data loss or data corruption risk
- Security vulnerability or exposed credentials
- Legal or compliance requirement (privacy policy, terms of service, required regulatory filings)
- Core product feature that is broken or non-functional for users
- Authentication flow broken — users cannot log in or out
- Payment flow broken — users cannot complete a purchase
- Deployment non-functional — the app does not load or crashes on entry
- SSL / HTTPS not provisioned on the production domain
- Production environment not configured (required env vars missing)

**SOFT BLOCKER** — Should be resolved before launch but does not prevent it.

Classify as SOFT BLOCKER if the item involves any of:
- Compliance steps that are in-progress and have a near-term plan (e.g., data processing agreements being executed)
- Secondary features that users expect but that have a workaround
- Performance issues that are noticeable but not app-breaking
- SEO or metadata gaps that affect discoverability but not function
- Error monitoring or observability gaps (app works; you just won't see crashes)
- Beta testing process gaps (go/no-go criteria not documented, bug triage not formalized)
- Soft launch tasks that can follow within 48 hours of going live

**NICE-TO-HAVE** — Can be added post-launch with no material impact on the launch.

Classify as NICE-TO-HAVE if the item involves any of:
- Marketing, social media, or affiliate integrations
- Polish, animations, or UX improvements to secondary flows
- Documentation improvements
- Future-version features explicitly deferred in project-brief.md
- Edge-case handling for rare user scenarios
- Optimizations (bundle size, caching, CDN) with no current user impact

**When in doubt, classify up** — if an item could be SOFT BLOCKER or HARD BLOCKER, choose HARD BLOCKER. The builder can downgrade it after reviewing the report.

---

### Step 4 — Compute the Readiness Score

Calculate a score from 0–100 using the following formula:

1. **Base score** = `DONE` items ÷ total items × 100 (round to nearest integer)
2. **Deductions:**
   - Each HARD BLOCKER remaining: −5 points
   - Each SOFT BLOCKER remaining: −2 points
   - Each NICE-TO-HAVE remaining: −0.5 points (round the total deduction to nearest integer)
3. **Final score** = Base score − total deductions. Floor at 0, cap at 100.

Show the formula components in the output so the builder can see how the score was derived.

---

### Step 5 — Determine the Verdict

Evaluate in order — stop at the first matching rule:

**NO-GO** (any of the following):
- Any HARD BLOCKER that is catastrophic: security vulnerability, data loss risk, legal/compliance requirement, auth broken, deployment non-functional
- 3 or more HARD BLOCKERs of any type
- Readiness score below 50
- Any single category below 40% complete

**CONDITIONAL GO** (all of the following):
- Zero catastrophic HARD BLOCKERs
- 1–2 HARD BLOCKERs remaining (resolvable in a defined near-term window)
- Readiness score 50–84
- No single category below 40%

**GO** (all of the following):
- Zero HARD BLOCKERs
- Readiness score 85 or above
- No single category below 70%

---

### Step 6 — Build the Minimum Path to GO

List every HARD BLOCKER in priority order (most urgent first, based on dependency chains). For each item, assign a time estimate using these buckets:

- `[~15min]` — Quick fix, config change, or single toggle
- `[~1hr]` — Moderate task, one feature or integration step
- `[~half-day]` — Significant work, multiple files or coordination needed
- `[~1day+]` — Large effort; consider whether it can be scoped down

Sum the estimates and give a total.

If verdict is GO: state "No items remain on the path to GO."

---

### Step 7 — Produce the Gate Report

Assemble and print the complete report using the output format below.

---

## Output Format

```
╔══════════════════════════════════════════════════════╗
║         [PROJECT_NAME] LAUNCH GATE REVIEW            ║
║         [YYYY-MM-DD]                                 ║
╚══════════════════════════════════════════════════════╝
```

---

### Category Scores

For each category, show completion bar and classified items:

```
[Category Name]       [████████████░░░░] XX%
  ✅ Done item description
  ✅ Done item description
  🔴 HARD BLOCKER: Incomplete item — [why it blocks launch]
  🟡 SOFT BLOCKER: Incomplete item — [why it should be fixed]
  💡 NICE-TO-HAVE: Incomplete item
```

---

### 🔴 Hard Blockers

```
🚫 HARD BLOCKERS — N items

  1. [Category] Item description
     Why it blocks: [one sentence — what breaks or what risk it creates]

  2. [Category] Item description
     Why it blocks: [one sentence]
```

If zero: `✅ NO HARD BLOCKERS — All critical items complete.`

---

### 🟡 Soft Blockers

```
⚠️ SOFT BLOCKERS — N items

  1. [Category] Item description
     Why it matters: [one sentence — what the risk is if skipped]

  2. [Category] Item description
     Why it matters: [one sentence]
```

If zero: `✅ NO SOFT BLOCKERS.`

---

### 💡 Nice-to-Haves

```
💡 NICE-TO-HAVE — N items

  - [Category] Item description
  - [Category] Item description
```

If zero: `✅ All non-critical items are complete.`

---

### Readiness Score

```
📊 READINESS SCORE: XX / 100

  Base (completion %):          XX pts
  Hard blocker deductions (N×5): −XX pts
  Soft blocker deductions (N×2): −XX pts
  Nice-to-have deductions:       −XX pts
  ──────────────────────────────────────
  Final score:                   XX / 100
```

---

### Verdict

**GO:**
```
╔══════════════════════════════════════════════════════╗
║  ✅  VERDICT: GO                                     ║
║  All critical items complete. Safe to ship.          ║
╚══════════════════════════════════════════════════════╝
```

**CONDITIONAL GO:**
```
╔══════════════════════════════════════════════════════╗
║  🟡  VERDICT: CONDITIONAL GO                         ║
║  Launch possible after resolving N hard blocker(s).  ║
╚══════════════════════════════════════════════════════╝
```

**NO-GO:**
```
╔══════════════════════════════════════════════════════╗
║  🔴  VERDICT: NO-GO                                  ║
║  N hard blockers must be resolved before launch.     ║
╚══════════════════════════════════════════════════════╝
```

---

### 📋 Minimum Path to GO

```
📋 MINIMUM PATH TO GO

  1. [~Xmin/hr/day] [Category] Item description
  2. [~Xmin/hr/day] [Category] Item description
  3. [~Xmin/hr/day] [Category] Item description
  ──────────────────────────────────────────────
  Total: N items · estimated Y hours of work
```

If GO: `No items remain. The project is ready to launch.`

---

### 📝 Post-Launch Backlog

```
📝 POST-LAUNCH BACKLOG — Soft blockers and nice-to-haves

  Soft blockers (address within first week):
  - [Category] Item description
  - [Category] Item description

  Nice-to-haves (address when time allows):
  - [Category] Item description
  - [Category] Item description
```

---

### Next Action

One sentence. Specific and immediately actionable:

```
➡️  [One sentence: the single most important thing to do right now — name the specific item, not a category.]
```

---

## How to Run

**Default — full gate review:**
```
/launch-gate
```

**Rules while running:**
1. This command is read-only. Never modify `launch-checklist.md` or any other file.
2. If `launch-checklist.md` is missing, stop and report it — do not create it.
3. Classify every incomplete item into exactly one tier. No item may be left unclassified.
4. When in doubt between HARD BLOCKER and SOFT BLOCKER, classify as HARD BLOCKER. The builder can downgrade it after reviewing.
5. The verdict is determined by the rules in Step 5 — do not override them with subjective judgment. If the rules say NO-GO, the verdict is NO-GO.
6. The "Why it blocks / Why it matters" explanation for each blocker must be specific to the item — not a generic statement. Name the actual risk or user impact.
7. Effort estimates in the Minimum Path to GO must reflect realistic effort for this project's stack. Use `[~1day+]` for anything that requires coordination, external parties, or significant testing.
8. The Next Action sentence must name a specific item, not a category. "Resolve all financial blockers" is not acceptable — "Open a business bank account (item 2.1)" is.
9. SOFT BLOCKERs appear in the Post-Launch Backlog with a "address within first week" label — they are not forgotten, just deferred.
10. Be direct. The purpose of this gate is to prevent a bad launch, not to validate the builder's optimism. If the project is not ready, say so plainly.
