import styles from './MusicArtists.module.css';

import { useState, useEffect, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';

import { Select } from '~/components/select/Select';
import { Button } from '~/components/button/Button';
import { ImageGrid } from '~/components/image-grid/ImageGrid';
import { LoadingDots } from '~/components/loading-dots/LoadingDots';

import type { SpotifyTimeRange, SpotifyTopArtist } from '~/api-clients/spotify.types';

interface MusicArtistsProps {
  initialData: {
    page: number;
    items: SpotifyTopArtist[];
    period: SpotifyTimeRange;
  };
}

export function MusicArtists({ initialData }: MusicArtistsProps) {
  const { t } = useTranslation();
  const fetcher = useFetcher<{
    page: Number;
    items: SpotifyTopArtist[];
    period: SpotifyTimeRange;
  }>();

  const [topArtists, setTopArtists] = useState(initialData.items);

  useEffect(() => {
    setTopArtists((previousTopArtists) => {
      if (!fetcher.data) return previousTopArtists;

      return fetcher.data.page === 1
        ? fetcher.data.items
        : [...previousTopArtists, ...fetcher.data.items];
    });
  }, [fetcher.data]);

  const loadArtists = (event: ChangeEvent<HTMLSelectElement>) => {
    fetcher.load(`/api/spotify-top-artists?page=${1}&period=${event.target.value}`);
  };

  const loadNextArtists = () => {
    const currentPage = fetcher.data ? fetcher.data.page : initialData.page;
    const currentPeriod = fetcher.data ? fetcher.data.period : initialData.period;

    fetcher.load(`/api/spotify-top-artists?page=${currentPage + 1}&period=${currentPeriod}`);
  };

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topArtistsTitle')}</h2>
        <Select className={styles.searchSelect} onChange={(event) => loadArtists(event)}>
          <option value="long_term">{t('music.filters.artists.longTerm')}</option>
          <option value="medium_term">{t('music.filters.artists.mediumTerm')}</option>
          <option value="short_term">{t('music.filters.artists.shortTerm')}</option>
        </Select>
      </div>

      <ImageGrid
        items={topArtists}
        render={({ image, name }: SpotifyTopArtist, renderProps) => (
          <div className={styles.artistImageWrapper} key={name} {...renderProps}>
            <img
              className={styles.artistImage}
              src={image}
              alt={name}
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 767px) 50vw, 20vw"
            />
          </div>
        )}
        renderHoveringItem={({ name, link }) => (
          <a className={styles.artistLink} href={link} target="_blank" rel="noreferrer">
            {name}
          </a>
        )}
      />

      <Button className={styles.button} onClick={() => loadNextArtists()}>
        {fetcher.state === 'loading' ? <LoadingDots /> : t('music.loadMoreArtists')}
      </Button>
    </section>
  );
}
