import { describe, it, expect, afterEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Nav } from './Nav';
import { contact } from '../data/site';
import { renderWithLocation } from '../test/router';

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: px });
}

afterEach(() => setWidth(1024));

describe('GIVEN the desktop navigation at the home route', () => {
  describe('WHEN it renders', () => {
    it('THEN marks the Home link as the current page', () => {
      setWidth(1200);
      renderWithLocation(<Nav />, { route: '/' });
      const header = screen.getByRole('banner');
      expect(within(header).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    });

    it('THEN does not mark non-home links as current (home NavLink is end-matched)', () => {
      setWidth(1200);
      renderWithLocation(<Nav />, { route: '/' });
      const header = screen.getByRole('banner');
      expect(within(header).getByRole('link', { name: 'Tours' })).not.toHaveAttribute('aria-current', 'page');
    });

    it('THEN renders the Instagram link and the Enquire button with correct targets', () => {
      setWidth(1200);
      renderWithLocation(<Nav />, { route: '/' });
      const header = screen.getByRole('banner');
      expect(within(header).getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', contact.instagram);
      expect(within(header).getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact');
    });
  });

  describe('WHEN a desktop nav link is clicked', () => {
    it('THEN navigates to that route', async () => {
      setWidth(1200);
      const user = userEvent.setup();
      renderWithLocation(<Nav />, { route: '/' });
      const header = screen.getByRole('banner');
      await user.click(within(header).getByRole('link', { name: 'Tours' }));
      expect(screen.getByTestId('location')).toHaveTextContent('/tours');
    });
  });
});

describe('GIVEN the navigation below 900px', () => {
  describe('WHEN the hamburger button is clicked', () => {
    it('THEN opens the mobile menu', async () => {
      setWidth(600);
      const user = userEvent.setup();
      renderWithLocation(<Nav />, { route: '/' });
      const menuButton = screen.getByRole('button', { name: 'Menu' });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      await user.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('link', { name: 'Enquire now' })).toBeInTheDocument();
    });

    describe('AND a menu link is then clicked', () => {
      it('THEN closes the mobile menu', async () => {
        setWidth(600);
        const user = userEvent.setup();
        renderWithLocation(<Nav />, { route: '/' });
        await user.click(screen.getByRole('button', { name: 'Menu' }));
        await user.click(screen.getByRole('link', { name: 'Gallery' }));
        expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });
});
