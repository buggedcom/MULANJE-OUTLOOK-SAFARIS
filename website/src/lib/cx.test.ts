import { describe, it, expect } from 'vitest';
import { cx } from './cx';

describe('GIVEN a mix of truthy and falsey class-name arguments', () => {
  describe('WHEN cx joins them', () => {
    it('THEN keeps only the truthy names, space-separated', () => {
      expect(cx('a', false, 'b', null, undefined, 'c')).toBe('a b c');
    });

    it('THEN drops empty strings', () => {
      expect(cx('a', '', 'b')).toBe('a b');
    });
  });
});

describe('GIVEN no arguments', () => {
  describe('WHEN cx is called', () => {
    it('THEN returns an empty string', () => {
      expect(cx()).toBe('');
    });
  });
});

describe('GIVEN only falsey arguments', () => {
  describe('WHEN cx is called', () => {
    it('THEN returns an empty string', () => {
      expect(cx(false, null, undefined, '')).toBe('');
    });
  });
});
