# Agent Instructions

> If any `{{...}}` placeholder or `ONBOARD` marker remains below, this repository is not onboarded.
> Say so and offer to run the `onboarding` skill — never guess the missing values.

## Project Profile

`.agents/project.md` is this repository's onboarding result: the documentation map, trunk
branch, active ticket system, and any repo-specific skills or coding rules. Read it before the first
task of a session.

Everything specific to the ticket system — id format, how tickets are fetched and created, markup
dialect and its gotchas — lives in the ticket system profile at `.agents/ticket-systems/` that
`project.md` names as `ticket-systems/local.md`. Swapping ticket backends means adding a sibling profile
and changing that one line — no skill is touched.

## Shared Rules

`.agents/rules/` holds conventions that more than one skill needs, and all of them always
apply:

| File | Owns |
|---|---|
| `rules/mermaid-diagrams.md` | the diagram style contract and palette |
| `rules/architecture-doc-ids.md` | stable IDs (`ADR-`, `Q-`, `TD-`) for arc42 items |

A skill that needs a shared rule reads the file directly and applies it — never restate a rule's
content inside a skill; the file in `rules/` is the single source. Record a project-specific
deviation in `.agents/project.md` instead, because `rules/` is replaced on every re-install.

## Source of Truth

`doc/` is the single source of truth for this project's design. Read the relevant file — see
the Documentation Map in `.agents/project.md` for which file covers what — before answering
questions or changing code.

## Workflow

Work in an architecture-driven loop to keep technical debt low and design intent explicit:

1. **Document** — the architecture docs record the intended design, the decisions behind it (the *why*), and every known Technical Debt item.
2. **Derive tickets** — capture features, design decisions, and Technical Debt items as scoped local tickets.
3. **Implement** — code fulfils a ticket and stays consistent with the documented design and decisions.
4. **Reconcile** — update the affected doc after a change so docs and code never drift; also update `README.md` when developer- or operator-facing behaviour changed (setup steps, environment variables, CLI tools, operational procedures).
5. **Review** — before a feature branch merges, give it a final, independent review with a fresh agent (clean slate): diff it against `main` and check it against the ticket's acceptance criteria and the documented design (quality goals, contracts). Report findings and hand off any new work rather than fixing it in place — feeding steps 1 and 2.

**Flag as you go.** Whenever you spot new Technical Debt or a problem — even one unrelated to the current task — record it in the relevant doc (feeding step 1) and capture a ticket for it (step 2). Surface it; never silently work around it.

## Working Memory

`.agents/context/current-feature.md` holds the agent's working memory for the ticket in flight — the build plan, open questions, provisional decisions, and flagged findings. It is committed to the feature branch, so checking out the branch restores that state, and a fresh or compacted session can resume mid-feature from that file alone. Read `.agents/context/INSTRUCTIONS.md` for its lifecycle and rules.

Writing it is the **first action** when implementation starts — a real file change, before any code is proposed or any question is asked; presenting a plan in chat does not count. The developer then confirms the recorded goal, plan, and decisions before implementation begins, even when there was nothing to ask. `doc/` remains the single source of truth: **Reconcile** promotes what is provisional — decisions into `doc/`, new problems into a ticket — and resetting the working memory to its skeleton is the last commit on a feature branch, so **`main` never has an active feature**. Step 5 is the exception: the final review stays clean-slate and must not read working memory.

## Skills

The detailed conventions for each step of the loop live in the skills under `.agents/skills/`. Don't restate their rules here. Agents that discover skills natively offer them by name; agents that don't can read `.agents/skills/<name>/SKILL.md` directly as a file.

| Skill | Loop step | Use for |
|---|---|---|
| `architecture-create` | 1 | Create the initial architecture documentation for a repo that has none |
| `architecture-update` | 1, 4 | Doc work, including recording design decisions |
| `ticket-draft` | 2 | Create a ticket for any work type — feature, design decision, or Technical Debt |
| `ticket-solve` | 3, 4 | Implement a ticket and reconcile the docs afterwards |
| `final-review` | 5 | Clean-slate review of a feature branch before merge |

Skills this repository adds on top of the shared set — anything relying on conventions that are not generic — are described in `.agents/project.md`.

## Coding Rules

Add comments or documentation only to a package's main interfaces, or to explain a genuinely complex algorithm or workflow. Otherwise write clearly structured, self-explanatory code that needs none.

`.agents/project.md` may add repo-specific coding rules; where they conflict with the above, the repo-specific rule wins.
