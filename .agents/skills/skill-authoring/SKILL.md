---
name: skill-authoring
description:
  Author or revise a skill for this repository under .agents/skills/<skill-name>/SKILL.md, matching the conventions of the skills the installed workflow already ships. Use when a repeatable task deserves its own skill, when reworking an existing SKILL.md, or when reviewing whether a skill is well formed.
disable-model-invocation: true
---

# Skill Authoring

Turn a repeatable task in this repository into a skill the agent can load on its own, written the
same way as the skills the installed workflow already ships.

## When to Activate

Use this skill when the user asks to:
- Capture a recurring task of this repository as a new skill.
- Rewrite, split, merge, or shorten an existing `SKILL.md`.
- Review whether a skill follows the conventions used here.

## Workflow

### Step 0 — Load the local conventions

Read, in this order:

1. `.agents/project.md` — the repository's own answers (documentation map, ticket system,
   local skills). Everything repository-specific comes from here.
2. `AGENTS.md` — the main agent instructions, including the skills table.
3. Two existing skills under `.agents/skills/` — take their voice, section order, and level
   of detail as the template.

If `.agents/project.md` still contains `{{` placeholders, stop and tell the user the
repository is not onboarded yet; offer the `onboarding` skill first.

### Step 1 — Clarify the skill's contract

Answer these from the repository; ask the user a targeted question for each one you cannot:

- **Trigger** — what does the user say or want when this skill should run?
- **Scope** — what does the skill produce, and which neighbouring skill or rules file owns the rest?
- **Inputs** — which files, commands, or user answers does it need?
- **Output** — what exists at the end (edited files, a filed ticket, a branch, a report)?
- **Order** — which skill runs before it, which after, and what do they expect from it?

### Step 2 — Place the skill

- One directory per skill: `.agents/skills/<skill-name>/SKILL.md`.
- Name it lowercase and hyphenated, after the step it performs (`ticket-draft`, `final-review`).
- Keep material only this skill needs in its own directory; put knowledge two or more skills read
  into `.agents/rules/<topic>.md` and reference it by path from each skill.

### Step 3 — Write the SKILL.md

````markdown
---
name: <skill-name>
description:
  <One sentence: what the skill produces and the concrete trigger that picks it over its neighbours.
  This is the only text the agent sees when deciding whether to load the skill — leave the how to the
  body below it.>
---

# <Title Case Name>

<One or two sentences on the outcome the skill produces.>

## When to Activate

Use this skill when the user asks to:
- <concrete request>

## Workflow

### Step 0 — <load project.md / the rules file this skill depends on>
### Step 1 — <gather context>
### Step 2 — <ask the user what is missing>
### Step 3 — <do the work>

## <Rules section>

<The rules the work must satisfy, grouped under bold labels.>
````

Keep `name`, `description`, the `# Title`, and `## When to Activate`; the frontmatter `name` matches
the directory name exactly. Add or drop the rest as the skill needs.

### Step 4 — Read repository facts from project.md

Point at `.agents/project.md` for anything specific to this repository — documentation root,
trunk branch, ticket system, build and test commands. That keeps the skill correct when those answers
change, and it is where the workflow already records them.

### Step 5 — Decide whether the skill is loop-driven or user-invoked

A skill the loop reaches on its own (the next step after another skill, or a natural language request
matching its description) is discoverable: list it in the skills table in `AGENTS.md`.

A skill the developer must invoke by name on purpose — it makes a decision belonging to the developer,
not a step of the loop (`skill-authoring`, `kiss-text`, `mermaid-fix` are examples) — add
`disable-model-invocation: true` to its frontmatter and leave it out of that table. It still belongs
in the workflow's `README.md`, which documents everything shipped regardless of how it is invoked.

### Step 6 — Register the skill

- Record the new skill in `.agents/project.md`, in the section that lists this repository's
  local skills. `project.md` survives every workflow update, so a skill listed there stays visible
  after a refresh.
- Unless Step 5 marked it user-invoked, also add it to the skills table in `AGENTS.md` so
  agents without native skill discovery can open it as a plain file. Expect a workflow refresh to
  replace that table — `project.md` is the durable record.
- Start a new agent session and confirm the agent lists the skill before using it.

### Step 7 — Review the draft

- [ ] `description` alone is enough for an agent to decide correctly whether to load the skill, and
      does not restate what the Workflow section already covers.
- [ ] Frontmatter `name` == directory name.
- [ ] Every repository fact is read from `.agents/project.md` or a rules file.
- [ ] Shared knowledge lives in one file that the skill references by path.
- [ ] The skill names the neighbour or rules file that owns the adjacent concern.
- [ ] Every missing input leads to a targeted question or a clean stop pointing at `onboarding`.
- [ ] Each instruction names an action to take, in imperative voice, short enough to act on.
- [ ] Every reason left in the file changes what the agent does; the rest lives in the `README.md`.

## Authoring Rules

**Prescribe the behaviour you want**

State the action the agent should take. A rule phrased as an action is testable and self-contained; a
rule phrased as a prohibition leaves the agent to invent the alternative.

| Reach for this | Instead of this |
|---|---|
| "Write a targeted step-by-step guide the agent can act on." | "Don't add explanation that is irrelevant for an agent." |
| "Read the path from `.agents/project.md`." | "Never hardcode paths." |
| "Ask one targeted question per missing input, then start." | "Don't guess missing input." |
| "Run the build command recorded in `project.md` before reporting done." | "Don't claim success without building." |

When a skill misbehaves, rewrite the instruction that allowed it so it describes the correct action,
and keep the rule count flat. Reserve the few explicit negatives for real boundaries — what a skill
deliberately leaves to a neighbour, and hard constraints of this repository.

**Explain only the why that changes a decision**

Keep a reason when it tells the agent what to do in a case the skill does not enumerate; move the rest
to the repository's `README.md`, where the human audience is.

| Keep it | Because |
|---|---|
| a reason that says why one mechanism is not enough (`.agents/rules/mermaid-diagrams.md` needs both the style block and per-node classes) | without it the agent applies one, sees no effect, and reports done |
| a gotcha that names the mechanism ("the renderer turns every newline into a literal line break") | the mechanism lets the agent apply the rule to a case the list does not cover |
| a derivation the agent must act on ("…therefore the trunk branch never has an active feature") | the conclusion is a rule the agent would otherwise have to guess |

Cut a reason that only justifies the rule to a reader, restates the benefit, or recounts how the rule
came about. Attach the reason you keep to the instruction as one clause — a motivation paragraph ahead
of the action invites the agent to reason its way to a different action.

**Single responsibility**
- One task per skill. Two unrelated "When to Activate" groups mean two skills.
- A skill owns *what* to produce; a `rules/` file owns *how* it is formatted. Keep that split so the
  format is defined once for every skill that emits it.

**Keep the description selection-only**

The `description` frontmatter is the only text an agent reads before deciding whether to load the
skill. State what it produces and the trigger that separates it from its neighbours; leave the *how*
— steps, tone, inputs — to the body below it.

| Reach for this | Instead of this |
|---|---|
| "Trim verbose or repetitive text down to what its audience actually needs." | "Trim verbose text… Asks whether the audience is agents or developers, then cuts redundant examples, restated points, and piled-up don'ts while keeping every instruction that changes behaviour." |

**Write for an agent**
- Imperative, testable instructions ("Read X", "Run Y", "Stop and tell the user").
- Name exact paths and exact commands.
- Use a checklist wherever the agent must verify something.

**Fail loudly**
- When a prerequisite file, answer, or tool is missing, stop, say what is missing, and name the skill
  or command that provides it.
