import { useBreakpoint } from './useBreakpoint';

/** True when the viewport is narrower than `bp` (default 860). */
export function useMobile(bp = 860): boolean {
  return useBreakpoint() < bp;
}
