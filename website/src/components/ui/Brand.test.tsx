import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Brand } from './Brand';

describe('GIVEN the Brand mark', () => {
  describe('WHEN it renders with default (dark) variant', () => {
    it('THEN renders a labelled svg', () => {
      render(<Brand />);
      expect(screen.getByLabelText('Mulanje Outlook mark')).toBeInTheDocument();
    });
  });

  describe('WHEN it renders with the light variant and a custom size', () => {
    it('THEN applies the size to the svg', () => {
      render(<Brand variant="light" size={24} />);
      const svg = screen.getByLabelText('Mulanje Outlook mark');
      expect(svg).toHaveAttribute('width', '24');
      expect(svg).toHaveAttribute('height', '24');
    });
  });
});
