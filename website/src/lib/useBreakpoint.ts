import { useEffect, useState } from 'react';

/** The four width thresholds the original site branches on (state.w). */
export const BREAKPOINTS = { sm: 600, md: 860, lg: 900, xl: 960 } as const;

const initialWidth = () =>
  typeof window !== 'undefined' ? window.innerWidth : 1200;

/**
 * Live viewport width, mirroring the original `state.w` + resize listener.
 * Components branch on it directly (e.g. `w < 860`) to reproduce the
 * source's per-width layout structure. Width-based by design — it does not
 * use matchMedia, so it works in jsdom without a polyfill.
 */
export function useBreakpoint(): number {
  const [width, setWidth] = useState(initialWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
}
