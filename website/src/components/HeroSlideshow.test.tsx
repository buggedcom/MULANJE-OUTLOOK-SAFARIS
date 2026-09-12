import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HeroSlideshow } from './HeroSlideshow';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const activeDotIndex = () =>
  screen.getAllByTestId('hero-dot').findIndex((d) => d.getAttribute('data-active') === 'true');

describe('GIVEN the hero slideshow on its first slide', () => {
  describe('WHEN it first renders', () => {
    it('THEN shows the first caption with the first dot active', () => {
      render(<HeroSlideshow />);
      expect(screen.getByText('Mount Mulanje massif')).toBeInTheDocument();
      expect(activeDotIndex()).toBe(0);
    });
  });

  describe('WHEN the rotation interval elapses', () => {
    it('THEN advances to the second slide and dot', () => {
      render(<HeroSlideshow />);
      act(() => {
        vi.advanceTimersByTime(4200);
      });
      expect(activeDotIndex()).toBe(1);
      expect(screen.getByText('Lake Malawi shoreline')).toBeInTheDocument();
    });
  });
});
