import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { IconBadge } from './IconBadge';
import { icons } from '../../lib/icons';

describe('GIVEN an icon badge', () => {
  describe('WHEN it renders with a size and marginBottom', () => {
    it('THEN sizes the circle and applies the margin', () => {
      const { container } = render(<IconBadge icon={icons.phone} size={48} marginBottom={16} />);
      const badge = container.firstElementChild as HTMLElement;
      expect(badge.style.width).toBe('48px');
      expect(badge.style.height).toBe('48px');
      expect(badge.style.marginBottom).toBe('16px');
      expect(badge.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('WHEN it renders with defaults', () => {
    it('THEN uses the default 46px size and no margin', () => {
      const { container } = render(<IconBadge icon={icons.envelope} />);
      const badge = container.firstElementChild as HTMLElement;
      expect(badge.style.width).toBe('46px');
      expect(badge.style.marginBottom).toBe('');
    });
  });
});
