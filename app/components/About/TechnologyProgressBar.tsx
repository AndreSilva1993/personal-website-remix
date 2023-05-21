import styles from "./TechnologyProgressBar.module.css";

import classNames from "classnames";
import { motion } from "framer-motion";

export function TechnologyProgressBar({ value, delay = 0, className }: TechnologyProgressBarProps) {
  return (
    <div className={classNames(styles.progressBarWrapper, className)}>
      <motion.div
        className={styles.progressBar}
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

interface TechnologyProgressBarProps {
  value: number;
  delay?: number;
  className?: string;
}
