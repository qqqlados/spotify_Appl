import { useGetFollowedArtistsQuery, useGetTopItemsQuery, useGetUserQuery } from '../api/user'

export const useFollowedArtists = () => {
	const {
		followedArtists,
		imagesFollowedArtists,
		isLoading: isLoadingFollowedArtists,
		isError,
	} = useGetFollowedArtistsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			followedArtists: data?.artists?.items,
			imagesFollowedArtists: data?.artists?.items?.map(item => item.images.filter(img => img.width == 320)[0]),
		}),
	})

	return { followedArtists, imagesFollowedArtists, isLoadingFollowedArtists }
}

export const useSearchUser = userSearchTerm => {
	const {
		data: user,
		isLoading: isUserLoading,
		isError: isUserError,
	} = useGetUserQuery(userSearchTerm, {
		skip: !userSearchTerm,
	})

	return { user, isUserLoading, isUserError }
}

export const useTopItems = (type, currentUser) => {
	const { data: items } = useGetTopItemsQuery(type, {
		skip: !currentUser,
	})

	const artistsArr = items?.items
	const imagesArtistsArr = items?.items?.map(item => item?.images?.filter(img => img.height == 160)[0])

	const tracksArr = items?.items || []
	const imagesTracksArr = items?.items?.map(item => item?.album?.images?.filter(img => img.width == 64)[0])

	return { items, tracksArr, imagesTracksArr, artistsArr, imagesArtistsArr }
}
