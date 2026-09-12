import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('GIVEN a Card with an elevation', () => {
  describe('WHEN it renders', () => {
    it('THEN applies the card and elevation classes', () => {
      render(<Card elevation="md">body</Card>);
      expect(screen.getByText('body')).toHaveClass('card', 'elev-md');
    });
  });
});

describe('GIVEN a Card with no elevation', () => {
  describe('WHEN it renders', () => {
    it('THEN applies only the card class', () => {
      render(<Card>body</Card>);
      const el = screen.getByText('body');
      expect(el).toHaveClass('card');
      expect(el.className).not.toMatch(/elev-/);
    });
  });
});
