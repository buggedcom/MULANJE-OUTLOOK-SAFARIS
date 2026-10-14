// Strict allowlist validation. Unknown keys are dropped, never forwarded.

export interface Enquiry {
  name: string;
  email: string;
  message: string;
  extras: Record<string, string>;
  /** What the enquiry is about (tour title / page) and the page URL it came from. */
  topic: string;
  page: string;
}

const LIMITS: Record<string, number> = {
  name: 100,
  email: 254,
  message: 5000,
  interest: 200,
  dates: 200,
  month: 200,
  group: 200,
  fitness: 200,
  topic: 200,
  page: 500,
};
export const EXTRA_FIELDS = ['interest', 'dates', 'month', 'group', 'fitness'] as const;
// Where the enquiry came from; set by the client, so treated as untrusted text.
const CONTEXT_FIELDS = ['topic', 'page'] as const;

const EMAIL_RE = /^[^\s@<>(),;:"[\]\\]+@[^\s@<>(),;:"[\]\\]+\.[^\s@<>(),;:"[\]\\]+$/;
// eslint-disable-next-line no-control-regex
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u2028\u2029]/g;

function clean(v: unknown, multiline: boolean): string | null {
  if (v === undefined || v === null) return '';
  if (typeof v !== 'string') return null;
  let s = v.normalize('NFC').replace(CONTROL, '');
  if (!multiline) s = s.replace(/[\r\n\t]+/g, ' ');
  return s.trim();
}

export type ParseResult =
  | { ok: true; enquiry: Enquiry }
  | { ok: false; errors: Record<string, string> };

export function parseEnquiry(input: unknown): ParseResult {
  if (typeof input !== 'object' || input === null || Array.isArray(input)) {
    return { ok: false, errors: { _: 'Invalid request' } };
  }
  const raw = input as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const out: Record<string, string> = {};

  for (const name of ['name', 'email', 'message', ...EXTRA_FIELDS, ...CONTEXT_FIELDS]) {
    const v = clean(raw[name], name === 'message');
    if (v === null) errors[name] = 'Invalid value';
    else if (v.length > LIMITS[name]) errors[name] = 'Too long';
    else out[name] = v;
  }
  if (!out.name && !errors.name) errors.name = 'Required';
  if (!out.email && !errors.email) errors.email = 'Required';
  else if (out.email && !errors.email && !EMAIL_RE.test(out.email)) errors.email = 'Invalid email';

  // Only keep a page value that is a plain http(s) URL; otherwise drop it.
  if (out.page && !/^https?:\/\/\S+$/.test(out.page)) out.page = '';

  if (Object.keys(errors).length) return { ok: false, errors };

  const extras: Record<string, string> = {};
  for (const f of EXTRA_FIELDS) if (out[f]) extras[f] = out[f];
  return {
    ok: true,
    enquiry: { name: out.name, email: out.email, message: out.message, extras, topic: out.topic, page: out.page },
  };
}
