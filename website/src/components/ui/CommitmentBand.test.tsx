import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommitmentBand } from './CommitmentBand';

describe('GIVEN a commitment band', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the kicker, heading, body and chips over a resolved image', () => {
      const { container } = render(
        <CommitmentBand
          image="photos/tea-mountain.jpg"
          kicker="Our commitment"
          title="Responsible tourism that gives back"
          body="By travelling with us you help local families."
          chips={['Local guides & porters', 'Community visits']}
        />,
      );
      expect(screen.getByText('Our commitment')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Responsible tourism that gives back' })).toBeInTheDocument();
      expect(screen.getByText('Local guides & porters')).toBeInTheDocument();
      expect(container.querySelector('img')?.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    });
  });
});
