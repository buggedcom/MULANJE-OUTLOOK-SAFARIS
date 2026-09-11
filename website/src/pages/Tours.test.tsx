import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ToursPage } from './ToursPage';
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

describe('ToursPage', () => {
  it('shows six cards linking to detail routes, two flagged Most popular', () => {
    render(
      <MemoryRouter>
        <ToursPage />
      </MemoryRouter>,
    );
    for (const slug of tourSlugs) {
      expect(screen.getByRole('link', { name: new RegExp(tours[slug].title) })).toHaveAttribute(
        'href',
        `/tours/${slug}`,
      );
    }
    expect(screen.getAllByText('Most popular')).toHaveLength(2);
  });
});

describe('TourDetailPage', () => {
  it.each(tourSlugs)('renders full content for %s', (slug) => {
    renderDetail(slug);
    const tour = tours[slug];
    expect(screen.getByRole('heading', { level: 1, name: tour.title })).toBeInTheDocument();
    expect(screen.getByText(tour.subtitle)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Your itinerary, day by day' })).toBeInTheDocument();
    expect(screen.getByText('What’s included')).toBeInTheDocument();
    expect(screen.getByText('Moments from this journey')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Other journeys you might like' })).toBeInTheDocument();
    // Back link to the listing.
    expect(screen.getByRole('link', { name: /All tours/ })).toHaveAttribute('href', '/tours');
  });

  it('opens one itinerary day at a time', async () => {
    const user = userEvent.setup();
    renderDetail('3-day-mulanje');
    const day3Body = /A pre-dawn start for the summit of Sapitwa for sunrise/;
    const day1Body = /Pick-up in Blantyre and transfer to Mulanje\. After checking in/;
    // Default open day is day 3.
    expect(screen.getByText(day3Body)).toBeInTheDocument();
    expect(screen.queryByText(day1Body)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Day 1' }));
    expect(screen.getByText(day1Body)).toBeInTheDocument();
    expect(screen.queryByText(day3Body)).not.toBeInTheDocument();
  });

  it('scrolls to the local #enquire without navigating', async () => {
    const spy = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
    const user = userEvent.setup();
    renderDetail('liwonde-safari');
    await user.click(screen.getByRole('button', { name: 'Enquire about this tour' }));
    expect(spy).toHaveBeenCalled();
    // Still on the same tour (no route change / NotFound).
    expect(screen.getByRole('heading', { level: 1, name: 'Liwonde Wildlife Safari' })).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders NotFound for an unknown slug', () => {
    renderDetail('bogus-tour');
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
  });

  it('resolves the enquire form and its whatsapp note', () => {
    const { container } = renderDetail('tea-culture');
    const enquire = container.querySelector('#enquire') as HTMLElement;
    expect(within(enquire).getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
    expect(within(enquire).getByLabelText('Fitness level')).toBeInTheDocument();
  });
});
