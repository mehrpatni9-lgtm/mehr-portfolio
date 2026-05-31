# Mehr Patni — Portfolio build system

A spec-driven, agent-reviewed workflow so every iteration ships a website that doesn't regress.

**Live:** https://mehrpatni9-lgtm.github.io/mehr-portfolio/

---

## The contract

| File | Role |
|---|---|
| `index.html` | The built site (single-file). |
| `SPEC.md` | Source of truth. Design tokens, section contracts, component invariants. |
| `AVOID.md` | Growing ledger of every rejection. Voice, color, layout, anti-patterns. |
| `agents/translator.md` | Prompt: customer feedback → requirement + spec diff. |
| `agents/implementer.md` | Prompt: requirement → minimal code change. |
| `agents/reviewer.md` | Prompt: change → PASS/FAIL with whole-file scan. |

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

## What this system does NOT do (yet)

- No headless-browser screenshot. Visual ground truth still requires Mehr sending screenshots when something looks wrong.
- No automated diff render between iterations. The Reviewer reads code; doesn't see pixels.

Both are wireable later (Playwright + a vision-capable reviewer).

---

## File map

```
mehr-portfolio/
├── index.html             # the site
├── SPEC.md                # contract
├── AVOID.md               # rejection ledger
├── README.md              # this file
└── agents/
    ├── translator.md
    ├── implementer.md
    └── reviewer.md
```
