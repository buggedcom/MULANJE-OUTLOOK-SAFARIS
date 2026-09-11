import { PageHero } from '../components/ui/PageHero';

// Full implementation (masonry + lightbox) lands in issue #12.
export function GalleryPage() {
  return (
    <PageHero
      image="photos/new-misty-summit.jpg"
      kicker="Gallery"
      title="Moments from Southern Malawi"
      sub="Peaks above the clouds, big game on the Shire, tea fields and golden lake sunsets - a glimpse of what awaits."
      instagramLink
    />
  );
}
