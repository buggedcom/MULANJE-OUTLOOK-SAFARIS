import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';

describe('GIVEN a section header with a kicker and intro', () => {
  describe('WHEN it renders (centered, large)', () => {
    it('THEN shows the kicker, heading and intro', () => {
      render(
        <SectionHeader
          kicker="Our experiences"
          title="Five ways to discover the south"
          intro="Tell us your dates."
          align="center"
          size="lg"
          maxWidth="52ch"
          kickerColor="var(--color-accent-2-700)"
        />,
      );
      expect(screen.getByText('Our experiences')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Five ways to discover the south' })).toBeInTheDocument();
      expect(screen.getByText('Tell us your dates.')).toBeInTheDocument();
    });
  });
});

describe('GIVEN a section header with only a title', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the heading but no kicker or intro', () => {
      const { container } = render(<SectionHeader title="Just a title" />);
      expect(screen.getByRole('heading', { level: 2, name: 'Just a title' })).toBeInTheDocument();
      expect(container.querySelector('.card-kicker')).toBeNull();
      expect(container.querySelectorAll('p')).toHaveLength(0);
    });
  });
});
