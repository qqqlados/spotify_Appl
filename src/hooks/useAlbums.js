import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useGetNewReleasesQuery, useGetSavedAlbumsQuery, useRemoveSavedAlbumMutation, useSaveAlbumMutation } from '../api/albums'

export const useAlbumImagesArray = () => {
	const { data } = useGetNewReleasesQuery()

	const albums = data?.albums?.items

	const imagesRaw = albums?.map(el => el.images)

	const flatArr = imagesRaw?.flatMap(item => item)

	const images = flatArr?.filter(el => el.height == 300)

	return { albums, images }
}

export const useNewReleases = () => {
	const { albums, images, isLoading, isError } = useGetNewReleasesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			albums: [...(data?.albums?.items || [])]?.sort((a, b) => b?.total_tracks - a?.total_tracks),
			images: [...(data?.albums?.items || [])]
				.sort((a, b) => b?.total_tracks - a?.total_tracks)
				.map(el => el.images)
				.map(el => {
					return el.filter(img => img.width == 300 || img.width == null)
				})
				.map(imgArr => imgArr[0]),
		}),
	})

	return { albums, images, isLoading, isError }
}

export const useSavedAlbums = user => {
	const { savedAlbums, imagesSavedAlbums, isLoading } = useGetSavedAlbumsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			savedAlbums: data?.items?.map(item => item?.album),
			imagesSavedAlbums: data?.items?.map(item => item.album.images?.filter(img => img.width == 300)[0]),
		}),
	})

	return { savedAlbums, imagesSavedAlbums, isLoading }
}

export const useSaveAlbum = setModal => {
	const [saveAlbum, { isLoading: isLoadingSaving, isSuccess: isSuccessSaving, isError: isErrorSaving }] = useSaveAlbumMutation()

	useEffect(() => {
		if (isSuccessSaving) {
			toast.success('Album is successfully saved.')
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

	return { saveAlbum, isLoadingSaving, isSuccessSaving, isErrorSaving }
}

export const useRemoveAlbum = setModal => {
	const [removeAlbum, { isLoading: isLoadingRemoving, isSuccess: isSuccessRemoving, isError: isErrorRemoving }] = useRemoveSavedAlbumMutation()

	useEffect(() => {
		if (isSuccessRemoving) {
			toast.success('Album is successfully removed from saved.')
			setModal(false)
		} else if (isErrorRemoving) {
			toast.error('Error happened. It may be due to network issue or overlasted access token.', {
				style: {
					textAlign: 'center',
				},
			})
			setModal(false)
		}
	}, [isSuccessRemoving, isErrorRemoving])

	return { removeAlbum, isLoadingRemoving, isSuccessRemoving, isErrorRemoving }
}
