import { useMemo } from 'react'

import useSWR from 'swr'
import { stringify } from 'querystring'

import { useSearch } from '../../../app/services/useSearch'
import { Hentai } from '../../../core/@types/Hentai'
import { APIResponse } from '../../../core/@types/APIResponse'

interface Data {
  galleries: Hentai[]
  maxPage: number
}

export const useListingNavigation = (
  page: number,
  maxPage: number,
  defaultGalleries: Hentai[]
) => {
  const { query } = useSearch('listing')

  const transformedQuery = useMemo(
    () =>
      stringify({
        query,
        page,
      }),
    [page, query]
  )

  const { data, error } = useSWR<APIResponse<Data>>(
    `/api/search?${transformedQuery}`,
    url => (query === '' ? null : fetch(url).then(r => r.json()))
  )

  if (query === '') {
    return {
      data: {
        maxPage,
        galleries: defaultGalleries,
      },
      isLoading: false,
      isError: false,
    }
  } else {
    return {
      data:
        data &&
        data.status === 'success' &&
        data.response.data.maxPage !== undefined
          ? {
              maxPage: data.response.data.maxPage,
              galleries: data.response.data.galleries,
            }
          : undefined,
      isLoading: !error && !data,
      isError:
        error ||
        (data &&
          data.status !== 'success' &&
          data.response.data.maxPage === undefined),
    }
  }
}
