# Template — customize for your project. See SETUP.md for placeholder reference.

# /foundation — Project Launch Architecture

## Purpose
Foundation is the only proactive agent in the [PROJECT_NAME] stack — it runs **before** any application code is written. It interviews the builder about the project's purpose, users, stack, and design direction, then generates seven foundational documents that every other agent reads.

Run `/foundation` once at project start. Re-run if the project's scope, stack, or target user changes significantly. All other agents — Eagle, Shield, Scribe, Lighthouse — depend on what Foundation produces.

---

## Files to Read Before Running

Scan the project directory first to pre-fill interview answers. Read whatever exists:

1. `package.json` — frameworks, libraries, installed dependencies
2. `README.md` — project name, tagline, feature list if present
3. `CLAUDE.md` — architecture notes, dev conventions (if already bootstrapped)
4. `[PROJECT_SRC]/` — component tree, route structure, i18n files, config files
5. `netlify.toml`, `vite.config.js`, or equivalent deploy/build configs
6. Any existing `.md` briefs, roadmaps, or product specs in the project root or `docs/`

Use what you find to **pre-fill answers** so the builder confirms or corrects rather than starting from scratch. If the project is brand new with no source, skip the scan and start the interview directly.

---

## What Foundation Does

### Step 1 — Scan for Existing Context

Before asking any question, scan the files listed above. For each interview question, derive a pre-filled answer if the source material supports it. Show the pre-fill inline with each question so the builder can confirm, correct, or expand.

If the project directory is empty or has only a `package.json`, note: _"New project detected — starting from scratch."_

---

### Step 2 — Run the Architecture Interview

Present questions **one at a time**. Show the pre-filled answer (if any) and wait for the builder's response before moving to the next question. Do not batch questions.

---

**Q1 — Project Identity**
What is this product? What is its name and one-sentence pitch? Who is it for and what problem does it solve?

> Pre-fill from: README.md first heading and description, or `package.json` `name` and `description`.

---

**Q2 — Target User**
Who is the primary user? Describe them in concrete terms: their background or skill level, their goal when they open the app, and what would make them come back a second time.

> Pre-fill from: any persona or "for whom" language in README.md or existing briefs.

---

**Q3 — Tech Stack**
What frameworks, libraries, and hosting are in use? Include: frontend framework, backend or serverless approach, database if any, payment provider if any, and deployment target.

> Pre-fill from: `package.json` dependencies + `netlify.toml` / `vite.config` / deploy config.

---

**Q4 — Monetization**
How does this make money? Free, freemium, subscription, one-time purchase, or ad-supported? If tiered, what does each tier include and what gates access to premium features?

> Pre-fill from: any `tiers.js`, `payments.js`, or pricing language in existing source.

---

**Q5 — Language & Localization**
Does the app need to work in more than one language? What languages are required at launch? What languages are planned later? Is there an i18n framework already in place?

> Pre-fill from: any i18n directory, `translations.js`, or locale config files found in `[PROJECT_SRC]/`.

---

**Q6 — Learning Component**
Does the app teach the user anything — through tooltips, sidebars, modals, dedicated learn pages, or educational content woven into the experience? If yes: what format does the learning take, how is it triggered, and does it vary by tier?

> Pre-fill from: any `Learn`, `Tooltip`, `Guide`, or `Onboarding` component files found.

---

**Q7 — Design Direction**
What does the visual identity look like? Describe the core colors, type family, and overall aesthetic (minimal, bold, data-dense, editorial). Is there an existing design system or style guide to draw from?

> Pre-fill from: CSS variables, Tailwind config, theme files, or any `design-tokens.md` found.

---

**Q8 — Key User Flow**
Walk through the primary action a user takes from landing to completing their goal. What is the happy path? Where are the critical decision points or moments of friction?

> Pre-fill from: route structure and component tree — infer the main flow from tab, page, and modal names.

---

**Q9 — Integrations**
What external services does the app connect to? Include: payment providers, authentication services, AI or LLM APIs, analytics, email, CRM, or any third-party data APIs.

> Pre-fill from: `package.json` dependencies + any `.env.example` or config files found.

---

**Q10 — Launch Timeline**
What is the target launch date or milestone? What is the current project state — idea, MVP, beta, or v1? What must be true before you consider it launched?

> Pre-fill from: any roadmap, milestone, or "dependencies blocking go-live" language in existing docs.

---

### Step 3 — Generate Foundational Documents

After all 10 answers are collected, generate the following seven files. Write each file completely — do not produce stubs or leave placeholder text in any output file. Every section must contain the builder's actual answers.

---

**3a. `project-brief.md`**

Synthesize all 10 answers into a comprehensive project brief. Include:
- Project name, one-liner, and elevator pitch
- Target user persona and the core problem they have
- Tech stack table (framework, backend, database, payments, hosting)
- Monetization model and tier structure if applicable
- Key integrations and external dependencies
- Launch timeline and current project state
- Success criteria — what "shipped" looks like for this project

---

**3b. `design-tokens.md`**

Document the design system derived from Q7 and any scanned source files. Include:
- Color palette: primary, secondary, accent, and semantic/status colors with hex values
- Typography scale: font families, size scale, weights, line heights
- Spacing scale
- Border radii and shadow values
- Component-level patterns: button variants, input states, card styles
- Framework mapping: CSS variable names or Tailwind class equivalents if applicable

If the builder has no design system yet, generate a minimal opinionated starter set that fits the described aesthetic and mark it as _"starter — refine as the visual design develops."_

---

**3c. `i18n-status.md`**

Document internationalization state from Q5. Include:
- Languages supported at launch
- Languages planned for later expansion
- i18n framework in use and its configuration approach
- Estimated percentage of strings externalized vs. hardcoded
- Known gaps or hardcoded strings identified in the source scan
- Expansion plan and priority order

If the app is single-language with no i18n plans, document that explicitly and note what would be required to add a second language.

---

**3d. `module-map.md`**

Map all major modules derived from Q3, Q8, and the source scan. Include:
- Module name, description, and current status (complete / in-progress / planned)
- Dependencies between modules
- Route-to-component mapping
- Backend or serverless function inventory if applicable
- Locked files — files that must not be changed without explicit review
- A markdown diagram showing module relationships

---

**3e. `ux-decision-tree.md`**

Document UX decisions and flows from Q8 and Q2. Include:
- Primary user journey: step-by-step happy path from landing to goal completion
- Decision points and branching flows (e.g., logged-in vs. anonymous, free vs. paid)
- Interaction pattern inventory — what patterns dominate the UI (forms, dashboards, wizards)
- Key UX tradeoffs made with rationale
- Accessibility approach and minimum standards
- Mobile and responsive strategy

---

**3f. Learning Layer Blueprint**

Document the in-app learning architecture from Q6. Include:
- Where learning is embedded: tooltip, sidebar, modal, dedicated page, or inline contextual
- Content types in use: explanatory text, worked examples, glossary, step-by-step guides
- Trigger model: how learning surfaces — contextual on interaction, explicit user request, or first-run onboarding sequence
- Tier gating: whether any learning content is premium-only
- Localization approach for learning content
- Any AI-assisted learning or personalization features

Save to `docs/learning-layer.md`.

If the app has no learning component (Q6 answer is "none"), create `docs/learning-layer.md` with a single section: _"No learning layer planned at this time"_ plus a note on what would be required to add one.

---

**3g. Agent Config Pack**

Generate two files that bootstrap the agent infrastructure. Note: `design-tokens.md` was already generated in Step 3b — it is part of this pack by reference.

**`CLAUDE.md`** — Dev conventions and architecture summary. Include:
- Project name and one-liner
- Tech stack summary
- Dev commands: start, build, test, and deploy (exact commands — no paraphrasing)
- Active source directory path
- Backend or serverless path if applicable
- Locked files list (must match module-map.md)
- Environment variable reference — names only, never values
- Import conventions
- Coding style rules specific to this stack

**`REVIEW.md`** — Review checklist tailored to this project's stack and risk profile. Include sections for:
- Security Patterns — API key exposure rules, auth requirements, payment webhook verification; cite specific services from Q9
- Module Isolation — locked files, import conventions, what cannot be changed without review
- Design Token Compliance — where and how tokens from `design-tokens.md` are enforced
- Accessibility — minimum standards for this project's user base
- Performance Standards — project-specific benchmarks based on the tech stack
- Pre-Merge Checklist — ordered steps before any merge to the main branch
- Beacon-Generated Rules — leave this section empty; Beacon populates it over time

Every security rule in REVIEW.md must reference an actual service or pattern used in this project. Generic checklists are not acceptable.

---

## Output Format

After all seven documents are written, print a confirmation report:

```
Foundation complete — [PROJECT_NAME]

Documents generated:
  ✓ project-brief.md
  ✓ design-tokens.md
  ✓ i18n-status.md
  ✓ module-map.md
  ✓ ux-decision-tree.md
  ✓ docs/learning-layer.md
  ✓ CLAUDE.md
  ✓ REVIEW.md

Next steps:
  1. Review each generated file — confirm answers are accurate before writing any code
  2. Run /review-all to verify the agent config pack reads correctly
  3. Commit all generated files: git add -A && git commit -m "feat: Foundation documents"
  4. If any answer was a guess, re-run /foundation [question number] to update that section
```

---

## How to Run

**New project — full interview:**
```
/foundation
```

**Re-run a single question and regenerate affected documents:**
```
/foundation 5
/foundation 7
```

**Force full re-run even if documents already exist (overwrites all):**
```
/foundation --reset
```

**Rules while running:**
1. Foundation is the only proactive agent — run it once at project start, before writing application code. All other agents read what Foundation generates.
2. Pre-fill from source scans wherever possible. The interview should feel like a confirmation session, not a blank form.
3. Ask one question at a time. Wait for the response before proceeding to the next question. Never batch multiple questions in one message.
4. Generated files must contain the builder's actual answers. Do not leave template variables or placeholder text in any output file.
5. If any question is not applicable (e.g., no i18n needed, no learning layer), document that explicitly in the relevant file — a short file stating the decision and its rationale is better than an empty or missing file.
6. `design-tokens.md` must be complete enough that Eagle can use it to evaluate design token compliance. If the builder has no design system, generate a minimal starter set.
7. `REVIEW.md` must be specific to this project's stack. Every security rule must reference an actual service or pattern from Q9.
8. Do not modify any existing application source files. Foundation generates documentation only.
9. If running on a project that already has Foundation documents, read the existing files first and summarize what has changed before overwriting anything.
10. When running git commands, always use `git -C [PROJECT_PATH]` instead of `cd <path> && git ...`.
