import { cx } from '../../lib/cx';
import { Tag } from './Tag';
import s from './ChipRow.module.css';

export interface ChipRowProps {
  items: string[];
  /** `accent` = accent tag pills; `onDark` = translucent white pills for dark bands. */
  variant?: 'accent' | 'onDark';
}

/** A wrapping row of chips. */
export function ChipRow({ items, variant = 'accent' }: ChipRowProps) {
  return (
    <div className={s.row}>
      {items.map((item) =>
        variant === 'onDark' ? (
          <span key={item} className={cx('tag', s.onDark)}>
            {item}
          </span>
        ) : (
          <Tag key={item} variant="accent" className={s.accentChip}>
            {item}
          </Tag>
        ),
      )}
    </div>
  );
}
