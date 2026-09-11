import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
}

describe('HomePage', () => {
  it('renders the hero and all section headings in order', () => {
    renderHome();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Explore Mount Mulanje. Discover Southern Malawi.' }),
    ).toBeInTheDocument();
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

  it('shows the hero stats', () => {
    renderHome();
    expect(screen.getByText('3,002m')).toBeInTheDocument();
    expect(screen.getByText('Summit of Sapitwa')).toBeInTheDocument();
  });

  it('wires the primary CTAs', () => {
    renderHome();
    expect(screen.getByRole('link', { name: 'Browse tours' })).toHaveAttribute('href', '/tours');
    // Tour cards link to their detail route.
    expect(screen.getByRole('link', { name: /3-Day Mount Mulanje Trek/ })).toHaveAttribute(
      'href',
      '/tours/3-day-mulanje',
    );
  });

  it('renders the enquire form within the #enquire section', () => {
    const { container } = renderHome();
    const enquire = container.querySelector('#enquire');
    expect(enquire).not.toBeNull();
    expect(within(enquire as HTMLElement).getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
  });
});
