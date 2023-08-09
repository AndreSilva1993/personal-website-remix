import styles from './MusicArtists.module.css';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetcher } from '@remix-run/react';

import { Select } from '~/components/select/Select';
import { Button } from '~/components/button/Button';
import { ImageGrid } from '~/components/image-grid/ImageGrid';
import { LoadingDots } from '~/components/loading-dots/LoadingDots';

import type { SpotifyTimeRange, SpotifyTopArtist } from '~/api-clients/spotify.types';

interface MusicArtistsProps {
  initialTopArtists: SpotifyTopArtist[];
}

export function MusicArtists({ initialTopArtists }: MusicArtistsProps) {
  const { t } = useTranslation();

  const fetcher = useFetcher<{ page: Number; topArtists: SpotifyTopArtist[] }>();
  const [page, setPage] = useState(1);
  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>('long_term');
  const [topArtists, setTopArtists] = useState(initialTopArtists);

  useEffect(() => {
    fetcher.load(`/api/spotify-top-artists?page=${page}&timeRange=${timeRange}`);
  }, [page, timeRange]);

  useEffect(() => {
    setTopArtists((previousTopArtists) => {
      if (!fetcher.data) return previousTopArtists;

      return fetcher.data.page === 1
        ? fetcher.data.topArtists
        : [...previousTopArtists, ...fetcher.data.topArtists];
    });
  }, [fetcher.data]);

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topArtistsTitle')}</h2>
        <Select
          value={timeRange}
          className={styles.searchSelect}
          onChange={(event) => {
            setPage(1);
            setTimeRange(event.target.value as SpotifyTimeRange);
          }}
        >
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

      <Button className={styles.button} onClick={() => setPage((previousPage) => previousPage + 1)}>
        {fetcher.state === 'loading' ? <LoadingDots /> : t('music.loadMoreArtists')}
      </Button>
    </section>
  );
}
