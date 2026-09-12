import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { AboutPage } from './AboutPage';
import { aboutKeyDestinations } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the About route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<AboutPage />);
      expect(screen.getByRole('heading', { level: 1, name: 'About Mulanje Outlook Safaris' })).toBeInTheDocument();
    });

    it('THEN lists every key destination', () => {
      renderWithRouter(<AboutPage />);
      expect(screen.getByRole('heading', { name: 'Our key destinations' })).toBeInTheDocument();
      for (const d of aboutKeyDestinations) {
        expect(screen.getByText(d)).toBeInTheDocument();
      }
    });

    it('THEN shows the closing call-to-action band', () => {
      renderWithRouter(<AboutPage />);
      expect(screen.getByRole('heading', { name: 'Ready to plan your Malawi adventure?' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Start planning' })).toHaveAttribute('href', '/contact');
    });

    it('THEN resolves every image to a .jpg URL', () => {
      const { container } = renderWithRouter(<AboutPage />);
      const imgs = [...container.querySelectorAll('img')];
      expect(imgs.length).toBeGreaterThan(0);
      for (const im of imgs) expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    });
  });
});
