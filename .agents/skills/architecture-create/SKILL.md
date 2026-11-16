---
name: architecture-create
description:
  Create the initial arc42 architecture documentation for a project that doesn't have one yet.
---

# Architecture Documentation — Initial Creation

Bootstrap the `doc/` architecture documentation for a project that **doesn't have one yet**.
The output is a set of **arc42-compliant** documents that become the single source of truth
for the project's design, decisions, and known Technical Debt.

**The contract is arc42.** Produce documents that conform to the arc42 structure and the
Writing Rules below. Anything downstream that maintains these docs relies only on that
contract — so getting the structure and conventions right is the whole job of this skill.

## When to Activate

Use this skill when:
- The project has no `doc/` architecture documentation (or only empty stubs).
- The user asks to bootstrap, scaffold, or create initial architecture docs.
- A team wants a documented, arc42-based description of a system that currently has none.

If substantive architecture docs already exist, this skill does not apply — it is for
greenfield doc creation only, not for correcting or refreshing existing docs.

---

## Step 0 — Confirm there is nothing to build on

- List `doc/` with your file-listing tool. If substantive architecture docs already exist, halt and
  say so — this skill only creates docs from scratch.

## Step 1 — Survey the codebase (breadth-first)

Build a mental model from the code before writing anything. Use your file-listing, content-search,
and file-reading tools to discover:

- **Languages, frameworks, runtimes** — from manifests (`package.json`, `pom.xml`, `pyproject.toml`, `go.mod`, etc.).
- **Deployable units** — how many services/apps ship; entry points (`main`, servers, CLI, handlers).
- **Internal structure** — top-level modules/packages/layers and their responsibilities.
- **External integrations** — APIs, message buses, third-party services, identity providers.
- **Data stores** — databases, caches, file/blob storage, schemas.
- **Build & deploy** — Dockerfiles, Helm/k8s, CI config, environment/config keys.
- **Cross-cutting patterns** — auth, error handling, logging, caching, async/queues.
- **Signals of Technical Debt** — TODO/FIXME, workarounds, duplicated logic, dead code.

## Step 2 — Decide the documentation map

Choose the file layout that fits the discovered structure, then **confirm it with the user before writing**:

| Project shape | Proposed docs |
|---|---|
| Single deployable / simple project | One doc: `doc//architecture.md` (full arc42) |
| Multiple cooperating services | `doc//system-architecture.md` (system view) + one `doc//<component>-architecture.md` per service |
| Shared libraries / utility packages | Add `doc//utils-architecture.md` (or similar) with a package-catalog structure |

Give each file a **single, non-overlapping scope**. Content must not be duplicated across files;
cross-references link them. Each file is arc42-compliant in its own right.

Once the user has confirmed the map, **record it in `.agents/project.md`** as the documentation
map — a `| File | Scope |` table, resolving the `ONBOARD:doc-map` marker if it is still open. Every
other skill reads the map from there rather than rediscovering it, so the map is not finished until it
is written down.

## Step 3 — Interview the user for design intent (the *why*)

Code reveals **structure**, not **rationale**. Ask focused questions — batched, not one at a time —
for the things that cannot be derived from code:

- **Purpose & primary use cases** — what problem the system solves and for whom.
- **Stakeholders** and their interests.
- **Quality goals**, ranked by priority (e.g. security, performance, operability).
- **Architecture decisions** and the reasoning behind them (the *why* behind what you see in code).
- **Constraints** — platform, organizational, regulatory, technology mandates.
- **Known Technical Debt** the team is already aware of.

If the user cannot answer something, record it as `> ⚠️ TODO: verify` rather than guessing.

## Step 4 — Draft the arc42 skeleton

Read `.agents/rules/mermaid-diagrams.md` and apply it directly to every diagram in every doc
— it is shared with the other skills that touch diagrams, which is what keeps every diagram in the
project consistent. If `.agents/project.md` records a project palette, it overrides the
default there.

The one requirement specific to doc files: the rule file's `<style>` block goes at the very top of
**every** doc file, exactly once, before the title — the same block, unmodified, in every doc.

Then create the standard arc42 section headings for each doc. Standard section set:

| # | Section | Primary source |
|---|---|---|
| 1 | Introduction and Goals | user (purpose, requirements, quality goals, stakeholders) |
| 2 | Architecture Constraints | user + config |
| 3 | System Scope and Context | code + user |
| 4 | Solution Strategy | user + code |
| 5 | Building Block View | code |
| 6 | Runtime View | code |
| 7 | Deployment View | build/deploy config |
| 8 | Cross-cutting Concepts | code |
| 9 | Architecture Decisions | user (rationale) |
| 10 | Quality Requirements | user |
| 11 | Risks and Technical Debt | code + user |
| 12 | Glossary | both |

- A **system-level** doc may omit sections that only make sense per component (e.g. a detailed
  Runtime View). Keep the numbering and add a one-line note explaining why a section is out of
  scope rather than renumbering or deleting the heading.
- A **shared-utils** doc may use a lighter structure (Purpose/Scope → Design Principles →
  Package Catalog → Cross-cutting Concerns → Glossary) instead of the full 1–12.

## Step 5 — Populate each section

Work **chapter by chapter**, in arc42 order, drafting one section at a time and letting the user
review each one before moving on:

1. Draft a single section — code-derived sections (3, 5, 6, 7, 8) from the Step 1 survey,
   intent-derived sections (1, 2, 4, 9, 10) from the Step 3 interview. Verify every code claim
   against the actual code before writing it.
2. Present that section to the user and pause for review. Incorporate their corrections and
   fill any gaps they surface before continuing.
3. Only once the user is satisfied, move on to the next section.

This keeps each chapter accurate and lets the user steer intent-heavy sections early, before that
context is baked into later chapters. When several docs are in scope, finish and review one document
before starting the next.

## Step 6 — Conventions for the Glossary, Architecture Decisions, Quality Requirements, and Technical Debt chapters

These are not a separate phase — apply them **when you reach §9, §10, §11, and §12 during the Step 5
pass**:

- Establish the **primary glossary** in the system-level (or single) doc's §12; component docs add
  component-local terms in their own §12. Define each term once and reuse it.
- Give every item in §9 (Architecture Decisions), §10 (Quality Requirements), and §11 (Risks and
  Technical Debt) a stable ID. Read `.agents/rules/architecture-doc-ids.md` and apply it directly —
  it defines the prefixes, the per-document scoping, the anchor format, and the stability rules; do
  not restate it here.

## Step 7 — Propose the files

- Propose each file as a change for the user to review — one change per file. Proposing only stages
  the edit; the user reviews and applies it themselves.

---

## Writing Rules

**Accuracy over completeness** — state only what is verifiable from the code or explicit user input.
Flag anything unconfirmed with `> ⚠️ TODO: verify`.

**Stay in scope** — each file has one defined scope. Describe a concept that spans files once, in its
owning file, and cross-reference it from the others.

**Preserve arc42 structure** — keep section numbering and headings stable. Add new detail as a
subsection under the appropriate top-level section, and note an out-of-scope section instead of
deleting its heading.

**Style**
- Declarative present tense: "The service routes requests to…", not "…will route…".
- **Naming:** avoid specific file paths, class names, and function names — they change often and make
  docs brittle. Describe behaviour and responsibility at the module/component level. When a name must
  appear (package name, named concept, established module boundary), use it exactly as in the code.
- **Diagrams:** use Mermaid; add a diagram only where it adds clarity over prose. Apply
  `.agents/rules/mermaid-diagrams.md` for the palette, the `<style>` block, and the
  per-diagram templates.
- **Technical Debt, Architecture Decisions, Quality Requirements:** use the stable ID scheme in
  `.agents/rules/architecture-doc-ids.md` — never reorder or reuse an ID.

**Style block** — every doc file starts with the standard `<style>` block from Step 4, verbatim,
identical, and unmodified across all docs. External reference URLs should be real links; flag any
that cannot be confirmed with a `> ⚠️ TODO: verify link` note.