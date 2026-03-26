import { render, screen } from '@testing-library/react';
import App from './App';

test('renders users title', () => {
  render(<App />);
  const titleElement = screen.getByText(/users list/i);
  expect(titleElement).toBeInTheDocument();
});
