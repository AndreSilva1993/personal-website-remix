import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import type { ITravel } from './Travel.types';

import { Masonry, MasonryItem } from '~/components/masonry/Masonry';

interface TravelItemProps {
  travel: ITravel;
}

export function TravelItem({ travel }: TravelItemProps) {
  const { t } = useTranslation();
  const placesImages = travel.places
    .map(({ images, name }) => images.map(({ url, landscape }) => ({ url, landscape, name })))
    .flat();

  return (
    <motion.div
      key="city"
      initial={{ opacity: 0, x: '100%' }}
      exit={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="travelItemHeading">
        <h2 className="travelItemName">{travel.name}</h2>

        <Link className="travelItemGoBack" to="/travels">
          {t('common.goBack')}
        </Link>
      </div>
      <Masonry>
        {placesImages.map(({ url, landscape, name }, index) => (
          <MasonryItem landscape={landscape} key={index}>
            <div className={classNames('travelItemImageWrapper', { landscape })}>
              <img src={url} alt={name} loading="lazy" />
              <p className="travelItemImageTitle">{t(name)}</p>
            </div>
          </MasonryItem>
        ))}
      </Masonry>
    </motion.div>
  );
}
