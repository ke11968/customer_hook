---
name: grill-me
description: Interrogate an ambiguous feature request and turn it into a human-approved, testable entry in feature_list.json. Use before implementing a new feature, when scope or acceptance criteria are unclear, or when the user asks to be grilled about requirements.
---

# Grill a feature

## Inputs

Read `AGENTS.md`, `feature_list.json`, the requested feature, and the smallest
relevant code surface. Select an existing feature by `id` or create a
`proposed` entry before beginning the interview.

## Interview

Set the feature status to `questioning`. Ask one focused question at a time and
challenge vague answers with a concrete example or boundary case. Do not begin
implementation during the interview.

Resolve these areas, skipping only those that are demonstrably irrelevant:

1. Problem and user outcome: who needs this, what fails today, and what observable
   result should change?
2. Scope and non-goals: what is included, explicitly excluded, and safe to defer?
3. Behavior: happy path, empty state, edge cases, invalid input, errors, recovery,
   and retry expectations.
4. Data and integration: inputs, outputs, ownership, API contracts, persistence,
   configuration, and compatibility constraints.
5. Experience: UI states, accessibility, responsiveness, performance, and wording
   that form part of the contract.
6. Risk: security, privacy, destructive actions, dependency changes, migration,
   rollout, and rollback.
7. Verification: acceptance criteria, test level, commands, observable evidence,
   and what must be checked manually.

Record material answers in `feature_list.json` as confirmed scope, non-goals,
acceptance criteria, risks, dependencies, checkpoints, or `open_questions`.
Keep facts separate from assumptions. Never silently choose a product behavior
when multiple reasonable choices have different user impact.

## Ready gate

Finish with a concise feature brief containing:

- feature id, title, status, priority, and summary;
- user outcome and confirmed decisions;
- in-scope and out-of-scope work;
- numbered acceptance criteria;
- ordered checkpoints with independent evidence;
- risks, dependencies, and remaining open questions;
- verification commands and required manual checks.

Keep the status `questioning` while a blocking question remains. Ask the human
to approve or amend the brief. Move the feature to `ready` only after explicit
approval; then stop and wait for a separate instruction to implement it.

After later implementation, move the feature to `in_review`, attach diff and
verification evidence, and require explicit human approval before any commit,
push, or pull request. Mark it `done` only after that approval.
