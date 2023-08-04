import { LoaderFunction, json } from '@remix-run/node';

import { getTopAlbums } from '~/api-clients/last-fm';
import type { LastFMTimePeriod } from '~/api-clients/last-fm.types';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;

  const searchParamsPage = Number(searchParams.get('page'));

  const topAlbums = await getTopAlbums(
    searchParamsPage,
    searchParams.get('period') as LastFMTimePeriod
  );

  return json(
    { page: searchParamsPage, topAlbums },
    { headers: { 'Cache-Control': 'max-age=300' } }
  );
};
