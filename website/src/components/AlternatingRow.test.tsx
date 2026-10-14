import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AlternatingRow } from './AlternatingRow';

describe('GIVEN a reversed, non-first alternating row with an anchor id', () => {
  describe('WHEN it renders', () => {
    it('THEN renders both slots, the id and a scroll margin', () => {
      const { container } = render(
        <AlternatingRow
          reverse
          id="mulanje"
          scrollMargin={80}
          media={<div>media slot</div>}
          text={<div>text slot</div>}
        />,
      );
      const section = container.querySelector('#mulanje') as HTMLElement;
      expect(section).toBeInTheDocument();
      expect(section.style.scrollMarginTop).toBe('80px');
      expect(screen.getByText('media slot')).toBeInTheDocument();
      expect(screen.getByText('text slot')).toBeInTheDocument();
    });
  });
});

describe('GIVEN a first, non-reversed alternating row with no id', () => {
  describe('WHEN it renders', () => {
    it('THEN renders both slots without an id or scroll margin', () => {
      const { container } = render(<AlternatingRow first media={<div>m</div>} text={<div>t</div>} />);
      const section = container.firstElementChild as HTMLElement;
      expect(section.id).toBe('');
      expect(section.getAttribute('style')).toBeNull();
      expect(screen.getByText('m')).toBeInTheDocument();
      expect(screen.getByText('t')).toBeInTheDocument();
    });
  });
});
