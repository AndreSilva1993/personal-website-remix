import { Link } from '@remix-run/react';
import { motion } from 'framer-motion';

import type { ITravel } from './Travel.types';

interface TravelListItemProps {
  travels: ITravel[];
}

export function TravelList({ travels }: TravelListItemProps) {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      initial={{ opacity: 0, x: '-100%' }}
    >
      <ul className="travelList">
        {travels.map(({ name, image, slug }) => (
          <li className="travelListItem" key={name}>
            <Link to={`/travels/${slug}`}>
              <img src={image} alt={name} loading="lazy" className="travelListItemImage" />
              <span className="travelListItemName">{name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
