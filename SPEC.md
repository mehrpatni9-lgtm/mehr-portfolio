# Portfolio Spec — single source of truth

This document is the contract between Mehr (customer) and the build system.
Every feedback updates this file first. Code is downstream.

---

## 1. Thesis & voice

- **Positioning:** "Marketing that ages well" — restrained, taste-driven, built for the residue, not the peak.
- **Tagline:** *I institutionalise marketing that ages well — for fintech, healthtech, and edtech brands.*
- **Voice principles:**
  - Editorial restraint. A fashion magazine meets a creative-director's Behance.
  - Short, declarative sentences. No bulleted clutter.
  - Italics carry emphasis; bold is rationed.
  - Hairline rules, generous whitespace, ornamental punctuation (·, ❦, em-dash) over icons.
  - All-serif typography throughout.

---

## 2. Design tokens

### Color palette
| Token | Hex | Role |
|---|---|---|
| paper | `#F2EDE3` | Page background |
| panel | `#EBE3D2` | Soft panel / marquee bg |
| panel-deep | `#E6DCC6` | Hover / nested panel |
| ink | `#2A1810` | Primary text |
| ink-mid | `#5A4438` | Secondary text |
| ink-soft | `#8B7C6A` | Tertiary text, axis lines |
| rule | `#D5CABA` | Hairline dividers |
| honey | `#A6802E` | Accent (curves, dots, frames) |
| honey-deep | `#80621F` | Accent links, hover, callout labels |

**Hard rule:** no red, no orange-red, no pure black, no brown/sepia filter over brand logos. Brand logos render in their own brand color.

### Typography
| Family | Use |
|---|---|
| Italiana | Hero "Mehr", section titles, ornamental display |
| Cormorant Garamond (regular + italic, 400–700) | Body, surnames, italic emphasis, headings |
| Cormorant SC | Small-caps labels, eyebrows, metadata, axis labels |

### Type scale (effective screen px)
| Use | Min | Target | Max |
|---|---|---|---|
| Hero display ("Mehr") | 120 | clamp(120, 18vw, 260) | 260 |
| Hero secondary ("Patni.") | 64 | clamp(64, 9vw, 128) | 128 |
| Section title | 44 | clamp(44, 6.4vw, 84) | 84 |
| Body | 19 | 19 | 21 |
| Eyebrow / small caps | 11 | 13 | 14 |
| Diagram labels (effective on screen) | **14** | 16–18 | 22 |

### Spacing
- Section vertical padding: 120px (desktop), 80px (mobile)
- Wrap max-width: 1180px, padding 48px (desktop), 28px (mobile)
- Grid gap defaults: 24–80px depending on column count
- Hairline width: 1px

---

## 3. Section contracts

Each section is a sealed block. Changing one must not affect others.

### Hero
- Two-column: text left, square portrait right with honey offset frame
- Required: name treatment (Mehr in Italiana / Patni. in Cormorant italic), tagline, meta line (Open to roles · Dubai/Remote · 8 yrs · 5 brands · 4 markets)
- Portrait: `./portrait.jpg` with placeholder fallback (initials M·P)

### Brand marquee
- Section title: *"Brands I study."*
- Auto-scrolling, seamless loop (CSS animation, list duplicated)
- 15 brands, each rendered in its real brand color (no filter, no monochrome)
- Each chip: `<img>` with `onerror` fallback to a styled text wordmark in the same brand color
- Fade gradients on both edges

### Frameworks ("Three frameworks I operate by")
- Credit: borrowed from Matt Gray
- Three frameworks, each: left = title + caption + "In my practice:" note; right = inline diagram in a panel
- Diagrams: SELL columns / Rule of Five hub-and-spoke / Inventory chart (viral vs compound)

### Case studies ("Four campaigns I read like books")
- Four teardowns: Duolingo, Khan Academy, Headspace, Calm
- Each: number + title + brand/category/date meta, 21:9 image slot with fallback, 2 short paragraphs, side metrics card (3 stats), "The principle" callout line

### Work by company ("Each stint, its own page")
- Five linked cards: MAGNA, Stratos, Ivory, Wahed, IPG Media
- Each card links to `./{slug}.html` (separate pages, not built yet)
- Each: category, name (Italiana), role, dates, "Read the page" cue

### Contact
- Editorial list, no icons
- Email, LinkedIn, Medium, phone, "Open to roles · Dubai/Remote" tag

---

## 4. Component contracts

### SVG diagrams — **invariants**
- **C-1:** All labels must render fully within parent bounds. Labels within 100 viewBox units of an edge must use `text-anchor="end"` (right edge) or `text-anchor="start"` (left edge). Never `middle` near an edge.
- **C-2:** Minimum effective on-screen label size: 14px. Compute: `(svg_pixel_width / viewBox_width) × font_size_attribute ≥ 14`.
- **C-3:** Letter-spacing on small-caps labels: 0.26em–0.36em. Wider than 0.40em is too sparse.
- **C-4:** SVG must include `overflow:visible` OR labels must mathematically fit within the viewBox accounting for letter-spacing width.
- **C-5:** When a reference image is provided, match curve proportions (peak position, end position, stroke weight) to within ~10% by visual inspection.

### Brand marquee — invariants
- **M-1:** No CSS filter on brand `<img>` (no grayscale, no sepia, no blend-mode).
- **M-2:** Wordmark fallback inherits the brand color set on the parent chip.
- **M-3:** Marquee track must contain the brand list twice for seamless loop; animation `translateX(0 → -50%)`.

### Work cards — invariants
- **W-1:** Each card is an `<a>` linking to `./{slug}.html`.
- **W-2:** Card hover state must not introduce new colors outside the token palette.

---

## 5. Page structure

```
nav (sticky)
header.hero
section (marquee)
section#frameworks
section#cases
section#work
section#contact
footer
```

Order is fixed unless customer requirement changes it explicitly.

---

## 6. Open requirements / known gaps

- Per-company pages (`magna.html`, `stratos.html`, `ivory.html`, `wahed.html`, `ipg.html`) not yet built.
- Real brand logos (`./logos/*.png`) not yet provided — currently rendering wordmark fallbacks.
- Real portrait (`./portrait.jpg`) not yet provided — currently rendering M·P placeholder.
- Case study images (`./cases/*.jpg`) not yet provided.

---

## 7. How to update this spec

When customer gives feedback:
1. Translator agent re-reads this file + AVOID.md + feedback.
2. Translator proposes spec/AVOID diffs as a requirement.
3. Spec updated *before* code.
4. Implementer reads updated spec, modifies code.
5. Reviewer checks code against spec + AVOID + component contracts.
6. Only after PASS, commit + push.
