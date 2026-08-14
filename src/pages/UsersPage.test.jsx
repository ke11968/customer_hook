import { act, fireEvent, render, screen } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import UsersPage from './UsersPage';

const users = [
  {
    id: 1,
    firstName: 'Ada',
    lastName: 'Lovelace',
    age: 36,
    email: 'ada@example.com',
    phone: '+1 555 0101',
    image: 'https://example.com/ada.png',
  },
  {
    id: 2,
    firstName: 'Grace',
    lastName: 'Hopper',
    age: 85,
    email: 'grace@example.com',
    phone: '+1 555 0102',
    image: 'https://example.com/grace.png',
  },
];

const renderUsersPage = () =>
  render(
    <UserContext.Provider value={{ users, loading: false, error: '' }}>
      <UsersPage />
    </UserContext.Provider>,
  );

afterEach(() => {
  jest.useRealTimers();
});

test('filters by a case-insensitive full name only after the debounce', () => {
  jest.useFakeTimers();
  renderUsersPage();

  fireEvent.change(
    screen.getByPlaceholderText('Search by first or last name'),
    {
      target: { value: 'ADA LOVE' },
    },
  );

  act(() => {
    jest.advanceTimersByTime(499);
  });

  expect(
    screen.getByRole('heading', { name: 'Ada Lovelace' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Grace Hopper' }),
  ).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(1);
  });

  expect(
    screen.getByRole('heading', { name: 'Ada Lovelace' }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('heading', { name: 'Grace Hopper' }),
  ).not.toBeInTheDocument();
});

test('shows the no-match state after a debounced search', () => {
  jest.useFakeTimers();
  renderUsersPage();

  fireEvent.change(
    screen.getByPlaceholderText('Search by first or last name'),
    {
      target: { value: 'missing person' },
    },
  );

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.getByText('No matching users')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  expect(screen.queryByText('No users found')).not.toBeInTheDocument();
});
