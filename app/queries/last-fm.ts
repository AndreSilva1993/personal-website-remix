import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import type { UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import type {
  LastFMTopAlbum,
  LastFMTimePeriod,
  LastFMRecentTrack,
} from '~/api-clients/last-fm.types';

async function fetchTopAlbums(
  pageParam = 1,
  timePeriod: LastFMTimePeriod
): Promise<LastFMTopAlbum[]> {
  const fetchSearchParams = new URLSearchParams({
    page: pageParam.toString(),
    period: timePeriod,
  });

  const response = await fetch(`/api/last-fm/top-albums?${fetchSearchParams}`);

  if (!response.ok) return [];
  return await response.json();
}

async function fetchRecentTracks(): Promise<LastFMRecentTrack[]> {
  const response = await fetch('/api/last-fm/recent-tracks');

  if (!response.ok) return [];
  return await response.json();
}

export function useLastFMTopAlbums(
  timePeriod: LastFMTimePeriod,
  options?: UseInfiniteQueryOptions<LastFMTopAlbum[]>
) {
  return useInfiniteQuery(
    ['last-fm', 'top-albums', timePeriod],
    ({ pageParam }) => fetchTopAlbums(pageParam, timePeriod),
    {
      getNextPageParam: (_lastPage, allPages) => allPages.length + 1,
      ...options,
    }
  );
}

export function useLastFMRecentTracks(options?: UseQueryOptions<LastFMRecentTrack[]>) {
  return useQuery(['last-fm', 'recent-tracks'], () => fetchRecentTracks(), options);
}
