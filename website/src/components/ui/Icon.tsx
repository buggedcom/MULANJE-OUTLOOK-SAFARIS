/* Data-driven icon: renders one or more SVG paths from `d` strings, mirroring
   the original this.ic(d, size, color). No icon library — icon shapes live in
   data (lib/icons.ts, tour day-meta), so a component wrapper is all we need. */

export interface IconProps {
  /** One path `d` string, or several (multi-path glyphs). */
  d: string | readonly string[];
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ d, size = 18, color = 'currentColor', strokeWidth = 2.75 }: IconProps) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
