import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { GalleryPage } from './GalleryPage';
import { galleryImages } from '../data/site';

const renderGallery = () =>
  render(
    <MemoryRouter>
      <GalleryPage />
    </MemoryRouter>,
  );

describe('GalleryPage', () => {
  it('renders every gallery image as a resolved thumbnail', () => {
    const { container } = renderGallery();
    const thumbs = container.querySelectorAll('button[aria-label^="Open image"]');
    expect(thumbs).toHaveLength(galleryImages.length);
    for (const im of container.querySelectorAll('img')) {
      expect(im.getAttribute('src')?.endsWith('.jpg')).toBe(true);
    }
  });

  it('opens the lightbox on click with an n / total counter', async () => {
    const user = userEvent.setup();
    renderGallery();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open image 1' }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveTextContent(`1 / ${galleryImages.length}`);
  });

  it('navigates next/prev with wrap-around and closes', async () => {
    const user = userEvent.setup();
    renderGallery();
    await user.click(screen.getByRole('button', { name: 'Open image 1' }));
    // Prev from the first wraps to the last.
    await user.click(screen.getByRole('button', { name: 'Previous image' }));
    expect(screen.getByRole('dialog')).toHaveTextContent(`${galleryImages.length} / ${galleryImages.length}`);
    // Next wraps back to the first.
    await user.click(screen.getByRole('button', { name: 'Next image' }));
    expect(screen.getByRole('dialog')).toHaveTextContent(`1 / ${galleryImages.length}`);
    // Close.
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
