# NestCalc LP — Review Rules

Reference for Shield, Eagle, Scribe, and Lighthouse agents.
All rules derive from the actual codebase. Do not flag items listed as documented exceptions.

_Enforced by: Eagle (§1 Design), Shield (§2 Code Quality), Lighthouse (§3 Performance), Shield (§4 Animation), Shield (§5 TypeScript). Beacon appends to §6._

---

## §1 — Design Token Compliance
_Enforced by: Eagle_

### §1.1 Color Tokens

All colors must use a `nok-*` Tailwind utility class or the corresponding CSS custom property. Raw hex values are only permitted in the documented exceptions below.

**Canonical token table** (source: `src/styles/globals.css` `@theme` block):

| Token | Tailwind class | Value | Usage |
|-------|---------------|-------|-------|
| nok-deep | `bg-nok-deep` | `#0f2920` | Page background, hero, footer, navbar |
| nok-forest | `bg-nok-forest` | `#1a3a2a` | Alternating section backgrounds |
| nok-medium | `bg-nok-medium` | `#2d5a42` | Alternating section backgrounds |
| nok-surface | `bg-nok-surface` | `rgba(255,255,255,0.08)` | Card backgrounds |
| nok-white | `text-nok-white` | `#FFFFFF` | Pure white elements |
| nok-gold | `text-nok-gold` / `bg-nok-gold` | `#F59E0B` | CTAs, numbers, highlights, primary accent |
| nok-heading | `text-nok-heading` | `#FFFFFF` | Section headings |
| nok-body | `text-nok-body` | `#FEF3C7` | Body text (warm wheat) |
| nok-caption | `text-nok-caption` | `#D4C9A8` | Captions, muted labels |
| nok-teal | `text-nok-teal` | `#0d9488` | Secondary accent, links |
| nok-red | `text-nok-red` | `#dc2626` | Error states only |
| nok-border | `border-nok-border` | `rgba(255,255,255,0.1)` | Default borders |
| nok-border-light | `border-nok-border-light` | `rgba(255,255,255,0.05)` | Subtle borders |

- **[error]** Any hardcoded hex value not in the table above and not listed as a documented exception below.
- **[warning]** `nok-amber` (`#f59e0b`) and `nok-gold` (`#F59E0B`) are the same value. Use `nok-gold` — `nok-amber` is a duplicate and should not be referenced in new code.

**Documented exceptions — do not flag:**

| Value | Location | Reason |
|-------|----------|--------|
| `#6DC99E` | `Footer.tsx`, `Navbar.tsx` logo text | Brand exception — distinct green tint for "Nest" in the split-color wordmark |
| `#fcd34d` | `Footer.tsx`, `Navbar.tsx` logo text | Brand exception — distinct gold tint for ".ai" in the split-color wordmark |
| `#F59E0B`, `#0d9488`, `#0f2920` as array values | `GradientMesh.tsx` Three.js color props | R3F requires raw hex arrays; Tailwind classes cannot be passed to Three.js color props; values map to canonical tokens |
| `#fbbf24` | `globals.css` scrollbar hover | One-off scrollbar hover state |

### §1.2 Fonts

- **[error]** Display/heading text must use `font-display` → Space Grotesk (weights 600, 700).
- **[error]** Body/paragraph text must use `font-body` → Outfit (weights 300–600).
- **[error]** Any font family other than Space Grotesk or Outfit. `font-sans` or `font-mono` fallbacks are only acceptable in `<code>` or `<pre>` elements.
- **[warning]** `font-sans` used where `font-body` should be.

### §1.3 Typography Scale

Use defined scale utilities. Do not introduce arbitrary font sizes when a named utility covers the use case.

| Utility | Usage |
|---------|-------|
| `text-hero` | Hero headline only (`clamp(2.5rem, 5vw, 4rem)`) |
| `text-section` | Section `<h2>` headings (`clamp(2rem, 4vw, 3.5rem)`) |
| `card-title` | Card titles (`1.25rem`, weight 600) |

- **[warning]** Arbitrary Tailwind font size (e.g. `text-[2.3rem]`) when a named scale utility covers the use case.
- **[error]** More than one `<h1>` per page. One `<h1>` (Hero headline), `<h2>` for sections, `<h3>` for cards.

### §1.4 Inline Styles

Inline `style` props are only permitted for values that are computed at runtime and cannot be expressed as Tailwind utilities.

**Permitted inline styles:**
- Dynamic `transform` values (e.g. 3D tilt in `GlowCard`, magnetic offset in `MagneticButton`)
- Mouse/scroll-computed positions
- Three.js color arrays
- Split-color logo text (`#6DC99E` / `#fcd34d` brand exceptions, in `Navbar.tsx` and `Footer.tsx`)

- **[error]** Static color values, static spacing, static font sizes, or static layout properties in `style={}` when a Tailwind utility class exists.

### §1.5 Responsive Design

- **[error]** New UI not tested at 375px minimum viewport width.
- **[warning]** Horizontal scroll introduced outside a documented scrollable container.
- **[warning]** Section background colors deviating from the established alternating pattern: `nok-deep` / `nok-forest` / `nok-medium`.

---

## §2 — Accessibility Requirements
_Enforced by: Eagle_

### §2.1 Contrast

The site is dark-only. All text must meet WCAG AA minimum contrast against its section background.

| Background | Hex | Minimum |
|-----------|-----|---------|
| nok-deep | `#0f2920` | 4.5:1 normal text · 3:1 large text |
| nok-forest | `#1a3a2a` | 4.5:1 normal text · 3:1 large text |
| nok-medium | `#2d5a42` | 4.5:1 normal text · 3:1 large text |

Known compliant pairings: white (`#FFFFFF`) on any nok-* background passes AA. Gold (`#F59E0B`) on `nok-deep` passes for large/bold text.

- **[warning]** New text/background combinations not already present in the codebase without a contrast verification.
- **[warning]** `nok-caption` (`#D4C9A8`) used as body text on `nok-medium` — verify contrast before use.

### §2.2 ARIA

Decorative elements must be hidden from screen readers. The following are correctly marked — maintain them:

| Element | Required attribute |
|---------|------------------|
| `ParticleField` canvas | `aria-hidden="true"` |
| `NoiseOverlay` | `aria-hidden="true"` |
| `GradientMesh` | `aria-hidden="true"` |
| `CustomCursor` divs | `aria-hidden="true"` |
| `ScrollProgress` bar | `aria-hidden="true"` |

- **[error]** Decorative effect components without `aria-hidden="true"`.
- **[error]** Icon-only buttons or controls without `aria-label` describing the action.
- **[error]** Form inputs without a `<label>` or `aria-label`.
- **[error]** The Navbar hamburger button must retain `aria-label` that updates to "Open menu" / "Close menu" based on state. (Currently implemented — do not remove.)

### §2.3 Keyboard Navigation

- **[error]** Interactive elements not reachable by Tab key.
- **[error]** Modal opened without focus trap — keyboard focus must not escape to the background page while a `LegalModal` is open.
- **[error]** `LegalModal` must close on `Escape` key. (Currently implemented — do not remove the `onKey` handler in `LegalModal.tsx`.)
- **[warning]** No visible focus ring on interactive elements. `cursor: none` is applied on pointer devices — ensure keyboard focus styles remain visible.
- **[warning]** `tabIndex` values above `0` without documented justification.

### §2.4 Touch Targets

- **[warning]** Buttons or links with a hit area smaller than 44×44px on mobile viewports.
- `MagneticButton` default padding (`px-8 py-4`) meets this requirement — do not reduce it.

### §2.5 prefers-reduced-motion

**Current status:** Not yet implemented in this codebase. This is a known gap, not a regression.

- **[warning]** Any new animation added without a `prefers-reduced-motion` fallback. Note the gap is pre-existing.

When implementing:
- CSS: wrap animation declarations in `@media (prefers-reduced-motion: no-preference) { ... }` or provide a `reduce` block that disables them
- Framer Motion: use `useReducedMotion()` hook and conditionally set `transition={{ duration: 0 }}`
- `ParticleField`: detect preference and skip RAF loop or reduce to a static render
- GSAP: check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` before initializing scroll animations

---

## §3 — Performance Rules
_Enforced by: Lighthouse_

### §3.1 Lazy Loading

All section components below `Hero` must be loaded via `React.lazy` + `<Suspense fallback={null}>` in `App.tsx`.

**Eager-loaded (correct, do not change):** `Navbar`, `Hero`, `CustomCursor`, `ScrollProgress`, `NoiseOverlay`

- **[error]** A section component directly imported (not via `React.lazy`) in `App.tsx`.

### §3.2 Chunk Splitting

`vite.config.ts` defines three manual chunks. Do not collapse them.

| Chunk | Contents |
|-------|----------|
| `three-vendor` | `three`, `@react-three/fiber`, `@react-three/drei` |
| `animation-vendor` | `framer-motion`, `gsap` |
| default | Application code |

- **[error]** Changes to `vite.config.ts` manual chunk config that merge these into fewer chunks.

### §3.3 Image Optimization

- **[error]** Any image in `src/assets/` or `public/` exceeding 200KB.
- Reference: `nestcalc-logo-gold-green.png` is ~21KB — this is the target size class for logos.
- Prefer `.webp` for photography; `.png` for logos requiring transparency; `.svg` for icons/illustrations.
- **[warning]** New images committed without checking file size.

### §3.4 Canvas Performance

- **[warning]** Increases to `ParticleField` particle count (currently 120 desktop / 60 mobile) without a performance justification.
- **[error]** Removal of the `IntersectionObserver` pause logic in `ParticleField` — it must pause the animation loop when the canvas is off-screen.
- DPR cap at 2 must remain in place.

### §3.5 Dependencies

- **[error]** New production dependency added for functionality achievable with existing libraries (React 19, Framer Motion, GSAP, Three.js/R3F, Tailwind v4).
- **[warning]** New dependency without a check that it is tree-shakeable.

---

## §4 — Animation Performance Rules
_Enforced by: Shield_

### §4.1 GPU-Accelerated Properties Only

Animations must only transition `transform` and `opacity`. These are composited by the GPU and do not trigger layout or paint.

- **[error]** Animating `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, or `border-width`.
- **[error]** Animating `background-color` as a CSS transition on an element that changes frequently.
- **[warning]** Animating `filter` (blur, brightness) — permissible but expensive; document the intent.

**Known exception — do not flag:**
- `hero-glow` keyframe animates `text-shadow` — pre-existing design decision for the hero headline; isolated to one element.

### §4.2 Framer Motion Conventions

- **[error]** `whileInView` with `once: false` — entrance animations must fire once only.
- **[warning]** Sequential `delay` props used as a manual stagger instead of `staggerChildren` in a `variants` object.
- **[error]** `AnimatePresence` removed from modal or mobile menu wrappers — it is required for exit animations.

### §4.3 GSAP Conventions

- **[error]** `initScrollAnimations()` called anywhere other than the `useEffect` in `App.tsx`.
- **[error]** `cleanupScrollAnimations()` not called in the `App.tsx` `useEffect` cleanup return.
- **[error]** `.reveal-section` or `.stagger-children` class names changed — these are the GSAP scroll animation targets.
- **[warning]** `willChange` set/revert pattern removed from `animations.ts` — it must be set before GSAP animates an element and reverted after for performance.

### §4.4 Canvas Cleanup

- **[error]** `cancelAnimationFrame` not called in the cleanup function of `ParticleField`'s main `useEffect`. Missing cleanup causes memory leaks and runaway animation loops.

### §4.5 No Layout-Triggering Reads in Animation Loops

- **[warning]** `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`, `clientWidth`, or `scrollTop` read inside a `requestAnimationFrame` loop. One-time setup or resize event reads are acceptable.

### §4.6 CSS Keyframe Animations

All CSS keyframes defined in `globals.css` use only `transform` and `opacity` — except `hero-glow` (noted above) and `mesh-drift` (uses `transform` — acceptable). This must be maintained for new keyframes added.

- **[error]** New `@keyframes` block that animates a layout-triggering property.

---

## §5 — TypeScript Strictness
_Enforced by: Shield_

### §5.1 Required Compiler Flags

These flags in `tsconfig.app.json` must not be disabled:

| Flag | Required value |
|------|---------------|
| `strict` | `true` |
| `noUnusedLocals` | `true` |
| `noUnusedParameters` | `true` |
| `verbatimModuleSyntax` | `true` |
| `erasableSyntaxOnly` | `true` |

- **[error]** Any of these flags set to `false` or removed.

### §5.2 No `any`

- **[error]** `any` used as a prop type, state type, or function return type without an inline comment justification.
- Permitted alternatives: `unknown` with a type guard, specific union types, generics.

### §5.3 Props Interfaces

- **[warning]** Components with more than 2 props that use inline destructured types without a named `interface` or `type` alias.

### §5.4 Type-Only Imports

- **[error]** Type-only imports missing the `type` keyword (required by `verbatimModuleSyntax`).

  Correct: `import type { Foo } from './foo'`
  Wrong: `import { Foo } from './foo'` when `Foo` is only used as a type

---

## §6 — Code Quality
_Enforced by: Shield_

### §6.1 Import Order

Enforce this order within each file (blank line between groups is optional but preferred):

1. React and React hooks
2. Third-party libraries (`framer-motion`, `gsap`, `three`, `@react-three/*`)
3. Internal components (`../components/`, `./`)
4. Internal hooks (`../hooks/`)
5. Internal lib/utils (`../lib/`)
6. Assets (images, SVGs)

- **[warning]** Assets imported before internal modules. Third-party imports interleaved with internal imports.

### §6.2 Component Structure

- **[error]** A component function defined inside another component's function body (not just JSX — referring to `function Foo() {}` or `const Foo = () =>` declared inside render scope).
- **[warning]** Multiple unrelated exported components in a single file.
- Section-specific subcomponents used only within that file may be co-located in the same file — this is correct and expected.

### §6.3 Hook Rules

- **[error]** Any React hook called after a conditional return.
- **[error]** Reusable custom hook logic defined inline in a component file — it belongs in `src/hooks/`.

### §6.4 Error Handling

- **[error]** Empty `catch` blocks — at minimum `console.error` the caught value.
- **[error]** Error states with no user-visible recovery path.
- Reference pattern: `Contact.tsx` form — idle → submitting → success/error with a direct email fallback on error.

### §6.5 Locked Files

Do not modify these files without explicit review:

| File | Reason |
|------|--------|
| `src/lib/birdPaths.ts` | Production-calibrated SVG path data for the canvas bird mascot. Wrong values break rendering silently. |
| `src/styles/globals.css` `@theme` block | Single source of truth for all design tokens. Changing a value cascades everywhere. |
| `src/components/effects/ParticleField.tsx` | 628-line canvas animation with per-frame physics and Path2D rendering. Highly fragile. |

- **[error]** Modifications to `src/lib/birdPaths.ts` without explicit instruction.

### §6.6 Netlify Form Integrity

The hidden form in `index.html` is required for Netlify Forms to detect the form at build time. `Contact.tsx` POSTs with `form-name=contact` matching the `name` attribute.

- **[error]** Removal or renaming of the hidden form in `index.html`.
- **[error]** Field names in `Contact.tsx` that do not match the hidden form fields in `index.html`.

### §6.7 Section IDs

Navbar IntersectionObserver and all anchor links depend on exact `id` attribute strings:
`hero`, `solutions`, `ourtech`, `trust`, `whynestcalc`, `contactus`

- **[error]** Renaming a section `id` without updating the corresponding nav link and any anchor references.

---

## §7 — Beacon-Generated Rules
_Rules appended by `/beacon-rules` after confirming recurring feedback patterns._
_Rule IDs use the `B-` prefix._

_No Beacon-generated rules yet. Run `/beacon-rules` after collecting feedback in `feedback-log.md`._
