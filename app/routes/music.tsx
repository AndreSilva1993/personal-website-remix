import styles from '~/styles/travels.css';

import { json } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from '@remix-run/react';
import type { V2_MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';

import { initI18next } from '~/i18n/i18n';
import { MainContainer } from '~/components/main-container/MainContainer';
import { PageContainer } from '~/components/page-container/PageContainer';
import { getTopAlbums, getRecentTracks } from '~/api-clients/last-fm';
import { MusicAlbums } from '~/components/music/MusicAlbums';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];
export const meta: V2_MetaFunction = ({ data }) => {
  return [{ title: data.seoTitle }, { name: 'description', content: data.seoDescription }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const i18nInstance = await initI18next();
  const t = i18nInstance.getFixedT('en');

  const [topAlbums, recentTracks] = await Promise.all([getTopAlbums(), getRecentTracks()]);

  return json({
    topAlbums,
    recentTracks,
    seoTitle: t('music.seo.title'),
    seoDescription: t('music.seo.description'),
  });
};

export default function Travels() {
  const { t } = useTranslation();
  const { recentTracks, topAlbums } = useLoaderData<typeof loader>();

  return (
    <MainContainer>
      <PageContainer className="pageContainer">
        <h1 className="title">{t('music.title')}</h1>
        <MusicAlbums initialTopAlbums={topAlbums} />
      </PageContainer>
    </MainContainer>
  );
}