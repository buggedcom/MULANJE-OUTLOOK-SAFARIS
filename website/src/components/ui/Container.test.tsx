import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('GIVEN a Container with default props', () => {
  describe('WHEN it renders', () => {
    it('THEN renders a <section> wrapping its children', () => {
      const { container } = render(<Container>hello</Container>);
      const el = container.firstElementChild!;
      expect(el.tagName).toBe('SECTION');
      expect(el).toHaveTextContent('hello');
    });
  });
});

describe('GIVEN a Container with a custom element and an anchor id', () => {
  describe('WHEN it renders', () => {
    it('THEN uses that element and sets the id + scroll margin', () => {
      const { container } = render(
        <Container as="div" id="enquire" scrollMargin={80}>
          x
        </Container>,
      );
      const el = container.firstElementChild as HTMLElement;
      expect(el.tagName).toBe('DIV');
      expect(el).toHaveAttribute('id', 'enquire');
      expect(el.style.scrollMarginTop).toBe('80px');
    });
  });
});

describe('GIVEN a Container with pad="none"', () => {
  describe('WHEN it renders', () => {
    it('THEN still renders its children (no vertical padding class)', () => {
      render(<Container pad="none">body</Container>);
      expect(screen.getByText('body')).toBeInTheDocument();
    });
  });
});
