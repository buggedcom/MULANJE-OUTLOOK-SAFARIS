/** Client for the contact API (see /api). Base URL comes from VITE_API_URL. */

const base = () => (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export type SubmitResult =
  | { ok: true }
  | { ok: false; kind: 'validation'; fields: Record<string, string> }
  | { ok: false; kind: 'rate_limited' | 'token' | 'network' | 'server' };

/** Single-use token; fetch a fresh one for every submit attempt. */
export async function fetchToken(): Promise<string | null> {
  try {
    const res = await fetch(`${base()}/api/token`, { credentials: 'omit' });
    if (!res.ok) return null;
    const data = (await res.json()) as { token?: string };
    return data.token ?? null;
  } catch {
    return null;
  }
}

export async function submitEnquiry(payload: Record<string, string>): Promise<SubmitResult> {
  try {
    const res = await fetch(`${base()}/api/contact`, {
      method: 'POST',
      credentials: 'omit',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
    if (res.status === 422) return { ok: false, kind: 'validation', fields: data.fields ?? {} };
    if (res.status === 429) return { ok: false, kind: 'rate_limited' };
    if (data.error === 'invalid_token') return { ok: false, kind: 'token' };
    return { ok: false, kind: 'server' };
  } catch {
    return { ok: false, kind: 'network' };
  }
}
