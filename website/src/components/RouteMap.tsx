import type { TourStop } from '../data/tours';
import s from './RouteMap.module.css';

/** SVG arc route map with numbered stops, ported from tourPage() (L450-457). */
export function RouteMap({ stops }: { stops: TourStop[] }) {
  const n = stops.length;
  const pad = 70;
  const span = 690;
  const points = stops.map((s, i) => ({
    x: Math.round(pad + (n > 1 ? (span * i) / (n - 1) : span / 2)),
    y: Math.round(120 - 52 * Math.sin((n > 1 ? i / (n - 1) : 0.5) * Math.PI)),
    n: i + 1,
    label: s.label,
    sub: s.sub,
  }));
  const pathD = 'M ' + points.map((p) => `${p.x} ${p.y}`).join(' L ');

  return (
    <svg viewBox="0 0 830 210" className={s.svg} role="img" aria-label="Route map">
      <path d={pathD} fill="none" stroke="var(--color-accent-300)" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" />
      {points.map((s) => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r={16} fill="var(--color-accent)" />
          <circle cx={s.x} cy={s.y} r={16} fill="none" stroke="var(--color-bg)" strokeWidth={3} />
          <text x={s.x} y={s.y + 5} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={15} fill="#fff">
            {s.n}
          </text>
          <text x={s.x} y={s.y + 38} textAnchor="middle" fontFamily="var(--font-heading)" fontSize={16} fill="var(--color-text)">
            {s.label}
          </text>
          <text x={s.x} y={s.y + 55} textAnchor="middle" fontFamily="var(--font-body)" fontSize={11.5} fill="color-mix(in srgb, var(--color-text) 55%, transparent)">
            {s.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
