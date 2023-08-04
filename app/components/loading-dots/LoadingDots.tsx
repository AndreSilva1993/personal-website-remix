import styles from './LoadingDots.module.css';

export function LoadingDots() {
  return (
    <div className={styles.dotsWrapper}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}
