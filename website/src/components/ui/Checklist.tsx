import { Icon } from './Icon';
import s from './Checklist.module.css';

export interface ChecklistProps {
  items: string[];
  /** Colour of the leading glyph. */
  color: string;
  /** SVG path(s) for the leading glyph (e.g. a check or plus). */
  glyph: string | readonly string[];
}

/** Vertical list of icon + text rows (tour inclusions / highlights). */
export function Checklist({ items, color, glyph }: ChecklistProps) {
  return (
    <div className={s.list}>
      {items.map((item) => (
        <div key={item} className={s.row}>
          <span className={s.icon} style={{ color }}>
            <Icon d={glyph} size={15} />
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
