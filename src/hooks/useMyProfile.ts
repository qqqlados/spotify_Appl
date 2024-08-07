import { useGetFollowedArtistsQuery, useGetTopItemsQuery, useGetUserQuery } from '../api/user'
import { IArtist } from '../types/artist.types'
import { ITrack } from '../types/track.types'
import { IUser } from '../types/user.types'

export const useFollowedArtists = () => {
	const { followedArtists, imagesFollowedArtists } = useGetFollowedArtistsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			followedArtists: data?.artists?.items,
			imagesFollowedArtists: data?.artists?.items?.map(item => item.images.filter(img => img.width == 320)[0]),
		}),
	})

	return { followedArtists, imagesFollowedArtists }
}

export const useSearchUser = (userSearchTerm: string) => {
	const {
		data: user,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useGetUserQuery(userSearchTerm, {
		skip: !userSearchTerm,
	})

	return { user, isUserLoading, isUserError }
}

export const useTopItems = (type: string, currentUser: IUser | undefined) => {
	const { data: items } = useGetTopItemsQuery(type, {
		skip: !currentUser,
	})

	const artistsArr = items?.items.filter(item => 'images' in item) as IArtist[]
	const imagesArtistsArr = artistsArr?.map(item => item.images.filter(img => img.height == 160)[0])

	const tracksArr = items?.items.filter(item => 'album' in item) as ITrack[]
	const imagesTracksArr = tracksArr?.map(item => item.album.images.filter(img => img.width == 64)[0])

	return { items, tracksArr, imagesTracksArr, artistsArr, imagesArtistsArr }
}
