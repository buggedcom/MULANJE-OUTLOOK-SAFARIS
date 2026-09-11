import { describe, it, expect } from 'vitest';
import { tours, tourSlugs, isTourSlug, type Tour } from './tours';
import * as site from './site';
import { img } from '../lib/images';

const EXPECTED_SLUGS = [
  '3-day-mulanje',
  '5-day-traverse',
  '6-day-southern',
  'liwonde-safari',
  'tea-culture',
  'southern-explorer',
] as const;

describe('tours data integrity', () => {
  it('contains exactly the six expected slugs', () => {
    expect(tourSlugs).toHaveLength(6);
    expect(new Set(tourSlugs)).toEqual(new Set(EXPECTED_SLUGS));
  });

  it.each(Object.entries(tours))('tour "%s" is well-formed', (_slug, tour: Tour) => {
    expect(tour.title.length).toBeGreaterThan(0);
    expect(tour.subtitle.length).toBeGreaterThan(0);
    expect(tour.heroImg.length).toBeGreaterThan(0);
    expect(tour.overviewP.length).toBeGreaterThanOrEqual(1);
    expect(tour.days.length).toBeGreaterThanOrEqual(1);
    expect(tour.stops.length).toBeGreaterThanOrEqual(1);
    expect(tour.highlights.length).toBeGreaterThanOrEqual(1);
    expect(tour.included.length).toBeGreaterThanOrEqual(1);

    for (const stop of tour.stops) {
      expect(stop.label.length).toBeGreaterThan(0);
      expect(stop.sub.length).toBeGreaterThan(0);
    }
    for (const day of tour.days) {
      expect(typeof day.d).toBe('number');
      expect(day.t.length).toBeGreaterThan(0);
      expect(day.body.length).toBeGreaterThan(0);
      expect(day.meta.length).toBeGreaterThanOrEqual(1);
      for (const [key, label] of day.meta) {
        expect(typeof key).toBe('string');
        expect(label.length).toBeGreaterThan(0);
      }
    }
  });

  it('every related entry is a real slug', () => {
    for (const tour of Object.values(tours)) {
      for (const rel of tour.related) {
        expect(isTourSlug(rel)).toBe(true);
      }
    }
  });
});

// Collect every image path referenced by the tours + site data modules.
function collectImagePaths(): string[] {
  const paths: string[] = [];
  for (const tour of Object.values(tours)) {
    paths.push(tour.heroImg, ...tour.gallery, ...tour.days.map((d) => d.img));
  }
  paths.push(
    ...site.experiences.map((e) => e.img),
    ...site.homeTourCards.map((t) => t.img),
    ...site.toursList.map((t) => t.img),
    ...site.destinations.flatMap((d) => d.img),
    ...site.activities.flatMap((a) => a.img),
    ...site.galleryImages,
    ...site.aboutImages,
  );
  return paths;
}

describe('image paths resolve', () => {
  const paths = [...new Set(collectImagePaths())];

  it('references at least a few dozen images', () => {
    expect(paths.length).toBeGreaterThan(30);
  });

  it.each(paths)('resolves "%s" to a bundled URL string ending in .jpg', (path) => {
    const url = img(path);
    expect(typeof url).toBe('string');
    expect(url.endsWith('.jpg')).toBe(true);
    // Must have resolved through the asset map, not fallen back to the input.
    expect(url).not.toBe(path);
  });
});
