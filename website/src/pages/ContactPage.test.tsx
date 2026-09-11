import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ContactPage } from './ContactPage';
import { contact } from '../data/site';

describe('ContactPage', () => {
  it('renders the info column and the enquiry form', () => {
    render(
      <MemoryRouter>
        <ContactPage />
      </MemoryRouter>,
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Begin your journey' })).toBeInTheDocument();

    // Contact details.
    expect(screen.getByRole('link', { name: contact.whatsappDisplay })).toHaveAttribute('href', contact.whatsappHref);
    expect(screen.getByRole('link', { name: contact.phoneDisplay })).toHaveAttribute('href', contact.phoneHref);
    expect(screen.getByRole('link', { name: contact.email })).toHaveAttribute('href', contact.emailHref);
    expect(screen.getByText(contact.location)).toBeInTheDocument();
    expect(screen.getByText(contact.officeHours)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Follow on Instagram/ })).toHaveAttribute('href', contact.instagram);

    // Form present with the contact-specific "Adventure activities" option.
    expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Adventure activities' })).toBeInTheDocument();
  });
});
