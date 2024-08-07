import { IArtist, IArtistFollow } from '../types/artist.types'
import { IPlaylist } from '../types/playlist.types'
import { ITrack } from '../types/track.types'
import { IUser, IUserTopItems } from '../types/user.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({
	addTagTypes: ['CurrentUser', 'User', 'UserTopItems', 'UserArtistFollows', 'UserPlaylists', 'FollowedArtists'],
})

const userApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getCurrentUser: builder.query<IUser, void>({
			query: () => `/me`,
			providesTags: ['CurrentUser'],
		}),
		getFollowedArtists: builder.query<{ artists: { items: IArtist[] } }, void>({
			query: () => `/me/following?type=artist`,
			providesTags: ['FollowedArtists'],
		}),
		getUser: builder.query<IUser, string>({
			query: id => `/users/${id}`,
			providesTags: (result, error, id) => [{ type: 'User', id }],
		}),
		getUserPlaylists: builder.query<{ items: IPlaylist[] }, string>({
			query: id => `/users/${id}/playlists`,
			providesTags: (result, error, id) => [{ type: 'UserPlaylists', id }],
		}),
		getTopItems: builder.query<IUserTopItems<IArtist | ITrack>, string>({
			query: type => `/me/top/${type}`,
			providesTags: (result, error, type) => [{ type: 'UserTopItems', id: type }],
		}),
		followArtist: builder.mutation<null, IArtistFollow>({
			query: ({ id, ...patch }) => ({
				url: `/me/following?type=artist&ids=${id}`,
				method: 'PUT',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [
				{
					type: 'FollowedArtists',
				},
				{
					type: 'UserArtistFollows',
					id,
				},
			],
		}),
		unfollowArtist: builder.mutation<null, IArtistFollow>({
			query: ({ id, ...patch }) => ({
				url: `/me/following?type=artist&ids=${id}`,
				method: 'DELETE',
				body: patch,
			}),
			invalidatesTags: (result, error, { id }) => [
				{
					type: 'FollowedArtists',
				},
				{
					type: 'UserArtistFollows',
					id,
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
