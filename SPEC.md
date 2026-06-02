# Portfolio Spec — single source of truth

This document is the contract between Mehr (customer) and the build system.
Every feedback updates this file first. Code is downstream.

## §0 — Architecture-first principle

Every customer feedback must compound a contract somewhere — either this spec, `AVOID.md`, a component contract in §4, or an agent prompt. A feedback that resolves only by editing pixels is a **failed translation**: the Translator should re-run and identify the durable rule that the feedback implies.

Concrete test: if the same class of feedback could be given again next month against a different section, the rule isn't extracted yet.

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

### Company brand tokens (project tiles + per-project hero accents)
| Token | Hex | Company |
|---|---|---|
| brand-magna | `#2C2A26` | MAGNA (graphite — strategy ecosystem) |
| brand-stratos | `#1E3A5F` | Stratos (deep navy — edtech) |
| brand-ivory | `#4A5D45` | Ivory (deep sage — healthtech) |
| brand-wahed | `#0E4D3A` | Wahed (deep emerald — fintech) |
| brand-ipg | `#723C1F` | IPG Media (warm umber — media · agency) |
| brand-passion | `#1A1A1A` | Passion Projects (black — distinct from company chapters) |

Placeholders until real brand assets are supplied. Used as the dominant tile background + the per-project page hero accent. May be overridden by customer at any time.

### Typography
| Family | Use |
|---|---|
| Italiana | Hero "Mehr", section titles, tile names, work hero h1, footer signature — the single display moment. |
| EB Garamond (Roman, 400–700) | Default body, surnames, prose, asides, metadata, captions — the entire voice of the site outside Italiana. |
| EB Garamond Italic | Reserved for `<em>` and explicitly justified accent classes only (see §4 T-1). Never the default voice of a paragraph or label. |
| EB Garamond + `font-variant: all-small-caps` | Eyebrows, small-caps labels, axis labels, nav links. Replaces the previous Cormorant SC face. |

**Italic surviving justifications (the only places italic is the default):**
- `<em>` tags anywhere — emphasis is the entire point.
- `.hero .surname` ("Patni.") — the hero signature contrast against the Italiana "Mehr".
- `.sell .letter` (S/E/L) — display device for the framework.
- `.rof .center-label` ("idea") — single-word accent at the center of the hub-and-spoke.

Anything not on this list and using italic is a violation. The reviewer enforces.

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
- Required: name treatment (Mehr in Italiana / Patni. in EB Garamond italic — the surname signature accent on the §2 allow-list), tagline, meta line (Open to roles · Dubai/Remote · 8 yrs · 5 brands · 4 markets)
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

### Work by company ("Selected work")
- **Layout: visual-first tile grid** per `§4 W-3 Project-grid pattern`.
- Five tiles: MAGNA, Stratos, Ivory, Wahed, IPG Media.
- Each tile: full-bleed company brand color (token from §2) as the dominant graphic device; company name in Italiana set in `paper` color over the brand block; role + dates beneath in small caps; whole tile is the click target to `./{slug}.html`.
- Section title shifts from "Each stint, its own page." to **"Selected work."** to match the tile-grid reading.

### Per-project one-pager (`magna.html` / `stratos.html` / `ivory.html` / `wahed.html` / `ipg.html`)
Every per-project page follows the same template per `§4 P-1 Per-project page template`. Section order:
1. **Slim nav** — `Mehr Patni` mark linking back to `/`. Right-aligned "Back to portfolio" link.
2. **Hero** — split layout: left = company name in Italiana + role + tenure + category, set on the company brand color band; right = paper-color overflow with one-line synopsis.
3. **The brief** — single short paragraph (placeholder until customer fills).
4. **What I did** — 4–6 hairline-separated one-liners, no bullets.
5. **Receipts** — 3-stat row in the same `metrics` style as case studies.
6. **Selected work** — placeholder gallery: 3 cells with 21:9 placeholder slots.
7. **What I'd do differently** — single short paragraph.
8. **Footer** — same as `index.html`.

### Contact
- Editorial list, no icons
- Email, LinkedIn, Medium, phone, "Open to roles · Dubai/Remote" tag

---

## 4. Component contracts

### SVG diagrams — **invariants**
- **C-1:** All labels must render fully within parent bounds. Labels within 100 viewBox units of an edge must use `text-anchor="end"` (right edge) or `text-anchor="start"` (left edge). Never `middle` near an edge.
- **C-2:** Minimum effective on-screen label size: **16px** (raised from 14 on 2026-06-03 after framework labels still read as illegible at the new typographic floor). Compute: `(svg_pixel_width / viewBox_width) × font_size_attribute ≥ 16`. Hold at every viewport down to mobile width.
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
- **W-3 — Project-grid pattern.** Any section that lists projects uses a visual-first tile grid:
  - Hero visual occupies ≥60% of the tile height (the brand-color block counts as the visual when imagery isn't available).
  - Text on tile: name (max 1 line) + one optional descriptor (max 1 line). Nothing else.
  - Entire tile is the click target — `<a>` wraps the whole element.
  - Grid: `repeat(auto-fill, minmax(280px, 1fr))`. Collapses to single column ≤640px.
  - Tile aspect ratio: 4:5 (portrait) on desktop.
  - No bullets, no "Read the page" repeated text, no per-tile metadata blocks (corner numerals, etc.).

### Typography — invariants
- **T-1 — Roman by default.** No CSS class may set `font-style: italic` as its default declaration unless it appears in the surviving-justifications list in §2 Typography. Italic is reserved for `<em>` and the documented signature accents. Reviewer mechanically greps every CSS rule for `font-style:italic` and fails the change if a rule outside the allow-list uses it.

### Information architecture — invariants
- **PG-1 — Section-as-page.** Deep content earns its own URL. The cover page (`index.html`) is a *navigation surface*: hero, browse marquees, browse tiles, contact. Anything that demands sustained reading — framework explanations, campaign teardowns, project deep-dives — lives on a dedicated page (`approach.html`, `magna.html`, etc.) and is reached via a tile or CTA from the cover. Re-cluttering the cover with deep content is a P-1 violation.
- **TX-1 — Compact-by-default for browsing.** Any list meant for *browsing* (case studies grid, campaigns I read grid) uses compact tiles only: image area + name + 1 short descriptor + optional small-caps numbers. Multi-paragraph prose is for detail pages, never browse surfaces.
- **TX-2 — One-line discipline (framework captions).** On the approach page, each framework block contains: title, diagram, exactly *one* explanatory line. No multi-sentence caption. No "In my practice" paragraph on the approach page. Detail can live elsewhere; the approach page must be scannable as a thesis.

### Per-project pages — invariants
- **P-1 — Per-project page template.** Every per-project HTML file (`magna.html`, etc.) must:
  - Link `styles.css` for shared global CSS (no inline copies of the global system).
  - Include a slim nav with the `Mehr Patni` mark linking to `/` and a "Back to portfolio" link.
  - Render the hero with the company's brand-color band on the left side, name in Italiana at `paper` color over the band.
  - Follow the section order defined in `§3 Per-project one-pager`.
  - Reuse the global `footer` block verbatim.
  - Only deviate by setting `--brand` to the company token. No bespoke colors.

---

## 5. Page structure

### Cover (`index.html`) — navigation surface only

```
nav (sticky)
header.hero            ← name + bio + 2 CTAs (See My Approach · Case Studies) + portrait
section (marquee)      ← brands I study
section#work           ← CASE STUDIES tile grid (her work), 6 tiles
                         inc. Passion Projects
section#contact
footer
```

### Approach (`approach.html`) — the thesis

```
nav.slim
header.proj-hero        ← "Frameworks I operate by" + one-line lede
section#frameworks      ← 3 frameworks side-by-side; one-line caption each
section#campaigns       ← "Campaigns I read like books" — 4 compact tiles
                          (Duolingo, Khan, Headspace, Calm)
footer
```

### Per-project pages (`magna.html`, `stratos.html`, …, `passion-projects.html`)
Follow §3 Per-project one-pager + §4 P-1 unchanged.

The 2-page architecture is now an invariant (see §4 PG-1). Order within each page is fixed unless customer requirement changes it explicitly.

### Multi-file structure (added 2026-06-02)

The site is no longer single-file. CSS lives in `styles.css` and is shared between `index.html` and every per-project page. Justification: per-project pages must inherit identical styling; duplicating ~30 KB of CSS across 6 files makes iteration painful. Each per-project page may include a small additional `<style>` block for its company brand color override only.

```
mehr-portfolio/
├── index.html         ← landing
├── styles.css         ← global system, all sections
├── magna.html         ← per-project pages, each links styles.css
├── stratos.html
├── ivory.html
├── wahed.html
└── ipg.html
```

---

## 6. Open requirements / known gaps

- Per-company pages now exist as stubs — bodies are placeholder copy. Real prose to be filled by customer.
- Real brand logos (`./logos/*.png`) not yet provided — currently rendering wordmark fallbacks.
- Real portrait (`./portrait.jpg`) not yet provided — currently rendering M·P placeholder.
- Case study images (`./cases/*.jpg`) not yet provided.
- Per-company tile and hero brand colors are *placeholders* (see §2 Company brand tokens). Customer to confirm or override against real company brand systems.

---

## 7. How to update this spec

When customer gives feedback:
1. Translator agent re-reads this file + AVOID.md + feedback.
2. Translator proposes spec/AVOID diffs as a requirement.
3. Spec updated *before* code.
4. Implementer reads updated spec, modifies code.
5. Reviewer checks code against spec + AVOID + component contracts.
6. Only after PASS, commit + push.
