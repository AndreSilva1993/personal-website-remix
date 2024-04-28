import styles from '~/styles/music.css?url';

import { json, type LinksFunction, type MetaFunction } from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

import { initI18next } from '~/i18n/i18n';
import { getTopArtists } from '~/api-clients/spotify';
import { getTopAlbums, getRecentTracks } from '~/api-clients/last-fm';
import { PageContainer } from '~/components/page-container/PageContainer';
import { MusicAlbums } from '~/components/music/MusicAlbums';
import { MusicArtists } from '~/components/music/MusicArtists';
import { MusicRecentTracks } from '~/components/music/MusicRecentTracks';
import type { SpotifyTimeRange } from '~/api-clients/spotify.types';
import type { LastFMTimePeriod } from '~/api-clients/last-fm.types';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

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

export default function MusicPage() {
  const { t } = useTranslation();
  const { recentTracks, topAlbums, topArtists } = useLoaderData<typeof loader>();

  return (
    <PageContainer className="pageContainer">
      <h1 className="title">{t('music.title')}</h1>
      <MusicAlbums initialData={topAlbums} />
      <MusicArtists initialData={topArtists} />
      <MusicRecentTracks initialRecentTracks={recentTracks} />
    </PageContainer>
  );
}
