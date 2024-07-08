import { apiSlice } from './apiSlice'

const userApi = apiSlice.injectEndpoints({
	tagTypes: ['CurrentUser', 'User', 'UserTopItems', 'UserPlaylists', 'FollowedArtists'],
	endpoints: builder => ({
		getCurrentUser: builder.query({
			query: () => `/me`,
			providesTags: ['CurrentUser'],
		}),
		getFollowedArtists: builder.query({
			query: () => `/me/following?type=artist`,
			providesTags: ['FollowedArtists'],
		}),
		getUser: builder.query({
			query: id => `/users/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
		getUserPlaylists: builder.query({
			query: userId => `/users/${userId}/playlists`,
			providesTags: (result, error, { userId }) => [{ type: 'UserPlaylists', userId }],
		}),
		getTopItems: builder.query({
			query: type => `/me/top/${type}`,
			providesTags: (result, error, type) => [{ type: 'UserTopItems', id: type }],
		}),
		followArtist: builder.mutation({
			query: ({ artistId, ...patch }) => ({
				url: `/me/following?type=artist&ids=${artistId}`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: (result, error, { artistId }) => [
				{
					type: 'FollowedArtists',
				},
				{
					type: 'UserArtistFollows',
					id: artistId,
				},
			],
		}),
		unfollowArtist: builder.mutation({
			query: ({ artistId, ...patch }) => ({
				url: `/me/following?type=artist&ids=${artistId}`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { artistId }) => [
				{
					type: 'FollowedArtists',
				},
				{
					type: 'UserArtistFollows',
					id: artistId,
				},
			],
		}),
	}),
})

export const {
	useGetCurrentUserQuery,
	useGetFollowedArtistsQuery,
	useGetUserQuery,
	useGetTopItemsQuery,
	useFollowArtistMutation,
	useUnfollowArtistMutation,
	useGetUserPlaylistsQuery,
} = userApi

export const useGetUserState = apiSlice.endpoints.getUser.useQueryState
