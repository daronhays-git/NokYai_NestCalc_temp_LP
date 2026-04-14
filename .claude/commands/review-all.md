# Template — customize for your project. See SETUP.md for placeholder reference.

# /review-all — Master Review: Eagle + Shield + Lighthouse

## Purpose
Orchestrates all three review agents against the same changeset and produces a single unified report. Eagle covers design token compliance, accessibility, and responsive patterns. Shield covers security, logic, error handling, performance, and architecture. Lighthouse covers SEO metadata, structured data, AEO/GEO signals, and EEAT signals (source-level only). Read-only — no file modifications.

Run `/review-all` before any merge to master, before a release build, or any time you want a full-spectrum health check in a single pass.

---

## Files to Read Before Running

### Shared context (read once — used by all three agents)
1. `REVIEW.md` — full checklist; governs Eagle (Design Token Compliance, Accessibility sections), Shield (Module Isolation, Security Patterns, Performance Standards sections), and any Beacon-generated rules (§Beacon-Generated Rules)
2. `design-tokens.md` — canonical color, typography, spacing, and component patterns (Eagle primary source)
3. `module-map.md` — locked file list, component inventory, backend function list (Shield primary source)
4. `CLAUDE-AGENTS.md` — agent role definitions and what each agent checks
5. `CLAUDE.md` — dev conventions, active file paths, locked files
6. `lessons.md` — known false positives to skip; read before any Eagle or Shield finding is filed

### Lighthouse source files (read during Phase 4)
7. `[INDEX_HTML]` — SEO meta tags, OG tags, canonical, hreflang, JSON-LD structured data
8. `[STATIC_DIR]/robots.txt` — crawler directives and sitemap pointer
9. `[STATIC_DIR]/sitemap.xml` — URL inventory; cross-reference against `[STATIC_DIR]/`
10. `[STATIC_DIR]/[CONTENT_PAGE]` — richest content page; AEO/GEO primary target
11. `[PROJECT_SRC]/components/[LEARN_COMPONENT]` — in-app learning/content component; AEO signal check only (not crawlable)
12. `[PROJECT_SRC]/components/[LEGAL_COMPONENT]` — EEAT trust check: legal entity, jurisdiction, contact
13. `[APP_ENTRY]` — EEAT trust check: footer link inventory
14. `[PROJECT_SRC]/i18n/translations.js` — EEAT content specificity check: generic vs. practitioner language

---

## Severity Model

Each agent uses different severity language. Normalize all findings to a unified tier before building the report.

| Eagle | Shield | Lighthouse | Unified tier |
|-------|--------|------------|--------------|
| `error` | `Critical` | `❌` (not a known baseline gap) | 🔴 **Critical** |
| `warn` | `Major` | `❌` (known baseline gap per lessons.md) | 🟡 **Warning** |
| `info` | `Minor` | `⚠️` | 🟡 **Warning** |
| — | — | informational ✅ notes worth surfacing | 🔵 **Info** |

**Known baseline gaps** (do not escalate to Critical; flag as Warning): Any finding explicitly documented as a known gap in `lessons.md` that persists run-to-run. Escalate to Critical only if a baseline gap has *regressed* (i.e., a previously-passing check now fails).

**Duplicate suppression**: if Eagle and Shield both flag the same file+line for the same underlying rule (e.g., a raw color value is covered by both REVIEW.md Design Token Compliance and a Beacon-generated rule), merge into one row and note both agent sources.

**Scope boundaries — not duplicates**: Eagle checks heading hierarchy in React JSX components (REVIEW.md §Accessibility, semantic `<h1>`–`<h4>` usage in rendered output). Lighthouse Step 5 checks heading hierarchy in static HTML files (`[STATIC_DIR]/[CONTENT_PAGE]`). These scan *different files* — a non-semantic section heading in `[STATIC_DIR]/[CONTENT_PAGE]` is a Lighthouse finding only; Eagle does not independently check that file. Do not file the same heading gap under both agents.

**Within 🟡 Warning — priority order**: Code findings (Eagle/Shield Major) take precedence over SEO/content findings (Lighthouse ⚠️) in the CONDITIONAL GO caveat list. A missing `useMemo` is more likely to cause a production bug than a meta description 12 chars over the ideal length. Sort the caveat list with `CODE:` items before `SEO:` items.

---

## Steps

### Phase 1 — Determine Scope and Load Context

**Step 1 — Resolve scope**

If an argument was passed, use it as the target:
- A file path (e.g., `[PROJECT_SRC]/components/Foo.jsx`) — review that file in full
- A commit SHA or range (e.g., `HEAD~3..HEAD`, `main..feature-branch`) — review every file changed in the range
- No argument — default to `HEAD` (the most recent commit)

Run:
```
git -C [PROJECT_PATH] diff HEAD~1 HEAD --name-only
```
(adjust for the target range). This is the **changeset** for Eagle and Shield. Lighthouse always reads its fixed file list regardless of scope.

**Step 2 — Load shared context**

Read all 6 shared files listed above. Note any findings from `lessons.md` that should suppress a specific Eagle or Shield check — apply those suppressions throughout Phases 2 and 3.

---

### Phase 2 — Eagle Checks (Design & Accessibility)

Run every check in eagle.md against the UI files in the changeset (`.jsx`, `.tsx`, `.js` files under `[PROJECT_SRC]/components/` and `[PROJECT_SRC]/pages/`). If no UI files were changed, skip Phase 2 and note "Eagle: no UI files in scope."

**Step 3 — Design token compliance** (REVIEW.md §Design Token Compliance, design-tokens.md)
- Colors: all values must trace to the documented token palette in `design-tokens.md`. Flag raw hex not in `design-tokens.md` as Eagle `error` (→ 🔴 Critical); document any hard-coded color exceptions in `lessons.md` as passes.
- Typography: font-family, font-size, font-weight, line-height must match the documented type scale. Flag values outside range as Eagle `warn` (→ 🟡 Warning).
- Spacing, border radius, shadows: must match documented component patterns. Flag magic numbers as Eagle `warn` (→ 🟡 Warning).
- Also apply any Beacon-generated rules in REVIEW.md §Beacon-Generated Rules.

**Step 4 — Accessibility** (REVIEW.md §Accessibility)
- Images: `<img>` without a meaningful `alt` → Eagle `error` (→ 🔴 Critical).
- Interactive elements: buttons/links/inputs without accessible names → Eagle `error` (→ 🔴 Critical).
- Form inputs without `<label>` or `aria-label` → Eagle `warn` (→ 🟡 Warning).
- Color contrast violations against WCAG AA 4.5:1 → Eagle `warn` (→ 🟡 Warning).
- Tab order, focus indicators, touch targets (46px min) → Eagle `info` (→ 🔵 Info).

**Step 5 — Responsive patterns** (REVIEW.md §Performance Standards Mobile)
- Font sizes in `px` for body text → Eagle `warn` (→ 🟡 Warning).
- Horizontal scroll introduced outside the tab nav bar → Eagle `error` (→ 🔴 Critical).
- Inconsistent breakpoint values → Eagle `info` (→ 🔵 Info).

---

### Phase 3 — Shield Checks (Security, Logic, Performance, Architecture)

Run every check in shield.md against all files in the changeset. If the changeset is empty or only touches docs/markdown, note "Shield: no code changes in scope" and skip.

**Step 6 — Security** (REVIEW.md §Security Patterns)
- Secrets or service-role credentials behind a public env var prefix → Shield `Critical` (→ 🔴 Critical).
- External API calls from `[PROJECT_SRC]` (not proxied through `[SERVERLESS_PATH]`) → Shield `Critical` (→ 🔴 Critical).
- Missing payment provider webhook signature verification → Shield `Critical` (→ 🔴 Critical).
- Database client instantiated inline or raw queries from frontend → Shield `Critical` (→ 🔴 Critical).
- `dangerouslySetInnerHTML` on untrusted content → Shield `Critical` (→ 🔴 Critical).
- Wildcard CORS in production functions → Shield `Major` (→ 🟡 Warning).
- Missing auth validation utility on authenticated endpoints → Shield `Major` (→ 🟡 Warning).
- Also apply any Beacon-generated rules in REVIEW.md §Beacon-Generated Rules.

**Step 7 — Error handling** (shield.md §Error Handling)
- Unhandled promise rejections on fetch/database/payment provider calls → Shield `Major` (→ 🟡 Warning).
- Silent `catch {}` blocks with no logging or user feedback → Shield `Major` (→ 🟡 Warning).
- Missing graceful degradation when serverless calls fail → Shield `Minor` (→ 🔵 Info).

**Step 8 — Logic** (shield.md §Logic)
- Any change near core calculation functions listed in `module-map.md` → Shield `Critical` (→ 🔴 Critical); these are locked.
- `useState` setters called during render → Shield `Major` (→ 🟡 Warning).
- Race conditions in async effects without cancellation guards → Shield `Major` (→ 🟡 Warning).
- Hooks after conditional returns → Shield `Critical` (→ 🔴 Critical).

**Step 9 — Performance** (REVIEW.md §Performance Standards)
- Expensive computation without `useMemo` → Shield `Major` (→ 🟡 Warning).
- Tab conditional content moved outside the `activeTab === "..."` guard → Shield `Major` (→ 🟡 Warning).
- New external dependency added without justification → Shield `Major` (→ 🟡 Warning).
- `await` inside render paths → Shield `Major` (→ 🟡 Warning).

**Step 10 — Architecture** (REVIEW.md §Module Isolation)
- Modifications to locked files without explicit unlock → Shield `Critical` (→ 🔴 Critical).
- New feature added directly to `[APP_ENTRY]` instead of its own component file → Shield `Major` (→ 🟡 Warning).
- Edits to any legacy source copy directory instead of `[PROJECT_SRC]` → Shield `Critical` (→ 🔴 Critical).
- Import convention violations (theme constants imported directly, payment provider called from component, etc.) → Shield `Minor` (→ 🔵 Info).

---

### Phase 4 — Lighthouse Checks (SEO, AEO/GEO, EEAT — source-level only)

Run Lighthouse steps 1–15 from lighthouse.md. Step 16 (Core Web Vitals CLI run) is **skipped** if the site is not publicly accessible — note this in the report. Lighthouse checks apply regardless of the Eagle/Shield scope; they always read the fixed file list.

**SEO: Meta tags and structured data** (lighthouse.md Steps 1–2)
Read `[INDEX_HTML]`. Check all required meta tags, OG tags, Twitter Card, hreflang, and JSON-LD blocks. Map results: absent required element → ❌ (→ 🔴 Critical); suboptimal but present → ⚠️ (→ 🟡 Warning).

**SEO: Dynamic title, sitemap, robots** (lighthouse.md Steps 3–4)
Check for react-helmet usage; verify robots.txt directives; cross-reference sitemap.xml URLs against `[STATIC_DIR]/` files. SPA routes in sitemap with no HTML file → ⚠️ (→ 🟡 Warning, known baseline).

**SEO: Heading hierarchy in static HTML** (lighthouse.md Step 5)
Check `[STATIC_DIR]/[CONTENT_PAGE]` for heading skips and duplicate `<h1>`. **Scope note:** this check covers static HTML files only. Eagle Step 4 covers heading hierarchy in React JSX components. These are complementary, not duplicated — any non-semantic section heading gap is a Lighthouse finding only; do not file it under Eagle.

**AEO/GEO** (lighthouse.md Steps 6–10)
Check for JSON-LD on `[STATIC_DIR]/[CONTENT_PAGE]`, definitional opening paragraphs, authoritative sourcing language, extractable content structures (formula/equation blocks, tables, lists), and citation-ready headings.

**EEAT** (lighthouse.md Steps 11–15)
Check for experience signals (concrete [DOMAIN_EXPERTISE] scenario-level examples), expertise signals (author bio / About page), authority signals (legal entity, contact, Organization schema), trust signals (SSL, full footer link inventory, legal entity in legal component), and content specificity (practitioner language vs. generic consumer copy).

---

### Phase 5 — Merge Findings

**Step 23 — Normalize and deduplicate**

Collect all raw findings from Phases 2–4. For each finding:
1. Apply the severity model above to assign the unified tier (🔴 / 🟡 / 🔵).
2. Prefix the finding with the agent emoji: 🦅 Eagle | 🛡️ Shield | 🏠 Lighthouse.
3. If Eagle and Shield flagged the same file+line for the same underlying rule, merge into one row with both prefixes (🦅🛡️) and the higher severity.
4. Sort within each tier: Shield Critical first, then Eagle Critical, then Lighthouse Critical; repeat for Warning and Info.

**Step 24 — Count totals**

`Total findings = Critical count + Warning count + Info count`

Per-agent pass/fail:
- Eagle: PASS if zero 🔴 Critical; NEEDS ATTENTION if any 🟡 Warning; FAIL if any 🔴 Critical.
- Shield: PASS if zero 🔴 Critical; NEEDS ATTENTION if any 🟡 Warning; FAIL if any 🔴 Critical.
- Lighthouse: PASS if zero 🔴 Critical findings (new, non-baseline); NEEDS ATTENTION if any 🟡 Warning (including baseline gaps); FAIL if a baseline check has regressed (previously ✅ now ❌).

---

### Phase 6 — Cross-Agent Conflict Detection

**Step 25 — Check for contradictions**

Scan the merged findings list for any of these conflict patterns:

| Conflict type | Example | How to flag |
|--------------|---------|-------------|
| Same file+line, contradictory rulings | Eagle passes a color token, Shield flags the same line under a Beacon rule | Flag: which agent is correct per the governing rule; the stricter rule wins |
| Overlapping rules producing different recommendations | Eagle recommends one fix, Shield recommends an incompatible fix for the same issue | Flag: present both recommendations; note which REVIEW.md section takes precedence |
| One agent scopes out a file the other flags | Changeset has no UI files (Eagle skipped), but Shield flags a style violation in a non-component JS file | Flag: note the scope gap; a manual Eagle check on that file is warranted |
| Lighthouse structural gap also affects Eagle scope | SPA routes in sitemap (Lighthouse ⚠️) are also un-reviewable by Eagle since they have no JSX source | Flag: note dual impact |
| Heading hierarchy — apparent overlap, different scopes | Both Eagle (REVIEW.md §Accessibility) and Lighthouse (Step 5) check heading structure | Not a conflict — Eagle checks JSX components, Lighthouse checks static HTML. Do NOT merge or deduplicate; note which file each finding is in. Only flag as a conflict if Eagle and Lighthouse reach contradictory conclusions about the *same* file (not possible under normal scope rules). |

If no conflicts found: "None — findings are complementary with no contradictions."

---

### Phase 7 — Produce the Report

**Step 26 — Write the unified report** using the output format below.

**Step 27 — GO / NO-GO decision**

Evaluate:
- Any 🔴 Critical findings (excluding known baseline gaps from lessons.md that have not regressed) → **NO-GO**
- Zero 🔴 Critical, one or more 🟡 Warnings → **CONDITIONAL GO**
- Zero 🔴 Critical, zero 🟡 Warnings (only 🔵 Info or clean) → **GO**

---

## Output Format

```markdown
## Review-All Report — [YYYY-MM-DD]

**Scope:** [HEAD / file path / commit range]
**Agents run:** 🦅 Eagle · 🛡️ Shield · 🏠 Lighthouse (Steps 1–15; Step 16 CWV skipped — [reason: site not publicly accessible / pending domain setup])

---

### Summary

Total findings: X (Y critical, Z warnings, W info)
Agents reporting: Eagle [PASS/NEEDS ATTENTION/FAIL] · Shield [PASS/NEEDS ATTENTION/FAIL] · Lighthouse [PASS/NEEDS ATTENTION/FAIL]

---

### 🔴 Critical (must fix before merge)

| Agent | File | Line | Category | Finding | Rule | Recommendation |
|-------|------|------|----------|---------|------|----------------|
| 🛡️ | [PROJECT_SRC]/components/Foo.jsx | 42 | Security | Secret key referenced via public env var prefix — exposed to browser bundle | REVIEW.md §Security Patterns | Move to [SERVERLESS_PATH]/; use a non-public env var |
| 🦅 | [PROJECT_SRC]/components/Bar.jsx | 87 | Accessibility | <img> has empty alt attribute | REVIEW.md §Accessibility | Add meaningful alt text describing the image content |

If none: `None — no critical findings.`

---

### 🟡 Warnings (should fix)

| Agent | File | Line | Category | Finding | Rule | Recommendation |
|-------|------|------|----------|---------|------|----------------|
| 🏠 | [INDEX_HTML] | — | SEO | meta description is [N] chars — exceeds 160-char ideal | lighthouse.md Step 1 | Trim to ≤ 160 chars |
| 🦅 | [PROJECT_SRC]/components/Baz.jsx | 203 | Typography | Font size 14px — use rem values within the documented scale | REVIEW.md §Design Token Compliance | Change to 0.875rem |

If none: `None — no warnings.`

---

### 🔵 Info (consider)

| Agent | File | Line | Category | Finding |
|-------|------|------|----------|---------|
| 🏠 | [STATIC_DIR]/[CONTENT_PAGE] | — | AEO | Section titles use non-semantic <div> not <h2> — known baseline gap (see lessons.md) | lighthouse.md Step 10 |
| 🛡️ | [PROJECT_SRC]/components/Qux.jsx | 14 | Architecture | Imports theme constant directly — use theme prop per REVIEW.md §Module Isolation |

If none: `None — no informational findings.`

---

### ⚡ Cross-Agent Conflicts

[One paragraph per conflict. Format: "**[File:Line]** — [Agent A] finds X; [Agent B] finds Y. These are [contradictory / overlapping]. Resolution: [which rule takes precedence and why]."]

If none: `None — findings are complementary with no contradictions.`

---

### Agent Summaries

**🦅 Eagle** — [PASS / NEEDS ATTENTION / FAIL]
Checked: [N] UI files · [N] design token checks · [N] accessibility checks · [N] responsive checks
Findings: [N] critical, [N] warnings, [N] info
[One sentence: what passed cleanly and what the top issue was, if any.]

**🛡️ Shield** — [PASS / NEEDS ATTENTION / FAIL]
Checked: [N] files in changeset · security · error handling · logic · performance · architecture
Findings: [N] critical, [N] warnings, [N] info
[One sentence: overall code quality signal and most important finding.]

**🏠 Lighthouse** — [PASS / NEEDS ATTENTION / FAIL]
Checked: SEO (Steps 1–5) · AEO/GEO (Steps 6–10) · EEAT (Steps 11–15) · CWV: skipped
Findings: [N] critical, [N] warnings, [N] info (including [N] known baseline items)
[One sentence: SEO/AEO/EEAT overall health and highest-priority open item.]

---

### ⬛ / 🟢 / 🔴 GO / NO-GO

**[GO / CONDITIONAL GO / NO-GO]**

[If GO:]
All three agents pass. No critical findings, no warnings requiring pre-merge action. Proceed.

[If CONDITIONAL GO:]
No critical blockers. Address `CODE:` items before the next release; `SEO:` items before public launch.
Caveats (CODE items first, then SEO):
- CODE: [Eagle/Shield warning — file:line — one-sentence fix]
- SEO: [Lighthouse warning — location — one-sentence fix]

[If NO-GO:]
Blocked. Resolve the following before merging:
1. [Critical finding 1 — file:line — one-sentence fix]
2. [Critical finding 2 — file:line — one-sentence fix]
```

---

## How to Run

**Default — full review of the most recent commit:**
```
/review-all
```

**Specific file (runs Eagle + Shield on that file; Lighthouse always reads its fixed list):**
```
/review-all [PROJECT_SRC]/components/SomeComponent.jsx
```

**Commit range:**
```
/review-all HEAD~5..HEAD
/review-all main..feature-branch
```

**Rules while running:**
1. Read `REVIEW.md` and `lessons.md` before Phase 2 and Phase 3 — both change as new patterns are documented.
2. Phase 2 (Eagle) only covers files in `[PROJECT_SRC]/components/` and `[PROJECT_SRC]/pages/`. If no UI files appear in the changeset, skip Eagle and note it — do not scan the full codebase.
3. Phase 4 (Lighthouse) always runs against its fixed file list regardless of scope — it is not limited to the changeset.
4. Lighthouse Step 16 (CWV) requires the live site to be publicly accessible. Skip and note the reason if the site is behind authentication or domain setup is incomplete.
5. Known Lighthouse baseline gaps are documented in `lessons.md`. Flag them as 🟡 Warning, not 🔴 Critical, unless they have regressed.
6. The Cross-Agent Conflicts section is required every run. If Eagle is skipped (no UI files), note the scope gap there — do not leave the section blank.
7. GO/NO-GO is a single word at the top of its section, followed by the structured explanation. Do not bury the verdict in prose.
8. Do not modify any source files. Review-All is read-only; all fixes go through the normal edit flow.
9. When running git commands, always use `git -C [PROJECT_PATH]` instead of `cd <path> && git ...`.
10. The per-agent summaries must include pass/fail counts. "Eagle passed" without counts is not acceptable.
