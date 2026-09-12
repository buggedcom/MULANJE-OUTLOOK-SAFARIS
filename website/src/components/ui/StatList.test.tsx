import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatList } from './StatList';

describe('GIVEN a stat list', () => {
  describe('WHEN it renders', () => {
    it('THEN shows each value and label', () => {
      render(
        <StatList
          stats={[
            ['3,002m', 'Summit of Sapitwa'],
            ['100%', 'Locally owned & guided'],
          ]}
        />,
      );
      expect(screen.getByText('3,002m')).toBeInTheDocument();
      expect(screen.getByText('Summit of Sapitwa')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Locally owned & guided')).toBeInTheDocument();
    });
  });
});
