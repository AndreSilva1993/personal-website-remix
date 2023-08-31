import styles from './MusicArtists.module.css';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInfiniteQuery } from '@tanstack/react-query';

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

  const [timeRange, setTimeRange] = useState<SpotifyTimeRange>('long_term');

  const {
    data = { pages: [] },
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery<{ page: number; topArtists: SpotifyTopArtist[] }>({
    queryKey: ['music-top-artists', timeRange],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(
        `/api/spotify-top-artists?page=${pageParam}&timeRange=${timeRange}`
      );

      return response.json();
    },
    getNextPageParam: ({ page }) => page + 1,
    initialData: {
      pageParams: [],
      pages: [{ page: 1, topArtists: initialTopArtists }],
    },
  });

  return (
    <section>
      <div className={styles.searchOptionsWrapper}>
        <h2 className={styles.title}>{t('music.topArtistsTitle')}</h2>
        <Select
          value={timeRange}
          className={styles.searchSelect}
          onChange={(event) => {
            setTimeRange(event.target.value as SpotifyTimeRange);
          }}
        >
          <option value="long_term">{t('music.filters.artists.longTerm')}</option>
          <option value="medium_term">{t('music.filters.artists.mediumTerm')}</option>
          <option value="short_term">{t('music.filters.artists.shortTerm')}</option>
        </Select>
      </div>

      <ImageGrid
        items={data.pages.map(({ topArtists }) => topArtists).flat()}
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

      <Button className={styles.button} onClick={() => fetchNextPage()}>
        {isFetching ? <LoadingDots /> : t('music.loadMoreArtists')}
      </Button>
    </section>
  );
}
