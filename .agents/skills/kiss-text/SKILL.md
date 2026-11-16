---
name: kiss-text
description:
  Trim verbose or repetitive text — a skill, agent instructions, a README, or any other prose in this repository — down to what its audience actually needs.
disable-model-invocation: true
---

# Kiss Text (Keep It Short and Simple)

Cut ballast out of existing text without losing anything that changes what the reader does.

## When to Activate

Use this skill when the user asks to:
- Tighten, trim, or de-chatter a skill, README, or other doc
- Review a piece of text for unnecessary repetition or examples
- Make a text more concise while keeping it precise

## Workflow

### Step 0 — Identify the text and its audience

Determine which file or selection the user means (the active file by default, if the request doesn't
name one).

Ask the user unless the file itself settles it — a `SKILL.md`, a `rules/` file, or `AGENTS.md` is
always Agent audience; a `README.md` is always Developer audience:

> Is this text read by an agent (a skill, agent instructions, a rules file) or by a developer (a
> README, project doc, guide)?

The audience decides which rules in Step 2 apply — do not guess it.

### Step 1 — Read the whole text

Read the full file before editing any part of it; a repeated example or a restated point is often
only visible once you've seen the rest of the document.

### Step 2 — Apply the audience's trimming rules

**Agent audience** — cut aggressively; an agent needs the instruction, not the argument for it.
- Keep one example per rule; drop every additional example that illustrates the same point.
- Replace a list of "don't"s with the single direct instruction that would have prevented all of them
  — see `.agents/skills/skill-authoring/SKILL.md` § Authoring Rules for the full pattern and
  reuse it rather than restating it here.
- Cut a reason that only justifies the rule to a reader; keep a reason only when it tells the agent
  what to do in a case the rule doesn't spell out.
- Merge sections that make the same point from different angles into the one place a reader would
  look for it first.

**Developer audience** — trim, but keep the reader oriented.
- Keep the rationale a developer needs to make their own judgment call; cut a second example or
  paragraph that only restates the first.
- Cut throat-clearing ("In this section, we will look at…", "It's worth noting that…") — start with
  the point.
- Prefer a table or list over a paragraph wherever the content is a set of comparable items.
- Keep exactly the context a first-time reader needs to orient; cut context already given by the file
  that links to this one.

### Step 3 — Edit the text

Apply the edit directly. Preserve every instruction, constraint, and fact that changes what a reader
does; remove only what restates, over-illustrates, or over-qualifies it.

### Step 4 — Summarize what was cut

Tell the user, briefly, what categories of ballast were removed (e.g. "cut 2 of 3 examples in §
Workflow, merged two repeated warnings into one") so they can confirm nothing load-bearing was lost.

## Notes

- This skill trims existing text for concision — it does not restructure a skill's workflow or invent
  new content. Use `skill-authoring` for creating or restructuring a skill.
- When in doubt whether a sentence is load-bearing, keep it: a slightly longer text costs less than a
  silently dropped instruction.
