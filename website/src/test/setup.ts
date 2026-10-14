import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// The responsive hook (useBreakpoint) is width-based: it reads
// window.innerWidth and listens for 'resize'. It does NOT use matchMedia,
// so no matchMedia polyfill is needed here. Tests that exercise mobile
// layout set window.innerWidth and dispatch a 'resize' event.

// jsdom implements neither of these; stub as no-ops so the scroll manager
// and any scrollIntoView calls don't emit "Not implemented" noise.
window.scrollTo = (() => {}) as typeof window.scrollTo;
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {};
}

// Default network stub: requests never settle, so components that fetch on
// mount (EnquiryForm's token) cause no state updates outside act(). Tests that
// exercise the contact API stub fetch themselves.
beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
