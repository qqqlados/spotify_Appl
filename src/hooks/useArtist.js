import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useGetArtistAlbumsQuery, useGetRelatedArtistsQuery, useGetTopTracksQuery, useLazyGetArtistQuery } from '../api/artists'
import { useFollowArtistMutation, useUnfollowArtistMutation } from '../api/user'

export const useArtistOverall = artist_id => {
	const [triggerArtist, { data: artistData, isLoading: isLoadingArtist, isError: isErrorArtistOverall }] = useLazyGetArtistQuery()

	useEffect(() => {
		if (artist_id) {
			triggerArtist(artist_id)
		}
	}, [artist_id])

	const artistImage = artistData?.images?.filter(img => img.height == 320)[0]

	return { artistData, artistImage, isLoadingArtist, isErrorArtistOverall }
}

export const useArtistTopTracks = artist_id => {
	const {
		tracks,
		tracksImages,
		isLoading: isLoadingTopTracks,
		isError: isErrorArtistTopTracks,
	} = useGetTopTracksQuery(artist_id, {
		skip: !artist_id,
		selectFromResult: ({ data }) => ({
			tracks: data?.tracks,
			tracksImages: data?.tracks?.map(track => track.album.images.filter(img => img.width == 64)[0]),
		}),
	})

	return { tracks, tracksImages, isLoadingTopTracks, isErrorArtistTopTracks }
}

export const useArtistAlbums = artist_id => {
	const {
		albums,
		albumsImages,
		isLoading: isLoadingArtistAlbums,
		isError: isErrorArtistAlbums,
	} = useGetArtistAlbumsQuery(artist_id, {
		selectFromResult: ({ data }) => ({
			albums: data?.items,
			albumsImages: data?.items?.map(item => item.images.filter(img => img.height == 300)[0]),
		}),
	})

	return { albums, albumsImages, isLoadingArtistAlbums, isErrorArtistAlbums }
}

export const useRelatedArtists = artist_id => {
	const {
		relatedArtists,
		artistsNames,
		artistsImages,
		isLoading: isLoadingRelatedArtists,
		isError: isErrorRelatedArtists,
	} = useGetRelatedArtistsQuery(artist_id, {
		selectFromResult: ({ data }) => ({
			relatedArtists: data?.artists,
			artistsImages: data?.artists?.map(artist => artist.images.filter(image => image.height == 320)[0]),
		}),
	})

	return {
		relatedArtists,
		artistsNames,
		artistsImages,
		isLoadingRelatedArtists,
		isErrorRelatedArtists,
	}
}

export const useArtistMutations = setDisabled => {
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
