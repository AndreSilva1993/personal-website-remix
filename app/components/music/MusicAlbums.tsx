'use client';

import styles from './MusicAlbums.module.css';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';

import { Button } from '~/components/button/Button';
import { Select } from '~/components/select/Select';
import { ImageGrid } from '~/components/image-grid/ImageGrid';
import { LoadingDots } from '~/components/loading-dots/LoadingDots';
import type { LastFMTimePeriod, LastFMTopAlbum } from '~/api-clients/last-fm.types';

interface MusicAlbumsProps {
  initialTopAlbums: LastFMTopAlbum[];
}

export function MusicAlbums({ initialTopAlbums }: MusicAlbumsProps) {
  const { t } = useTranslation();

  const fetcher = useFetcher<{ page: Number; topAlbums: LastFMTopAlbum[] }>();
  const [page, setPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState<LastFMTimePeriod>('overall');
  const [topAlbums, setTopAlbums] = useState(initialTopAlbums);

  useEffect(() => {
    fetcher.load(`/api/last-fm-top-albums?page=${page}&period=${timePeriod}`);
  }, [page, timePeriod]);

  useEffect(() => {
    setTopAlbums((previousTopAlbums) => {
      if (!fetcher.data) return previousTopAlbums;

      return fetcher.data.page === 1
        ? fetcher.data.topAlbums
        : [...previousTopAlbums, ...fetcher.data.topAlbums];
    });
  }, [fetcher.data]);

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topAlbumsTitle')}</h2>
        <Select
          value={timePeriod}
          className={styles.searchSelect}
          onChange={(event) => {
            setPage(1);

            setTimePeriod(event.target.value as LastFMTimePeriod);
          }}
        >
          <option value="overall">{t('music.filters.albums.allTime')}</option>
          <option value="12month">{t('music.filters.albums.last365Days')}</option>
          <option value="6month">{t('music.filters.albums.last180Days')}</option>
          <option value="3month">{t('music.filters.albums.last90Days')}</option>
          <option value="1month">{t('music.filters.albums.last30Days')}</option>
          <option value="7day">{t('music.filters.albums.last7Days')}</option>
        </Select>
      </div>

      <ImageGrid
        items={topAlbums}
        render={({ name, image }: LastFMTopAlbum, renderProps) => (
          <div className={styles.albumCoverWrapper} key={name} {...renderProps}>
            <img
              alt={name}
              src={image}
              className={styles.albumCover}
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </div>
        )}
        renderHoveringItem={({ artist, name, playCount }) => (
          <>
            <span className={styles.albumArtist}>{artist}</span>
            <span className={styles.albumName}>{name}</span>
            <span className={styles.albumPlayCount}>{t('music.playCount', { playCount })}</span>
          </>
        )}
      />

      <Button className={styles.button} onClick={() => setPage((previousPage) => previousPage + 1)}>
        {fetcher.state === 'loading' ? <LoadingDots /> : t('music.loadMoreAlbums')}
      </Button>
    </section>
  );
}
