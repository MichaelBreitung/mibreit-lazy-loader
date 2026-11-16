# Ticket System Profile — Local Markdown

Backend rules for every skill that reads, drafts, or files a ticket. Those skills hold
the system-agnostic workflow; everything specific to keeping tickets as files in this
repository lives here.

A replacement backend — Jira, GitHub issues, or another tracker — is a sibling file
answering the same five sections. Nothing outside these files may assume a particular
ticket system.

## 1. Identity

- A ticket id is a short slug: lowercase, hyphenated, no spaces (e.g. `fix-auth-timeout`).
  The developer supplies it when a ticket is drafted — `ticket-draft` never invents one.
- The slug is the filename stem (`<slug>.md`) and the stable handle for branch names and
  commit messages. No project prefix, no numeric suffix.

## 2. Fetch

Tickets live under `tickets/` at the repository root, in exactly one of three subfolders
that also double as the ticket's status:

```
tickets/
├── ready/         drafted, not yet started
├── in-progress/   currently being solved
└── done/          solved and reconciled
```

To fetch a ticket by slug, search all three subfolders for `<slug>.md` (e.g.
`find tickets -name '<slug>.md'`) and read the file directly — there is no external
system to query. Exactly one copy of a given slug should exist at a time; if more than
one turns up, tell the developer instead of guessing which is current.

## 3. Create

`ticket-draft` writes the ticket directly as a new file at `tickets/ready/<slug>.md` —
there is no separate submission step. If `tickets/ready/`, `tickets/in-progress/`, or
`tickets/done/` do not exist yet, create all three the first time a ticket is filed.

The developer supplies the slug; ask for it if it wasn't given, and confirm it doesn't
collide with an existing file in any of the three subfolders before writing.

## 4. Markup

Tickets are plain Markdown, rendered by whatever already renders Markdown in this
repository (GitHub, an editor preview, etc.) — no dialect quirks to work around.

- Title: `# <Title>` as the file's first line
- Priority: a `**Priority:** <n>` line directly under the title
- Headings: `##` for each description section
- Bold `**text**`, inline code `` `text` ``, fenced code blocks with triple backticks
- Bullets `-`, numbered `1.`
- Tables: standard `| Header | Header |` / `|---|---|` GFM syntax
- Acceptance criteria: checkbox items `- [ ] ...`

## 5. Limits

- The ticket file is committed to the repository, so it is as visible as any other
  tracked file — never put a secret or credential in one.
- No attachments or images; reference a file by its repository path instead.

## Lifecycle

The subfolder a ticket file sits in **is** its status; moving the file is how a status
change is recorded — there is no separate status field to edit.

- **ticket-draft** creates the file in `tickets/ready/`.
- **ticket-solve**, Step 3a (opening the working memory) moves the file from wherever it
  is found to `tickets/in-progress/` — the same change that writes `current-feature.md`
  for the ticket also relocates it.
- **ticket-solve**, Reconcile (resetting `current-feature.md` to its skeleton) moves the
  file from `tickets/in-progress/` to `tickets/done/` — the same change that clears the
  working memory also relocates it.

Use `git mv` so the file's history is preserved across the move.
