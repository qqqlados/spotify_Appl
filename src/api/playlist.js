import { apiSlice } from './apiSlice'

const playlistsApi = apiSlice.injectEndpoints({
	tagTypes: ['Playlist', 'PlaylistCoverImage', 'PlaylistTracks', 'CurrentUserPlaylists', 'UserFollowPlaylists'],
	endpoints: builder => ({
		getPlaylist: builder.query({
			query: id => `/playlists/${id}`,
			providesTags: (result, error, id) => [
				{
					type: 'Playlist',
					id,
				},
			],
		}),
		getCoverImage: builder.query({
			query: id => `/playlists/${id}/images`,
			providesTags: (result, error, id) => [
				{
					type: 'Playlist',
					id,
				},
			],
		}),
		getPlaylistTracks: builder.query({
			query: id => `/playlists/${id}/tracks`,
			providesTags: (result, error, id) => [
				{
					type: 'PlaylistTracks',
					id,
				},
			],
		}),
		getCurrentUserPlaylists: builder.query({
			query: () => `/me/playlists`,
			providesTags: () => [{ type: 'CurrentUserPlaylists' }],
		}),
		checkIfUserFollows: builder.query({
			query: playlistId => `/playlists/${playlistId}/followers/contains`,
			providesTags: (result, error, { playlistId }) => [
				{
					type: 'UserFollowPlaylists',
					id: playlistId,
				},
			],
		}),
		createPlaylist: builder.mutation({
			query: ({ userId, ...patch }) => ({
				url: `/users/${userId}/playlists`,
				method: 'POST',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		addTrackToPlaylist: builder.mutation({
			query: ({ playlistId, ...patch }) => ({
				url: `/playlists/${playlistId}/tracks`,
				method: 'POST',
				body: patch,
			}),
			invalidatesTags: (result, error, { playlistId }) => [
				{
					type: 'PlaylistTracks',
					id: playlistId,
				},
				{
					type: 'Playlist',
					id: playlistId,
				},
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		removeTrackFromPlaylist: builder.mutation({
			query: ({ playlistId, ...patch }) => ({
				url: `/playlists/${playlistId}/tracks`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { playlistId }) => [
				{
					type: 'PlaylistTracks',
					id: playlistId,
				},
				{
					type: 'Playlist',
					id: playlistId,
				},
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		changePlaylistDetails: builder.mutation({
			query: ({ playlistId, ...patch }) => ({
				url: `/playlists/${playlistId}`,
				method: 'PUT',
				body: patch,
			}),

			async onQueryStarted({ playlistId, ...patch }, { dispatch, queryFulfilled }) {
				const playlistPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getPlaylist', playlistId, draft => {
						Object.assign(draft, patch)
					})
				)

				const currentUserPlaylistsPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getCurrentUserPlaylists', undefined, data => {
						data.items = data.items.map(playlist => {
							if (playlist.id === playlistId) {
								return { ...playlist, ...patch }
							}
							return playlist
						})
						return data
					})
				)

				try {
					await queryFulfilled
				} catch (error) {
					playlistPatchResult.undo()
					currentUserPlaylistsPatchResult.undo()
					console.log(error)
				}
			},
		}),
		updatePlaylistItems: builder.mutation({
			query: ({ playlistId, tracksOrder, ...patch }) => ({
				url: `/playlists/${playlistId}/tracks`,
				method: 'PUT',
				body: { ...patch, uris: tracksOrder.map(track => track.uri) },
			}),
			async onQueryStarted({ playlistId, tracksOrder }, { dispatch, queryFulfilled }) {
				const updatedTracksOrderPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getPlaylistTracks', playlistId, draft => {
						draft.items = tracksOrder
					})
				)

				try {
					await queryFulfilled
				} catch (error) {
					updatedTracksOrderPatchResult.undo()
					console.log(error)
				}
			},
			invalidatesTags: (result, error, { playlistId }) => [{ type: 'PlaylistTracks', id: playlistId }],
		}),
		followPlaylist: builder.mutation({
			query: ({ playlistId, ...patch }) => ({
				url: `/playlists/${playlistId}/followers`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: (result, error, { playlist_id }) => [
				{ type: 'CurrentUserPlaylists' },
				{ type: 'UserFollowPlaylists', id: playlist_id },
			],
		}),
		unfollowPlaylist: builder.mutation({
			query: ({ playlistId, ...patch }) => ({
				url: `/playlists/${playlistId}/followers`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { playlist_id }) => [
				{ type: 'CurrentUserPlaylists' },
				{ type: 'UserFollowPlaylists', id: playlist_id },
			],
		}),
	}),
})

export const {
	useGetPlaylistQuery,
	useLazyGetPlaylistQuery,
	useGetCoverImageQuery,
	useGetPlaylistTracksQuery,
	useGetCurrentUserPlaylistsQuery,
	useCreatePlaylistMutation,
	useAddTrackToPlaylistMutation,
	useRemoveTrackFromPlaylistMutation,
	useChangePlaylistDetailsMutation,
	useUpdatePlaylistItemsMutation,
	useFollowPlaylistMutation,
	useUnfollowPlaylistMutation,
	useCheckIfUserFollowsQuery,
} = playlistsApi
