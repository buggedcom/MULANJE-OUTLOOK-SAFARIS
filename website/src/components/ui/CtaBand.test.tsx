import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { CtaBand } from './CtaBand';
import { renderWithRouter } from '../../test/router';

describe('GIVEN a CtaBand with only a primary action', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the title, sub and the primary link', () => {
      renderWithRouter(<CtaBand title="Plan a trip" sub="Tell us more" primary={{ label: 'Enquire', to: '/contact' }} />);
      expect(screen.getByRole('heading', { name: 'Plan a trip' })).toBeInTheDocument();
      expect(screen.getByText('Tell us more')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact');
    });

    it('THEN renders no secondary link', () => {
      renderWithRouter(<CtaBand title="Plan a trip" sub="Tell us more" primary={{ label: 'Enquire', to: '/contact' }} />);
      expect(screen.getAllByRole('link')).toHaveLength(1);
    });
  });
});

describe('GIVEN a CtaBand with primary and secondary actions', () => {
  describe('WHEN it renders', () => {
    it('THEN shows both links with correct hrefs', () => {
      renderWithRouter(
        <CtaBand
          title="Plan a trip"
          sub="Tell us more"
          primary={{ label: 'Enquire', to: '/contact' }}
          secondary={{ label: 'Browse tours', to: '/tours' }}
        />,
      );
      expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact');
      expect(screen.getByRole('link', { name: 'Browse tours' })).toHaveAttribute('href', '/tours');
    });
  });
});
