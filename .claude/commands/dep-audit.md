# Template — customize for your project. See SETUP.md for placeholder reference.

# /dep-audit — Dependency Health Audit

## Purpose
Audit all production dependencies for staleness, deprecation, security vulnerabilities, and bundle weight. For heavy or problematic packages, suggest lighter alternatives with size comparisons and migration effort. Save a prioritized report to `docs/reports/dep-audit.md`.

Read-only — no modifications to `package.json`, lock files, or installed packages.

---

## Files to Read Before Running

1. `package.json` — primary input; all `dependencies` and `devDependencies`
2. `package-lock.json` or `yarn.lock` — for resolved (installed) versions vs. declared ranges
3. `docs/reports/dep-audit.md` — previous run if it exists; used to flag regressions (new vulnerabilities or packages that have grown since the last audit)

---

## What Dep-Audit Does

### Step 1 — Inventory All Production Dependencies

Read `package.json`. List every entry under `dependencies` (production) and `devDependencies` (development). For each package, record:
- Declared version range (from `package.json`)
- Installed version (from `package-lock.json` or `node_modules/<pkg>/package.json`)

Count totals:
- `prod_count` — entries in `dependencies`
- `dev_count` — entries in `devDependencies`
- `total_count` — sum of both

---

### Step 2 — Check for Outdated Packages

Run:
```
npm outdated --json
```

For each result, classify the version gap:
- **Major** — `latest` major > `current` major (e.g., `1.x` → `2.x`)
- **Minor** — same major, `latest` minor > `current` minor
- **Patch** — same major.minor, `latest` patch > `current` patch

If `npm` is not available in the current environment, note it and skip this step — do not fabricate version data.

---

### Step 3 — Check for Deprecated Packages

Run the following to scan the full dependency tree for deprecation notices:

```
npm ls --json 2>/dev/null | node -e "
  const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const walk=(n,p)=>{ if(n.deprecated) console.log(p,n.deprecated);
    Object.entries(n.dependencies||{}).forEach(([k,v])=>walk(v,k)); };
  walk(d,'');
"
```

Fallback if Node inline scripting is unavailable:
```
npm install --dry-run 2>&1 | grep -i deprecated
```

Record package name and the full deprecation message for each hit. Note whether the package is a direct dependency or transitive.

---

### Step 4 — Check for Security Vulnerabilities

Run:
```
npm audit --json
```

Extract each finding: severity (`critical`, `high`, `moderate`, `low`), package name, and advisory title. Count findings by severity level.

If `npm audit` returns exit code 0 with no findings, record zero vulnerabilities. If it fails due to environment constraints, note that and skip — do not fabricate results.

---

### Step 5 — Analyze Bundle Weight Contribution

**Primary method** — use the Vite bundle visualizer if available:
```
npx vite-bundle-visualizer --mode=json
```
Parse per-package gzipped contribution sizes from the output.

**Fallback** — if the visualizer is not available or the build fails:
```
find node_modules -maxdepth 1 -type d | xargs du -sh | sort -rh | head -20
```
Cross-reference top results against `package.json` to label each as `prod`, `dev`, or `transitive`. Note in the output which method was used (gzipped bundle sizes vs. raw disk sizes).

**Flag any single production dependency whose gzipped bundle contribution exceeds 50 KB.** These are candidates for replacement or tree-shaking.

List the top 10 by size. For each, note: package name, size (KB gzipped if available, MB disk as fallback), and dependency type (`prod` / `dev` / `transitive`).

---

### Step 6 — Identify Lighter Alternatives

Check `package.json` (`dependencies` and `devDependencies`) against the known-heavy package table below. For every package in this table that is **actually present** in the project, add a row to the Lighter Alternatives section of the report. Do not include rows for packages not in `package.json`.

| Heavy Package | Est. Gzip Size | Suggested Alternative | Alt Size | Est. Savings | Migration |
|--------------|----------------|-----------------------|----------|--------------|-----------|
| `moment` | ~300 KB | `dayjs` | ~2 KB | ~298 KB | Easy |
| `moment` | ~300 KB | `date-fns` (tree-shaken) | ~15 KB | ~285 KB | Medium |
| `lodash` (full CJS import) | ~70 KB | `lodash-es` with named imports | varies | ~25–70 KB | Easy |
| `lodash` (full CJS import) | ~70 KB | individual `lodash/<method>` | varies | ~25–70 KB | Easy |
| `axios` | ~13 KB | native `fetch` | 0 KB (built-in) | ~13 KB | Easy |
| `react-icons` (barrel import) | ~50 KB+ | direct SVG imports | minimal | ~50 KB+ | Easy |
| `react-icons` (barrel import) | ~50 KB+ | `@phosphor-icons/react` (named) | minimal | ~50 KB+ | Easy |
| `chart.js` | ~60 KB | `lightweight-charts` | ~45 KB | ~15 KB | Medium |
| `recharts` | ~80 KB | `visx` | varies | varies | Hard |
| `recharts` | ~80 KB | `victory` | varies | varies | Hard |
| `classnames` | ~1 KB | `clsx` | ~0.5 KB | ~0.5 KB | Easy |
| `uuid` | ~8 KB | `crypto.randomUUID()` | 0 KB (built-in) | ~8 KB | Easy |
| `uuid` | ~8 KB | `nanoid` | ~2 KB | ~6 KB | Easy |
| `numeral` | ~17 KB | `Intl.NumberFormat` | 0 KB (built-in) | ~17 KB | Medium |

Also flag any package from the Bundle Weight Leaders (Step 5) that exceeds 50 KB gzipped and is NOT in this table — note it as "no known lighter alternative" and recommend investigating tree-shaking or lazy-loading instead.

If none of the above packages are found in `package.json`, write:
> No known heavy packages detected in this project's direct dependencies.

---

### Step 7 — Produce and Save the Report

Assemble the full report using the output format below. Save to `docs/reports/dep-audit.md`, creating the directory if needed. If the file already exists, overwrite it — do not append.

If a previous `docs/reports/dep-audit.md` exists, read it first and note any regressions: new vulnerabilities not present in the last run, or packages whose size has grown.

---

## Output Format

```markdown
# [PROJECT_NAME] — Dependency Health Audit
_Generated: [YYYY-MM-DD]_

---

## Summary

| Metric | Count |
|--------|-------|
| Production dependencies | N |
| Dev dependencies | N |
| Total dependencies | N |
| Outdated (major gap) | N |
| Outdated (minor/patch) | N |
| Deprecated packages | N |
| Security vulnerabilities | N (critical: N, high: N, moderate: N, low: N) |
| Heavy deps > 50 KB gzip | N |
| **Healthy (none of the above)** | **N** |

---

## 🔴 Security Vulnerabilities

| Severity | Package | Advisory |
|----------|---------|----------|
| critical | package-name | Advisory title |
| high | package-name | Advisory title |

Recommended fix:
```
npm audit fix
```
If `npm audit fix` would introduce a breaking change, note which packages require a manual upgrade.

_Omit this section entirely if `npm audit` returns zero findings._

---

## 📦 Outdated Packages

### Major Version Gaps (action required)

| Package | Installed | Latest | Gap | Dep Type |
|---------|-----------|--------|-----|----------|
| package-name | 1.4.2 | 2.0.0 | major | prod |

### Minor / Patch Updates (batch update safe)

| Package | Installed | Latest | Gap | Dep Type |
|---------|-----------|--------|-----|----------|
| package-name | 3.1.0 | 3.4.2 | minor | dev |

Safe to batch-update minor/patch with:
```
npm update
```

_If no outdated packages: "All dependencies are current."_

---

## ⚠️ Deprecated Packages

| Package | Direct / Transitive | Deprecation Message |
|---------|---------------------|---------------------|
| package-name | direct | "Use X instead" |

_Omit this section if no deprecated packages are found._

---

## ⚡ Bundle Weight

_Size source: [vite-bundle-visualizer gzipped sizes / node_modules disk sizes — note which was used]_

### Top Dependencies by Size

| Package | Size | Dep Type | Flag |
|---------|------|----------|------|
| package-name | 82 KB | prod | ⚠️ > 50 KB |
| package-name | 34 KB | prod | — |

### Lighter Alternatives

| Current Package | Est. Size | Suggested Alternative | Alt Size | Est. Savings | Migration |
|-----------------|-----------|----------------------|----------|--------------|-----------|
| package-name | ~300 KB | alternative-name | ~2 KB | ~298 KB | Easy |

_If no heavy packages found: "No known heavy packages detected in this project's direct dependencies."_

---

## ✅ Healthy Dependencies

N packages have no known issues — current version, no deprecation, no vulnerability, under 50 KB gzip.

_[List healthy packages one per line, or omit the list if N > 20 to keep the report scannable.]_

---

## 🎯 Prioritized Recommendations

Ordered by impact: security first, then bundle weight, then freshness.

1. **[SECURITY]** `package-name` — [severity] vulnerability — run `npm audit fix` or upgrade to vN.x
2. **[WEIGHT]** Replace `heavy-package` with `lighter-alternative` — saves ~X KB gzipped (migration: Easy)
3. **[FRESHNESS]** `package-name` has a major version gap (vX → vY) — review changelog before upgrading
4. **[FRESHNESS]** Run `npm update` to apply N safe minor/patch updates in one pass

_If the project is fully healthy: "No action required. All dependencies are current, unvulnerable, and within size budgets."_

---

_Previous audit: [date of last run, or "no previous audit found"]_
_Regressions since last run: [list new issues, or "none"]_
```

---

## How to Run

**Default — full audit:**
```
/dep-audit
```

**Rules while running:**
1. This command is read-only. Never modify `package.json`, lock files, or any installed package.
2. Do not fabricate version numbers, sizes, or vulnerability counts. If a command fails or the environment does not support it, note the limitation and skip that step — write `N/A` for affected fields.
3. The Healthy count in the Summary must be accurate: a package is healthy only if it has no outdated gap, no deprecation notice, no vulnerability, and contributes under 50 KB gzipped to the bundle.
4. The Lighter Alternatives table must only include packages actually present in `package.json` — never suggest alternatives for packages the project does not use.
5. If no known lighter alternative exists for a heavy package (> 50 KB), say so explicitly — do not invent one.
6. Security vulnerabilities are always listed first in Prioritized Recommendations, regardless of severity. A `low` vulnerability ranks above any weight or freshness item.
7. If a previous `docs/reports/dep-audit.md` exists, read it before writing the new one and include a regressions note at the bottom.
8. Save the report to `docs/reports/dep-audit.md`. Create the directory if it does not exist. Overwrite any existing file — do not append.
9. After saving, print the full report to the conversation so it is visible without opening the file.
10. When running shell commands, prefer `npm` over `npx` for commands that are part of an installed project. Use `npx` only for tools not in `package.json`.
