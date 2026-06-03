# How a campaign gets added

**You send. I file.** You never touch a folder. You never write `meta.md`.

## What you send me in chat

### For a reel
- The MP4 (drop it in `~/Downloads` and tell me the filename, OR paste a link if it's hosted)
- One sentence: *what was this campaign for?*
- 2–4 numbers: *what did it yield?*  (e.g. *"1.7M impressions in 30 days"*)
- Which company: MAGNA / Stratos / Ivory / Wahed / IPG / Passion projects

### For a carousel
- The Instagram URL (e.g. `https://www.instagram.com/p/Cxxxxxxx/`)
- One sentence: *what was this campaign for?*
- 2–4 numbers: *what did it yield?*
- Which company

## What I do

1. Pull the file from `~/Downloads` (or use the IG URL).
2. Create the folder at `assets/campaigns/{company}/{NN-campaign-slug}/`.
3. Write `meta.md` based on your description.
4. Add the `.campaign-block` to the per-project HTML in the right order.
5. Run `npm run pdf:{company}` to regenerate the case-study PDF.
6. Commit + push.

## The folder shape (mine to maintain)

```
assets/campaigns/{company}/{NN-slug}/
├── reel.mp4              ← if reel
├── poster.jpg            ← if reel (auto-extracted from first frame)
└── meta.md               ← always
```

For carousels, only `meta.md` lives in the folder. The IG embed pulls from the live Instagram URL.

## `meta.md` format (for my reference)

```yaml
---
name: Founder briefings — Q1 thesis launch
type: reel               # or "carousel"
ig_url: https://www.instagram.com/p/...  # only if carousel
purpose: One sentence on what this campaign was for.
metrics:
  - n: 1.7M
    l: Impressions in 30 days
  - n: +14%
    l: Audience growth
  - n: 9
    l: Inbound qualified briefs
---
```

## What doesn't change

- I never fabricate campaigns. If you haven't sent me a real reel or carousel, I won't invent one.
- I never hand-edit `case-studies/*.pdf` — they regenerate from the HTML.
- The campaign block layout is fixed (`SPEC §4 CP-1`) — same shape every time.
