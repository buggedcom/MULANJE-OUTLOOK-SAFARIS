import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tag } from './Tag';

describe('GIVEN a Tag with an explicit variant', () => {
  describe('WHEN it renders', () => {
    it('THEN applies the matching variant class', () => {
      render(<Tag variant="accent-2">Water</Tag>);
      expect(screen.getByText('Water')).toHaveClass('tag', 'tag-accent-2');
    });
  });
});

describe('GIVEN a Tag with no variant', () => {
  describe('WHEN it renders', () => {
    it('THEN defaults to the accent variant', () => {
      render(<Tag>Default</Tag>);
      expect(screen.getByText('Default')).toHaveClass('tag', 'tag-accent');
    });
  });
});
