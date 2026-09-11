/* Named SVG path-`d` sets reused across the site, transcribed from the
   inline this.ic([...]) calls in demo4/Home.dc.html. Each value is an array
   of path `d` strings rendered by <Icon>. */

export const icons = {
  instagram: [
    'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z',
    'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z',
    'M17.5 6.5h.01',
  ],
  tripadvisor: [
    'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z',
    'M8.5 11.5h.01',
    'M15.5 11.5h.01',
    'M9 15c.8.7 1.9 1 3 1s2.2-.3 3-1',
  ],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['M18 6 6 18M6 6l12 12'],
  chevronDown: ['m6 9 6 6 6-6'],
  chevronLeft: ['M15 18l-6-6 6-6'],
  chevronRight: ['M9 18l6-6-6-6'],
  arrowRight: ['M5 12h14', 'm12 5 7 7-7 7'],
  arrowLeftLong: ['M19 12H5', 'm12 19-7-7 7-7'],
  pin: ['M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z'],
  pinDot: [
    'M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z',
    'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  ],
  clock: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2'],
  phone: [
    'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z',
  ],
  envelope: ['M2 4h20v16H2z', 'm22 7-10 5L2 7'],
  check: ['M20 6 9 17l-5-5'],
  plus: ['M12 5v14M5 12h14'],
  layers: ['M12 2 2 7l10 5 10-5-10-5z', 'm2 17 10 5 10-5M2 12l10 5 10-5'],
  calendar: ['M3 4h18v18H3z', 'M8 2v4M16 2v4', 'M3 10h18'],
  grade: ['m8 3 4 8 5-5 5 15H2L8 3z'],
  users: [
    'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2',
    'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
    'M22 21v-2a4 4 0 0 0-3-3.87',
  ],
} as const;

export type IconName = keyof typeof icons;

/* Itinerary day-meta icons (demo4 metaIcon(), L464). Unknown keys such as
   `car` and `walk` deliberately fall back to a single vertical stroke. */
const META_ICONS: Record<string, string> = {
  drive: 'M5 17h12l1-5H4l1 5zM6 12l1.5-4h9L18 12',
  hike: 'm8 3 4 8 5-5 5 15H2L8 3z',
  meal: 'M3 2v7c0 1.1.9 2 2 2h0V2M7 2v20M11 2v7c0 1.1-.9 2-2 2M18 2c-1.5 0-3 2-3 5s1 4 1 4v11',
  bed: 'M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3',
};

export const META_ICON_FALLBACK = 'M12 2v20';

export function metaIcon(key: string): string {
  return META_ICONS[key] ?? META_ICON_FALLBACK;
}
