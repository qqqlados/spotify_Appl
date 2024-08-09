import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAddTrackToPlaylistMutation, useLazyGetPlaylistQuery, useRemoveTrackFromPlaylistMutation } from '../api/playlist'
import {
	useGetRecommendationsQuery,
	useGetSavedTracksQuery,
	useGetTrackQuery,
	useRemoveSavedTrackMutation,
	useSaveTrackMutation,
} from '../api/tracks'
import { IImage } from '../shared/types/image.type'
import { IPlaylistAddTrack } from '../types/playlist.types'
import { ITrackSort } from '../types/track.types'

type AddTrackType = {
	id: string
	playlist_id: string | undefined
	trackUri: string
	setLoaderCircle: React.Dispatch<React.SetStateAction<boolean | string | null>> | undefined
	loaderCircle?: boolean | string | null
	closeModal?: () => void
}

export const useTrack = (id: string) => {
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
	const { tracks, imagesTracks } = useGetSavedTracksQuery(undefined, {
		selectFromResult: ({ data }) => ({
			tracks: data?.items?.map(item => item.track) || [],
			imagesTracks:
				data?.items
					?.map(item => {
						const images = item?.track?.album?.images
						return images?.find(img => img.width === 64) || null
					})
					?.filter((image): image is IImage => image !== null) || [],
		}),
	})
	return { tracks, imagesTracks }
}

export const useTrackRecommendations = ({ artist_id, track_id }: { artist_id: string | undefined; track_id: string | undefined }) => {
	const { data: reco } = useGetRecommendationsQuery({ artist_id, track_id }, { skip: !artist_id })

	return {
		reco,
	}
}

export const useAddTrack = <T extends AddTrackType>({ playlist_id, id, trackUri, setLoaderCircle, loaderCircle, closeModal }: T) => {
	const [checkPlaylist, { data: playlist }] = useLazyGetPlaylistQuery()

	const [addTrack, { isSuccess, isError }] = useAddTrackToPlaylistMutation()

	const [isChecking, setIsChecking] = useState<boolean>(false)
	const [checked, setChecked] = useState<boolean>(false)

	const checkPlaylistTracks = () => {
		if (setLoaderCircle) setLoaderCircle('loader circle started')
		setIsChecking(true)
		if (playlist_id) checkPlaylist(playlist_id)
	}

	useEffect(() => {
		if (playlist && isChecking && !checked) {
			setChecked(true)

			const isFoundTrack = playlist?.tracks?.items?.map(item => item?.track?.id).find(el => el === id)
			if (isFoundTrack) {
				toast('Track is already on a playlist.', {
					style: {
						textAlign: 'center',
					},
					icon: '⚠️',
				})
				setIsChecking(false)
				if (setLoaderCircle) setLoaderCircle(false)
				setChecked(false)
				if (closeModal) closeModal()
			} else {
				const trackData: IPlaylistAddTrack = {
					id: playlist_id,
					uris: [trackUri],
				}
				addTrack(trackData)
				setIsChecking(false)
				if (setLoaderCircle) setLoaderCircle(false)
				setChecked(false)
				if (closeModal) closeModal()
			}
		}
	}, [playlist, isChecking, checked])

	useEffect(() => {
		if (isSuccess) {
			toast.success('Track is successfully added.')
			if (setLoaderCircle) setLoaderCircle(trackUri)
		} else if (isError) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
		}
	}, [isSuccess, isError])

	return { checkPlaylistTracks, loaderCircle }
}

export const useSaveTrack = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export const useRemoveTrackFromPlaylist = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export const useRemoveTrackFromSaved = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export const useTrackDnd = () => {
	function sort<T>({ result, order, updateOrder }: ITrackSort<T>) {
		if (!result.destination) return

		const items = Array.isArray(order) ? [...order] : []
		const [reorderedItem] = items?.splice(result.source.index, 1)
		items?.splice(result.destination.index, 0, reorderedItem)

		updateOrder(items)

		const rangeStart = result?.source?.index
		const insertBefore = result?.destination?.index

		return { rangeStart, insertBefore }
	}

	return { sort }
}
