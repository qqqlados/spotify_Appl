import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useGetArtistAlbumsQuery, useGetRelatedArtistsQuery, useGetTopTracksQuery } from '../api/artists'
import { useFollowArtistMutation, useUnfollowArtistMutation } from '../api/user'

export const useArtistTopTracks = (artist_id: string) => {
	const { tracks, tracksImages } = useGetTopTracksQuery(artist_id, {
		skip: !artist_id,
		selectFromResult: ({ data }) => ({
			tracks: data?.tracks || [],
			tracksImages: data?.tracks?.map(track => track.album.images.filter(img => img.width == 64)[0]) || [],
		}),
	})

	return { tracks, tracksImages }
}

export const useArtistAlbums = (artist_id: string) => {
	const { albums } = useGetArtistAlbumsQuery(artist_id, {
		selectFromResult: ({ data }) => ({
			albums: data?.items || [],
		}),
	})

	return { albums }
}

export const useRelatedArtists = (artist_id: string) => {
	const { relatedArtists } = useGetRelatedArtistsQuery(artist_id, {
		selectFromResult: ({ data }) => ({
			relatedArtists: data?.artists || [],
		}),
	})
	// prettier-ignore
	return { relatedArtists }
}

export const useArtistMutations = (setDisabled: React.Dispatch<React.SetStateAction<boolean>>) => {
	const [followArtist, { isLoading: isFollowLoading, isSuccess: isFollowSuccess, isError: isFollowError }] = useFollowArtistMutation()
	const [unfollowArtist, { isLoading: isUnfollowLoading, isSuccess: isUnfollowSuccess, isError: isUnfollowError }] = useUnfollowArtistMutation()

	useEffect(() => {
		if (isFollowSuccess) {
			toast.success('Artist is followed.')
		} else if (isUnfollowSuccess) {
			toast.success('Artist is unfollowed.')
		} else if (isFollowError || isUnfollowError) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
		}
	}, [isFollowSuccess, isUnfollowSuccess])

	useEffect(() => {
		if (isFollowLoading || isUnfollowLoading) {
			setDisabled(true)
		} else setDisabled(false)
	}, [isFollowLoading, isUnfollowLoading])

	return { followArtist, unfollowArtist, isFollowLoading, isUnfollowLoading }
}
