import { Redis } from '@upstash/redis';

import type {
  SpotifyTopArtist,
  SpotifyTimeRange,
  SpotifyTopArtistsResponse,
} from './spotify.types';

export async function getSpotifyAccessToken() {
  const { get, set, expire, exists } = new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  });

  const accessTokenExists = await exists(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);
  if (!accessTokenExists) {
    const clientIdAndSecret = btoa(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    );

    const spotifyResponse = await fetch(`${process.env.SPOTIFY_ACCOUNTS_API_URL}/api/token`, {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${clientIdAndSecret}`,
      },
    });

    const { access_token: accessToken, expires_in: expiresIn } = await spotifyResponse.json();

    await set(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY, accessToken);
    await expire(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY, expiresIn);
  }

  return await get<string>(process.env.SPOTIFY_ACCESS_TOKEN_REDIS_KEY);
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
    `${process.env.SPOTIFY_API_URL}/me/top/artists?${fetchSearchParams}`,
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
