import { issueToken, verifyToken, hashKey } from './token';
import { parseEnquiry } from './validate';
import { sendEnquiry } from './email';
import type { GuardClient } from './guard';

export interface Env {
  GUARD: DurableObjectNamespace;
  TOKEN_SECRET: string;
  RESEND_API_KEY: string;
  ALLOWED_ORIGINS: string;
  MAIL_TO: string;
  MAIL_FROM: string;
}

export interface Deps {
  guard: GuardClient;
  fetch?: typeof fetch;
  now?: () => number;
}

const HOUR = 60 * 60_000;
export const LIMITS = {
  tokensPerIpPerHour: 30,
  submitsPerIpPerHour: 5,
  emailsPerDay: 100,
};
const MAX_BODY_BYTES = 16 * 1024;

function baseHeaders(origin: string | null, extra: HeadersInit = {}): Headers {
  const headers = new Headers(extra);
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Vary', 'Origin');
  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin);
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    headers.set('Access-Control-Max-Age', '600');
  }
  return headers;
}

function json(body: unknown, status: number, origin: string | null, extra: HeadersInit = {}): Response {
  return Response.json(body, { status, headers: baseHeaders(origin, extra) });
}

export async function handle(request: Request, env: Env, deps: Deps): Promise<Response> {
  const url = new URL(request.url);
  const requestOrigin = request.headers.get('Origin');
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean);
  // Only echo an origin we explicitly trust; everything else gets no CORS headers.
  const origin = requestOrigin && allowed.includes(requestOrigin) ? requestOrigin : null;

  if (request.method === 'OPTIONS') {
    // A 204 must have no body, so it can't go through json().
    return new Response(null, { status: origin ? 204 : 403, headers: baseHeaders(origin) });
  }
  if (!origin) return json({ error: 'forbidden' }, 403, null);

  const now = (deps.now ?? Date.now)();
  const ip = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const ipKey = await hashKey(env.TOKEN_SECRET, ip);

  if (url.pathname === '/api/token' && request.method === 'GET') {
    const rl = await deps.guard.hit(`tok:${ipKey}`, LIMITS.tokensPerIpPerHour, HOUR);
    if (!rl.allowed) return json({ error: 'rate_limited' }, 429, origin, { 'Retry-After': String(rl.retryAfterSec) });
    return json({ token: await issueToken(env.TOKEN_SECRET, now) }, 200, origin);
  }

  if (url.pathname === '/api/contact' && request.method === 'POST') {
    // Content-type + size checks before parsing anything.
    if (!(request.headers.get('Content-Type') ?? '').toLowerCase().startsWith('application/json')) {
      return json({ error: 'unsupported_media_type' }, 415, origin);
    }
    const text = await request.text();
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return json({ error: 'too_large' }, 413, origin);

    const rl = await deps.guard.hit(`sub:${ipKey}`, LIMITS.submitsPerIpPerHour, HOUR);
    if (!rl.allowed) return json({ error: 'rate_limited' }, 429, origin, { 'Retry-After': String(rl.retryAfterSec) });

    let body: Record<string, unknown>;
    try {
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) throw new Error();
      body = parsed;
    } catch {
      return json({ error: 'invalid_json' }, 400, origin);
    }

    // Honeypot: real users never see or fill this. Pretend success so bots
    // get no signal, but send nothing and do not spend a token.
    if (typeof body.website === 'string' && body.website !== '') return json({ ok: true }, 200, origin);

    const parsed = parseEnquiry(body);
    if (!parsed.ok) return json({ error: 'validation', fields: parsed.errors }, 422, origin);

    const check = await verifyToken(env.TOKEN_SECRET, body.token, now);
    if (!check.ok) return json({ error: 'invalid_token', reason: check.reason }, 400, origin);

    // Atomic single use: only the first request with this token proceeds.
    if (!(await deps.guard.consume(check.id, 2 * HOUR))) {
      return json({ error: 'invalid_token', reason: 'used' }, 400, origin);
    }

    const day = new Date(now).toISOString().slice(0, 10);
    const cap = await deps.guard.hit(`mail:${day}`, LIMITS.emailsPerDay, 24 * HOUR);
    if (!cap.allowed) return json({ error: 'rate_limited' }, 429, origin, { 'Retry-After': String(cap.retryAfterSec) });

    const sent = await sendEnquiry(
      { apiKey: env.RESEND_API_KEY, to: env.MAIL_TO, from: env.MAIL_FROM },
      parsed.enquiry,
      deps.fetch,
    );
    if (!sent) return json({ error: 'delivery_failed' }, 502, origin);
    return json({ ok: true }, 200, origin);
  }

  return json({ error: 'not_found' }, 404, origin);
}
