import { ISearchResults } from '../types/searchResult.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['searchResults'],
})

const searchTabApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getSearchResult: builder.query<
			ISearchResults,
			{
				searchTerm: string
				urlFilter: string
			}
		>({
			query: ({ searchTerm, urlFilter }) => `https://api.spotify.com/v1/search?q=${searchTerm}&type=${urlFilter}`,
			providesTags: ['searchResults'],
		}),
		getSearchTracks: builder.query<Pick<ISearchResults, 'tracks'>, string>({
			query: search => `https://api.spotify.com/v1/search?q=${search}&type=track`,
		}),
	}),
})

export const { useLazyGetSearchResultQuery, useGetSearchResultQuery, useGetSearchTracksQuery, useLazyGetSearchTracksQuery } = searchTabApi
