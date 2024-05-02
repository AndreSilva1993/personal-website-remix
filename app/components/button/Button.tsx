import styles from './Button.module.css';

import classNames from 'classnames';
import type { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick: () => void;
}

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {children}
    </button>
  );
}
