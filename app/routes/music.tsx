import styles from '~/styles/music.css';

import { json } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';
import type { MetaFunction, LinksFunction } from '@remix-run/node';

import { initI18next } from '~/i18n/i18n';
import { getTopArtists } from '~/api-clients/spotify';
import { getTopAlbums, getRecentTracks } from '~/api-clients/last-fm';
import { MainContainer } from '~/components/main-container/MainContainer';
import { PageContainer } from '~/components/page-container/PageContainer';
import { MusicAlbums } from '~/components/music/MusicAlbums';
import { MusicArtists } from '~/components/music/MusicArtists';
import { MusicRecentTracks } from '~/components/music/MusicRecentTracks';
import type { SpotifyTimeRange } from '~/api-clients/spotify.types';
import type { LastFMTimePeriod } from '~/api-clients/last-fm.types';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.seoTitle }, { name: 'description', content: data?.seoDescription }];
};

export const loader = async () => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  const [topArtists, topAlbums, recentTracks] = await Promise.all([
    getTopArtists(),
    getTopAlbums(),
    getRecentTracks(),
  ]);

  return json({
    recentTracks,
    topAlbums: {
      page: 1,
      items: topAlbums,
      period: 'overall' as LastFMTimePeriod,
    },
    topArtists: {
      page: 1,
      items: topArtists,
      period: 'long_term' as SpotifyTimeRange,
    },
    seoTitle: t('music.seo.title'),
    seoDescription: t('music.seo.description'),
  });
};

export default function Travels() {
  const { t } = useTranslation();
  const { recentTracks, topAlbums, topArtists } = useLoaderData<typeof loader>();

  return (
    <MainContainer>
      <PageContainer className="pageContainer">
        <h1 className="title">{t('music.title')}</h1>
        <MusicAlbums initialData={topAlbums} />
        <MusicArtists initialData={topArtists} />
        <MusicRecentTracks initialRecentTracks={recentTracks} />
      </PageContainer>
    </MainContainer>
  );
}
