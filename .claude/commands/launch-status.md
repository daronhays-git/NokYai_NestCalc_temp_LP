# Template — customize for your project. See SETUP.md for placeholder reference.

# /launch-status — Launch Readiness Dashboard

## Purpose
Read-only launch readiness dashboard. Parses `docs/launch-checklist.md`, computes completion percentage per category, traces dependency chains for blocked items, and recommends the highest-impact items to work on today.

Run `/launch-status` at any point during the pre-launch sprint to get an instant status snapshot. It never modifies any file.

---

## Files to Read Before Running

1. `docs/launch-checklist.md` — primary input; all status, dependency, and notes data comes from here. If this file does not exist, check the project root for `launch-checklist.md`. If neither exists, report the missing file and stop.
2. `project-brief.md` — for project name, launch target date, and builder name
3. `CLAUDE.md` — for tech stack context that helps interpret ambiguous technical items

---

## What Launch-Status Does

### Step 1 — Locate and Validate the Checklist

Find `docs/launch-checklist.md` (fall back to `launch-checklist.md` in the project root). If neither exists, output:

```
❌ launch-checklist.md not found.
Expected location: docs/launch-checklist.md
Run /foundation first to generate project documents, then create a launch checklist.
```

Stop. Do not create the file — this command is read-only.

---

### Step 2 — Parse All Checklist Items

For each item in the checklist, extract:
- **Item ID** — the section-prefixed number (e.g., `1.1`, `2.3`)
- **Description** — item text
- **Status** — one of: `DONE`, `IN-PROGRESS`, `TODO`, `BLOCKED`
- **Dependency** — item IDs or descriptions that must complete first (from the Dependency column or inline notes)
- **Category** — the section it belongs to

Status inference rules if not explicit:
- Checkbox `[x]` or text `DONE` / `complete` → `DONE`
- Text `IN-PROGRESS` or `in progress` → `IN-PROGRESS`
- Text `BLOCKED` or `blocked` → `BLOCKED`
- Unchecked `[ ]` or text `TODO` / `not started` → `TODO`
- If status is ambiguous, mark as `TODO` and note "status unclear" in the full checklist section

---

### Step 3 — Compute Percentages

For each category:
- **Completion %** = `DONE` items ÷ total items × 100 (round to nearest integer)
- Count items in each status bucket: DONE, IN-PROGRESS, TODO, BLOCKED

Overall:
- **Overall %** = total `DONE` ÷ total items × 100
- Total item count across all categories

---

### Step 4 — Trace Dependency Chains for Blocked Items

For every item with status `BLOCKED`:
1. Read its Dependency field to find what it is waiting on
2. Check the status of each dependency
3. If a dependency is itself `TODO` or `BLOCKED`, recurse — trace the full chain until you reach a `DONE` item or an item with no dependencies
4. Format the chain as a linear sequence: `A → B → C (BLOCKED here)` where A is the root cause

Example chain format:
```
[2.3] Payment processor connected to bank — BLOCKED
  Chain: [1.2] Business entity registered (DONE)
       → [1.3] Tax ID / EIN obtained (TODO) ← root cause
       → [2.1] Business bank account opened (TODO)
       → [2.3] Payment processor connected ← blocked here
  Fix first: [1.3] Tax ID / EIN obtained
```

---

### Step 5 — Identify Today's Priorities

Evaluate all non-`DONE` items and rank by impact using this priority order:

1. **Root-cause unblockers** — items whose completion unblocks the most other items (trace forward dependencies)
2. **Critical path items** — items in the sequence that leads directly to launch
3. **Nearest completion** — `IN-PROGRESS` items that appear closest to done based on notes
4. **Lowest-completion category** — any `TODO` item in the category with the lowest completion percentage
5. **Approaching deadline** — any item whose notes reference a date that is near

Select the top 3. For each, state which of the above criteria it meets and why it ranks where it does.

---

### Step 6 — Build the Critical Path

Read the checklist's Critical Path section if one exists. If not, construct it:
1. Start from the item(s) that are the final gate before launch (typically: live payment test, remove password protection, or equivalent)
2. Trace backward through dependencies until you reach items with no remaining blockers
3. Output as a forward-flowing sequence with `→ unblocks` annotations

---

### Step 7 — Produce the Dashboard

Assemble the complete dashboard using the output format below.

---

## Output Format

```
╔══════════════════════════════════════════════════════╗
║         [PROJECT_NAME] LAUNCH STATUS                 ║
║         [YYYY-MM-DD]                                 ║
╠══════════════════════════════════════════════════════╣
```

---

### Overall Progress

```
[████████████░░░░░░░░] XX% complete (N/T items)
```

Where `████` represents completed items and `░` represents remaining. Scale to 20 characters total.

---

### Category Breakdown

Sorted lowest completion % first (most attention needed at top):

```
Category Name               ██████████░░  XX%  (done/total)
```

Table view:

| Category | Done | In-Progress | Todo | Blocked | Total | % |
|----------|------|-------------|------|---------|-------|---|
| [Category 1 — lowest %] | N | N | N | N | N | N% |
| [Category 2] | N | N | N | N | N | N% |
| [Category 3] | N | N | N | N | N | N% |
| [Category 4] | N | N | N | N | N | N% |
| [Category 5 — highest %] | N | N | N | N | N | N% |
| **Total** | **N** | **N** | **N** | **N** | **N** | **N%** |

---

### 🔴 Blocked Items

For each BLOCKED item, show the full dependency chain traced in Step 4:

```
🔴 BLOCKED — N items

  [ID] Item description
    Chain: [dep-id] Root cause item (STATUS)
         → [dep-id] Intermediate dependency (STATUS)
         → [id] This item ← blocked here
    Fix first: [dep-id] Root cause item description

  [ID] Item description
    ...
```

If no items are blocked: `✅ No blocked items`

---

### 🟡 In-Progress Items

```
🟡 IN PROGRESS — N items

  [Category] [ID] Item description
  [Category] [ID] Item description
```

If none: `All items are either done or not yet started.`

---

### 🎯 Today's Priorities

```
🎯 TODAY'S PRIORITIES

  1. [Category] [ID] Item description
     Why: [one sentence — which priority criterion this meets and what it unblocks]

  2. [Category] [ID] Item description
     Why: [one sentence]

  3. [Category] [ID] Item description
     Why: [one sentence]
```

---

### 📍 Critical Path

```
📍 CRITICAL PATH TO LAUNCH

  [ID] Item → unblocks [ID]
  [ID] Item → unblocks [ID]
  [ID] Item → unblocks [ID]
  ...
  [ID] Final gate item → 🚀 LAUNCH READY

Parallel work (non-blocking):
  - [ID] Item (can be done anytime)
  - [ID] Item (can be done anytime)
```

If a pre-existing Critical Path section exists in the checklist, reproduce it and note any changes in item status since it was written.

---

### 📊 Readiness Assessment

Based on overall percentage and blocker count:

| Threshold | Label |
|-----------|-------|
| 90%+ complete, no blockers | **Ready to launch** |
| 75–89% complete, no critical blockers | **Nearly ready** |
| 50–74% complete | **Significant work remaining** |
| Below 50% | **Early stage** |

Print one line:

```
📊 READINESS: [Label] — [one sentence describing the single most important action]
```

---

### Full Checklist

Reproduce the complete checklist with current status, grouped by category. Use emoji status indicators:

- ✅ DONE
- 🔄 IN-PROGRESS
- ⬜ TODO
- 🔴 BLOCKED

```markdown
## [Category Name]

| # | Item | Status | Dependency | Notes |
|---|------|--------|------------|-------|
| 1.1 | Item description | ✅ | — | Notes if any |
| 1.2 | Item description | 🔄 | 1.1 | Notes if any |
| 1.3 | Item description | ⬜ | 1.2 | Notes if any |
| 1.4 | Item description | 🔴 | 1.3 | Notes if any |

[Repeat for each category]
```

---

## How to Run

**Default — full dashboard from project root:**
```
/launch-status
```

**Rules while running:**
1. This command is read-only. Never modify `launch-checklist.md` or any other file.
2. If `launch-checklist.md` does not exist, stop and report the missing file — do not create it.
3. Dependency chains must be traced fully — a chain that ends at a `TODO` item must trace back further until the root cause (an item with no outstanding dependencies) is identified.
4. Sort the Category Breakdown table by completion percentage ascending — the categories that need the most work appear first.
5. Today's Priorities must cite a specific reason for each ranking — "it's not done" is not a reason. Name what the item unblocks, which criterion it meets, or why it is the highest-leverage action right now.
6. If the checklist has no explicit Dependency column, infer dependencies from item notes and order within the category. Document any inferred dependencies as assumptions.
7. If an item's status cannot be determined from the checklist text, mark it as `TODO` and flag it in the Full Checklist section as "(status unclear — verify manually)".
8. The Readiness Assessment label must appear on a single line at the end of that section — do not bury it in prose.
9. When reading `project-brief.md` for the launch target date, include that date in the dashboard header if available (e.g., `Target: [date]`).
10. Keep the dashboard compact and scannable. The goal is a 30-second read that tells the builder exactly what to do today.
