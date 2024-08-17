import React from 'react'
import { useParams } from 'react-router-dom'
import { useRemoveAlbum, useSaveAlbum, useSavedAlbums } from '../../../../hooks/useAlbums'
import { IAlbum } from '../../../../types/album.types'
import LoaderCircle from '../../../Loader/LoaderCircle'
import OptionsSkeleton from '../OptionsSkeleton'

type AlbumOptionsProps = {
	modalOptions: boolean
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const AlbumOptions = ({ modalOptions, setModalOptions }: AlbumOptionsProps) => {
	const { album_id } = useParams()

	const { saveAlbum, isLoadingSaving, isSuccessSaving, isErrorSaving } = useSaveAlbum(setModalOptions)

	const { removeAlbum, isLoadingRemoving, isSuccessRemoving, isErrorRemoving } = useRemoveAlbum(setModalOptions)

	const { savedAlbums } = useSavedAlbums()

	function isSavedAlbum(savedAlbums: IAlbum[]): string | undefined {
		const result = savedAlbums?.map(album => album?.id).find(item => item == album_id)
		return result
	}

	return (
		<OptionsSkeleton modalOptions={modalOptions} setModalOptions={setModalOptions}>
			{isSavedAlbum(savedAlbums) == undefined ? (
				<li
					onClick={() => {
						if (album_id) saveAlbum({ ids: [album_id] })
					}}
				>
					Save album
				</li>
			) : isSavedAlbum(savedAlbums) ? (
				<li
					onClick={() => {
						if (album_id) removeAlbum({ ids: [album_id] })
					}}
				>
					Remove from saved
				</li>
			) : (
				<LoaderCircle small={true} />
			)}
			{(isLoadingSaving || isLoadingRemoving) && <LoaderCircle small={true} />}
		</OptionsSkeleton>
	)
}

export default AlbumOptions
