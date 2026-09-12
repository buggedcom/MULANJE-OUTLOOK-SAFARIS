import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChipRow } from './ChipRow';

describe('GIVEN an accent chip row', () => {
  describe('WHEN it renders', () => {
    it('THEN renders each item as a .tag pill', () => {
      render(<ChipRow items={['Hiking', 'Safari']} />);
      expect(screen.getByText('Hiking')).toHaveClass('tag', 'tag-accent');
      expect(screen.getByText('Safari')).toHaveClass('tag');
    });
  });
});

describe('GIVEN an on-dark chip row', () => {
  describe('WHEN it renders', () => {
    it('THEN renders each item as a translucent .tag chip', () => {
      render(<ChipRow items={['Local guides', 'Community visits']} variant="onDark" />);
      const chip = screen.getByText('Local guides');
      expect(chip).toHaveClass('tag');
      expect(chip).not.toHaveClass('tag-accent');
    });
  });
});
