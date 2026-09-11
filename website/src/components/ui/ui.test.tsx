import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Icon } from './Icon';
import { Button } from './Button';
import { Tag } from './Tag';
import { Card } from './Card';
import { PhotoZoom } from './PhotoZoom';
import { Brand } from './Brand';
import { metaIcon, META_ICON_FALLBACK } from '../../lib/icons';

describe('Icon', () => {
  it('renders one path for a string d', () => {
    const { container } = render(<Icon d="M1 2 L3 4" />);
    expect(container.querySelectorAll('path')).toHaveLength(1);
    expect(container.querySelector('path')).toHaveAttribute('d', 'M1 2 L3 4');
  });

  it('renders a path per entry for an array d', () => {
    const { container } = render(<Icon d={['M0 0', 'M1 1', 'M2 2']} />);
    expect(container.querySelectorAll('path')).toHaveLength(3);
  });
});

describe('metaIcon', () => {
  it('returns the known glyph for a defined key', () => {
    expect(metaIcon('drive')).toContain('M5 17');
  });
  it('falls back for unknown keys (car, walk)', () => {
    expect(metaIcon('car')).toBe(META_ICON_FALLBACK);
    expect(metaIcon('walk')).toBe(META_ICON_FALLBACK);
  });
});

describe('DS wrappers apply the right classes', () => {
  it('Button: primary/secondary/block', () => {
    const { rerender } = render(<Button>Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' })).toHaveClass('btn', 'btn-primary');
    rerender(
      <Button variant="secondary" block>
        Go
      </Button>,
    );
    const b = screen.getByRole('button', { name: 'Go' });
    expect(b).toHaveClass('btn', 'btn-secondary', 'btn-block');
  });

  it('Tag: variant class', () => {
    render(<Tag variant="accent-2">Water</Tag>);
    expect(screen.getByText('Water')).toHaveClass('tag', 'tag-accent-2');
  });

  it('Card: elevation class', () => {
    render(<Card elevation="md">body</Card>);
    expect(screen.getByText('body')).toHaveClass('card', 'elev-md');
  });
});

describe('PhotoZoom', () => {
  it('wraps a resolved image in .mo-zoom / .mo-photo', () => {
    const { container } = render(<PhotoZoom src="photos/sapitwa.jpg" alt="Sapitwa" />);
    expect(container.querySelector('.mo-zoom')).toBeInTheDocument();
    const im = screen.getByAltText('Sapitwa');
    expect(im).toHaveClass('mo-photo');
    expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
  });
});

describe('Brand', () => {
  it('renders the labelled mark', () => {
    render(<Brand />);
    expect(screen.getByLabelText('Mulanje Outlook mark')).toBeInTheDocument();
  });
});
