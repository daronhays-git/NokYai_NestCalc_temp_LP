# NokYai Review Stack — Operations Guide
v1.0 | April 2026

---

## 1. System Overview

The NokYai Review Stack is a 9-agent code quality and operations system (8 active, 1 parked) designed for a solo builder on Windows 11 running VS Code + Claude Code + Claude.ai. Agents cover the full development lifecycle: project architecture interviews (Foundation), launch readiness scoring (Launch), code and security review (Shield), design token and accessibility review (Eagle), bundle health (Finance), user feedback triage (Beacon), documentation currency (Scribe), and SEO/EEAT/performance audit (Lighthouse). A Controller agent is defined but parked until multiple projects warrant cross-project orchestration. Review-All is the unified orchestrator that runs Eagle, Shield, and Lighthouse together as a merge gate on every PR.

| # | Agent | Role | Trigger | Output |
|---|-------|------|---------|--------|
| 1 | Foundation | Project launch architecture interview | Manual (`/foundation`) | CLAUDE.md, module-map.md, design-tokens.md seed |
| 2 | Launch | Launch readiness dashboard + go/no-go | Manual (`/launch-status`, `/launch-gate`) | Status dashboard, scored gate report |
| 3 | Shield | Code, security, logic, performance review | PR + manual (`/shield`) | PR comment, findings table |
| 4 | Eagle | Design tokens, accessibility, responsive review | PR + file-save + manual (`/eagle`) | PR comment, findings table |
| 5 | Finance | Bundle size + dependency health | Monday CI + manual (`/finance`, `/dep-audit`) | finance-report.md |
| 6 | Beacon | Feedback triage + pattern → rules | Daily/weekly scheduled + issue intake + manual (`/beacon`, `/beacon-rules`) | beacon-triage.md, GitHub Issues |
| 7 | Scribe | Doc currency vs. code changes | PR + weekly scheduled + manual (`/scribe`) | GitHub Issues for stale docs |
| 8 | Lighthouse | SEO, EEAT, AEO/GEO, Core Web Vitals | Push to main/master + manual (`/lighthouse`) | SEO/CWV report, docs/reports/ |
| 9 | Controller | Cross-project prioritization | **PARKED** — not active | — |

---

## 2. Agent Quick Reference

### Foundation — Project Launch Architecture Interview

- **Command:** `/foundation`
- **Also:** None
- **GitHub Action:** None
- **Scheduled Task:** None
- **Reads:** `package.json`, `README.md`, `CLAUDE.md`, `src/` component structure, `netlify.toml`, `vite.config.js`, any existing briefs or roadmaps
- **Outputs:** Generates or updates `CLAUDE.md`, seeds `module-map.md`, `design-tokens.md`, and `docs/doc-inventory.md`; runs a 10-question architecture interview, pre-filling answers from scanned source code
- **When to run manually:** Once at project start, or after a major architectural change; run before filling `{{PLACEHOLDER}}` tokens

---

### Launch — Readiness Dashboard + Go/No-Go Gate

- **Command:** `/launch-status`
- **Also:** `/launch-gate`
- **GitHub Action:** None
- **Scheduled Task:** None
- **Reads:** `launch-checklist.md` (root or `docs/`)
- **Outputs:** `/launch-status` → ASCII progress dashboard with category breakdown and blocked items; `/launch-gate` → scored 0–100% per category, classifies every incomplete item as HARD BLOCKER or NICE-TO-HAVE, renders go/no-go verdict
- **When to run manually:** `/launch-status` weekly during active development; `/launch-gate` before any public launch or major release

---

### Shield — Code, Security & Logic Review

- **Command:** `/shield`
- **Also:** Included in `/review-all`
- **GitHub Action:** `shield.yml` — triggers on pull_request (opened, synchronize)
- **Scheduled Task:** None
- **Reads:** `REVIEW.md` §2–4, `module-map.md`, `CLAUDE.md`, `lessons.md`
- **Outputs:** PR comment with findings table; severity levels: Critical / Major / Minor; flags security issues, unhandled promises, hooks after conditional returns, locked-file modifications, and architectural violations
- **When to run manually:** Before any PR merge on a sensitive path (auth, payments, contact form, locked files); or after a large refactor

---

### Eagle — Design Token, Accessibility & Responsive Review

- **Command:** `/eagle`
- **Also:** Included in `/review-all`; auto-triggered by `eagle-auto.md` skill on UI file saves
- **GitHub Action:** `eagle.yml` — triggers on pull_request (opened, synchronize)
- **Scheduled Task:** None
- **Reads:** `design-tokens.md`, `REVIEW.md` §1–2, `lessons.md`
- **Outputs:** PR comment with findings table; error / warn / info severity; checks raw hex values against design token palette, missing alt/aria-label, fixed px font sizes, horizontal scroll violations
- **When to run manually:** After any UI component change; Eagle auto-review runs on file save via the skill, so manual `/eagle` is mainly for a full section audit

---

### Finance — Bundle Size & Dependency Health

- **Command:** `/finance`
- **Also:** `/dep-audit` (dependency-only variant)
- **GitHub Action:** `finance.yml` — triggers on schedule (Mondays 1:00 PM UTC) + workflow_dispatch
- **Scheduled Task:** None (GitHub Action handles the Monday run)
- **Reads:** `package.json`, build output from `npx vite build`, `npm outdated`, `npm audit`, prior `finance-report.md` if present
- **Outputs:** `finance-report.md` at project root — bundle summary, top chunks, dependency counts, optimization opportunities; `/dep-audit` produces a separate outdated + vulnerability report
- **When to run manually:** Before any dependency upgrade; after adding a new library; before a release if the Monday run was more than a week ago

---

### Beacon — Feedback Triage & Pattern Detection

- **Command:** `/beacon`
- **Also:** `/beacon-rules` (pattern → review rules pipeline)
- **GitHub Action:** `beacon-intake.yml` — triggers on issues (opened or labeled "feedback"); automatically prepends entry to `feedback-log.md` and commits
- **Scheduled Task:** Daily Triage (7:30 AM); Weekly Digest (8:00 AM Mondays)
- **Reads:** `feedback-log.md`, `REVIEW.md`
- **Outputs:** `/beacon` → categorizes uncategorized/unscored entries in `feedback-log.md`, saves `beacon-triage.md` with priority summary; `/beacon-rules` → identifies patterns (3+ similar entries) and drafts new review rules for REVIEW.md
- **When to run manually:** After a burst of user feedback; before a sprint planning session; use `/beacon-rules` monthly to promote patterns into permanent rules

---

### Scribe — Documentation Currency

- **Command:** `/scribe`
- **Also:** None
- **GitHub Action:** `scribe.yml` — triggers on pull_request (opened, synchronize) targeting master/main
- **Scheduled Task:** Weekly Audit (6:00 PM Sundays)
- **Reads:** `docs/doc-inventory.md`, `module-map.md`, git diff for changeset
- **Outputs:** GitHub Issue titled "📝 Scribe: Docs may need updating" — table of stale docs vs. changed files; read-only, never modifies files
- **When to run manually:** After a large code change that touches multiple modules; before updating `docs/doc-inventory.md`

---

### Lighthouse — SEO, EEAT, AEO/GEO & Core Web Vitals

- **Command:** `/lighthouse`
- **Also:** Included in `/review-all` (source checks only; live CWV run is separate)
- **GitHub Action:** `lighthouse.yml` — triggers on push to master/main + workflow_dispatch
- **Scheduled Task:** Weekly (7:00 PM Sundays — configure if desired)
- **Reads:** `index.html`, `public/robots.txt`, `public/sitemap.xml`, legal components, `src/App.tsx`, `lessons.md`
- **Outputs:** SEO/meta tag audit, robots.txt + sitemap validation, heading hierarchy check, AEO/GEO signals (if applicable), EEAT assessment (experience/expertise/authority/trust), Core Web Vitals JSON to `docs/reports/lighthouse-YYYY-MM-DD.json`; GitHub Issue if regressions are detected
- **When to run manually:** Before any public launch; after changing `index.html`, meta tags, or legal content; monthly as a baseline check

---

### Review-All — Unified PR Merge Gate

- **Command:** `/review-all`
- **Also:** Orchestrates Eagle + Shield + Lighthouse in a single pass
- **GitHub Action:** `review-all.yml` — triggers on pull_request targeting master/main
- **Scheduled Task:** None
- **Reads:** All inputs for Eagle, Shield, and Lighthouse; `REVIEW.md`, `design-tokens.md`, `module-map.md`, `CLAUDE.md`, `lessons.md`
- **Outputs:** Single GitHub PR comment — Summary → Critical → Warnings → Info → Cross-Agent Conflicts → GO/CONDITIONAL GO/NO-GO verdict; writes `review-status.txt` (critical/warning/clean) to drive the check status; fails the CI check if any 🔴 Critical finding is present
- **When to run manually:** Before any significant merge to master/main; the GitHub Action runs it automatically on every PR, but `/review-all` can be run locally for a pre-PR check

---

## 3. Onboarding a New Project

Estimated time: 45–60 minutes for all 10 steps.

### Prerequisites
- Claude Code installed in VS Code
- GitHub CLI (`gh`) authenticated
- Netlify CLI connected (if using Netlify)
- New GitHub repo created, initial commit pushed

### Step 1 — Copy template files

```
cp -r /dev3/nestcalcv4/template/. /path/to/new-project/
```

Template structure (32 files):
```
template/
├── .claude/
│   ├── agents/
│   │   └── shield.md
│   ├── commands/           (14 command files)
│   │   ├── beacon-rules.md
│   │   ├── beacon.md
│   │   ├── changelog.md
│   │   ├── dep-audit.md
│   │   ├── eagle.md
│   │   ├── finance.md
│   │   ├── foundation.md
│   │   ├── handoff.md
│   │   ├── launch-gate.md
│   │   ├── launch-status.md
│   │   ├── lighthouse.md
│   │   ├── review-all.md
│   │   ├── scribe.md
│   │   └── shield.md
│   └── skills/
│       └── eagle-auto.md
├── .github/
│   └── workflows/          (7 workflow files)
│       ├── beacon-intake.yml
│       ├── eagle.yml
│       ├── finance.yml
│       ├── lighthouse.yml
│       ├── review-all.yml
│       ├── scribe.yml
│       └── shield.yml
├── CLAUDE.md
├── REVIEW.md
├── SETUP.md
├── design-tokens.md
├── feedback-log.md
├── lessons.md
├── docs/
│   ├── doc-inventory.md
│   └── reports/            (empty; Lighthouse writes here)
```

Note: `claude.yml` (interactive `@claude` mentions) is not in the template — copy it separately from an existing project if needed.

### Step 2 — Run Foundation interview

```
/foundation
```

Foundation scans your `src/`, `package.json`, and `netlify.toml` and pre-fills a 10-question architecture interview. Confirm or correct each answer. Foundation outputs the initial `CLAUDE.md`, `module-map.md`, and seeds `design-tokens.md`.

### Step 3 — Replace `{{PLACEHOLDER}}` tokens

After Foundation completes, open `CLAUDE.md` and replace any remaining `{{PLACEHOLDER}}` tokens:

| Token | Value |
|-------|-------|
| `{{PROJECT_NAME}}` | Your project name (e.g., "NestCalc") |
| `{{PROJECT_TAGLINE}}` | One-line description |
| `{{PROJECT_URL}}` | Production URL (e.g., `https://nestcalc.ai/`) |
| `{{PROJECT_REPO}}` | GitHub repo (e.g., `owner/repo`) |
| `{{PROJECT_STATE}}` | `idea` / `MVP` / `beta` / `v1` |
| `{{PROJECT_SRC}}` | Source root (typically `src`) |
| `{{MAIN_ENTRY_FILE}}` | Entry file (e.g., `main.tsx`) |
| `{{FRONTEND_FRAMEWORK}}` | e.g., `React 19 (SPA)` |
| `{{BUILD_TOOL}}` | e.g., `Vite 8 + TypeScript 5.9` |
| `{{HOSTING_PLATFORM}}` | e.g., `Netlify` |
| `{{DEV_START_CMD}}` | e.g., `npm run dev` |
| `{{DEV_BUILD_CMD}}` | e.g., `npm run build` |

Apply same token replacement to `REVIEW.md` and `design-tokens.md` if they retained any `{{PLACEHOLDER}}` values from the template.

### Step 4 — Clean up N/A sections

Remove template sections that don't apply to this project. Common deletions:
- Backend / serverless section (delete if frontend-only)
- Payments row (delete if no payment provider)
- Authentication row (delete if no auth)
- Database row (delete if no database)
- i18n / translation references (delete if single-language)
- `pages/` glob in `eagle-auto.md` (delete if no pages directory)

### Step 5 — Fill `[bracket]` tokens in command files

Command files (`.claude/commands/`) use `[bracket]` tokens for project-specific values. Key tokens to fill:

| Token | Where | Value |
|-------|-------|-------|
| `[PROJECT_SRC]` | `eagle.md`, `scribe.md` | Your source root |
| `[SITE_URL]` | `lighthouse.md` | Production URL |
| `[INDEX_HTML]` | `lighthouse.md` | `index.html` |
| `[STATIC_DIR]` | `lighthouse.md` | `public` |
| `[PERF_THRESHOLD]` | `lighthouse.md` | Performance score threshold (e.g., `≥ 70`) |
| `[LEGAL_ENTITY_NAME]` | `lighthouse.md` | Your business or brand name |

After filling, grep for remaining `[` tokens to confirm none were missed:
```
grep -n "\[" .claude/commands/lighthouse.md | grep -v "^\s*//"
```

### Step 6 — Create seed files

Create these four files (Foundation may have started them; verify and complete):

**`lessons.md`** (root) — seed with any known false positives from the initial Eagle/Shield runs. If none yet, copy the header format from an existing project and add `_None recorded yet._` in each section.

**`feedback-log.md`** (root) — must include `## Log` heading (required by `beacon-intake.yml`):
```markdown
# [Project] — Feedback Log

Beacon intake — feedback entries land here.

## Log

_No entries yet._

---
```

**`docs/doc-inventory.md`** — one row per source file. Columns: File, Type, Covered By, Last Verified. Run `/scribe` after seeding to validate coverage.

**`module-map.md`** (root) — directory tree, dependency table (which modules import which), locked files list, isolation notes.

### Step 7 — Configure GitHub Actions

For each `.github/workflows/*.yml`:

1. **Branch name** — replace `master` with `main` (or vice versa) in every `branches:` field
2. **Site URL** — set `SITE_URL` environment variable in `lighthouse.yml` to your production URL
3. **Secrets** — add `CLAUDE_CODE_OAUTH_TOKEN` to GitHub repo secrets (Settings → Secrets and variables → Actions)
4. **Permissions** — review the `permissions:` block in each workflow; `review-all.yml` requires `pull-requests: write`

Verify workflows are enabled in GitHub → Actions tab after first push.

### Step 8 — Set up cloud scheduled tasks

Go to [claude.ai/code/scheduled](https://claude.ai/code/scheduled) and create:

| Task | Schedule | Command / Prompt |
|------|----------|-----------------|
| Beacon Daily Triage | 7:30 AM daily | `/beacon` |
| Beacon Weekly Digest | 8:00 AM Monday | `/beacon-rules` |
| Scribe Weekly Audit | 6:00 PM Sunday | `/scribe` |
| Lighthouse Weekly | 7:00 PM Sunday | `/lighthouse` (optional — if scheduled.yml not configured) |

Point each task at the correct project working directory.

### Step 9 — Run validation

Run against one representative component:
```
/lighthouse
/eagle [path/to/a/section-component.tsx]
```

Check for:
- Lighthouse: all required meta tags present, robots.txt found, no 🔴 Critical SEO gaps
- Eagle: correct token usage, no false positives on known exceptions

Document any false positives in `lessons.md` immediately.

### Step 10 — Capture baseline snapshot

```
/finance
```

This establishes the initial `finance-report.md` bundle baseline. All future Finance runs compare against this. Also run:
```
git add -A && git commit -m "chore: install NokYai review stack v1.0"
```

---

## 4. Daily Operations

### Automatic (no action needed)

| Time | What runs | Where to see output |
|------|-----------|---------------------|
| 7:30 AM | Beacon Daily Triage — reads `feedback-log.md`, categorizes new entries, saves `beacon-triage.md` | `beacon-triage.md` in project root |
| On every PR | Shield, Eagle — post individual findings comments | GitHub PR comments |
| On PR to master/main | Review-All — unified Eagle + Shield + Lighthouse gate comment + CI check status | GitHub PR comments; fails check if 🔴 Critical |
| On issue labeled "feedback" | Beacon Intake — prepends entry to `feedback-log.md` | `feedback-log.md` committed by bot |

### Manual daily actions

- **Before merging any PR:** Confirm Review-All passed (green CI check). If it failed (Critical), fix before merging.
- **After a UI component change:** Eagle auto-review triggers on file save. If it misses something, run `/eagle [file]` manually.
- **After a new GitHub issue:** Label it "feedback" to trigger Beacon Intake automatically.

---

## 5. Weekly Operations

### Monday

| Time | What runs | Action needed |
|------|-----------|---------------|
| 8:00 AM | Beacon Weekly Digest (`/beacon-rules`) — scans for patterns in `feedback-log.md` (3+ similar entries) | Review output; accept or reject proposed rule additions to `REVIEW.md` |
| 1:00 PM UTC | Finance GitHub Action — runs bundle analysis, saves `finance-report.md` | Check for size regressions or new vulnerabilities; no action if clean |

### Sunday

| Time | What runs | Action needed |
|------|-----------|---------------|
| 6:00 PM | Scribe Weekly Audit — compares recent code changes to `docs/doc-inventory.md` | Check GitHub Issues for "📝 Scribe" issues; update stale docs |
| 7:00 PM | Lighthouse Weekly (if configured) — SEO/CWV audit | Check GitHub Issues for Lighthouse regressions |

### Manual weekly

- **Review Monday's Beacon digest** — add approved rules to `REVIEW.md`; close or defer items
- **Check open GitHub Issues** created by agents — triage and schedule
- **Run `/dep-audit`** if any dependencies were added or updated during the week

---

## 6. Release Workflow

Follow these steps when shipping a new version:

1. **Open a PR** — Review-All triggers automatically (Eagle + Shield + Lighthouse gate)
2. **Resolve any 🔴 Critical findings** — merge is blocked until clean
3. **Merge to master/main** — GitHub Actions run: Shield, Eagle confirm, Lighthouse records new baseline
4. **Generate release notes:**
   ```
   /changelog
   ```
   Changelog reads git history since the last tag and prepends to `CHANGELOG.md`
5. **Check doc coverage:**
   ```
   /scribe
   ```
   Confirm no docs went stale from the release changes
6. **Update handoff document:**
   ```
   /handoff
   ```
   Creates or updates a handoff doc for continuity or collaborator onboarding
7. **Tag the release:**
   ```
   git tag v[X.Y.Z] && git push origin v[X.Y.Z]
   ```

---

## 7. Scheduled Tasks Reference

All cloud tasks are configured at [claude.ai/code/scheduled](https://claude.ai/code/scheduled).

| Task | Schedule | Platform | What It Does |
|------|----------|----------|-------------|
| Beacon Daily Triage | 7:30 AM daily | claude.ai/code/scheduled | Reads `feedback-log.md`; categorizes uncategorized/unscored entries; saves `beacon-triage.md` with priority summary |
| Beacon Weekly Digest | 8:00 AM Mondays | claude.ai/code/scheduled | Runs `/beacon-rules`; identifies patterns (3+ similar entries); drafts new REVIEW.md rules for manual review |
| Scribe Weekly Audit | 6:00 PM Sundays | claude.ai/code/scheduled | Runs `/scribe`; compares recent code changes to `docs/doc-inventory.md`; creates GitHub Issue if stale docs found |
| Lighthouse Weekly | 7:00 PM Sundays | claude.ai/code/scheduled | Runs `/lighthouse`; full SEO/EEAT/CWV audit; creates GitHub Issue if regressions detected |
| Finance Monday | 1:00 PM UTC Mondays | GitHub Actions (`finance.yml`) | Bundle size + dependency health; saves `finance-report.md`; compares to prior run |

---

## 8. GitHub Actions Reference

| Workflow | File | Trigger | What It Does | Failure Action |
|----------|------|---------|--------------|----------------|
| Shield | `shield.yml` | PR opened/synchronized | Reviews code files in changeset for security, logic errors, architectural violations | Posts PR comment; does not block merge alone |
| Eagle | `eagle.yml` | PR opened/synchronized | Reviews UI component files for design token compliance, accessibility, responsive issues | Posts PR comment; does not block merge alone |
| Review-All | `review-all.yml` | PR targeting master/main | Runs Eagle + Shield + Lighthouse together; posts unified verdict; writes `review-status.txt` | Fails CI check and blocks merge on 🔴 Critical |
| Scribe | `scribe.yml` | PR to master/main opened/synchronized | Checks changed files against `docs/doc-inventory.md` for stale documentation | Creates GitHub Issue; does not block merge |
| Lighthouse | `lighthouse.yml` | Push to master/main + manual dispatch | Runs source SEO checks + live CWV audit; saves JSON report to `docs/reports/` | Creates GitHub Issue on regression; does not block merge |
| Finance | `finance.yml` | Monday 1:00 PM UTC + manual dispatch | Bundle analysis + `npm audit` + `npm outdated`; saves `finance-report.md` | No automatic failure action; report is informational |
| Beacon Intake | `beacon-intake.yml` | Issue opened or labeled "feedback" | Prepends formatted entry to `feedback-log.md`; commits via bot | Fails if `## Log` heading is missing from `feedback-log.md` |
| Claude Code | `claude.yml` | `@claude` mentioned in PR/issue comments | Claude responds to `@claude` mentions inline | Replies with findings or task output in-thread |

All workflows require `CLAUDE_CODE_OAUTH_TOKEN` secret in GitHub repo settings (except `claude.yml` which uses the same token for interactive use). All agent workflows use `--dangerously-skip-permissions` in `claude_args` to allow full tool access in the CI sandbox.

---

## 9. Template Directory Reference

Location: `/dev3/nestcalcv4/template/`  
Total files: 32

Files marked **★ Customize** need project-specific values. Files marked **Ready** can be used as-is after token replacement.

```
template/
├── .claude/
│   ├── agents/
│   │   └── shield.md                ★ Customize — update file path globs if src structure differs
│   ├── commands/
│   │   ├── beacon-rules.md          Ready
│   │   ├── beacon.md                Ready
│   │   ├── changelog.md             Ready
│   │   ├── dep-audit.md             Ready
│   │   ├── eagle.md                 ★ Customize — [PROJECT_SRC], remove pages/ if no pages dir
│   │   ├── finance.md               Ready
│   │   ├── foundation.md            Ready
│   │   ├── handoff.md               Ready
│   │   ├── launch-gate.md           Ready
│   │   ├── launch-status.md         Ready
│   │   ├── lighthouse.md            ★ Customize — [SITE_URL], [INDEX_HTML], [STATIC_DIR], [PERF_THRESHOLD], [LEGAL_ENTITY_NAME]; add project-type gate for AEO if LP
│   │   ├── review-all.md            ★ Customize — update branch name, site URL references
│   │   ├── scribe.md                ★ Customize — [PROJECT_SRC]
│   │   └── shield.md                Ready
│   └── skills/
│       └── eagle-auto.md            ★ Customize — remove pages/ glob if no pages dir; update lessons.md false-positive note if needed
├── .github/
│   └── workflows/
│       ├── beacon-intake.yml        ★ Customize — no changes needed unless repo structure differs
│       ├── eagle.yml                ★ Customize — update branches: [main|master]
│       ├── finance.yml              ★ Customize — update branches if needed; cron is Mondays 1PM UTC
│       ├── lighthouse.yml           ★ Customize — update branches: [main|master], SITE_URL
│       ├── review-all.yml           ★ Customize — update branches: [main|master]
│       ├── scribe.yml               ★ Customize — update branches: [main|master]
│       └── shield.yml               ★ Customize — update branches: [main|master]
├── CLAUDE.md                        ★ Customize — all {{PLACEHOLDER}} tokens
├── REVIEW.md                        ★ Customize — project-specific rules (§1 Eagle, §2 Shield, §3 Lighthouse)
├── SETUP.md                         Ready — onboarding reference
├── design-tokens.md                 ★ Customize — your actual color palette, typography, spacing
├── feedback-log.md                  Ready — keep `## Log` heading (required by beacon-intake.yml)
├── lessons.md                       Ready — seed with known false positives after first run
└── docs/
    ├── doc-inventory.md             ★ Customize — list your actual source files
    └── reports/                     Ready — Lighthouse writes JSON reports here
```

Note: `claude.yml` (`@claude` interactive mentions) is not in the template. Copy it from an existing project (`nestcalcv4/.github/workflows/claude.yml` or `nokyai-lp/.github/workflows/claude.yml`).

---

## 10. Configuration Files Reference

| File | Purpose | Read By | When to Update |
|------|---------|---------|----------------|
| `CLAUDE.md` | Project identity, architecture, coding conventions, locked files, known issues | Foundation, Shield, Eagle, Scribe, Lighthouse, Review-All | After any architectural change; add to "Known Issues" as decisions are made |
| `REVIEW.md` | Review rules for all agents; §1 Eagle, §2–4 Shield, §5 Beacon-promoted rules | Shield, Eagle, Scribe, Lighthouse, Review-All | After `/beacon-rules` promotes a new pattern; after any false positive is confirmed and categorized |
| `design-tokens.md` | Canonical design system: colors, typography, spacing, component patterns, documented exceptions | Eagle, eagle-auto.md skill | After any design decision; add new tokens before using them in code; document hard-coded exceptions |
| `module-map.md` | Directory tree, module dependencies, locked files, isolation notes | Shield, Scribe | After adding new components, hooks, or changing the directory structure |
| `docs/doc-inventory.md` | Maps every source file to its covering documentation | Scribe | After adding new source files; after updating docs; run `/scribe` after updating to verify |
| `lessons.md` | Known false positives, missed issues, pattern updates for Eagle, Shield, and Lighthouse | Eagle, Shield, Lighthouse, eagle-auto.md skill | After any confirmed false positive; after a production bug that an agent should have caught |
| `feedback-log.md` | Raw user feedback entries; auto-populated by `beacon-intake.yml` on labeled issues | Beacon, beacon-rules | Auto-updated by GitHub Action; manually add entries that come in via email or other channels |
| `SETUP.md` | Onboarding steps and placeholder reference for new projects using the template | Human reference only | When the setup process changes; not read by agents |

---

## 11. Controller Agent — Activation Criteria

**Status: PARKED**

The Controller agent is defined but not active. You are currently the controller: the Monday Beacon digest + Review-All merge gate + manual triage is sufficient for 1–2 projects.

**Activate Controller when ANY of these conditions are met:**

- 3 or more active projects are all running the full 8-agent stack simultaneously
- Agent recommendations conflict across projects and manual resolution takes more than 15 minutes per week
- Cross-project prioritization (which project gets attention this week) becomes a recurring bottleneck
- Cloud scheduled task count exceeds 10 across all projects
- You are onboarding a second team member who needs a single coordination layer

**Until then:** The PARKED state is correct. Activating Controller early adds overhead without benefit for a single builder with 1–2 projects.

---

## 12. Troubleshooting

### GitHub Action fails on first run
**Symptom:** Workflow fails immediately, no agent output.  
**Fix:** Verify `CLAUDE_CODE_OAUTH_TOKEN` secret is set in the repo (Settings → Secrets and variables → Actions). Verify `claude_args: "--dangerously-skip-permissions"` is present in the workflow YAML — without it, all tool calls are denied in the CI sandbox.

### Branch name mismatch
**Symptom:** Workflows don't trigger on PRs or push.  
**Fix:** Check `branches:` in each workflow YAML. NestCalc uses `master`; NokYai LP uses `main`. Mismatch means the trigger never fires.

### `beacon-intake.yml` fails with "## Log heading not found"
**Symptom:** The bot commit step errors.  
**Fix:** Open `feedback-log.md` and verify the exact string `## Log` exists on its own line. The Python script does a literal string search — extra spaces or different heading level will break it.

### Agent command reads wrong file path
**Symptom:** Agent reports a file as missing that exists.  
**Fix:** Check for unfilled `[bracket]` tokens in the command file. Run a grep:
```
grep -n "\[" .claude/commands/[command].md | grep -v "^\s*//"
```
Any bracket token that isn't a regex character class or JavaScript accessor needs to be filled.

### Eagle flags raw hex that's actually a documented token
**Symptom:** Eagle reports a design token violation on a color that exists in `design-tokens.md`.  
**Fix:** Add the exception to `lessons.md` under "False Positives". Eagle reads `lessons.md` at the start of every run and skips known exceptions.

### Scribe creates GitHub Issues for files that are actually documented
**Symptom:** Scribe reports stale docs for a file that has current documentation.  
**Fix:** Update `docs/doc-inventory.md` — add the file with the covering doc and a current date. Scribe's source of truth is `doc-inventory.md`, not the docs themselves.

### Lighthouse weekly doesn't run
**Symptom:** No Lighthouse output on Sundays.  
**Fix:** Verify the cloud scheduled task at [claude.ai/code/scheduled](https://claude.ai/code/scheduled) is active and pointed at the correct project directory. Also confirm `lighthouse.yml` in GitHub Actions is not failing — the cloud task and GitHub Action are separate.

### Review-All blocks merge but findings seem incorrect
**Symptom:** CI fails with Critical findings that don't match the code.  
**Fix:** Check if the same issue was flagged by both Eagle and Shield (it should be deduplicated but may not be). Open the PR comment, read the full findings table, and check `review-status.txt` in the workflow logs. If the finding is a confirmed false positive, add it to `lessons.md` and re-run the PR.

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-14 | Initial release — 8 active agents (Foundation, Launch, Shield, Eagle, Finance, Beacon, Scribe, Lighthouse), Controller parked; template validated on NokYai LP; `eagle-auto.md` skill added to template and LP; 4 missing LP config files created; `claude.yml` deployed to LP |
