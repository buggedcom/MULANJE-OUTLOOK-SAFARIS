import { useEffect, useId, useState, type ReactNode } from 'react';
import { Field } from './ui/Field';
import { fetchToken, submitEnquiry } from '../lib/enquiryApi';
import s from './EnquiryForm.module.css';

export interface FieldDef {
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea';
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface EnquiryFormProps {
  /** Extra fields shown between Email and the message textarea. */
  fields?: FieldDef[];
  /** Label + placeholder for the trailing message textarea. */
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  /** Small print under the submit button. */
  note?: ReactNode;
  /** What this form is about, e.g. the tour title; included in the email. */
  topic?: string;
  /** Card background token. */
  surface?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const baseFields: FieldDef[] = [
  { name: 'name', label: 'Full name', type: 'text', required: true, placeholder: 'Your name' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@email.com' },
];

const ERROR_COPY = {
  rate_limited: 'Too many enquiries from your connection. Please try again later or message us on WhatsApp.',
  token: 'Your session expired. Please press send again.',
  network: 'We could not reach the server. Please check your connection and try again.',
  server: 'Something went wrong sending your enquiry. Please try again or message us on WhatsApp.',
} as const;

/**
 * Enquiry form. Validates client-side, then posts to the contact API with a
 * single-use token (fetched on mount, re-fetched after every attempt).
 */
export function EnquiryForm({
  fields = [],
  messageLabel = 'Tell us more',
  messagePlaceholder = 'Group size, interests, how long you have…',
  submitLabel = 'Send enquiry',
  note = 'We reply personally within 24 hours.',
  topic,
  surface = 'var(--color-surface)',
}: EnquiryFormProps) {
  const uid = useId();
  const messageField: FieldDef = {
    name: 'message',
    label: messageLabel,
    type: 'textarea',
    placeholder: messagePlaceholder,
  };
  const allFields = [...baseFields, ...fields, messageField];

  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [token, setToken] = useState<string | null>(null);
  // Honeypot: hidden from people, tempting to bots.
  const [trap, setTrap] = useState('');

  useEffect(() => {
    let live = true;
    void fetchToken().then((t) => live && setToken(t));
    return () => {
      live = false;
    };
  }, []);

  const set = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => (e[name] ? { ...e, [name]: '' } : e));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const f of allFields) {
      const val = (values[f.name] ?? '').trim();
      if (f.required && !val) next[f.name] = `${f.label} is required`;
      else if (f.type === 'email' && val && !EMAIL_RE.test(val))
        next[f.name] = 'Please enter a valid email address';
    }
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setFormError('');
    setSending(true);
    // Tokens are single use, so a missing one (failed mount fetch) is retried here.
    const t = token ?? (await fetchToken());
    setToken(null);
    if (!t) {
      setSending(false);
      setFormError(ERROR_COPY.network);
      void fetchToken().then(setToken);
      return;
    }
    const payload: Record<string, string> = {
      token: t,
      website: trap,
      page: window.location.href,
      topic: topic ?? '',
    };
    for (const f of allFields) {
      // A select displays its first option, so send that when it is untouched.
      const fallback = f.type === 'select' ? (f.options?.[0] ?? '') : '';
      payload[f.name] = (values[f.name] ?? fallback).trim();
    }
    const result = await submitEnquiry(payload);
    setSending(false);
    if (result.ok) {
      setSubmitted(true);
      return;
    }
    if (result.kind === 'validation') setErrors(result.fields);
    else setFormError(ERROR_COPY[result.kind]);
    void fetchToken().then(setToken);
  };

  // Background is a caller-provided token, so it stays inline.
  const cardStyle = { background: surface };

  if (submitted) {
    return (
      <div className={s.card} style={cardStyle} role="status">
        <h3 className={s.successTitle}>Thank you — your enquiry is on its way.</h3>
        <p className={s.successText}>
          A local expert will reply personally within 24 hours. In the meantime, feel free to
          message us on WhatsApp for a quicker response.
        </p>
      </div>
    );
  }

  const scalar = allFields.filter((f) => f.type !== 'textarea');

  return (
    <form onSubmit={onSubmit} className={s.card} style={cardStyle} noValidate aria-label="Enquiry form">
      <div className={s.grid}>
        {scalar.map((f) => {
          const id = `${uid}-${f.name}`;
          const err = errors[f.name];
          return (
            <Field key={f.name} label={f.label} htmlFor={id}>
              {f.type === 'select' ? (
                <select
                  id={id}
                  className={`input ${s.select}`}
                  value={values[f.name] ?? ''}
                  onChange={(e) => set(f.name, e.target.value)}
                >
                  {(f.options ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  className="input"
                  type={f.type}
                  placeholder={f.placeholder}
                  value={values[f.name] ?? ''}
                  aria-invalid={err ? true : undefined}
                  onChange={(e) => set(f.name, e.target.value)}
                />
              )}
              {err && (
                <span role="alert" className={s.error}>
                  {err}
                </span>
              )}
            </Field>
          );
        })}
      </div>

      <div className={s.messageField}>
        <Field label={messageField.label} htmlFor={`${uid}-message`}>
          <textarea
            id={`${uid}-message`}
            className="input"
            placeholder={messageField.placeholder}
            value={values.message ?? ''}
            onChange={(e) => set('message', e.target.value)}
          />
        </Field>
      </div>

      <div className={s.trap} aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {formError && (
        <p role="alert" className={s.error}>
          {formError}
        </p>
      )}

      <button type="submit" disabled={sending} className={`btn btn-primary btn-block ${s.submit}`}>
        {sending ? 'Sending…' : submitLabel}
      </button>
      {note && <p className={s.note}>{note}</p>}
    </form>
  );
}
