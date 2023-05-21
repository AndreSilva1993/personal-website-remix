import { motion } from "framer-motion";

import type { ReactNode } from "react";

interface PageContainerProps {
  children?: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      initial={{ x: -100, opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
