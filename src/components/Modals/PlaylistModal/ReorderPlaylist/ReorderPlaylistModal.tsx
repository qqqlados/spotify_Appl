import { useEffect, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useUpdatePlaylistItemsMutation } from '../../../../api/playlist'
import { usePlaylistTracks } from '../../../../hooks/usePlaylists'
import { useTrackDnd } from '../../../../hooks/useTrack'
import TrackListDraggable from '../../../Lists/TrackList/TrackListDraggable'
import LoaderCircle from '../../../Loader/LoaderCircle'
import ModalSkeleton from '../../ModalSkeleton'
import s from './ReorderPlstModal.module.scss'

type ReorderPlaylistProps = {
	setModalReorderTracks: React.Dispatch<React.SetStateAction<boolean>>
	playlistId: string
}

const ReorderPlaylistModal = ({ setModalReorderTracks, playlistId }: ReorderPlaylistProps) => {
	const { playlist_id } = useParams()

	const { tracks, imagesTracks } = usePlaylistTracks(playlist_id)

	const [tracksOrder, updateTracksOrder] = useState(tracks)
	const [imagesOrder, updateImagesOrder] = useState(imagesTracks)

	const [rangeStart, setRangeStart] = useState(0)
	const [insertBefore, setInsertBefore] = useState(0)

	const { sort } = useTrackDnd()

	function handleOnDragEnd(result: DropResult) {
		const tracksOrderResult = sort({ result, order: tracksOrder, updateOrder: updateTracksOrder })
		sort({ result, order: imagesOrder, updateOrder: updateImagesOrder })

		if (tracksOrderResult) {
			const { rangeStart, insertBefore } = tracksOrderResult

			setRangeStart(rangeStart)
			setInsertBefore(insertBefore)
		}
	}

	const [updatePlaylistItems, { isLoading, isSuccess, isError }] = useUpdatePlaylistItemsMutation()

	const handleSave = () => {
		updatePlaylistItems({
			playlistId,
			tracksOrder,
			...{
				range_start: rangeStart,
				insert_before: insertBefore,
				range_length: Math.abs(rangeStart - insertBefore),
			},
		})
	}

	useEffect(() => {
		if (isSuccess) {
			toast.success('Playlist is successfully reordered')
			setModalReorderTracks(false)
		} else if (isError) {
			toast.error('Something went wrong. Try again later.')
			setModalReorderTracks(false)
		}
	}, [isSuccess, isError])

	return (
		<ModalSkeleton modalOpen={setModalReorderTracks} title={'Reorder Your Playlist'}>
			<div className={s.content}>
				<TrackListDraggable tracks={tracksOrder} images={imagesOrder} handleOnDragEnd={handleOnDragEnd} reorder={true} />

				<div className={s.save_button}>
					<button onClick={handleSave}>Save</button>
				</div>
			</div>
			{isLoading && <LoaderCircle />}
		</ModalSkeleton>
	)
}

export default ReorderPlaylistModal
