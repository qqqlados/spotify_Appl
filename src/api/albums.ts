import { IAlbum } from '../types/album.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['NewReleases', 'Album', 'SavedAlbums'] })

const albumsApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getNewReleases: builder.query<{ albums: { items: IAlbum[] } }, void>({
			query: () => `/browse/new-releases?limit=50`,
			providesTags: () => [
				{
					type: 'NewReleases',
				},
			],
		}),
		getAlbum: builder.query<IAlbum, string>({
			query: id => `/albums/${id}`,
			providesTags: (result, error, id) => [
				{
					type: 'Album',
					id,
				},
			],
		}),
		getSavedAlbums: builder.query<{ items: Array<{ album: IAlbum }> }, void>({
			query: () => `/me/albums`,
			providesTags: ['SavedAlbums'],
		}),
		saveAlbum: builder.mutation<null, { ids: string[] }>({
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
		removeSavedAlbum: builder.mutation<null, { ids: string[] }>({
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
		}),
	}),
})

export const { useGetNewReleasesQuery, useGetAlbumQuery, useGetSavedAlbumsQuery, useSaveAlbumMutation, useRemoveSavedAlbumMutation } = albumsApi
