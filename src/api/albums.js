import { apiSlice } from './apiSlice'

const albumsApi = apiSlice.injectEndpoints({
<<<<<<< HEAD
	endpoints: builder => ({
		getNewReleases: builder.query({
			query: () => `/browse/new-releases`,
		}),
		getAlbum: builder.query({
			query: id => `/albums/${id}`,
		}),
		getAlbumTracks: builder.query({
			query: id => `/albums/${id}/tracks`,
=======
	tagTypes: ['NewReleases', 'Album', 'SavedAlbums'],
	endpoints: builder => ({
		getNewReleases: builder.query({
			query: () => `/browse/new-releases?limit=50`,
			providesTags: ['NewReleases'],
		}),
		getAlbum: builder.query({
			query: id => `/albums/${id}`,
			providesTags: (result, error, id) => [
				{
					type: 'Album',
					id,
				},
			],
		}),
		getSavedAlbums: builder.query({
			query: () => `/me/albums`,
			providesTags: ['SavedAlbums'],
		}),
		saveAlbum: builder.mutation({
			query: ({ ...patch }) => ({
				url: `/me/albums`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'SavedAlbums',
				},
			],
		}),
		removeSavedAlbum: builder.mutation({
			query: ({ ...patch }) => ({
				url: `/me/albums`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'SavedAlbums',
				},
			],
>>>>>>> 4f0b9ac (first release)
		}),
	}),
})

export const {
	useGetNewReleasesQuery,
	useGetAlbumQuery,
<<<<<<< HEAD
	useGetAlbumTracksQuery,
=======
	useGetSavedAlbumsQuery,
	useSaveAlbumMutation,
	useRemoveSavedAlbumMutation,
>>>>>>> 4f0b9ac (first release)
} = albumsApi
