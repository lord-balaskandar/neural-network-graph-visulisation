import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../../ui/app/app';

/**
 * Test that react flow appears
 */
test('reactFlow', () => {
  render(<App />);
  expect(screen.getByTestId('rf__wrapper')).toHaveClass('react-flow');
});
