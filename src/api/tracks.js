import { apiSlice } from './apiSlice'

const tracksApi = apiSlice.injectEndpoints({
	tagTypes: ['AlbumTracks', 'Track', 'Recommendations', 'GetSavedTracks'],
	endpoints: builder => ({
		getAlbumTracks: builder.query({
			query: id => `/albums/${id}/tracks`,
			providesTags: (result, error, id) => [{ type: 'AlbumTracks', id }],
		}),
		getTrack: builder.query({
			query: id => `/tracks/${id}`,
			providesTags: (result, error, id) => [{ type: 'Track', id }],
		}),
		getRecommendations: builder.query({
			query: ({ artist_id, track_id }) =>
				`/recommendations?seed_artists=${artist_id}&seed_tracks=${track_id}`,
			providesTags: (result, error, { artist_id, track_id }) => [
				{ type: 'User', id: `artist_id_${artist_id}_track_id_${track_id}` },
			],
		}),
		getSavedTracks: builder.query({
			query: () => `/me/tracks`,
			providesTags: () => [
				{
					type: 'GetSavedTracks',
				},
			],
		}),
		saveTrack: builder.mutation({
			query: ({ trackId, ...patch }) => ({
				url: `/me/tracks?ids=${trackId}`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'GetSavedTracks',
				},
			],
		}),
		removeSavedTrack: builder.mutation({
			query: ({ trackId, ...patch }) => ({
				url: `/me/tracks?ids=${trackId}`,
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
