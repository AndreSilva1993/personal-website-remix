import { json, type LoaderFunction } from '@vercel/remix';

import { getTopArtists } from '~/api-clients/spotify';
import type { SpotifyTimeRange } from '~/api-clients/spotify.types';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const searchParamsPage = Number(searchParams.get('page'));
  const searchParamsPeriod = searchParams.get('period') as SpotifyTimeRange;

  const topArtists = await getTopArtists(searchParamsPage, searchParamsPeriod);

  return json(
    {
      items: topArtists,
      page: searchParamsPage,
      period: searchParamsPeriod,
    },
    { headers: { 'Cache-Control': 'max-age=300' } }
  );
};
