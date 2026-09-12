import { describe, it, expect } from 'vitest';
import { img } from './images';

describe('GIVEN a photos/ path that exists in the asset map', () => {
  describe('WHEN img() is called', () => {
    it('THEN returns a URL string ending in .jpg', () => {
      const url = img('photos/sapitwa.jpg');
      expect(typeof url).toBe('string');
      expect(url.endsWith('.jpg')).toBe(true);
    });

    it('THEN does not return the raw input path', () => {
      expect(img('photos/sapitwa.jpg')).not.toBe('photos/sapitwa.jpg');
    });
  });
});

describe('GIVEN a prefixed gallery path that exists (new-new-new-images/)', () => {
  describe('WHEN img() is called', () => {
    it('THEN returns a resolved URL string ending in .jpg', () => {
      const url = img('new-new-new-images/nnn-1.jpg');
      expect(typeof url).toBe('string');
      expect(url.endsWith('.jpg')).toBe(true);
      expect(url).not.toBe('new-new-new-images/nnn-1.jpg');
    });
  });
});

describe('GIVEN a path that is not in the asset map', () => {
  describe('WHEN img() is called', () => {
    it('THEN returns the input string unchanged', () => {
      expect(img('photos/does-not-exist.jpg')).toBe('photos/does-not-exist.jpg');
      expect(img('totally/made-up.jpg')).toBe('totally/made-up.jpg');
    });

    it('THEN never returns a module object', () => {
      for (const p of ['photos/sapitwa.jpg', 'new-new-images', 'x.jpg']) {
        expect(typeof img(p)).toBe('string');
      }
    });
  });
});
