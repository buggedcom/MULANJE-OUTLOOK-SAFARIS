import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ActivitiesPage } from './ActivitiesPage';
import { activities } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Activities route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<ActivitiesPage />);
      expect(screen.getByRole('heading', { level: 1, name: 'Add a thrill to your journey' })).toBeInTheDocument();
    });

    it('THEN renders a heading and first chip for every activity', () => {
      renderWithRouter(<ActivitiesPage />);
      for (const a of activities) {
        expect(screen.getByRole('heading', { name: a.name })).toBeInTheDocument();
        expect(screen.getByText(a.chips[0])).toBeInTheDocument();
      }
    });

    it('THEN shows the bundle-into-a-tour call-to-action', () => {
      renderWithRouter(<ActivitiesPage />);
      expect(screen.getByRole('heading', { name: 'Bundle activities into your tour' })).toBeInTheDocument();
    });

    it('THEN resolves every image to a .jpg URL', () => {
      const { container } = renderWithRouter(<ActivitiesPage />);
      for (const im of container.querySelectorAll('img')) {
        expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
      }
    });
  });
});
