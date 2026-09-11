/* Image resolver — replaces the demo4 runtime's window.__resources + img().

   In the original (Home.dc.html L121):
     img(p) => __resources[ p.replace('photos/','').replace('.jpg','') ] || p
   so photos are keyed by bare basename (`photos/sapitwa.jpg` -> `sapitwa`)
   and the other dirs keep their prefix (`new-new-images/x.jpg` ->
   `new-new-images/x`). We reproduce that exact key transform against a Vite
   glob so verbatim data paths keep working and Vite still hashes the assets.

   `import: 'default'` is required: an eager glob without it yields module
   namespace objects ({ default: url }), which would render as [object Object].
*/

const modules = import.meta.glob('../assets/**/*.jpg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/** Mirror the original img() key transform. */
function keyFromPath(path: string): string {
  return path.replace('photos/', '').replace('.jpg', '');
}

const resources: Record<string, string> = {};
for (const [globPath, url] of Object.entries(modules)) {
  // Strip the `../assets/` prefix FIRST, then apply the original transform.
  const rel = globPath.replace('../assets/', '');
  resources[keyFromPath(rel)] = url;
}

/**
 * Resolve a source-relative image path (e.g. `photos/sapitwa.jpg` or
 * `new-new-images/IMG-….jpg`) to its bundled URL. Falls back to the raw
 * input string when the path is not in the asset map.
 */
export function img(path: string): string {
  return resources[keyFromPath(path)] ?? path;
}
