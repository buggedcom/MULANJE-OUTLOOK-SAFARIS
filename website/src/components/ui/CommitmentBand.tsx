import { cx } from '../../lib/cx';
import { img } from '../../lib/images';
import { ChipRow } from './ChipRow';
import s from './CommitmentBand.module.css';

export interface CommitmentBandProps {
  image: string;
  kicker: string;
  title: string;
  body: string;
  chips: string[];
}

/** Full-bleed image band with a diagonal scrim, white copy and chips. */
export function CommitmentBand({ image, kicker, title, body, chips }: CommitmentBandProps) {
  return (
    <section className="mo-zoom" style={{ position: 'relative', overflow: 'hidden' }}>
      <img className={cx('mo-photo', s.img)} src={img(image)} alt="" />
      <div className={s.overlay} />
      <div className={s.inner}>
        <div className={s.content}>
          <span className={cx('card-kicker', s.kicker)}>{kicker}</span>
          <h2 className={s.title}>{title}</h2>
          <p className={s.body}>{body}</p>
          <div className={s.chips}>
            <ChipRow items={chips} variant="onDark" />
          </div>
        </div>
      </div>
    </section>
  );
}
