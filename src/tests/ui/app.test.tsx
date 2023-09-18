import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../ui/app/app';

/**
 * Test that react flow appears
 */
test('reactFlow', () => {
  render(<App />);
  const linkElement = screen.getByTestId(/rf__wrapper/);
  expect(linkElement).toBeInTheDocument();
});

test('background', () => {
  const { container } = render(<App />);
  expect(container.getElementsByClassName('background').length).toBe(2);
});
