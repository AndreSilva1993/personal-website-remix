export type LastFMImageSize = 'small' | 'medium' | 'large' | 'extralarge';
export type LastFMTimePeriod = 'overall' | '7day' | '1month' | '3month' | '6month' | '12month';

export interface LastFMTopAlbumsResponse {
  topalbums: {
    album: [
      {
        name: string;
        playcount: number;
        artist: { name: string };
        image: LastFMImage[];
      }
    ];
    '@attr': {
      total: string;
      page: string;
      totalPages: string;
    };
  };
}

export interface LastFMRecentTracksResponse {
  recenttracks: {
    track: [
      {
        name: string;
        album: { '#text': string };
        artist: { '#text': string };
        date?: { uts: number };
        image: LastFMImage[];
      }
    ];
  };
}

export interface LastFMTopAlbum {
  name: string;
  artist: string;
  image: string;
  playCount: number;
}

export interface LastFMRecentTrack {
  name: string;
  artist: string;
  image: string;
  album: string;
  unixTimestamp?: number;
}

export interface LastFMImage {
  '#text': string;
  size: LastFMImageSize;
}
