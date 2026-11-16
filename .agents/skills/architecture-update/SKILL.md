---
name: architecture-update
description:
  Update the architecture documentation to reflect the current state of the codebase, across all docs or a targeted file, chapter, or topic.
---

# Architecture Documentation Update

Keep the `doc/` architecture documentation in sync with the actual codebase.

## When to Activate

Use this skill when the user asks to:
- Update or refresh the architecture documentation
- Check whether the architecture docs are still accurate
- Sync a specific doc file, chapter, or topic against the code

## Documentation Map

The documentation map — which file in `doc/` owns which scope — is defined in `.agents/project.md`. Read it first and treat it as binding: each file has a clear scope, and content is never moved between files.

Do not duplicate the map here; if it is missing or wrong, fix it in `project.md` rather than working around it.

Arc42-based structure is used throughout. Each file only covers sections relevant to its scope.

---

## Use Case 1 — Full Update

### Step 1 — Build a working set

Read every file listed in the documentation map. For each one, extract:
- Every concrete claim: component names, file paths, class/function names, data flows, sequence steps, configuration keys, dependencies, constraints, technical debt items.
- The arc42 sections present and their headings.

### Step 2 — Verify each claim against the codebase

For every concrete claim extracted in Step 1, search the codebase to confirm it is still accurate. Use your content-search, file-reading, and file-listing tools as needed. Flag each claim as:
- **Accurate** — code matches the doc
- **Outdated** — code contradicts the doc (component renamed, flow changed, file removed, etc.)
- **Missing** — something significant exists in the code that has no representation in the doc

### Step 3 — Identify new content

Look for patterns in the codebase that belong in the documentation but have no current entry:
- New modules, packages, or layers added since the last doc update
- New cross-cutting flows (auth, error handling, caching, etc.)
- New Technical Debt items visible from code quality, TODOs, or workaround patterns

### Step 4 — Clarify before writing

If any finding is ambiguous — you cannot tell from the code alone whether the doc is wrong or the code is wrong — ask the user before proposing a change.

### Step 5 — Propose updates

Propose edits as changes. Apply the writing rules below. One change per file, and only for files with an actual update.

---

## Use Case 2 — Targeted Update

### Step 1 — Locate the target

The user will name a file, chapter heading, or topic. Find it:
- **File name given** → read that file in full.
- **Chapter / heading given** → search for the heading string across all doc files; read the relevant section.
- **Topic given** → search doc files for the topic keywords; identify which file and section owns it.

If the target is ambiguous (e.g. a topic could live in multiple files), confirm with the user before proceeding.

### Step 2 — Verify the located content against the codebase

Apply the same claim-verification approach as Use Case 1 Step 2, but scoped to the identified section only.

### Step 3 — Clarify before writing

Same rule as Use Case 1 Step 4.

### Step 4 — Propose updates

Propose changes only to the affected section(s). Propose one change per file touched.

---

## Writing Rules

**Accuracy over completeness**
- Only state things that are verifiable from the codebase or from explicit user input.
- If something cannot be confirmed, leave it out or flag it with a `> ⚠️ TODO: verify` blockquote.

**Stay in scope**
- Each doc file has a defined scope (see Documentation Map). Do not add content that belongs in another file.
- When a cross-file implication is found — e.g. a change in a shared package affects both the package's document and the component document that consumes it — propose changes to both files.

**Preserve structure**
- Keep the existing arc42 section numbering and headings.
- Add new subsections inside the correct arc42 section, under its existing top-level heading.
- If a section is now empty, add a one-line note explaining why rather than deleting the heading.

**Style**
- Declarative present tense: "The middleware routes requests to…", not "The middleware will route…"
- Naming: avoid specific file paths, class names, and function names — these change frequently and make the documentation brittle. Describe behaviour and responsibility at the module or component level instead. When a name must appear (e.g. a package name, a named concept, or an established module boundary), use it exactly as it appears in the code — do not paraphrase or invent a name.
- Glossary: the primary glossary lives in the system-level document's `§12` (see the documentation map). Each component doc adds component-local terms in its own `§12`. Before introducing a term, check whether it is already defined there and use the established term. When describing something genuinely new that would benefit from a definition, add it to the appropriate glossary section rather than coining an ADR-hoc phrase inline.
- Diagrams: update existing Mermaid diagrams in place when they are wrong. Add a new diagram only if one is clearly missing and a diagram is the right representation; prose is preferred when a diagram would not add clarity. Any diagram you add or edit must follow `.agents/rules/mermaid-diagrams.md` — read that file and apply it directly; it is the single source of truth for the `<style>` block, the palette, and the per-diagram templates, and is shared with the other skills that touch diagrams. If `.agents/project.md` records a project palette, it overrides the default there.
- Technical Debt, Architecture Decisions, Quality Requirements entries: follow the stable ID scheme in `.agents/rules/architecture-doc-ids.md` — read it and apply directly. When adding, removing, or resolving an entry, never renumber or reorder existing IDs and never reuse a retired one.

**What not to change**
- CSS style blocks at the top of each file — leave them untouched.
- External references (links to external platform documentation, issue trackers, or repositories) — do not update URLs; flag outdated ones with a `> ⚠️ TODO: verify link` note instead.
- Deliberate design decisions that are documented as such — do not silently remove them if the code has drifted; surface the drift as a Technical Debt item instead.
