import styles from './PortfolioItem.module.css';

import classNames from 'classnames';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAnimation, motion } from 'framer-motion';

interface PortfolioItemProps {
  index: number;
  name: string;
  image: string;
  logoImage: string;
  onClick: (index: number) => void;
}

type AnimationDirection = 'left' | 'right' | 'top' | 'bottom';

export function PortfolioItem({ name, image, index, logoImage, onClick }: PortfolioItemProps) {
  const { t } = useTranslation();
  const controls = useAnimation();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  function getAnimationDirection({ clientX, clientY }: React.MouseEvent) {
    if (!wrapperRef.current) return {};

    const { x, y, height, width } = wrapperRef.current.getBoundingClientRect();

    const elementBounds: Array<{
      value: number;
      direction: AnimationDirection;
    }> = [
      { direction: 'top', value: y - clientY },
      { direction: 'left', value: x - clientX },
      { direction: 'right', value: x + width - clientX },
      { direction: 'bottom', value: y + height - clientY },
    ];

    const { direction } = elementBounds.reduce((closestBound, bound) =>
      Math.abs(bound.value) < Math.abs(closestBound.value) ? bound : closestBound
    );

    switch (direction) {
      case 'right':
        return { x: '100%', y: 0 };
      case 'top':
        return { y: '-100%', x: 0 };
      case 'bottom':
        return { y: '100%', x: 0 };
      case 'left':
      default:
        return { x: '-100%', y: 0 };
    }
  }

  function handleItemClick() {
    onClick(index);
  }

  function handleItemMouseEnter(event: React.MouseEvent<HTMLElement>) {
    setIsHovering(true);
    controls.set(getAnimationDirection(event));
    controls.start({ x: 0, y: 0 });
  }

  function handleItemMouseLeave(event: React.MouseEvent<HTMLElement>) {
    setIsHovering(false);
    controls.start(getAnimationDirection(event));
  }

  return (
    <motion.div
      className={styles.itemWrapper}
      ref={wrapperRef}
      onMouseLeave={handleItemMouseLeave}
      onMouseEnter={handleItemMouseEnter}
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: '-10rem', opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.25 * index }}
    >
      <img
        src={image}
        alt={t(name) || ''}
        className={classNames(styles.itemImage, {
          [styles.itemImageHovering]: isHovering,
        })}
      />

      <motion.div
        animate={controls}
        onClick={handleItemClick}
        className={styles.itemOverlayWrapper}
        initial={{ x: '-100%', y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <img src={logoImage} alt={t(name) || ''} className={styles.itemOverlayImage} />
      </motion.div>
    </motion.div>
  );
}
