import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Icon } from './Icon';

describe('GIVEN a single path string', () => {
  describe('WHEN the Icon renders', () => {
    it('THEN renders exactly one path with that d', () => {
      const { container } = render(<Icon d="M1 2 L3 4" />);
      const paths = container.querySelectorAll('path');
      expect(paths).toHaveLength(1);
      expect(paths[0]).toHaveAttribute('d', 'M1 2 L3 4');
    });
  });
});

describe('GIVEN an array of path strings', () => {
  describe('WHEN the Icon renders', () => {
    it('THEN renders one path per entry', () => {
      const { container } = render(<Icon d={['M0 0', 'M1 1', 'M2 2']} />);
      expect(container.querySelectorAll('path')).toHaveLength(3);
    });
  });
});

describe('GIVEN an explicit size and colour', () => {
  describe('WHEN the Icon renders', () => {
    it('THEN applies them to the svg', () => {
      const { container } = render(<Icon d="M0 0" size={30} color="#ff0000" />);
      const svg = container.querySelector('svg')!;
      expect(svg).toHaveAttribute('width', '30');
      expect(svg).toHaveAttribute('height', '30');
      expect(svg).toHaveAttribute('stroke', '#ff0000');
    });
  });
});
