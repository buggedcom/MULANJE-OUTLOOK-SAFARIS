import type { ReactElement } from 'react';
import { render, type RenderResult } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

/** Render a unit under a MemoryRouter at an optional initial route. */
export function renderWithRouter(ui: ReactElement, { route = '/' }: { route?: string } = {}): RenderResult {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

/** Probe that surfaces the current pathname for route-change assertions. */
export function LocationProbe() {
  const { pathname } = useLocation();
  return <div data-testid="location">{pathname}</div>;
}

/**
 * Render `ui` alongside a catch-all route that renders LocationProbe, so a
 * click that changes the route is observable via the "location" test id.
 */
export function renderWithLocation(ui: ReactElement, { route = '/' }: { route?: string } = {}): RenderResult {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
      <Routes>
        <Route path="*" element={<LocationProbe />} />
      </Routes>
    </MemoryRouter>,
  );
}
