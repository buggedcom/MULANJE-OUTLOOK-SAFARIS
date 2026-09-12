import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PageHero } from './PageHero';
import { Tag } from './Tag';
import { icons } from '../../lib/icons';
import { contact } from '../../data/site';
import { renderWithRouter } from '../../test/router';

describe('GIVEN a PageHero with image, kicker and title', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the kicker and the h1 title', () => {
      render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      expect(screen.getByText('About us')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: 'Our story' })).toBeInTheDocument();
    });

    it('THEN resolves the background image to a .jpg URL', () => {
      const { container } = render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      const im = container.querySelector('img')!;
      expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    });
  });

  describe('AND no sub or instagram link is given', () => {
    it('THEN renders neither a sub paragraph nor an Instagram button', () => {
      render(<PageHero image="photos/lake-sunset.jpg" kicker="About us" title="Our story" />);
      expect(screen.queryByRole('link', { name: /Instagram/ })).not.toBeInTheDocument();
    });
  });

  describe('AND a sub and instagram link are given', () => {
    it('THEN renders the sub text and an Instagram button with the correct href', () => {
      render(
        <PageHero image="photos/new-misty-summit.jpg" kicker="Gallery" title="Moments" sub="A glimpse of what awaits." instagramLink />,
      );
      expect(screen.getByText('A glimpse of what awaits.')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Follow us on Instagram/ })).toHaveAttribute('href', contact.instagram);
    });
  });
});

describe('GIVEN a PageHero configured as a tour-detail hero', () => {
  describe('WHEN it renders with a back link, custom tags, facts and the darker overlay', () => {
    it('THEN shows the back link, both tags and each fact, and no default kicker', () => {
      renderWithRouter(
        <PageHero
          image="photos/mulanje-view.jpg"
          title="6-Day Southern Malawi Tour"
          overlay="darker"
          backLink={{ to: '/tours', label: 'All tours' }}
          tags={
            <>
              <Tag>Signature journey</Tag>
              <Tag variant="neutral">Mulanje · Liwonde · Lake Malawi</Tag>
            </>
          }
          facts={[
            { icon: icons.calendar, label: '6 days / 5 nights' },
            { icon: icons.grade, label: 'Grade 4 · challenging' },
          ]}
        />,
      );
      expect(screen.getByRole('link', { name: /All tours/ })).toHaveAttribute('href', '/tours');
      expect(screen.getByText('Signature journey')).toBeInTheDocument();
      expect(screen.getByText('Mulanje · Liwonde · Lake Malawi')).toBeInTheDocument();
      expect(screen.getByText('6 days / 5 nights')).toBeInTheDocument();
      expect(screen.getByText('Grade 4 · challenging')).toBeInTheDocument();
    });
  });
});
