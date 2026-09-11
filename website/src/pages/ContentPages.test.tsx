import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './AboutPage';
import { DestinationsPage } from './DestinationsPage';
import { ActivitiesPage } from './ActivitiesPage';
import { destinations, activities, aboutKeyDestinations } from '../data/site';

const wrap = (ui: React.ReactElement) => render(<MemoryRouter>{ui}</MemoryRouter>);

function expectAllImagesResolved(container: HTMLElement) {
  const imgs = [...container.querySelectorAll('img')];
  expect(imgs.length).toBeGreaterThan(0);
  for (const im of imgs) {
    expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
  }
}

describe('AboutPage', () => {
  it('renders hero, story, key destinations and CTA', () => {
    const { container } = wrap(<AboutPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'About Mulanje Outlook Safaris' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our key destinations' })).toBeInTheDocument();
    for (const d of aboutKeyDestinations) expect(screen.getByText(d)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Ready to plan your Malawi adventure?' })).toBeInTheDocument();
    expectAllImagesResolved(container);
  });
});

describe('DestinationsPage', () => {
  it('renders each destination with quick-nav and a Plan-a-visit link', () => {
    const { container } = wrap(<DestinationsPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Five extraordinary destinations, close enough to combine' }),
    ).toBeInTheDocument();
    for (const d of destinations) {
      expect(screen.getByRole('heading', { name: d.name })).toBeInTheDocument();
    }
    const planLinks = screen.getAllByRole('link', { name: 'Plan a visit' });
    expect(planLinks).toHaveLength(destinations.length);
    expect(planLinks[0]).toHaveAttribute('href', '/tours');
    expect(screen.getByRole('link', { name: 'See a sample tour' })).toHaveAttribute('href', '/tours/6-day-southern');
    expectAllImagesResolved(container);
  });
});

describe('ActivitiesPage', () => {
  it('renders each activity with its chips', () => {
    const { container } = wrap(<ActivitiesPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Add a thrill to your journey' })).toBeInTheDocument();
    for (const a of activities) {
      expect(screen.getByRole('heading', { name: a.name })).toBeInTheDocument();
      expect(screen.getByText(a.chips[0])).toBeInTheDocument();
    }
    expectAllImagesResolved(container);
  });
});
