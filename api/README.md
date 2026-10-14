# Contact API

Cloudflare Worker backing the website enquiry forms.

| Route | Purpose |
| --- | --- |
| `GET /api/token` | Issues a signed, single-use form token |
| `POST /api/contact` | Validates the enquiry, consumes the token, emails it via Resend |

## Protections

- **Single-use tokens** — HMAC-signed `<id>.<issuedAt>.<sig>`; forged tokens are rejected without
  touching storage. Consumption is atomic in a Durable Object, so concurrent replays cannot both win.
  Tokens must be 3 s–60 min old; validation failures do not burn the token.
- **Rate limiting** (sliding window, Durable Object, keyed by HMAC of client IP — raw IPs are never stored):
  30 tokens/h and 5 submissions/h per IP, plus a global 100 emails/day cap to protect the mail quota.
- **Origin allow-list** (`ALLOWED_ORIGINS`) enforced on every route; CORS headers only for allowed origins.
- **Input handling** — JSON only, 16 KB cap, field allow-list with length limits, control characters and
  CR/LF stripped, unknown keys dropped, plain-text email (never HTML), fixed subject template.
- **Honeypot** field (`website`) returns a fake success and sends nothing.
- `Cache-Control: no-store`, `nosniff`; no cookies/credentials used.

## Setup

```bash
cd api && npm install
cp .dev.vars.example .dev.vars   # local secrets
npm run dev                      # http://localhost:8787
npm test
```

Deploy:

```bash
wrangler secret put TOKEN_SECRET     # openssl rand -base64 48
wrangler secret put RESEND_API_KEY
# set ALLOWED_ORIGINS, MAIL_TO, MAIL_FROM in wrangler.toml (MAIL_FROM needs a Resend-verified domain)
npm run deploy
```

Then build the website with `VITE_API_URL=https://<worker-url>`.

## Known limits

No CAPTCHA. If bots get through the rate limits, add Cloudflare Turnstile verification in
`handler.ts` before consuming the token.
