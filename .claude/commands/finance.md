# Template — customize for your project. See SETUP.md for placeholder reference.

# /finance — Bundle & Dependency Analysis

Analyze the project's build output, bundle composition, and dependency health. Produce a clear report suitable for a solo builder tracking costs and optimization opportunities.

## Steps

1. Run `npx vite build` and capture the output. Parse every chunk filename and size (both raw and gzipped if shown).

2. Produce a **Bundle Summary** section:
   - Total bundle size (sum of all chunks)
   - Top 5 largest chunks ranked by size
   - Vendor chunks vs. application code ratio

3. Run `npx depcheck` to identify:
   - Unused dependencies (in package.json but never imported)
   - Missing dependencies (imported but not in package.json)
   - If depcheck is not installed, note that and skip this step

4. Produce a **Dependency Health** section:
   - Count of production vs. dev dependencies
   - Any packages that look unusually large (over 100KB contribution to the bundle)
   - Flag any duplicated packages in the bundle output

5. Produce an **Optimization Opportunities** section:
   - Specific tree-shaking suggestions (e.g., named imports vs. full library imports)
   - Code-splitting candidates (large chunks that could be lazy-loaded)
   - One prioritized recommendation for the biggest size win

6. Save the full report to finance-report.md in the project root.

## Output Format
Use clear headings, tables where appropriate, and keep file sizes in KB. Flag anything that increased since the last report if a previous finance-report.md exists.

---

## Phase 6C — Dependency Health Audit

Run this section after completing steps 1–6 above, or independently with `/finance deps`.

### Steps

7. Run `npm outdated --json` and parse the output. For every package where the `latest` major version number is strictly greater than the `current` major version number, add it to a **Major Version Gaps** table:

   | Package | Current | Latest | Type |
   |---------|---------|--------|------|
   | ...     | ...     | ...    | prod/dev |

   Skip packages that are only minor or patch versions behind.

8. Check for deprecated packages. For each entry in the `npm outdated` JSON output, inspect the `deprecated` field if present. Additionally run:

   ```
   npm ls --json 2>/dev/null | node -e "
     const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
     const walk=(n,p)=>{ if(n.deprecated) console.log(p,n.deprecated);
       Object.entries(n.dependencies||{}).forEach(([k,v])=>walk(v,k)); };
     walk(d,'');
   "
   ```

   If Node inline scripting is unavailable, run `npm install --dry-run 2>&1 | grep -i deprecated` as a fallback. Report any hits in a **Deprecated Packages** table with the package name and the deprecation message.

9. Produce a **Bundle Weight Leaders** section. Cross-reference the Vite build output (step 1) chunk list with the production dependency list to identify each package's estimated contribution. List the top 5 by size, flagging any whose gzipped contribution exceeds 50 KB.

10. For every package appearing in either the Major Version Gaps list or the Bundle Weight Leaders list, check this table and recommend lighter alternatives **only if the package is actually present**:

    | Heavy Package | Recommended Alternative | Est. Gzip Savings | Migration Effort |
    |---|---|---|---|
    | moment | dayjs | ~65 KB | Easy |
    | moment | date-fns (tree-shaken) | ~60 KB | Medium |
    | lodash (full CJS import) | lodash-es with named imports | ~25–70 KB | Easy |
    | axios | native fetch / ky | ~13 KB | Easy |
    | chart.js | lightweight-charts | varies | Medium |
    | recharts | visx or victory | varies | Hard |
    | react-icons (full barrel) | Direct SVG imports or @phosphor-icons | ~50 KB+ | Easy |
    | uuid | nanoid | ~2 KB | Easy |
    | classnames | clsx | ~0.5 KB | Easy |

    Include migration difficulty in the recommendation. If no lighter alternative is known for a heavy package, say so — don't invent one.

### Dependency Health Output

Append a **Dependency Health Audit** section to finance-report.md containing:

- Major Version Gaps table (step 7), or "All production deps are on current major" if none
- Deprecated Packages table (step 8), or "None detected"
- Bundle Weight Leaders table (step 9)
- Lighter Alternatives table (step 10), filtered to only packages present in this project
- One-line prioritized action: the single change most likely to reduce bundle size or eliminate a security surface

---

## Phase 6C — Weekly Report Generation

Run this section last, after all steps above are complete.

### Steps

11. Read `docs/reports/finance-report-template.md` to get the placeholder structure.

12. Collect Netlify build and deploy data by running:
    ```
    netlify api listSiteDeploys --data '{"site_id":"[NETLIFY_SITE_ID]"}' 2>/dev/null | head -50
    ```
    Parse the JSON output to count:
    - Total deploys in the last 7 days
    - Average build time in seconds across those deploys
    - Total build minutes consumed

    If the Netlify CLI is not available or the command errors, fill all Netlify fields with:
    `N/A — run from environment with Netlify CLI`

    Do not fabricate deploy counts or build times.

13. Read `docs/reports/finance-report.md` if it exists. Locate the **Trend (Last 4 Weeks)** table and extract the 3 most recent week rows. These become rows 1–3 in the new trend table. The current run's data becomes row 4 (the newest). If no previous report exists, fill rows 1–3 with `—` for all cells.

14. Fill every placeholder in the template with actual values from this run:

    | Placeholder | Source |
    |-------------|--------|
    | `2026-04-14` | Today's date (YYYY-MM-DD) |
    | `{{build_count}}` | Netlify deploy count (step 12) |
    | `{{avg_build_time}}` | Netlify average build time (step 12) |
    | `{{deploy_count}}` | Same as build_count unless staging/prod differ |
    | `{{netlify_minutes_used}}` | Netlify build minutes (step 12) |
    | `{{netlify_minutes_limit}}` | Your plan's build minute limit (check Netlify dashboard) |
    | `{{bundle_size_gzip}}` | Total gzipped bundle from step 1 |
    | `{{largest_chunk_name}}` | Top chunk name from step 2 |
    | `{{largest_chunk_size}}` | Top chunk size from step 2 |
    | `{{bundle_delta}}` | Difference from previous report's bundle size, or "baseline" if first run (see baseline in previous finance report) |
    | `{{dep_total}}` | Total direct dependencies from package.json |
    | `{{dep_outdated_major}}` | Major version gap count from step 7 |
    | `{{dep_deprecated}}` | Deprecated package count from step 8 |
    | `{{dep_vulnerabilities}}` | Total vulnerability count from `npm audit` |
    | `{{top_recommendation}}` | Single highest-impact action from steps 5 or 10 |
    | `{{week_N_date}}` | ISO week date for each row |
    | `{{week_N_bundle}}` | Bundle size for that week |
    | `{{week_N_build_time}}` | Build time for that week |
    | `{{week_N_outdated}}` | Outdated major dep count for that week |

    Every placeholder must be replaced. If a value could not be determined, write `N/A` — never leave a `{{...}}` token in the output.

15. Save the filled report to `docs/reports/finance-report.md`, overwriting any existing file.

16. Print the completed report to the conversation so it is visible without opening the file.
