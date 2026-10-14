#!/usr/bin/env bash
# Starts the contact API (wrangler, :8787) and the website (vite, :5173) together.
# Ctrl-C stops both. Usage: ./scripts/dev.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
API_PORT="${API_PORT:-8787}"
SITE_PORT="${SITE_PORT:-5173}"

if [[ ! -f "$ROOT/api/.dev.vars" ]]; then
  echo "Missing api/.dev.vars. Create it from the example and fill in the secrets:" >&2
  echo "  cp api/.dev.vars.example api/.dev.vars" >&2
  exit 1
fi

for dir in api website; do
  if [[ ! -d "$ROOT/$dir/node_modules" ]]; then
    echo "Installing $dir dependencies..."
    (cd "$ROOT/$dir" && npm install)
  fi
done

pids=()

# Kill a process and everything it spawned (npx -> node -> workerd/esbuild...).
kill_tree() {
  local pid=$1 child
  for child in $(pgrep -P "$pid" 2>/dev/null || true); do kill_tree "$child"; done
  kill "$pid" 2>/dev/null || true
}

cleanup() {
  trap - INT TERM EXIT
  for pid in "${pids[@]:-}"; do
    [[ -n "$pid" ]] && kill_tree "$pid"
  done
  wait 2>/dev/null || true
}
trap cleanup INT TERM EXIT

prefix() { sed -u "s/^/[$1] /"; }

(cd "$ROOT/api" && exec npx wrangler dev --port "$API_PORT" 2>&1 | prefix api) &
pids+=($!)

# The env var overrides website/.env.local; strictPort fails loudly instead of
# silently moving to a port the API's ALLOWED_ORIGINS doesn't list.
(cd "$ROOT/website" && VITE_API_URL="http://localhost:$API_PORT" \
  exec npx vite --port "$SITE_PORT" --strictPort 2>&1 | prefix web) &
pids+=($!)

echo "Site: http://localhost:$SITE_PORT   API: http://localhost:$API_PORT   (Ctrl-C to stop)"
wait
