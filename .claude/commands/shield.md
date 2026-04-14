# Template — customize for your project. See SETUP.md for placeholder reference.

# /shield — Code & Security Review

## Purpose
Review code changes for security vulnerabilities, logic errors, error handling gaps, performance anti-patterns, and architectural drift against [PROJECT_NAME]'s documented standards. Shield is the gatekeeper that catches problems before they reach production — every finding is tied back to a rule in `REVIEW.md`, `module-map.md`, or `CLAUDE-AGENTS.md`, not generic best practices.

---

## Files to Read Before Reviewing
1. `REVIEW.md` — Module Isolation, Security Patterns, and Performance Standards sections (per REVIEW.md conventions)
2. `module-map.md` — locked file list, serverless function inventory, auth flow
3. `CLAUDE-AGENTS.md` — Code Reviewer + Security Reviewer agent roles
4. `CLAUDE.md` — dev conventions
5. `lessons.md` — known false positive patterns to skip

---

## What Shield Checks

### 1. Security (per REVIEW.md Security Patterns)

**API Keys & Secrets**
- No API keys, service-role credentials, or secrets in frontend code (`[PROJECT_SRC]`).
- All external API calls proxy through `[SERVERLESS_PATH]` — never direct from the browser.
- Serverless functions use the project's auth validation utility for authenticated endpoints.
- Public env var prefix (e.g., `VITE_`) is used only for values safe to expose to the browser. Any secret behind a public env var is Critical.

**Payment Integration**
- Webhook handlers verify provider signatures before processing events.
- Checkout/payment sessions are created server-side — never from the client.
- Payment mode (test vs. live) is controlled by an env var, not hardcoded keys.
- Price/product IDs come from a config file — never hardcoded in components.

**Database & Auth**
- Row-level security (or equivalent) is assumed — no client-side code that bypasses it.
- Database client is imported from the project's config module — never instantiated inline.
- Auth tokens are managed by the project's auth context — never stored in `localStorage` manually.
- No client-side role or tier elevation in auth/tier context files.

**Input Validation & XSS**
- Numeric inputs are clamped/validated before use.
- User-supplied strings are sanitized before passing to external APIs.
- No `dangerouslySetInnerHTML` unless the content source is fully trusted.
- No dynamic URL construction without sanitization.

**CORS**
- Serverless functions set CORS headers for the project's domain.
- No wildcard (`*`) CORS in production functions.

### 2. Error Handling
- External calls (fetch, database, payment provider) are wrapped in `try/catch` — failures never surface as unhandled promise rejections.
- User-facing errors use the project's i18n/translation strings and render via documented error patterns (see design-tokens.md).
- Graceful degradation: when a serverless function or data call fails, the UI shows a fallback state rather than crashing or blocking the user.
- No silent `catch {}` blocks that swallow errors without logging or user feedback.

### 3. Logic
- Calculation accuracy: any change near core calculation functions listed in `module-map.md` is Critical — those functions are locked.
- State management: `useState` setters are not called during render; dependent state uses derived values or `useEffect`.
- Race conditions: async effects that set state guard against stale responses (cancellation flag, mounted ref, or sequence token).
- Hooks come before any conditional returns in component bodies.

### 4. Performance (per REVIEW.md Performance Standards)

**Rendering**
- Expensive computations use `useMemo` with correct dependency arrays.
- Event handlers that don't depend on render state use `useCallback`.
- List renders include stable `key` props — never array index for reorderable lists.
- Components rendered inside tab conditionals must stay inside the conditional — moving them outside forces rendering when the tab is inactive.

**Bundle & Loading**
- No new external dependencies without justification — see `package.json` for the project's sanctioned dependency set.
- Fonts/external resources loaded once in the main component — no duplicate `<link>` tags.
- Images in the static directory are optimized — no uncompressed PNGs above 200 KB.

**Network**
- API calls use the project's caching pattern where applicable.
- Debounce user-input-driven API calls — no API call per keystroke.
- No `await` inside render paths — async lives in `useEffect` or event handlers.

### 5. Architecture (per REVIEW.md Module Isolation)

**File Boundaries**
- New features go in their own file under `[PROJECT_SRC]/components/` — not added to `[APP_ENTRY]`.
- Only files under `[PROJECT_SRC]` are edited — any legacy source copy directories must not be used.
- New config → `[PROJECT_SRC]/config/`. New utilities → `[PROJECT_SRC]/utils/`.

**Locked Files (Critical if modified without explicit unlock)**
- See `module-map.md` for the full locked file list.

**Import Conventions**
- Theme tokens accessed via the project's theme variable (set at render time), not by importing theme constants directly.
- Tier/role constants imported from the config module using named exports.
- Translations imported from the i18n module.
- Database client imported from the config module.
- Payment logic goes through the payments config module — never direct provider calls from components.

**Component Contract**
- New components receive theming, responsive, and i18n props as defined in `CLAUDE.md`.
- Components do not manage their own dark mode state.

---

## Output Format

```markdown
## Shield Review: [commit sha / file path / range]

### Verdict
**PASS** / **FAIL** — [one-line summary]

### Findings
| File | Line | Severity | Category | Finding | Recommendation |
|------|------|----------|----------|---------|----------------|
| [PROJECT_SRC]/components/Foo.jsx | 42 | Critical | Security | Secret key referenced via public env var — exposed to browser bundle | Move call to [SERVERLESS_PATH], use a non-public env var |
| [PROJECT_SRC]/components/Bar.jsx | 118 | Major | Performance | Core calc re-runs every render — no `useMemo` | Wrap in `useMemo` with correct deps |
| [PROJECT_SRC]/components/Baz.jsx | 7 | Minor | Architecture | Imports theme constant directly instead of using theme prop | Accept theme as a prop per REVIEW.md conventions |

### Severity Levels
- **Critical** — Security vulnerability, locked file modification, broken calculation, or data loss risk. Blocks merge.
- **Major** — Error handling gap, missing `useMemo` on expensive path, direct external API call from frontend, auth/RLS assumption violation. Must fix before merge.
- **Minor** — Import convention drift, missing `useCallback`, non-stable list keys, architectural inconsistency that doesn't cause immediate harm.

### Summary
[1–3 sentences: overall quality, the most important fixes required before merge, and anything notable that passed cleanly.]
```

---

## How To Run

**Default:** Review the most recent commit on the current branch.
```
/shield
```
Runs `git show --stat HEAD` + `git diff HEAD~1 HEAD` to gather the changeset, then applies every check above to the modified lines (and any surrounding context needed to judge them).

**Specific file:**
```
/shield [PROJECT_SRC]/components/SomeComponent.jsx
```
Reviews the entire file as if it were all-new code.

**Commit range:**
```
/shield HEAD~5..HEAD
/shield main..feature-branch
```
Reviews every commit in the range, consolidating findings into a single table.

**Rules while running:**
1. Read `REVIEW.md` first, every run — rules change.
2. Only flag findings tied to a specific rule in REVIEW.md, module-map.md, or CLAUDE-AGENTS.md. Generic advice is not a Shield finding.
3. Cite `file:line` for every row — no vague "somewhere in this component".
4. Do not modify code. Shield is review-only; fixes go through the normal edit flow.
5. If the changeset is empty or only touches docs/markdown, return `PASS — no code changes in scope` without a findings table.
6. When running git commands, always use `git -C [PROJECT_PATH]` instead of `cd <path> && git ...`. This ensures commands match the allowed tool patterns in `.claude/settings.json`.
