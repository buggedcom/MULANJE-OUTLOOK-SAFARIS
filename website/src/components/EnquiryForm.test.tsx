import { describe, it, expect, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnquiryForm, type EnquiryFormProps } from './EnquiryForm';

/** Renders and lets the on-mount token fetch settle inside act(). */
async function renderForm(props: EnquiryFormProps = {}) {
  await act(async () => {
    render(<EnquiryForm {...props} />);
  });
}

describe('GIVEN the enquiry form with no fields filled in', () => {
  describe('WHEN the form is submitted', () => {
    it('THEN shows a required error for name and for email', async () => {
      const user = userEvent.setup();
      await renderForm();
      await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
      expect(screen.getByText('Full name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });

    it('THEN does not show the success state', async () => {
      const user = userEvent.setup();
      await renderForm();
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
        await renderForm();
        await user.type(screen.getByLabelText('Full name'), 'Ada');
        await user.type(screen.getByLabelText('Email'), 'not-an-email');
        await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
        expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      });
    });
  });
});

function mockApi(contact: () => Response) {
  const fetchMock = vi.fn(async (url: string, _init?: RequestInit) =>
    url.endsWith('/api/token')
      ? new Response(JSON.stringify({ token: 'tok-1' }), { status: 200 })
      : contact(),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

async function fillAndSend(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
  await user.type(screen.getByLabelText('Email'), 'ada@example.com');
  await user.click(screen.getByRole('button', { name: 'Send enquiry' }));
}

describe('GIVEN all required fields are valid and the API accepts the enquiry', () => {
  describe('WHEN the form is submitted', () => {
    it('THEN posts the fields with the single-use token and shows the success state', async () => {
      const fetchMock = mockApi(() => new Response('{"ok":true}', { status: 200 }));
      const user = userEvent.setup();
      await renderForm();
      await fillAndSend(user);
      expect(await screen.findByRole('status')).toHaveTextContent(/thank you/i);
      const call = fetchMock.mock.calls.find(([u]) => u.endsWith('/api/contact'))!;
      expect(JSON.parse((call[1] as RequestInit).body as string)).toMatchObject({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
        token: 'tok-1',
        website: '',
      });
    });

    it('THEN removes the submit button', async () => {
      mockApi(() => new Response('{"ok":true}', { status: 200 }));
      const user = userEvent.setup();
      await renderForm();
      await fillAndSend(user);
      await screen.findByRole('status');
      expect(screen.queryByRole('button', { name: 'Send enquiry' })).not.toBeInTheDocument();
    });
  });
});

describe('GIVEN a form with a topic and an untouched select', () => {
  it('WHEN submitted THEN sends the topic, page URL and the select default', async () => {
    const fetchMock = mockApi(() => new Response('{"ok":true}', { status: 200 }));
    const user = userEvent.setup();
    await renderForm({
      topic: '3-Day Mount Mulanje Trek',
      fields: [{ name: 'interest', label: 'Interested in', type: 'select', options: ['Trek', 'Safari'] }],
    });
    await fillAndSend(user);
    await screen.findByRole('status');
    const call = fetchMock.mock.calls.find(([u]) => u.endsWith('/api/contact'))!;
    expect(JSON.parse((call[1] as RequestInit).body as string)).toMatchObject({
      topic: '3-Day Mount Mulanje Trek',
      page: window.location.href,
      interest: 'Trek',
    });
  });
});

describe('GIVEN the API refuses the enquiry', () => {
  it('WHEN rate limited THEN shows an error and keeps the form', async () => {
    mockApi(() => new Response('{"error":"rate_limited"}', { status: 429 }));
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByRole('alert')).toHaveTextContent(/too many enquiries/i);
    expect(screen.getByRole('button', { name: 'Send enquiry' })).toBeEnabled();
  });

  it('WHEN the server rejects fields THEN shows them inline', async () => {
    mockApi(() => new Response('{"error":"validation","fields":{"email":"Invalid email"}}', { status: 422 }));
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
  });

  it('WHEN the token is rejected THEN asks to retry and fetches a fresh token', async () => {
    const fetchMock = mockApi(() => new Response('{"error":"invalid_token"}', { status: 400 }));
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByRole('alert')).toHaveTextContent(/session expired/i);
    expect(fetchMock.mock.calls.filter(([u]) => u.endsWith('/api/token')).length).toBe(2);
  });

  it('WHEN the server errors THEN shows a generic failure', async () => {
    mockApi(() => new Response('{}', { status: 502 }));
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByRole('alert')).toHaveTextContent(/something went wrong/i);
  });

  it('WHEN the network is down THEN shows a connection error', async () => {
    mockApi(() => {
      throw new Error('offline');
    });
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach/i);
  });
});

describe('GIVEN the token endpoint is unavailable', () => {
  it('WHEN the form is submitted THEN shows a connection error and sends nothing', async () => {
    const fetchMock = vi.fn(async (_url: string) => new Response('{}', { status: 500 }));
    vi.stubGlobal('fetch', fetchMock);
    const user = userEvent.setup();
    await renderForm();
    await fillAndSend(user);
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach/i);
    expect(fetchMock.mock.calls.some(([u]) => u.endsWith('/api/contact'))).toBe(false);
  });
});

describe('GIVEN the form is configured with an extra select field', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the select and its options', async () => {
      await renderForm({ fields: [{ name: 'interest', label: 'Interested in', type: 'select', options: ['Trek', 'Safari'] }] });
      expect(screen.getByLabelText('Interested in')).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Safari' })).toBeInTheDocument();
    });
  });
});
