import { IconBadge } from './IconBadge';
import s from './InfoList.module.css';

export interface InfoItem {
  icon: readonly string[];
  label: string;
  value: string;
  /** When present, the value renders as an external link. */
  href?: string;
}

export interface InfoListProps {
  items: InfoItem[];
  badgeSize?: number;
}

/** Vertical list of icon-badge + label + value/link rows (contact details). */
export function InfoList({ items, badgeSize = 46 }: InfoListProps) {
  return (
    <div className={s.list}>
      {items.map((item) => (
        <div key={item.label} className={s.row}>
          <IconBadge icon={item.icon} size={badgeSize} />
          <span>
            <span className={s.label}>{item.label}</span>
            {item.href ? (
              <a className={s.value} href={item.href} target="_blank" rel="noopener">
                {item.value}
              </a>
            ) : (
              <span className={s.value}>{item.value}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
