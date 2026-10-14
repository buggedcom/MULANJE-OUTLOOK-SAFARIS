import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Checklist } from './Checklist';
import { icons } from '../../lib/icons';

describe('GIVEN a checklist of items', () => {
  describe('WHEN it renders', () => {
    it('THEN shows every item with a leading glyph', () => {
      const { container } = render(
        <Checklist items={['All transfers', 'All meals']} color="var(--color-accent-2-700)" glyph={icons.check} />,
      );
      expect(screen.getByText('All transfers')).toBeInTheDocument();
      expect(screen.getByText('All meals')).toBeInTheDocument();
      expect(container.querySelectorAll('svg')).toHaveLength(2);
    });
  });
});
