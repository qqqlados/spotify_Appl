import { apiSlice } from './apiSlice'

const searchTabApi = apiSlice.injectEndpoints({
<<<<<<< HEAD
	endpoints: builder => ({
		getSearchResult: builder.query({
			query: ({ searchTerm, urlFilter }) =>
				`https://api.spotify.com/v1/search?q=${searchTerm}&type=${urlFilter}`,
=======
	tagTypes: ['searchResults'],
	endpoints: builder => ({
		getSearchResult: builder.query({
			query: ({ searchTerm, urlFilter }) => `https://api.spotify.com/v1/search?q=${searchTerm}&type=${urlFilter}`,
			providesTags: ['searchResults'],
		}),
		getSearchTracks: builder.query({
			query: search => `https://api.spotify.com/v1/search?q=${search}&type=track`,
>>>>>>> 4f0b9ac (first release)
		}),
	}),
})

<<<<<<< HEAD
export const { useLazyGetSearchResultQuery } = searchTabApi
=======
export const { useLazyGetSearchResultQuery, useGetSearchResultQuery, useLazyGetSearchTracksQuery } = searchTabApi
>>>>>>> 4f0b9ac (first release)
