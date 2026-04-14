# /lighthouse — Performance, SEO, AEO/GEO & EEAT Audit

## Purpose
Lighthouse runs two complementary checks on NestCalc.ai:

1. **Source-level analysis** — reads the deployed source files to verify SEO metadata, structured data, AEO/GEO content patterns, and EEAT signals. Fast, deterministic, no browser needed.
2. **Core Web Vitals** — runs `npx lighthouse` against the live site and reports measured performance scores.

Read-only. Lighthouse never modifies files.

---

## Files to Read Before Running
1. `index.html` — primary SEO surface: meta tags, OG tags, canonical, JSON-LD structured data
2. `public/robots.txt` — crawler directives and sitemap pointer
3. `public/sitemap.xml` — URL inventory; cross-reference each listed URL against actual files in `public/`
4. `src/components/legal/` — EEAT trust check: PrivacyPolicy.tsx, TermsOfService.tsx, Disclaimer.tsx — check for NestCalc.ai entity name, jurisdiction, and contact email
5. `src/App.tsx` — EEAT trust check: lazy-loaded section inventory and About route check

> **Note:** NestCalc.ai is a single-page LP with no separate content pages, methodology documentation, or learning center. No i18n translations file exists. AEO/GEO Steps 6–10 are conditionally skipped for this project type — see the AEO gate below.

---

## Steps

### Step 1 — SEO: Meta Tag Audit

Read `index.html`. Check each of the following:

**Required tags — flag ❌ if absent, ✅ if present:**
- `<meta charset>` — must be UTF-8
- `<meta name="viewport">` — must include `width=device-width, initial-scale=1`
- `<title>` — must be present and non-empty
- `<meta name="description">` — must be present; flag ⚠️ if under 50 chars or over 160 chars
- `<link rel="canonical">` — must be an absolute HTTPS URL
- `<meta property="og:title">` — must be present and non-empty
- `<meta property="og:description">` — must be present and non-empty
- `<meta property="og:image">` — must be an absolute HTTPS URL
- `<meta property="og:url">` — must be an absolute HTTPS URL
- `<meta property="twitter:card">` — must be `summary_large_image` or `summary`
- `<meta property="twitter:title">` — must be present
- `<meta property="twitter:image">` — must be an absolute HTTPS URL

**Quality checks — flag ⚠️ if suboptimal:**
- Title length: 50–60 chars is ideal. Flag if under 30 or over 70.
- Description length: 120–160 chars is ideal. Flag if under 50 or over 160.
- OG description should not be identical to the page description (acceptable, but note it if so).
- This site is single-language — skip hreflang check.
- **Known issue (2026-04-14):** `<title>`, `og:title`, and `twitter:title` all read "NestCalc.ai — AI-Powered Real Estate Investment Tools" — stale from prior identity; should reflect AI dev studio positioning. Flag every run until corrected.

### Step 2 — SEO: Structured Data (JSON-LD)

Still in `index.html`. Find all `<script type="application/ld+json">` blocks.

For each block found:
- Identify the `@type`
- Verify `@context` is `https://schema.org`
- Check for required fields by type:

| @type | Required fields |
|-------|----------------|
| `Organization` | `name`, `url`, `logo`, `contactPoint` |
| `WebApplication` | `name`, `url`, `description`, `applicationCategory`, `offers` |
| `SoftwareApplication` | `name`, `url`, `applicationCategory` |
| `FAQPage` | `mainEntity` array with at least 1 `Question` + `acceptedAnswer` |

Flag ❌ if an expected type is entirely missing. Flag ⚠️ if a block is present but missing required fields.

**Expected for NestCalc.ai:** `Organization` schema at minimum (name, url, logo, contactPoint). No structured data currently exists — flag ❌ until added.

**Baseline (record after first run):** Note which schema types are present in `index.html` during your first audit. On subsequent runs, flag as ❌ regression if any previously-present type is missing.

### Step 3 — SEO: Dynamic Title Management

Run:
```
grep -r "document\.title\|react-helmet\|next/head\|useHead\|<Helmet" src --include="*.jsx" --include="*.js" --include="*.tsx" -l
```

- If nothing found: note that NestCalc.ai uses a **static title only** (set in `index.html`). This is expected for a single-page LP. Flag as ⚠️ — the same title appears for all in-app states. No action required unless multi-page SEO becomes a goal.
- If react-helmet or equivalent is found: verify each usage sets a meaningful, non-placeholder title and description.

### Step 4 — SEO: Sitemap & Robots

**robots.txt** (`public/robots.txt`):
- Must have `User-agent: *`
- Must have `Allow: /` (or no `Disallow: /`)
- Must have `Sitemap:` directive pointing to an absolute HTTPS URL
- Flag ❌ if any of these are missing

**sitemap.xml** (`public/sitemap.xml`):
- All `<loc>` URLs must be absolute HTTPS
- Cross-reference each listed URL against actual files in `public/`:
  - For `<loc>https://nestcalc.ai/</loc>`, verify `index.html` exists — ✅ expected
  - Flag ⚠️ for any URL in the sitemap that has no corresponding file in `public/`
  - **Note:** Legal pages (Privacy Policy, Terms of Service, Disclaimer) open as modals in this project — they are not SPA routes and correctly do not appear in the sitemap. No SPA route gap for this project.

### Step 5 — SEO: Heading Hierarchy

`index.html` contains no content headings — all heading elements live inside React components. Verify via component grep:

```
grep -rn "<h[1-6]" src/components/ --include="*.tsx"
```

Flag ❌ if: more than one `<h1>`, any heading level skip (h1 → h3 without h2), or no `<h1>` present.

**Note:** Full heading hierarchy enforcement is covered by Eagle (REVIEW.md §1.2). Lighthouse flags only structural hierarchy failures.

---

## AEO / GEO Checks

> **Project-type gate:** NestCalc.ai is a **single-page landing page** with no methodology page, learning center, blog, or long-form content pages. Steps 6–10 are not applicable to this project type — content-heavy AEO checks require indexable content pages with sourcing language, formula blocks, and FAQ schemas.
>
> **Skip Steps 6–10 and report:**
>
> ### AEO / GEO Signals
> N/A — single-page LP with no long-form content pages. AEO checks apply to content-heavy applications. The only applicable AEO signal for this project type is structured data (Organization/WebApplication schema), which is covered in Step 2 above.
>
> Steps 6–10 below are preserved for future use if NestCalc.ai adds a methodology page, case study section, or blog.

### Step 6 — AEO / GEO: FAQ Schema on Content Pages

*(Skipped — no content pages. See gate above. Activate when a methodology or content page is added.)*

This step checks whether content pages carry structured data in addition to what is in `index.html`. For a primary content page, if JSON-LD count is 0, flag ⚠️ — an `Article` or `TechArticle` schema with `name`, `description`, `author`, and `url` would allow AI models to cite it as a document.

### Step 7 — AEO / GEO: Clear Definitions on Content Pages

*(Skipped — no content pages. See gate above.)*

For projects with content pages: evaluate whether the opening paragraph names the product, states what the document covers, and uses factual language — not marketing superlatives.

### Step 8 — AEO / GEO: Authoritative Sourcing Language

*(Skipped — no content pages. See gate above.)*

For projects with content pages: grep for named source citations, industry-standard references, threshold citations, and calculation transparency. Flag ❌ if a Data Sources section is missing.

### Step 9 — AEO / GEO: Extractable Content Structure

*(Skipped — no content pages. See gate above.)*

For projects with content pages: verify formula/equation blocks, Data Sources table, TOC with anchor links, and list structures are present.

### Step 10 — AEO / GEO: Citation-Ready Headings

*(Skipped — no content pages. See gate above.)*

For projects with content pages: verify domain-specific term headings and semantic heading elements vs. div-based section labels.

---

## EEAT Checks

### Step 11 — EEAT: Experience Signals

Check for concrete, real-world AI software development scenarios — content that demonstrates the creator has personally built production AI systems, not just described them.

Run a grep targeting AI dev studio practitioner terminology:
```
grep -rn "Claude API\|LLM\|AI-native\|agent\|automation\|production-ready\|small business\|weeks\|integration" src/components/ --include="*.tsx" | head -25
```

Classify what's found against a specificity ladder:

| Level | Example | Signal |
|-------|---------|--------|
| Generic | "custom solution," "for your business" | Consumer-facing, no experience signal |
| Practitioner term | AI-native, LLM integration, agent architecture | Domain literacy |
| Scenario-level | Specific project type with concrete outcome (e.g., "React dashboard with Claude API, shipped in 3 weeks") | Lived experience |

Flag ✅ if concrete scenario-level examples are present beyond taglines.
Flag ⚠️ if only practitioner terms are found without scenario-level examples.
Flag ❌ if all content uses generic consumer-level language.

**Baseline:** If `lessons.md` exists, read it for known false-positive patterns and prior baseline entries before running this step. If it does not exist, proceed without — no prior state to compare against.

### Step 12 — EEAT: Expertise Signals

Check for any named author, founder, or team page across the codebase:

```
grep -rn "author\|Author\|founder\|Founder\|About\|who built\|our story\|team\|Team\|credentials\|years of experience" src/components/ --include="*.tsx" -l
```

**Note:** Matches in `src/components/legal/` (PrivacyPolicy.tsx, TermsOfService.tsx, Disclaimer.tsx) are expected false positives — legal text contains phrases like "our services" and entity names that are not author bios. Discard any match from legal component files. Only count a match if it appears outside `src/components/legal/` in a component presenting visible author or team information.

Also check:
- Does `index.html` Organization schema include a `founder`, `employee`, or `knowsAbout` field?
- Is there an About route defined in `src/App.tsx`?

Flag ❌ if no author bio, founder information, or named expertise exists anywhere on the site.
Flag ⚠️ if the company is named but no individual's AI development background is given.

**Baseline:** If `lessons.md` exists, read it for known expertise gaps. If it does not exist, proceed without.

### Step 13 — EEAT: Authority Signals

Check whether the site identifies who operates it and establishes their qualification to offer AI software development services:

```
grep -rn "NestCalc.ai\|jurisdiction\|contact\|entity\|Entity" src/components/legal/ | head -10
grep -n "creator\|Organization\|contactPoint\|founder\|knowsAbout" index.html
```

Verify each authority element:

| Element | Location | Pass condition |
|---------|----------|----------------|
| Legal entity named | `src/components/legal/` | "NestCalc.ai" present in legal text |
| Jurisdiction stated | `src/components/legal/` | Operating jurisdiction stated (e.g., state or country) — not yet in codebase |
| Contact email | `src/components/legal/` + footer | `mailto:` email present — not yet in codebase |
| Organization schema | `index.html` | `@type: Organization` with name, url, logo |
| Professional framing | Hero / WhyNokYai section | Frames deliverables against AI development professional standards |

Flag ✅ for each element present.
Flag ⚠️ if all elements pass but no named individual or professional biography exists — entity authority without personal authority.
Flag ❌ if the site cannot be traced to a legal entity from publicly visible pages.

**Baseline:** If `lessons.md` exists, read it for known authority gaps. If it does not exist, proceed without.

### Step 14 — EEAT: Trust Signals

Verify the complete trust stack:

```
grep -n "canonical\|https://" index.html | head -3
grep -n "footer\|privacy\|terms\|disclaimer\|contact" src/App.tsx | grep -v "^.*\/\/" | head -15
```

Check each trust element:

| Signal | Location | Pass condition |
|--------|----------|----------------|
| SSL | `<link rel="canonical">` | Begins with `https://` |
| Privacy Policy | `src/components/layout/Footer.tsx` | Modal trigger present |
| Terms of Service | `src/components/layout/Footer.tsx` | Modal trigger present |
| Disclaimer | `src/components/layout/Footer.tsx` | Modal trigger present |
| Contact email | Footer | `mailto:` email present — not yet in codebase |
| Legal entity in ToS | `src/components/legal/TermsOfService.tsx` | "NestCalc.ai" and jurisdiction present |

Flag ✅ for each element present.
Flag ⚠️ for trust elements that exist as modals only (Privacy, Terms, Disclaimer in this project) — crawlers cannot independently verify these pages exist as standalone URLs.
Flag ❌ for any absent element from the table.

**Baseline:** If `lessons.md` exists, read it for known trust gaps. If it does not exist, proceed without. Consistently flag modal-only legal pages as ⚠️ until standalone HTML files exist or a pre-rendering solution is in place.

### Step 15 — EEAT: Content Specificity

Check whether visible content uses AI development practitioner language or generic consumer-level descriptions.

Scan for generic language patterns:
```
grep -rn "custom solution\|for your business\|AI-powered\|intelligent automation\|professional service\|powered by AI" src/components/ --include="*.tsx" | head -20
```

Evaluate against the specificity ladder:

| Generic (⚠️ flag) | Specific (✅ credit) |
|--------------------|---------------------|
| "custom solution" | "Claude API integration with React 19, production-ready in 3 weeks" |
| "AI-powered" | "LLM agent that reads your CRM and drafts follow-ups" |
| "professional service" | "AI-native development — not bolted on as an afterthought" |
| "for your business" | "small business owners who need automation without engineering teams" |

For each section, classify the dominant language register:
- **Hero** (`src/components/sections/Hero.tsx`): flag ⚠️ if generic language dominates without specific outcome claims
- **WhyNokYai** (`src/components/sections/WhyNokYai.tsx`): check whether differentiators name specific AI capabilities or use generic agency framing
- **Services** (`src/components/sections/Services.tsx`): check whether service bullets name specific outputs or use generic benefit language

Flag ✅ for content sections where specificity is the dominant register.
Flag ⚠️ for high-visibility sections (hero, CTA) that use generic positioning without specific outcome language.
Flag ❌ if the primary value proposition uses only generic language — directly contradicts the site's expertise positioning.

**Baseline:** If `lessons.md` exists, read it for known content specificity gaps. If it does not exist, proceed without.

---

## Core Web Vitals

### Step 16 — Core Web Vitals (npx lighthouse)

> **Prerequisite:** CWV auditing requires the live site to be publicly accessible without authentication. Skip this step and note "CWV: skipped — site not publicly accessible" if the site is behind a login, Netlify password, or has not yet completed domain migration.

Run Lighthouse against the live site. Replace `YYYY-MM-DD` with today's date in the output path:

```
npx --yes lighthouse https://nestcalc.ai/ \
  --output=json \
  --output-path=docs/reports/lighthouse-YYYY-MM-DD.json \
  --chrome-flags="--headless" \
  --only-categories=performance
```

Parse the resulting JSON and extract:

| Metric | Value | Pass threshold | Warn threshold |
|--------|-------|----------------|----------------|
| Performance Score | score × 100 | ≥ 90 | ≥ 70 (set in lighthouse.yml) |
| FCP (First Contentful Paint) | numericValue ms | ≤ 1800 ms | ≤ 3000 ms |
| LCP (Largest Contentful Paint) | numericValue ms | ≤ 2500 ms | ≤ 4000 ms |
| TBT (Total Blocking Time) | numericValue ms | ≤ 200 ms | ≤ 600 ms |
| CLS (Cumulative Layout Shift) | numericValue | ≤ 0.10 | ≤ 0.25 |
| Speed Index | numericValue ms | ≤ 3400 ms | ≤ 5800 ms |
| TTI (Time to Interactive) | numericValue ms | ≤ 3800 ms | ≤ 7300 ms |

Also extract the top 3 opportunities (audits with `details.type === 'opportunity'`, sorted by `numericValue` desc) and include them in the Recommendations section.

Also scan for unoptimized image assets — these are the primary LCP degradation vector under Lighthouse's simulated slow-4G throttling (~1.6 Mbps download):
```javascript
const items = r.audits['network-requests']?.details?.items || [];
items.filter(i => (i.transferSize || 0) > 500_000)
     .sort((a,b) => (b.transferSize||0)-(a.transferSize||0))
     .forEach(i => console.log('Large asset:', i.url, ((i.transferSize||0)/1024/1024).toFixed(2) + ' MB'));
```
Flag ⚠️ for any asset over 500 KB. Flag ❌ for any image asset over 1 MB — at 1.6 Mbps, a 4.5 MB image takes ~22 seconds to load, which directly sets LCP and TTI. If LCP > 5s, a large image is almost certainly the root cause; name the specific file in the Recommendations table.

The JSON file saved to `docs/reports/` is the persistent record — do not delete it after parsing.

---

## Output Format

```markdown
## Lighthouse Audit — YYYY-MM-DD

---

### SEO Checks

#### ✅ Passing
- `<title>`: "NestCalc.ai — ..." (N chars)
- `<meta name="description">`: present (N chars)
- `<link rel="canonical">`: https://nestcalc.ai/
- Open Graph: og:title, og:description, og:image, og:url all present
- Twitter Card: summary_large_image with title and image
- robots.txt: User-agent *, Allow /, Sitemap pointer present
- sitemap.xml: 1 URL (root), absolute HTTPS

#### ⚠️ Warnings
- Stale title: "AI-Powered Real Estate Investment Tools" — does not match AI dev studio positioning (all three title tags affected)
- Description is N chars — note if over 160 or below 120
- Static title only (index.html) — all in-app states share the same <title>; acceptable for single-page LP

#### ❌ Missing or Broken
[List any critical failures, or: "None — all required SEO elements are present."]

---

### Structured Data

#### ✅ Passing
- `Organization` schema: present with name, url, logo, contactPoint

#### ⚠️ Warnings
[Any missing optional fields]

#### ❌ Missing or Broken
[Any missing required types or fields, or: "None."]

---

### Sitemap URL Coverage

| URL in sitemap.xml | File in public/ | Status |
|--------------------|-----------------|--------|
| https://nestcalc.ai/ | Served via index.html (SPA root) | ✅ |

---

### AEO / GEO Signals

N/A — single-page LP with no long-form content pages. AEO checks apply to content-heavy applications. The only applicable AEO signal for this project type is structured data (Organization/WebApplication schema), covered in the SEO section above.

---

### EEAT Signals

#### ✅ Passing
- Trust / SSL: canonical URL uses `https://` ✓
- Trust: legal modals present — Privacy Policy, Terms of Service, Disclaimer ✓
- Trust: legal entity "NestCalc.ai" named in footer copyright ✓

#### ⚠️ Warnings
- Experience: AI practitioner terms present; concrete scenario-level examples with specific outcomes absent
- Authority: entity authority without personal authority — no named individual or professional background
- Trust: legal pages exist as modals only — crawlers cannot independently verify they exist as standalone pages

#### ❌ Missing or Broken
- Expertise: no author bio, no founder credentials, no named team member anywhere on the site
- Authority: no contact email visible in footer or legal components
- Authority: no Organization schema in index.html

---

### Core Web Vitals

**Performance Score: N / 100**

| Metric | Value | Status |
|--------|-------|--------|
| FCP | — | — |
| LCP | — | — |
| TBT | — | — |
| CLS | — | — |
| Speed Index | — | — |
| TTI | — | — |

Full JSON report saved: `docs/reports/lighthouse-YYYY-MM-DD.json`

---

### Recommendations

Synthesized from SEO, AEO/GEO, and EEAT findings. Priority order: items that affect trust and indexability first, then discoverability, then optimization.

| # | Area | Item | Why it matters |
|---|------|------|----------------|
| 1 | SEO / EEAT | Fix stale `<title>` — replace "AI-Powered Real Estate Investment Tools" with AI dev studio framing | All search snippets and social shares show real estate positioning, directly contradicting the pitch |
| 2 | SEO | Add Organization JSON-LD schema to `index.html` with name, url, logo, contactPoint | No structured data at all — AI models and search have no entity anchor |
| 3 | EEAT | Add founder/author bio or About section with AI development background | Only ❌ EEAT finding; expertise is the weakest EEAT dimension — affects AI citation confidence |
| 4 | EEAT | Add `mailto:` contact link to Footer | No contact email visible to crawlers — authority gap |
| 5 | EEAT | Add operating jurisdiction to legal modal components | Entity named but not locatable — authority gap |
| 6 | AEO / EEAT | Add one concrete AI delivery example per service (specific tech + timeframe + outcome) | Generic "Custom AI Solutions" → "Claude API chatbot for restaurant bookings, 2 weeks" |
| 7 | CWV | Run live Lighthouse CLI against https://nestcalc.ai/ | No CWV data yet — needed to set baselines in docs/reports/ |
| 8 | CWV | _(Opportunity 1 from Step 16 live run)_ | _(value / savings)_ |
| 9 | CWV | _(Opportunity 2 from Step 16 live run)_ | _(value / savings)_ |

Replace CWV rows 7–9 with actual findings once the live run completes. Add any new ❌ findings from this run at the top of the table ahead of ⚠️ items.

---

### Summary
[3–4 sentences: overall health across SEO, EEAT, and CWV; the single highest-impact fix; whether CWV scores are above or below thresholds; and any regression vs. the previous run if a prior report exists in docs/reports/.]
```

---

## How to Run

**Default — full audit (SEO + CWV):**
```
/lighthouse
```

**SEO checks only (skip the live Lighthouse CLI run):**
```
/lighthouse --seo-only
```

**Rules while running:**
1. Run source checks first (Steps 1–15) before the CLI run (Step 16) — all source checks are fast and network-independent.
2. The CWV run (Step 16) takes ~15–30 seconds. Run it once per session, not repeatedly.
3. Save the JSON output to `docs/reports/lighthouse-YYYY-MM-DD.json` — this is the audit trail. Do not save to the project root.
4. Do not modify any source files. Lighthouse is review-only; fixes go through the normal edit flow.
5. If the `npx lighthouse` run fails (network error, Chrome not found), complete all source-check sections and note: `"CWV: run failed — (error message). Re-run with: npx lighthouse https://nestcalc.ai/ --chrome-flags='--headless' --only-categories=performance"`
6. The Sitemap URL Coverage table (Step 4) is required every run — it tracks URL coverage and surface area.
7. AEO/GEO Steps 6–10 are skipped for this project type (single-page LP). If a content page is added in the future, remove the gate and activate the steps.
8. If `lessons.md` exists, read it before Steps 11–15 for known false-positive baselines. If it does not exist, proceed without — no baseline filtering.
9. Any known ❌ expertise finding should be flagged every run in the EEAT ❌ section — it is the highest-priority EEAT fix.
10. The Recommendations table must synthesize from all three areas. Do not list SEO, AEO, and EEAT recommendations in separate tables — merge into one prioritized list with the Area column identifying the source.
