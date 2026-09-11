import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App (smoke)', () => {
  it('renders the site name', () => {
    render(<App />);
    expect(
      screen.getByRole('heading', { name: /mulanje outlook/i }),
    ).toBeInTheDocument();
  });
});
