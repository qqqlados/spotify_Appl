import React from 'react'
import { useParams } from 'react-router-dom'
import { useRemoveTrackFromPlaylist, useRemoveTrackFromSaved, useSaveTrack, useSavedTracks } from '../../../../hooks/useTrack'
import ErrorMessage from '../../../../shared/ErrorMessage'
import LoaderFullScreen from '../../../Loader/LoaderCircle'
import OptionsSkeleton from '../OptionsSkeleton'

type TrackOptionsProps = {
	modalOptions: boolean
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
	setChoosePlaylistsModal?: React.Dispatch<React.SetStateAction<boolean>>
	trackId: string
	trackUri: string
}

const TrackOptions = ({ modalOptions, setModalOptions, setChoosePlaylistsModal, trackId, trackUri }: TrackOptionsProps) => {
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
					if (setChoosePlaylistsModal) setChoosePlaylistsModal(true)
					setModalOptions(false)
				}}
			>
				Add to playlist
			</li>
			{playlist_id && <li onClick={() => removeTrackFP({ id: playlist_id, tracks: [{ uri: trackUri }] })}>Remove from playlist</li>}
			{isTrackSaved == undefined ? (
				<li onClick={() => saveTrack({ ids: [trackId] })}>Save track</li>
			) : (
				<li onClick={() => removeTrackFS({ ids: [trackId] })}>Remove from saved</li>
			)}
			{isLoadingSaving || isLoadingRemovingFS || isLoadingRemovingFP ? (
				<LoaderFullScreen />
			) : isErrorSaving || isErrorRemovingFS || isErrorRemovingFP ? (
				<ErrorMessage />
			) : null}
		</OptionsSkeleton>
	)
}

export default TrackOptions
