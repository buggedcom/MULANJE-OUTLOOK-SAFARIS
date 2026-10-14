import { Icon } from './Icon';
import s from './IconBadge.module.css';

export interface IconBadgeProps {
  icon: string | readonly string[];
  /** Circle diameter in px (default 46). */
  size?: number;
  iconSize?: number;
  marginBottom?: number;
}

/** Accent-tinted circular badge holding an Icon. */
export function IconBadge({ icon, size = 46, iconSize = 19, marginBottom }: IconBadgeProps) {
  return (
    <span className={s.badge} style={{ width: size, height: size, marginBottom }}>
      <Icon d={icon} size={iconSize} />
    </span>
  );
}
