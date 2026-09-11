import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouteMap } from './RouteMap';
import type { TourStop } from '../data/tours';

const stops: TourStop[] = [
  { label: 'Likhubula', sub: 'Base' },
  { label: 'Chisepho', sub: 'Hut' },
  { label: 'Sapitwa', sub: '3,002m' },
];

describe('GIVEN a list of tour stops', () => {
  describe('WHEN the route map renders', () => {
    it('THEN renders a numbered node for each stop', () => {
      render(<RouteMap stops={stops} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('THEN renders each stop label and sub', () => {
      render(<RouteMap stops={stops} />);
      for (const s of stops) {
        expect(screen.getByText(s.label)).toBeInTheDocument();
        expect(screen.getByText(s.sub)).toBeInTheDocument();
      }
    });

    it('THEN exposes an accessible route-map image', () => {
      render(<RouteMap stops={stops} />);
      expect(screen.getByRole('img', { name: 'Route map' })).toBeInTheDocument();
    });
  });
});

describe('GIVEN a single stop', () => {
  describe('WHEN the route map renders', () => {
    it('THEN centres it without a divide-by-zero', () => {
      render(<RouteMap stops={[{ label: 'Only', sub: 'Stop' }]} />);
      const node = screen.getByText('1').closest('g')!;
      const circle = node.querySelector('circle')!;
      // pad(70) + span(690)/2 = 415
      expect(circle).toHaveAttribute('cx', '415');
    });
  });
});
