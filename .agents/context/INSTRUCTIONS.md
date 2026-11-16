# Agent Working Memory

`.agents/context/` is the agent's **working memory** for the feature currently being implemented. It is **committed to the feature branch**, so the memory travels with the code it describes: checking out a branch restores that feature's state, and switching branches switches memory. Working memory is scratch state for one branch — never a deliverable that reaches `main`.

Its purpose is recovery. When a session is compacted, restarted, or handed to another agent mid-feature, reading `current-feature.md` must be enough to know what we are building, how far we got, and what is still unanswered — without re-deriving it from the ticket, the diff, and chat history.

## Relation to the Source of Truth

`doc/` stays the single source of truth (see `.agents/AGENTS.md`). Working memory never competes with it:

| | `doc/` | `.agents/context/` |
|---|---|---|
| Scope | intended design of the system | one in-flight ticket |
| Lifetime | permanent, lives on `main` | one feature branch, cleared before merge |
| Content | decisions that hold | plan, progress, open questions, provisional decisions |

Everything in working memory is **provisional**. It only becomes durable when it is promoted:
- a design decision → into the relevant `doc/` file during the **Reconcile** step
- a new problem or Technical Debt item → into `doc/` and a ticket via `ticket-draft`

If it is still only in `current-feature.md` when the branch merges, it is lost. That is intended: the file is a staging area, and clearing it forces the promotion.

## Branch Scoping

**Invariant: `main` never has an active feature.** On `main`, `current-feature.md` is always the skeleton. Two things follow from it:

- **It is the merge gate.** Clearing the file is the last thing that happens on a feature branch, after Reconcile has promoted everything worth keeping. A branch whose working memory is still filled in is by definition not ready to merge — the promotion hasn't happened yet.
- **It keeps the file conflict-free.** Every branch starts from a skeleton and lands a skeleton, so parallel features never contend over the same lines. Merging or rebasing `main` into a branch brings only the skeleton: keep the branch's version. A real conflict in this file means an uncleared branch was merged — fix that, don't resolve it by hand.

With one feature per branch, "exactly one active feature" holds per branch, not globally: parallel features are fine because each branch carries its own memory. Never copy or merge another branch's context in. If `current-feature.md` names a ticket other than the one you were asked to work on, treat it as a signal that you are on the wrong branch — stop and check with the user before overwriting it.

**Commit it.** Commit the working-memory update together with the code step it describes (or as a small `chore(context)` commit). Uncommitted memory does not survive a branch switch, which defeats the purpose.

## Files

- `INSTRUCTIONS.md` — this file. How working memory is used. Permanent, lives on `main`.
- `current-feature.md` — the active feature on this branch. Skeleton on `main` and on any branch that hasn't started implementing.

Both files are generic. An onboarding script must **never overwrite a filled-in `current-feature.md`**: that would destroy the working memory of an in-flight feature.

## Lifecycle

Working memory is written and read by `ticket-solve`, which owns steps 3–4 of the loop:

1. **Open** — before implementing, `ticket-solve` reads `current-feature.md` on the current branch.
   - Same ticket as the request → resume from the plan and progress recorded there.
   - Skeleton → start fresh: fill it in with the new ticket's goal, build plan, and open questions.
   - A different ticket → do not overwrite; confirm the branch with the user first (see Branch Scoping).
2. **Fill & confirm** — the build plan and the open questions are written **before any code is proposed**, and the open questions are put to the user in one focused round. Answers are written back into the file as they arrive, so a later agent inherits the answers instead of re-asking. The filled-in file is then explicitly confirmed by the user before implementation starts — unconditionally, even when there was nothing to ask. This is the developer's one cheap chance to correct the goal, the plan, and the decisions the agent took on their behalf, while nothing but a plan exists. Accepting the proposed file change does not count as that confirmation: it cannot express "yes, but differently". An explicit go-ahead does.
3. **Track** — as implementation proceeds, tick off plan steps, record decisions taken along the way, and note anything flagged for later. Update the file when state actually changes, not after every tool call.
4. **Promote & clear** — during **Reconcile**, move decisions into `doc/` (and `README.md` where developer- or operator-facing behaviour changed) and hand flags to `ticket-draft`. Then reset `current-feature.md` to the skeleton and commit that reset — before the branch goes to `final-review`, so the reviewed diff contains no working memory at all. `git diff main...HEAD -- .agents/context/` coming back empty is the proof that this step is done.

## Rules

- **Keep it short.** A plan, open questions, decisions, flags. No transcripts, no diffs, no pasted code, no full ticket text — the ticket is fetched from the ticket system, not mirrored here.
- **Record state, not narration.** "Chose X over Y because Z" is memory; "analysed the router" is noise.
- **Open questions stay visible.** An unanswered question is never silently resolved by assumption; it stays listed until the user answers it.
- **Never cite it as authority.** When answering design questions, quote `doc/`. Working memory only says what *this* feature is doing right now.
- **`final-review` must not read it.** That review is deliberately clean-slate: ticket, diff, `doc/`, final code. Knowing the author's plan defeats the independence it exists to provide.
