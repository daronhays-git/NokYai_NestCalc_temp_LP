# /shield — Code Quality & Security Review

Read-only review agent. Do not modify any files.

## Setup

Read these files before reviewing anything:
1. `CLAUDE.md` — project identity, architecture, coding rules, locked files
2. `REVIEW.md` — enforcement rules for §2 Code Quality, §4 Animation Performance, §5 TypeScript

---

## Review Steps

### 1. TypeScript Strictness (REVIEW.md §5)

Read `tsconfig.app.json` and verify these flags are present and set to `true`:
- `strict`
- `noUnusedLocals`
- `noUnusedParameters`
- `verbatimModuleSyntax`
- `erasableSyntaxOnly`

Scan all `.ts` and `.tsx` files under `src/` for:
- `any` type used without an inline comment justification — flag each occurrence with file and line
- Type-only imports missing the `type` keyword (e.g. `import { Foo }` where Foo is only used as a type)
- Components with more than 2 props that have no named `interface` or `type` alias for their props

### 2. Security Patterns (REVIEW.md §2.4)

Scan all `src/` files for:
- Hardcoded credentials or API keys — strings matching `sk-`, `Bearer `, or base64 blobs longer than 30 characters
- `dangerouslySetInnerHTML` — flag any occurrence; verify content source is documented as trusted
- Environment variables accessed in client code that are not prefixed with `VITE_`
- Direct browser fetch calls to third-party APIs that should route through a serverless function

### 3. Error Handling (REVIEW.md §2.1, §6.4)

Scan all `src/` files for:
- `async/await` calls not wrapped in `try/catch`
- Empty `catch` blocks with no `console.error` call
- `.then()` chains with no `.catch()` and no trailing `try/catch`
- UI error states that show no user-visible recovery path

Reference: `src/components/sections/Contact.tsx` is the correct pattern — idle → submitting → success/error with a direct email fallback link on failure.

### 4. Animation Cleanup (REVIEW.md §4.3, §4.4)

**ParticleField** (`src/components/effects/ParticleField.tsx`):
- Confirm `cancelAnimationFrame` is called in the cleanup `return` of the main `useEffect`
- Confirm any `IntersectionObserver` instance is `.disconnect()`ed on cleanup

**App.tsx** (`src/App.tsx`):
- Confirm `initScrollAnimations()` is called exactly once, inside a `useEffect`
- Confirm `cleanupScrollAnimations()` is called in that `useEffect`'s cleanup return
- Search all of `src/` for any other call to `initScrollAnimations()` — there must be none

**GSAP in other components**:
- If any component outside `src/lib/animations.ts` creates a `ScrollTrigger` instance, confirm `.kill()` is called on unmount
- Confirm `willChange` is set before GSAP animates an element and reverted after

### 5. Netlify Form Integrity (REVIEW.md §6.6)

Read both files:
- `index.html`
- `src/components/sections/Contact.tsx`

Extract the hidden form field names from `index.html` (`<input name="...">`, `<textarea name="...">`).
Extract the field names appended to the `URLSearchParams` body in `Contact.tsx`.

- Confirm both sets are identical
- Confirm the hidden form still has `name="contact"` and `data-netlify="true"`
- Flag any field name present in one but not the other

### 6. Architectural Drift (CLAUDE.md §Component Patterns)

**Lazy loading** — read `src/App.tsx`:
- Every section below Hero must be loaded with `React.lazy()`
- Each lazy import must be wrapped in `<Suspense fallback={null}>`
- Flag any section component imported directly (not lazy)

**Eager components** (these must NOT be lazy — flag if they are):
`Navbar`, `Hero`, `CustomCursor`, `ScrollProgress`, `NoiseOverlay`

**Component isolation** — scan `src/components/`:
- No component function (`function Foo()` or `const Foo = () =>`) defined inside another component's render body
- No reusable custom hook defined inline in a component file — hooks belong in `src/hooks/`
- All React hooks appear before any conditional return in every component file

**Locked files**:
- `src/lib/birdPaths.ts` — if git is available, check `git diff` or `git status` for changes; flag if modified
- `src/styles/globals.css` `@theme` block — note if any token hex value differs from the values in `design-tokens.md`

### 7. Import Order (REVIEW.md §6.1)

Sample at least 6 component files across `src/components/` and verify the import order in each:
1. React and React hooks
2. Third-party libraries (`framer-motion`, `gsap`, `three`, `@react-three/*`)
3. Internal components (`../components/`, `./`)
4. Internal hooks (`../hooks/`)
5. Internal lib/utils (`../lib/`)
6. Assets (images, SVGs)

Flag files where third-party and internal imports are interleaved, or where assets appear before internal modules.

### 8. Section ID Integrity (REVIEW.md §6.7)

Read `src/components/layout/Navbar.tsx` and each section file.

Extract `id` attributes from section root elements. Extract `href` values from Navbar links.

Expected IDs: `hero`, `solutions`, `ourtech`, `trust`, `whynestcalc`, `contactus`

Flag any section `id` or nav `href` that does not match this set.

### 9. Logging and Dead Code (REVIEW.md §2.2)

Scan all `src/` files for:
- `console.log(` — warn on each occurrence
- Commented-out code blocks longer than 2 lines
- `debugger` statements

---

## Output Format

```
## Shield Review — [date]

### TypeScript
✅ ...
⚠️ ...
❌ ...

### Security
...

### Error Handling
...

### Animation Cleanup
...

### Netlify Form Integrity
...

### Architecture
...

### Import Order
...

### Section IDs
...

### Logging / Dead Code
...

---
### Recommendations
- (optional improvements — not rule violations)
```

**Severity key:**
- ✅ **Passing** — rule followed correctly
- ⚠️ **Warning** — not broken but should be addressed
- ❌ **Issue** — violation that must be fixed
