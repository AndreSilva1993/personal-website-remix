import { json, type LoaderFunction } from '@remix-run/node';

import { getTopArtists } from '~/api-clients/spotify';
import type { SpotifyTimeRange } from '~/api-clients/spotify.types';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const searchParamsPage = Number(searchParams.get('page'));

  const topArtists = await getTopArtists(
    searchParamsPage,
    searchParams.get('timeRange') as SpotifyTimeRange
  );

  return json(
    { page: searchParamsPage, topArtists },
    { headers: { 'Cache-Control': 'max-age=300' } }
  );
};
