import styles from "./TravelsList.module.css";

import { motion } from "framer-motion";

import type { ITravel } from "./TravelsPage";

interface TravelListItemProps {
  travels: ITravel[];
  onTravelClick: (index: number) => void;
}

export function TravelsList({ travels, onTravelClick }: TravelListItemProps) {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      initial={{ opacity: 0, x: "-100%" }}
    >
      <ul className={styles.travelsList}>
        {travels.map(({ name, image }, index) => (
          <li className={styles.travelItem} key={name} onClick={() => onTravelClick(index)}>
            <img src={image} alt={name} className={styles.travelItemImage} />
            <span className={styles.travelName}>{name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
