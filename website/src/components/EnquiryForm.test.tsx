import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnquiryForm } from './EnquiryForm';

describe('GIVEN the enquiry form with no fields filled in', () => {
  describe('WHEN the form is submitted', () => {
    it('THEN shows a required error for name and for email', async () => {
      const user = userEvent.setup();
      render(<EnquiryForm />);
      await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('THEN does not show the success state', async () => {
      const user = userEvent.setup();
      render(<EnquiryForm />);
      await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });
});

describe('GIVEN the name is filled in', () => {
  describe('WHEN the form is submitted', () => {
    describe('AND the email is not a valid address', () => {
      it('THEN shows an email validation error and no success', async () => {
        const user = userEvent.setup();
        render(<EnquiryForm />);
        await user.type(screen.getByLabelText('Full name'), 'Ada');
        await user.type(screen.getByLabelText('Email'), 'not-an-email');
        await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });
  });
});

describe('GIVEN all required fields are valid', () => {
  describe('WHEN the form is submitted', () => {
    it('THEN shows the success state', async () => {
      const user = userEvent.setup();
      render(<EnquiryForm />);
      await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
      await user.type(screen.getByLabelText('Email'), 'ada@example.com');
      await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
      expect(screen.getByRole('status')).toHaveTextContent(/thank you/i);
    });

    it('THEN removes the submit button', async () => {
      const user = userEvent.setup();
      render(<EnquiryForm />);
      await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
      await user.type(screen.getByLabelText('Email'), 'ada@example.com');
      await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
      expect(screen.queryByRole('button', { name: 'Send enquiry' })).not.toBeInTheDocument();
    });
  });
});

describe('GIVEN the form is configured with an extra select field', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the select and its options', () => {
      render(
        <EnquiryForm
          fields={[{ name: 'interest', label: 'Interested in', type: 'select', options: ['Trek', 'Safari'] }]}
        />,
      );
      expect(screen.getByLabelText('Interested in')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Safari' })).toBeInTheDocument();
    });
  });
});
