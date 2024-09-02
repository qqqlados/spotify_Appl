import { useGetFollowedArtistsQuery, useGetTopItemsQuery, useGetUserQuery } from '../api/user'
import { IArtist } from '../types/artist.types'
import { ITrack } from '../types/track.types'
import { IUser } from '../types/user.types'

export const useFollowedArtists = () => {
	const { followedArtists } = useGetFollowedArtistsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			followedArtists: data?.artists?.items,
		}),
	})

	return { followedArtists }
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

	const tracksArr = items?.items.filter(item => 'album' in item) as ITrack[]

	return { items, tracksArr, artistsArr }
}
