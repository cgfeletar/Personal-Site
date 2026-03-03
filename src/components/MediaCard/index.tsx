import type { MediaItem, ThumbGradient } from '../../types';
import styles from './MediaCard.module.css';

interface Props {
  item: MediaItem;
}

const THUMB_CLASSES: Record<ThumbGradient, string> = {
  sage: styles.thumbSage,
  dark: styles.thumbDark,
  tc: styles.thumbTc,
  rose: styles.thumbRose,
};

const SHOW_COLORS: Record<ThumbGradient, string> = {
  sage: 'var(--sage-dark)',
  dark: 'var(--stone)',
  tc: '#9e4e2e',
  rose: '#7a5a5a',
};

export function MediaCard({ item }: Props) {
  const { type, gradient, showName, title, desc, date, href } = item;
  const isPodcast = type === 'podcast';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      aria-label={`${isPodcast ? 'Listen to' : 'Watch'}: ${title}`}
    >
      <div className={`${styles.thumb} ${THUMB_CLASSES[gradient]}`}>
        {item.thumb && (
          <img src={item.thumb} alt="" className={styles.thumbImg} />
        )}
        {!item.thumb && (
          <span className={styles.thumbIcon} aria-hidden="true">
            {isPodcast ? '🎙' : '▶️'}
          </span>
        )}
        <span className={styles.typeBadge} aria-hidden="true">{isPodcast ? 'Podcast' : 'YouTube'}</span>
        <div className={styles.playBtn} aria-hidden="true">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      <div className={styles.body}>
        <span className={styles.show} style={{ color: SHOW_COLORS[gradient] }}>
          {showName}
        </span>
        <div className={styles.title}>{title}</div>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.footer}>
          <span className={styles.date}>{date}</span>
          <span className={styles.arrow} aria-hidden="true">{isPodcast ? 'Listen →' : 'Watch →'}</span>
        </div>
      </div>
    </a>
  );
}
