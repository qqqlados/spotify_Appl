import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import AlbumOptions from './Options/Entities/AlbumOptions'
import PlaylistOptions from './Options/Entities/PlaylistOptions'
import TrackOptions from './Options/Entities/TrackOptions'
import ChoosePlaylistsModal from './PlaylistModal/ChoosePlaylists/ChoosePlaylistsModal'
import PlaylistActionsModal from './PlaylistModal/PlaylistActions/PlaylistActionsModal'
import ReorderPlaylistModal from './PlaylistModal/ReorderPlaylist/ReorderPlaylistModal'

const ModalsRoot = ({ album_id, track_id, trackUri, noTracks, playlist_id, modalOptions, setModalOptions }) => {
	const [modalReorderTracks, setModalReorderTracks] = useState(false)

	const [modalChangePlaylist, setModalChangePlaylist] = useState(false)

	const [choosePlModal, setChoosePlModal] = useState(false)

	return (
		<>
			<AnimatePresence>
				{modalOptions && playlist_id && (
					<PlaylistOptions
						modalOptions={modalOptions}
						setModalOptions={setModalOptions}
						setModalChangePl={setModalChangePlaylist}
						setModalReorderTracks={setModalReorderTracks}
						playlistId={playlist_id}
						noTracks={noTracks}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{modalOptions && track_id && (
					<TrackOptions
						modalOptions={modalOptions}
						setModalOptions={setModalOptions}
						setChoosePlaylistsModal={setChoosePlModal}
						trackId={track_id}
						trackUri={trackUri}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>{modalOptions && album_id && <AlbumOptions modalOptions={modalOptions} setModalOptions={setModalOptions} />}</AnimatePresence>

			<AnimatePresence>
				{choosePlModal && (
					<ChoosePlaylistsModal setModalOptions={setModalOptions} setChoosePlaylistsModal={setChoosePlModal} trackUri={trackUri} trackId={track_id} />
				)}
			</AnimatePresence>

			<AnimatePresence>
				{modalReorderTracks && (
					<ReorderPlaylistModal setModalOptions={setModalOptions} setModalReorderTracks={setModalReorderTracks} playlistId={playlist_id} />
				)}
			</AnimatePresence>

			<AnimatePresence>
				{modalChangePlaylist && (
					<PlaylistActionsModal
						setModalOptions={setModalOptions}
						setModalChangePl={setModalChangePlaylist}
						title={'Edit your playlist'}
						action={'change'}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default ModalsRoot
