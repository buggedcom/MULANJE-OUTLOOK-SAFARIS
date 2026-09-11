import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnquiryForm } from './EnquiryForm';

describe('EnquiryForm', () => {
  it('shows required errors and no success on empty submit', async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('rejects an invalid email', async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);
    await user.type(screen.getByLabelText('Full name'), 'Ada');
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a success state when valid', async () => {
    const user = userEvent.setup();
    render(<EnquiryForm />);
    await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email'), 'ada@example.com');
    await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
    expect(screen.getByRole('status')).toHaveTextContent(/thank you/i);
    expect(screen.queryByRole('button', { name: 'Send enquiry' })).not.toBeInTheDocument();
  });

  it('renders extra configured fields (e.g. a select)', () => {
    render(
      <EnquiryForm
        fields={[{ name: 'interest', label: 'Interested in', type: 'select', options: ['Trek', 'Safari'] }]}
      />,
    );
    expect(screen.getByLabelText('Interested in')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Safari' })).toBeInTheDocument();
  });
});
