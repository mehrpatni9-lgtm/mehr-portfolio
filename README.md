# Mehr Patni — Portfolio build system

A spec-driven, agent-reviewed workflow so every iteration ships a website that doesn't regress.

**Live:** https://mehrpatni9-lgtm.github.io/mehr-portfolio/

---

## The architecture-first principle

> Every customer feedback compounds a contract. It never lands as a one-off pixel edit.

Concretely:
- "The COMPOUND label is clipped" is **not** "move the anchor." It is *"no SVG label may use `text-anchor=middle` within 100 viewBox units of an edge"* — a permanent rule added to `SPEC.md §4 C-1` and `AVOID.md`.
- A feedback that only changes pixels is a **failed translation**. The Translator agent must always identify which contract grows.
- The site gets sharper and the system gets more robust *together*. Iteration #50 is safer than iteration #5 because the spec has absorbed every prior lesson.

---

## The contract

| File | Role |
|---|---|
| `index.html` | The built site (single-file). |
| `SPEC.md` | Source of truth. Design tokens, section contracts, component invariants. |
| `AVOID.md` | Growing ledger of every rejection. Voice, color, layout, anti-patterns. |
| `screenshot.js` | Playwright script — takes full-page + section screenshots at desktop/tablet/mobile into `.review/latest/`. |
| `reference/` | Reference images and `.md` specs for sections that have a visual target. |
| `agents/translator.md` | Prompt: customer feedback → requirement + spec diff. |
| `agents/implementer.md` | Prompt: requirement → minimal code change. |
| `agents/reviewer.md` | Prompt: code change → PASS/FAIL with whole-file scan. |
| `agents/visual_reviewer.md` | Prompt: screenshots → PASS/FAIL against spec + reference images. |

---

## The loop

```
        customer feedback
                │
                ▼
       ┌────────────────┐
       │   Translator   │  reads SPEC + AVOID + feedback
       │   (subagent)   │  → requirement + spec/AVOID diff + open Qs
       └────────┬───────┘
                │
                ▼
       Main thread:
       — clarify open Qs with customer
       — apply spec/AVOID diff
                │
                ▼
       ┌────────────────┐
       │  Implementer   │  reads updated SPEC + requirement + index.html
       │   (subagent)   │  → minimal Edit diff
       └────────┬───────┘
                │
                ▼
       Main thread: apply Edits
                │
                ▼
       ┌────────────────┐
       │    Reviewer    │  reads SPEC + AVOID + full index.html + diff
       │   (subagent)   │  → PASS / FAIL with evidence + scope notes
       └────────┬───────┘
                │
              PASS
                │
                ▼
       Main thread: `npm run review`  (generates screenshots in .review/latest/)
                │
                ▼
       ┌────────────────┐
       │ Visual Reviewer│  reads PNGs + SPEC + AVOID + reference/
       │   (subagent)   │  → PASS / FAIL with pixel evidence
       └────────┬───────┘
                │
        ┌───────┴────────┐
        │                │
       PASS             FAIL
        │                │
        ▼                ▼
   git commit       requirement
   git push         tightened, loop
                    back to Implementer
```

---

## When the customer (Mehr) sends feedback

The main thread:

1. **Does not edit code first.** It spawns the Translator subagent with the verbatim feedback.
2. **Asks open questions back** before proceeding, if Translator flagged any.
3. **Applies the spec/AVOID diff** Translator proposed.
4. **Spawns the Implementer** with the now-updated spec.
5. **Applies the implementer's diff** to `index.html`.
6. **Spawns the Reviewer** before commit. If FAIL, re-runs Implementer with the tightened requirement.
7. **Commits and pushes** only on PASS.

---

## Why this works

- **Feedback becomes a contract.** Once written into the spec, it's structural — not a one-off pixel change.
- **One fix → whole-file scan.** The Reviewer searches for the same anti-pattern everywhere, so we don't ship the bug elsewhere later.
- **Specs cascade through tokens.** Change a token, every reference moves with it. No drift between sections.
- **Separation of concerns.** Translator owns *what*, Implementer owns *how*, Reviewer owns *quality*. The main thread orchestrates.

---

## Visual review

Default mode: **Mehr eyeballs the live URL and sends screenshots when something looks wrong.**
I read the screenshot via vision and run the Visual Reviewer subagent against it + the spec + any `reference/*.md` description.

Optional local mode (Playwright, already installed):
```bash
npm run review              # screenshots local index.html → .review/latest/
npm run review:live         # screenshots the deployed Pages URL
npm run review:inventory    # only the inventory diagram (faster spot-check)
```

Either way, the Visual Reviewer reads PNGs via vision, side-by-sides against `reference/`, and issues PASS/FAIL.

**To add a reference for a section:** drop a PNG at `reference/{slug}.png` *and* write a paired `reference/{slug}.md` that describes the intended look (peak positions, colors, label placement). The `.md` is the durable spec; the PNG is for vision side-by-side.

---

## File map

```
mehr-portfolio/
├── index.html             # the site
├── SPEC.md                # contract
├── AVOID.md               # rejection ledger
├── README.md              # this file
├── screenshot.js          # Playwright screenshot script
├── package.json           # npm scripts: review, review:live, review:inventory
├── .gitignore
├── reference/             # visual ground truth (PNGs + paired .md specs)
│   └── inventory.md
└── agents/
    ├── translator.md
    ├── implementer.md
    ├── reviewer.md
    └── visual_reviewer.md
```

---

## What this system still does NOT do

- No automated pixel-diff against a baseline (would catch tiny drifts across iterations).
- No CI integration (screenshots run locally, not on every push).
- No accessibility audit.

All wireable later as the project matures.
