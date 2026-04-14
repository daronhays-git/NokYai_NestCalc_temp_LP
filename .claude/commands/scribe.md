# Template — customize for your project. See SETUP.md for placeholder reference.

# /scribe — Documentation Sync Review

## Purpose
Scribe compares recently changed code files against the documentation inventory in `docs/doc-inventory.md` and reports which docs are likely stale, which code changes have no documentation at all, and which docs are still current. Read-only — Scribe reports findings but never modifies files.

---

## Files to Read Before Running
1. `docs/doc-inventory.md` — full documentation inventory with file paths, purposes, and status; Scribe's primary input
2. `module-map.md` — code structure map; used to understand what a changed file does when its purpose isn't obvious from the path
3. `CLAUDE-AGENTS.md` — agent file registry; context for what each doc is used for

---

## What Scribe Does

### Step 1 — Get the Changeset
Run:
```
git -C [PROJECT_PATH] diff HEAD~5 --name-only
```
Replace `5` with the N argument if one was provided. This lists every file path touched in the last N commits.

### Step 2 — Apply Filters
Remove from the changeset any file matching these patterns before doing any cross-referencing. Do not flag filtered files under any output section:

- `**/*.test.*`, `**/*.spec.*`, `**/__tests__/**` — test files
- `vite.config.*`, `eslint*`, `tailwind*`, `postcss*`, `tsconfig*`, `jsconfig*`, `babel*`, `.prettierrc*`, `.gitignore` — build tool and VCS config
- `*.toml`, `*.lock`, `package.json`, `package-lock.json` — dependency and deploy config
- `dist/**`, `build/**`, `[PROJECT_SRC]/dist/**`, `.vite/**` — build artifacts
- `.github/workflows/**` — workflow files; agent automation configs are self-documenting
- `.claude/**` — agent command, skill, agent definition, and settings files; same rationale as `.github/workflows/`
- `*-Handoff*.md`, `*-handoff-*.md` — session handoff files; historical snapshots, not maintained docs
- `feedback-log.md`, `beacon-triage.md`, `beacon-daily.md`, `beacon-digest-*.md` — Beacon-managed operational outputs; not code
- `finance-report.md`, `daily-briefing.md`, `docs/reports/**` — Finance workflow and briefing outputs; not code
- `lessons.md` — Shield's learning log; updated by humans after reviews, not by code changes
- `docs/doc-inventory.md` — Scribe's own source file
- Documentation files that are themselves inventory targets — changes to a doc don't make other docs stale. Key paths: `REVIEW.md`, `CLAUDE-AGENTS.md`, `module-map.md`, `design-tokens.md`, `CLAUDE.md`, `README.md`, and any public-facing content pages in `[STATIC_DIR]/`

### Step 3 — Cross-Reference Against the Inventory
For each remaining file in the filtered changeset, find which docs in `docs/doc-inventory.md` cover that area of the codebase. Use the mapping below as the primary guide. When a changed file doesn't match any pattern in the table, read `module-map.md` to understand its role and reason about coverage from there.

**Doc-to-code coverage map:**

> Note: Customize this table for your project's doc-to-code coverage. Replace placeholder paths with your actual source structure.

| Doc | Covers changes in |
|-----|------------------|
| `module-map.md` | `[PROJECT_SRC]/components/**`, `[PROJECT_SRC]/config/**`, `[PROJECT_SRC]/utils/**`, `[PROJECT_SRC]/context/**`, `[SERVERLESS_PATH]/**`, `[APP_ENTRY]`, `[PROJECT_SRC]/main.jsx` |
| `design-tokens.md` | `[PROJECT_SRC]/components/**`, `[APP_ENTRY]` (theme objects) |
| `i18n-status.md` | `[PROJECT_SRC]/i18n/translations.js`, any component that renders translated strings |
| `CLAUDE.md` | Any file under `[PROJECT_SRC]`; overall app architecture |
| `project-brief.md` | `[PROJECT_SRC]/config/tiers.js`, `[PROJECT_SRC]/config/payments.js`, payment config files |
| `launch-checklist.md` | `[SERVERLESS_PATH]/**`, payment config, deploy config, database schema |
| project documentation and content pages | core calculation/estimation functions in `[SERVERLESS_PATH]` and `[APP_ENTRY]` |
| `ux-decision-tree.md` | `[PROJECT_SRC]/components/**`, `[APP_ENTRY]` (tab structure, state management) |
| `CLAUDE-AGENTS.md` | `[PROJECT_SRC]/config/tiers.js`, `[SERVERLESS_PATH]/**` — agent roles track what the code can do; new functions or tier changes may require an agent scope update |

### Step 4 — Classify Each Doc in the Inventory
For each doc in `docs/doc-inventory.md`:
- If any file it covers appeared in the filtered changeset → **likely stale**
- If no files it covers changed → **still current**

---

## Output Format

```markdown
## Scribe Review: HEAD~N..HEAD ([date])

### Commits Checked
N commits — [first line of each commit message, one per line]

### Filtered Out
[count] files excluded (test files, config, build artifacts, workflows, agent configs, Beacon/Finance outputs, documentation files)

---

## Docs Likely Stale

| Doc | Changed File(s) | Why Likely Stale |
|-----|----------------|-----------------|
| `module-map.md` | `[PROJECT_SRC]/components/NewModal.jsx` (added) | module-map.md inventories all component files with line counts; new file not yet listed |
| `CLAUDE.md` | `[APP_ENTRY]` | CLAUDE.md describes app architecture; changes to the core file may shift what the guide says |
| project documentation and content pages | `[SERVERLESS_PATH]/local-estimate.js` | content page documents the estimation approach; local-estimate logic changed |

---

## Undocumented Changes

| Changed File | What It Does | Suggested Doc to Update or Create |
|-------------|-------------|----------------------------------|
| `[SERVERLESS_PATH]/new-fn.js` | New serverless function | Add to module-map.md §Backend; check if any content page needs a note if it handles calculations |
| `[PROJECT_SRC]/config/tiers.js` | Tier pricing or feature gate change | Review project-brief.md monetization table and CLAUDE-AGENTS.md feature list |

If no undocumented changes: `None — all changed files are covered by at least one inventory doc.`

---

## Docs Still Current

- `design-tokens.md` — no UI component or theme changes in this range
- `i18n-status.md` — no translation file changes in this range
- `project-brief.md` — no tier or payment config changes in this range
[... list remaining docs with no relevant code changes ...]

---

### Summary
[1–2 sentences: total docs at risk, the single most important update to make, and whether any new code was introduced with no doc coverage at all.]
```

---

## How to Run

**Default — check last 5 commits:**
```
/scribe
```

**Check a specific number of commits back:**
```
/scribe 10
/scribe 20
```

**Rules while running:**
1. Read `docs/doc-inventory.md` first, every run — inventory content changes as documentation steps complete.
2. Only flag a doc as stale if there is a plausible content connection between the changed file and what that doc describes. Do not flag every doc for every change.
3. For "Undocumented Changes," name a specific doc to update — not just "update the docs."
4. Do not modify any files. Scribe is review-only; fixes go through the normal edit flow.
5. If the filtered changeset is empty, return: `PASS — no doc-relevant code changes in this range` without output sections.
6. When running git commands, always use `git -C [PROJECT_PATH]` instead of `cd <path> && git ...`.
