import { json, type LoaderFunction } from '@remix-run/cloudflare';

import { getTopAlbums } from '~/api-clients/last-fm.server';
import type { LastFMTimePeriod } from '~/api-clients/last-fm.types';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const searchParamsPage = Number(searchParams.get('page'));
  const searchParamsPeriod = searchParams.get('period') as LastFMTimePeriod;

  const topAlbums = await getTopAlbums(searchParamsPage, searchParamsPeriod);

  return json(
    {
      items: topAlbums,
      page: searchParamsPage,
      period: searchParamsPeriod,
    },
    { headers: { 'Cache-Control': 'max-age=300' } }
  );
};
