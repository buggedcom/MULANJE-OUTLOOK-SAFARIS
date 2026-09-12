import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AppRoutes } from './AppRoutes';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  );
}

describe('GIVEN the App mounted with its own HashRouter', () => {
  describe('WHEN it renders at the default route', () => {
    it('THEN shows the home hero heading', () => {
      render(<App />);
      expect(
        screen.getByRole('heading', { level: 1, name: 'Explore Mount Mulanje. Discover Southern Malawi.' }),
      ).toBeInTheDocument();
    });
  });
});

describe('GIVEN the application router', () => {
  describe('WHEN navigating to a known top-level route', () => {
    it.each([
      ['/', 'Explore Mount Mulanje. Discover Southern Malawi.'],
      ['/about', 'About Mulanje Outlook Safaris'],
      ['/destinations', 'Five extraordinary destinations, close enough to combine'],
      ['/tours', 'Find your Malawi adventure'],
      ['/activities', 'Add a thrill to your journey'],
      ['/gallery', 'Moments from Southern Malawi'],
      ['/contact', 'Begin your journey'],
    ])('THEN "%s" renders its page heading', (path, heading) => {
      renderAt(path);
      expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    });
  });

  describe('WHEN navigating to a valid tour detail route', () => {
    it('THEN renders that tour title', () => {
      renderAt('/tours/6-day-southern');
      expect(screen.getByRole('heading', { level: 1, name: '6-Day Southern Malawi Tour' })).toBeInTheDocument();
    });
  });

  describe('WHEN navigating to an unknown tour slug', () => {
    it('THEN renders the not-found page', () => {
      renderAt('/tours/does-not-exist');
      expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    });
  });

  describe('WHEN navigating to an unknown path', () => {
    it('THEN renders the not-found page', () => {
      renderAt('/no/such/page');
      expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument();
    });
  });
});
