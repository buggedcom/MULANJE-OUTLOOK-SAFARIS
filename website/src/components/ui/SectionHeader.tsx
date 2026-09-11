import type { CSSProperties } from 'react';

export interface SectionHeaderProps {
  kicker: string;
  title: string;
  intro?: string;
  kickerColor?: string;
  titleStyle?: CSSProperties;
  style?: CSSProperties;
}

/** Kicker + heading (+ optional intro paragraph) used to open sections. */
export function SectionHeader({
  kicker,
  title,
  intro,
  kickerColor,
  titleStyle,
  style,
}: SectionHeaderProps) {
  return (
    <div style={style}>
      <span className="card-kicker" style={{ fontSize: '11px', color: kickerColor }}>
        {kicker}
      </span>
      <h2 style={{ fontSize: 'clamp(28px,3.4vw,40px)', margin: '10px 0 0', ...titleStyle }}>
        {title}
      </h2>
      {intro && (
        <p
          style={{
            fontSize: '16px',
            marginTop: '14px',
            color: 'color-mix(in srgb, var(--color-text) 75%, transparent)',
          }}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
