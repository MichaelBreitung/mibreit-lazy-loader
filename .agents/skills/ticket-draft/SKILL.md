---
name: ticket-draft
description:
  Draft a local ticket from a Technical Debt item in the architecture documentation, or from a problem the user describes.
---

# Ticket Draft

Turn a Technical Debt item or a problem description into a well-structured ticket.

## When to Activate

Use this skill when the user asks to:
- Draft or create a ticket for a known Technical Debt item
- Draft or create a ticket based on a problem or improvement they describe
- Turn an architecture doc finding into a ticket

## Workflow

### Step 0 — Load the ticket system profile

Read the ticket system profile that `.agents/project.md` names as `ticket-systems/local.md` (e.g. `.agents/ticket-systems/local.md`). It owns everything system-specific: id format, how the ticket reaches the system, the markup dialect and its gotchas. This skill owns only *what belongs in* a ticket — never how it is formatted or filed.

If `ticket-systems/local.md` does not exist, stop and tell the user the repository is not onboarded for a ticket system; offer the `onboarding` skill.

### Step 1 — Gather context

**Technical Debt item:**
Search the architecture documentation (`doc/`) for the item the user named. Extract the relevant details (problem, affected components, file paths).

**Problem description:**
Use the problem as provided by the user.

### Step 2 — Clarify interactively

Before drafting, check whether all information required by the rules below is available. If anything is missing or ambiguous, ask the user targeted questions. Only proceed to drafting once you have enough to fill all relevant sections.

### Step 3 — Draft the ticket

Apply the drafting rules below, then format and file the result exactly as `ticket-systems/local.md` prescribes.

## Drafting Rules

**Structure**
- Title: short, action-oriented, no ticket ID in the title
- Priority: reflecting actual production risk, on the scale defined in `ticket-systems/local.md`
- Description sections: Background, Affected Areas, Acceptance criteria, Notes — each a heading followed by its paragraph, list, or table. This section layout is the contract `ticket-solve` parses; keep it in step with the layout named in `ticket-systems/local.md`. The markup dialect, heading syntax, and how title/priority/description are presented all come from `ticket-systems/local.md`; do not restate them here.

**Content rules**
- No code snippets — the ticket is a story, not a PR
- Background: explain the problem and why it exists (1 short paragraph)
- Affected Areas: a table naming the files or modules involved, each with its role in the flow and the impact of the problem there — columns: area, role, impact. Keep it at file/module level, not line numbers or function names. List what's known to be affected, not an exhaustive enumeration — the developer explores further during `ticket-solve`
- Acceptance criteria: a checkbox list, each item a concrete, verifiable outcome
- Notes: anything that scopes the ticket, flags follow-ons, or records a conscious decision (e.g. what is explicitly out of scope)

**Tone & length**
- Written for a developer who has not read the architecture doc
- Explicit enough that they know what to look for; not so prescriptive that it dictates implementation
- Keep it short — if a section has nothing to add, omit it

Before handing the draft over, re-check it against the **Markup** section of `ticket-systems/local.md` — its gotchas are the most common source of a mangled ticket.
