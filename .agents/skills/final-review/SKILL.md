---
name: final-review
description:
  Run a final, clean-slate review of a completed feature branch against its ticket and the architecture documentation, before it is merged.
---

# Final Branch Review

Give a finished feature branch a thorough, independent review before it is merged.

This skill is the last step of the architecture-driven loop (draft ticket → solve ticket → reconcile docs → **final review**). It is meant to be run by a **fresh agent with a clean slate**: assume no memory of how the feature was built, and judge the branch purely on the ticket, the diff, and the architecture documentation. This independence is the whole point — do not defer to prior design chatter you weren't part of.

## When to Activate

Use this skill when the user asks to:
- Do a final review of a feature branch before merging
- Review a branch against a ticket and/or the architecture docs
- Get a second, clean-slate opinion on a completed implementation

## Ground Rules

- **Review, don't implement.** The output is an assessment, not code. Do not propose a code change to fix things you find — surface them instead (see Step 6). The developer decides what to act on.
- **Read the docs before judging.** `doc/` is the single source of truth for intended design, quality goals, and contracts. A change that "works" but violates documented design intent is still a finding.
- **Ground every finding.** Cite the exact file, function, and — where relevant — the doc section or acceptance criterion it relates to. No vague, generic remarks.
- **Do not read the working memory.** `.agents/context/current-feature.md` holds the implementing agent's build plan, open questions, and provisional decisions. Reading it imports the author's intent and defeats the independence this review exists to provide. Your inputs are the ticket, the diff, `doc/`, and the final code — nothing else. It should already be cleared by the time you review: grep the diff file from Step 2 for `.agents/context/`, and if the branch changed anything there, report it as a **Blocker** ("Reconcile incomplete — working memory not promoted and cleared") without reading the contents.
- **Ask the developer — they are the fastest tool you have.** They know why the branch looks the way it does, which parts matter, and what was deliberate. One answered question replaces a dozen searches. This review is a conversation, not a solo excavation: a review that takes an hour of silent grepping is a *worse* review than one that takes ten minutes and asks four questions, because the searching crowds out the actual judging. When the diff and the docs don't settle something, ask.
- **One diff, then no more git.** Step 2 writes the full diff to a file. That file, plus the final state of the files on the branch, is your complete view of the change — it is deliberately produced once, up front, so you never have to reconstruct anything. After Step 2, run **no** further git commands: no `log`, `blame`, `show`, `stash`, no second `diff`, not even a `diff` narrowed to one path. Anything you would go to git for is either already in the diff file (grep it) or a question for the developer. Re-invoking git is the main way this review degenerates into a slow, disoriented crawl.
- **Review the net change, not the history.** Judge the branch by its cumulative diff against `main` plus the final code state — never walk the branch commit-by-commit. Intermediate commits (work-in-progress, reverts, fixups) are noise for this review and will distract you; only what ends up merged matters. Your four inputs are: the ticket, the full diff, the architecture documentation, and the final code on the branch — that is enough.

## Workflow

### Step 1 — Get the ticket

Obtain the ticket the branch is supposed to fulfil, the same way `ticket-solve` does:
- If the developer pasted the ticket description into the prompt, use that.
- Otherwise, if given a ticket id, fetch it with the command from the **Fetch** section of the ticket system profile that `.agents/project.md` names as `ticket-systems/local.md`.

If the fetch fails or the id is unknown, tell the user and ask them to paste the ticket instead of failing silently.

Parse the ticket into: Background (the "why"), Acceptance criteria (the definition of done), Affected Areas (files or modules impacted), and Notes (scope boundaries, out-of-scope items).

### Step 2 — Produce the diff

Determine what the branch actually changed relative to `main`. First get a quick overview in the terminal:

```
git diff --stat main...HEAD
```

Then write the **full** diff to a file rather than dumping it to the terminal — a large diff will not fit the terminal scrollback and cannot be navigated reliably there. Use the ticket id in the name:

```
git diff main...HEAD > temp//<TICKET-ID>-diff.txt
```

(If there is no ticket id, use a stable fallback like `temp//final-review-diff.txt`.) Then read and navigate the diff file with the file-reading and text-search tools — page through it with offset/limit and grep it for specific files or symbols — instead of relying on terminal output.

(Three-dot compares the branch against its merge base with `main`, i.e. only what this branch introduced — the single cumulative change, not a series of commits.) Do not inspect individual commits (`git log`, per-commit diffs); they only distract from the net result. If `main` is stale locally, note that the review reflects the local state. Build a mental map of the changed files and group them by component, using the documentation map in `.agents/project.md` as the component breakdown. Where the diff alone doesn't give enough context, open the **final** version of the file on the branch to see the change in place.

**These are the last git commands of the review.** With the diff file written, git is done: from here on, the diff file, the final files on the branch, `doc/`, and the developer are your only sources. Navigate the diff with offset/limit paging and grep *on the diff file itself* — that is how you find "what happened to file X" or "where is symbol Y touched", not by asking git again.

### Step 2b — Orient with the developer before searching

Once you have the file map, ask the developer one short round of orienting questions, before any deep reading. You are reviewing *their* branch: they can answer in a sentence what would cost you many searches to infer, and cheap answers up front stop you from investigating the wrong things.

Good things to ask here:
- Which changes are the substance of the feature, and which are incidental (renames, moves, formatting, generated files)?
- Was anything in the diff deliberate-but-surprising — a workaround, a temporary shim, something out of the ticket's scope?
- Where does the risk sit in their view: what would they most want a second pair of eyes on?
- Anything that is intentionally *not* in the branch (deferred to a follow-up ticket)?
- Is `main` up to date locally, and is this the branch state they intend to merge?

Then keep asking throughout the review, with a hard budget: **if two searches have not answered a question, stop searching and ask the developer.** Batch questions into a single message where you can, and never let an unresolved question become a finding until you have put it to them — an unasked question produces a wrong finding, which costs the developer more than the question would have. `find`/`grep` are for confirming something specific you already expect, not for exploring.

### Step 3 — Read the relevant architecture docs

For each component touched by the diff, read the matching document from the documentation map in `.agents/project.md` so you know the intended design and its contracts before you judge the code. The map says which file in `doc/` covers which component: start with the system-level document for quality goals and cross-cutting concerns, then read the component-level documents for the areas the diff touches.

Note the documented quality goals, public interfaces, and any recorded design decisions that the changed areas are bound by.

### Step 4 — Review the changes

Work through the diff file — not git, and not a fresh exploration of the repo. Open the final version of a changed file when you need to see a change in place, read `doc/` for intent, and put anything neither of those answers to the developer instead of hunting for it. Prefer one question over five searches; a question keeps the review moving, searching stalls it.

For each meaningful change, ask yourself:

**Contracts & quality goals**
- Does the change break any contract or quality goal set in the architecture documentation (public interfaces, invariants, security/identity rules, cross-service assumptions, performance/quality attributes)?
- Does it contradict a recorded design decision, or make one silently obsolete without updating the doc?

**Acceptance criteria**
- Is every acceptance criterion in the ticket actually met by the diff? Go criterion by criterion and mark each as met / partially met / not met, citing the code that satisfies it.
- Did the branch stay in scope, or did it drift beyond what the ticket describes (and beyond its Notes / out-of-scope items)?

**Soundness & room for improvement**
- Is the implementation correct and robust — edge cases, error handling, concurrency, resource cleanup, input validation?
- Does it follow the coding rules in `.agents/AGENTS.md` and any repo-specific rules in `.agents/project.md`?
- Is there a clearly simpler, safer, or more consistent approach that fits the existing patterns better? Distinguish "must fix" from "could improve".

**Doc & README reconciliation**
- Per the loop's reconcile step: were the affected docs in `doc/` updated to match the change? If developer- or operator-facing behaviour changed (setup, env vars, CLI tools, operational procedures), was `README.md` updated too?
- Flag any code/doc drift the branch introduces or leaves behind.

**New technical debt**
- Did the change introduce new technical debt, or leave a TODO/workaround that should be tracked?

### Step 5 — Report

Produce a single, structured review report and write it to `temp//<TICKET-ID>-review.md` (fallback `temp//final-review-review.md` when there is no ticket id). This file is the **handover artifact** — a self-contained record another agent or reviewer can pick up without having watched this review — so make it stand on its own: state the ticket id, the branch reviewed, and the `main` baseline at the top, then the sections below. Also give the user the same summary in chat.

- **Verdict** — overall: ready to merge / merge with minor fixes / not ready, with a one-line justification.
- **Acceptance criteria** — the per-criterion checklist from Step 4.
- **Findings** — grouped by severity (Blocker / Major / Minor / Nitpick). Each finding: what, where (file + function/line), why it matters (link to the doc contract, quality goal, or acceptance criterion), and a suggested direction — not a code patch.
- **Docs & README** — reconciliation status.
- **Handoffs** — any tickets to draft or follow-on work identified in Step 6, so the next agent can act on them directly.

Keep it skimmable; lead with blockers. Write it as a clean, self-contained artifact, not raw scratch notes.

### Step 6 — Hand off, don't fix

Follow the loop's "flag as you go" rule instead of quietly fixing things:
- For a **new problem or technical debt** the review uncovers, record it in the relevant `doc/` file and hand it to the `ticket-draft` skill to capture as a ticket.
- For work the developer decides to do now, hand off to `ticket-solve` (or let them address it directly on the branch).

Only if the user explicitly asks you to fix a specific finding should you switch out of review mode and propose a code change.

### Step 7 — Clean up

The diff file from Step 2 is a scratch artifact, not part of the deliverable. Once the review is written, remove it:

```
rm -f temp//<TICKET-ID>-diff.txt
```

Do this even if the review ends early or errors out, so the working tree is left clean and the file is never committed.

**Keep** the review file (`temp//<TICKET-ID>-review.md`) — it is the handover artifact and must survive cleanup. Do not delete it; leave it in place for the next agent or reviewer.

## Notes

- Independence is the value here: this skill exists precisely so a fresh agent — not the one that wrote the code — checks the branch against the ticket and the documented design.
- Do not skip Step 3. A diff can be internally clean yet still violate an architecture contract or quality goal; that is one of the main things this review is meant to catch.
- If the ticket references files or functions that no longer match the branch, note the drift in the report rather than assuming the ticket is authoritative — the branch is what will be merged.
