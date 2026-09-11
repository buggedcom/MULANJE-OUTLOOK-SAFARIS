import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Nav } from './Nav';
import { Footer } from './Footer';

/** Shape of router location state used to request a section scroll. */
export interface ScrollState {
  scrollTo?: string;
}

/**
 * On navigation: if the target carries a `scrollTo` section id, smooth-scroll
 * to that element; otherwise jump to the top. This preserves the original
 * go(route, anchor) behaviour (home#experiences / home#enquire) without a
 * naive scroll-to-top clobbering those CTAs.
 */
function useScrollManager() {
  const location = useLocation();
  const scrollTo = (location.state as ScrollState | null)?.scrollTo;

  useEffect(() => {
    if (scrollTo) {
      const el = document.getElementById(scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
    // Re-run when the path or the requested section changes.
  }, [location.pathname, scrollTo]);
}

export function Layout() {
  useScrollManager();
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
