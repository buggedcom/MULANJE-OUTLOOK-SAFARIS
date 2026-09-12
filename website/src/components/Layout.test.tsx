import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import type { InitialEntry } from 'react-router-dom';
import { Layout } from './Layout';

const originalScrollTo = window.scrollTo;
let scrollToSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  scrollToSpy = vi.fn();
  window.scrollTo = scrollToSpy as unknown as typeof window.scrollTo;
});

afterEach(() => {
  window.scrollTo = originalScrollTo;
});

function renderLayoutAt(entry: InitialEntry) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="about" element={<div>about page</div>} />
          <Route index element={<div>home page</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('GIVEN a plain navigation with no scroll target', () => {
  describe('WHEN the layout mounts', () => {
    it('THEN scrolls the window to the top', () => {
      renderLayoutAt('/about');
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
    });
  });
});

describe('GIVEN a navigation carrying a scrollTo section id', () => {
  describe('WHEN the target element exists', () => {
    it('THEN scrolls that element into view instead of the top', () => {
      const section = document.createElement('div');
      section.id = 'target';
      const intoView = vi.fn();
      section.scrollIntoView = intoView;
      document.body.appendChild(section);

      renderLayoutAt({ pathname: '/', state: { scrollTo: 'target' } });

      expect(intoView).toHaveBeenCalled();
      expect(scrollToSpy).not.toHaveBeenCalledWith({ top: 0 });
      section.remove();
    });
  });

  describe('WHEN the target element is missing', () => {
    it('THEN falls back to scrolling the window to the top', () => {
      renderLayoutAt({ pathname: '/', state: { scrollTo: 'nope' } });
      expect(scrollToSpy).toHaveBeenCalledWith({ top: 0 });
    });
  });
});
