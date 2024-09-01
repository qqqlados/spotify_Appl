import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useGetNewReleasesQuery, useGetSavedAlbumsQuery, useRemoveSavedAlbumMutation, useSaveAlbumMutation } from '../api/albums'

export const useNewReleases = () => {
	const { albums } = useGetNewReleasesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			albums: [...(data?.albums?.items || [])]?.sort((a, b) => b?.total_tracks - a?.total_tracks),
		}),
	})

	return { albums }
}

export const useSavedAlbums = () => {
	const { savedAlbums } = useGetSavedAlbumsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			savedAlbums: data?.items?.map(item => item?.album) || [],
		}),
	})

	return { savedAlbums }
}

export const useSaveAlbum = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
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

export const useRemoveAlbum = (setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
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
