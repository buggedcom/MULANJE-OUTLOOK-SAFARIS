import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ToursPage } from './ToursPage';
import { tours, tourSlugs } from '../data/tours';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Tours listing route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<ToursPage />);
      expect(screen.getByRole('heading', { level: 1, name: 'Find your Malawi adventure' })).toBeInTheDocument();
    });

    it('THEN shows a card per tour linking to its detail route', () => {
      renderWithRouter(<ToursPage />);
      for (const slug of tourSlugs) {
        expect(screen.getByRole('link', { name: new RegExp(tours[slug].title) })).toHaveAttribute(
          'href',
          `/tours/${slug}`,
        );
      }
    });

    it('THEN flags exactly two tours as Most popular', () => {
      renderWithRouter(<ToursPage />);
      expect(screen.getAllByText('Most popular')).toHaveLength(2);
    });
  });
});
