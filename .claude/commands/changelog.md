# Template — customize for your project. See SETUP.md for placeholder reference.

# /changelog — Release Notes Generator

## Purpose
Generate a structured changelog entry from git commit history and prepend it to `CHANGELOG.md`. Translates raw commit messages into plain-English release notes organized by change type. Creates `CHANGELOG.md` if it does not exist; always preserves any existing entries below the new section.

---

## Files to Read Before Running
1. `CHANGELOG.md` — existing release history; read before writing so existing entries are preserved
2. `module-map.md` — understand what a changed file does when the commit message is ambiguous
3. `docs/doc-inventory.md` — used to classify doc-only commits as 📝 Documentation vs. code

---

## What Changelog Does

### Step 1 — Resolve the Range
Determine the commit range to cover:

- **No arguments:** Find the most recent git tag. If a tag exists, use `<tag>..HEAD`. If no tags exist, use commits from the last 14 days (`--since="2 weeks ago"`).
- **Version argument only** (e.g., `/changelog v1.2.0`): Same range logic as above; use the provided string as the version label.
- **Version + date range** (e.g., `/changelog v1.2.0 2026-03-01..2026-04-13`): Use the provided range. Accepts git-compatible ref ranges (`HEAD~20..HEAD`, `tag-a..tag-b`) or ISO date ranges (`YYYY-MM-DD..YYYY-MM-DD`).

Run:
```
git -C [PROJECT_PATH] log <range> --oneline --no-merges
```

If the range is empty (no commits), output: `PASS — no commits in range; CHANGELOG.md not modified.` and stop.

### Step 2 — Fetch Full Commit Detail
For each commit hash from Step 1, run:
```
git -C [PROJECT_PATH] show <hash> --stat --format="%H %s %b"
```
Collect: short hash, subject line, body (for PR references), and changed file paths.

### Step 3 — Categorize Each Commit
Assign each commit to exactly one category. Apply checks in this exact order — stop at the first match:

**1. Agent Ops check first (file path, not signal words)**
If ALL changed files fall under agent or workflow paths, classify as 🤖 Agent Ops regardless of the commit message prefix (including `fix:`, `chore:`, `feat:`):
- `.github/workflows/**`
- `.claude/**`
- `finance-report.md`, `beacon-triage.md`, `beacon-daily.md`, `beacon-digest-*.md`, `feedback-log.md`

This rule exists because agent infrastructure commits routinely use `fix:` or `chore:` prefixes, which would otherwise misclassify them as Fixes or Internal.

**2. Signal word check (for all remaining commits)**
Apply the table below in priority order — Features is highest, Internal is the fallback:

| Category | Emoji | What belongs here | Signal words / patterns |
|----------|-------|-------------------|------------------------|
| Features | ✨ | New user-facing capability; new tab, modal, or page; new AI endpoint surfacing new data | `add`, `new`, `introduce`, `implement`, changed file is a new component or serverless function |
| Fixes | 🐛 | Bug correction; broken behavior now works; crash or error resolved | `fix`, `correct`, `resolve`, `patch`, `broken`, `error` |
| Improvements | 🔧 | Refactor, performance, UX polish, accessibility, wording change in existing UI | `improve`, `refactor`, `optimize`, `update`, `polish`, `tweak`, `ux` |
| Documentation | 📝 | Changes only to `.md` files, content pages, `CLAUDE.md`, or `doc-inventory.md` | All changed files are docs; commit touches only `docs/`, `*.md`, or `[STATIC_DIR]/*.html` |
| Internal | 🏗️ | Build config, dependency updates, CI changes, env config, anything else not user-visible | `*.toml`, `*.lock`, `package.json`, `vite.config.*`, `tsconfig*`, `eslint*`, ambiguous commits |

**Ambiguity rule:** If the commit message is unclear and the changed files don't resolve it, classify as Internal (🏗️).

### Step 4 — Write Plain-English Descriptions
For each commit, write a single bullet point in plain English:
- Describe *what changed* from a user or maintainer perspective — not what the developer typed
- Keep it to one sentence
- Append the short commit hash in parentheses: `(abc1234)`
- If the commit references a PR number (`#123`), include it: `(#123, abc1234)`
- Do NOT copy the raw commit subject verbatim — translate it

**Examples:**
| Raw commit message | Plain-English bullet |
|-------------------|---------------------|
| `feat: add ExportModal to ReportLayout` | Added export options modal to the report layout for premium tier users (a3f9b12) |
| `fix: search input not resetting after clear` | Fixed search field not resetting when the input is cleared (b8d22e1) |
| `chore: add scribe.md command` | Added `/scribe` documentation sync command to the agent system (c901fa3) |
| `update payment config with production keys` | Updated payment config with live product keys for go-live (d44ee90) |

### Step 5 — Build the Entry
Assemble the changelog entry:

```markdown
## [version] — YYYY-MM-DD

### ✨ Features
- ...

### 🐛 Fixes
- ...

### 🔧 Improvements
- ...

### 📝 Documentation
- ...

### 🤖 Agent Ops
- ...

### 🏗️ Internal
- ...
```

Omit any section with no entries. Use today's date for `YYYY-MM-DD`.

### Step 6 — Write to CHANGELOG.md
1. Read the current contents of `CHANGELOG.md` (empty string if file does not exist).
2. Prepend the new entry, followed by a blank line, followed by the existing contents.
3. Write the result back to `CHANGELOG.md`.

---

## Output Format

After writing, print a confirmation report to the console (not to the file):

```markdown
## Changelog: [version] — YYYY-MM-DD

**Range:** <range used>
**Commits processed:** N
**Entry written to:** CHANGELOG.md

### Categories
| Category | Entries |
|----------|---------|
| ✨ Features | N |
| 🐛 Fixes | N |
| 🔧 Improvements | N |
| 📝 Documentation | N |
| 🤖 Agent Ops | N |
| 🏗️ Internal | N |

### Preview
[Full text of the entry just written]
```

---

## How to Run

**Default — unreleased changes since last tag (or 2 weeks if no tags):**
```
/changelog
```

**With version label:**
```
/changelog v1.0.0
/changelog v1.1.0
```

**With version label and explicit range:**
```
/changelog v1.0.0 HEAD~20..HEAD
/changelog v1.0.0 2026-03-01..2026-04-13
```

**Rules while running:**
1. Read `CHANGELOG.md` first before writing — never overwrite existing entries.
2. Translate commit messages into plain English. Raw git subjects are not changelog entries.
3. Assign each commit to exactly one category — no duplicates across sections.
4. Skip merge commits (`--no-merges` in the git log command).
5. If the resolved range is empty, return `PASS — no commits in range` without writing anything.
6. When running git commands, always use `git -C [PROJECT_PATH]` instead of `cd <path> && git ...`.
7. Use today's date (from system context) for the entry header — never guess or hardcode.
