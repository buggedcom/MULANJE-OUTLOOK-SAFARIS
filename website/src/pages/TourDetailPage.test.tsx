import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { TourDetailPage } from './TourDetailPage';
import { tours, tourSlugs } from '../data/tours';

function renderDetail(slug: string) {
  return render(
    <MemoryRouter initialEntries={[`/tours/${slug}`]}>
      <Routes>
        <Route path="tours/:slug" element={<TourDetailPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe.each(tourSlugs)('GIVEN the tour detail route for "%s"', (slug) => {
  const tour = tours[slug];
  describe('WHEN the page renders', () => {
    it('THEN shows the tour title and subtitle', () => {
      renderDetail(slug);
      expect(screen.getByRole('heading', { level: 1, name: tour.title })).toBeInTheDocument();
      expect(screen.getByText(tour.subtitle)).toBeInTheDocument();
    });

    it('THEN shows the itinerary, inclusions, gallery and related sections', () => {
      renderDetail(slug);
      expect(screen.getByRole('heading', { name: 'Your itinerary, day by day' })).toBeInTheDocument();
      expect(screen.getByText('What’s included')).toBeInTheDocument();
      expect(screen.getByText('Moments from this journey')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Other journeys you might like' })).toBeInTheDocument();
    });

    it('THEN links back to the tours listing', () => {
      renderDetail(slug);
      expect(screen.getByRole('link', { name: /All tours/ })).toHaveAttribute('href', '/tours');
    });
  });
});

describe('GIVEN the tour detail route for a valid slug', () => {
  describe('WHEN the "Enquire about this tour" button is clicked', () => {
    it('THEN scrolls the local #enquire into view without changing route', async () => {
      const spy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
      const user = userEvent.setup();
      renderDetail('liwonde-safari');
      await user.click(screen.getByRole('button', { name: 'Enquire about this tour' }));
      expect(spy).toHaveBeenCalled();
      expect(screen.getByRole('heading', { level: 1, name: 'Liwonde Wildlife Safari' })).toBeInTheDocument();
      spy.mockRestore();
    });
  });

  describe('WHEN the enquire form is inspected', () => {
    it('THEN includes the tour-specific fitness-level select', () => {
      const { container } = renderDetail('tea-culture');
      const enquire = container.querySelector('#enquire') as HTMLElement;
      expect(within(enquire).getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
      expect(within(enquire).getByLabelText('Fitness level')).toBeInTheDocument();
    });
  });
});

describe('GIVEN an unknown tour slug', () => {
  describe('WHEN the tour detail route renders', () => {
    it('THEN shows the not-found page', () => {
      renderDetail('bogus-tour');
      expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    });
  });
});
