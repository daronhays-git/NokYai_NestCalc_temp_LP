<!-- Foundation generates the initial version of this file during /foundation setup.
     Beacon-rules appends to §5 as recurring feedback patterns are detected.
     Builders add project-specific rules to any section as conventions solidify.
     Every rule references an actual pattern in this codebase — delete stubs that
     don't apply and add specifics before the first agent-driven review. -->

# NestCalc.ai — Review Rules

These rules apply to all code reviews, whether human or agent-driven. Every rule derives from this project's actual conventions. Reference the source documents for full context: `design-tokens.md`, `module-map.md`, `project-brief.md`.

_Enforced by: Eagle (§1), Shield (§2), Scribe (§3), Lighthouse (§4). Beacon appends to §5._

---

## §1 — Design System Rules
_Enforced by: Eagle_

### §1.1 Color Tokens

- [ ] **[error]** All colors reference the project token system defined in `design-tokens.md` — no raw hex values except documented hard-coded exceptions listed in `design-tokens.md §Exceptions`.
  <!-- Foundation: replace "token system" with the actual approach — e.g., "the T theme object", "Tailwind config", "CSS custom properties in tokens.css" -->
- [ ] **[error]** Semantic status colors are used for status indicators: `nok-teal (#0d9488)` for positive, `nok-red (#dc2626)` for negative, `nok-gold (#F59E0B)` for caution.
  <!-- Foundation: fill in actual token names from design-tokens.md -->
- [ ] **[warning]** This project uses a fixed dark theme — all new color usage must be verified against dark surfaces (`nok-deep: #0f2920`, `nok-forest: #1a3a2a`). No light mode exists.

### §1.2 Typography

- [ ] **[error]** All font families use the documented token references — no bare font family strings (`'Inter'`, `'Helvetica'`, etc.).
  <!-- Foundation: replace with the actual font token names, e.g., "font.display, font.body, font.mono" -->
- [ ] **[warning]** Font sizes fall within the type scale defined in `design-tokens.md §Typography` — no arbitrary sizes outside the documented range.
- [ ] **[error]** Heading hierarchy is maintained: one `<h1>` per page, `<h2>` for section headers, `<h3>` for card or subsection headers.

### §1.3 Styling Conventions

- [ ] **[error]** All styles follow the project's styling approach: `Tailwind v4 utility classes`.
  <!-- Foundation: fill in — e.g., "inline JavaScript objects only — no className props, CSS files, or styled-components" OR "Tailwind utility classes — no inline style props except for dynamic values" -->
- [ ] **[warning]** Spacing values follow the spacing scale in `design-tokens.md §Spacing` — no arbitrary `px` values outside the scale.
- [ ] **[warning]** Border radius values follow the documented component scale — inputs, buttons, cards, and badges each have a designated radius.
  <!-- Foundation: fill in the specific values from design-tokens.md after the design system is finalized -->

### §1.4 Responsive Design

- [ ] **[error]** New UI is tested at minimum viewport width: `375px`.
  <!-- Foundation: fill in — common values: 375 (iPhone SE), 320 (older devices) -->
- [ ] **[warning]** Touch targets are minimum `44px` height on mobile.
  <!-- Foundation: fill in — standard: 44px (Apple HIG), 48px (Material) -->
- [ ] **[warning]** Horizontal scroll is not introduced by new components except in documented scrollable containers.

### §1.5 Accessibility Minimums

- [ ] **[error]** All interactive elements (buttons, inputs, links, tabs) are keyboard-navigable.
- [ ] **[error]** Form inputs have associated `<label>` elements or `aria-label` attributes.
- [ ] **[error]** Images have non-empty `alt` text; decorative images use `alt=""`.
- [ ] **[warning]** Text contrast meets WCAG AA minimum: 4.5:1 for body text, 3:1 for large text (18px+ or 14px+ bold).
- [ ] **[warning]** No `tabIndex` values above 0 unless justified — tab order follows visual layout.

---

## §2 — Code Quality Rules
_Enforced by: Shield_

### §2.1 Error Handling

- [ ] **[error]** All `async/await` calls are wrapped in `try/catch` — unhandled promise rejections are a reject.
- [ ] **[error]** API errors surface a user-facing message — silent failures are not acceptable.
- [ ] **[warning]** Error boundaries wrap major UI sections so a component crash does not take down the full page.
  <!-- Foundation: delete if the project does not use React or a framework with error boundaries -->

### §2.2 Logging and Debug Code

- [ ] **[error]** No `console.log`, `console.warn`, or `console.error` in production code — use the project logger if one exists, or remove before merge.
  <!-- Foundation: if a logger utility exists, reference it here: "Use logger.ts instead of console.*" -->
- [ ] **[error]** No commented-out code blocks — if code is unused, delete it.
- [ ] **[warning]** No `debugger` statements in any file.

### §2.3 Input Validation

- [ ] **[error]** User-supplied inputs are validated or sanitized before use — assume hostile input at all system boundaries (forms, URL params, API responses).
- [ ] **[error]** Numeric inputs are validated to expected ranges before calculation — guard against `NaN`, `Infinity`, and empty string.
- [ ] **[error]** No `dangerouslySetInnerHTML` (React) or equivalent raw HTML injection unless the content source is fully trusted and documented.
  <!-- Foundation: adjust verb to match the framework — e.g., "[v-html]" for Vue, "innerHTML =" for vanilla JS -->

### §2.4 Security Patterns

- [ ] **[error]** No API keys, secrets, or credentials in frontend source code — all secrets go in environment variables and are accessed server-side only.
  <!-- Foundation: list the specific secrets for this project, e.g., "Stripe secret key, Supabase service-role key, AI API key" -->
- [ ] **[error]** Environment variables intended for client-side use are prefixed with `VITE_` — all others are server-only.
  <!-- Foundation: fill in the framework's public env prefix — e.g., "VITE_" for Vite, "NEXT_PUBLIC_" for Next.js, "REACT_APP_" for CRA -->
- [ ] **[error]** External API calls that require secrets go through server-side routes or serverless functions — never directly from the browser.
  <!-- Foundation: reference the specific backend path, e.g., "netlify/functions/ for all authenticated calls" -->
- [ ] **[warning]** CORS is restricted to known domains in production — no wildcard `*` on endpoints that handle user data or authentication.

### §2.5 Module Isolation

- [ ] **[error]** New features go in their own file under `src/` — do not expand the main entry file indefinitely.
- [ ] **[error]** Locked files are not modified without explicit review:
  - `src/lib/birdPaths.ts` — Guardian Bird SVG path data; exact values are production-calibrated
  - `src/styles/globals.css` — authoritative design token source (@theme block)
- [ ] **[warning]** New utilities go in `src/utils/`, new config in `src/config/` — follow established directory conventions.
  <!-- Foundation: adjust paths to match actual project structure -->

### §2.6 React Conventions

- [ ] **[error]** Hooks come before any conditional returns in component bodies.
- [ ] **[warning]** Expensive computations use memoization with correct dependency arrays.
- [ ] **[warning]** Dynamic list renders include stable `key` props — never array index as key for reorderable lists.
- [ ] **[warning]** No `await` inside render paths — async operations go in effects or event handlers.

---

## §3 — Documentation Rules
_Enforced by: Scribe_

### §3.1 Docs-to-Code Accuracy

- [ ] **[error]** `module-map.md` reflects the current component and module structure — any new file or renamed export requires a corresponding update.
- [ ] **[warning]** `design-tokens.md` is updated when a new token is added to the theme — no token is used in code before it appears in the canonical token file.
- [ ] **[warning]** `project-brief.md` is updated when the tech stack, monetization model, or target user changes significantly.

### §3.2 Changelog and Release Notes

- [ ] **[warning]** `CHANGELOG.md` is updated before any release tag — new entries follow the existing format (date, version, summary of changes).
  <!-- Foundation: delete if the project uses a different release tracking system, or update to reference it -->
- [ ] **[warning]** Breaking changes to the public API or data schema include a migration note in the changelog entry.

### §3.3 Inline Documentation

- [ ] **[warning]** Functions with non-obvious behavior include a comment explaining the intent — not the mechanics.
- [ ] **[warning]** Complex business logic (calculations, state machines, tier gates) includes a reference to the source document or product decision that governs it.

---

## §4 — Performance Rules
_Enforced by: Lighthouse_

### §4.1 Bundle Size Budget

- [ ] **[error]** No new production dependency is added without justification. The existing stack handles: `React 19, Framer Motion, GSAP + ScrollTrigger, Three.js / React Three Fiber, Tailwind v4`. A library for something achievable with existing tools is a reject.
  <!-- Foundation: fill in the core libraries — e.g., "React 18, Recharts, Supabase client" -->
- [ ] **[error]** No single production dependency contributes more than `50`KB gzipped to the bundle without an approved exemption.
  <!-- Foundation: set a threshold appropriate for the project — default recommendation: 50 KB -->
- [ ] **[warning]** Known heavy packages have lighter alternatives considered before adoption — see `docs/reports/dep-audit.md §Lighter Alternatives`.

### §4.2 Core Web Vitals Targets

- [ ] **[warning]** Largest Contentful Paint (LCP) ≤ `2500`ms on mobile.
  <!-- Foundation: standard Good threshold: 2500ms -->
- [ ] **[warning]** Cumulative Layout Shift (CLS) ≤ `0.1`.
  <!-- Foundation: standard Good threshold: 0.1 -->
- [ ] **[warning]** Interaction to Next Paint (INP) ≤ `200`ms.
  <!-- Foundation: standard Good threshold: 200ms -->

### §4.3 Asset Optimization

- [ ] **[error]** Images in `public/` are optimized — no uncompressed PNGs above `200`KB.
  <!-- Foundation: fill in asset path and threshold — recommendation: 200KB -->
- [ ] **[warning]** New fonts are loaded efficiently — no duplicate `<link>` or `@import` font declarations.
- [ ] **[warning]** New third-party scripts load with `async` or `defer` — no render-blocking scripts.

### §4.4 Rendering Efficiency

- [ ] **[warning]** Expensive computations use memoization with accurate dependency arrays — avoid recalculating on every render.
- [ ] **[warning]** API and data-fetch calls debounce user input — no request on every keystroke.
- [ ] **[warning]** Previously fetched data is checked before re-fetching the same resource — avoid redundant network requests.

### §4.5 Mobile Performance

- [ ] **[warning]** New UI is tested on a mid-range simulated device (Lighthouse mobile preset) — not just desktop.
- [ ] **[warning]** Animations and transitions use `transform` and `opacity` — avoid properties that trigger layout recalculation.

---

## §5 — Beacon-Generated Rules
_Rules appended by `/beacon-rules` after confirming recurring feedback patterns._
_Rule IDs use the `B-` prefix, continuing from the last entry in this section._

<!-- /beacon-rules appends here. Do not manually edit rule IDs in this section —
     Beacon manages the B-XX numbering. Add human-authored rules to §1–§4 instead. -->

_No Beacon-generated rules yet. Run `/beacon-rules` after collecting feedback in `feedback-log.md`._
