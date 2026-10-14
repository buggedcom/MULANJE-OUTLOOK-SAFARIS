// Guard Durable Object: one instance per token id (single-use) or per
// rate-limit key. A DO processes requests serially with transactional
// storage, so "check then mark used" cannot race, unlike eventually
// consistent KV.

export class Guard {
  constructor(private state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const body = (await request.json()) as { ttlMs?: number; limit?: number; windowMs?: number };
    if (url.pathname === '/consume') return Response.json(await this.consume(body.ttlMs ?? 0));
    if (url.pathname === '/hit') return Response.json(await this.hit(body.limit ?? 0, body.windowMs ?? 0));
    return new Response('Not found', { status: 404 });
  }

  /** First caller wins; every later caller is refused until the record expires. */
  async consume(ttlMs: number): Promise<{ ok: boolean }> {
    if (await this.state.storage.get('used')) return { ok: false };
    await this.state.storage.put('used', 1);
    await this.state.storage.setAlarm(Date.now() + ttlMs);
    return { ok: true };
  }

  /** Sliding-window counter. */
  async hit(limit: number, windowMs: number): Promise<{ allowed: boolean; retryAfterSec: number }> {
    const now = Date.now();
    const stored = (await this.state.storage.get<number[]>('ts')) ?? [];
    const ts = stored.filter((t) => t > now - windowMs);
    if (ts.length >= limit) {
      return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((ts[0] + windowMs - now) / 1000)) };
    }
    ts.push(now);
    await this.state.storage.put('ts', ts);
    await this.state.storage.setAlarm(now + windowMs);
    return { allowed: true, retryAfterSec: 0 };
  }

  async alarm(): Promise<void> {
    await this.state.storage.deleteAll();
  }
}

export interface GuardClient {
  consume(tokenId: string, ttlMs: number): Promise<boolean>;
  hit(key: string, limit: number, windowMs: number): Promise<{ allowed: boolean; retryAfterSec: number }>;
}

export function guardClient(ns: DurableObjectNamespace): GuardClient {
  const call = async <T>(name: string, path: string, body: object): Promise<T> => {
    const res = await ns.get(ns.idFromName(name)).fetch(`https://guard${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return (await res.json()) as T;
  };
  return {
    async consume(tokenId, ttlMs) {
      return (await call<{ ok: boolean }>(`token:${tokenId}`, '/consume', { ttlMs })).ok;
    },
    hit(key, limit, windowMs) {
      return call(`rl:${key}`, '/hit', { limit, windowMs });
    },
  };
}
