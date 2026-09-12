import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ItineraryAccordion } from './ItineraryAccordion';
import { tours } from '../data/tours';
import { META_ICON_FALLBACK } from '../lib/icons';

const days = tours['3-day-mulanje'].days; // 3 days; default open is day 3 (index 2)
const day1Body = /Pick-up in Blantyre and transfer to Mulanje\. After checking in/;
const day3Body = /A pre-dawn start for the summit of Sapitwa for sunrise/;

describe('GIVEN an itinerary with day 3 open by default', () => {
  describe('WHEN it first renders', () => {
    it('THEN shows day 3 and hides day 1', () => {
      render(<ItineraryAccordion days={days} />);
      expect(screen.getByText(day3Body)).toBeInTheDocument();
      expect(screen.queryByText(day1Body)).not.toBeInTheDocument();
    });

    it('THEN renders the fallback icon for the day-3 "car" meta key', () => {
      const { container } = render(<ItineraryAccordion days={days} />);
      expect(screen.getByText('Transfer out')).toBeInTheDocument();
      expect(container.querySelector(`path[d="${META_ICON_FALLBACK}"]`)).toBeInTheDocument();
    });
  });

  describe('WHEN day 1 is opened', () => {
    it('THEN opens day 1 and collapses day 3', async () => {
      const user = userEvent.setup();
      render(<ItineraryAccordion days={days} />);
      await user.click(screen.getByRole('button', { name: 'Day 1' }));
      expect(screen.getByText(day1Body)).toBeInTheDocument();
      expect(screen.queryByText(day3Body)).not.toBeInTheDocument();
    });
  });

  describe('WHEN the already-open day is clicked again', () => {
    it('THEN collapses it, leaving no day expanded', async () => {
      const user = userEvent.setup();
      render(<ItineraryAccordion days={days} />);
      await user.click(screen.getByRole('button', { name: 'Day 3' }));
      expect(screen.queryByText(day3Body)).not.toBeInTheDocument();
      expect(screen.queryByText(day1Body)).not.toBeInTheDocument();
    });
  });
});
