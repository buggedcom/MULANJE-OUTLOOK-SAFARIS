// Stateless, HMAC-signed form tokens: `<id>.<issuedAtMs>.<sig>`.
// The signature lets the Worker reject forged/expired tokens without touching
// storage; single use is enforced separately by the Guard Durable Object.

const enc = new TextEncoder();

export const MIN_AGE_MS = 3_000; // humans can't fill the form faster
export const MAX_AGE_MS = 60 * 60_000;

export type TokenCheck =
  | { ok: true; id: string }
  | { ok: false; reason: 'malformed' | 'bad_signature' | 'too_fast' | 'expired' };

function b64url(bytes: Uint8Array): string {
  let s = '';
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array | null {
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
    return Uint8Array.from(bin, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

function key(secret: string, usage: 'sign' | 'verify'): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [usage]);
}

async function sign(secret: string, data: string): Promise<string> {
  const sig = await crypto.subtle.sign('HMAC', await key(secret, 'sign'), enc.encode(data));
  return b64url(new Uint8Array(sig));
}

export async function issueToken(secret: string, now = Date.now()): Promise<string> {
  const id = b64url(crypto.getRandomValues(new Uint8Array(16)));
  const body = `${id}.${now}`;
  return `${body}.${await sign(secret, body)}`;
}

export async function verifyToken(secret: string, token: unknown, now = Date.now()): Promise<TokenCheck> {
  if (typeof token !== 'string' || token.length > 200) return { ok: false, reason: 'malformed' };
  const parts = token.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'malformed' };
  const [id, iat, sig] = parts;
  const issuedAt = Number(iat);
  const sigBytes = fromB64url(sig);
  if (!/^[A-Za-z0-9_-]{22}$/.test(id) || !Number.isSafeInteger(issuedAt) || !sigBytes) {
    return { ok: false, reason: 'malformed' };
  }
  // subtle.verify compares in constant time.
  const valid = await crypto.subtle.verify('HMAC', await key(secret, 'verify'), sigBytes, enc.encode(`${id}.${iat}`));
  if (!valid) return { ok: false, reason: 'bad_signature' };
  const age = now - issuedAt;
  if (age < MIN_AGE_MS) return { ok: false, reason: 'too_fast' };
  if (age > MAX_AGE_MS) return { ok: false, reason: 'expired' };
  return { ok: true, id };
}

/** Keyed hash so raw IPs are never stored or used as storage names. */
export function hashKey(secret: string, value: string): Promise<string> {
  return sign(secret, `k:${value}`);
}
