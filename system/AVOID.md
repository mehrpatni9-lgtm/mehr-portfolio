# AVOID — the rejection ledger

Every entry here is something Mehr has rejected, paired with the reason.
Read this **before** writing copy or code. Append, don't replace.

---

## ★ KEY RULES (non-negotiable, added 2026-06-05 reset)

1. **No illegible text — anywhere, ever.** Every character (body, label, caption,
   text on a colour band, SVG label) must be comfortably readable: body ≥16px
   effective on screen, labels ≥14px, and always high-contrast (no light text on
   light, no near-tone text, no tracking so wide a word stops reading as a word).
   This generalises the old SVG-label rule to *all* text. Reviewer fails on any
   text that is small, low-contrast, or hard to read at any viewport.
2. **One focused page, no content overload.** The cover is a tight, confident
   single page — not a dump of every section. If a section isn't earning its
   place, it goes to a dedicated page later. Restraint over completeness.
3. **It must look like *Mehr's* — her deck, her voice, her red.** Bold, editorial,
   personal. Not a generic template. When in doubt, return to the PDF deck.
4. **The portrait must be well-composed** — her face properly centred in its
   frame at every viewport. Never crop the face awkwardly.

---

## Voice & copy

- **"X not Y" contrast sentence pattern.** ("…not a campaign that peaked.") Feels like LinkedIn-bro contrast copy.
  - *Exception:* Mehr's own positioning thesis — *"built for the residue, not the peak"* — is canonical and may appear verbatim (see `SPEC §1`). Detection rule: allow if the phrase exactly matches the thesis line. Block all other "X not Y" constructions.
- **Text-heavy walls of prose.** Editorial restraint > exhaustive explanation.
- **Generic AI-template phrases.** No "elevate," "unlock," "transform," "synergy," "empower."
- **Bulleted clutter.** If a list is needed, use ornamental dividers (·, ❦) or hairline-separated rows.

## Color

- **~~No red anywhere in chrome/accents.~~ REVERSED 2026-06-05** (see Recent additions). Red is now the *signature* accent. Honey-gold is demoted to a rare secondary (`--honey-true`). Brand logos still render in their own brand color in the marquee.
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

### 2026-06-05 — Red reversal: hybrid creative direction
- **Rule:** Red (`--red:#A6201A`, `--red-deep:#7C140F`) is now the signature accent, used in chrome/accents throughout. Two full-bleed red bands (`.band-red`) are permitted (Expertise, Let's Work) to carry the deck's energy. The honey-gold accent is demoted to `--honey-true` for rare warm needs only.
- **Why:** Mehr shared her own red, magazine-style creative deck (`Mehr Patni Portfolio.pdf`) and chose the **Hybrid** direction (2026-06-05): keep the editorial bones + typography, but inject the deck's red, warmth, and playful personality. This explicitly overturns the earlier "no red" rule and the old fixed seven-section structure — new sections (About, Expertise, Projects & Campaigns, Let's Work) are now a customer requirement.
- **Detection:** Reviewer should NOT flag red accents or the two `.band-red` sections. Still flag: muddy/washed reds, more than ~2 full-bleed red bands on the cover (balance), red applied to body text, or any AI-template tells. Italic-still-carries-emphasis and all-serif rules remain in force.

### 2026-06-03 — Hand-editing case-studies/*.pdf
- **Rule:** Never modify a file in `case-studies/`. PDFs are generated by `pdf.js` from the per-project HTML. The HTML is the single source of truth.
- **Why:** Hand-edited PDFs drift from the website; recruiter sees one thing on the page and a different thing on download. Defeats the "single source of truth" benefit of having both surfaces.
- **Detection:** Reviewer diffs `case-studies/{slug}.pdf` against a freshly-generated PDF (Playwright run on the current HTML). If non-identical, fail and force regeneration.

### 2026-06-03 — Bespoke per-campaign layouts
- **Rule:** Every campaign block on a per-project page uses the `.campaign-block` template per `SPEC §4 CP-1`. No custom HTML structure per campaign. The asset varies (reel vs carousel); the metadata structure does not.
- **Why:** Custom layouts per campaign turn each per-project page into a one-off and break PDF generation, mobile reflow, and the "drop a folder, get a block" workflow.
- **Detection:** Reviewer greps every per-project page for `.campaign-block` and confirms its children match the CP-1 structure (`.campaign-asset` + `.campaign-meta` with `.label`, `h3`, `.purpose`, `.campaign-numbers`).

### 2026-06-03 — Fabricating campaign content
- **Rule:** Never add a `.campaign-block` to a per-project page unless Mehr has sent the asset + description in chat. The folder + `meta.md` are *mine* to create (per the workflow update on 2026-06-03 — she sends in chat, I file), but the *content* always originates from her. Inventing a fake campaign block, even as a placeholder she'll fill in later, is a violation.
- **Why:** If I invent a campaign, the site lies. A recruiter clicks "Download case study" and sees a campaign Mehr never ran. Worse, the fake content can leak into her live URL while she's interviewing.
- **Detection:** Reviewer verifies every `.campaign-block` in HTML has a corresponding `assets/campaigns/{slug}/{NN-slug}/meta.md` on disk *and* the `meta.md` cites a real source (a file present in the folder, or a real IG URL). Missing or empty → fail. A single page-wide placeholder card ("Drop your first campaign here — tell me in chat") is allowed as long as it does not pose as a real campaign.

### 2026-06-03 — Re-cluttering the cover with deep content
- **Rule:** The cover page (`index.html`) is a *navigation surface*. Hero, browse marquees, browse tiles, contact — that's it. Anything that requires sustained reading lives on a dedicated page (per `SPEC §4 PG-1`).
- **Why:** Mehr's wireframe sketches showed the cover stripped down to navigation, with frameworks + brand teardowns moved to a dedicated `approach.html`. Stuffing both browse and deep content on the same page makes the cover unscannable.
- **Detection:** Reviewer scans `index.html` for: full-prose case-study sections, multi-paragraph framework blocks, anything that doesn't fit "hero / marquee / tiles / contact". Flag.

### 2026-06-03 — Multi-paragraph captions on framework diagrams
- **Rule:** Each framework on `approach.html` carries title + diagram + *one* explanatory line. No multi-sentence captions. No "In my practice" paragraph alongside (that belongs on a per-project page if anywhere).
- **Why:** Sketch 2 explicitly shows each framework with a single-line tagline beside the diagram. Multi-paragraph captions flatten the framework into prose.
- **Detection:** Reviewer counts sentences in each `.fw-meta` block on `approach.html`; if any block has more than one sentence in the explanatory text, fail.

### 2026-06-03 — Diagram label illegibility (raised floor)
- **Rule:** SVG diagram labels must compute to ≥16px effective on screen at every viewport down to mobile (raised from 14px). Compute: `(svg_rendered_pixel_width / viewBox_width) × font_size_attribute ≥ 16`.
- **Why:** Even at the previous 14px floor, Mehr reported the SEL Formula, Rule of Five, and Content-is-Inventory labels as illegible.
- **Detection:** Reviewer computes effective size for every `<text>` in every SVG, at the *narrowest* render width that selector ever reaches (mobile breakpoint). Below 16 → fail.

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
