import s from './StatList.module.css';

export interface StatListProps {
  /** [value, label] pairs, e.g. ['3,002m', 'Summit of Sapitwa']. */
  stats: [string, string][];
}

/** Row of headline stats: a heading-font value over a small muted label. */
export function StatList({ stats }: StatListProps) {
  return (
    <div className={s.list}>
      {stats.map(([value, label]) => (
        <div key={label}>
          <div className={s.num}>{value}</div>
          <div className={s.label}>{label}</div>
        </div>
      ))}
    </div>
  );
}
