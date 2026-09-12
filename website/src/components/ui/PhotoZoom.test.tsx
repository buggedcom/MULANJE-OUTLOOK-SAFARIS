import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhotoZoom } from './PhotoZoom';

describe('GIVEN a PhotoZoom with a resolvable source', () => {
  describe('WHEN it renders', () => {
    it('THEN wraps a resolved .mo-photo image in a .mo-zoom frame', () => {
      const { container } = render(<PhotoZoom src="photos/sapitwa.jpg" alt="Sapitwa" />);
      expect(container.querySelector('.mo-zoom')).toBeInTheDocument();
      const im = screen.getByAltText('Sapitwa');
      expect(im).toHaveClass('mo-photo');
      expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    });
  });

  describe('AND the washed flag is set', () => {
    it('THEN adds the washed class to the image', () => {
      render(<PhotoZoom src="photos/sapitwa.jpg" alt="Sapitwa" washed />);
      expect(screen.getByAltText('Sapitwa')).toHaveClass('mo-photo', 'washed');
    });
  });
});

describe('GIVEN a PhotoZoom with an onClick handler', () => {
  describe('WHEN the frame is clicked', () => {
    it('THEN invokes the handler', async () => {
      const onClick = vi.fn();
      const user = userEvent.setup();
      const { container } = render(<PhotoZoom src="photos/sapitwa.jpg" onClick={onClick} />);
      await user.click(container.querySelector('.mo-zoom')!);
      expect(onClick).toHaveBeenCalledOnce();
    });
  });
});
