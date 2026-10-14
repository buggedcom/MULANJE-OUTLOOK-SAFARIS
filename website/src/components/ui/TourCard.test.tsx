import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { TourCard } from './TourCard';
import { renderWithRouter } from '../../test/router';

describe('GIVEN a lifted tour card with a tag kicker, body, cta and badge', () => {
  describe('WHEN it renders', () => {
    it('THEN links to its route with the hover-lift class', () => {
      renderWithRouter(
        <TourCard
          to="/tours/3-day-mulanje"
          image="photos/summit-sign.jpg"
          title="3-Day Mount Mulanje Trek"
          kicker="Hiking"
          kickerVariant="tag"
          body="A rewarding climb."
          cta="View itinerary →"
          aspect="4/3"
          badge="Most popular"
          lift
        />,
      );
      const link = screen.getByRole('link', { name: /3-Day Mount Mulanje Trek/ });
      expect(link).toHaveAttribute('href', '/tours/3-day-mulanje');
      expect(link).toHaveClass('mo-zoom', 'mo-xcard');
      expect(screen.getByText('Hiking')).toHaveClass('tag', 'tag-accent-2');
      expect(screen.getByText('A rewarding climb.')).toBeInTheDocument();
      expect(screen.getByText('View itinerary →')).toBeInTheDocument();
      expect(screen.getByText('Most popular')).toBeInTheDocument();
    });
  });
});

describe('GIVEN an unlifted tour card with an uppercase kicker and no body/cta/badge', () => {
  describe('WHEN it renders', () => {
    it('THEN omits the hover-lift, body, cta and badge', () => {
      renderWithRouter(
        <TourCard to="/tours/liwonde-safari" image="photos/new-elephant.jpg" title="Liwonde Wildlife Safari" kicker="Safari · 2–3 days" />,
      );
      const link = screen.getByRole('link', { name: /Liwonde Wildlife Safari/ });
      expect(link).toHaveClass('mo-zoom');
      expect(link).not.toHaveClass('mo-xcard');
      expect(screen.getByText('Safari · 2–3 days')).not.toHaveClass('tag');
      expect(screen.queryByText('Most popular')).not.toBeInTheDocument();
    });
  });
});
