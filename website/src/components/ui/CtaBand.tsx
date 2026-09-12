import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx';
import s from './CtaBand.module.css';

export interface CtaAction {
  label: string;
  to: string;
  /** Optional router location state (e.g. { scrollTo: 'enquire' }). */
  state?: unknown;
}

export interface CtaBandProps {
  title: string;
  sub: string;
  primary: CtaAction;
  secondary?: CtaAction;
}

/** Accent call-to-action band with one or two router links. */
export function CtaBand({ title, sub, primary, secondary }: CtaBandProps) {
  return (
    <section className={s.band}>
      <div className={s.inner}>
        <div className={s.copy}>
          <h2 className={s.title}>{title}</h2>
          <p className={s.sub}>{sub}</p>
        </div>
        <div className={s.actions}>
          <Link className={cx('btn btn-primary', s.btn)} to={primary.to} state={primary.state}>
            {primary.label}
          </Link>
          {secondary && (
            <Link className={cx('btn btn-secondary', s.btn)} to={secondary.to} state={secondary.state}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
