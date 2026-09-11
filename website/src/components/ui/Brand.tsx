/* Brand mark — the twin-peaks glyph from demo4/Home.dc.html mark() (L124). */

export interface BrandProps {
  variant?: 'dark' | 'light';
  size?: number;
}

export function Brand({ variant = 'dark', size = 40 }: BrandProps) {
  const light = variant === 'light';
  const sage = light ? 'var(--color-accent-2-300)' : 'var(--color-accent-2)';
  const terra = light ? 'var(--color-accent-300)' : 'var(--color-accent)';
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" aria-label="Mulanje Outlook mark">
      <path d="M18 92 L46 50 L64 76" stroke={sage} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M52 92 L82 40 L104 74" stroke={terra} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={82} cy={40} r={6} fill={terra} />
    </svg>
  );
}
