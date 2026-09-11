import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// The responsive hook (useBreakpoint) is width-based: it reads
// window.innerWidth and listens for 'resize'. It does NOT use matchMedia,
// so no matchMedia polyfill is needed here. Tests that exercise mobile
// layout set window.innerWidth and dispatch a 'resize' event.

afterEach(() => {
  cleanup();
});
