# Project Profile

The onboarding result for **this** repository — the one repo-specific file in the agent instruction
set. Everything else under `.agents/` is generic and is replaced when the instruction set is
re-installed; this file is preserved.

Owned by the `onboarding` skill. Read it before the first task of a session.

`mibreit-lazy-loader` is a TypeScript npm library for lazy loading images and iframes with a
windowing mechanism. It is published as ESM, CJS and IIFE bundles and used by web developers.

## Documentation Map

The architecture documentation is the single source of truth. Each file has one scope; content is
never duplicated across files.

No architecture documentation exists yet. Run `architecture-create` first — it creates the files
under `doc/` and records the `| File | Scope |` map here.

## Conventions

| Setting | Value |
|---|---|
| Documentation root | doc/ |
| Trunk branch | main |
| Scratch directory | temp/ |

The scratch directory holds throwaway output (drafts, generated reports, scratch notes) and must be
git-ignored. Never write throwaway files anywhere else in the repository.

## Ticket System

| Setting | Value |
|---|---|
| System | local |
| Profile | ticket-systems/local.md |

The profile is the file under `.agents/ticket-systems/` that defines the id format and how
tickets are fetched and created. Exactly one profile is active. Skills read only its five sections,
so swapping the backend means changing the line above — no skill is touched.

## Commands

| Purpose | Command | Notes |
|---|---|---|
| Run | `npm run dev` | Vite dev server |
| Test | `npm test` | `vitest run`, excludes `*.perf.test.*` |
| Perf test | `npm run test:perf` | Slow (puppeteer); not for unattended runs |
| Build | `npm run build` | Regenerates `lib/`, `lib-cjs/`, `lib-iife/`, `lib-types/` (cleans first) |

There is no lint script.

## Diagram Style

The shared Mermaid style contract is `.agents/rules/mermaid-diagrams.md`, including the
default palette.
