import '~/styles/travels.css';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { json } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import type { MetaFunction } from '@remix-run/node';

import travels from '~/components/travels/travels.json';
import { initI18next } from '~/i18n/i18n';
import { TravelItem } from '~/components/travels/TravelItem';
import { TravelList } from '~/components/travels/TravelList';
import { LeafletMap } from '~/components/travels/LeafletMap.client';
import { TravelCountries } from '~/components/travels/TravelCountries';
import { MainContainer } from '~/components/main-container/MainContainer';
import { PageContainer } from '~/components/page-container/PageContainer';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.seoTitle }, { name: 'description', content: data?.seoDescription }];
};

export const loader = async () => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  return json({
    travels,
    seoTitle: t('travels.seo.title'),
    seoDescription: t('travels.seo.description'),
  });
};

export default function Travels() {
  const { t } = useTranslation();
  const { travel: travelParam } = useParams();
  const { travels } = useLoaderData<typeof loader>();

  const selectedTravel = travels.find(({ slug }) => slug === travelParam);

  const countries = travels
    .map(({ countryCodes }) => countryCodes)
    .flat()
    .filter((country, index, array) => array.indexOf(country) === index);

  const mapCoordinates = selectedTravel
    ? selectedTravel.places.map(({ coordinates }) => coordinates as L.LatLngExpression)
    : travels
        .map(({ places }) => places.map(({ coordinates }) => coordinates as L.LatLngExpression))
        .flat();

  return (
    <MainContainer>
      <PageContainer className="pageContainer">
        <h1 className="title">{!selectedTravel ? t('travels.title') : selectedTravel.name}</h1>
        <TravelCountries
          countries={countries}
          selectedCountries={selectedTravel?.countryCodes || []}
        />

        <Suspense fallback={null}>
          <LeafletMap coordinates={mapCoordinates} />
        </Suspense>

        <AnimatePresence mode="wait">
          {!selectedTravel ? (
            <TravelList travels={travels} />
          ) : (
            <TravelItem key={selectedTravel.name} travel={selectedTravel} />
          )}
        </AnimatePresence>
      </PageContainer>
    </MainContainer>
  );
}
