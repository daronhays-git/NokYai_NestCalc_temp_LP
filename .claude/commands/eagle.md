# /eagle — Design & UI/UX Review

Read-only review agent. Do not modify any files.

## Setup

Read these files before reviewing anything:
1. `CLAUDE.md` — project identity, dark-only design, component patterns
2. `REVIEW.md` — enforcement rules for §1 Design Token Compliance, §2 Accessibility
3. `design-tokens.md` — canonical token values, component patterns, spacing, gradients

---

## Review Steps

### 1. Color Token Compliance (REVIEW.md §1.1, design-tokens.md §Color Palette)

Scan all `.tsx` files under `src/components/` for raw hex values.

For each raw hex found, check against the documented exceptions table in `design-tokens.md §Raw Hex Exceptions`. If the value is listed there, it is acceptable — do not flag it.

Flag any hex value **not** in the exceptions table:
- Include the file path, line number, and the hex value found
- Suggest the correct `nok-*` token to use

Also flag:
- `nok-amber` used in new code — it is a duplicate of `nok-gold`; use `nok-gold` instead
- Any `style={{ color: '...' }}` or `style={{ backgroundColor: '...' }}` with a static value that has a Tailwind equivalent

### 2. Font Compliance (REVIEW.md §1.2, design-tokens.md §Typography)

Scan all `.tsx` files under `src/` for:
- Font family strings other than `Space Grotesk` or `Outfit`
- `font-sans` used where `font-body` should be applied
- `font-mono` outside of `<code>` or `<pre>` elements
- Inline `style={{ fontFamily: '...' }}` with a font not in the token set

### 3. Typography Scale (REVIEW.md §1.3)

Scan all `.tsx` files for arbitrary Tailwind font-size values (e.g. `text-[2.3rem]`, `text-[18px]`) when a named scale utility (`text-hero`, `text-section`, `card-title`) covers the use case.

Also check heading hierarchy in section components:
- Exactly one `<h1>` in `src/components/sections/Hero.tsx`
- `<h2>` used for section headings (via `SectionHeading` component)
- `<h3>` used for card titles

### 4. Spacing Compliance (REVIEW.md §1.4, design-tokens.md §Spacing)

Check section padding in every file under `src/components/sections/`:
- Standard pattern: `py-12 sm:py-16 lg:py-32`
- Compact pattern: `py-16 lg:py-20` (TechStack only)
- Footer: `py-8 lg:py-16`

Flag any section that uses a different padding pattern without a documented reason.

Check container usage:
- Every section should use `max-w-7xl mx-auto px-6` as the inner content wrapper
- Flag sections using a different max-width or horizontal padding

### 5. Inline Style Audit (REVIEW.md §1.4)

Scan all `.tsx` files for `style={{` props. For each occurrence, verify it falls into a permitted category:
- Dynamic `transform` (3D tilt, magnetic offset, animated position)
- Mouse/scroll-computed position values
- Three.js color arrays
- Brand exceptions (`#6DC99E`, `#fcd34d` for logo text)

Flag any `style={{` prop containing a static value that could be a Tailwind utility class.

### 6. ARIA and Decorative Elements (REVIEW.md §2.2)

Check these components still have `aria-hidden="true"`:
- `src/components/effects/ParticleField.tsx` — canvas element
- `src/components/effects/NoiseOverlay.tsx` — root element
- `src/components/effects/GradientMesh.tsx` — root element
- `src/components/ui/CustomCursor.tsx` — both cursor divs
- `src/components/ui/ScrollProgress.tsx` — root element

Check interactive elements in all component files:
- Icon-only buttons must have `aria-label`
- Form inputs must have `<label htmlFor="...">` or `aria-label`
- The Navbar hamburger button must have `aria-label` that reflects its open/closed state

Flag any interactive element without an accessible label.

### 7. Keyboard Navigation (REVIEW.md §2.3)

Check `src/components/legal/LegalModal.tsx`:
- Confirm the `Escape` key handler (`onKey`) is still present and calls `onClose`

Check all modal and overlay components:
- Body scroll lock must be applied when open and removed on close
- Flag any modal that does not restore `document.body.style.overflow` on unmount

Scan for `tabIndex` values greater than `0` — flag each occurrence.

### 8. Touch Targets (REVIEW.md §2.4)

Scan all button and link elements in `src/components/`:
- `MagneticButton` base padding `px-8 py-4` must remain — flag if reduced
- Flag any `<button>` or `<a>` with padding that would result in a hit area below 44×44px on mobile

### 9. Responsive Behavior (REVIEW.md §1.5)

Scan all section and layout components for:
- Any layout that could introduce horizontal overflow (absolute-positioned elements wider than the viewport, `overflow-x: visible` without a containing clip)
- Missing mobile breakpoints on text sizes or padding (e.g. `text-xl` without a fallback at smaller sizes)
- TechStack marquee — confirm `overflow-hidden` is applied on the outer container to prevent horizontal bleed

### 10. Animation Properties (REVIEW.md §4.1)

Scan all `.tsx` files and `globals.css` for animations and CSS transitions:
- Flag any animation or transition on `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, or `border-width`
- Flag any Framer Motion `animate` prop targeting a layout-triggering property
- `hero-glow` animating `text-shadow` is a known, documented exception — do not flag it

Framer Motion conventions:
- `whileInView` must use `once: true` — flag any `once: false`
- Flag manual `delay` props used as a stagger instead of `staggerChildren` in a variants object

### 11. Section Background Alternation (design-tokens.md §Color Palette)

Verify the section background sequence matches the documented flow:
```
Hero         → bg-nok-deep
Services     → bg-nok-medium
TechStack    → bg-nok-forest
WhyNestCalc    → (no bg class — inherits page bg)
Testimonials → bg-nok-forest
Contact      → bg-nok-medium
Footer       → bg-nok-deep
```

Flag any section whose background deviates from this pattern.

---

## Output Format

```
## Eagle Review — [date]

### Color Tokens
✅ ...
⚠️ ...
❌ ...

### Font Compliance
...

### Typography Scale
...

### Spacing
...

### Inline Styles
...

### ARIA / Decorative Elements
...

### Keyboard Navigation
...

### Touch Targets
...

### Responsive Behavior
...

### Animation Properties
...

### Section Backgrounds
...

---
### Recommendations
- (optional improvements — not rule violations)
```

**Severity key:**
- ✅ **Passing** — rule followed correctly
- ⚠️ **Warning** — not broken but should be addressed
- ❌ **Issue** — violation that must be fixed
