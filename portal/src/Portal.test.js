import { render, screen } from '@testing-library/react';
import Portal from './Portal';

test('renders learn react link', () => {
  render(<Portal />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});