import { Link } from 'react-router-dom';

export interface CtaBandProps {
  title: string;
  sub: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}

/** Accent call-to-action band, ported from ctaBand() (L537). */
export function CtaBand({ title, sub, primary, secondary }: CtaBandProps) {
  return (
    <section style={{ background: 'var(--color-accent-100)' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(48px,6vw,80px) var(--space-4)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '24px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ maxWidth: '46ch' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: 0 }}>{title}</h2>
          <p
            style={{
              fontSize: '16px',
              marginTop: '12px',
              color: 'color-mix(in srgb, var(--color-text) 75%, transparent)',
            }}
          >
            {sub}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to={primary.to} style={{ padding: '13px 24px' }}>
            {primary.label}
          </Link>
          {secondary && (
            <Link className="btn btn-secondary" to={secondary.to} style={{ padding: '13px 24px' }}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
