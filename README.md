# Customer Hook

Customer Hook is a small React application that fetches a user list from
[DummyJSON](https://dummyjson.com/docs/users) and filters it by first or last
name in the browser.

The repository contains only the frontend. It does not include a backend,
authentication, a database, or deployment configuration.

## Behavior

- Users are loaded from `https://dummyjson.com/users`.
- Search is case-insensitive and matches the combined first and last name.
- An empty query shows every loaded user.
- Search updates after a 500 ms debounce.
- The page presents separate loading, request-error, empty-response,
  no-match, and results states.
- Each card shows a user's image, full name, age, email, and phone number.

## Requirements

- Node.js and npm

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

This runs the test suite once and then creates a production build. Individual
commands are also available:

| Command | Purpose |
| --- | --- |
| `npm start` | Start the development server |
| `npm test` | Start Jest in interactive watch mode |
| `npm run test:ci` | Run Jest once and exit |
| `npm run build` | Create the production build in `build/` |
| `npm run verify` | Run the non-interactive tests and production build |

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
- Test coverage is currently limited and is being expanded around user-visible
  behavior.
- Create React App remains the build tool and should be migrated separately,
  behind passing behavior tests.

## Agent and contribution guidance

Repository-specific setup, behavior contracts, review rules, and the definition
of done are in [`AGENTS.md`](./AGENTS.md).
