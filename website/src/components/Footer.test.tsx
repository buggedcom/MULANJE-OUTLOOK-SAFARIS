import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Footer } from './Footer';
import { contact } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the site footer', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the contact details with correct hrefs', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: `WhatsApp ${contact.whatsappDisplay}` })).toHaveAttribute('href', contact.whatsappHref);
      expect(screen.getByRole('link', { name: `Call ${contact.phoneDisplay}` })).toHaveAttribute('href', contact.phoneHref);
      expect(screen.getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
    });

    it('THEN links Instagram and TripAdvisor to their profiles', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByRole('link', { name: /Instagram/ })).toHaveAttribute('href', contact.instagram);
      expect(screen.getByRole('link', { name: /TripAdvisor/ })).toHaveAttribute('href', contact.tripadvisor);
    });

    it('THEN shows the tagline and the explore links', () => {
      renderWithRouter(<Footer />);
      expect(screen.getByText(contact.tagline)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'About us' })).toHaveAttribute('href', '/about');
      expect(screen.getByRole('link', { name: 'Popular tours' })).toHaveAttribute('href', '/tours');
    });

    it('THEN uses well-formed contact hrefs', () => {
      renderWithRouter(<Footer />);
      expect(contact.whatsappHref).toMatch(/^https:\/\/wa\.me\/\d+$/);
      expect(contact.phoneHref).toMatch(/^tel:\+\d+$/);
      expect(contact.emailHref).toMatch(/^mailto:.+@.+\..+$/);
    });
  });
});
