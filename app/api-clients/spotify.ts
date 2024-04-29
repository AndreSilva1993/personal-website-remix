import { createClient } from '@vercel/kv';

import type {
  SpotifyTopArtist,
  SpotifyTimeRange,
  SpotifyTopArtistsResponse,
} from './spotify.types';

async function getSpotifyAccessToken() {
  const kv = createClient({
    url: import.meta.env.VITE_REDIS_DATABASE_REST_API_URL,
    token: import.meta.env.VITE_REDIS_DATABASE_REST_API_TOKEN,
  });

  const accessTokenExists = await kv.exists(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_REDIS_KEY);
  if (!accessTokenExists) {
    const clientIdAndSecret = btoa(
      `${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`
    );

    const spotifyResponse = await fetch(
      `${import.meta.env.VITE_SPOTIFY_ACCOUNTS_API_URL}/api/token`,
      {
        method: 'POST',
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${clientIdAndSecret}`,
        },
      }
    );

    const { access_token: accessToken, expires_in: expiresIn } = await spotifyResponse.json();

    await kv.set(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_REDIS_KEY, accessToken);
    await kv.expire(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_REDIS_KEY, expiresIn);
  }

  return await kv.get<string>(import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN_REDIS_KEY);
}

export async function getTopArtists(
  page: number = 1,
  timeRange: SpotifyTimeRange = 'long_term'
): Promise<SpotifyTopArtist[]> {
  const spotifyAccessToken = await getSpotifyAccessToken();

  const fetchSearchParams = new URLSearchParams({
    limit: '20',
    time_range: timeRange,
    offset: String(20 * (page - 1)),
  });

  const response = await fetch(
    `${import.meta.env.VITE_SPOTIFY_API_URL}/me/top/artists?${fetchSearchParams}`,
    {
      headers: { Authorization: `Bearer ${spotifyAccessToken}` },
    }
  );

  if (!response.ok) return [];

  const { items }: SpotifyTopArtistsResponse = await response.json();

  return items.map(({ name, images, external_urls }) => ({
    name,
    link: external_urls.spotify,
    image: images.sort(
      (artistImage, nextArtistImage) => artistImage.height - nextArtistImage.height
    )[1].url,
  }));
}
