/** Ink text at a given opacity — the site's recurring muted-text mix. */
export const muted = (pct: number) =>
  `color-mix(in srgb, var(--color-text) ${pct}%, transparent)`;

/** Standard page container: centred, max 1200px, responsive padding. */
export const container = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: 'clamp(48px,6vw,84px) var(--space-4)',
} as const;
