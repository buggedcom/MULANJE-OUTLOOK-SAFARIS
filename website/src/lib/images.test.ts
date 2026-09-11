import { describe, it, expect } from 'vitest';
import { img } from './images';

describe('img() resolver', () => {
  it('resolves a photos/ path to a URL string ending in .jpg', () => {
    const url = img('photos/sapitwa.jpg');
    expect(typeof url).toBe('string');
    expect(url.endsWith('.jpg')).toBe(true);
    // Must not be the raw input (i.e. it actually resolved via the map).
    expect(url).not.toBe('photos/sapitwa.jpg');
  });

  it('resolves a prefixed gallery path (new-new-new-images/) to a string URL', () => {
    const url = img('new-new-new-images/nnn-1.jpg');
    expect(typeof url).toBe('string');
    expect(url.endsWith('.jpg')).toBe(true);
    expect(url).not.toBe('new-new-new-images/nnn-1.jpg');
  });

  it('returns the raw input string as a fallback for unknown paths', () => {
    expect(img('photos/does-not-exist.jpg')).toBe('photos/does-not-exist.jpg');
    expect(img('totally/made-up.jpg')).toBe('totally/made-up.jpg');
  });

  it('never returns a module object', () => {
    for (const p of ['photos/sapitwa.jpg', 'new-new-images', 'x.jpg']) {
      expect(typeof img(p)).toBe('string');
    }
  });
});
