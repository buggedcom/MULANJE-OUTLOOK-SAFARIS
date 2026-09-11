import { describe, it, expect, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useBreakpoint, BREAKPOINTS } from './useBreakpoint';

function setWidth(px: number) {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: px,
  });
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

afterEach(() => setWidth(1024));

describe('useBreakpoint', () => {
  it('exposes the four documented thresholds', () => {
    expect(BREAKPOINTS).toEqual({ sm: 600, md: 860, lg: 900, xl: 960 });
  });

  it('reports the current width and updates across a threshold on resize', () => {
    setWidth(1200);
    const { result } = renderHook(() => useBreakpoint());
    expect(result.current).toBe(1200);
    expect(result.current < BREAKPOINTS.md).toBe(false);

    setWidth(800);
    expect(result.current).toBe(800);
    expect(result.current < BREAKPOINTS.md).toBe(true);
  });

  it('does not rely on matchMedia', () => {
    // No matchMedia is defined in jsdom; the hook must still work.
    expect(() => {
      const { unmount } = renderHook(() => useBreakpoint());
      unmount();
    }).not.toThrow();
  });
});
