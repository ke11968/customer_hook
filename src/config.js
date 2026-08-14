export const DEFAULT_USERS_API_URL = 'https://dummyjson.com/users';

export const resolveUsersApiUrl = (configuredUrl) =>
  configuredUrl?.trim() || DEFAULT_USERS_API_URL;

export const USERS_API_URL = resolveUsersApiUrl(
  process.env.REACT_APP_USERS_API_URL,
);

export const SEARCH_DEBOUNCE_MS = 500;
