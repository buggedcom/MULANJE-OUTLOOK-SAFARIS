import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';

describe('GIVEN a Section with a background', () => {
  describe('WHEN it renders', () => {
    it('THEN wraps a div container in a background-tinted section', () => {
      const { container } = render(<Section background="var(--color-surface)">body</Section>);
      const section = container.firstElementChild as HTMLElement;
      expect(section.tagName).toBe('SECTION');
      expect(section.style.background).toBe('var(--color-surface)');
      expect(screen.getByText('body')).toBeInTheDocument();
    });
  });
});

describe('GIVEN a Section with no background', () => {
  describe('WHEN it renders', () => {
    it('THEN applies no inline background', () => {
      const { container } = render(<Section>body</Section>);
      const section = container.firstElementChild as HTMLElement;
      expect(section.getAttribute('style')).toBeNull();
    });
  });
});
