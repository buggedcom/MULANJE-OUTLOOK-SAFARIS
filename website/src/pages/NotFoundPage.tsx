import { Link } from 'react-router-dom';
import { cx } from '../lib/cx';
import s from './NotFoundPage.module.css';

export function NotFoundPage() {
  return (
    <section className={s.root}>
      <span className={cx('card-kicker', s.kicker)}>404</span>
      <h1 className={s.title}>Page not found</h1>
      <p className={s.text}>The page you’re looking for doesn’t exist or has moved.</p>
      <Link className={cx('btn btn-primary', s.btn)} to="/">
        Back to home
      </Link>
    </section>
  );
}
