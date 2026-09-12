import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useMobile } from './useMobile';

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: px });
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

afterEach(() => setWidth(1024));

describe('GIVEN a viewport wider than the breakpoint', () => {
  describe('WHEN useMobile is read', () => {
    it('THEN reports false', () => {
      setWidth(1000);
      const { result } = renderHook(() => useMobile(860));
      expect(result.current).toBe(false);
    });
  });
});

describe('GIVEN a viewport narrower than the breakpoint', () => {
  describe('WHEN useMobile is read', () => {
    it('THEN reports true', () => {
      setWidth(700);
      const { result } = renderHook(() => useMobile(860));
      expect(result.current).toBe(true);
    });
  });
});
