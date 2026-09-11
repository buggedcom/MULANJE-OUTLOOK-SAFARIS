import { useEffect, useRef } from 'react';

/**
 * Declarative setInterval. Pass `delay = null` to pause. The latest
 * callback is always invoked without resetting the timer.
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const saved = useRef(callback);

  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
