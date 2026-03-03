import type { BadgeData } from '../../types';
import styles from './Badge.module.css';

interface Props extends BadgeData {
  className?: string;
}

export function Badge({ label, variant = 'default', className }: Props) {
  const variantClass =
    variant === 'terracotta'
      ? styles.terracotta
      : variant === 'warm'
        ? styles.warm
        : variant === 'ivory'
          ? styles.ivory
          : '';
  return (
    <span className={`${styles.badge} ${variantClass} ${className || ''}`}>
      {label}
    </span>
  );
}
