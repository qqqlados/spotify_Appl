import { apiSlice } from './apiSlice'

const artistsApi = apiSlice.injectEndpoints({
	tagTypes: ['Artist', 'TopTracks', 'ArtistAlbums', 'RelatedArtists', 'UserArtistFollows'],
	endpoints: builder => ({
		getArtist: builder.query({
			query: id => `/artists/${id}`,
			providesTags: (result, error, id) => [{ type: 'Artist', id }],
		}),
		getTopTracks: builder.query({
			query: id => `/artists/${id}/top-tracks`,
			providesTags: (result, error, id) => [{ type: 'TopTracks', id }],
		}),
		getArtistAlbums: builder.query({
			query: id => `/artists/${id}/albums`,
			providesTags: (result, error, id) => [{ type: 'ArtistAlbums', id }],
		}),
		getRelatedArtists: builder.query({
			query: id => `artists/${id}/related-artists`,
			providesTags: (result, error, id) => [{ type: 'RelatedArtists', id }],
		}),
		checkIfCurrentUserFollows: builder.query({
			query: (...ids) => `/me/following/contains?type=artist&ids=${ids}`,
			providesTags: (result, error, ids) => [{ type: 'UserArtistFollows', id: ids }],
		}),
	}),
})

export const {
	useGetArtistQuery,
	useLazyGetArtistQuery,
	useGetTopTracksQuery,
	useGetArtistAlbumsQuery,
	useGetRelatedArtistsQuery,
	useCheckIfCurrentUserFollowsQuery,
} = artistsApi
