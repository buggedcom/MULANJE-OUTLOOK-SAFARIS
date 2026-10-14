import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CtaBand } from './CtaBand';
import { renderWithRouter } from '../../test/router';

describe('GIVEN a CtaBand with only a primary action', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the title, sub and the primary link', () => {
      renderWithRouter(<CtaBand title="Plan a trip" sub="Tell us more" primary={{ label: 'Enquire', to: '/contact' }} />);
      expect(screen.getByRole('heading', { name: 'Plan a trip' })).toBeInTheDocument();
      expect(screen.getByText('Tell us more')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact');
    });

    it('THEN renders no secondary link', () => {
      renderWithRouter(<CtaBand title="Plan a trip" sub="Tell us more" primary={{ label: 'Enquire', to: '/contact' }} />);
      expect(screen.getAllByRole('link')).toHaveLength(1);
    });
  });
});

describe('GIVEN a CtaBand with primary and secondary actions', () => {
  describe('WHEN it renders', () => {
    it('THEN shows both links with correct hrefs', () => {
      renderWithRouter(
        <CtaBand
          title="Plan a trip"
          sub="Tell us more"
          primary={{ label: 'Enquire', to: '/contact' }}
          secondary={{ label: 'Browse tours', to: '/tours' }}
        />,
      );
      expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact');
      expect(screen.getByRole('link', { name: 'Browse tours' })).toHaveAttribute('href', '/tours');
    });
  });
});

describe('GIVEN a CtaBand whose secondary carries router state', () => {
  describe('WHEN the secondary link is followed', () => {
    it('THEN the target route receives that state (scroll-to-enquire survives)', () => {
      let seen: unknown;
      function StateProbe() {
        seen = useLocation().state;
        return null;
      }
      render(
        <MemoryRouter initialEntries={['/somewhere']}>
          <Routes>
            <Route
              path="/somewhere"
              element={
                <CtaBand
                  title="t"
                  sub="s"
                  primary={{ label: 'Go', to: '/x' }}
                  secondary={{ label: 'Plan my trip', to: '/', state: { scrollTo: 'enquire' } }}
                />
              }
            />
            <Route path="/" element={<StateProbe />} />
          </Routes>
        </MemoryRouter>,
      );
      fireEvent.click(screen.getByRole('link', { name: 'Plan my trip' }));
      expect(seen).toEqual({ scrollTo: 'enquire' });
    });
  });
});
