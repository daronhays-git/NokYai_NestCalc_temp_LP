# NestCalc.ai — Design Tokens

---

## Color Palette

<!-- Foundation fills this from Q7: colors and aesthetic.
     Choose meaningful names for your two main hues (e.g., "Forest Green", "Slate Blue").
     If the project has a secondary brand color, fill in §Color — Secondary.
     If single-hue, delete §Color — Secondary and §Color — Accent. -->

### Primary Color — Forest Green
<!-- Example name: "Forest Green", "Ocean Blue", "Midnight" -->

| Token | Value | Usage |
|-------|-------|-------|
| `primary[900]` | `#0f2920` | Darkest — headers, primary text on light surfaces |
| `primary[800]` | `#1a3a2a` | Strong emphasis — card title text, gradient ends |
| `primary[700]` | `#2d5a42` | Active states — active tab background, focus rings |
| `primary[600]` | `#2d5a42` | Default brand color — buttons, links, accents |
| `primary[500]` | `#6DC99E` | Mid-tone — success indicators, status chips |
| `primary[400]` | `rgba(255,255,255,0.1)` | Border highlights — focused input borders |
| `primary[300]` | `rgba(255,255,255,0.05)` | Soft accents — glow shadows, decorative lines |
| `primary[200]` | `rgba(255,255,255,0.08)` | Tinted text on dark backgrounds — header subtext |
| `primary[100]` | `#D4C9A8` | Light backgrounds — badge fills, highlighted rows |
| `primary[50]`  | `#FEF3C7`  | Whisper tint — highlighted input background |

<!-- Example (delete after filling in):
| `primary[900]` | `#0B3D2E` | Darkest forest green |
| `primary[600]` | `#1A7D55` | Default brand green — buttons, links |
-->

---

### Secondary Color — Gold
<!-- Example name: "Gold", "Coral", "Sky" — delete this section if the project is single-hue -->

| Token | Value | Usage |
|-------|-------|-------|
| `secondary[700]` | `#fcd34d` | Gradient end — logo, icon accents |
| `secondary[500]` | `#F59E0B` | Default secondary — upgrade badges, tier accents |
| `secondary[400]` | `#f59e0b` | Decorative text — `.ai` suffix, section underlines |

---

### Accent Color — Teal
<!-- Optional. Use for a third brand hue, highlight color, or call-to-action contrast.
     Delete this section if not needed. -->

| Token | Value | Usage |
|-------|-------|-------|
| `accent[600]` | `#0d9488` | Primary accent use |
| `accent[400]` | `#14b8a6` | Lighter accent — hover states, borders |
| `accent[100]` | `rgba(13,148,136,0.1)` | Accent tint — chip backgrounds |

---

### Neutrals / Grays

<!-- Foundation fills this from Q7: these are the grays that form the UI chrome —
     inputs, cards, labels, borders, and backgrounds. -->

| Token | Value | Usage |
|-------|-------|-------|
| `gray[900]` | `#FFFFFF` | Near-black — darkest body text |
| `gray[800]` | `#FEF3C7` | Strong text — input values, headings |
| `gray[700]` | `#D4C9A8` | Neutral text — secondary data |
| `gray[600]` | `rgba(255,255,255,0.6)` | Muted text — inactive tabs, form labels |
| `gray[500]` | `rgba(255,255,255,0.4)` | Placeholder text — card sub-labels |
| `gray[400]` | `rgba(255,255,255,0.25)` | Faint text — sub-labels, fine print |
| `gray[300]` | `rgba(255,255,255,0.15)` | Loading / skeleton states |
| `gray[200]` | `rgba(255,255,255,0.1)` | Default borders — input borders, dividers |
| `gray[100]` | `rgba(255,255,255,0.05)` | UI structure — card borders, table dividers |
| `gray[50]`  | `rgba(255,255,255,0.08)`  | Surface tints — disabled inputs, chip backgrounds |

<!-- Example:
| `gray[800]` | `#2D3A4A` | Input value text |
| `gray[200]` | `#D0D9E0` | Default input border |
-->

---

### Semantic Colors

<!-- Foundation fills this from Q7. These map to system states, not brand identity.
     Semantic colors must work on both light and dark surfaces. -->

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `color.success` | `#10b981` | `#34d399` | Positive outcomes, completed states |
| `color.warning` | `#F59E0B` | `#fbbf24` | Caution indicators, near-limit states |
| `color.danger`  | `#dc2626`  | `#ef4444`  | Errors, destructive actions, negative values |
| `color.info`    | `#0d9488`    | `#2dd4bf`    | Informational — tooltips, notices |

<!-- Example:
| `color.success` | `#1E8C60` | `#2ECC71` | Positive values, completed states |
| `color.danger`  | `#C0392B` | `#E74C3C` | Errors, negative values |
-->

---

### Surface Colors

<!-- These are the page-level and component-level backgrounds. -->

| Token | Light Value | Dark Value | Usage |
|-------|-------------|------------|-------|
| `surface.bg`      | `#0f2920`   | `#0f2920`   | Page background |
| `surface.card`    | `#1a3a2a` | `#1a3a2a` | Card, input, nav background |
| `surface.overlay` | `rgba(0,0,0,0.5)`      | `rgba(0,0,0,0.7)`     | Modal backdrop |

<!-- Example:
| `surface.bg`   | `#FAFBFC` | `#0F1419` | Page background |
| `surface.card` | `#FFFFFF`  | `#1A2332` | Card background |
-->

---

### Hard-Coded Exceptions
<!-- List any hex values that appear in code but are NOT in the token system.
     Each exception needs a documented reason. Delete rows that don't apply. -->

| Hex | Usage | Reason for exception |
|-----|-------|----------------------|
| `#6DC99E` | Logo "Nest" text glow | Brand-specific glow; not in nok-* scale |
| `#fcd34d` | Logo ".ai" text glow | Matches secondary[700] / Tailwind amber-300 |

_Add exceptions here as they are identified. Prefer adding tokens over accumulating exceptions._

---

## Project-Specific Token System (nok-*)

The `nok-*` palette is defined as CSS custom properties in `src/styles/globals.css` and consumed via Tailwind v4 class names (e.g., `bg-nok-deep`, `text-nok-heading`).

| Token | Value | Usage |
|-------|-------|-------|
| `nok-deep`         | `#0f2920`               | Page background |
| `nok-forest`       | `#1a3a2a`               | Card / section background |
| `nok-medium`       | `#2d5a42`               | Section background variant |
| `nok-surface`      | `rgba(255,255,255,0.08)` | Frosted surface / glass effect |
| `nok-gold`         | `#F59E0B`               | Primary brand accent (gold) |
| `nok-heading`      | `#FFFFFF`               | Heading text |
| `nok-body`         | `#FEF3C7`               | Body text — warm cream |
| `nok-caption`      | `#D4C9A8`               | Secondary / muted text |
| `nok-teal`         | `#0d9488`               | Secondary accent |
| `nok-amber`        | `#f59e0b`               | Gold alias |
| `nok-red`          | `#dc2626`               | Danger / destructive |
| `nok-border`       | `rgba(255,255,255,0.1)` | Card / nav borders |
| `nok-border-light` | `rgba(255,255,255,0.05)`| Subtle borders |

---

## Typography

<!-- Foundation fills this from Q7: fonts and aesthetic direction.
     If using Google Fonts, list the import URL in CLAUDE.md.
     If using system fonts only, document the stack and delete the import note. -->

### Font Families

| Token | Stack | Loaded Weights | Role |
|-------|-------|----------------|------|
| `font.display` | `'Space Grotesk', sans-serif` | `600, 700` | Headings, hero text, section titles |
| `font.body`    | `'Outfit', sans-serif`       | `300, 400, 500, 600`    | UI labels, body copy, buttons |

<!-- Example:
| `font.display` | `'Playfair Display', Georgia, serif`       | 400, 600, 700, 800 | Headings |
| `font.body`    | `'DM Sans', 'Segoe UI', sans-serif`        | 400, 500, 600, 700 | Labels, buttons |
| `font.mono`    | `'JetBrains Mono', 'Fira Code', monospace` | 400, 500, 600, 700 | Data values |
-->

<!-- Foundation: if the project uses only one or two font families, delete unused rows. -->

---

### Type Scale

<!-- Foundation fills this from Q7 and Q8 (key user flow).
     Map each UI element to font family, size, weight, and line height. -->

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Page title (`h1`) | display | `clamp(2.5rem, 5vw, 4rem)` | `800` | `1.05` |
| Section header (`h2`) | display | `clamp(2rem, 4vw, 3.5rem)` | `700` | default |
| Card header (`h3`) | display | `1.25rem` | `600` | default |
| Body / labels | body | `1rem` | `400` | `1.45` |
| Small / sub-labels | body | `0.875rem` | `400` | default |
| Caption / fine print | body | `0.75rem` | default | default |
| Input fields | mono | `1rem` | default | default |
| Badges / chips | body | `0.875rem` | `500` | default |
| Buttons (primary) | body | `1rem` | `700` | default |

<!-- Example sizes (all in rem):
h1: 1.7rem / 800 weight
h2: 1.6rem / 700 weight
h3: 1.25rem–1.4rem / 700 weight
body: 0.95rem / 500 weight / 1.5 line-height
caption: 0.75rem–0.78rem
data-lg: 2.1rem / 700 weight
input: 1.1rem
badge: 0.78rem–0.82rem / 600–700 weight
-->

---

### Weight Scale

| Name | Value | Typical use |
|------|-------|-------------|
| `weight.regular` | 400 | Body text, default |
| `weight.medium`  | 500 | Labels, secondary UI |
| `weight.semibold`| 600 | Badge text, small emphasis |
| `weight.bold`    | 700 | Headings, active states |
| `weight.black`   | 800 | Hero titles, pricing display |

---

### Letter Spacing

| Context | Value |
|---------|-------|
| Badges / chips / tier labels | `0.05em` |
| Section sub-labels | `0.05em` |
| All-caps elements | `0.1em` |

<!-- Example: badge: 0.03em–0.05em / label: 0.08em / caps: 0.1em -->

---

## Spacing System

<!-- Foundation fills this from Q7 and Q3 (tech stack — Tailwind has its own scale).
     If using Tailwind, map these names to Tailwind spacing classes instead of px/rem values.
     If ad-hoc (no formal scale), document the values extracted from the source. -->

### Base Unit

- **Spacing base:** `4px`
<!-- Example: 4px (most design systems) or 8px (Material, Radix) -->

### Scale

| Token | Value | Common use |
|-------|-------|------------|
| `spacing.xs`  | `4px`  | Tight gaps — icon-to-label, chip internal padding |
| `spacing.sm`  | `8px`  | Close elements — form field gap, badge padding |
| `spacing.md`  | `16px`  | Standard — card internal padding, list item gap |
| `spacing.lg`  | `24px`  | Sections — between major UI groups |
| `spacing.xl`  | `32px`  | Page sections — between cards, below headers |
| `spacing.2xl` | `48px` | Page-level — section margin, hero padding |

<!-- Example (4px base):
xs: 4px / sm: 8px / md: 16px / lg: 24px / xl: 32px / 2xl: 48px
-->

---

### Layout

| Element | Desktop value | Mobile value |
|---------|--------------|--------------|
| Max content width | `1280px` | — |
| Page padding | `24px` | `24px` |
| Header padding | `64px` | `64px` |
| Section title margin | `48px` | — |
| Card padding | `24px` | `16px` |
| Grid gap (tight) | `16px` | — |
| Grid gap (standard) | `24px` | — |

<!-- Example:
Max width: 1360px / Page desktop: 20px 32px 60px / Page mobile: 12px 14px 60px
Card padding: 24px 28px
-->

---

## Breakpoints

<!-- Foundation fills this from Q7 and Q8 (mobile strategy from Q2 user context). -->

| Name | Min width | CSS media query |
|------|-----------|-----------------|
| `bp.mobile`  | `0px`              | _base (mobile-first)_ |
| `bp.tablet`  | `640px`  | `@media (min-width: 640px)` |
| `bp.desktop` | `768px` | `@media (min-width: 768px)` |
| `bp.wide`    | `1280px`    | `@media (min-width: 1280px)` |

<!-- Example: tablet: 640px / desktop: 1024px / wide: 1280px
     Common alternatives: tablet: 768px / desktop: 1200px / wide: 1440px -->

- **Minimum supported viewport:** `375px`
  <!-- Example: 375px (iPhone SE, the standard mobile floor) -->

---

## Border Radius Scale

<!-- Foundation fills this from Q7: sharp (0–2px), rounded (4–8px), or pill-forward (≥10px). -->

| Token | Value | Usage |
|-------|-------|-------|
| `radius.none` | `0px`             | No rounding — tables, flush components |
| `radius.sm`   | `4px`   | Subtle rounding — small badges, tags |
| `radius.md`   | `8px`   | Standard — inputs, buttons, tabs |
| `radius.lg`   | `12px`   | Cards, dropdowns |
| `radius.xl`   | `16px`   | Large panels, modals |
| `radius.2xl`  | `24px`  | Hero cards, featured panels |
| `radius.full` | `9999px`          | Pills, avatar circles, toggle tracks |

<!-- Example (rounded aesthetic):
sm: 4px / md: 8px / lg: 10px / xl: 14px / 2xl: 20px
NestCalc specific: inputs 8px / buttons+tabs 10px / standard cards 12px / getCardStyle cards 14px / pills 20px
-->

---

## Shadow / Elevation Scale

<!-- Foundation fills this from Q7: flat (no shadow), subtle, or expressive.
     Use rgba(0,0,0,N) values for shadows that work in both light and dark modes. -->

| Token | Value | Usage |
|-------|-------|-------|
| `shadow.none` | `none` | Flat elements, inline chips |
| `shadow.sm`   | `0 1px 4px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)`  | Subtle lift — cards on light background |
| `shadow.md`   | `0 8px 24px rgba(0,0,0,0.4)`  | Standard — modal, active dropdown |
| `shadow.lg`   | `0 20px 60px rgba(0,0,0,0.5)`  | Elevated — large modal, sticky nav |
| `shadow.xl`   | `0 24px 80px rgba(0,0,0,0.6)`  | Dramatic — hero element, featured card |
| `shadow.inner`| `inset 0 2px 4px rgba(0,0,0,0.3)` | Recessed — pressed button, inset panel |

<!-- Example:
sm:  0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)
md:  0 8px 24px rgba(0,0,0,0.12)
lg:  0 20px 60px rgba(0,0,0,0.20)
xl:  0 24px 80px rgba(0,0,0,0.40)
inner: inset 0 2px 4px rgba(0,0,0,0.10)
-->

---

## Component Patterns

<!-- Foundation fills this from Q7 and Q8.
     Each component block defines the default visual style using the tokens above.
     Update these after finalizing the token values so the specs are internally consistent. -->

### Cards (Default)

```
background:   surface.card
borderRadius: radius.lg          /* 12px */
padding:      24px
boxShadow:    shadow.sm
border:       1px solid gray[100]
transition:   background-color 0.3s ease, border-color 0.3s ease
```

<!-- Example:
borderRadius: 14px / padding: 24px 28px
boxShadow: 0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)
-->

---

### Buttons

#### Primary (CTA)

```
fontFamily:   font.body
fontSize:     1rem
fontWeight:   weight.bold
padding:      16px 32px
height:       56px
borderRadius: radius.md          /* 8px */
border:       none
background:   linear-gradient(135deg, primary[600], primary[800])
color:        #fff
boxShadow:    0 4px 14px primary[300]
```

#### Secondary / Outlined

```
fontFamily:   font.body
fontSize:     1rem
fontWeight:   weight.semibold
padding:      16px 32px
height:       56px
borderRadius: radius.md
border:       2px solid primary[400]
background:   surface.card
color:        primary[700]
```

#### Ghost / Cancel

```
fontFamily:   font.body
fontSize:     0.875rem
fontWeight:   weight.regular
padding:      12px 20px
border:       none
background:   transparent
color:        gray[400]
```

#### Danger

```
/* Same shape as Primary but with semantic danger color */
background:   color.danger
boxShadow:    0 4px 14px rgba(220, 38, 38, 0.3)
```

<!-- Foundation: document additional button variants (icon buttons, toggle buttons, tab buttons) here as they are designed. -->

---

### Inputs (Default State)

```
fontFamily:   font.mono
fontSize:     1rem
padding:      12px 16px
height:       48px
borderRadius: radius.sm          /* 4px */
border:       1px solid gray[200]
background:   surface.card
color:        gray[800]
outline:      none
```

#### Input States

| State | Border | Background |
|-------|--------|------------|
| Default | `1px solid gray[200]` | `surface.card` |
| Focus / active | `1px solid primary[400]` | `surface.card` |
| Highlighted (pre-filled) | `1px solid primary[300]` | `primary[50]` |
| Disabled | `1px solid gray[200]` | `gray[50]` |
| Error | `1px solid color.danger` | `rgba(danger, 0.05)` |

---

### Modals

#### Overlay

```
background: rgba(0,0,0,0.5)
zIndex:     9999   /* Example: 9999 */
```

#### Standard Modal Container

```
background:   surface.card
borderRadius: radius.xl          /* 16px */
padding:      24px
maxWidth:     672px
width:        90%
boxShadow:    shadow.lg
```

#### z-index Stacking

| Layer | z-index | Usage |
|-------|---------|-------|
| Sticky nav | `50` | Main navigation |
| Dropdown / tooltip | `49` | Popovers, tooltips |
| Standard modal | `9999` | Primary modal layer |
| Top-of-stack | `99999` | Critical overlays (e.g., generating screens) |

<!-- Example: nav: 100 / dropdown: 200 / modal: 9999 / top: 99999 -->

---

### Badges / Chips

```
fontFamily:   font.body
fontSize:     0.875rem
fontWeight:   weight.semibold
padding:      6px 16px
borderRadius: radius.full        /* pill */
letterSpacing: 0.05em
textTransform: uppercase
```

Semantic variants:
- **Success badge:** `bg: primary[100]`, `color: primary[700]`
- **Warning badge:** `bg: secondary[100]`, `color: secondary[700]`
- **Danger badge:** `bg: #FDE8E8` (or `color.danger` tint), `color: color.danger`

---

## Dark Mode

This project uses a **fixed dark-only theme** — no light/dark mode switching. All colors are designed for dark surfaces only. Do not add light mode variants or theme toggling.

The page background is always `nok-deep: #0f2920`. All token values in this document are the single canonical values for all contexts.

---

## Animations & Transitions

<!-- Foundation fills this from Q7: "minimal/instant" vs "expressive/animated". -->

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Interactive elements (buttons, tabs) | `all` | `200ms ease` | default |
| Input focus | `border`, `background` | `200ms ease` | default |
| Modal open | `opacity`, `transform` | `250ms ease-out` | ease-out |
| Hover lift | `transform`, `box-shadow` | `200ms ease` | default |

<!-- Example: theme: 300ms / interactive: 250ms / input: 200ms / modal: 200ms / hover: 150ms -->

**Hover lift rule:** `transform: translateY(-2px)` + shadow intensity increases ~2× on hover.

---

## Styling Architecture

<!-- Foundation fills this from Q3 and Q7.
     Document the styling approach so Eagle can enforce it. -->

- **Approach:** `Tailwind v4 utility classes`
  <!-- Example: "Inline styles only — no CSS files, modules, or styled-components anywhere in the project" -->
  <!-- Example: "Tailwind utility classes — inline style props only for dynamic values not expressible in Tailwind" -->
  <!-- Example: "CSS Modules — one .module.css per component, no inline style props except for dynamic values" -->

- **Theme access:** CSS custom properties via Tailwind v4 — use `nok-*` class names (e.g., `bg-nok-deep`, `text-nok-heading`) defined in `src/styles/globals.css`

- **Dynamic values:** Inline `style` props for values derived from JS state or props; Tailwind classes for all static values

---

## Known Token Issues

<!-- Document gaps, inconsistencies, or decisions pending resolution.
     Eagle flags violations of documented tokens; this section tracks tokens not yet fully documented. -->

_No known issues at project start. Add entries as token gaps are discovered._

<!-- Example entries:
- `AuthModal` references `T.muted`, `T.text`, `T.border` — not in the documented token set.
  Resolution needed: formally add tokens or replace with canonical equivalents.
- Input component uses 15px / DM Sans, diverging from the documented InputField spec (1.1rem / font.mono).
  Resolution needed: design decision on whether auth inputs are intentionally different.
-->
