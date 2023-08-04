import styles from './MusicRecentTracks.module.css';

import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import type { LastFMRecentTrack } from '~/api-clients/last-fm.types';

function formatTimestamp(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('pt-PT');
}

interface MusicRecentTracksProps {
  initialRecentTracks: LastFMRecentTrack[];
}

export function MusicRecentTracks({ initialRecentTracks }: MusicRecentTracksProps) {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className={styles.title}>{t('music.recentTracksTitle')}</h2>
      <div className={styles.recentTracksWrapper}>
        {initialRecentTracks.map(({ image, artist, name, album, unixTimestamp }) => (
          <Fragment key={unixTimestamp}>
            <div className={styles.recentTrackCoverWrapper}>
              <img src={image} alt={album} width="35" height="35" />
            </div>
            <p className={styles.recentTrackArtist}>{artist}</p>
            <p className={styles.recentTrackName}>{name}</p>
            <p className={styles.recentTrackAlbum}>{album}</p>
            <p className={styles.recentTrackDate}>
              {unixTimestamp ? formatTimestamp(unixTimestamp) : t('music.streamingNow')}
            </p>

            <div className={styles.divider} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
