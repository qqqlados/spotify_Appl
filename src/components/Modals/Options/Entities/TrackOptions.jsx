import React from 'react'
import { useParams } from 'react-router-dom'
import { useRemoveTrackFromPlaylist, useRemoveTrackFromSaved, useSaveTrack, useSavedTracks } from '../../../../hooks/useTrack'
import LoaderFullScreen from '../../../Loader/LoaderCircle'
import OptionsSkeleton from '../OptionsSkeleton'
import ErrorMessage from '/src/shared/ErrorMessage'

const TrackOptions = ({ modalOptions, setModalOptions, setChoosePlaylistsModal, trackId, trackUri }) => {
	const { tracks: savedTracks } = useSavedTracks()

	const { playlist_id } = useParams()

	const isTrackSaved = savedTracks?.map(item => item?.id).find(item => item == trackId)

	const { removeTrackFP, isLoadingRemovingFP, isErrorRemovingFP } = useRemoveTrackFromPlaylist(setModalOptions)

	const { saveTrack, isLoadingSaving, isErrorSaving } = useSaveTrack(setModalOptions)

	const { removeTrackFS, isLoadingRemovingFS, isErrorRemovingFS } = useRemoveTrackFromSaved(setModalOptions)

	return (
		<OptionsSkeleton modalOptions={modalOptions} setModalOptions={setModalOptions}>
			<li
				onClick={() => {
					setChoosePlaylistsModal(true)
					setModalOptions(false)
				}}
			>
				Add to playlist
			</li>
			{playlist_id && <li onClick={() => removeTrackFP({ playlistId: playlist_id, tracks: [{ uri: trackUri }] })}>Remove from playlist</li>}
			{isTrackSaved == undefined ? (
				<li onClick={() => saveTrack({ trackId, ids: [trackId] })}>Save track</li>
			) : (
				<li onClick={() => removeTrackFS({ trackId, ids: [trackId] })}>Remove from saved</li>
			)}
			{isLoadingSaving || isLoadingRemovingFS || isLoadingRemovingFP ? (
				<LoaderFullScreen />
			) : isErrorSaving || isErrorRemovingFS || isErrorRemovingFP ? (
				<ErrorMessage />
			) : (
				''
			)}
		</OptionsSkeleton>
	)
}

export default TrackOptions
