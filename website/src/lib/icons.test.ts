import { describe, it, expect } from 'vitest';
import { icons, metaIcon, META_ICON_FALLBACK } from './icons';

describe('GIVEN the metaIcon lookup', () => {
  describe('WHEN called with a known day-meta key', () => {
    it('THEN returns that glyph', () => {
      expect(metaIcon('drive')).toContain('M5 17');
      expect(metaIcon('hike')).toContain('m8 3');
    });
  });

  describe('WHEN called with a key that has no entry (car, walk)', () => {
    it('THEN returns the vertical-stroke fallback', () => {
      expect(metaIcon('car')).toBe(META_ICON_FALLBACK);
      expect(metaIcon('walk')).toBe(META_ICON_FALLBACK);
    });
  });

  describe('WHEN called with an entirely unknown key', () => {
    it('THEN returns the fallback', () => {
      expect(metaIcon('definitely-not-a-key')).toBe(META_ICON_FALLBACK);
    });
  });
});

describe('GIVEN the named icons map', () => {
  describe('WHEN every entry is inspected', () => {
    it('THEN each is a non-empty array of non-empty path strings', () => {
      for (const [name, paths] of Object.entries(icons)) {
        expect(Array.isArray(paths), `${name} is an array`).toBe(true);
        expect(paths.length, `${name} has paths`).toBeGreaterThan(0);
        for (const p of paths) {
          expect(typeof p).toBe('string');
          expect(p.length).toBeGreaterThan(0);
        }
      }
    });
  });
});
