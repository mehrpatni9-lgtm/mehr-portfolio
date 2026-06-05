# Architecture

How this portfolio is organised, and how your feedback turns into durable improvements.

The guiding rule: **everything the live site serves lives at the root** (so your
URLs never break mid-interview). Everything that *builds, governs, or reviews*
the site is grouped into `system/` and `tools/`.

---

## Repo map

```
mehr-portfolio/
│
├── WHAT SHIPS  (served by GitHub Pages — never moved)
│   ├── index.html              ← the cover (hero, about, expertise, work, contact)
│   ├── approach.html           ← frameworks + campaign teardowns
│   ├── magna / stratos / ivory / wahed / ipg / passion-projects .html
│   │                             ← one case-study page per chapter
│   ├── styles.css              ← the single design system (tokens + components)
│   ├── portrait.png            ← hero photo
│   ├── logos/                  ← brand logo wall for the marquee
│   ├── assets/campaigns/       ← campaign source files, one folder per campaign
│   ├── case-studies/*.pdf      ← downloadable PDF of each case page (generated)
│   └── essays/                 ← long-form pieces (handbook, marketing notes)
│
├── THE SYSTEM  (system/ — governs the work, not served)
│   ├── SPEC.md                 ← the contract: structure + component rules
│   ├── AVOID.md                ← the rejection ledger: every "no", with the reason
│   ├── agents/                 ← the 4 reviewer roles (see "The loop" below)
│   └── reference/              ← reference images + notes for visual review
│
├── TOOLING  (tools/ — build + review scripts)
│   ├── screenshot.js           ← `npm run review` → renders .review/latest/*.png
│   └── pdf.js                  ← `npm run pdf`    → regenerates case-studies/*.pdf
│
├── ARCHITECTURE.md             ← you are here
├── README.md
└── package.json                ← npm scripts point at tools/
```

---

## The loop — how your feedback improves the architecture

Every piece of feedback you give is treated as a **customer requirement**, not a
one-off pixel tweak. It runs through four roles (prompts in `system/agents/`):

```
   YOUR FEEDBACK
        │
        ▼
  ┌───────────────┐   "What durable rule does this imply?"
  │  TRANSLATOR   │   → restates it as a requirement
  │               │   → writes the general rule into SPEC.md / AVOID.md
  └───────┬───────┘
          ▼
  ┌───────────────┐   makes the minimal code change
  │ IMPLEMENTER   │   → edits index.html / styles.css / a case page
  └───────┬───────┘
          ▼
  ┌───────────────┐   blocks the commit if it breaks a contract
  │   REVIEWER    │   → scans the whole file, not just the diff
  └───────┬───────┘
          ▼
  ┌───────────────┐   looks at pixels, not code
  │ VISUAL        │   → renders screenshots, checks it actually looks right
  │ REVIEWER      │
  └───────┬───────┘
          ▼
   COMMIT → PUSH → live in ~1 min
```

The point of the **Translator** step is the ratchet: a complaint about one
logo becomes a rule about *all* logos. That's why the site gets steadier the
more feedback it absorbs — each "no" is recorded once in `AVOID.md` and never
has to be caught again.

---

## Two surfaces, one source

Each case study exists as **a web page and a downloadable PDF**. The HTML is the
single source of truth; `tools/pdf.js` generates the PDF from it. Never hand-edit
a file in `case-studies/` — change the `.html` and regenerate, so a recruiter sees
the same thing on the page and in the download.

---

## Asset handling (the rule)

Drive links are private — a recruiter would hit "access denied." So we **host
the real asset on the site** wherever we can. By project shape:

| Project shape | Destination of the tile's link |
|---|---|
| One finished doc (PDF / e-book / brochure / magazine) | Extract the PDF from Drive → host under `assets/<chapter>/<slug>/` → open it inline |
| One big video (>~30MB) | Keep the cover frame as the tile; link its **public** YouTube/Instagram URL (don't host) |
| Two-or-more pieces | A dedicated `projects/<slug>.html` page with its own gallery; host/link each piece |

Pull files from Drive with `curl -sL "https://drive.google.com/uc?export=download&id=<ID>"`
and thumbnails with `https://drive.google.com/thumbnail?id=<ID>&sz=w1200`.
Keep the repo lean: host finished documents; for sprawling working folders, host the
best few and link the public Drive/social URL for the rest. Never invent copy for an
asset — title + medium tag + link only, until Mehr sends her own words.

## Common commands

```bash
npm run review        # screenshot the local site → .review/latest/
npm run review:live   # screenshot the deployed site instead
npm run pdf           # regenerate all 6 case-study PDFs
git push origin main  # publish (GitHub Pages redeploys automatically)
```
