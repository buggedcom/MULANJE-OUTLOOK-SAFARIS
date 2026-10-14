import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoList, type InfoItem } from './InfoList';
import { icons } from '../../lib/icons';

const items: InfoItem[] = [
  { icon: icons.phone, label: 'WhatsApp', value: '+265 991 415 792', href: 'https://wa.me/265991415792' },
  { icon: icons.pinDot, label: 'Based in', value: 'Likhubula, Mulanje' },
];

describe('GIVEN an info list with a linked and a plain item', () => {
  describe('WHEN it renders', () => {
    it('THEN renders the linked value as an external anchor', () => {
      render(<InfoList items={items} />);
      const link = screen.getByRole('link', { name: '+265 991 415 792' });
      expect(link).toHaveAttribute('href', 'https://wa.me/265991415792');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('THEN renders the plain value as text, not a link', () => {
      render(<InfoList items={items} />);
      expect(screen.getByText('Likhubula, Mulanje')).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Likhubula, Mulanje' })).not.toBeInTheDocument();
    });

    it('THEN shows every label', () => {
      render(<InfoList items={items} />);
      expect(screen.getByText('WhatsApp')).toBeInTheDocument();
      expect(screen.getByText('Based in')).toBeInTheDocument();
    });
  });
});
