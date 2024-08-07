import { IAlbum } from '../types/album.types'
import { IArtist } from '../types/artist.types'
import { ITrack } from '../types/track.types'
import { apiSlice } from './apiSlice'

const apiWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Artist', 'TopTracks', 'ArtistAlbums', 'RelatedArtists', 'UserArtistFollows'] })

const artistsApi = apiWithTag.injectEndpoints({
	endpoints: builder => ({
		getArtist: builder.query<IArtist, string>({
			query: id => `/artists/${id}`,
			providesTags: (result, error, id) => [{ type: 'Artist', id }],
		}),
		getTopTracks: builder.query<{ tracks: ITrack[] }, string>({
			query: id => `/artists/${id}/top-tracks`,
			providesTags: (result, error, id) => [{ type: 'TopTracks', id }],
		}),
		getArtistAlbums: builder.query<{ items: IAlbum[] }, string>({
			query: id => `/artists/${id}/albums`,
			providesTags: (result, error, id) => [{ type: 'ArtistAlbums', id }],
		}),
		getRelatedArtists: builder.query<{ artists: IArtist[] }, string>({
			query: id => `artists/${id}/related-artists`,
			providesTags: (result, error, id) => [{ type: 'RelatedArtists', id }],
		}),
		checkIfCurrentUserFollows: builder.query<boolean[], string>({
			query: (...ids) => `/me/following/contains?type=artist&ids=${ids}`,
			providesTags: (result, error, ids) => [{ type: 'UserArtistFollows', id: ids }],
		}),
	}),
})

export const { useGetArtistQuery, useGetTopTracksQuery, useGetArtistAlbumsQuery, useGetRelatedArtistsQuery, useCheckIfCurrentUserFollowsQuery } =
	artistsApi
