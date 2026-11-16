---
name: onboarding
description:
  Make the generic agent instruction set repo-specific by filling project.md and resolving its placeholders. Run once per repository, right after onboarding.sh has installed the set.
---

# Onboarding

Turn the freshly installed, generic instruction set into the instructions for **this** repository.

`onboarding.sh` has already resolved the agent layout. This skill resolves everything that needs a
look at the actual repository: the documentation map, the conventions, and the ticket system.

**The developer decides.** Every value is confirmed by them before it is written. A value that cannot
be derived is asked for, never guessed — a wrong answer here is silently inherited by every later task.

**Ask first, verify second — they are the fastest tool you have.** Onboarding is a short interview,
not an investigation. Nearly every value here is something the developer knows instantly and the
repository only hints at: the trunk branch, the ticket system, which folder is the real documentation
root, which commands matter. Asking costs one message; deriving the same answer costs many commands
and still has to be confirmed. A session that asks six questions and runs three commands is a
**better** onboarding than one that runs thirty commands and asks nothing.

**Hard budget: one command per value, two at most.** If two commands have not settled a value, stop
searching and ask. `git`, `find`, and `grep` are for *confirming* an answer or pre-filling a proposal
— never for exploring. The trunk branch in particular is a single question: it never justifies a
sequence of branch, remote, and CI inspections.

## When to Activate

Use this skill when:
- The instruction set was just installed and `project.md` still contains `ONBOARD` blocks.
- An agent reports that the repository is "not onboarded", or you see a `{{...}}` placeholder.
- A convention changed repo-wide (the trunk branch was renamed, the ticket system was replaced).

---

## Step 0 — Confirm the install

- Locate the agent root (the folder holding `project.md`, `AGENTS.md`, `context/`, `skills/`,
  `rules/`, `ticket-systems/`).
- Check whether `token-mapping.json` already exists in the agent root. Its presence — not the absence
  of `ONBOARD` blocks — is the clean signal that this repository was onboarded before: it is a
  per-repo artifact this skill creates once, and `onboarding.sh` never ships or overwrites it. If it
  exists, report the current values (read them back with `jq`) and ask what should change instead of
  redoing the whole thing.

## Step 1 — Ask the developer

Open with **one batched round of questions**, before any exploration beyond a single listing of the
repository root. Ask for everything below in one message, offering a cheap guess where you have one
so the developer can simply confirm it.

| Value | How to get it |
|---|---|
| Purpose | **Ask.** Two sentences from the developer beat anything inferred from code. |
| Documentation root | **Ask**, offering the obvious candidate from that one root listing (`doc/`, `docs/`, `documentation/`). |
| Documentation map | **Ask** which file covers what; the scopes get confirmed in Step 2. |
| Trunk branch | **Ask.** One question — not a sequence of git commands. At most confirm with a single `git symbolic-ref refs/remotes/origin/HEAD`. |
| Ticket system | **Ask** which system is used and how a ticket is fetched. They know the tooling; `git log` at best reveals an id format. |
| Scratch directory | **Ask**, proposing `temp/`. |
| Commands | **Ask** for build/test/lint/run. They know which ones matter and which are slow or destructive; CI config only shows what CI happens to run. |

Put anything ambiguous to the developer instead of resolving it by investigation. An unanswered
question is carried into Step 3 as an open question, never filled with a plausible default.

If that single root listing shows no architecture documentation at all, say so: the
`architecture-create` skill has to run first, and it records the documentation map in `project.md`
itself.

## Step 2 — Verify the answers cheaply, then confirm the set

Check what you were told with the smallest number of commands — roughly one per value:

- The documentation root exists, and the files named in the map are there; each file's title and first section match the scope given for it.
- The trunk branch exists.
- The scratch directory is git-ignored.
- The commands appear in the build/test manifests or CI config.

Where a check contradicts an answer, go back with a question ("you said X, but I see Y — which is
right?") rather than quietly preferring the repository or launching a wider search. Their answer wins
unless they ask you to look closer.

Then present the complete set **in one batch** for final confirmation, calling out anything still
open. Do not start writing until the developer has confirmed.

## Step 3 — Choose the ticket system profile

The files under `ticket-systems/` are **mutually exclusive profiles** — one per possible backend, of
which exactly one ends up active. This is unlike `rules/`, whose files are shared and all stay active.

- Confirm which system the repository uses and pick the matching profile file.
- If no profile matches, create a sibling file with the same five sections as the existing one, so
  skills need no changes to support the new backend.
- Delete the other profiles in `ticket-systems/`, so exactly one remains. This pruning applies to
  `ticket-systems/` only — never to `rules/`.

## Step 4 — Build `token-mapping.json`

This is the foundation the rest of onboarding reads from — build it before touching `project.md` or
any other file, so there is exactly one place these values are decided.

- Build `token-mapping.json` in the agent root with the five simple values, e.g.:

  ```
  jq -n --arg doc_root "$DOC_ROOT" --arg trunk "$TRUNK_BRANCH" \
        --arg system "$TICKET_SYSTEM" --arg profile "ticket-systems/local.md" \
        --arg scratch "$SCRATCH_DIR" \
        '{DOC_ROOT: $doc_root, TRUNK_BRANCH: $trunk, TICKET_SYSTEM: $system,
          TICKET_PROFILE: $profile, SCRATCH_DIR: $scratch}' > token-mapping.json
  ```

- Validate immediately: `jq empty token-mapping.json` must succeed before anything reads it.
- `token-mapping.json` is a per-repo artifact. It never ships in the generic payload, and once written
  it is never hand-edited — regenerate it (this step) if a convention changes; `resolve-tokens.sh`
  always re-derives everything from it.

## Step 5 — Fill `project.md`

Read the confirmed values back from `token-mapping.json` — not from the interview notes directly — so
`project.md` and the mapping can never drift from each other. Replace each `<!-- ONBOARD:... -->`
block in place, keeping the surrounding prose and table structure.

- The **documentation map** is a `| File | Scope |` table. Scopes must be distinct and concrete
  enough to pick a file without opening the others.
- Omit the optional sections (repo-specific skills, repo-specific coding rules) entirely if they have
  no content. An empty heading invites someone to fill it with noise.

## Step 6 — Run `resolve-tokens.sh`

```
bash .agents/resolve-tokens.sh .agents
```

This substitutes the five simple tokens across every file in the agent root — deterministically,
from `token-mapping.json` alone. It requires `jq`. It is safe to re-run any time; `onboarding.sh`
invokes it automatically on every later refresh, so this step never has to be repeated by hand once
the mapping exists.

## Step 7 — Verify

Grep the agent root for `{{` and for `ONBOARD`. Both must come back empty — an unresolved placeholder
means a value was missed.

Note that `rules/` legitimately keeps its generic content: shared rules are not repo-specific and are
neither pruned nor rewritten during onboarding. Only a project palette recorded in `project.md`
overrides them.

Then check the result is coherent: every file in the documentation map exists, the trunk branch
exists, the scratch directory is git-ignored, and `jq empty token-mapping.json` still succeeds.

## Step 8 — Report and hand over

Summarize what was written, list anything left open, and recommend committing the agent root as one
commit. Then stop — onboarding does not roll into the first task.

---

## Notes

- **Never invent a value to keep going.** An unanswered question is reported, not filled with a
  plausible default.
- **`project.md` is the only repo-specific file that skills read from.** `token-mapping.json` is the
  only other repo-specific state, and it exists purely so `resolve-tokens.sh` can substitute
  deterministically — nothing else should read it directly.
- **This skill requires `jq`** to build and validate `token-mapping.json` and to run
  `resolve-tokens.sh`.
- Re-running `onboarding.sh` later refreshes the generic files, preserves `project.md`, and — if
  `token-mapping.json` already exists — re-prunes the ticket-system profiles and re-runs
  `resolve-tokens.sh` automatically. Re-run this skill only if that refresh introduced new placeholders
  or if a convention actually changed.
