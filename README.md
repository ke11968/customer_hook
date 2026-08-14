# Customer Hook

Customer Hook is a small React application that fetches a user list from
[DummyJSON](https://dummyjson.com/docs/users) and filters it by first or last
name in the browser.

The repository contains only the frontend. It does not include a backend,
authentication, or a database. Successful builds from `main` are deployed as a
static site to GitHub Pages.

## Behavior

- Users are loaded from `https://dummyjson.com/users`.
- Search is case-insensitive and matches the combined first and last name.
- An empty query shows every loaded user.
- Search updates after a 500 ms debounce.
- The page presents separate loading, request-error, empty-response,
  no-match, and results states.
- Each card shows a user's image, full name, age, email, and phone number.

## Requirements

- Node.js 22 (the version used by CI) and npm

The dependency tree is captured in `package-lock.json`. Use `npm ci` rather
than `npm install` for a reproducible checkout.

## Setup

```sh
npm ci
npm start
```

The development server opens the application at
[http://localhost:3000](http://localhost:3000).

## Verification

Run the complete non-interactive local gate:

```sh
npm run verify
```

This runs ESLint, the test suite once, and then creates a production build.
Individual commands are also available:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm run lint` | Check JavaScript and React source files with ESLint |
| `npm test` | Start Jest in interactive watch mode |
| `npm run test:ci` | Run Jest once and exit |
| `npm run build` | Create the production build in `build/` |
| `npm run verify` | Run lint, non-interactive tests, and production build |

## Continuous integration and deployment

GitHub Actions runs the quality gate for every pull request targeting `main`
and every push to `main`. The gate installs from `package-lock.json`, runs lint
and tests, and creates the production build. Pull requests never deploy.

After the quality gate passes on a push to `main`, the same workflow uploads
`build/` and deploys it to the `github-pages` environment. The `homepage` value
in `package.json` keeps generated asset paths relative so the build works at a
repository Pages URL and remains portable across forks.

Before the first deployment, a repository administrator must open **Settings →
Pages** and select **GitHub Actions** as the build source. To prevent broken
changes from being merged, add a ruleset for `main` under **Settings → Rules**
and require the **Quality gate** status check.

For this repository, the expected project-site URL is:
`https://anastasiakrivova-stack.github.io/customer_hook/`.

## Architecture

```text
App
└── UserProvider
    └── UsersPage
        └── UserCard
```

- `src/context/UserContext.jsx` connects the data source to the UI.
- `src/hooks/useFetch.js` owns request, loading, and error state.
- `src/hooks/useDebounce.js` delays application of the search query.
- `src/pages/UsersPage.jsx` owns filtering and page states.
- `src/components/UserCard/UserCard.jsx` renders one user.

## Current limitations

- The users API URL and debounce duration are currently code constants.
- The application has no retry control when the users request fails.
- Browser-level tests cover the current user-visible list, search, and state
  behavior; end-to-end coverage is intentionally deferred.
- Create React App remains the build tool and should be migrated separately,
  behind passing behavior tests.

## Agent and contribution guidance

Repository-specific setup, behavior contracts, review rules, and the definition
of done are in [`AGENTS.md`](./AGENTS.md).
