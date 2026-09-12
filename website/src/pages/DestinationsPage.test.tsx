import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { DestinationsPage } from './DestinationsPage';
import { destinations } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Destinations route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<DestinationsPage />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Five extraordinary destinations, close enough to combine' }),
      ).toBeInTheDocument();
    });

    it('THEN renders a section heading for every destination', () => {
      renderWithRouter(<DestinationsPage />);
      for (const d of destinations) {
        expect(screen.getByRole('heading', { name: d.name })).toBeInTheDocument();
      }
    });

    it('THEN offers a Plan-a-visit link per destination pointing to /tours', () => {
      renderWithRouter(<DestinationsPage />);
      const planLinks = screen.getAllByRole('link', { name: 'Plan a visit' });
      expect(planLinks).toHaveLength(destinations.length);
      expect(planLinks[0]).toHaveAttribute('href', '/tours');
    });

    it('THEN links the sample-tour CTA to the 6-day tour', () => {
      renderWithRouter(<DestinationsPage />);
      expect(screen.getByRole('link', { name: 'See a sample tour' })).toHaveAttribute('href', '/tours/6-day-southern');
    });

    it('THEN resolves every image to a .jpg URL', () => {
      const { container } = renderWithRouter(<DestinationsPage />);
      for (const im of container.querySelectorAll('img')) {
        expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
      }
    });
  });
});
