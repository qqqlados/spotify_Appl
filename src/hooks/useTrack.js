import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAddTrackToPlaylistMutation, useLazyGetPlaylistQuery, useRemoveTrackFromPlaylistMutation } from '../api/playlist'
import {
	useGetRecommendationsQuery,
	useGetSavedTracksQuery,
	useGetTrackQuery,
	useRemoveSavedTrackMutation,
	useSaveTrackMutation,
} from '../api/tracks'

export const useTrack = id => {
	const { data, name, album_image, album_name, album_id, artist_id, artist_name, year, duration } = useGetTrackQuery(id, {
		selectFromResult: ({ data }) => ({
			data: data,
			name: data?.name,
			album_image: data?.album?.images?.filter(img => img.width == 300)[0],
			album_name: data?.album?.name,
			album_id: data?.album?.id,
			artist_id: data?.artists?.map(artist => artist.id)[0],
			artist_name: data?.artists?.map(artist => artist.name),
			year: data?.album?.release_date.substring(0, 4),
			duration: data?.duration_ms,
		}),
	})

	return {
		data,
		name,
		album_image,
		album_name,
		album_id,
		artist_id,
		artist_name,
		year,
		duration,
	}
}

export const useSavedTracks = () => {
	const {
		tracks,
		imagesTracks,
		isLoading: isSavedTracksLoading,
	} = useGetSavedTracksQuery(undefined, {
		selectFromResult: ({ data }) => ({
			tracks: data?.items?.map(item => item.track),
			imagesTracks: data?.items?.map(item => item.track.album.images.filter(img => img.width == 64)[0]),
		}),
	})
	return { tracks, imagesTracks, isSavedTracksLoading }
}

export const useTrackRecommendations = (artist_id, track_id) => {
	const { data: reco } = useGetRecommendationsQuery({ artist_id, track_id }, { skip: !artist_id })

	const areTracksRecommendations = tracks =>
		tracks?.map(track => track?.artists?.map(artist => artist.name)[0]).filter((artist, index, array) => array.indexOf(artist) === index)

	return {
		reco,
		areTracksRecommendations,
	}
}

export const useAddTrack = (playlist_id, id, trackUri) => {
	const [checkPlaylist, { data: playlist }] = useLazyGetPlaylistQuery()

	const [addTrack, { isLoading: isLoadingAddTrack, isSuccess: isAddTrackSuccess, isError: isAddTrackError }] = useAddTrackToPlaylistMutation()

	const [isChecking, setIsChecking] = useState(false)

	const checkPlaylistTracks = () => {
		setIsChecking(true)
		checkPlaylist(playlist_id)
	}

	useEffect(() => {
		if (playlist && isChecking) {
			const isFoundTrack = playlist?.tracks?.items?.map(item => item?.track?.id).find(el => el === id)
			if (isFoundTrack) {
				toast('Track is already on a playlist.', {
					style: {
						textAlign: 'center',
					},
					icon: '⚠️',
				})
				setIsChecking(false)
			} else {
				addTrack({ playlistId: playlist_id, uris: [trackUri] })
				setIsChecking(false)
			}
		}
	}, [playlist, isChecking])

	useEffect(() => {
		if (isAddTrackSuccess) {
			toast.success('Track is successfully added.')
		} else if (isAddTrackError) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
		}
	}, [isAddTrackSuccess, isAddTrackError])

	return { checkPlaylistTracks, isLoadingAddTrack, isAddTrackSuccess, isAddTrackError }
}

export const useSaveTrack = setModal => {
	const [saveTrack, { isLoading: isLoadingSaving, isSuccess: isSuccessSaving, isError: isErrorSaving }] = useSaveTrackMutation()

	useEffect(() => {
		if (isSuccessSaving) {
			toast.success('Track is successfully saved.')
			setModal(false)
		} else if (isErrorSaving) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
			setModal(false)
		}
	}, [isSuccessSaving, isErrorSaving])

	return { saveTrack, isLoadingSaving, isErrorSaving }
}

export const useRemoveTrackFromPlaylist = setModal => {
	const [removeTrackFP, { isLoading: isLoadingRemovingFP, isSuccess: isSuccessRemovingFP, isError: isErrorRemovingFP }] =
		useRemoveTrackFromPlaylistMutation()

	useEffect(() => {
		if (isSuccessRemovingFP) {
			toast.success('Track is successfully removed from playlist.')
			setModal(false)
		} else if (isErrorRemovingFP) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
			setModal(false)
		}
	}, [isSuccessRemovingFP, isErrorRemovingFP])

	return {
		removeTrackFP,
		isLoadingRemovingFP,
		isErrorRemovingFP,
	}
}

export const useRemoveTrackFromSaved = setModal => {
	const [removeTrackFS, { isLoading: isLoadingRemovingFS, isSuccess: isSuccessRemovingFS, isError: isErrorRemovingFS }] =
		useRemoveSavedTrackMutation()

	useEffect(() => {
		if (isSuccessRemovingFS) {
			toast.success('Track is successfully removed from saved.')
			setModal(false)
		} else if (isErrorRemovingFS) {
			toast.error('Track is not saved. Save it firstly.', {
				style: {
					textAlign: 'center',
				},
			})
			setModal(false)
		}
	}, [isSuccessRemovingFS, isErrorRemovingFS])

	return { removeTrackFS, isLoadingRemovingFS, isErrorRemovingFS }
}

export const useTrackDnd = (tracksOrder, imagesOrder, updateTracksOrder, updateImagesOrder) => {
	function sort(result, order) {
		if (!result.destination) return

		const items = Array.from(order)
		const [reorderedItem] = items.splice(result.source.index, 1)
		items.splice(result.destination.index, 0, reorderedItem)

		order == tracksOrder ? updateTracksOrder(items) : updateImagesOrder(items)

		const rangeStart = result?.source?.index
		const insertBefore = result?.destination?.index

		return { rangeStart, insertBefore }
	}

	return { sort }
}
