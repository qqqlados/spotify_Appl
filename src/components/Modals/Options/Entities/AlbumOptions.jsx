import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRemoveAlbum, useSaveAlbum, useSavedAlbums } from '../../../../hooks/useAlbums'
import LoaderFullScreen from '../../../Loader/LoaderFullScreen'
import OptionsSkeleton from '../OptionsSkeleton'

const AlbumOptions = ({ modalOptions, setModalOptions }) => {
	const { album_id } = useParams()

	const { saveAlbum, isLoadingSaving, isSuccessSaving, isErrorSaving } = useSaveAlbum(setModalOptions)

	const { removeAlbum, isLoadingRemoving, isSuccessRemoving, isErrorRemoving } = useRemoveAlbum(setModalOptions)

	const { savedAlbums } = useSavedAlbums()

	const isSavedAlbum = savedAlbums?.map(album => album?.id).find(item => item == album_id)

	useEffect(() => {
		if (isSuccessSaving || isSuccessRemoving) {
			setModalOptions(false)
		}
	}, [isSuccessSaving, isSuccessRemoving])

	return (
		<>
			<OptionsSkeleton modalOptions={modalOptions} setModalOptions={setModalOptions}>
				{isSavedAlbum && isSavedAlbum == false ? (
					<li onClick={() => saveAlbum({ ids: [album_id] })}>Save album</li>
				) : (
					<li onClick={() => removeAlbum({ ids: [album_id] })}>Remove from saved</li>
				)}
				{(isLoadingSaving || isLoadingRemoving) && <LoaderFullScreen />}
			</OptionsSkeleton>
		</>
	)
}

export default AlbumOptions
