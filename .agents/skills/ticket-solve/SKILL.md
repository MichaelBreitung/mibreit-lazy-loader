---
name: ticket-solve
description:
  Implement a local ticket, given its id or a pasted description.
---

# Ticket Solve

Turn a local ticket id into a verified, implemented fix.

## When to Activate

Use this skill when the user asks to:
- Solve, implement, or work on a specific ticket (e.g. "solve PROJ-123", "implement ticket ABC-42")
- Start development based on a ticket previously drafted with the ticket-draft skill

## Workflow

### Step 0 — Load the ticket system profile

Everything system-specific — what a ticket id looks like, how a ticket is fetched, where drafts are stored, which markup dialect applies — lives in the **ticket system profile** named by `.agents/project.md` as `ticket-systems/local.md` (e.g. `.agents/ticket-systems/local.md`). Read it before Step 1 and follow it verbatim.

The rest of this skill is system-agnostic: it assumes only that a ticket has an id and a description with the sections listed in Step 2. Never hardcode a CLI call, markup dialect, or field name here — if something is missing, extend the profile, not this skill.

If `ticket-systems/local.md` does not exist, stop and tell the user the repository is not onboarded for a ticket system; offer the `onboarding` skill or ask them to paste the ticket description.

### Step 1 — Fetch the ticket

Fetch the description for the given ticket id with the command from the **Fetch** section of `ticket-systems/local.md`, run from the repository root via the command execution tool available to you.

It returns the ticket's description — following the ticket-draft format (Background, Affected Areas, Acceptance criteria, Notes) if the ticket was drafted with that skill.

If the fetch fails or the ticket id is unknown, tell the user and ask them to paste the ticket description instead of failing silently.

### Step 2 — Understand the ticket

Parse the returned sections:
- Background — the problem and why it exists
- Affected Areas — files or modules impacted, each with its role and the impact of the problem there
- Acceptance criteria — checklist of concrete, verifiable outcomes
- Notes — scope boundaries, out-of-scope items, follow-ons

### Step 3 — Open the working memory, then clarify

**3a — Write the working memory. This is the first action of implementation, before anything else.**

Read `.agents/context/current-feature.md` (see `.agents/context/INSTRUCTIONS.md`) and decide:
- It already tracks **this** ticket → resume from the recorded plan, answers, and progress; do not restart it.
- It is the skeleton → this is a fresh feature; fill it in.
- It tracks a **different** ticket → you are probably on the wrong branch; stop and check with the user before overwriting.

Then **change the file**: propose the filled-in `.agents/context/current-feature.md` as a change, containing the ticket id, the branch (`git rev-parse --abbrev-ref HEAD`), the goal, a first build plan, and every open question.

This sub-step is not satisfied by reading the file, by noting that it is empty, or by presenting the plan and the questions in chat. Only a proposed change to `.agents/context/current-feature.md` completes it. Do not proceed to 3b, Step 4, or Step 5, and do not propose any code change, until that write has been proposed.

Write the plan even while it is still provisional — it is a working document and later steps will refine it. A rough plan in the file is worth more than a polished plan in chat, because only the file survives a lost context.

**3b — Ask the open questions.**

Do not start implementing on assumptions. Ask the user targeted questions when:
- The acceptance criteria are ambiguous or could be satisfied in contradictory ways
- The Background doesn't explain enough of the "why" to choose an approach
- Notes or out-of-scope items conflict with what the acceptance criteria imply
- The ticket references a design decision or prior discussion that isn't visible in the ticket text

Prefer one focused round of clarifying questions over guessing and course-correcting later. Ask exactly the questions you just recorded in 3a — the chat message is the delivery of the file's content, not a replacement for it, so keep the two identical rather than inventing extra questions in chat.

As each answer arrives, propose it back into the working memory alongside its question, so the next agent inherits the answer instead of re-asking it.

**3c — Get the working memory confirmed. Always, even when there is nothing to ask.**

When the file is written and any answers are folded in, **stop and end the turn.** Ask the user to review the recorded goal, build plan, decisions, and open questions, and to confirm or adjust before implementation starts.

- **An empty Open Questions section is not a green light.** It only means nothing blocked *you*. Every question you answered from the ticket instead of asking the user is a decision taken on their behalf — precisely the decisions nobody has checked. Those need the review most.
- Record those under **Decisions** with their source (e.g. "chose X — from acceptance criterion 3") before asking. That is what lets the user catch a misread ticket in seconds, which is the cheapest possible moment to catch it.
- **Accepting the proposed file change is not confirmation.** The user may well accept the working memory and still want the plan changed; proposing a change gives them no way to say so. Wait for an explicit go-ahead in chat.
- Do not continue into Step 4 or Step 5 in the same turn — not even "while waiting". Implementing past this point removes the developer's only chance to redirect the feature cheaply, before code exists.
- If they adjust anything, propose the corrected working memory and ask again. The confirmed file — not the chat exchange — is what the rest of the feature runs on.

### Step 4 — Verify the ticket against the codebase

Ticket content can go stale once the code moves on after drafting. Before writing any code:
- For every file or module named in Affected Areas, confirm it still exists with your file-listing or file-search tools.
- If a referenced file or module no longer matches, search for the likely moved/renamed equivalent yourself first; if it's still unclear, tell the user what changed and ask how to proceed.
- Affected Areas is a starting point, not an exhaustive list — expect to find further related call sites yourself as you explore the code.
- Never assume a claim in the ticket is still true — verify it, then implement.

### Step 5 — Implement

Once the ticket is understood, clarified, and verified against the current code:
- Treat the acceptance criteria as the definition of done.
- Keep changes scoped to what the ticket describes; flag scope creep back to the user instead of silently expanding it.

If the fix touches only one file, propose it directly as a change.

If the fix spans multiple files, go step by step instead of proposing everything at once:
1. The build plan confirmed in Step 3c **is** the plan — do not present a second one in chat and do not ask for approval twice. If Step 4 changed what you intend to touch, propose the corrected plan into `.agents/context/current-feature.md` and have that correction confirmed before touching any file.
2. Then work through the list one file at a time — propose the change for a file, and only move to the next file once that one is addressed. Tick off each step in the working memory as it lands, and record any decision taken or problem spotted along the way.

Keep the working memory current for the rest of the feature: it is what lets a compacted or fresh session resume without re-deriving the plan. Update it when state actually changes — not after every tool call — and commit it on the feature branch along with the code it describes, so a branch switch doesn't lose it.

When the feature is complete, the loop's **Reconcile** step promotes what is still provisional: decisions into the relevant `doc/` file (and `README.md` if developer- or operator-facing behaviour changed), flagged findings into tickets via `ticket-draft`. Once promoted, reset `.agents/context/current-feature.md` to its skeleton and commit that reset — it is the last commit before `final-review` and merge, so that `main` never carries an active feature.

Propose each fix as a change, following the coding rules in `.agents/AGENTS.md`.

## Notes

- This skill is the natural counterpart to ticket-draft: ticket-draft produces the ticket, ticket-solve consumes it.
- Do not skip Step 4 even if the ticket looks recent or detailed — stale references are the main failure mode this skill guards against.
- Do not skip Step 3a. Writing the working memory is a real file change, not bookkeeping to catch up on later: the moment it is deferred it is never written, and a compacted or fresh session then has nothing to resume from. If you notice you are about to ask a question or propose code without having written it, write it first.
