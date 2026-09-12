import { describe, it, expect, vi } from 'vitest';
import { scrollToId } from './scroll';

describe('GIVEN an element with a matching id exists', () => {
  describe('WHEN scrollToId is called', () => {
    it('THEN scrolls that element into view', () => {
      const el = document.createElement('div');
      el.id = 'target';
      const spy = vi.fn();
      el.scrollIntoView = spy;
      document.body.appendChild(el);

      scrollToId('target');

      expect(spy).toHaveBeenCalledWith({ behavior: 'smooth' });
      el.remove();
    });
  });
});

describe('GIVEN no element with that id exists', () => {
  describe('WHEN scrollToId is called', () => {
    it('THEN does nothing and does not throw', () => {
      expect(() => scrollToId('missing')).not.toThrow();
    });
  });
});
