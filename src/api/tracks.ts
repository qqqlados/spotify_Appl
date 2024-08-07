import { ITrack } from '../types/track.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['AlbumTracks', 'Track', 'Recommendations', 'GetSavedTracks', 'User'],
})

const tracksApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getAlbumTracks: builder.query<ITrack[], string>({
			query: id => `/albums/${id}/tracks`,
			providesTags: (result, error, id) => [{ type: 'AlbumTracks', id }],
		}),
		getTrack: builder.query<ITrack, string>({
			query: id => `/tracks/${id}`,
			providesTags: (result, error, id) => [{ type: 'Track', id }],
		}),
		getRecommendations: builder.query<{ tracks: ITrack[] }, { artist_id: string | undefined; track_id: string | undefined }>({
			query: ({ artist_id, track_id }) => `/recommendations?seed_artists=${artist_id}&seed_tracks=${track_id}`,
			providesTags: (result, error, { artist_id, track_id }) => [{ type: 'User', id: `artist_id_${artist_id}_track_id_${track_id}` }],
		}),
		getSavedTracks: builder.query<{ items: Array<{ track: ITrack }> }, void>({
			query: () => `/me/tracks`,
			providesTags: () => [
				{
					type: 'GetSavedTracks',
				},
			],
		}),
		saveTrack: builder.mutation<null, { ids: string[] }>({
			query: ({ ids, ...patch }) => ({
				url: `/me/tracks?ids=${ids}`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'GetSavedTracks',
				},
			],
		}),
		removeSavedTrack: builder.mutation<null, { ids: string[] }>({
			query: ({ ids, ...patch }) => ({
				url: `/me/tracks?ids=${ids}`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'GetSavedTracks',
				},
			],
		}),
	}),
})

export const {
	useGetAlbumTracksQuery,
	useGetTrackQuery,
	useLazyGetRecommendationsQuery,
	useSaveTrackMutation,
	useRemoveSavedTrackMutation,
	useGetSavedTracksQuery,
	useGetRecommendationsQuery,
} = tracksApi
