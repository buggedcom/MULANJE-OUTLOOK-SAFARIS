import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section
      style={{
        maxWidth: '640px',
        margin: '0 auto',
        padding: 'clamp(64px,10vw,140px) var(--space-4)',
        textAlign: 'center',
      }}
    >
      <span className="card-kicker" style={{ fontSize: '11px' }}>
        404
      </span>
      <h1 style={{ marginTop: '10px' }}>Page not found</h1>
      <p style={{ marginTop: '14px', color: 'color-mix(in srgb, var(--color-text) 72%, transparent)' }}>
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link className="btn btn-primary" to="/" style={{ padding: '13px 26px', marginTop: '8px' }}>
        Back to home
      </Link>
    </section>
  );
}
