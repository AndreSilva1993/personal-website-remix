import styles from './MusicAlbums.module.css';

import { useEffect, useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';

import { Button } from '~/components/button/Button';
import { Select } from '~/components/select/Select';
import { ImageGrid } from '~/components/image-grid/ImageGrid';
import { LoadingDots } from '~/components/loading-dots/LoadingDots';
import type { LastFMTimePeriod, LastFMTopAlbum } from '~/api-clients/last-fm.types';

interface MusicAlbumsProps {
  initialData: {
    page: number;
    items: LastFMTopAlbum[];
    period: LastFMTimePeriod;
  };
}

export function MusicAlbums({ initialData }: MusicAlbumsProps) {
  const { t } = useTranslation();
  const fetcher = useFetcher<{
    page: Number;
    items: LastFMTopAlbum[];
    period: LastFMTimePeriod;
  }>();

  const [topAlbums, setTopAlbums] = useState(initialData.items);

  useEffect(() => {
    setTopAlbums((previousTopAlbums) => {
      if (!fetcher.data) return previousTopAlbums;

      return fetcher.data.page === 1
        ? fetcher.data.items
        : [...previousTopAlbums, ...fetcher.data.items];
    });
  }, [fetcher.data]);

  const loadArtists = (event: ChangeEvent<HTMLSelectElement>) => {
    fetcher.load(`/api/last-fm-top-albums?page=${1}&period=${event.target.value}`);
  };

  const loadNextArtists = () => {
    const currentPage = fetcher.data ? fetcher.data.page : initialData.page;
    const currentPeriod = fetcher.data ? fetcher.data.period : initialData.period;

    fetcher.load(`/api/last-fm-top-albums?page=${currentPage + 1}&period=${currentPeriod}`);
  };

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topAlbumsTitle')}</h2>
        <Select className={styles.searchSelect} onChange={(event) => loadArtists(event)}>
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

      <Button className={styles.button} onClick={() => loadNextArtists()}>
        {fetcher.state === 'loading' ? <LoadingDots /> : t('music.loadMoreAlbums')}
      </Button>
    </section>
  );
}
