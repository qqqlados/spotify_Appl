import { IImage } from '../shared/types/image.type'
import { IPlaylist, IPlaylistAddTrack, IPlaylistFollow, IPlaylistRemoveTrack, IUpdatePlaylistItems } from '../types/playlist.types'
import { ITrack } from '../types/track.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['Playlist', 'PlaylistCoverImage', 'PlaylistTracks', 'CurrentUserPlaylists', 'UserFollowPlaylists'],
})

const playlistsApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getPlaylist: builder.query<IPlaylist, string | undefined>({
			query: id => `/playlists/${id}`,
			providesTags: (result, error, id) => [
				{
					type: 'Playlist',
					id,
				},
			],
		}),
		getCoverImage: builder.query<IImage[], string>({
			query: id => `/playlists/${id}/images`,
			providesTags: (result, error, id) => [
				{
					type: 'Playlist',
					id,
				},
			],
		}),
		getPlaylistTracks: builder.query<{ items: Array<{ track: ITrack }> }, string>({
			query: id => `/playlists/${id}/tracks`,
			providesTags: (result, error, id) => [
				{
					type: 'PlaylistTracks',
					id,
				},
			],
		}),
		getCurrentUserPlaylists: builder.query<{ items: IPlaylist[] }, void>({
			query: () => `/me/playlists`,
			providesTags: () => [{ type: 'CurrentUserPlaylists' }],
		}),
		checkIfUserFollows: builder.query<boolean[], string>({
			query: playlistId => `/playlists/${playlistId}/followers/contains`,
			providesTags: (result, error, playlistId) => [
				{
					type: 'UserFollowPlaylists',
					id: playlistId,
				},
			],
		}),
		createPlaylist: builder.mutation<null, IPlaylist>({
			query: ({ id, ...patch }) => ({
				url: `/users/${id}/playlists`,
				method: 'POST',
				body: patch,
			}),
			invalidatesTags: () => [
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		addTrackToPlaylist: builder.mutation<null, IPlaylistAddTrack>({
			query: ({ id, ...patch }) => ({
				url: `/playlists/${id}/tracks`,
				method: 'POST',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [
				{
					type: 'PlaylistTracks',
					id,
				},
				{
					type: 'Playlist',
					id,
				},
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		removeTrackFromPlaylist: builder.mutation<null, IPlaylistRemoveTrack>({
			query: ({ id, ...patch }) => ({
				url: `/playlists/${id}/tracks`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [
				{
					type: 'PlaylistTracks',
					id,
				},
				{
					type: 'Playlist',
					id,
				},
				{
					type: 'CurrentUserPlaylists',
				},
			],
		}),
		changePlaylistDetails: builder.mutation<null, IPlaylist>({
			query: ({ id, ...patch }) => ({
				url: `/playlists/${id}`,
				method: 'PUT',
				body: patch,
			}),

			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const playlistPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getPlaylist', id, draft => {
						Object.assign(draft, patch)
					})
				)

				const currentUserPlaylistsPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getCurrentUserPlaylists', undefined, data => {
						data.items = data.items.map(playlist => {
							if (playlist.id === id) {
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
		updatePlaylistItems: builder.mutation<null, IUpdatePlaylistItems>({
			query: ({ playlistId, tracksOrder, ...patch }) => ({
				url: `/playlists/${playlistId}/tracks`,
				method: 'PUT',
				body: { ...patch, uris: tracksOrder?.map(track => track.uri) },
			}),
			async onQueryStarted({ playlistId, tracksOrder }, { dispatch, queryFulfilled }) {
				const updatedTracksOrderPatchResult = dispatch(
					playlistsApi.util.updateQueryData('getPlaylistTracks', playlistId, draft => {
						draft.items = tracksOrder?.map(track => ({ track })) as Array<{ track: ITrack }>
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
		followPlaylist: builder.mutation<null, IPlaylistFollow>({
			query: ({ id, ...patch }) => ({
				url: `/playlists/${id}/followers`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'CurrentUserPlaylists' }, { type: 'UserFollowPlaylists', id: id }],
		}),
		unfollowPlaylist: builder.mutation<null, IPlaylistFollow>({
			query: ({ id, ...patch }) => ({
				url: `/playlists/${id}/followers`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [{ type: 'CurrentUserPlaylists' }, { type: 'UserFollowPlaylists', id }],
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
