import styles from "./PortfolioModal.module.css";

import { useTranslation } from "react-i18next";

import type { IPortfolioItem } from "./PortfolioPage";

import { Modal } from "~/components/modal/Modal";
import { Carousel } from "~/components/carousel/Carousel";

interface PortfolioModalProps {
  open: boolean;
  item?: IPortfolioItem;
  onClose: VoidFunction;
}

export function PortfolioModal({ item, open, onClose }: PortfolioModalProps) {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      {item && (
        <div className={styles.modalWrapper}>
          <Carousel className={styles.carousel}>
            {item.images.map((image, index) => (
              <img src={image} key={index} alt={item.name} className={styles.carouselItem} />
            ))}
          </Carousel>
          <h1 className={styles.title}>{item.name}</h1>
          <p className={styles.description}>{t(item.description)}</p>
        </div>
      )}
    </Modal>
  );
}
