# Reference — Inventory chart

This file describes the intended visual of the "Content is inventory" framework diagram.
The Visual Reviewer compares each rendered screenshot of `.framework:nth-of-type(3) .fw-diagram` against this description.

> 📎 A reference PNG can live alongside this file at `reference/inventory.png` for side-by-side vision comparison. To save it, drag the source screenshot into this folder via Finder (sandboxing prevents the Bash tool from accessing `~/Desktop`).

---

## Source
`/Users/mehrpatni/Desktop/Screenshot 2026-05-31 at 5.50.49 PM.png` — supplied by Mehr on 2026-05-31.

## Composition

**Canvas.** Cream paper background. No outer border. Aspect roughly 1.57:1 (wider than tall).

**Axes.**
- A thin, faint vertical line on the left (y-axis), drawn from near the top of the chart down to the baseline.
- A thin, faint horizontal line at the bottom (x-axis).
- Both rendered in a soft beige-gray; subtle, not assertive.
- No tick marks, no gridlines.

**Y-axis label.** The word `PROFIT` in small caps, rotated 90° counter-clockwise, placed to the left of the y-axis at roughly its vertical midpoint. Wide letter-spacing. Soft brown-gray.

**X-axis label.** `TIME →` in small caps, centered below the x-axis. Wide letter-spacing. Same soft brown-gray as PROFIT. The arrow is part of the label.

## Curves

**Viral (dashed).**
- A dashed bell curve.
- Starts at the baseline near the y-axis (lower left).
- Rises steeply to a single peak located at roughly **30–35% from left**, **30–35% from top** (i.e. upper-left third).
- Descends with a long right tail that flattens out to near the baseline by the **right edge**.
- Stroke: soft warm gray (`#8B7C6A` family), opacity ~0.55.
- Dashes: medium-length, rounded caps. About 10–12 dashes across the curve.

**Compound (solid honey).**
- A smooth exponential curve.
- Starts at the baseline near the y-axis (lower left), nearly flat for the first third.
- Curves upward gently in the middle.
- Rises steeply to the **top-right corner**, ending at roughly **95% from left**, **15% from top**.
- Crosses the descending tail of the viral curve at roughly **60–65% from left, 60–65% from top** (visible intersection).
- Stroke: solid honey gold (`#A6802E`), thicker than the viral curve (roughly 1.6× the weight).
- No fill, rounded caps.

## Labels above curves

**`VIRAL`** — small caps, wide letter-spacing (~0.30em), soft warm gray (`#8B7C6A` at ~0.7 opacity). Centered horizontally above the bell peak, roughly at **40% from left, 15% from top**.

**`COMPOUND`** — small caps, wide letter-spacing (~0.30em), honey-deep (`#80621F`). Right-anchored, located at roughly **94% from left, 12% from top** — above where the compound curve ends. **The full word must be visible — no clipping at the right edge.**

## What this diagram must NOT show

- No numeric values on either axis.
- No legend.
- No background panel beyond the page paper color.
- No drop-shadow on curves.
- No red, no blue. Only paper + soft warm-gray (viral) + honey gold (compound).
- No clipping of the COMPOUND label at the SVG/container edge.
- No labels overlapping curves illegibly.

## Component contracts this enforces

- `SPEC.md §4 C-1` (no `text-anchor=middle` near edges) — COMPOUND is right-anchored.
- `SPEC.md §4 C-2` (≥14px effective label size) — both VIRAL and COMPOUND read at editorial body-size scale, not tiny.
- `SPEC.md §4 C-5` (match reference within ~10%) — peak positions and end points per this doc.
