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

describe('GIVEN the tours dataset', () => {
  describe('WHEN the slugs are inspected', () => {
    it('THEN there are exactly the six expected slugs', () => {
      expect(tourSlugs).toHaveLength(6);
      expect(new Set(tourSlugs)).toEqual(new Set(EXPECTED_SLUGS));
    });
  });

  describe('WHEN each related reference is checked', () => {
    it('THEN every related entry is a real slug', () => {
      for (const tour of Object.values(tours)) {
        for (const rel of tour.related) {
          expect(isTourSlug(rel)).toBe(true);
        }
      }
    });
  });
});

describe.each(Object.entries(tours))('GIVEN tour "%s"', (_slug, tour: Tour) => {
  describe('WHEN its shape is validated', () => {
    it('THEN has non-empty title, subtitle and hero image', () => {
      expect(tour.title.length).toBeGreaterThan(0);
      expect(tour.subtitle.length).toBeGreaterThan(0);
      expect(tour.heroImg.length).toBeGreaterThan(0);
    });

    it('THEN has at least one overview paragraph, stop, highlight and inclusion', () => {
      expect(tour.overviewP.length).toBeGreaterThanOrEqual(1);
      expect(tour.stops.length).toBeGreaterThanOrEqual(1);
      expect(tour.highlights.length).toBeGreaterThanOrEqual(1);
      expect(tour.included.length).toBeGreaterThanOrEqual(1);
    });

    it('THEN every stop has a label and sub', () => {
      for (const stop of tour.stops) {
        expect(stop.label.length).toBeGreaterThan(0);
        expect(stop.sub.length).toBeGreaterThan(0);
      }
    });

    it('THEN has at least one day, each with a title, body and meta rows', () => {
      expect(tour.days.length).toBeGreaterThanOrEqual(1);
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
  });
});

// Cross-data integrity guard: intentionally spans tours AND site data, so no
// separate site image test exists. See the plan's Phase 1 note.
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

describe('GIVEN every image path referenced by the tours and site data', () => {
  const paths = [...new Set(collectImagePaths())];

  describe('WHEN the set is counted', () => {
    it('THEN references at least a few dozen images', () => {
      expect(paths.length).toBeGreaterThan(30);
    });
  });

  describe('WHEN each path is resolved through img()', () => {
    it.each(paths)('THEN "%s" resolves to a bundled .jpg URL string', (path) => {
      const url = img(path);
      expect(typeof url).toBe('string');
      expect(url.endsWith('.jpg')).toBe(true);
      expect(url).not.toBe(path);
    });
  });
});
