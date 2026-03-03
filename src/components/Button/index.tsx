import { Slot } from '@radix-ui/react-slot';
import styles from './Button.module.css';

interface Props {
  variant?: 'main' | 'outline';
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

export function Button({ variant = 'main', asChild = false, children, className, ...props }: Props) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={`${styles.btn} ${variant === 'outline' ? styles.outline : styles.main} ${className || ''}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
