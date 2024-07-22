import { apiSlice } from './apiSlice'

const searchTabApi = apiSlice.injectEndpoints({
	tagTypes: ['searchResults'],
	endpoints: builder => ({
		getSearchResult: builder.query({
			query: ({ searchTerm, urlFilter }) => `https://api.spotify.com/v1/search?q=${searchTerm}&type=${urlFilter}`,
			providesTags: ['searchResults'],
		}),
		getSearchTracks: builder.query({
			query: search => `https://api.spotify.com/v1/search?q=${search}&type=track`,
		}),
	}),
})

export const { useLazyGetSearchResultQuery, useGetSearchResultQuery, useLazyGetSearchTracksQuery } = searchTabApi
