import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HeroSlideshow } from './HeroSlideshow';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('HeroSlideshow', () => {
  it('advances to the next slide after the interval', () => {
    render(<HeroSlideshow />);
    expect(screen.getByText('Mount Mulanje massif')).toBeInTheDocument();

    const activeAt = () =>
      screen.getAllByTestId('hero-dot').findIndex((d) => d.getAttribute('data-active') === 'true');
    expect(activeAt()).toBe(0);

    act(() => {
      vi.advanceTimersByTime(4200);
    });
    expect(activeAt()).toBe(1);
    expect(screen.getByText('Lake Malawi shoreline')).toBeInTheDocument();
  });
});
