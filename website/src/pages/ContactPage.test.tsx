import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { ContactPage } from './ContactPage';
import { contact } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Contact route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows the hero heading', () => {
      renderWithRouter(<ContactPage />);
      expect(screen.getByRole('heading', { level: 1, name: 'Begin your journey' })).toBeInTheDocument();
    });

    it('THEN shows the WhatsApp, call and email links with correct hrefs', () => {
      renderWithRouter(<ContactPage />);
      expect(screen.getByRole('link', { name: contact.whatsappDisplay })).toHaveAttribute('href', contact.whatsappHref);
      expect(screen.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute('href', contact.phoneHref);
      expect(screen.getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
    });

    it('THEN shows the location, office hours and social buttons', () => {
      renderWithRouter(<ContactPage />);
      expect(screen.getByText(contact.location)).toBeInTheDocument();
      expect(screen.getByText(contact.officeHours)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Follow on Instagram/ })).toHaveAttribute('href', contact.instagram);
    });

    describe('AND the enquiry form is inspected', () => {
      it('THEN offers the contact-specific "Adventure activities" option', () => {
        renderWithRouter(<ContactPage />);
        expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
        expect(screen.getByRole('option', { name: 'Adventure activities' })).toBeInTheDocument();
      });
    });
  });
});
