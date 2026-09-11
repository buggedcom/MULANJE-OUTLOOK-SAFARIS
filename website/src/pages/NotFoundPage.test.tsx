import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';
import { renderWithRouter } from '../test/router';

describe('GIVEN the not-found page', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the 404 heading', () => {
      renderWithRouter(<NotFoundPage />);
      expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    });

    it('THEN offers a link back to home', () => {
      renderWithRouter(<NotFoundPage />);
      expect(screen.getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/');
    });
  });
});
