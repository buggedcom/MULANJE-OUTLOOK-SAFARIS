import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { HomePage } from './HomePage';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Home route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<HomePage />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Explore Mount Mulanje. Discover Southern Malawi.' }),
      ).toBeInTheDocument();
    });

    it('THEN shows every section heading in order', () => {
      renderWithRouter(<HomePage />);
      for (const h of [
        'A deeper way to experience Malawi',
        'Built on local knowledge and genuine hospitality',
        'Five ways to discover the south',
        'Journeys our guests love most',
        'Responsible tourism that gives back',
        'Tell us the trip you’re dreaming of',
      ]) {
        expect(screen.getByRole('heading', { name: h })).toBeInTheDocument();
      }
    });

    it('THEN shows the hero stats', () => {
      renderWithRouter(<HomePage />);
      expect(screen.getByText('3,002m')).toBeInTheDocument();
      expect(screen.getByText('Summit of Sapitwa')).toBeInTheDocument();
    });

    it('THEN wires the Browse-tours CTA and the tour cards', () => {
      renderWithRouter(<HomePage />);
      expect(screen.getByRole('link', { name: 'Browse tours' })).toHaveAttribute('href', '/tours');
      expect(screen.getByRole('link', { name: /3-Day Mount Mulanje Trek/ })).toHaveAttribute(
        'href',
        '/tours/3-day-mulanje',
      );
    });
  });

  describe('WHEN the #enquire section is inspected', () => {
    it('THEN contains the enquiry form', () => {
      const { container } = renderWithRouter(<HomePage />);
      const enquire = container.querySelector('#enquire');
      expect(enquire).not.toBeNull();
      expect(within(enquire as HTMLElement).getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
    });
  });
});
