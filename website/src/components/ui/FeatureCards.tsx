import { Card } from './Card';
import { IconBadge } from './IconBadge';
import type { Feature } from '../../data/site';
import s from './FeatureCards.module.css';

/** Responsive grid of "why travel with us" feature cards (icon + title + body). */
export function FeatureCards({ items }: { items: Feature[] }) {
  return (
    <div className={s.grid}>
      {items.map((f) => (
        <Card key={f.title} elevation="sm" className={s.card}>
          <IconBadge icon={f.icon} size={48} iconSize={22} marginBottom={16} />
          <h4 className={s.title}>{f.title}</h4>
          <p className={s.body}>{f.body}</p>
        </Card>
      ))}
    </div>
  );
}
