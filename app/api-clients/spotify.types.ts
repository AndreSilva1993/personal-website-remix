export interface SpotifyTopArtistsResponse {
  items: Array<{
    name: string;
    external_urls: {
      spotify: string;
    };
    images: SpotifyImage[];
  }>;
}

export interface SpotifyImage {
  width: number;
  height: number;
  url: string;
}

export interface SpotifyTopArtist {
  name: string;
  image: string;
  link: string;
}

export type SpotifyTimeRange = 'long_term' | 'medium_term' | 'short_term';
