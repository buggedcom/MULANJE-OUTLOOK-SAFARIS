# MULANJE-OUTLOOK-SAFARIS

## Development

```bash
cp api/.dev.vars.example api/.dev.vars   # fill in TOKEN_SECRET and RESEND_API_KEY
./scripts/dev.sh                         # site :5173 + API :8787, Ctrl-C stops both
```

## Deployment

The site deploys to GitHub Pages from `main` via `.github/workflows/pages.yml`
(typecheck, tests, build, publish). One-off setup:

1. Repo **Settings > Pages**: set Source to **GitHub Actions**.
2. Deploy the API (`cd api && npx wrangler deploy`) with `ALLOWED_ORIGINS` including
   `https://<user>.github.io` (origin only, no path).
3. Repo **Settings > Secrets and variables > Actions > Variables**: add `API_URL` =
   the Worker URL.
