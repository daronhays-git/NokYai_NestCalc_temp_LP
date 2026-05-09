# NestCalc LP — Design Tokens

Canonical design system reference. All values extracted from `src/styles/globals.css` `@theme` block and `tailwind.config.ts`.
Eagle references this file during design compliance reviews.

---

## Color Palette

### Backgrounds

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| nok-deep | `bg-nok-deep` | `#0f2920` | Page root, hero, footer, navbar (scrolled), legal modal overlay |
| nok-forest | `bg-nok-forest` | `#1a3a2a` | TechStack section, Testimonials section, form input backgrounds |
| nok-medium | `bg-nok-medium` | `#2d5a42` | Services section, Contact section |
| nok-surface | `bg-nok-surface` | `rgba(255,255,255,0.08)` | GlowCard content layer, card inner surfaces |

**Section background flow (top to bottom):**
```
Hero         → nok-deep
Services     → nok-medium
TechStack    → nok-forest
WhyNestCalc    → (inherits page bg — nok-deep)
Testimonials → nok-forest
Contact      → nok-medium
Footer       → nok-deep
```

### Text

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| nok-heading | `text-nok-heading` | `#FFFFFF` | Section headings, card titles |
| nok-body | `text-nok-body` | `#FEF3C7` | Body copy, paragraph text, warm wheat tone |
| nok-caption | `text-nok-caption` | `#D4C9A8` | Captions, muted labels, subtitles, form labels |
| nok-white | `text-nok-white` | `#FFFFFF` | Pure white when distinction from nok-heading matters |

### Accents

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| nok-gold | `text-nok-gold` / `bg-nok-gold` | `#F59E0B` | Primary accent — CTAs, numbers, highlights, hero headline, SectionHeading, accent bars |
| nok-teal | `text-nok-teal` | `#0d9488` | Secondary accent — links, focus rings, gradient second stop, GlowCard glow |
| nok-amber | `text-nok-amber` | `#f59e0b` | **Duplicate of nok-gold** — do not use in new code; use `nok-gold` instead |

### UI States

| Token | Tailwind class | Hex | Usage |
|-------|---------------|-----|-------|
| nok-red | `text-nok-red` | `#dc2626` | Error states only (form errors, error messages) |
| nok-border | `border-nok-border` | `rgba(255,255,255,0.1)` | Default borders — cards, inputs, navbar, footer divider |
| nok-border-light | `border-nok-border-light` | `rgba(255,255,255,0.05)` | Subtle borders — background separators |

### Raw Hex Exceptions — Documented, Do Not Flag

These values appear as hardcoded hex in specific locations. They are intentional and reviewed.

| Value | Location | Reason |
|-------|----------|--------|
| `#6DC99E` | `Navbar.tsx`, `Footer.tsx`, `LegalModal.tsx` logo text | Brand exception — distinct green tint for "Nest" in split-color wordmark |
| `#fcd34d` | `Navbar.tsx`, `Footer.tsx`, `LegalModal.tsx` logo text | Brand exception — distinct gold tint for ".ai" in split-color wordmark |
| `#F59E0B`, `#0d9488`, `#0f2920` in array | `GradientMesh.tsx` Three.js/R3F color props | Raw hex required by Three.js; Tailwind classes cannot be used here; values map to `nok-gold`, `nok-teal`, `nok-deep` |
| `#fbbf24` | `globals.css` scrollbar `:hover` | One-off scrollbar hover brightening |

---

## Typography

### Font Families

Both fonts are loaded from Google Fonts in `index.html` with `<link rel="preconnect">` and preload optimization.

| Token | CSS property | Family | Weights loaded | Tailwind utility | Usage |
|-------|-------------|--------|---------------|-----------------|-------|
| display | `--font-display` | Space Grotesk | 600, 700 | `font-display` | Headings, nav links, CTA labels, badge text, logo wordmark |
| body | `--font-body` | Outfit | 300, 400, 500, 600 | `font-body` | Body copy, paragraph text, form labels, footer links |

### Fluid Typography Scale

Defined as `@utility` in `globals.css`. These are the authoritative values for Tailwind v4 — the `fontSize` entries in `tailwind.config.ts` are inactive in v4.

| Utility class | `font-size` | `line-height` | `font-weight` | Usage |
|--------------|-------------|---------------|---------------|-------|
| `text-hero` | `clamp(2.5rem, 5vw, 4rem)` | 1.05 | 800 | Hero `<h1>` only |
| `text-section` | `clamp(2rem, 4vw, 3.5rem)` | 1.15 | 700 | Section `<h2>` headings |
| `card-title` | `1.25rem` | 1.5 | 600 | Card and subsection `<h3>` titles |

### Additional Type Sizes in Use

These Tailwind defaults appear in the codebase but are not part of the custom scale:

| Tailwind class | Size | Usage |
|---------------|------|-------|
| `text-xl` | 1.25rem | Subheadline (`lg:text-xl`), contact sidebar heading |
| `text-lg` | 1.125rem | Subheadline base, SectionHeading subtitle |
| `text-sm` | 0.875rem | Badge text, form labels, legal timestamps |
| `text-xs` | 0.75rem | TechCard names, status labels |
| `text-[9px]` | 9px | TechCard category label only (intentional micro-label) |

---

## Spacing

### Section Padding

Two patterns in use — apply consistently when adding new sections:

| Pattern | Classes | Sections using it |
|---------|---------|------------------|
| Standard | `py-12 sm:py-16 lg:py-32` | Services, Testimonials, Contact, WhyNestCalc |
| Compact | `py-16 lg:py-20` | TechStack (marquee layout requires less vertical space) |
| Footer | `py-8 lg:py-16` | Footer only |

### Container

All sections use the same container wrapper:

```
max-w-7xl mx-auto px-6
```

Maximum content width: `1280px` (Tailwind `max-w-7xl`). Horizontal padding: `24px` (Tailwind `px-6`).

### Grid Gaps

| Pattern | Classes | Where used |
|---------|---------|-----------|
| Card grid | `gap-6` | Services 2-col, WhyNestCalc 3-col |
| Large 2-col | `gap-10 lg:gap-16` | Contact form + sidebar |
| CTA buttons | `gap-4` | Hero CTA row |
| Marquee cards | `gap-4` | TechStack carousel |
| Form elements | `gap-3` | Contact sidebar items |

### Component-Level Spacing

| Component | Key spacing |
|-----------|------------|
| `SectionHeading` wrapper | `mb-16` below the heading block |
| Accent bar | `mt-4` below h2; `mt-4` above subtitle |
| `GlowCard` content | `p-7` internal padding |
| `MagneticButton` | `px-8 py-4` |
| Form inputs | `px-4 py-3` |
| Form stack | `space-y-6` between fields |
| Form label to input | `mb-2` |

---

## Animation Keyframes

All defined in `src/styles/globals.css`. Used via Tailwind `animate-[]` arbitrary syntax or direct `animation` inline style.

### float
```css
0%, 100% { transform: translateY(0); }
50%       { transform: translateY(-10px); }
```
- **Default duration:** `3s ease-in-out infinite`
- **Usage:** Gentle floating effect on icons or decorative elements

### glow-pulse
```css
0%, 100% { opacity: 1; }
50%       { opacity: 0.5; }
```
- **Default duration:** `2s ease-in-out infinite`
- **Usage:** Pulsing glow on accent elements

### gradient-shift
```css
0%   { background-position: 0% 50%; }
50%  { background-position: 100% 50%; }
100% { background-position: 0% 50%; }
```
- **Default duration:** `6s ease infinite`
- **Usage:** Animated gradient backgrounds (requires `background-size: 200%`)

### fade-up
```css
from { opacity: 0; transform: translateY(20px); }
to   { opacity: 1; transform: translateY(0); }
```
- **Default duration:** `0.6s ease-out both`
- **Usage:** Entrance animation for GSAP scroll targets (`.reveal-section`)

### hero-glow
```css
0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.15), 0 0 30px rgba(255,255,255,0.05); }
50%       { text-shadow: 0 0 20px rgba(255,255,255,0.4),  0 0 50px rgba(255,255,255,0.15); }
```
- **Default duration:** `3s ease-in-out infinite` (from usage: `animate-[hero-glow_3s_ease-in-out_infinite]`)
- **Usage:** Hero `<h1>`, `SectionHeading` h2 — pulsing white halo glow on text
- **Note:** Animates `text-shadow` — not GPU-composited; isolated to two elements by design

### slide-in-right
```css
from { opacity: 0; transform: translateX(40px); }
to   { opacity: 1; transform: translateX(0); }
```
- **Default duration:** `0.5s ease-out both`
- **Usage:** Right-to-left entrance animations

### mesh-drift
```css
0%, 100% { transform: translate(0, 0) scale(1); }
25%       { transform: translate(5%, -8%) scale(1.05); }
50%       { transform: translate(-4%, 6%) scale(0.95); }
75%       { transform: translate(7%, 3%) scale(1.02); }
```
- **Default duration:** `24s ease-in-out infinite` (from usage: `animate-[mesh-drift_24s_ease-in-out_infinite]`)
- **Stagger delays:** blob 1 = `0s`, blob 2 = `-7s`, blob 3 = `-14s`
- **Usage:** `GradientMesh` blobs only

### marquee-scroll
```css
0%   { transform: translateX(0); }
100% { transform: translateX(-50%); }
```
- **Default duration:** `35s linear infinite` (from usage: `animation: 'marquee-scroll 35s linear infinite'`)
- **Usage:** `TechStack` infinite scrolling carousel. Array is doubled to create seamless loop; translateX(-50%) lands exactly at the midpoint (start of second copy).
- **Pause on hover:** `group-hover:[animation-play-state:paused]`

---

## Component Patterns

### GlowCard

Three-layer structure. Used in Services, TechStack, WhyNestCalc.

```
[outer wrapper]  relative rounded-2xl transition-transform duration-300 ease-out overflow-visible
  │              style: transform: perspective(1000px) rotateX(±12deg) rotateY(±12deg)
  │
  ├─ [glow halo]   absolute -inset-1 rounded-2xl -z-10
  │                filter: blur(16px)
  │                background: conic-gradient(from 0deg at {x}% {y}%, #F59E0B, #0d9488, #F59E0B)
  │                opacity: 0 → 0.6 on hover (transition-opacity 500ms)
  │
  ├─ [gradient border]  absolute -inset-px rounded-2xl
  │                     background: same conic-gradient (no blur)
  │                     opacity: 0 → 1 on hover (transition-opacity 500ms)
  │
  └─ [content]  relative rounded-2xl bg-nok-surface border border-nok-border p-7
```

**Props:** `glowColor` (default: `#F59E0B`). The conic gradient uses `glowColor` as first/third stop and `#0d9488` (nok-teal) as the middle stop.

**Tilt limits:** ±12° on both axes. `perspective(1000px)`.

---

### MagneticButton

Renders as `<a>` when `href` is provided, `<button>` otherwise.

```
Base:    cursor-hover inline-block font-bold px-8 py-4 rounded-xl
         bg-nok-gold text-nok-deep
Hover:   scale-[1.02]  shadow-[0_0_24px_rgba(245,158,11,0.4)]
Active:  scale-[0.98]

Magnetic pull:
  radius    100px
  strength  1 - (distance / 100)
  max pull  offset × 0.3

Transition (returning to center):  0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
Transition (tracking cursor):      0.15s ease-out
```

Add `cursor-hover` class to any element that should expand the custom cursor ring.

---

### SectionHeading

```jsx
<div className="mb-16">
  <h2 className="font-display text-section text-nok-gold animate-[hero-glow_3s_ease-in-out_infinite]">
    {title}
  </h2>
  <div className="w-16 h-1 rounded-full mt-4" style={{ backgroundColor: accentColor }} />
  {subtitle && (
    <p className="text-nok-caption text-lg mt-4">{subtitle}</p>
  )}
</div>
```

**Props:** `title` (required), `subtitle` (optional), `accentColor` (default: `#F59E0B`).
Accent bar dimensions: `64px × 4px`, `rounded-full`.

---

### Glass Surface

Two variants in use:

**Deep glass** (modals, navbar):
```
bg-nok-deep/95 backdrop-blur-xl
bg-nok-deep/90 backdrop-blur-md    (lighter — navbar scrolled, modal top bar)
bg-nok-deep/80 backdrop-blur-xl    (navbar scrolled — before reaching /90 state)
```

**White glass** (content cards):
```
bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
```
Used in: Testimonials card. Opacity `5%` white fill + `10%` white border.

---

### Hero Badge (Pill)

```
inline-flex items-center gap-2
px-4 py-1.5 rounded-full
border border-nok-gold/30 bg-nok-gold/5
text-nok-gold text-sm font-medium
```

Pulse dot inside: `w-1.5 h-1.5 rounded-full bg-nok-gold animate-pulse`

---

### Secondary Button (Ghost)

```
cursor-hover inline-block
px-8 py-4 rounded-xl
border border-nok-border
text-nok-body font-semibold
hover:border-nok-gold hover:text-nok-gold
transition-colors duration-200
```

Used in Hero "View Our Work" link. Same padding as `MagneticButton` — the two buttons align visually side-by-side.

---

### Form Input

```
w-full
bg-nok-forest border border-nok-border rounded-xl
px-4 py-3
text-white placeholder:text-nok-caption
outline-none
transition-all duration-200
focus:border-nok-teal
focus:ring-1 focus:ring-nok-teal/30
focus:shadow-[0_0_15px_rgba(13,148,136,0.1)]
```

Focus glow uses `nok-teal` — a subtle teal halo at 10% opacity.

---

### Active Nav Indicator

Gold dot below active nav link (desktop):

```
absolute -bottom-1.5 left-1/2 -translate-x-1/2
w-0.5 h-0.5 rounded-full bg-nok-gold
```

---

## Gradients

### Gradient Mesh (GradientMesh.tsx)

Three radial gradient blobs layered for ambient background lighting. Used in Hero at `opacity-40`.

```
Blob size:    40vw × 40vw
Blur:         blur-[120px]
Shape:        radial-gradient(circle, {color}44 0%, transparent 70%)
              (hex 44 = ~27% opacity)

Blob 1:  left 20%,  top 20%  — #F59E0B44  (gold)    animationDelay: 0s
Blob 2:  left 60%,  top 50%  — #0d948844  (teal)    animationDelay: -7s
Blob 3:  left 40%,  top 70%  — #0f292044  (deep)    animationDelay: -14s
```

Animation: `mesh-drift 24s ease-in-out infinite` per blob.

**Props:** `colors` accepts a `[string, string, string]` tuple. Default is `['#F59E0B', '#0d9488', '#0f2920']`.

---

### GlowCard Conic Gradient

Mouse-tracking gradient used for both the blurred glow halo and the sharp gradient border:

```
conic-gradient(from 0deg at {mouseX}% {mouseY}%, #F59E0B, #0d9488, #F59E0B)
```

Position updates on `mousemove`. Defaults to `50% 50%` at rest (centered).

---

### ScrollProgress Gradient

Linear gold-to-teal gradient on the 3px top progress bar:

```
background: linear-gradient(to right, #F59E0B, #0d9488)
box-shadow: 0 0 10px rgba(245, 158, 11, 0.5)
```

---

### Opacity Modifier Patterns

Tailwind opacity modifiers used throughout the codebase:

| Pattern | Value | Usage |
|---------|-------|-------|
| `nok-gold/5` | 5% opacity gold | Hero badge background fill |
| `nok-gold/30` | 30% opacity gold | Hero badge border |
| `nok-gold/60` | 60% opacity gold | TechCard category text |
| `nok-teal/30` | 30% opacity teal | Focus ring on inputs |
| `nok-border/50` | 50% opacity border | Navbar border, modal top bar border |
| `white/5` | 5% opacity white | Testimonials glass card bg |
| `white/10` | 10% opacity white | Testimonials glass card border |
| `nok-deep/80` | 80% opacity deep | Navbar scrolled bg |
| `nok-deep/90` | 90% opacity deep | Modal top bar bg |
| `nok-deep/95` | 95% opacity deep | Mobile nav overlay, legal modal overlay |
