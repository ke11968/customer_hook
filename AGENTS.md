# Repository guide

## Product

Customer Hook is a small React application that loads users from DummyJSON and
lets a visitor filter them by first or last name. The repository contains only
the browser application; there is no backend, authentication, database, or
deployment target in scope.

## Source map

- `feature_list.json` is the source of truth for feature state and checkpoints.
- `.agents/skills/grill_me.md` defines the feature-discovery interview.
- `src/App.js` composes the provider and users page.
- `src/context/UserContext.jsx` owns the users data source.
- `src/hooks/useFetch.js` manages request, loading, and error state.
- `src/hooks/useDebounce.js` delays search updates.
- `src/pages/UsersPage.jsx` implements filtering and UI states.
- `src/components/UserCard/UserCard.jsx` renders a user.

## Setup and verification

Install exactly from the lockfile:

```sh
npm ci
```

Use the non-interactive verification command before handing off a change:

```sh
npm run verify
```

For local development, run `npm start`. Do not run `npm run eject`.

## Product contract

- The app loads users from `https://dummyjson.com/users`.
- An empty search displays all loaded users.
- Search is case-insensitive and matches the combined first and last name.
- Search input is debounced by 500 milliseconds.
- Loading, request error, empty response, no-match, and result states must remain
  distinguishable.
- A user card displays the image, full name, age, email, and phone number.

## Feature workflow

Track every planned change in `feature_list.json`. Use the following lifecycle:

| Status | Meaning |
| --- | --- |
| `proposed` | The idea exists but has not been clarified. |
| `questioning` | The `grill-me` interview is resolving requirements. |
| `ready` | Scope and acceptance criteria have explicit human approval. |
| `in_progress` | Approved implementation work has started. |
| `blocked` | Progress requires a named decision or external dependency. |
| `in_review` | Implementation or harness changes await human review. |
| `done` | Acceptance criteria and verification pass with human approval. |
| `deferred` | Work is intentionally postponed with a recorded reason. |

For a new feature:

1. Add a `proposed` entry with a stable kebab-case `id`, title, short summary,
   priority, and initial scope.
2. Run the workflow in `.agents/skills/grill_me.md`; move the feature to
   `questioning` while requirements remain open.
3. Record confirmed scope, non-goals, acceptance criteria, risks, dependencies,
   and independently verifiable checkpoints in the feature entry.
4. Move to `ready` only after the human explicitly approves the resulting
   feature brief. Do not implement a `proposed` or `questioning` feature.
5. During implementation, update checkpoint status and attach concrete evidence
   such as changed paths, commands, test names, or review notes.
6. After verification, move to `in_review` and present the diff, command results,
   deferred work, and updated feature entry to the human.
7. Move to `done` only after human approval. Never use `done` when verification
   or review is pending.

Update the top-level `updated_at` date whenever `feature_list.json` changes.
Use ISO `YYYY-MM-DD` dates, use empty arrays instead of omitted list fields, and
write unknown decisions in `open_questions` rather than inventing an answer.

## Change rules

- After changing files, stop and present the diff and verification results for
  human review. Do not create a commit, push a branch, or open a pull request
  until a human explicitly approves the changes.
- Keep browser tests deterministic: mock `fetch` or provide a controlled
  `UserContext`; tests must not call DummyJSON.
- Add or update behavior-focused tests whenever the product contract changes.
- Update `README.md` and this file when commands, configuration, architecture,
  or supported behavior changes.
- Do not add a backend, deployment workflow, or production dependency without
  an explicit requirement.
- Keep `package-lock.json` synchronized with intentional `package.json`
  changes; do not regenerate it for unrelated edits.

## Definition of done

- `npm run verify` passes.
- The relevant feature and checkpoints in `feature_list.json` reflect the actual
  state and include verification evidence.
- User-visible behavior changes have focused assertions.
- Documentation describes any changed commands, configuration, or behavior.
- The handoff names changed files, checks run, and any intentionally deferred
  follow-up work.

## Code Review Rules

- Flag tests that make live network requests.
- Flag changes that remove loading, error, empty, or no-match handling without
  an explicit product decision.
- Flag configuration reads that are not documented or do not have a safe
  default or clear validation error.
