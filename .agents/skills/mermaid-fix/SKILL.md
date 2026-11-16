---
name: mermaid-fix
description:
  Normalize Mermaid diagrams in Markdown docs to this repository's style. Use when a diagram looks inconsistent, washed-out, or shadowed, or a new one needs to match the others.
disable-model-invocation: true
---

# Mermaid Diagram Fix

Give every Mermaid diagram in a Markdown document the same clean, readable, deliberately-colored look, and keep new diagrams consistent with it.

## When to Activate

Use this skill when the user asks to:
- Fix Mermaid diagrams that render with drop shadows, dark/washed-out fills, unreadable text, or a grey background.
- Make diagrams across a document (or across a project) look consistent.
- Add a new diagram that must match the existing diagram style.

## The Style Contract

`.agents/rules/mermaid-diagrams.md` owns the target look: the `<style>` header, the palette,
the per-diagram templates, the checklist, and the gotchas. Read it and apply it directly. A palette
recorded in `.agents/project.md` overrides the default there.

## Workflow

1. **Read `.agents/rules/mermaid-diagrams.md`**, plus the project palette in `.agents/project.md` if one is recorded. Keep the palette identical across the whole file.
2. **Ensure the `<style>` header exists once** at the very top of the Markdown file. Do not duplicate it.
3. **Normalize each diagram:**
   - Convert `flowchart` → `graph`.
   - Add the correct `%%{init}%%` line (neutral for graphs, base for sequence).
   - For graphs: add the `classDef` lines for the roles used and a `class` assignment for every node.
   - For sequence diagrams: add the `themeVariables` block.
   - Remove any conflicting/leftover inline styling.
4. **Verify the result against the checklist** in `.agents/rules/mermaid-diagrams.md`.
