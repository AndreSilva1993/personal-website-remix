import styles from './ImageGrid.module.css';

import { useRef, useState, ReactElement, RefCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGridProps {
  items: any[];
  aspectRatio?: string;
  render: (
    item: any,
    itemProps: { onMouseEnter: () => void; ref: RefCallback<HTMLDivElement> }
  ) => ReactElement;
  renderHoveringItem: (hoveringItem: any) => ReactElement;
}

export function ImageGrid({
  items,
  aspectRatio = '1',
  render,
  renderHoveringItem,
}: ImageGridProps) {
  const itemsWrappersRef = useRef<HTMLElement[]>([]);

  const [hoveringItem, setHoveringItem] = useState();
  const [{ x, y }, setOverlayPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  function handleGridMouseLeave() {
    setHoveringItem(undefined);
  }

  function handleItemMouseEnter(index: number) {
    const { offsetLeft, offsetTop } = itemsWrappersRef.current[index];

    setHoveringItem(items[index]);
    setOverlayPosition({ x: offsetLeft, y: offsetTop });
  }

  return (
    <div className={styles.gridWrapper} onMouseLeave={handleGridMouseLeave}>
      {items.map((item: any, index: number) =>
        render(item, {
          onMouseEnter: () => handleItemMouseEnter(index),
          ref: (ref: HTMLElement | null) => {
            if (ref) {
              itemsWrappersRef.current[index] = ref;
            }
          },
        })
      )}

      <AnimatePresence>
        {hoveringItem && (
          <motion.div
            className={styles.gridItem}
            style={{ aspectRatio }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x, y }}
            animate={{ opacity: 1, x, y }}
            transition={{ ease: 'easeOut', duration: 0.25 }}
          >
            {renderHoveringItem(hoveringItem)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
