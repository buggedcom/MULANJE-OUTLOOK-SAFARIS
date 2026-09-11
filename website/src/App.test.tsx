import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './AppRoutes';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: px });
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

describe('routing', () => {
  it.each([
    ['/', 'Explore Mount Mulanje. Discover Southern Malawi.'],
    ['/about', 'About Mulanje Outlook Safaris'],
    ['/destinations', 'Five extraordinary destinations, close enough to combine'],
    ['/tours', 'Find your Malawi adventure'],
    ['/activities', 'Add a thrill to your journey'],
    ['/gallery', 'Moments from Southern Malawi'],
    ['/contact', 'Begin your journey'],
  ])('renders %s with its heading', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('renders a tour detail heading for a valid slug', () => {
    renderAt('/tours/6-day-southern');
    expect(
      screen.getByRole('heading', { level: 1, name: '6-Day Southern Malawi Tour' }),
    ).toBeInTheDocument();
  });

  it('renders NotFound for an unknown slug and an unknown path', () => {
    renderAt('/tours/does-not-exist');
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    renderAt('/no/such/page');
    expect(screen.getAllByRole('heading', { level: 1, name: 'Page not found' }).length).toBeGreaterThan(0);
  });
});

describe('Nav', () => {
  beforeEach(() => setWidth(1200));
  afterEach(() => setWidth(1024));

  it('navigates via a desktop nav link', async () => {
    const user = userEvent.setup();
    renderAt('/');
    const header = screen.getByRole('banner');
    await user.click(within(header).getByRole('link', { name: 'Tours' }));
    expect(screen.getByRole('heading', { level: 1, name: 'Find your Malawi adventure' })).toBeInTheDocument();
  });

  it('toggles the mobile menu below 900px', async () => {
    setWidth(600);
    const user = userEvent.setup();
    renderAt('/');
    // Desktop link row is hidden; a Menu button is shown.
    const menuButton = screen.getByRole('button', { name: 'Menu' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    // The menu panel exposes an "Enquire now" link.
    expect(screen.getByRole('link', { name: 'Enquire now' })).toBeInTheDocument();
  });
});

describe('anchor scroll on navigation', () => {
  it('scrolls to a section when navigation carries scrollTo state', async () => {
    const scrollIntoView = vi.fn();
    // Home stub has no #experiences yet; inject an element so the manager finds it.
    const section = document.createElement('div');
    section.id = 'experiences';
    section.scrollIntoView = scrollIntoView;
    document.body.appendChild(section);

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { scrollTo: 'experiences' } }]}>
        <AppRoutes />
      </MemoryRouter>,
    );

    expect(scrollIntoView).toHaveBeenCalled();
    section.remove();
  });

  it('scrolls to top on a plain navigation', () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
    renderAt('/about');
    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
  });
});
