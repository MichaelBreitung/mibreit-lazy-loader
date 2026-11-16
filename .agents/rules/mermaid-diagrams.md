# Mermaid Diagram Rules

The style contract for every Mermaid diagram in this project: one `<style>` header per file, a
semantic color palette, and per-diagram templates. Apply these rules **directly** — do not delegate
to another skill.

Read this file whenever you add, edit, or normalize a diagram. Every skill that touches a diagram
reads it, so all diagrams in the project come out identical.

If `.agents/project.md` records a project palette, that palette **overrides** the default
below. This file is part of the generic instruction set and is replaced on every re-install, so
record project-specific deviations in `project.md` instead.

## Why Two Mechanisms Are Needed

Renderers inject default themes that add drop shadows, dark fills, and washed-out colors. Fixing
this requires **two independent layers** — one alone is not enough:

- A top-of-file `<style>` block strips drop shadows and forces a white background, **but `<style>` alone does not color nodes.**
- Per-diagram coloring is done with `classDef` + `class` (graphs) or `themeVariables` (sequence diagrams). Without an inline `%%{init}%%` theme, colors render washed-out.

So: **`<style>` block (once per file) + inline `%%{init}%%` + `classDef`/`themeVariables` (per diagram).**

## The Palette

Nodes are colored by *role*, never left to renderer defaults. Keep the role names stable so `class`
assignments read semantically.

| Role | Fill | Stroke | Text | Use for |
|---|---|---|---|---|
| core | `#e3f2fd` | `#1565c0` | `#0d47a1` | the system/component being documented |
| consumer | `#e0f2f1` | `#00695c` | `#004d40` | clients / callers |
| service | `#fff8e1` | `#f9a825` | `#f57f17` | external services / backends |
| store | `#f3e5f5` | `#6a1b9a` | `#4a148c` | registries / storage / persistence |
| support | `#f5f5f5` | `#616161` | `#212121` | secondary / infrastructure nodes |

Edge/line color: `#aa9d9d` (graphs), `#546e7a` (sequence signals).

## Templates

### File header (add once, at the very top of the Markdown file)

```
<style>
/* Remove Mermaid drop shadows globally */
.node .drop-shadow, .edgePath .drop-shadow { filter: none !important; }
.node foreignObject div { filter: none !important; }
svg .node rect, svg .node polygon { filter: none !important; fill: #ffffff !important; stroke: #cccccc !important; }

/* Remove subgraph (cluster) drop shadows and force light background */
.cluster .drop-shadow { filter: none !important; }
.cluster rect { filter: none !important; fill: #f5f5f5 !important; stroke: #cccccc !important; }

/* White background for all Mermaid diagrams */
.mermaid, .mermaid svg, pre.mermaid { background-color: #ffffff !important; }
svg[id^="mermaid"] { background-color: #ffffff !important; }

/* stateDiagram-v2: light state boxes with readable text */
.stateGroup rect, .statediagram-state rect { fill: #e3f2fd !important; stroke: #1565c0 !important; }
.stateGroup .state-title, .statediagram-state .state-title { fill: #0d47a1 !important; }
.stateLabel .label { color: #0d47a1 !important; fill: #0d47a1 !important; }
</style>
```

### Graph diagram (nodes/boxes/flows)

Use `graph` (NOT `flowchart`). Add the init line, then define `classDef` per role and assign nodes
with `class`.

    ```mermaid
    %%{init: {'theme': 'neutral', 'themeVariables': {'primaryColor': '#e3f2fd', 'lineColor': '#aa9d9d'}}}%%
    graph LR
        a["Core box"]
        b["Client"]
        c["External service"]

        b --> a
        a --> c

        classDef core     fill:#e3f2fd,stroke:#1565c0,stroke-width:1px,color:#0d47a1
        classDef consumer fill:#e0f2f1,stroke:#00695c,stroke-width:1px,color:#004d40
        classDef service  fill:#fff8e1,stroke:#f9a825,stroke-width:1px,color:#f57f17
        classDef store    fill:#f3e5f5,stroke:#6a1b9a,stroke-width:1px,color:#4a148c
        classDef support  fill:#f5f5f5,stroke:#616161,color:#212121

        class a core
        class b consumer
        class c service
    ```

Only include the `classDef` lines for roles the diagram actually uses.

### Sequence diagram

Coloring comes from `themeVariables` (there is no `classDef` for sequence diagrams). Use
`theme: 'base'`.

    ```mermaid
    %%{init: {'theme': 'base', 'themeVariables': {'actorBkg': '#e3f2fd', 'actorBorder': '#1565c0', 'actorTextColor': '#0d47a1', 'activationBkgColor': '#e0f2f1', 'activationBorderColor': '#00695c', 'signalColor': '#546e7a', 'signalTextColor': '#212121', 'noteBkgColor': '#fff8e1', 'noteBorderColor': '#f9a825', 'noteTextColor': '#212121', 'sequenceNumberColor': '#ffffff', 'lineColor': '#546e7a', 'textColor': '#212121', 'fontSize': '14px'}}}%%
    sequenceDiagram
        participant Client
        participant Core
        Client->>Core: request
        Core-->>Client: response
    ```

## Checklist

- The `<style>` block is present **exactly once**, at the very top of the file.
- No `flowchart` remains — every graph uses `graph`.
- Every graph node has a `class` assignment.
- Every diagram carries the correct `%%{init}%%` line (neutral for graphs, base for sequence).
- The same palette is used across every diagram in the file.

## Gotchas

- **Some render/preview pipelines auto-inject their own `%%{init}%%`** (e.g. a `neutral` theme) into diagrams and can even duplicate whole sections. After editing, re-check that no unwanted init line was injected and that no diagram/section was duplicated.
- **`<style>` alone will not color nodes** — always pair it with `classDef`/`themeVariables`.
- **`primaryColor` in the graph init** should match the `core` fill so unclassed nodes still look intentional.
- **Only style what the diagram uses** — don't paste every `classDef` into a diagram that has one role.
