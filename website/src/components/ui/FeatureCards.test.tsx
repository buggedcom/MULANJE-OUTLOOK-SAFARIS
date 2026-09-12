import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FeatureCards } from './FeatureCards';
import type { Feature } from '../../data/site';

const items: Feature[] = [
  { title: 'Experienced local guides', body: 'Years on the mountain.', icon: ['M6 3v18'] },
  { title: 'Tailored itineraries', body: 'Shaped around you.', icon: ['M8 2v4'] },
];

describe('GIVEN a set of features', () => {
  describe('WHEN FeatureCards renders', () => {
    it('THEN shows a titled, described card with an icon for each', () => {
      const { container } = render(<FeatureCards items={items} />);
      expect(screen.getByRole('heading', { level: 4, name: 'Experienced local guides' })).toBeInTheDocument();
      expect(screen.getByText('Shaped around you.')).toBeInTheDocument();
      expect(container.querySelectorAll('svg')).toHaveLength(items.length);
    });
  });
});
