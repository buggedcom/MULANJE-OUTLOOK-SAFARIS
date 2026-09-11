# Mulanje Outlook — website

A React + Vite + TypeScript rebuild of the `demo4/` marketing site
("Mulanje Outlook Travel & Safaris"), replacing the Claude Design canvas
export (a single `Home.dc.html` rendered by a `support.js` runtime) with a
maintainable, tested app.

## Commands

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
npm run test       # run the Vitest suite once
npm run test:watch # watch mode
npm run typecheck  # tsc, no emit
```

## Structure

```
src/
  main.tsx, App.tsx, AppRoutes.tsx   # entry + HashRouter route table
  styles/{tokens,global}.css         # ported "Organic" design system
  lib/                               # images resolver, hooks, icons, helpers
  data/{tours,site}.ts               # typed content (ported verbatim)
  components/                        # Layout, Nav, Footer, EnquiryForm, …
    ui/                              # Button, Tag, Card, Icon, PhotoZoom, …
  pages/                             # one component per route
  assets/{photos,new-new-images,new-new-new-images}/
```

## Notes

- **Routing** uses `HashRouter`, preserving the original hash-URL style and
  keeping the built site trivial to host on any static path.
- **Images** are resolved through `lib/images.ts`, which mirrors the original
  `img()` key transform over a Vite `import.meta.glob`, so verbatim data paths
  (`photos/x.jpg`, `new-new-images/…`) map to hashed bundle URLs.
- **Forms** are client-side only: they validate and show a success state; no
  data is sent to a backend.
- **Icons** are data-driven (SVG path `d` strings in `lib/icons.ts` and the
  tour day-meta table); no icon library.

### Intentional deviations from the original

- Unknown routes / tour slugs render a **404 page** (the original silently fell
  back to the 6-day tour).
- The canvas-only **theme switcher** (`switcher()` / `feelVars()`) is dropped;
  the site ships in its single terracotta/cream palette.

### Follow-ups (not blocking)

- Source photos are large (several MB each) and are emitted unoptimised; an
  image-compression pass would cut the payload substantially.
- The image glob is eager, so a handful of unreferenced source photos are also
  emitted as (unused) assets.
