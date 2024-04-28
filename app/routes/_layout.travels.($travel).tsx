import styles from '~/styles/travels.css?url';

import { useLoaderData, useParams } from '@remix-run/react';
import {
  json,
  type LinksFunction,
  type MetaFunction,
  type LoaderFunctionArgs,
} from '@vercel/remix';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import travels from '~/components/travels/travels.json';
import { TravelItem } from '~/components/travels/TravelItem';
import { TravelList } from '~/components/travels/TravelList';
import { LeafletMap } from '~/components/travels/LeafletMap.client';
import { TravelCountries } from '~/components/travels/TravelCountries';
import { PageContainer } from '~/components/page-container/PageContainer';
import { i18n } from '~/i18n/i18n.server';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.seoTitle }, { name: 'description', content: data?.seoDescription }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const t = await i18n.getFixedT(request);

  return json({
    travels,
    seoTitle: t('travels.seo.title'),
    seoDescription: t('travels.seo.description'),
  });
};

export default function TravelsPage() {
  const { t } = useTranslation();
  const { travel: travelParam } = useParams();
  const { travels } = useLoaderData<typeof loader>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <PageContainer className="pageContainer">
      <h1 className="title">{!selectedTravel ? t('travels.title') : selectedTravel.name}</h1>
      <TravelCountries
        countries={countries}
        selectedCountries={selectedTravel?.countryCodes || []}
      />

      {isMounted && <LeafletMap coordinates={mapCoordinates} />}

      <AnimatePresence mode="wait">
        {!selectedTravel ? (
          <TravelList travels={travels} />
        ) : (
          <TravelItem key={selectedTravel.name} travel={selectedTravel} />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
