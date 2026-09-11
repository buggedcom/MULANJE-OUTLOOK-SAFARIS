import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useBreakpoint, BREAKPOINTS } from './useBreakpoint';

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', { configurable: true, writable: true, value: px });
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

afterEach(() => setWidth(1024));

describe('GIVEN the useBreakpoint hook', () => {
  describe('WHEN the documented thresholds are read', () => {
    it('THEN exposes 600 / 860 / 900 / 960', () => {
      expect(BREAKPOINTS).toEqual({ sm: 600, md: 860, lg: 900, xl: 960 });
    });
  });
});

describe('GIVEN the viewport starts at 1200px', () => {
  describe('WHEN the hook is mounted', () => {
    it('THEN reports the current width above the md threshold', () => {
      setWidth(1200);
      const { result } = renderHook(() => useBreakpoint());
      expect(result.current).toBe(1200);
      expect(result.current < BREAKPOINTS.md).toBe(false);
    });

    describe('AND the width later drops to 800px and a resize fires', () => {
      it('THEN updates to 800 and crosses below the md threshold', () => {
        setWidth(1200);
        const { result } = renderHook(() => useBreakpoint());
        setWidth(800);
        expect(result.current).toBe(800);
        expect(result.current < BREAKPOINTS.md).toBe(true);
      });
    });
  });
});

describe('GIVEN jsdom without a matchMedia implementation', () => {
  describe('WHEN the hook is mounted and unmounted', () => {
    it('THEN does not throw', () => {
      expect(() => {
        const { unmount } = renderHook(() => useBreakpoint());
        unmount();
      }).not.toThrow();
    });
  });
});
