import { describe, it, expect, beforeEach, vi } from 'vitest';
import { handle, LIMITS, type Env, type Deps } from '../src/handler';
import { Guard, type GuardClient } from '../src/guard';
import { issueToken } from '../src/token';

const ORIGIN = 'https://site.example';
const SECRET = 'test-secret-0123456789-0123456789';
const env: Env = {
  GUARD: undefined as never,
  TOKEN_SECRET: SECRET,
  RESEND_API_KEY: 'k',
  ALLOWED_ORIGINS: ORIGIN,
  MAIL_TO: 'to@example.com',
  MAIL_FROM: 'from@example.com',
};

/** In-memory stand-in for the Durable Object client, using the real Guard logic. */
function fakeGuard(): GuardClient {
  const objs = new Map<string, Map<string, unknown>>();
  const get = (name: string) => {
    let m = objs.get(name);
    if (!m) objs.set(name, (m = new Map()));
    const state = {
      storage: {
        get: async (k: string) => m!.get(k),
        put: async (k: string, v: unknown) => void m!.set(k, v),
        setAlarm: async () => {},
        deleteAll: async () => m!.clear(),
      },
    };
    return new Guard(state as never);
  };
  return {
    consume: async (id, ttl) => (await get(`t:${id}`).consume(ttl)).ok,
    hit: (key, limit, win) => get(`r:${key}`).hit(limit, win),
  };
}

let guard: GuardClient;
let fetchMock: ReturnType<typeof vi.fn>;
let deps: Deps;
const T0 = 1_800_000_000_000;

beforeEach(() => {
  guard = fakeGuard();
  fetchMock = vi.fn(async () => new Response('{}', { status: 200 }));
  deps = { guard, fetch: fetchMock as never, now: () => T0 + 10_000 };
});

const freshToken = () => issueToken(SECRET, T0);
const post = (body: unknown, init: { origin?: string | null; type?: string; ip?: string } = {}) =>
  handle(
    new Request('https://api.test/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': init.type ?? 'application/json',
        ...(init.origin === null ? {} : { Origin: init.origin ?? ORIGIN }),
        'CF-Connecting-IP': init.ip ?? '1.2.3.4',
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
    env,
    deps,
  );
const valid = async (extra: object = {}) => ({
  name: 'Ada',
  email: 'ada@example.com',
  message: 'Hello',
  token: await freshToken(),
  ...extra,
});

describe('GIVEN a request from a disallowed origin', () => {
  it('THEN is rejected with no CORS headers', async () => {
    const res = await post(await valid(), { origin: 'https://evil.example' });
    expect(res.status).toBe(403);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it('THEN a request with no Origin header is rejected', async () => {
    expect((await post(await valid(), { origin: null })).status).toBe(403);
  });
});

describe('GIVEN a CORS preflight', () => {
  const preflight = (origin: string) =>
    handle(
      new Request('https://api.test/api/contact', {
        method: 'OPTIONS',
        headers: { Origin: origin, 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' },
      }),
      env,
      deps,
    );
  it('WHEN the origin is allowed THEN returns 204 with CORS headers', async () => {
    const res = await preflight(ORIGIN);
    expect(res.status).toBe(204);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    expect(res.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
  });
  it('WHEN the origin is not allowed THEN returns 403 with no CORS headers', async () => {
    const res = await preflight('https://evil.example');
    expect(res.status).toBe(403);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});

describe('GIVEN a valid token and enquiry', () => {
  it('WHEN posted THEN the enquiry is emailed with reply_to set and CORS echoed', async () => {
    const res = await post(await valid());
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ORIGIN);
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.reply_to).toBe('ada@example.com');
    expect(sent.text).toContain('Hello');
  });

  it('WHEN the same token is reused THEN the second request is refused', async () => {
    const body = await valid();
    expect((await post(body)).status).toBe(200);
    const second = await post(body);
    expect(second.status).toBe(400);
    expect(await second.json()).toMatchObject({ reason: 'used' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('WHEN submitted concurrently THEN exactly one succeeds', async () => {
    const body = await valid();
    const results = await Promise.all([post(body), post(body), post(body)]);
    expect(results.filter((r) => r.status === 200)).toHaveLength(1);
  });
});

describe('GIVEN token problems', () => {
  it('forged signature is refused', async () => {
    const t = await freshToken();
    const res = await post(await valid({ token: t.slice(0, -2) + 'AA' }));
    expect(res.status).toBe(400);
  });
  it('missing token is refused', async () => {
    const { token: _t, ...rest } = await valid();
    expect((await post(rest)).status).toBe(400);
  });
  it('a token submitted too quickly is refused', async () => {
    deps.now = () => T0 + 500;
    expect(await (await post(await valid())).json()).toMatchObject({ reason: 'too_fast' });
  });
  it('an expired token is refused', async () => {
    deps.now = () => T0 + 61 * 60_000;
    expect(await (await post(await valid())).json()).toMatchObject({ reason: 'expired' });
  });
  it('a validation failure does not burn the token', async () => {
    const token = await freshToken();
    expect((await post({ name: '', email: 'x', token })).status).toBe(422);
    expect((await post({ name: 'Ada', email: 'ada@example.com', token })).status).toBe(200);
  });
});

describe('GIVEN malformed or hostile input', () => {
  it('wrong content type -> 415', async () => {
    expect((await post('x', { type: 'text/plain' })).status).toBe(415);
  });
  it('oversized body -> 413', async () => {
    expect((await post(JSON.stringify({ message: 'a'.repeat(20_000) }))).status).toBe(413);
  });
  it('invalid JSON -> 400', async () => {
    expect((await post('{nope')).status).toBe(400);
  });
  it('non-string field values -> 422', async () => {
    expect((await post(await valid({ name: { $gt: '' } }))).status).toBe(422);
  });
  it('CR/LF are stripped from single-line fields (no header injection)', async () => {
    await post(await valid({ name: 'Ada\r\nBcc: evil@example.com' }));
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.subject).not.toMatch(/[\r\n]/);
  });
  it('includes the topic and page in the email and subject', async () => {
    await post(await valid({ topic: '5-Day Grand Mulanje Traverse', page: 'https://site.example/#/tours/5-day' }));
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.subject).toBe('Enquiry: 5-Day Grand Mulanje Traverse - Ada');
    expect(sent.text).toContain('Enquiry about: 5-Day Grand Mulanje Traverse');
    expect(sent.text).toContain('Sent from: https://site.example/#/tours/5-day');
  });
  it('drops a page value that is not an http(s) URL', async () => {
    await post(await valid({ page: 'javascript:alert(1)' }));
    const sent = JSON.parse((fetchMock.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.text).not.toContain('javascript:');
  });
  it('unknown fields are not forwarded', async () => {
    await post(await valid({ is_admin: 'yes' }));
    expect((fetchMock.mock.calls[0][1] as RequestInit).body as string).not.toContain('is_admin');
  });
  it('honeypot filled -> silent success, nothing sent', async () => {
    const res = await post(await valid({ website: 'http://spam' }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('GIVEN rate limiting', () => {
  it('blocks a single IP after the submit limit with Retry-After', async () => {
    for (let i = 0; i < LIMITS.submitsPerIpPerHour; i++) {
      expect((await post(await valid())).status).toBe(200);
    }
    const res = await post(await valid());
    expect(res.status).toBe(429);
    expect(Number(res.headers.get('Retry-After'))).toBeGreaterThan(0);
  });
  it('does not affect a different IP', async () => {
    for (let i = 0; i < LIMITS.submitsPerIpPerHour; i++) await post(await valid());
    expect((await post(await valid(), { ip: '9.9.9.9' })).status).toBe(200);
  });
  it('limits token issuance per IP', async () => {
    const get = () =>
      handle(
        new Request('https://api.test/api/token', { headers: { Origin: ORIGIN, 'CF-Connecting-IP': '5.5.5.5' } }),
        env,
        deps,
      );
    for (let i = 0; i < LIMITS.tokensPerIpPerHour; i++) expect((await get()).status).toBe(200);
    expect((await get()).status).toBe(429);
  });
  it('returns 502 and no success when delivery fails', async () => {
    fetchMock.mockResolvedValueOnce(new Response('', { status: 500 }));
    expect((await post(await valid())).status).toBe(502);
  });
});
