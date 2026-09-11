import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Lightbox } from './Lightbox';

const images = ['photos/sapitwa.jpg', 'photos/rock-pool.jpg', 'photos/hippos.jpg'];

function setup(index = 0) {
  const onClose = vi.fn();
  const onNavigate = vi.fn();
  render(<Lightbox images={images} index={index} onClose={onClose} onNavigate={onNavigate} />);
  return { onClose, onNavigate };
}

describe('GIVEN the lightbox is open on the first image', () => {
  describe('WHEN it renders', () => {
    it('THEN shows the "1 / total" counter', () => {
      setup(0);
      expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${images.length}`);
    });
  });

  describe('WHEN the Next button is clicked', () => {
    it('THEN requests navigation to the next index', async () => {
      const user = userEvent.setup();
      const { onNavigate } = setup(0);
      await user.click(screen.getByRole('button', { name: 'Next image' }));
      expect(onNavigate).toHaveBeenCalledWith(1);
    });
  });

  describe('WHEN the Previous button is clicked', () => {
    it('THEN wraps around to the last index', async () => {
      const user = userEvent.setup();
      const { onNavigate } = setup(0);
      await user.click(screen.getByRole('button', { name: 'Previous image' }));
      expect(onNavigate).toHaveBeenCalledWith(images.length - 1);
    });
  });

  describe('WHEN ArrowRight and ArrowLeft are pressed', () => {
    it('THEN navigates next and previous respectively', async () => {
      const user = userEvent.setup();
      const { onNavigate } = setup(0);
      await user.keyboard('{ArrowRight}');
      expect(onNavigate).toHaveBeenCalledWith(1);
      await user.keyboard('{ArrowLeft}');
      expect(onNavigate).toHaveBeenCalledWith(images.length - 1);
    });
  });

  describe('WHEN the close button is clicked', () => {
    it('THEN requests close', async () => {
      const user = userEvent.setup();
      const { onClose } = setup(0);
      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('WHEN Escape is pressed', () => {
    it('THEN requests close', async () => {
      const user = userEvent.setup();
      const { onClose } = setup(0);
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalledOnce();
    });
  });

  describe('WHEN the overlay backdrop is clicked', () => {
    it('THEN requests close', () => {
      const { onClose } = setup(0);
      fireEvent.click(screen.getByRole('dialog'));
      expect(onClose).toHaveBeenCalledOnce();
    });

    describe('AND the image itself is clicked', () => {
      it('THEN does not close (click does not bubble to the backdrop)', () => {
        const { onClose } = setup(0);
        fireEvent.click(screen.getByRole('dialog').querySelector('img')!);
        expect(onClose).not.toHaveBeenCalled();
      });
    });
  });
});
