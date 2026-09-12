import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useInterval } from './useInterval';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('GIVEN a useInterval with a 1000ms delay', () => {
  describe('WHEN 3 seconds of fake time elapse', () => {
    it('THEN fires the callback three times', () => {
      const cb = vi.fn();
      renderHook(() => useInterval(cb, 1000));
      expect(cb).not.toHaveBeenCalled();
      vi.advanceTimersByTime(3000);
      expect(cb).toHaveBeenCalledTimes(3);
    });
  });

  describe('WHEN the hook is unmounted after one tick', () => {
    it('THEN stops firing', () => {
      const cb = vi.fn();
      const { unmount } = renderHook(() => useInterval(cb, 1000));
      vi.advanceTimersByTime(1000);
      expect(cb).toHaveBeenCalledTimes(1);
      unmount();
      vi.advanceTimersByTime(5000);
      expect(cb).toHaveBeenCalledTimes(1);
    });
  });
});

describe('GIVEN a useInterval with a null delay', () => {
  describe('WHEN fake time elapses', () => {
    it('THEN never fires the callback', () => {
      const cb = vi.fn();
      renderHook(() => useInterval(cb, null));
      vi.advanceTimersByTime(5000);
      expect(cb).not.toHaveBeenCalled();
    });
  });
});
