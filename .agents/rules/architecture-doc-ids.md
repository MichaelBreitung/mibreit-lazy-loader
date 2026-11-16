# Architecture Doc Stable IDs

The contract for giving individual items in the **Architecture Decisions** (§9), **Quality
Requirements** (§10), and **Risks and Technical Debt** (§11) arc42 sections a stable identifier, so
tickets and cross-doc references keep working as content is added, resolved, or reordered.

Read this file whenever creating or editing an arc42 doc. Both `architecture-create`
and `architecture-update` apply it **directly** — do not restate it in either skill.

## Prefixes

| Arc42 section                | Prefix | Example         |
| ----------------------------- | ------ | --------------- |
| §9 Architecture Decisions    | `ADR-` | `ADR-1`, `ADR-2`|
| §10 Quality Requirements     | `Q-`   | `Q-1`, `Q-2`    |
| §11 Risks and Technical Debt | `TD-`  | `TD-1`, `TD-2`  |

## Scope: per document, not global

Numbering restarts at 1 in each doc file. A reference that crosses files always pairs the ID with the file link,
e.g. `[TD-1](component-architecture.md#td-1)`, so the pairing stays unambiguous even though the ID alone
is not globally unique.

## Format

### List items (Architecture Decisions; Risks and Technical Debt)

Give each item its own level-4 heading containing **only the ID** — no title text in the heading.
The title and description follow as normal bold-led body text. Standard Markdown headings get an
automatic anchor from every renderer (GitHub, VS Code preview, mkdocs, …), so this needs no HTML:

```markdown
#### ADR-1

**Short title of Architecture Decision.** Description of architecture decision.
```

```markdown
#### TD-1

Description of technical debt.
```

Keeping the heading text to just the ID means the anchor (`#adr-1`, `#td-1`) never changes even if
the title or description is later edited — only renumbering (which is forbidden, see below) would
break it.

### Quality Requirements (table)

Keep the existing table shape and add an `ID` column as the first column:

```markdown
| ID | Quality goal | Manifests as |
|---|---|---|
| Q-1 | Performance | ... |
```

Quality Requirements are referenced by ID in text (`Q-1`); they don't need a deep link since the
table is short enough to scan directly.

## Stability Rules

- **Never renumber or reorder existing items.** A new item gets the next unused number in that
  document, regardless of where it fits topically.
- **Never reuse a retired number.** When a Technical Debt item is fully resolved, mark it resolved
  in place — e.g. strike the description and add "(resolved by TICKET-123)" — rather than deleting
  the entry. This keeps inbound links (tickets, other docs) resolving to useful context instead of
  a dead anchor.
- Cross-references to a specific item always use the ID (`see TD-2`), never a positional
  description ("the third item") or a bare section reference when a specific item is meant.
