import { motion } from 'framer-motion';

import type { ITravel } from './Travel.types';

interface TravelListItemProps {
  travels: ITravel[];
  onTravelClick: (index: number) => void;
}

export function TravelList({ travels, onTravelClick }: TravelListItemProps) {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      initial={{ opacity: 0, x: '-100%' }}
    >
      <ul className="travelList">
        {travels.map(({ name, image }, index) => (
          <li className="travelListItem" key={name} onClick={() => onTravelClick(index)}>
            <img src={image} alt={name} className="travelListItemImage" />
            <span className="travelListItemName">{name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
