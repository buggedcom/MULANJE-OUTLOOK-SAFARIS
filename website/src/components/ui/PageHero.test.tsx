import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHero } from './PageHero';
import { contact } from '../../data/site';

describe('GIVEN a PageHero with image, kicker and title', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the kicker and the h1 title', () => {
      render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      expect(screen.getByText('About us')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: 'Our story' })).toBeInTheDocument();
    });

    it('THEN resolves the background image to a .jpg URL', () => {
      const { container } = render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      const im = container.querySelector('img')!;
      expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    });
  });

  describe('AND no sub or instagram link is given', () => {
    it('THEN renders neither a sub paragraph nor an Instagram button', () => {
      render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      expect(screen.queryByRole('link', { name: /Instagram/ })).not.toBeInTheDocument();
    });
  });

  describe('AND a sub and instagram link are given', () => {
    it('THEN renders the sub text and an Instagram button with the correct href', () => {
      render(
        <PageHero image="photos/new-misty-summit.jpg" kicker="Gallery" title="Moments" sub="A glimpse of what awaits." instagramLink />,
      );
      expect(screen.getByText('A glimpse of what awaits.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Follow us on Instagram/ })).toHaveAttribute('href', contact.instagram);
    });
  });
});
