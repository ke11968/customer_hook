import {
  DEFAULT_USERS_API_URL,
  resolveUsersApiUrl,
  SEARCH_DEBOUNCE_MS,
} from './config';

test('uses the DummyJSON endpoint when API configuration is missing or blank', () => {
  expect(resolveUsersApiUrl()).toBe(DEFAULT_USERS_API_URL);
  expect(resolveUsersApiUrl('   ')).toBe(DEFAULT_USERS_API_URL);
});

test('normalizes an explicitly configured API URL', () => {
  expect(resolveUsersApiUrl(' https://example.com/users ')).toBe(
    'https://example.com/users',
  );
  expect(SEARCH_DEBOUNCE_MS).toBe(500);
});
