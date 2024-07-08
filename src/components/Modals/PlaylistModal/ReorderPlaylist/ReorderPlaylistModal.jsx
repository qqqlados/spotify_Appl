import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUpdatePlaylistItemsMutation } from '../../../../api/playlist'
import { usePlaylistTracks } from '../../../../hooks/usePlaylists'
import { useTrackDnd } from '../../../../hooks/useTrack'
import LoaderFullScreen from '../../../Loader/LoaderFullScreen'
import ModalSkeleton from '../../ModalSkeleton'
import s from './ReorderPlstModal.module.scss'
import TrackList from '/src/components/Lists/TrackList/TrackList'

const ReorderPlaylistModal = ({ setModalOptions, setModalReorderTracks, playlistId }) => {
	const { playlist_id } = useParams()

	const { tracks, imagesTracks } = usePlaylistTracks(playlist_id)

	const [tracksOrder, updateTracksOrder] = useState(tracks)
	const [imagesOrder, updateImagesOrder] = useState(imagesTracks)

	const [rangeStart, setRangeStart] = useState(0)
	const [insertBefore, setInsertBefore] = useState(0)

	const { sort } = useTrackDnd(tracksOrder, imagesOrder, updateTracksOrder, updateImagesOrder)

	function handleOnDragEnd(result) {
		sort(result, tracksOrder)
		sort(result, imagesOrder)

		const { rangeStart, insertBefore } = sort(result, tracksOrder)

		setRangeStart(rangeStart)
		setInsertBefore(insertBefore)
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
		if (isSuccess || isError) {
			setModalReorderTracks(false)
		}
	}, [isSuccess, isError])

	return (
		<>
			<ModalSkeleton modalOpen={setModalReorderTracks} setModalOptions={setModalOptions} title={'Reorder Your Playlist'}>
				<div className={s.content}>
					<TrackList
						tracks={tracks}
						images={imagesTracks}
						reorder={true}
						handleOnDragEnd={handleOnDragEnd}
						tracksOrder={tracksOrder}
						imagesOrder={imagesOrder}
					/>

					<div className={s.save_button}>
						<button onClick={handleSave}>Save</button>
					</div>
				</div>
				{isLoading && <LoaderFullScreen />}
			</ModalSkeleton>
		</>
	)
}

export default ReorderPlaylistModal
