import styles from './TravelsPage.module.css';
import travelsJSON from './travels.json';

import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useState, Suspense, useEffect } from 'react';
import { useLocation, useSearchParams } from '@remix-run/react';

import { LeafletMap } from './LeafletMap.client';
import { TravelItem } from './TravelItem';
import { TravelsList } from './TravelsList';
import { TravelCountries } from './TravelCountries';
import { PageContainer } from '~/components/page-container/PageContainer';
import { MainContainer } from '~/components/main-container/MainContainer';

export interface ITravel {
  slug: string;
  name: string;
  image: string;
  countryCodes: string[];
  places: ITravelPlace[];
}

export interface ITravelPlace {
  name: string;
  coordinates: number[];
  images: Array<{ url: string; landscape: boolean }>;
}

export function TravelsPage() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const travels = useMemo<ITravel[]>(() => travelsJSON.travels, []);
  const countries = useMemo<string[]>(() => travelsJSON.countries, []);

  const [selectedTravel, setSelectedTravel] = useState<ITravel | undefined>(() => {
    const initialSelectedTravel = searchParams.get('travel') || '';

    return travelsJSON.travels.find(({ slug }) => slug === initialSelectedTravel);
  });

  const mapCoordinates = useMemo(() => {
    return selectedTravel
      ? selectedTravel.places.map(({ coordinates }) => coordinates as L.LatLngExpression)
      : travels
          .map(({ places }) => places.map(({ coordinates }) => coordinates as L.LatLngExpression))
          .flat();
  }, [selectedTravel]);

  function handleTravelClick(index: number) {
    setSelectedTravel(travels[index]);
  }

  const selectedCountries = selectedTravel?.countryCodes || [];

  return (
    <MainContainer>
      <PageContainer className={styles.pageContainer}>
        <h1 className={styles.title}>
          {!selectedTravel ? t('travels.title') : selectedTravel.name}
        </h1>
        <TravelCountries countries={countries} selectedCountries={selectedCountries} />

        <Suspense fallback={null}>
          <LeafletMap coordinates={mapCoordinates} />
        </Suspense>

        <AnimatePresence mode="wait">
          {!selectedTravel ? (
            <TravelsList travels={travels} onTravelClick={handleTravelClick} />
          ) : (
            <TravelItem
              key={selectedTravel.name}
              travel={selectedTravel}
              onGoBackButtonClick={() => setSelectedTravel(undefined)}
            />
          )}
        </AnimatePresence>
      </PageContainer>
    </MainContainer>
  );
}
