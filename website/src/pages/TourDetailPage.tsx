import { useParams } from 'react-router-dom';
import { tours, isTourSlug } from '../data/tours';
import { NotFoundPage } from './NotFoundPage';

// Full implementation lands in issue #11.
export function TourDetailPage() {
  const { slug } = useParams();
  if (!slug || !isTourSlug(slug)) return <NotFoundPage />;
  const tour = tours[slug];
  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(40px,6vw,86px) var(--space-4)' }}>
      <h1>{tour.title}</h1>
    </section>
  );
}
