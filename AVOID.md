# AVOID — the rejection ledger

Every entry here is something Mehr has rejected, paired with the reason.
Read this **before** writing copy or code. Append, don't replace.

---

## Voice & copy

- **"X not Y" contrast sentence pattern.** ("…not a campaign that peaked.") Feels like LinkedIn-bro contrast copy.
- **Text-heavy walls of prose.** Editorial restraint > exhaustive explanation.
- **Generic AI-template phrases.** No "elevate," "unlock," "transform," "synergy," "empower."
- **Bulleted clutter.** If a list is needed, use ornamental dividers (·, ❦) or hairline-separated rows.

## Color

- **No red anywhere in chrome/accents.** Brand logos may use their own brand red (Zomato, lovin dubai) but only as the brand's color in the marquee — never as a UI accent.
- **No orange-red, no pure black (`#000`).** Ink is `#2A1810`.
- **No muted or boring color blocks.** Brand logos render in their real brand color, never washed out.
- **No brown/sepia filter over brand logos.** Tried; rejected. Brand logos must be in their real brand color.

## Typography

- **No sans-serif.** All-serif throughout — Italiana for display, EB Garamond (roman + italic + small-caps via `font-variant`) for everything else.
- **No bold for emphasis.** Italic carries emphasis. Bold is rationed (small caps + tracking does most of the heavy lifting).

## Iconography & decoration

- **No generic colored social-media icons.** Contact channels are typeset words, not icons.
- **No emoji** anywhere on the site.
- **No generic AI-template look** (gradient hero overlays, grid-of-features sections, "trusted by" logo strip styled as gray rounds).

## Diagrams & SVG

- **Never use `text-anchor="middle"` within 100 viewBox units of a viewBox edge** — letter-spacing extends past the bound and the text clips. Use `text-anchor="end"` (right edge) or `text-anchor="start"` (left edge).
- **Never let effective on-screen label size drop below 14px.** Compute: `(svg_rendered_width / viewBox_width) × font_size_attribute`.
- **Never apply a CSS filter to brand logos** (no grayscale, no sepia, no blend-mode).
- **When a reference image is provided, match it.** Curve peak positions, end points, stroke weights to within ~10% by visual inspection. Do not improvise proportions.

## Layout & structure

- **Don't introduce new sections without a customer requirement.** The seven-section structure is fixed (nav, hero, marquee, frameworks, cases, work, contact).
- **Don't break section isolation.** A fix to one section may not silently restyle another.

---

## How to append

When a new rejection lands:
1. Translator agent adds the entry here with: a 1-line rule, a *Why* line citing the conversation, and a *Detection* line (how the reviewer should catch it next time).
2. If the rejection implies a hard rule for any SVG / component, also add it to `SPEC.md §4 Component contracts`.

---

## Recent additions (most recent first)

### 2026-06-02 — Italic-by-default in CSS classes
- **Rule:** No CSS class may declare `font-style: italic` as its default unless it is on the surviving-justifications list in `SPEC.md §2 Typography`. The default voice is roman. Italic is a tool reserved for `<em>` and a small set of documented signature accents.
- **Why:** Mehr asked to move to EB Garamond and pull back italic to "specific spaces, mostly straight." Italic-by-default flattens the emphasis system and makes the whole site read at one register.
- **Detection:** Reviewer greps every CSS rule in `styles.css` for `font-style:italic`. Any selector that isn't `em`, `.hero .surname`, `.sell .letter`, or `.rof .center-label` triggers FAIL.

### 2026-05-31 — SVG label clipping
- **Rule:** No `text-anchor="middle"` within 100 viewBox units of a viewBox edge.
- **Why:** "COMPOUND" label rendered as "COMPOUN" because letter-spacing pushed the right half past the viewBox edge, and the SVG clipped it.
- **Detection:** Reviewer scans every `<text>` element in every SVG; if `text-anchor="middle"` and `(viewBox_width − x) < 100` or `x < 100`, flag.

### 2026-05-31 — Diagram label legibility
- **Rule:** All diagram labels must compute to ≥14px effective on screen.
- **Why:** Earlier framework diagram labels were rendered at 10–11px in viewBox units, which scaled below readable size at typical render widths.
- **Detection:** Reviewer computes `(rendered_width / viewBox_width) × font_size` for each SVG `<text>` and flags any below 14.
