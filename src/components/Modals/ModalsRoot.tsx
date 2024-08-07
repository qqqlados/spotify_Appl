import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import AlbumOptions from './Options/Entities/AlbumOptions'
import PlaylistOptions from './Options/Entities/PlaylistOptions'
import TrackOptions from './Options/Entities/TrackOptions'
import ChoosePlaylistsModal from './PlaylistModal/ChoosePlaylists/ChoosePlaylistsModal'
import PlaylistActionsModal from './PlaylistModal/PlaylistActions/PlaylistActionsModal'
import ReorderPlaylistModal from './PlaylistModal/ReorderPlaylist/ReorderPlaylistModal'

type ModalsRootProps = {
	album_id?: string
	track_id?: string
	trackUri?: string
	playlist_id?: string
	noTracks?: boolean
	modalOptions: boolean
	setModalOptions: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalsRoot = ({ album_id, track_id, trackUri, playlist_id, noTracks, modalOptions, setModalOptions }: ModalsRootProps) => {
	const [modalReorderTracks, setModalReorderTracks] = useState(false)

	const [modalChangePlaylist, setModalChangePlaylist] = useState(false)

	const [choosePlModal, setChoosePlModal] = useState(false)

	return (
		<>
			<AnimatePresence>
				{modalOptions && playlist_id && !noTracks && (
					<PlaylistOptions
						modalOptions={modalOptions}
						setModalOptions={setModalOptions}
						setModalChangePl={setModalChangePlaylist}
						setModalReorderTracks={setModalReorderTracks}
						playlistId={playlist_id}
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
						trackUri={trackUri!}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>{modalOptions && album_id && <AlbumOptions modalOptions={modalOptions} setModalOptions={setModalOptions} />}</AnimatePresence>

			<AnimatePresence>
				{choosePlModal && <ChoosePlaylistsModal setChoosePlaylistsModal={setChoosePlModal} trackUri={trackUri ? trackUri : ''} trackId={track_id!} />}
			</AnimatePresence>

			<AnimatePresence>
				{modalReorderTracks && <ReorderPlaylistModal setModalReorderTracks={setModalReorderTracks} playlistId={playlist_id!} />}
			</AnimatePresence>

			<AnimatePresence>
				{modalChangePlaylist && <PlaylistActionsModal setModal={setModalChangePlaylist} title={'Edit your playlist'} action={'change'} />}
			</AnimatePresence>
		</>
	)
}

export default ModalsRoot
