import { render, screen } from '@testing-library/react';
import App from './App';

const USERS_API_URL = 'https://dummyjson.com/users';

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

const originalFetch = global.fetch;

const mockSuccessfulFetch = (responseUsers) => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({ users: responseUsers }),
  });
};

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  if (originalFetch) {
    global.fetch = originalFetch;
  } else {
    delete global.fetch;
  }
});

test('loads all users and renders the complete user-card contract', async () => {
  mockSuccessfulFetch(users);

  render(<App />);

  expect(screen.getByRole('heading', { name: 'Users List' })).toBeInTheDocument();
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  expect(await screen.findByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Grace Hopper' })).toBeInTheDocument();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Ada' })).toHaveAttribute(
    'src',
    'https://example.com/ada.png'
  );
  expect(screen.getByText('Age: 36')).toBeInTheDocument();
  expect(screen.getByText('Email: ada@example.com')).toBeInTheDocument();
  expect(screen.getByText('Phone: +1 555 0101')).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(USERS_API_URL);
});

test('shows the request error state for an unsuccessful response', async () => {
  global.fetch.mockResolvedValue({
    ok: false,
    json: jest.fn(),
  });

  render(<App />);

  expect(await screen.findByText('Error: Request failed')).toBeInTheDocument();
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
});

test('shows the empty state when the API returns no users', async () => {
  mockSuccessfulFetch([]);

  render(<App />);

  expect(await screen.findByText('No users found')).toBeInTheDocument();
  expect(screen.queryByText('No matching users')).not.toBeInTheDocument();
});
