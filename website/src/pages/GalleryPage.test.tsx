import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GalleryPage } from './GalleryPage';
import { galleryImages } from '../data/site';
import { renderWithRouter } from '../test/router';

describe('GIVEN the Gallery route', () => {
  describe('WHEN the page renders', () => {
    it('THEN shows a resolved thumbnail for every gallery image', () => {
      const { container } = renderWithRouter(<GalleryPage />);
      const thumbs = container.querySelectorAll('button[aria-label^="Open image"]');
      expect(thumbs).toHaveLength(galleryImages.length);
      for (const im of container.querySelectorAll('img')) {
        expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
      }
    });

    it('THEN does not show the lightbox initially', () => {
      renderWithRouter(<GalleryPage />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('WHEN a thumbnail is clicked', () => {
    it('THEN opens the lightbox with a "1 / total" counter', async () => {
      const user = userEvent.setup();
      renderWithRouter(<GalleryPage />);
      await user.click(screen.getByRole('button', { name: 'Open image 1' }));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveTextContent(`1 / ${galleryImages.length}`);
    });

    describe('AND the lightbox is then navigated', () => {
      it('THEN Previous wraps to the last image and Next wraps back to the first', async () => {
        const user = userEvent.setup();
        renderWithRouter(<GalleryPage />);
        await user.click(screen.getByRole('button', { name: 'Open image 1' }));
        await user.click(screen.getByRole('button', { name: 'Previous image' }));
        expect(screen.getByRole('dialog')).toHaveTextContent(`${galleryImages.length} / ${galleryImages.length}`);
        await user.click(screen.getByRole('button', { name: 'Next image' }));
        expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${galleryImages.length}`);
      });
    });

    describe('AND the lightbox is then closed', () => {
      it('THEN the dialog is removed', async () => {
        const user = userEvent.setup();
        renderWithRouter(<GalleryPage />);
        await user.click(screen.getByRole('button', { name: 'Open image 1' }));
        await user.click(screen.getByRole('button', { name: 'Close' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });
});
